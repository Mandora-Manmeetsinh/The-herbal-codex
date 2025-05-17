
import { useState } from 'react';
import { X, Volume, VolumeOff } from 'lucide-react';

interface PlantInfoPanelProps {
  plant: any;
  onClose: () => void;
}

const PlantInfoPanel = ({ plant, onClose }: PlantInfoPanelProps) => {
  const [isNarrating, setIsNarrating] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  
  const handleNarration = () => {
    if (isNarrating) {
      window.speechSynthesis.cancel();
      setIsNarrating(false);
      return;
    }
    
    const text = `${plant.name}, scientifically known as ${plant.scientificName}. ${plant.description} It is commonly used for ${plant.uses} This plant is native to ${plant.nativeRegions} and thrives in ${plant.growingConditions}`;
    
    const newUtterance = new SpeechSynthesisUtterance(text);
    newUtterance.rate = 0.9;
    newUtterance.pitch = 1;
    newUtterance.onend = () => setIsNarrating(false);
    
    setUtterance(newUtterance);
    setIsNarrating(true);
    window.speechSynthesis.speak(newUtterance);
  };
  
  return (
    <div className="plant-info-panel animate-fade-in p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-playfair font-bold text-herb-green-dark">{plant.name}</h2>
          <p className="text-sm italic text-gray-600">{plant.scientificName}</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={handleNarration} 
            className="p-2 rounded-full bg-herb-cream hover:bg-herb-green-light hover:text-white transition-colors"
            aria-label={isNarrating ? "Stop narration" : "Start narration"}
          >
            {isNarrating ? <VolumeOff size={18} /> : <Volume size={18} />}
          </button>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full bg-herb-cream hover:bg-herb-green-light hover:text-white transition-colors"
            aria-label="Close plant information"
          >
            <X size={18} />
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-herb-green mb-1">Description</h3>
          <p className="text-gray-700">{plant.description}</p>
        </div>
        
        <div>
          <h3 className="font-bold text-herb-green mb-1">Medicinal Uses</h3>
          <p className="text-gray-700">{plant.uses}</p>
        </div>
        
        <div>
          <h3 className="font-bold text-herb-green mb-1">Native Regions</h3>
          <p className="text-gray-700">{plant.nativeRegions}</p>
        </div>
        
        <div>
          <h3 className="font-bold text-herb-green mb-1">Growing Conditions</h3>
          <p className="text-gray-700">{plant.growingConditions}</p>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button className="herb-button text-sm">
          View Detailed Information
        </button>
      </div>
    </div>
  );
};

export default PlantInfoPanel;
