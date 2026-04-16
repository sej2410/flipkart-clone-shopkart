import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2 } from 'lucide-react';

const CartPage = () => {
  const { cartItems, loading, updateQuantity, removeFromCart, cartTotal, originalTotal } = useCart();
  const navigate = useNavigate();

  if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}>Loading cart...</div>;

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '30px 0' }}>
        <div className="card" style={{ padding: '50px', textAlign: 'center' }}>
          <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="Empty" style={{ width: '200px' }} />
          <h3 style={{ margin: '20px 0 10px' }}>Your cart is empty!</h3>
          <p style={{ fontSize: '14px', marginBottom: '20px' }}>Add items to it now.</p>
          <Link to="/" className="btn-primary" style={{ display: 'inline-block', padding: '12px 60px' }}>Shop Now</Link>
        </div>
      </div>
    );
  }

  const savings = originalTotal - cartTotal;

  return (
    <div className="container cart-page">
      {/* Left side: Items */}
      <div className="card">
        <div className="cart-header">Flipkart ({cartItems.length})</div>
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div style={{ textAlign: 'center' }}>
              <img src={item.main_image_url} alt={item.name} className="cart-item-img" />
              <div className="quantity-control">
                <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <div style={{ border: '1px solid #e0e0e0', padding: '2px 16px', fontSize: '14px' }}>{item.quantity}</div>
                <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
            </div>
            <div className="cart-item-details">
              <div style={{ fontSize: '16px', marginBottom: '8px' }}>{item.name}</div>
              <div style={{ fontSize: '14px', color: '#878787', marginBottom: '12px' }}>Seller: RetailNet</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '18px', fontWeight: '500' }}>₹{Number(item.price * item.quantity).toLocaleString()}</span>
                {item.original_price && (
                  <span style={{ textDecoration: 'line-through', color: '#878787', fontSize: '14px' }}>
                    ₹{Number(item.original_price * item.quantity).toLocaleString()}
                  </span>
                )}
              </div>
              <div style={{ marginTop: '24px', display: 'flex', gap: '24px' }}>
                <button 
                  style={{ background: 'none', font: 'inherit', fontWeight: '500', cursor: 'pointer' }}
                  onClick={() => removeFromCart(item.id)}
                >
                  REMOVE
                </button>
              </div>
            </div>
            <div style={{ fontSize: '14px' }}>
              Delivery by tomorrow, Thu | <span style={{ color: '#388e3c' }}>Free</span>
            </div>
          </div>
        ))}
        <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'flex-end', boxShadow: '0 -2px 10px 0 rgba(0,0,0,.1)' }}>
          <button className="btn-primary" style={{ padding: '16px 60px' }} onClick={() => navigate('/checkout')}>PLACE ORDER</button>
        </div>
      </div>

      {/* Right side: Prices */}
      <div className="card" style={{ height: 'fit-content', position: 'sticky', top: '72px' }}>
        <div style={{ padding: '13px 24px', borderBottom: '1px solid #f0f0f0', color: '#878787', fontWeight: '500', fontSize: '16px' }}>
          PRICE DETAILS
        </div>
        <div className="cart-price-summary">
          <div className="summary-row">
            <span>Price ({cartItems.length} items)</span>
            <span>₹{Number(originalTotal).toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Discount</span>
            <span style={{ color: '#388e3c' }}>- ₹{Number(savings).toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Charges</span>
            <span style={{ color: '#388e3c' }}>Free</span>
          </div>
          <div className="summary-row summary-total">
            <span>Total Amount</span>
            <span>₹{Number(cartTotal).toLocaleString()}</span>
          </div>
          <div style={{ padding: '12px 0', color: '#388e3c', fontWeight: '500', fontSize: '14px', borderTop: '1px solid #f0f0f0' }}>
            You will save ₹{Number(savings).toLocaleString()} on this order
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
