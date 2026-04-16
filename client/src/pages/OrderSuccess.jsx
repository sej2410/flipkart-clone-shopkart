import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderSuccess = () => {
  const { id } = useParams();

  return (
    <div className="container" style={{ padding: '60px 0' }}>
      <div className="card" style={{ padding: '60px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <CheckCircle size={80} color="#388e3c" style={{ margin: '0 auto 24px' }} />
        <h1 style={{ fontSize: '24px', fontWeight: '500', color: '#212121', marginBottom: '12px' }}>Order Placed Successfully!</h1>
        <p style={{ fontSize: '18px', color: '#878787', marginBottom: '32px' }}>
          Your order ID is: <span style={{ color: '#212121', fontWeight: '500' }}>#{id}</span>
        </p>
        <p style={{ fontSize: '14px', color: '#878787', marginBottom: '40px' }}>
          We will send you an email confirmation with tracking details shortly.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link to="/" className="btn-primary" style={{ padding: '12px 40px' }}>Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
