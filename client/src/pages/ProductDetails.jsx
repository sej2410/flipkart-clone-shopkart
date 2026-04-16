import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, Zap, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {

        console.error("Error fetching product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product.id, 1);
    navigate('/cart');
  };

  const handleBuyNow = () => {
    addToCart(product.id, 1);
    navigate('/checkout');
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>;
  if (!product) return <div style={{ textAlign: 'center', padding: '100px' }}>Product not found</div>;

  const discount = Math.round(((product.original_price - product.price) / product.original_price) * 100);

  return (
    <div className="container" style={{ background: 'white', marginTop: '16px', minHeight: '80vh' }}>
      <div className="product-detail-container">
        {/* Left Column - Images */}
        <div className="product-images-gallery">
          <div className="main-img-container">
            <img src={product.main_image_url} alt={product.name} />
          </div>
          <div className="gallery-actions">
            <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={handleAddToCart}>
              <ShoppingCart size={20} /> ADD TO CART
            </button>
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={handleBuyNow}>
              <Zap size={20} fill="white" /> BUY NOW
            </button>
          </div>
        </div>

        {/* Right Column - Info */}
        <div className="product-info-panel">
          <div className="breadcrumb">Home {'>'} {product.category} {'>'} {product.brand}</div>
          <h1 className="pd-title">{product.name}</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span className="pc-rating-badge">
              {product.rating} <Star size={12} fill="white" />
            </span>
            <span className="pc-reviews" style={{ fontSize: '14px', fontWeight: '500' }}>
              {Number(product.reviews_count).toLocaleString()} Ratings & Reviews
            </span>
            <img 
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" 
              alt="Assured" 
              style={{ height: '21px' }} 
            />
          </div>

          <div style={{ color: '#388e3c', fontSize: '14px', fontWeight: '500' }}>Extra ₹3000 off</div>
          
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <span className="pd-price">₹{Number(product.price).toLocaleString()}</span>
            {product.original_price > product.price && (
              <>
                <span className="pc-original" style={{ fontSize: '16px' }}>₹{Number(product.original_price).toLocaleString()}</span>
                <span className="pc-discount" style={{ fontSize: '16px' }}>{discount}% off</span>
              </>
            )}
          </div>

          <div style={{ marginTop: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '12px' }}>Product Description</h3>
            <p style={{ fontSize: '14px', color: '#212121', lineHeight: '1.6' }}>{product.description}</p>
          </div>

          <div style={{ marginTop: '32px', border: '1px solid #e0e0e0', padding: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '16px' }}>Available Offers</h3>
            <ul style={{ fontSize: '14px' }}>
              <li style={{ marginBottom: '8px' }}>🏷️ <b>Bank Offer</b> 10% instant discount on Bank Cards, up to ₹1,000 on orders of ₹5,000 and above</li>
              <li style={{ marginBottom: '8px' }}>🏷️ <b>Special Price</b> Get extra 10% off (price inclusive of cashback/coupon)</li>
              <li style={{ marginBottom: '8px' }}>🏷️ <b>Partner Offer</b> Sign-up for Flipkart Pay Later & get free Times Prime Benefits</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
