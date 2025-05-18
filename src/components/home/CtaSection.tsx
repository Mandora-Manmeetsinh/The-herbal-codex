
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

const CtaSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 bg-herb-green-dark text-white overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating leaves */}
        <div className="absolute top-[10%] left-[5%] animate-float opacity-20">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60,10 Q90,60 60,110 Q30,60 60,10" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute top-[40%] right-[10%] animate-sway opacity-10" style={{ animationDelay: '1s' }}>
          <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M80,20 Q120,80 80,140 Q40,80 80,20" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute bottom-[15%] left-[20%] animate-float opacity-15" style={{ animationDelay: '1.5s' }}>
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,10 Q75,50 50,90 Q25,50 50,10" fill="currentColor" />
          </svg>
        </div>
        
        {/* Light rays */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-1/2 h-full bg-white opacity-5 blur-3xl transform -rotate-45"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className={`max-w-3xl mx-auto transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-white bg-opacity-20 text-white text-sm font-medium mb-6">Join Our Community</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your Herbal Journey Today</h2>
            <p className="text-lg mb-8 text-gray-200 leading-relaxed max-w-2xl mx-auto">
              Ready to explore the fascinating world of medicinal plants? Dive into our immersive 3D garden and discover nature's remedies that have been used for centuries.
            </p>
            <div className={`flex flex-col sm:flex-row justify-center gap-4 transition-all duration-700 delay-300 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}>
              <Link 
                to="/garden" 
                className="herb-button bg-white text-herb-green-dark hover:bg-herb-cream transition-colors shadow-lg group"
              >
                <span className="relative z-10">Explore the Garden</span>
                <span className="absolute inset-0 bg-white rounded-md scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></span>
              </Link>
              <Link 
                to="/library" 
                className="herb-button bg-transparent border-2 border-white hover:bg-white hover:text-herb-green-dark transition-all hover:shadow-lg"
              >
                Browse Plant Library
              </Link>
            </div>
          </div>
          
          {/* Stats section */}
          <div className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-500 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="text-center">
              <div className="text-4xl font-bold text-herb-cream mb-2">50+</div>
              <p className="text-gray-200">Medicinal Plants</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-herb-cream mb-2">100+</div>
              <p className="text-gray-200">Health Benefits</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-herb-cream mb-2">25+</div>
              <p className="text-gray-200">Traditional Remedies</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-white">
          <path fill="currentColor" fillOpacity="0.2" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,170.7C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default CtaSection;
