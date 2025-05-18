
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

// Define the symptoms and their related plant IDs
const symptomsMap = [
  { id: 'stress', name: 'Stress & Anxiety', plants: ['1', '5', '8'] }, // Lavender, Chamomile, Lemon Balm
  { id: 'sleep', name: 'Sleep Issues', plants: ['1', '5', '7'] }, // Lavender, Chamomile, Sage
  { id: 'digestion', name: 'Digestive Problems', plants: ['3', '4', '8'] }, // Basil, Mint, Lemon Balm
  { id: 'immune', name: 'Immune Support', plants: ['2', '9', '10'] }, // Aloe Vera, Thyme, Echinacea
  { id: 'respiratory', name: 'Respiratory Issues', plants: ['6', '9', '12'] }, // Rosemary, Thyme, Feverfew
  { id: 'skin', name: 'Skin Conditions', plants: ['2', '11', '12'] }, // Aloe Vera, Calendula, Feverfew
  { id: 'pain', name: 'Pain Relief', plants: ['3', '10', '12'] }, // Basil, Echinacea, Feverfew
  { id: 'inflammation', name: 'Inflammation', plants: ['3', '6', '10'] }, // Basil, Rosemary, Echinacea
];

// Plant database
const plantsData = [
  { id: "1", name: "Lavender", scientificName: "Lavandula angustifolia", uses: "Sleep aid, anxiety relief, antiseptic, perfumes." },
  { id: "2", name: "Aloe Vera", scientificName: "Aloe barbadensis miller", uses: "Skin healing, burn treatment, digestive health." },
  { id: "3", name: "Basil", scientificName: "Ocimum basilicum", uses: "Culinary herb, anti-inflammatory, antibacterial." },
  { id: "4", name: "Mint", scientificName: "Mentha", uses: "Digestive aid, breath freshener, flavoring." },
  { id: "5", name: "Chamomile", scientificName: "Matricaria chamomilla", uses: "Sleep aid, anti-anxiety, skin soothing." },
  { id: "6", name: "Rosemary", scientificName: "Rosmarinus officinalis", uses: "Culinary herb, memory enhancement, hair growth." },
  { id: "7", name: "Sage", scientificName: "Salvia officinalis", uses: "Cooking, sore throat relief, antibacterial properties." },
  { id: "8", name: "Lemon Balm", scientificName: "Melissa officinalis", uses: "Calming tea, insect repellent, antiviral properties." },
  { id: "9", name: "Thyme", scientificName: "Thymus vulgaris", uses: "Cooking, cough relief, antiseptic properties." },
  { id: "10", name: "Echinacea", scientificName: "Echinacea purpurea", uses: "Immune support, anti-inflammatory, wound healing." },
  { id: "11", name: "Calendula", scientificName: "Calendula officinalis", uses: "Skin healing, anti-inflammatory, wound treatment." },
  { id: "12", name: "Feverfew", scientificName: "Tanacetum parthenium", uses: "Headache relief, migraine prevention, anti-inflammatory." }
];

interface SymptomFinderProps {
  onPlantSelect: (plant: any) => void;
  onClose: () => void;
}

const SymptomFinder = ({ onPlantSelect, onClose }: SymptomFinderProps) => {
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);
  const [matchedPlants, setMatchedPlants] = useState<any[]>([]);

  useEffect(() => {
    if (selectedSymptom) {
      const symptomData = symptomsMap.find(s => s.id === selectedSymptom);
      if (symptomData) {
        const plants = symptomData.plants.map(plantId => 
          plantsData.find(plant => plant.id === plantId)
        ).filter(Boolean);
        setMatchedPlants(plants);
      } else {
        setMatchedPlants([]);
      }
    } else {
      setMatchedPlants([]);
    }
  }, [selectedSymptom]);

  const handlePlantClick = (plant: any) => {
    // Find the full plant data from the garden
    const fullPlant = plantsData.find(p => p.id === plant.id);
    if (fullPlant) {
      onPlantSelect(fullPlant);
    }
  };

  return (
    <div className="absolute right-4 bottom-16 w-80 max-w-[90vw] bg-white/95 rounded-lg shadow-lg p-4 backdrop-blur-sm transition-all duration-300 border border-herb-green/20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-herb-green-dark">Find Plants by Symptom</h3>
        <button 
          onClick={onClose} 
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close symptom finder"
        >
          <X size={20} />
        </button>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Select a health concern to find recommended herbs:</p>
        <div className="grid grid-cols-2 gap-2">
          {symptomsMap.map(symptom => (
            <button
              key={symptom.id}
              className={`p-2 text-sm rounded-md transition-colors ${
                selectedSymptom === symptom.id
                  ? 'bg-herb-green text-white'
                  : 'bg-herb-green/10 text-herb-green-dark hover:bg-herb-green/20'
              }`}
              onClick={() => setSelectedSymptom(symptom.id)}
            >
              {symptom.name}
            </button>
          ))}
        </div>
      </div>

      {selectedSymptom && matchedPlants.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Recommended Herbs:</h4>
          <div className="max-h-48 overflow-y-auto pr-1">
            {matchedPlants.map((plant) => (
              <div 
                key={plant.id}
                className="bg-herb-cream/40 p-3 rounded-md mb-2 cursor-pointer hover:bg-herb-cream transition-colors"
                onClick={() => handlePlantClick(plant)}
              >
                <div className="font-medium text-herb-green-dark">{plant.name}</div>
                <div className="text-xs italic text-gray-600">{plant.scientificName}</div>
                <div className="text-xs mt-1 text-gray-700">{plant.uses}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedSymptom && matchedPlants.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No matching herbs found.
        </div>
      )}
    </div>
  );
};

export default SymptomFinder;
