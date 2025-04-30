
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Interior from '../components/Interior';
import Exterior from '../components/Exterior';
import AIAssistant from '../components/AIAssistant';
import ContactInfo from '../components/ContactInfo';
import Footer from '../components/Footer';

const Index = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCustomCursor, setShowCustomCursor] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      if (!showCustomCursor) setShowCustomCursor(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [showCustomCursor]);

  return (
    <>
      {/* Custom cursor */}
      {showCustomCursor && (
        <div 
          className="custom-cursor hidden md:block"
          style={{ 
            left: `${cursorPosition.x}px`, 
            top: `${cursorPosition.y}px` 
          }}
        ></div>
      )}
      
      <Header />
      <main>
        <Hero />
        <Features />
        <Interior />
        <Exterior />
        <AIAssistant />
        <ContactInfo />
      </main>
      <Footer />
    </>
  );
};

export default Index;
