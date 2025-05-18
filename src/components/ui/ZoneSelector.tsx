
import React from 'react';
import { zones } from '@/data/zones';
import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';

interface ZoneSelectorProps {
  currentZone: string;
  onZoneSelect: (zoneId: string) => void;
}

const ZoneSelector = ({ currentZone, onZoneSelect }: ZoneSelectorProps) => {
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
      <div className="bg-black/50 backdrop-blur-sm rounded-full p-1 flex items-center space-x-1">
        {zones.map((zone) => {
          const isActive = currentZone === zone.id;
          const Icon = zone.icon;
          
          return (
            <button
              key={zone.id}
              onClick={() => onZoneSelect(zone.id)}
              className={cn(
                "relative group flex items-center justify-center p-2 rounded-full transition-all duration-300",
                isActive 
                  ? "bg-green-600 text-white" 
                  : "bg-black/30 text-white/70 hover:bg-black/50 hover:text-white"
              )}
              aria-label={`Visit ${zone.name}`}
            >
              <Icon size={18} />
              {isActive && (
                <MapPin size={8} className="absolute -bottom-0.5 text-green-600 animate-pulse" />
              )}
              
              {/* Tooltip */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-12 whitespace-nowrap bg-black/80 text-white text-xs rounded px-2 py-1 pointer-events-none z-10">
                {zone.name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ZoneSelector;
