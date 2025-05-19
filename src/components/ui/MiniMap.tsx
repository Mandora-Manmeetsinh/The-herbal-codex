
import React, { useState } from 'react';
import { zones, PlantZone } from '@/data/zones';
import { cn } from '@/lib/utils';
import { MapPin, X } from 'lucide-react';

interface MiniMapProps {
  currentZone: string;
  onZoneSelect: (zoneId: string) => void;
}

const MiniMap = ({ currentZone, onZoneSelect }: MiniMapProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={cn(
      "fixed bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg transition-all overflow-hidden",
      expanded ? "w-72 h-72" : "w-12 h-12"
    )}>
      {/* Toggle button */}
      <button 
        onClick={handleToggle} 
        className="absolute top-1 right-1 z-20 bg-white/80 rounded-full p-1 text-herb-green-dark hover:bg-herb-cream"
        aria-label={expanded ? "Minimize map" : "Expand map"}
      >
        {expanded ? <X size={14} /> : <MapPin size={14} />}
      </button>
      
      {/* Mini map content */}
      {expanded ? (
        <div className="relative w-full h-full p-2">
          <h3 className="text-xs font-medium text-herb-green-dark mb-1">Garden Zones</h3>
          <div className="relative w-full h-[calc(100%-24px)] bg-herb-cream/50 rounded-md overflow-hidden">
            {/* Central point */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-herb-green z-10" />
            
            {/* Zone indicators */}
            {zones.map((zone) => {
              // Calculate position based on the camera position in the zones data
              // We'll invert the coordinates to create a top-down map view
              const x = (zone.position[0] / 30) * 50 + 50; // Convert to percentage (0-100%)
              const y = (zone.position[2] / 30) * 50 + 50; // Convert to percentage (0-100%)
              const isActive = currentZone === zone.id;
              const Icon = zone.icon;
              
              return (
                <button
                  key={zone.id}
                  className={cn(
                    "absolute p-1 rounded-full transition-all transform hover:scale-110",
                    isActive ? "bg-herb-green text-white shadow-md scale-110" : "bg-white/80 text-herb-green-dark"
                  )}
                  style={{ 
                    left: `${x}%`, 
                    top: `${y}%`,
                    transform: `translate(-50%, -50%) ${isActive ? 'scale(1.1)' : 'scale(1)'}` 
                  }}
                  onClick={() => onZoneSelect(zone.id)}
                  aria-label={`Go to ${zone.name}`}
                >
                  <Icon size={16} />
                  <div className={cn(
                    "absolute whitespace-nowrap text-[10px] font-medium px-1.5 py-0.5 rounded-sm transition-opacity",
                    isActive ? "bg-herb-green text-white opacity-100" : "bg-white text-herb-green-dark opacity-0 group-hover:opacity-100"
                  )}
                  style={{ top: '-18px', left: '50%', transform: 'translateX(-50%)' }}>
                    {zone.name.split(' ')[0]}
                  </div>
                  {isActive && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-herb-green opacity-30" />
                  )}
                </button>
              );
            })}
            
            {/* Path connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              {zones.map((zone, i) => {
                // Draw lines from center to each zone
                const x1 = "50%";
                const y1 = "50%";
                const x2 = `${(zone.position[0] / 30) * 50 + 50}%`;
                const y2 = `${(zone.position[2] / 30) * 50 + 50}%`;
                
                return (
                  <line
                    key={`path-${zone.id}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={currentZone === zone.id ? "#2d704c" : "#2d704c40"}
                    strokeWidth={currentZone === zone.id ? "2" : "1"}
                    strokeDasharray={currentZone === zone.id ? "none" : "3,3"}
                  />
                );
              })}
            </svg>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <MapPin className="text-herb-green-dark" size={20} />
        </div>
      )}
    </div>
  );
};

export default MiniMap;
