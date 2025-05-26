
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';

interface PlantCardProps {
  plant: {
    id: number; 
    name: string;
    scientificName: string;
    image: string;
    benefits: string;
    ailments?: string[];
    regions?: string[];
    growthHabit?: string;
    parts?: string[];
    harvestSeason?: string;
  };
}

const PlantCard = ({ plant }: PlantCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="herb-card group perspective"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={plant.image} 
          alt={plant.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        {/* Region badge */}
        {plant.regions && plant.regions.length > 0 && (
          <div className="absolute top-3 left-3 transition-all duration-300 transform group-hover:translate-y-1 opacity-90 group-hover:opacity-100">
            <span className="bg-herb-green-dark text-white text-xs px-2 py-1 rounded-full shadow-lg">
              {plant.regions[0]}
            </span>
          </div>
        )}
        
        {/* Info button */}
        <div 
          className={`absolute top-3 right-3 transition-all duration-300 ease-in-out transform ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          }`}
        >
          <Link 
            to={`/library/${plant.id}`}
            className="bg-white/80 hover:bg-white text-herb-green-dark p-2 rounded-full flex items-center justify-center shadow-lg"
            aria-label={`View details for ${plant.name}`}
          >
            <Info className="h-4 w-4" />
          </Link>
        </div>
        
        {/* Name overlay */}
        <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-xl font-bold text-white">{plant.name}</h3>
          <p className="text-xs text-herb-cream italic">{plant.scientificName}</p>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-gray-700 mb-4 line-clamp-2 h-12">{plant.benefits}</p>
        
        {/* Ailments tags */}
        {plant.ailments && plant.ailments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {plant.ailments.slice(0, 3).map((ailment, index) => (
              <span key={index} className="bg-herb-cream text-herb-green-dark text-xs px-2 py-1 rounded-full transition-all duration-300 hover:bg-herb-green-light hover:text-white">
                {ailment}
              </span>
            ))}
            {plant.ailments.length > 3 && (
              <span className="text-xs text-gray-500">+{plant.ailments.length - 3} more</span>
            )}
          </div>
        )}
        
        {/* Additional info */}
        <div className="grid grid-cols-2 gap-1 mb-4 text-xs text-gray-600">
          {plant.growthHabit && (
            <div>
              <span className="font-medium">Type:</span> {plant.growthHabit}
            </div>
          )}
          {plant.harvestSeason && (
            <div>
              <span className="font-medium">Harvest:</span> {plant.harvestSeason}
            </div>
          )}
        </div>
        
        {/* View details link */}
        <Link 
          to={`/library/${plant.id}`}
          className="w-full block text-center py-2 border-t border-herb-green-light/30 text-herb-green font-medium hover:text-herb-green-dark transition-colors mt-auto group-hover:bg-herb-cream/30"
        >
          View Details 
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default PlantCard;
