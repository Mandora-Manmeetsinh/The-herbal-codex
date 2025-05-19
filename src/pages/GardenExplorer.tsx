
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import GardenScene from '../components/3d/GardenScene';
import PlantInfoPanel from '../components/ui/PlantInfoPanel';
import WeatherToggle from '../components/ui/WeatherToggle';
import ZoneSelector from '../components/ui/ZoneSelector';
import SymptomFinder from '../components/ui/SymptomFinder';
import MiniMap from '../components/ui/MiniMap';
import GardenStats from '../components/ui/GardenStats';
import { Sun, Moon, Cloud, CloudRain } from 'lucide-react';
import { zones } from '@/data/zones';

const GardenExplorer = () => {
  const [selectedPlant, setSelectedPlant] = useState<any | null>(null);
  const [isRaining, setIsRaining] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [currentZone, setCurrentZone] = useState("ayurvedic"); // Default zone
  const [isZoneChanging, setIsZoneChanging] = useState(false);
  const [showSymptomFinder, setShowSymptomFinder] = useState(false);
  
  // Get current zone object and plant count
  const activeZone = zones.find(zone => zone.id === currentZone) || zones[0];
  const zonePlantsCount = activeZone ? activeZone.plants.length : 0;
  
  const handlePlantSelect = (plant: any) => {
    setSelectedPlant(plant);
    setShowInstructions(false);
    setShowSymptomFinder(false);
  };
  
  const handleWeatherToggle = () => {
    setIsRaining(!isRaining);
  };

  const handleDayNightToggle = () => {
    setIsNightMode(!isNightMode);
  };
  
  const handleZoneChange = (zoneId: string) => {
    setIsZoneChanging(true);
    // Slight delay for camera transition animation
    setTimeout(() => {
      setCurrentZone(zoneId);
      setIsZoneChanging(false);
    }, 1000);
  };

  const toggleSymptomFinder = () => {
    setShowSymptomFinder(!showSymptomFinder);
    if (!showSymptomFinder) {
      setSelectedPlant(null);
    }
  };
  
  return (
    <Layout fullHeight={true}>
      <div className="relative w-full h-screen">
        <GardenScene 
          onPlantSelect={handlePlantSelect} 
          isRaining={isRaining}
          isNightMode={isNightMode}
          currentZoneId={currentZone}
          isZoneChanging={isZoneChanging}
        />
        
        <ZoneSelector 
          currentZone={currentZone}
          onZoneSelect={handleZoneChange}
        />
        
        {/* Garden Stats Panel */}
        <GardenStats 
          currentZone={currentZone} 
          plantCount={zonePlantsCount}
        />
        
        {/* MiniMap */}
        <MiniMap
          currentZone={currentZone}
          onZoneSelect={handleZoneChange}
        />
        
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          {/* Weather toggle */}
          <button 
            onClick={handleWeatherToggle}
            className="p-3 rounded-full bg-white shadow-lg hover:bg-herb-cream transition-colors"
            aria-label={isRaining ? "Switch to sunny weather" : "Switch to rainy weather"}
          >
            {isRaining ? (
              <Cloud className="text-herb-green-dark" size={24} />
            ) : (
              <CloudRain className="text-herb-green" size={24} />
            )}
          </button>
          
          {/* Day/Night toggle */}
          <button 
            onClick={handleDayNightToggle}
            className="p-3 rounded-full bg-white shadow-lg hover:bg-herb-cream transition-colors"
            aria-label={isNightMode ? "Switch to day mode" : "Switch to night mode"}
          >
            {isNightMode ? (
              <Sun className="text-herb-gold" size={24} />
            ) : (
              <Moon className="text-herb-green-dark" size={24} />
            )}
          </button>
        </div>

        {/* Symptom Finder Toggle Button */}
        <button
          onClick={toggleSymptomFinder}
          className={`absolute bottom-4 right-4 p-3 rounded-full shadow-lg transition-colors ${showSymptomFinder ? 'bg-herb-green text-white' : 'bg-white text-herb-green-dark'}`}
          aria-label="Find herbs by symptom"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
        </button>
        
        {selectedPlant && (
          <PlantInfoPanel plant={selectedPlant} onClose={() => setSelectedPlant(null)} />
        )}

        {showSymptomFinder && (
          <SymptomFinder 
            onPlantSelect={handlePlantSelect}
            onClose={() => setShowSymptomFinder(false)}
          />
        )}
        
        {showInstructions && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 p-5 rounded-lg text-white text-center max-w-md backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-3">Welcome to the Herb Garden</h2>
            <p className="mb-4">Explore our medicinal herb garden in 3D.</p>
            <ul className="text-left space-y-2 mb-4">
              <li>🖱️ <span className="font-medium">Mouse drag</span>: Rotate camera view</li>
              <li>🔍 <span className="font-medium">Scroll wheel</span>: Zoom in/out</li>
              <li>🌱 <span className="font-medium">Click on plants</span>: Learn about them</li>
              <li>🧭 <span className="font-medium">Zone selector</span>: Visit different garden areas</li>
              <li>☁️ <span className="font-medium">Weather toggle</span>: Change weather conditions</li>
              <li>🌙 <span className="font-medium">Day/Night toggle</span>: Change time of day</li>
              <li>🔎 <span className="font-medium">Symptom finder</span>: Find herbs for specific ailments</li>
              <li>🗺️ <span className="font-medium">Mini-map</span>: See garden layout and navigate</li>
            </ul>
            <button 
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-full transition-colors"
              onClick={() => setShowInstructions(false)}
            >
              Start Exploring
            </button>
          </div>
        )}
        
        <div className="absolute bottom-8 left-0 w-full text-center pointer-events-none">
          <p className="text-sm bg-black/30 inline-block px-3 py-1 rounded-full text-white">
            <span className="hidden sm:inline">Now exploring: </span>{activeZone.name} | Click plants to learn more
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default GardenExplorer;
