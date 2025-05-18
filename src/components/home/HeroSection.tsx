
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-herbs.jpg')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
      </div>
      
      {/* Floating herb illustrations */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[15%] left-[10%] animate-float opacity-30">
          <svg width="60" height="120" viewBox="0 0 60 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 0C30 40 60 60 60 120M30 0C30 40 0 60 0 120M30 0V120" stroke="white" strokeWidth="2"/>
            <path d="M15 40C15 40 30 50 45 40" stroke="white" strokeWidth="2"/>
            <path d="M15 60C15 60 30 70 45 60" stroke="white" strokeWidth="2"/>
          </svg>
        </div>
        <div className="absolute top-[25%] right-[15%] animate-float opacity-20 animation-delay-300">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="2"/>
            <path d="M50 5C50 50 95 50 95 50" stroke="white" strokeWidth="2"/>
            <path d="M50 5C50 50 5 50 5 50" stroke="white" strokeWidth="2"/>
            <path d="M50 95C50 50 95 50 95 50" stroke="white" strokeWidth="2"/>
            <path d="M50 95C50 50 5 50 5 50" stroke="white" strokeWidth="2"/>
          </svg>
        </div>
      </div>
      
      {/* Content */}
      <div 
        className={`container mx-auto px-6 relative z-10 text-white transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="block bg-gradient-to-r from-white via-herb-cream to-herb-gold bg-clip-text text-transparent">The Herbal Codex</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed">
            Explore the world of medicinal herbs in an immersive 3D experience. 
            <span className="block mt-2 text-herb-cream">Discover nature's healing wonders.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/garden" 
              className="herb-button bg-herb-green-dark hover:bg-herb-green inline-flex items-center justify-center group transition-all duration-300"
            >
              Explore the Garden
              <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/library" 
              className="herb-button bg-transparent border-2 border-white hover:bg-white hover:text-herb-green-dark transition-colors"
            >
              Browse Plant Library
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div 
        className="absolute bottom-0 left-0 w-full transition-transform duration-700"
        style={{ transform: `translateY(${Math.min(scrollY * 0.1, 20)}px)` }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-white">
          <path fill="currentColor" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,229.3C960,213,1056,171,1152,154.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5L12 19M12 19L19 12M12 19L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
