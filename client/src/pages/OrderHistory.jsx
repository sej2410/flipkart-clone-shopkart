import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package } from 'lucide-react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/api/orders');
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="container" style={{ padding: '50px' }}>Loading orders...</div>;

  return (
    <div className="container" style={{ padding: '24px 0' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '500', marginBottom: '24px' }}>My Orders</h2>
      
      {orders.length === 0 ? (
        <div className="card" style={{ padding: '50px', textAlign: 'center' }}>
          <Package size={64} color="#878787" style={{ margin: '0 auto 20px' }} />
          <h3>You have no orders.</h3>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {orders.map(order => (
            <div key={order.id} className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0', paddingBottom: '12px', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '14px', color: '#878787' }}>ORDER ID</div>
                  <div style={{ fontWeight: '500' }}>#{order.id}</div>
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: '#878787' }}>TOTAL AMOUNT</div>
                  <div style={{ fontWeight: '500' }}>₹{Number(order.total_amount).toLocaleString()}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', color: '#878787' }}>STATUS</div>
                  <div style={{ color: '#388e3c', fontWeight: '500' }}>{order.status}</div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: '14px', color: '#878787', marginBottom: '8px' }}>DELIVERY ADDRESS</div>
                <div style={{ fontSize: '14px' }}>{order.shipping_address}</div>
              </div>
              <div style={{ marginTop: '12px', fontSize: '12px', color: '#878787' }}>
                Placed on: {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
