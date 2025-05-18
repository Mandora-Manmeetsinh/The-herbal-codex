
import { useEffect, useRef, useState } from 'react';
import { Search, CloudSun, Share, Book, Leaf, FlaskConical } from 'lucide-react';

const FeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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
  
  const features = [
    {
      icon: Book,
      title: "3D Garden Explorer",
      description: "Walk through our immersive 3D garden and interact with detailed plant models to learn about their properties.",
      color: "bg-emerald-400"
    },
    {
      icon: CloudSun,
      title: "Dynamic Weather",
      description: "Experience plants in different weather conditions to see how they react to sun, rain, and changing seasons.",
      color: "bg-sky-400"
    },
    {
      icon: Search,
      title: "Advanced Search",
      description: "Find plants by health benefits, regions, or specific ailments with our powerful search and filter system.",
      color: "bg-amber-400"
    },
    {
      icon: Share,
      title: "Social Sharing",
      description: "Bookmark your favorite plants, create custom collections, and share your discoveries with friends.",
      color: "bg-rose-400"
    },
    {
      icon: Leaf,
      title: "Seasonal Guide",
      description: "Learn when to plant, harvest, and how to care for each herb based on seasonal patterns in your region.",
      color: "bg-lime-400"
    },
    {
      icon: FlaskConical,
      title: "Preparation Methods",
      description: "Discover different ways to prepare herbs for maximum benefits, from teas and tinctures to poultices.",
      color: "bg-violet-400"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-herb-cream to-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="leaf-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20,0 Q30,20 20,40 Q10,20 20,0" fill="currentColor"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-herb-green-dark mb-4">Discover Our Features</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Explore the rich features of The Herbal Codex that make learning about medicinal plants engaging and immersive.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={feature.title}
              className={`group perspective transition-all duration-700 transform ${
                isVisible 
                  ? 'translate-y-0 opacity-100 rotate-0' 
                  : 'translate-y-20 opacity-0 rotate-2'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="bg-white rounded-lg p-6 shadow-lg h-full transform-gpu transition-transform duration-500 group-hover:scale-[1.02] group-hover:shadow-xl relative z-10">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-herb-green to-herb-gold opacity-0 group-hover:opacity-30 rounded-lg blur transition duration-500 group-hover:duration-200"></div>
                
                <div className={`mb-5 ${feature.color} bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-herb-green-dark" />
                </div>
                <h3 className="text-xl font-bold text-herb-green-dark mb-3 group-hover:text-herb-green transition-colors">{feature.title}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
