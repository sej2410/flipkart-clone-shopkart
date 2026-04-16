import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import CategoryStrip from '../components/CategoryStrip';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const searchParams = new URLSearchParams(location.search);
        const search = searchParams.get('search') || '';
        
        const res = await axios.get('/api/products', {
          params: { search, category }
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location.search, category]);

  return (
    <main>
      <CategoryStrip onSelectCategory={(cat) => setCategory(cat)} activeCategory={category} />
      
      <div className="container" style={{ padding: '0px' }}>
        <div className="modern-section bg-pastel-green">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>
              {category === 'All' ? 'Popular Picks' : `Top Deals in ${category}`}
            </h2>
            <button className="view-all-btn" style={{ 
              background: 'var(--fk-blue)', 
              color: 'white', 
              padding: '8px 16px', 
              borderRadius: '2px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>VIEW ALL</button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '100px' }}>Loading products...</div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
              gap: '12px' 
            }}>
              {products.length > 0 ? (
                products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '50px' }}>
                  No products found.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
