
import { createContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export interface CartItem {
  id: string;
  type: string;
  name: string;
  style?: string;
  colors?: string[];
  features?: string[];
  price: number;
  image?: string;
  timestamp: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => boolean;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getCartTotal: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Load cart items from localStorage if available
    const savedCart = localStorage.getItem('ghar-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ghar-cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => [...prevItems, item]);
    return true;
  };
  
  const removeFromCart = (itemId: string) => {
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
