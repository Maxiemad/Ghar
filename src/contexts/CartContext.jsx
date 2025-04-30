
import { createContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart items from localStorage if available
    const savedCart = localStorage.getItem('ghar-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ghar-cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
    return true;
  };
  
  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
    toast.success("Item removed from cart");
  };
  
  const clearCart = () => {
    setCartItems([]);
    toast.success("Cart has been cleared");
  };
  
  const getCartCount = () => {
    return cartItems.length;
  };
  
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price || 0), 0);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        clearCart, 
        getCartCount, 
        getCartTotal 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
