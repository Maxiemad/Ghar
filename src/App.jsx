
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import { CartProvider } from './contexts/CartContext';
import { Toaster } from './components/ui/sonner';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Toaster />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
