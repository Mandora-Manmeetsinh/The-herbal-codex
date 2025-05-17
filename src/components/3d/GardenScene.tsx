
import { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Sky } from '@react-three/drei';
import Plant3D from './Plant3D';
import Environment from './Environment';
import LoadingScreen from '../ui/LoadingScreen';
import GardenCharacter from './GardenCharacter';

interface GardenSceneProps {
  onPlantSelect: (plantData: any) => void;
  isRaining: boolean;
}

// Expanded plant data with more variety and garden-like arrangement
const plants = [
  {
    id: 1,
    name: "Lavender",
    scientificName: "Lavandula angustifolia",
    model: "/models/lavender.glb",
    position: [-4, 0, -3] as [number, number, number],
    rotation: [0, Math.random() * Math.PI, 0] as [number, number, number],
    scale: 1,
    description: "Known for its calming properties and beautiful purple flowers.",
    uses: "Sleep aid, anxiety relief, antiseptic, perfumes.",
    nativeRegions: "Mediterranean, Europe, Africa, Asia",
    growingConditions: "Well-draining soil, full sun, moderate watering.",
    color: "#a388e5"
  },
  {
    id: 2,
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis miller",
    model: "/models/aloe.glb",
    position: [3, 0, 2] as [number, number, number],
    rotation: [0, Math.PI / 4, 0] as [number, number, number],
    scale: 0.8,
    description: "Succulent plant with thick, fleshy leaves filled with gel.",
    uses: "Skin healing, burn treatment, digestive health.",
    nativeRegions: "Arabian Peninsula",
    growingConditions: "Well-draining soil, partial sun, minimal water.",
    color: "#7fcd91"
  },
  {
    id: 3,
    name: "Basil",
    scientificName: "Ocimum basilicum",
    model: "/models/basil.glb",
    position: [-2, 0, 3] as [number, number, number],
    rotation: [0, -Math.PI / 6, 0] as [number, number, number],
    scale: 0.7,
    description: "Aromatic herb with glossy green leaves.",
    uses: "Culinary herb, anti-inflammatory, antibacterial.",
    nativeRegions: "India, Southeast Asia",
    growingConditions: "Rich soil, full sun, regular watering.",
    color: "#2d8a41"
  },
  {
    id: 4,
    name: "Mint",
    scientificName: "Mentha",
    model: "/models/mint.glb",
    position: [2, 0, -2] as [number, number, number],
    rotation: [0, Math.PI / 3, 0] as [number, number, number],
    scale: 0.75,
    description: "Aromatic herb with serrated leaves and a cool flavor.",
    uses: "Digestive aid, breath freshener, flavoring.",
    nativeRegions: "Europe, Asia, Africa",
    growingConditions: "Most soil types, partial to full sun, regular water.",
    color: "#5fb977"
  },
  {
    id: 5,
    name: "Chamomile",
    scientificName: "Matricaria chamomilla",
    model: "/models/chamomile.glb",
    position: [-3, 0, -1] as [number, number, number],
    rotation: [0, Math.PI / 5, 0] as [number, number, number],
    scale: 0.9,
    description: "Daisy-like flowers with a sweet, apple-like scent.",
    uses: "Sleep aid, anti-anxiety, skin soothing.",
    nativeRegions: "Europe, Western Asia",
    growingConditions: "Well-draining soil, full sun, moderate water.",
    color: "#f8e16c"
  },
  // Additional plants to make the garden richer
  {
    id: 6,
    name: "Rosemary",
    scientificName: "Rosmarinus officinalis",
    model: "/models/basil.glb", // Reusing model as fallback
    position: [4, 0, 4] as [number, number, number],
    rotation: [0, Math.random() * Math.PI, 0] as [number, number, number],
    scale: 0.85,
    description: "Fragrant evergreen herb with needle-like leaves.",
    uses: "Culinary herb, memory enhancement, hair growth.",
    nativeRegions: "Mediterranean",
    growingConditions: "Well-draining soil, full sun, drought tolerant.",
    color: "#3a5f42"
  },
  {
    id: 7,
    name: "Sage",
    scientificName: "Salvia officinalis",
    model: "/models/lavender.glb", // Reusing model as fallback
    position: [-5, 0, 1] as [number, number, number],
    rotation: [0, Math.random() * Math.PI, 0] as [number, number, number],
    scale: 0.75,
    description: "Gray-green herb with soft, fuzzy leaves.",
    uses: "Cooking, sore throat relief, antibacterial properties.",
    nativeRegions: "Mediterranean, Balkan Peninsula",
    growingConditions: "Well-draining soil, full sun, drought tolerant.",
    color: "#8ca9a3"
  },
  {
    id: 8,
    name: "Lemon Balm",
    scientificName: "Melissa officinalis",
    model: "/models/mint.glb", // Reusing model as fallback
    position: [5, 0, -3] as [number, number, number],
    rotation: [0, Math.random() * Math.PI, 0] as [number, number, number],
    scale: 0.7,
    description: "Lemon-scented herb with serrated leaves.",
    uses: "Calming tea, insect repellent, antiviral properties.",
    nativeRegions: "South-central Europe, Mediterranean, Central Asia",
    growingConditions: "Rich soil, partial shade, regular water.",
    color: "#97c08d"
  },
  {
    id: 9,
    name: "Thyme",
    scientificName: "Thymus vulgaris",
    model: "/models/basil.glb", // Reusing model as fallback
    position: [-1, 0, 5] as [number, number, number],
    rotation: [0, Math.random() * Math.PI, 0] as [number, number, number],
    scale: 0.6,
    description: "Small, aromatic herb with tiny leaves.",
    uses: "Cooking, cough relief, antiseptic properties.",
    nativeRegions: "Southern Europe, Mediterranean",
    growingConditions: "Well-draining soil, full sun, drought tolerant.",
    color: "#5c7f59"
  },
  {
    id: 10,
    name: "Echinacea",
    scientificName: "Echinacea purpurea",
    model: "/models/chamomile.glb", // Reusing model as fallback
    position: [0, 0, -5] as [number, number, number],
    rotation: [0, Math.random() * Math.PI, 0] as [number, number, number],
    scale: 1.1,
    description: "Daisy-like flowers with raised, cone-shaped centers.",
    uses: "Immune support, anti-inflammatory, wound healing.",
    nativeRegions: "North America",
    growingConditions: "Well-draining soil, full to partial sun, moderate water.",
    color: "#d48cb3"
  },
  {
    id: 11,
    name: "Calendula",
    scientificName: "Calendula officinalis",
    model: "/models/chamomile.glb", // Reusing model as fallback
    position: [6, 0, 0] as [number, number, number],
    rotation: [0, Math.random() * Math.PI, 0] as [number, number, number],
    scale: 0.95,
    description: "Bright orange or yellow daisy-like flowers.",
    uses: "Skin healing, anti-inflammatory, wound treatment.",
    nativeRegions: "Southern Europe, Mediterranean, Middle East",
    growingConditions: "Well-draining soil, full sun, moderate water.",
    color: "#ffb74d"
  },
  {
    id: 12,
    name: "Feverfew",
    scientificName: "Tanacetum parthenium",
    model: "/models/chamomile.glb", // Reusing model as fallback
    position: [-6, 0, -4] as [number, number, number],
    rotation: [0, Math.random() * Math.PI, 0] as [number, number, number],
    scale: 0.8,
    description: "Small daisy-like flowers with yellow centers.",
    uses: "Headache relief, migraine prevention, anti-inflammatory.",
    nativeRegions: "Southeastern Europe",
    growingConditions: "Well-draining soil, full sun to partial shade, moderate water.",
    color: "#ffffff"
  }
];

