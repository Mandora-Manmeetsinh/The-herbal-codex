
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const { left, top, width, height } = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        setMousePosition({ x, y });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate parallax effect based on mouse position
  const calculateParallaxX = (depth: number) => {
    return (mousePosition.x - 0.5) * depth * -20;
  };
  
  const calculateParallaxY = (depth: number) => {
    return (mousePosition.y - 0.5) * depth * -20;
  };

  return (
    <section ref={heroRef} className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 z-0 scale-105"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-herbs.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-black/80"></div>
        </div>
      </div>
      
      {/* Floating herb illustrations with parallax effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="absolute top-[15%] left-[10%] animate-float opacity-40"
          style={{ transform: `translate(${calculateParallaxX(2)}px, ${calculateParallaxY(2)}px)` }}
        >
          <svg width="60" height="120" viewBox="0 0 60 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 0C30 40 60 60 60 120M30 0C30 40 0 60 0 120M30 0V120" stroke="white" strokeWidth="2"/>
            <path d="M15 40C15 40 30 50 45 40" stroke="white" strokeWidth="2"/>
            <path d="M15 60C15 60 30 70 45 60" stroke="white" strokeWidth="2"/>
          </svg>
        </div>
        
        <div 
          className="absolute top-[25%] right-[15%] animate-float opacity-30 animation-delay-300"
          style={{ transform: `translate(${calculateParallaxX(3)}px, ${calculateParallaxY(3)}px)` }}
        >
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="2"/>
            <path d="M50 5C50 50 95 50 95 50" stroke="white" strokeWidth="2"/>
            <path d="M50 5C50 50 5 50 5 50" stroke="white" strokeWidth="2"/>
            <path d="M50 95C50 50 95 50 95 50" stroke="white" strokeWidth="2"/>
            <path d="M50 95C50 50 5 50 5 50" stroke="white" strokeWidth="2"/>
          </svg>
        </div>
        
        <div 
          className="absolute bottom-[30%] left-[25%] animate-sway opacity-20"
          style={{ transform: `translate(${calculateParallaxX(1.5)}px, ${calculateParallaxY(1.5)}px)` }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 0L40 80M20 20C20 20 40 40 60 20M20 60C20 60 40 40 60 60" stroke="white" strokeWidth="2"/>
          </svg>
        </div>
        
        <div 
          className="absolute top-[40%] right-[30%] animate-pulse-slow opacity-25 animation-delay-500"
          style={{ transform: `translate(${calculateParallaxX(2.5)}px, ${calculateParallaxY(2.5)}px)` }}
        >
          <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M35 0C35 25 70 35 70 70M35 0C35 25 0 35 0 70" stroke="white" strokeWidth="2"/>
            <circle cx="35" cy="35" r="10" stroke="white" strokeWidth="2"/>
          </svg>
        </div>
      </div>
      
      {/* Radial gradient light effect */}
      <div 
        className="absolute inset-0 bg-radial-gradient opacity-40"
        style={{ 
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0) 50%)` 
        }}
      ></div>
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-white">
        <div className={`max-w-2xl transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative">
            <span className="absolute -top-6 left-0 text-herb-gold text-sm tracking-widest font-medium">EXPERIENCE NATURE'S HEALING</span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="block bg-gradient-to-r from-white via-herb-cream to-herb-gold bg-clip-text text-transparent drop-shadow-sm">
                The Herbal Codex
              </span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed">
            Explore the world of medicinal herbs in an immersive 3D experience. 
            <span className="block mt-2 text-herb-cream">Discover nature's healing wonders.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/garden" 
              className="herb-button bg-herb-green-dark hover:bg-herb-green inline-flex items-center justify-center group transition-all duration-300 shadow-lg shadow-herb-green-dark/20"
            >
              <span className="relative z-10">Explore the Garden</span>
              <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-herb-green-dark to-herb-green opacity-0 group-hover:opacity-100 rounded-md transition-opacity duration-300"></div>
            </Link>
            <Link 
              to="/library" 
              className="herb-button bg-transparent border-2 border-white hover:bg-white hover:text-herb-green-dark transition-colors group overflow-hidden"
            >
              <span className="relative z-10">Browse Plant Library</span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
            </Link>
          </div>
          
          {/* Feature highlights */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg">
            <div className="feature-pill animate-fade-in" style={{animationDelay: '0.3s'}}>
              <span className="text-xs">3D Garden</span>
            </div>
            <div className="feature-pill animate-fade-in" style={{animationDelay: '0.5s'}}>
              <span className="text-xs">200+ Plants</span>
            </div>
            <div className="feature-pill animate-fade-in" style={{animationDelay: '0.7s'}}>
              <span className="text-xs">Interactive</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div 
        className="absolute bottom-0 left-0 w-full transition-transform duration-700"
        style={{ transform: `translateY(${Math.min(scrollY * 0.1, 20)}px)` }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-white opacity-80">
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
