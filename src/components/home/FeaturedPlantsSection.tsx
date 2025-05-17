
import { Link } from 'react-router-dom';

const FeaturedPlantsSection = () => {
  // Sample featured plants data
  const featuredPlants = [
    {
      id: 1,
      name: 'Lavender',
      image: '/plants/lavender.jpg',
      benefits: 'Calming, stress relief, sleep aid',
    },
    {
      id: 2,
      name: 'Aloe Vera',
      image: '/plants/aloe.jpg',
      benefits: 'Skin healing, digestive health',
    },
    {
      id: 3,
      name: 'Turmeric',
      image: '/plants/turmeric.jpg',
      benefits: 'Anti-inflammatory, antioxidant',
    },
    {
      id: 4,
      name: 'Peppermint',
      image: '/plants/peppermint.jpg',
      benefits: 'Digestive aid, headache relief',
    }
  ];

  return (
    <section className="herb-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-herb-green-dark mb-4">Featured Plants</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover some of the most beneficial medicinal plants in our collection.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredPlants.map((plant) => (
            <div key={plant.id} className="herb-card overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={plant.image} 
                  alt={plant.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
                <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{plant.name}</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-700 mb-4">{plant.benefits}</p>
                <Link to={`/library/${plant.id}`} className="text-herb-green-dark hover:text-herb-green font-medium inline-flex items-center">
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/library" className="herb-button">
            View All Plants
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPlantsSection;
