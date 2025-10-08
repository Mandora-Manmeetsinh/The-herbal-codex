import { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, SSAO, DepthOfField, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import Plant3D from './Plant3D';
import Environment from './Environment';
import LoadingScreen from '../ui/LoadingScreen';
import { getZoneById, zones } from '@/data/zones';
import GardenCharacter from './GardenCharacter';

interface PlantType {
  id: string | number;
  name: string;
  scientificName: string;
  model: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  description: string;
  uses: string;
  nativeRegions: string;
  growingConditions: string;
  color: string;
}

interface GardenSceneProps {
  onPlantSelect: (plantData: PlantType) => void;
  isRaining: boolean;
  isNightMode: boolean;
  currentZoneId: string;
  isZoneChanging: boolean;
  isFirstPerson?: boolean;
  characterPosition: [number, number, number];
  onCharacterMove: (position: [number, number, number]) => void;
}

// Expanded plant data with zone affiliations
const plants = [
  {
    id: "1",
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

// Create garden paths for each zone
const createZonePaths = (zoneId: string) => {
  switch(zoneId) {
    case "ayurvedic":
      return [
        { position: [-15, -0.49, 0], rotation: [0, 0, 0], scale: [2, 0.1, 8] },
        { position: [-15, -0.49, 0], rotation: [0, Math.PI/2, 0], scale: [2, 0.1, 6] },
        { position: [-12, -0.49, 2], rotation: [0, Math.PI/4, 0], scale: [1, 0.1, 3] }
      ];
    case "respiratory":
      return [
        { position: [0, -0.49, -15], rotation: [0, 0, 0], scale: [8, 0.1, 2] },
        { position: [0, -0.49, -15], rotation: [0, Math.PI/2, 0], scale: [2, 0.1, 8] },
        { position: [2, -0.49, -12], rotation: [0, Math.PI/4, 0], scale: [1, 0.1, 3] }
      ];
    case "immunity":
      return [
        { position: [15, -0.49, 0], rotation: [0, 0, 0], scale: [2, 0.1, 8] },
        { position: [15, -0.49, 0], rotation: [0, Math.PI/2, 0], scale: [2, 0.1, 6] },
        { position: [12, -0.49, 2], rotation: [0, -Math.PI/4, 0], scale: [1, 0.1, 3] }
      ];
    case "floral":
      return [
        { position: [0, -0.49, 15], rotation: [0, 0, 0], scale: [8, 0.1, 2] },
        { position: [0, -0.49, 15], rotation: [0, Math.PI/2, 0], scale: [2, 0.1, 8] },
        { position: [2, -0.49, 12], rotation: [0, -Math.PI/4, 0], scale: [1, 0.1, 3] }
      ];
    default:
      return [
        { position: [0, -0.49, 0], rotation: [0, 0, 0], scale: [2, 0.1, 8] },
        { position: [0, -0.49, 0], rotation: [0, Math.PI/2, 0], scale: [2, 0.1, 12] },
      ];
  }
};

// First Person Camera Controller
const FirstPersonCamera = ({ characterPosition }: { characterPosition: [number, number, number] }) => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(
      characterPosition[0],
      characterPosition[1] + 1.7,
      characterPosition[2]
    );
  }, [camera, characterPosition]);
  
  return null;
};

// Camera Controller component to handle zone transitions
const CameraController = ({ 
  targetZoneId, 
  isChanging, 
  isFirstPerson 
}: { 
  targetZoneId: string, 
  isChanging: boolean,
  isFirstPerson: boolean
}) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera } = useThree();
  
  useEffect(() => {
    if (isChanging && !isFirstPerson) {
      const zone = getZoneById(targetZoneId);
      if (zone && controlsRef.current) {
        camera.position.set(...zone.position);
        controlsRef.current.target.set(0, 0, 0);
      }
    }
  }, [targetZoneId, isChanging, camera, isFirstPerson]);
  
  if (isFirstPerson) return null;
  
  return (
    <OrbitControls 
      ref={controlsRef}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      minDistance={2}
      maxDistance={20}
      maxPolarAngle={Math.PI / 2 - 0.1}
    />
  );
};

