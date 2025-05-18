
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import GardenScene from '../components/3d/GardenScene';
import PlantInfoPanel from '../components/ui/PlantInfoPanel';
import WeatherToggle from '../components/ui/WeatherToggle';
import ZoneSelector from '../components/ui/ZoneSelector';
import { zones } from '@/data/zones';

const GardenExplorer = () => {
  const [selectedPlant, setSelectedPlant] = useState<any | null>(null);
  const [isRaining, setIsRaining] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [currentZone, setCurrentZone] = useState("ayurvedic"); // Default zone
  const [isZoneChanging, setIsZoneChanging] = useState(false);
  
  const handlePlantSelect = (plant: any) => {
    setSelectedPlant(plant);
    setShowInstructions(false);
  };
  
  const handleWeatherToggle = () => {
    setIsRaining(!isRaining);
  };
  
  const handleZoneChange = (zoneId: string) => {
    setIsZoneChanging(true);
    // Slight delay for camera transition animation
    setTimeout(() => {
      setCurrentZone(zoneId);
      setIsZoneChanging(false);
    }, 1000);
  };
  
  // Find the current zone object
  const activeZone = zones.find(zone => zone.id === currentZone) || zones[0];
  
  return (
    <Layout fullHeight={true}>
      <div className="relative w-full h-screen">
        <GardenScene 
          onPlantSelect={handlePlantSelect} 
          isRaining={isRaining} 
          currentZoneId={currentZone}
          isZoneChanging={isZoneChanging}
        />
        
        <ZoneSelector 
          currentZone={currentZone}
          onZoneSelect={handleZoneChange}
        />
        
        <WeatherToggle isRaining={isRaining} onToggle={handleWeatherToggle} />
        
        {selectedPlant && (
          <PlantInfoPanel plant={selectedPlant} onClose={() => setSelectedPlant(null)} />
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
              <li>☁️ <span className="font-medium">Weather toggle</span>: Experience different conditions</li>
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
