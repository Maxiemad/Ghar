
import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, ShoppingCart } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import { Button } from './ui/button';
import { useCart } from '../hooks/useCart';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const isMobile = useIsMobile();
  const { getCartCount } = useCart();
  const cartItems = getCartCount();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    // Here you would typically handle authentication
    alert("Sign in functionality would be implemented here!");
    setShowSignInModal(false);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-white/80 dark:bg-ghar-black/80 backdrop-blur-md shadow-md' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="/" className="flex items-center gap-2 z-50">
          <img 
            src="/lovable-uploads/e83ee1b7-ddcd-47b3-8b1b-d200abe7aa62.png" 
            alt="Ghar Logo" 
            className="h-10 md:h-12"
          />
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
          <a href="#features" className="nav-link relative font-medium text-foreground hover:text-ghar-primary transition-colors">
            Features
          </a>
          <a href="#interior" className="nav-link relative font-medium text-foreground hover:text-ghar-primary transition-colors">
            Interior
          </a>
          <a href="#exterior" className="nav-link relative font-medium text-foreground hover:text-ghar-primary transition-colors">
            Exterior
          </a>
          <a href="#ai-assistant" className="nav-link relative font-medium text-foreground hover:text-ghar-primary transition-colors">
            AI Assistant
          </a>
          <a href="#contact" className="nav-link relative font-medium text-foreground hover:text-ghar-primary transition-colors">
            Contact
          </a>
        </nav>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-4 z-50">
          <button 
            onClick={toggleDarkMode} 
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button 
            className="relative p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
            {cartItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-ghar-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems}
              </span>
            )}
          </button>
          
          <Button 
            onClick={() => setShowSignInModal(true)}
            className="hidden sm:inline-flex bg-gradient-to-r from-ghar-primary to-ghar-secondary hover:opacity-90 transition-opacity text-white rounded-full px-6 py-2 font-medium"
          >
            Sign In
          </Button>
          
          <button
            onClick={toggleMenu}
            className="p-2 md:hidden rounded-full hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white dark:bg-ghar-black">
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-xl">
            <a href="#features" onClick={toggleMenu} className="hover:text-ghar-primary transition-colors">Features</a>
            <a href="#interior" onClick={toggleMenu} className="hover:text-ghar-primary transition-colors">Interior</a>
            <a href="#exterior" onClick={toggleMenu} className="hover:text-ghar-primary transition-colors">Exterior</a>
            <a href="#ai-assistant" onClick={toggleMenu} className="hover:text-ghar-primary transition-colors">AI Assistant</a>
            <a href="#contact" onClick={toggleMenu} className="hover:text-ghar-primary transition-colors">Contact</a>
            <Button 
              onClick={() => {
                setShowSignInModal(true);
                toggleMenu();
              }}
              className="bg-gradient-to-r from-ghar-primary to-ghar-secondary hover:opacity-90 transition-opacity text-white rounded-full px-8 py-3 font-medium mt-4"
            >
              Sign In
            </Button>
          </div>
        </div>
      )}

      {/* Sign In Modal */}
      {showSignInModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-ghar-black p-8 rounded-xl shadow-2xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Sign In</h2>
              <button onClick={() => setShowSignInModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full p-3 border rounded-lg dark:bg-ghar-black dark:border-gray-700"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  className="w-full p-3 border rounded-lg dark:bg-ghar-black dark:border-gray-700"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember" type="checkbox" className="h-4 w-4 mr-2" />
                  <label htmlFor="remember" className="text-sm">Remember me</label>
                </div>
                <a href="#" className="text-sm text-ghar-primary hover:underline">Forgot password?</a>
              </div>
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-ghar-primary to-ghar-secondary hover:opacity-90 transition-opacity text-white rounded-full py-3 font-medium"
              >
                Sign In
              </Button>
              <div className="text-center text-sm mt-4">
                Don't have an account? <a href="#" className="text-ghar-primary hover:underline">Sign up</a>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