const GardenScene = ({ 
  onPlantSelect, 
  isRaining, 
  isNightMode,
  currentZoneId, 
  isZoneChanging,
  isFirstPerson = false,
  characterPosition,
  onCharacterMove
}: GardenSceneProps) => {
  const [activePlant, setActivePlant] = useState<string | number | null>(null);

  const handlePlantClick = (plantData: PlantType) => {
    console.log('Plant clicked in scene:', plantData);
    onPlantSelect(plantData);
    setActivePlant(plantData.id);
  };
  
  // Get current zone data
  const currentZone = getZoneById(currentZoneId) || zones[0];
  const gardenPaths = createZonePaths(currentZoneId);
  
  // Filter plants for the current zone
  const zonePlants = plants.filter(plant => 
    currentZone.plants.includes(plant.id.toString())
  );
  
  return (
    <div className="canvas-container">
      <Canvas 
        shadows
        gl={{ 
          antialias: true,
          toneMapping: 2, // ACESFilmicToneMapping
          toneMappingExposure: 1.2,
          outputColorSpace: "srgb"
        }}
      >
        <Suspense fallback={<LoadingScreen />}>
          {!isFirstPerson ? (
            <PerspectiveCamera makeDefault position={currentZone.position} fov={55} />
          ) : (
            <FirstPersonCamera characterPosition={characterPosition} />
          )}
          
          <CameraController 
            targetZoneId={currentZoneId} 
            isChanging={isZoneChanging} 
            isFirstPerson={isFirstPerson}
          />
          
          <Environment
            isRaining={isRaining}
            isNightMode={isNightMode}
            zoneId={currentZoneId} 
            ambientLightColor={currentZone.ambientLight}
            groundColor={currentZone.groundColor}
          />
          
          {/* Enhanced garden paths with better materials */}
          {gardenPaths.map((path, idx) => (
            <mesh 
              key={`path-${idx}`} 
              position={path.position as [number, number, number]} 
              rotation={path.rotation as [number, number, number]}
              receiveShadow
              castShadow
            >
              <boxGeometry args={[path.scale[0], path.scale[1], path.scale[2]]} />
              <meshStandardMaterial 
                color={isNightMode ? "#b8a88a" : "#e0d2bc"} 
                roughness={0.95}
                metalness={0}
                envMapIntensity={0.3}
              />
            </mesh>
          ))}
          
          {/* Enhanced zone entrance marker */}
          <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow>
            <circleGeometry args={[1.5, 64]} />
            <meshStandardMaterial 
              color={isNightMode ? "#9a8970" : "#d4c9a8"} 
              roughness={0.7}
              metalness={0.1}
              envMapIntensity={0.4}
            />
          </mesh>
          
          {/* Decorative border around entrance */}
          <mesh position={[0, 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <ringGeometry args={[1.45, 1.55, 64]} />
            <meshStandardMaterial 
              color={isNightMode ? "#7a6950" : "#a89978"} 
              roughness={0.6}
              metalness={0.2}
            />
          </mesh>
          
          {/* Zone-specific plants */}
          {zonePlants.map((plant) => {
            // Adjust plant positions based on current zone
            const adjustedPosition: [number, number, number] = [
              plant.position[0] + (currentZone.position[0] * 0.5),
              plant.position[1],
              plant.position[2] + (currentZone.position[2] * 0.5)
            ];
            
            return (
              <Plant3D
                key={plant.id}
                position={adjustedPosition}
                rotation={plant.rotation}
                scale={plant.scale}
                model={plant.model}
                // Pass a callback that receives the loaded THREE.Scene from Plant3D
                onClick={handlePlantClick}
                isRaining={isRaining}
                isNightMode={isNightMode}
                color={plant.color}
                plantData={plant}
              />
            );
          })}
          
          {/* Player character - only shown in first person mode */}
          {isFirstPerson && (
            <GardenCharacter
              position={characterPosition}
              onMove={onCharacterMove}
            />
          )}
          
          {/* Enhanced zone name indicator */}
          <mesh 
            position={[currentZone.position[0] * 0.3, 0.01, currentZone.position[2] * 0.3]} 
            rotation={[-Math.PI / 2, 0, 0]} 
            receiveShadow
          >
            <planeGeometry args={[4, 1]} />
            <meshStandardMaterial 
              color={isNightMode ? "#6a3810" : "#8B4513"} 
              transparent 
              opacity={0.6} 
              roughness={0.9}
            />
          </mesh>
          
          {/* Post-processing effects for realism */}
          <EffectComposer>
            {/* Bloom for glowing effects */}
            <Bloom
              intensity={isNightMode ? 1.5 : 0.4}
              luminanceThreshold={isNightMode ? 0.3 : 0.9}
              luminanceSmoothing={0.9}
              blendFunction={BlendFunction.ADD}
            />
            
            {/* SSAO for ambient occlusion */}
            <SSAO
              blendFunction={BlendFunction.MULTIPLY}
              samples={16}
              radius={5}
              intensity={30}
              luminanceInfluence={0.6}
              worldDistanceThreshold={0.5}
              worldDistanceFalloff={0.1}
              worldProximityThreshold={0.5}
              worldProximityFalloff={0.1}
            />
            
            {/* Depth of field for focus */}
            <DepthOfField
              focusDistance={0.02}
              focalLength={0.05}
              bokehScale={isFirstPerson ? 3 : 2}
              height={480}
            />
            
            {/* Vignette for cinematic look */}
            <Vignette
              offset={0.3}
              darkness={isNightMode ? 0.7 : 0.4}
              blendFunction={BlendFunction.NORMAL}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default GardenScene;

interface PlantProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  model: string;
  onClick: (scene: THREE.Scene) => void;
  isRaining: boolean;
  isNightMode: boolean;
  color?: string; // Added color prop for fallback geometry
}
