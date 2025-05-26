
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FeaturedPlantsSection = () => {
  // Sample featured plants data
  const featuredPlants = [
    {
      id: 1,
      name: 'Lavender',
      image: '/plants/lavender.png',
      benefits: 'Calming, stress relief, sleep aid',
      description: 'Known for its distinctive fragrance and purple blooms, lavender has been used for centuries to reduce anxiety and promote better sleep.'
    },
    {
      id: 2,
      name: 'Aloe Vera',
      image: '/plants/aloe.png',
      benefits: 'Skin healing, digestive health',
      description: 'This succulent plant contains a gel-like substance that is widely used for treating burns, skin irritations, and supporting digestive health.'
    },
    {
      id: 3,
      name: 'Turmeric',
      image: '/plants/turmeric.png',
      benefits: 'Anti-inflammatory, antioxidant',
      description: 'The golden yellow spice derived from turmeric root has powerful anti-inflammatory and antioxidant properties that can help reduce chronic inflammation.'
    },
    {
      id: 4,
      name: 'Peppermint',
      image: '/plants/peppermint.png',
      benefits: 'Digestive aid, headache relief',
      description: 'With its refreshing scent and cooling sensation, peppermint has been used to soothe digestive issues and provide relief from tension headaches.'
    },
    {
      id: 5,
      name: 'Chamomile',
      image: '/plants/chamomile.png',
      benefits: 'Relaxation, sleep improvement, skin care',
      description: 'This daisy-like flower is commonly used in teas to promote relaxation, improve sleep quality, and reduce inflammation.'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // For mobile scrolling
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    
    const sectionNode = sectionRef.current;
    if (sectionNode) {
      observer.observe(sectionNode);
    }
    
    return () => {
      if (sectionNode) {
        observer.unobserve(sectionNode);
      }
    };
  }, []);

  const showPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredPlants.length - 1 : prev - 1));
  };

  const showNext = () => {
    setCurrentIndex((prev) => (prev === featuredPlants.length - 1 ? 0 : prev + 1));
  };
  
  // Calculate visible plants for desktop (show 3)
  const visiblePlants = [];
  for (let i = 0; i < 3; i++) {
    const index = (currentIndex + i) % featuredPlants.length;
    visiblePlants.push(featuredPlants[index]);
  }

  return (
    <section className="herb-section bg-gradient-to-b from-white to-herb-cream" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-herb-green-dark mb-4">Featured Plants</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover some of the most beneficial medicinal plants in our collection.
          </p>
        </div>
        
        {/* Desktop Version (Carousel) */}
        <div className="relative hidden md:block">
          <div className="flex justify-between items-center mb-8">
            <button 
              onClick={showPrevious} 
              className="p-2 rounded-full bg-herb-green-dark text-white hover:bg-herb-green transition-colors"
              aria-label="Previous plants"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <div className="flex justify-center items-center space-x-2">
              {featuredPlants.map((_, idx) => (
                <button 
                  key={idx} 
                  className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-herb-green-dark w-4' : 'bg-gray-300'}`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={showNext} 
              className="p-2 rounded-full bg-herb-green-dark text-white hover:bg-herb-green transition-colors"
              aria-label="Next plants"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-8">
            {visiblePlants.map((plant, idx) => (
              <div
                key={`${plant.id}-${idx}`}
                className={`herb-card overflow-hidden group transition-all duration-500 transform ${
                  isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
                } delay-${idx * 100}`}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={plant.image} 
                    alt={plant.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
                  <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{plant.name}</h3>
                </div>
                <div className="p-4">
                  <p className="text-herb-green font-medium mb-2">{plant.benefits}</p>
                  <p className="text-gray-700 mb-4 line-clamp-2">{plant.description}</p>
                  <Link to={`/library/${plant.id}`} className="text-herb-green-dark hover:text-herb-green font-medium inline-flex items-center transition-colors">
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile Version (Scrollable) */}
        <div className="md:hidden">
          <div 
            ref={scrollContainerRef} 
            className="flex overflow-x-auto gap-4 pb-6 snap-x scrollbar-none"
          >
            {featuredPlants.map((plant, idx) => (
              <div
                key={plant.id}
                className="herb-card overflow-hidden group flex-shrink-0 w-[80%] snap-center"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.5s ease ${idx * 0.1}s`
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={plant.image} 
                    alt={plant.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
                  <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{plant.name}</h3>
                </div>
                <div className="p-4">
                  <p className="text-herb-green font-medium mb-2">{plant.benefits}</p>
                  <p className="text-gray-700 mb-4 line-clamp-2">{plant.description}</p>
                  <Link to={`/library/${plant.id}`} className="text-herb-green-dark font-medium inline-flex items-center">
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {/* Scroll indicator for mobile */}
          <div className="flex justify-center mt-4 space-x-2">
            {featuredPlants.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-2 h-2 rounded-full ${
                  idx === currentIndex ? 'bg-herb-green-dark w-4' : 'bg-gray-300'
                } transition-all`}
              />
            ))}
          </div>
        </div>
        
        <div className={`text-center mt-12 transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Link to="/library" className="herb-button bg-herb-green hover:bg-herb-green-dark transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 group">
            View All Plants
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 inline-block transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPlantsSection;
