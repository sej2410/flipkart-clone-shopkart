import React from 'react';

const categories = [
  { name: 'Mobiles', img: 'https://cdn-icons-png.flaticon.com/128/644/644458.png' },
  { name: 'Electronics', img: 'https://cdn-icons-png.flaticon.com/128/3659/3659899.png' },
  { name: 'Fashion', img: 'https://cdn-icons-png.flaticon.com/128/3050/3050239.png' },
  { name: 'Appliances', img: 'https://cdn-icons-png.flaticon.com/128/2321/2321390.png' },
  { name: 'Home', img: 'https://cdn-icons-png.flaticon.com/128/1924/1924925.png' },
  { name: 'Beauty', img: 'https://cdn-icons-png.flaticon.com/128/2707/2707142.png' },
  { name: 'Grocery', img: 'https://cdn-icons-png.flaticon.com/128/3724/3724720.png' }
];

const CategoryStrip = ({ onSelectCategory, activeCategory }) => {
  return (
    <div className="category-strip-v3">
      <div className="container">
        <ul className="category-list-v3">
          <li 
            className={`category-item-v3 ${activeCategory === 'All' ? 'active' : ''}`} 
            onClick={() => onSelectCategory('All')}
          >
            <img src="https://cdn-icons-png.flaticon.com/128/3703/3703171.png" alt="All" />
            <span>For You</span>
          </li>
          {categories.map((cat, idx) => (
            <li 
              key={idx} 
              className={`category-item-v3 ${activeCategory === cat.name ? 'active' : ''}`} 
              onClick={() => onSelectCategory(cat.name)}
            >
              <img src={cat.img} alt={cat.name} />
              <span>{cat.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryStrip;
