
import { ChevronUp, Home, Twitter, Linkedin, Instagram, Github, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background pt-20 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Home className="text-ghar-primary" size={24} />
              <span className="text-2xl font-bold text-gradient">GHAR</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Revolutionizing home design with AI-powered customization for interior, exterior, and land planning.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-full bg-ghar-primary/10 text-ghar-primary hover:bg-ghar-primary hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-ghar-primary/10 text-ghar-primary hover:bg-ghar-primary hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-ghar-primary/10 text-ghar-primary hover:bg-ghar-primary hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-ghar-primary/10 text-ghar-primary hover:bg-ghar-primary hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-ghar-primary/10 text-ghar-primary hover:bg-ghar-primary hover:text-white transition-colors">
                <Github size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-ghar-primary transition-colors">Interior Design</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-ghar-primary transition-colors">Exterior Design</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-ghar-primary transition-colors">Land Analysis</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-ghar-primary transition-colors">AI Assistant</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-ghar-primary transition-colors">3D Previews</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-muted-foreground hover:text-ghar-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-ghar-primary transition-colors">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-ghar-primary transition-colors">Support</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-ghar-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-ghar-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to get the latest updates on new features and design trends.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-muted rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-ghar-primary"
              />
              <button className="bg-ghar-primary text-white rounded-r-lg px-4 hover:bg-ghar-primary/90 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} GHAR. All rights reserved. Designed by Akanksha.
          </p>
          <button 
            className="p-3 rounded-full bg-ghar-primary/10 text-ghar-primary hover:bg-ghar-primary hover:text-white transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
          >
            <ChevronUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
