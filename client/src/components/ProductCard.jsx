import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const discount = Math.round(((product.original_price - product.price) / product.original_price) * 100);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="card product-card" style={{ position: 'relative' }}>
      <button 
        onClick={toggleWishlist}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'white',
          border: 'none',
          borderRadius: '50%',
          padding: '6px',
          cursor: 'pointer',
          zIndex: 10,
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Heart size={18} fill={isWishlisted ? '#ff4343' : 'none'} color={isWishlisted ? '#ff4343' : '#dbdbdb'} />
      </button>
      
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="pc-image-wrapper">
          <img src={product.main_image_url} alt={product.name} />
        </div>
        <div className="pc-name" title={product.name}>{product.name}</div>
        <div style={{ textAlign: 'left', marginBottom: '8px' }}>
          <span className="pc-rating-badge">
            {product.rating} <Star size={12} fill="white" />
          </span>
          <span className="pc-reviews">({Number(product.reviews_count).toLocaleString()})</span>
        </div>
        <div className="pc-pricing" style={{ textAlign: 'left' }}>
          <span className="pc-price">₹{Number(product.price).toLocaleString()}</span>
          {product.original_price > product.price && (
            <>
              <span className="pc-original">₹{Number(product.original_price).toLocaleString()}</span>
              <span className="pc-discount">{discount}% off</span>
            </>
          )}
        </div>
        <div style={{ textAlign: 'left', marginTop: '4px' }}>
          <img 
            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" 
            alt="Assured" 
            style={{ height: '21px' }} 
          />
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
