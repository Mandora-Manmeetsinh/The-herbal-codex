
import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <section className="relative py-20 bg-herb-green-dark text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="leaf-pattern" patternUnits="userSpaceOnUse" width="80" height="80" patternTransform="rotate(45)">
              <path d="M20,10 Q40,40 20,70 Q0,40 20,10" fill="currentColor"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leaf-pattern)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your Herbal Journey Today</h2>
          <p className="text-lg mb-8 text-gray-200">
            Ready to explore the fascinating world of medicinal plants? Dive into our immersive 3D garden and discover nature's remedies.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/garden" className="herb-button bg-white text-herb-green-dark hover:bg-herb-cream transition-colors">
              Explore the Garden
            </Link>
            <Link to="/library" className="herb-button bg-transparent border-2 border-white hover:bg-white hover:text-herb-green-dark transition-colors">
              Browse Plant Library
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
