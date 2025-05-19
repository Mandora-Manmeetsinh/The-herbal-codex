
import { useState } from 'react';
import { getZoneById } from '@/data/zones';
import { ChevronUp, ChevronDown, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GardenStatsProps {
  currentZone: string;
  plantCount: number;
}

const GardenStats = ({ currentZone, plantCount }: GardenStatsProps) => {
  const [expanded, setExpanded] = useState(false);
  const zone = getZoneById(currentZone);
  
  if (!zone) return null;
  
  return (
    <div className={cn(
      "fixed top-20 left-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg transition-all overflow-hidden p-3",
      expanded ? "w-60" : "w-12 h-12"
    )}>
      {/* Toggle button */}
      <button 
        onClick={() => setExpanded(!expanded)} 
        className="absolute top-1 right-1 z-20 bg-white/80 rounded-full p-1 text-herb-green-dark hover:bg-herb-cream"
        aria-label={expanded ? "Collapse stats" : "Expand stats"}
      >
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      
      {expanded ? (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Info size={16} className="text-herb-green" />
            <h3 className="text-sm font-medium text-herb-green-dark">Garden Stats</h3>
          </div>
          
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">Current Zone:</span>
              <span className="font-medium">{zone.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Plants in Zone:</span>
              <span className="font-medium">{plantCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Zones:</span>
              <span className="font-medium">4</span>
            </div>
            <div className="mt-2 text-xs italic text-gray-500">
              {zone.description}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Info className="text-herb-green-dark" size={20} />
        </div>
      )}
    </div>
  );
};

export default GardenStats;
