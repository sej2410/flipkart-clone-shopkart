import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/cart');
      setCartItems(res.rows || res.data); // Handle both formats
    } catch (err) {
      console.error("Error fetching cart", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    try {
      await axios.post('http://localhost:5000/api/cart', { productId, quantity });
      fetchCart();
    } catch (err) {
      console.error("Error adding to cart", err);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return;
    try {
      await axios.put(`http://localhost:5000/api/cart/${itemId}`, { quantity });
      fetchCart();
    } catch (err) {
      console.error("Error updating quantity", err);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${itemId}`);
      fetchCart();
    } catch (err) {
      console.error("Error removing from cart", err);
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const originalTotal = cartItems.reduce((sum, item) => sum + ((item.original_price || item.price) * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      loading, 
      addToCart, 
      updateQuantity, 
      removeFromCart, 
      cartCount,
      cartTotal,
      originalTotal,
      fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