// Create garden paths and clusters
const gardenPaths = [
  // Main path
  { position: [0, -0.49, 0], rotation: [0, 0, 0], scale: [2, 0.1, 8] },
  // Crossing path
  { position: [0, -0.49, 0], rotation: [0, Math.PI/2, 0], scale: [2, 0.1, 12] },
  // Small corner path
  { position: [4, -0.49, 4], rotation: [0, Math.PI/4, 0], scale: [1, 0.1, 3] }
];

const GardenScene = ({ onPlantSelect, isRaining }: GardenSceneProps) => {
  const controlsRef = useRef(null);
  const [characterPosition, setCharacterPosition] = useState<[number, number, number]>([0, 0, 5]);
  const [activePlant, setActivePlant] = useState<number | null>(null);
  
  const handlePlantClick = (plant: any) => {
    onPlantSelect(plant);
    setActivePlant(plant.id);
    
    // Move camera slightly toward the selected plant
    if (controlsRef.current) {
      controlsRef.current.target.set(
        plant.position[0], 
        plant.position[1] + 1, 
        plant.position[2]
      );
    }
  };

  const handleCharacterMove = (newPosition: [number, number, number]) => {
    setCharacterPosition(newPosition);
    
    // Check if character is near any plant (for touch interaction)
    plants.forEach(plant => {
      const dx = newPosition[0] - plant.position[0];
      const dz = newPosition[2] - plant.position[2];
      const distanceSquared = dx * dx + dz * dz;
      
      // If character is within 1 unit of a plant, consider it "touching"
      if (distanceSquared < 1) {
        if (activePlant !== plant.id) {
          handlePlantClick(plant);
        }
      }
    });
  };
  
  return (
    <div className="canvas-container">
      <Canvas shadows>
        <Suspense fallback={<LoadingScreen />}>
          <PerspectiveCamera makeDefault position={[5, 3, 8]} fov={50} />
          <OrbitControls 
            ref={controlsRef}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={20}
            maxPolarAngle={Math.PI / 2 - 0.1} // Prevent going below ground
          />
          
          <Environment isRaining={isRaining} />
          
          {/* Garden paths */}
          {gardenPaths.map((path, idx) => (
            <mesh 
              key={`path-${idx}`} 
              position={path.position as [number, number, number]} 
              rotation={path.rotation as [number, number, number]}
              receiveShadow
            >
              {/* Fixed: Specify the correct tuple type for boxGeometry args */}
              <boxGeometry args={[path.scale[0], path.scale[1], path.scale[2]]} />
              <meshStandardMaterial color="#e0d2bc" roughness={0.9} />
            </mesh>
          ))}
          
          {/* Garden border/edging */}
          <mesh position={[0, -0.45, 0]} receiveShadow>
            <torusGeometry args={[9, 0.3, 8, 36]} />
            <meshStandardMaterial color="#8B4513" roughness={0.8} />
          </mesh>
          
          {/* Plants */}
          {plants.map((plant) => (
            <Plant3D
              key={plant.id}
              position={plant.position}
              rotation={plant.rotation}
              scale={plant.scale}
              model={plant.model}
              onClick={() => handlePlantClick(plant)}
              isRaining={isRaining}
              color={plant.color}
            />
          ))}
          
          {/* User character that can walk in the garden */}
          <GardenCharacter 
            position={characterPosition} 
            onMove={handleCharacterMove}
          />
        </Suspense>
      </Canvas>
      
      {/* Controls help */}
      <div className="absolute bottom-16 left-0 w-full text-center text-white pointer-events-none">
        <p className="text-sm bg-black/30 inline-block px-3 py-1 rounded-full">
          Use WASD or arrow keys to move character | Walk near plants to interact
        </p>
      </div>
    </div>
  );
};

export default GardenScene;
