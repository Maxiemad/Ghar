
import { useState, useEffect } from 'react';
import { ChevronDown, Home, Building, Map, Layers, ArrowRight } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Design Your Dream Home",
      description: "Experience the future of home design with AI-powered customization for interior, exterior, and land planning.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      icon: Home
    },
    {
      title: "Smart Interior Solutions",
      description: "Create stunning interiors with AI matching, real-time 3D previews, and personalized furniture recommendations.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      icon: Layers
    },
    {
      title: "Disaster-Proof Exteriors",
      description: "AI risk analysis suggests the safest materials and designs based on your location's environmental conditions.",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      icon: Building
    },
    {
      title: "Land Analysis & Optimization",
      description: "Analyze terrain, sunlight patterns, and environmental risks to optimize your home's placement and design.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
      icon: Map
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-center bg-cover ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/70 to-background"></div>
      </div>

      <div className="container mx-auto px-4 z-10 pt-20 pb-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-6 animate-fade-in">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  currentSlide === index
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10 absolute'
                }`}
              >
                {currentSlide === index && (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-full bg-ghar-primary/10 text-ghar-primary">
                        <slide.icon size={24} />
                      </div>
                      <span className="text-sm font-medium text-ghar-primary">AI-Powered Design</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                      {slide.title.split(' ').map((word, i) => (
                        <span key={i} className={i % 2 === 0 ? 'text-gradient' : ''}>
                          {word}{' '}
                        </span>
                      ))}
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground mb-8">
                      {slide.description}
                    </p>
                  </>
                )}
              </div>
            ))}

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button className="px-8 py-3 rounded-full bg-gradient-to-r from-ghar-primary to-ghar-secondary text-white font-medium hover:shadow-lg transition-shadow flex items-center justify-center gap-2 group">
                Start Designing
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-3 rounded-full border border-ghar-primary/30 hover:border-ghar-primary/60 font-medium transition-colors">
                Learn More
              </button>
            </div>
          </div>

          <div className="hidden md:flex justify-end relative">
            <div className="w-full max-w-md aspect-square relative">
              <div className="absolute inset-0 bg-gradient-to-br from-ghar-primary/20 to-ghar-secondary/20 rounded-full animate-float"></div>
              <div className="glass-card absolute inset-4 rounded-3xl overflow-hidden border border-white/20 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                  alt="AI Home Design"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-sm mb-2">Scroll to explore</span>
          <ChevronDown size={24} />
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index 
                    ? 'bg-ghar-primary w-6' 
                    : 'bg-ghar-primary/30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Curved divider */}
      <div className="curve-divider">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-background"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
