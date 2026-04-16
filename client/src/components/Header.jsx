import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, ChevronDown, User, Store, MoreVertical } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${searchTerm}`);
    }
  };

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo-container">
          <div style={{ display: 'flex', alignItems: 'center' }}>
             <span style={{ fontSize: '22px', fontWeight: '900', color: 'var(--fk-blue)', letterSpacing: '-0.5px' }}>Shop</span>
             <span style={{ fontSize: '22px', fontWeight: '900', color: 'var(--fk-orange)', letterSpacing: '-0.5px' }}>Kart</span>
          </div>
        </Link>

        <form className="search-container-v2" onSubmit={handleSearch}>
          <Search size={18} color="#878787" style={{ marginRight: '8px' }} />
          <input 
            type="text" 
            className="search-input-v2" 
            placeholder="Search for Products, Brands and More" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        <div className="header-actions-v2">
          <div className="action-item" style={{ border: '1px solid #dbdbdb', borderRadius: '8px', padding: '6px 14px' }}>
            <User size={18} color="var(--fk-blue)" />
            <span style={{ fontWeight: '600', color: 'var(--fk-blue)' }}>Sejal</span>
            <ChevronDown size={14} />
          </div>

          <Link to="/orders" className="action-item">
            <span>Orders</span>
          </Link>

          <Link to="/cart" className="action-item">
            <div style={{ position: 'relative' }}>
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-10px',
                  background: 'var(--fk-orange)',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '1px 5px',
                  fontSize: '10px',
                  fontWeight: 'bold'
                }}>
                  {cartCount}
                </span>
              )}
            </div>
            <span>Cart</span>
          </Link>

          <Link to="/" className="action-item">
             <Store size={20} />
             <span>Become a Seller</span>
          </Link>

          <div 
            className="action-item" 
            onMouseEnter={() => setIsMoreDropdownOpen(true)}
            onMouseLeave={() => setIsMoreDropdownOpen(false)}
            style={{ position: 'relative' }}
          >
             <MoreVertical size={20} />
             {isMoreDropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-item">24x7 Customer Care</div>
                <div className="dropdown-item">Download App</div>
                <div className="dropdown-item">Advertise</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
