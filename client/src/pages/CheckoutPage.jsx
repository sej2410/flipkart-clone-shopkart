import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const { cartItems, cartTotal, fetchCart } = useCart();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!address) return alert("Please enter shipping address");
    
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/orders', { address });
      setOrderPlaced(true);
      await fetchCart(); // Refresh cart (to clear it)
      navigate(`/order-success/${res.data.orderId}`);
    } catch (err) {
      console.error("Error placing order", err);
      alert("Failed to place order");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && !orderPlaced && cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, loading, navigate, orderPlaced]);

  if (cartItems.length === 0 && !orderPlaced) {
    return null;
  }

  return (
    <div className="container" style={{ padding: '24px 0', maxWidth: '800px' }}>
      <div className="card">
        <div style={{ background: '#2874f0', color: 'white', padding: '12px 24px', fontWeight: '500' }}>
          CHECKOUT
        </div>
        
        <div style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>1. ORDER SUMMARY ({cartItems.length} Items)</h3>
          <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '16px', marginBottom: '24px' }}>
             {cartItems.map(item => (
               <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                 <span>{item.name} (x{item.quantity})</span>
                 <span>₹{Number(item.price * item.quantity).toLocaleString()}</span>
               </div>
             ))}
             <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontWeight: '500', fontSize: '16px' }}>
                <span>Total Amount</span>
                <span>₹{Number(cartTotal).toLocaleString()}</span>
             </div>
          </div>

          <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>2. DELIVERY ADDRESS</h3>
          <form onSubmit={handlePlaceOrder}>
            <textarea 
              style={{ width: '100%', height: '100px', padding: '12px', borderRadius: '2px', border: '1px solid #e0e0e0', fontSize: '14px', outline: 'none' }}
              placeholder="Enter your full address with PIN code..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></textarea>

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                type="submit" 
                className="btn-primary" 
                style={{ padding: '16px 80px', opacity: loading ? 0.7 : 1 }}
                disabled={loading}
              >
                {loading ? 'PROCESSING...' : 'CONFIRM ORDER'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
