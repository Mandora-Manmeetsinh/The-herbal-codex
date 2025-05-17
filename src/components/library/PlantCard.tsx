
import { Link } from 'react-router-dom';

interface PlantCardProps {
  plant: {
    id: number;
    name: string;
    scientificName: string;
    image: string;
    benefits: string;
    ailments?: string[];
    regions?: string[];
  };
}

const PlantCard = ({ plant }: PlantCardProps) => {
  return (
    <div className="herb-card group">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={plant.image} 
          alt={plant.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {plant.regions && plant.regions.length > 0 && (
          <div className="absolute top-3 left-3">
            <span className="bg-herb-green-dark text-white text-xs px-2 py-1 rounded-full">
              {plant.regions[0]}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-herb-green-dark">{plant.name}</h3>
        <p className="text-sm italic text-gray-600 mb-2">{plant.scientificName}</p>
        
        <p className="text-gray-700 mb-3 line-clamp-2">{plant.benefits}</p>
        
        {plant.ailments && plant.ailments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {plant.ailments.slice(0, 3).map((ailment, index) => (
              <span key={index} className="bg-herb-cream text-herb-green-dark text-xs px-2 py-1 rounded-full">
                {ailment}
              </span>
            ))}
            {plant.ailments.length > 3 && (
              <span className="text-xs text-gray-500">+{plant.ailments.length - 3} more</span>
            )}
          </div>
        )}
        
        <Link 
          to={`/library/${plant.id}`}
          className="mt-2 inline-block text-herb-green font-medium hover:text-herb-green-dark transition-colors"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default PlantCard;
