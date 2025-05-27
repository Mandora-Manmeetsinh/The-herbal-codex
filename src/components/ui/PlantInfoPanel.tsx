import { useState } from 'react';
import { X, Volume, VolumeOff, Leaf, Flower, Sun, Droplet, Shield } from 'lucide-react';

interface Plant {
  name: string;
  scientificName: string;
  description: string;
  uses: string;
  nativeRegions: string;
  growingConditions: string;
  imageUrl?: string;
  family?: string;
  toxicity?: string;
  floweringSeason?: string;
  sunlight?: string;
  waterNeeds?: string;
  specialFeatures?: string[];
}

interface PlantInfoPanelProps {
  plant: Plant;
  onClose: () => void;
}

const PlantInfoPanel = ({ plant, onClose }: PlantInfoPanelProps) => {
  const [isNarrating, setIsNarrating] = useState(false);
  const [, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [showMore, setShowMore] = useState(false);

  const handleNarration = () => {
    if (isNarrating) {
      window.speechSynthesis.cancel();
      setIsNarrating(false);
      return;
    }

    const text = `${plant.name}, scientifically known as ${plant.scientificName}. ${plant.description} It is commonly used for ${plant.uses}. This plant is native to ${plant.nativeRegions} and thrives in ${plant.growingConditions}.` +
      (plant.family ? ` It belongs to the ${plant.family} family.` : '') +
      (plant.floweringSeason ? ` It flowers in ${plant.floweringSeason}.` : '') +
      (plant.toxicity ? ` Toxicity: ${plant.toxicity}.` : '') +
      (plant.sunlight ? ` Sunlight needs: ${plant.sunlight}.` : '') +
      (plant.waterNeeds ? ` Water needs: ${plant.waterNeeds}.` : '');

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

      {plant.imageUrl && (
        <div className="mb-4 flex justify-center">
          <img
            src={plant.imageUrl}
            alt={plant.name}
            className="rounded-lg shadow-md max-h-48 object-contain"
          />
        </div>
      )}

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

        {showMore && (
          <>
            {plant.family && (
              <div className="flex items-center gap-2">
                <Leaf size={16} className="text-herb-green" />
                <span className="font-bold">Family:</span>
                <span>{plant.family}</span>
              </div>
            )}
            {plant.floweringSeason && (
              <div className="flex items-center gap-2">
                <Flower size={16} className="text-herb-green" />
                <span className="font-bold">Flowering Season:</span>
                <span>{plant.floweringSeason}</span>
              </div>
            )}
            {plant.sunlight && (
              <div className="flex items-center gap-2">
                <Sun size={16} className="text-herb-green" />
                <span className="font-bold">Sunlight:</span>
                <span>{plant.sunlight}</span>
              </div>
            )}
            {plant.waterNeeds && (
              <div className="flex items-center gap-2">
                <Droplet size={16} className="text-herb-green" />
                <span className="font-bold">Water Needs:</span>
                <span>{plant.waterNeeds}</span>
              </div>
            )}
            {plant.toxicity && (
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-herb-green" />
                <span className="font-bold">Toxicity:</span>
                <span>{plant.toxicity}</span>
              </div>
            )}
            {plant.specialFeatures && plant.specialFeatures.length > 0 && (
              <div>
                <span className="font-bold text-herb-green">Special Features:</span>
                <ul className="list-disc ml-6 text-gray-700">
                  {plant.specialFeatures.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button
          className="herb-button text-sm"
          onClick={() => setShowMore((prev) => !prev)}
        >
          {showMore ? "Show Less" : "Show More Features"}
        </button>
        <button className="herb-button text-sm">
          View Detailed Information
        </button>
      </div>
    </div>
  );
};

export default PlantInfoPanel;
