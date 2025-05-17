
import { useState } from 'react';
import Layout from '../components/layout/Layout';
import GardenScene from '../components/3d/GardenScene';
import PlantInfoPanel from '../components/ui/PlantInfoPanel';
import WeatherToggle from '../components/ui/WeatherToggle';

const GardenExplorer = () => {
  const [selectedPlant, setSelectedPlant] = useState<any | null>(null);
  const [isRaining, setIsRaining] = useState(false);
  
  const handlePlantSelect = (plant: any) => {
    setSelectedPlant(plant);
  };
  
  const handleWeatherToggle = () => {
    setIsRaining(!isRaining);
  };
  
  return (
    <Layout fullHeight={true}>
      <div className="relative w-full h-screen">
        <GardenScene onPlantSelect={handlePlantSelect} isRaining={isRaining} />
        
        <WeatherToggle isRaining={isRaining} onToggle={handleWeatherToggle} />
        
        {selectedPlant && (
          <PlantInfoPanel plant={selectedPlant} onClose={() => setSelectedPlant(null)} />
        )}
        
        <div className="absolute bottom-8 left-0 w-full text-center text-white pointer-events-none">
          <p className="text-sm bg-black/30 inline-block px-3 py-1 rounded-full">
            Click on plants to learn more | Use mouse to navigate
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default GardenExplorer;
