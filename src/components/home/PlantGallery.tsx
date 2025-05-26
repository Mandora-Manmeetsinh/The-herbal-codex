
import { useState, useEffect, useRef } from 'react';

const PlantGallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Sample plant images data with descriptions
  const plantImages = [
    { src: '/plants/lavender.jpg', name: 'Lavender', description: 'Known for its calming properties' },
    { src: '/plants/aloe.jpg', name: 'Aloe Vera', description: 'Natural skin healing' },
    { src: '/plants/chamomile.jpg', name: 'Chamomile', description: 'Sleep aid and relaxation' },
    { src: '/plants/echinacea.jpg', name: 'Echinacea', description: 'Immune system support' },
    { src: '/plants/ginger.jpg', name: 'Ginger', description: 'Digestive aid and anti-inflammatory' },
    { src: '/plants/peppermint.jpg', name: 'Peppermint', description: 'Refreshing and digestive relief' },
    { src: '/plants/turmeric.jpg', name: 'Turmeric', description: 'Anti-inflammatory properties' },
    { src: '/plants/valerian.jpg', name: 'Valerian', description: 'Natural sleep aid' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentGallery = galleryRef.current;
    
    if (currentGallery) {
      observer.observe(currentGallery);
    }
    
    return () => {
      if (currentGallery) {
        observer.unobserve(currentGallery);
      }
    };
  }, []);

  return (
    <section className="py-16 bg-white" ref={galleryRef}>
      <div className="container mx-auto px-6">
        <div className={`text-center mb-12 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-herb-green-dark mb-4">Explore Our Plant Collection</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover the beauty and healing power of these medicinal plants from our curated collection.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {plantImages.map((plant, index) => (
            <div 
              key={plant.name} 
              className={`group overflow-hidden rounded-lg shadow-md transition-all duration-700 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={plant.src} 
                  alt={plant.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-white">{plant.name}</h3>
                  <p className="text-sm text-herb-cream">{plant.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={`text-center mt-12 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100 delay-500' : 'translate-y-10 opacity-0'
        }`}>
          <p className="italic text-gray-600">
            Each plant has been carefully selected for its unique medicinal properties and benefits.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PlantGallery;
