
import { useState, useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "The 3D herb garden experience is incredibly immersive. I've never learned about medicinal plants in such an engaging way before.",
    author: "Sarah Johnson",
    title: "Herbalist",
    avatar: "/team/botanist.jpg"
  },
  {
    id: 2,
    quote: "As someone studying botanical medicine, this interactive approach to learning about herbs has been invaluable to my education.",
    author: "Michael Chen",
    title: "Botany Student",
    avatar: "/team/developer.jpg"
  },
  {
    id: 3,
    quote: "The detailed information about each plant's medicinal properties has helped me incorporate them effectively into my holistic practice.",
    author: "Dr. Lisa Patel",
    title: "Holistic Practitioner",
    avatar: "/team/botanist.jpg"
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
    
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      clearInterval(interval);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 bg-gradient-to-b from-herb-green/5 to-herb-cream/20 overflow-hidden relative"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-herb-green/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-herb-green/50 to-transparent"></div>
        {Array.from({ length: 20 }).map((_, index) => (
          <div 
            key={index}
            className="absolute w-32 h-32 rounded-full bg-herb-green opacity-5"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `scale(${Math.random() + 0.5})`,
            }}
          ></div>
        ))}
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-herb-green-dark mb-4">What People Are Saying</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover how The Herbal Codex is transforming the way people learn about medicinal plants.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative h-64 md:h-52">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={testimonial.id}
                className={`absolute w-full transition-all duration-700 ease-in-out glass-card p-6 md:p-8 ${
                  idx === activeIndex 
                    ? 'opacity-100 translate-x-0 scale-100 z-20' 
                    : idx === (activeIndex + 1) % testimonials.length 
                      ? 'opacity-30 translate-x-[40%] scale-95 z-10' 
                      : 'opacity-0 translate-x-[-40%] scale-90 z-0'
                }`}
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white/50">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -top-2 -left-2 bg-herb-green-dark text-white p-1 rounded-full">
                        <Quote size={16} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center md:text-left">
                    <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold text-herb-green-dark">{testimonial.author}</p>
                      <p className="text-sm text-gray-600">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === activeIndex ? 'bg-herb-green-dark w-6' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
