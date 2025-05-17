
import { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import Plant3D from './Plant3D';
import Environment from './Environment';
import LoadingScreen from '../ui/LoadingScreen';

interface GardenSceneProps {
  onPlantSelect: (plantData: any) => void;
  isRaining: boolean;
}

// Sample plant data - in a real app, this would come from an API or database
const plants = [
  {
    id: 1,
    name: "Lavender",
    scientificName: "Lavandula angustifolia",
    model: "/models/lavender.glb", // Example path, would need actual models
    position: [0, 0, 0] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
    scale: 1,
    description: "Known for its calming properties and beautiful purple flowers.",
    uses: "Sleep aid, anxiety relief, antiseptic, perfumes.",
    nativeRegions: "Mediterranean, Europe, Africa, Asia",
    growingConditions: "Well-draining soil, full sun, moderate watering."
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
    growingConditions: "Well-draining soil, partial sun, minimal water."
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
    growingConditions: "Rich soil, full sun, regular watering."
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
    growingConditions: "Most soil types, partial to full sun, regular water."
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
    growingConditions: "Well-draining soil, full sun, moderate water."
  }
];

const GardenScene = ({ onPlantSelect, isRaining }: GardenSceneProps) => {
  const controlsRef = useRef(null);
  
  const handlePlantClick = (plant: any) => {
    onPlantSelect(plant);
    
    // Move camera slightly toward the selected plant
    if (controlsRef.current) {
      controlsRef.current.target.set(
        plant.position[0], 
        plant.position[1] + 1, 
        plant.position[2]
      );
    }
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
            />
          ))}
          
          {/* Post-processing effects */}
          <EffectComposer>
            <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} />
            <DepthOfField 
              focusDistance={0} 
              focalLength={0.02} 
              bokehScale={2} 
              height={480} 
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default GardenScene;
