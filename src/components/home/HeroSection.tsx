
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-herbs.jpg')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-white">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">The Herbal Codex</h1>
          <p className="text-xl md:text-2xl mb-8">Explore the world of medicinal herbs in an immersive 3D experience.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/garden" className="herb-button bg-herb-green-dark hover:bg-herb-green inline-flex items-center justify-center">
              Explore the Garden
              <ArrowRight size={16} className="ml-2" />
            </Link>
            <Link to="/library" className="herb-button bg-transparent border-2 border-white hover:bg-white hover:text-herb-green-dark transition-colors">
              Browse Plant Library
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-white">
          <path fill="currentColor" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,229.3C960,213,1056,171,1152,154.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
