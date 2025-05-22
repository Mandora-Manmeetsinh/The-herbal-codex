
import { useState } from 'react';
import { zones } from '@/data/zones';

interface MiniMapProps {
  currentZone: string;
  onZoneSelect: (id: string) => void;
  isCompact?: boolean;
}

const MiniMap = ({ currentZone, onZoneSelect, isCompact = false }: MiniMapProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleZoneClick = (zoneId: string) => {
    onZoneSelect(zoneId);
    setIsExpanded(false);
  };
  
  return (
    <div className={`absolute ${isCompact ? 'right-4 top-24' : 'right-4 top-4'} z-10`}>
      <div 
        className={`bg-white bg-opacity-80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
          isExpanded ? 'w-64 h-64' : isCompact ? 'w-16 h-16' : 'w-32 h-32'
        }`}
      >
        {/* Map Container */}
        <div 
          className="relative w-full h-full p-2 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Map Background */}
          <div className="absolute inset-0 bg-herb-green-dark bg-opacity-30 rounded-lg">
            {/* Central point */}
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-herb-green-dark rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            
            {/* Zone indicators */}
            {zones.map((zone) => {
              // Calculate position based on zone's 3D coordinates
              // Normalize to fit within the map dimensions
              const xPos = ((zone.position[0] / 20) * 0.5 + 0.5) * 100;
              const yPos = ((-zone.position[2] / 20) * 0.5 + 0.5) * 100;
              
              const isActive = zone.id === currentZone;
              
              return (
                <div 
                  key={zone.id}
                  className={`absolute w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer
                    ${isActive 
                      ? 'bg-herb-gold animate-pulse ring-2 ring-herb-gold' 
                      : 'bg-herb-green hover:ring-1 hover:ring-herb-green-dark'}
                  `}
                  style={{ 
                    left: `${xPos}%`, 
                    top: `${yPos}%`,
                    transition: 'all 0.3s ease'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleZoneClick(zone.id);
                  }}
                  title={zone.name}
                >
                  {isExpanded && (
                    <div className="absolute whitespace-nowrap top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-medium">
                      {zone.name}
                    </div>
                  )}
                </div>
              );
            })}
            
            {/* Path lines */}
            <svg className="absolute inset-0 w-full h-full" style={{pointerEvents: 'none'}}>
              <path 
                d="M50,50 L25,25 M50,50 L75,25 M50,50 L75,75 M50,50 L25,75" 
                stroke="#8e9e7c" 
                strokeWidth="1" 
                strokeDasharray="3,2"
                fill="none" 
              />
            </svg>
          </div>
        </div>
        
        {/* Zone Label */}
        {!isExpanded && !isCompact && (
          <div className="absolute bottom-0 inset-x-0 bg-herb-green-dark bg-opacity-70 text-white text-xs py-1 px-2 text-center truncate">
            {zones.find(z => z.id === currentZone)?.name}
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniMap;
