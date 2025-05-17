
import { Search, CloudSun, Share, Book } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="herb-section bg-herb-cream">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-herb-green-dark mb-4">Discover Our Features</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Explore the rich features of The Herbal Codex that make learning about medicinal plants engaging and immersive.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-lg p-6 shadow-md transition-transform hover:translate-y-[-5px]">
            <div className="mb-4 bg-herb-green-light bg-opacity-20 rounded-full w-14 h-14 flex items-center justify-center">
              <Book className="h-7 w-7 text-herb-green-dark" />
            </div>
            <h3 className="text-xl font-bold text-herb-green-dark mb-2">3D Garden Explorer</h3>
            <p className="text-gray-700">
              Walk through our immersive 3D garden and interact with detailed plant models to learn about their properties.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-white rounded-lg p-6 shadow-md transition-transform hover:translate-y-[-5px]">
            <div className="mb-4 bg-herb-green-light bg-opacity-20 rounded-full w-14 h-14 flex items-center justify-center">
              <CloudSun className="h-7 w-7 text-herb-green-dark" />
            </div>
            <h3 className="text-xl font-bold text-herb-green-dark mb-2">Dynamic Weather</h3>
            <p className="text-gray-700">
              Experience plants in different weather conditions to see how they react to sun, rain, and changing seasons.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-white rounded-lg p-6 shadow-md transition-transform hover:translate-y-[-5px]">
            <div className="mb-4 bg-herb-green-light bg-opacity-20 rounded-full w-14 h-14 flex items-center justify-center">
              <Search className="h-7 w-7 text-herb-green-dark" />
            </div>
            <h3 className="text-xl font-bold text-herb-green-dark mb-2">Advanced Search</h3>
            <p className="text-gray-700">
              Find plants by health benefits, regions, or specific ailments with our powerful search and filter system.
            </p>
          </div>
          
          {/* Feature 4 */}
          <div className="bg-white rounded-lg p-6 shadow-md transition-transform hover:translate-y-[-5px]">
            <div className="mb-4 bg-herb-green-light bg-opacity-20 rounded-full w-14 h-14 flex items-center justify-center">
              <Share className="h-7 w-7 text-herb-green-dark" />
            </div>
            <h3 className="text-xl font-bold text-herb-green-dark mb-2">Social Sharing</h3>
            <p className="text-gray-700">
              Bookmark your favorite plants, create custom collections, and share your discoveries with friends.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
