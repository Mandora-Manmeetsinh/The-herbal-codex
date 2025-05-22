import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  Environment, 
  useGLTF,
  Sky, 
  Stars,
  useTexture,
  Cloud,
  Text
} from '@react-three/drei';
import * as THREE from 'three';

// Mist/Fog effect component
const VolumetricMist = () => {
  const count = 20;
  const meshes = [];
  
  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 40;
    const z = (Math.random() - 0.5) * 40;
    const y = Math.random() * 3;
    const scale = 2 + Math.random() * 5;
    
    meshes.push(
      <mesh 
        key={`mist-${i}`} 
        position={[x, y, z]} 
        rotation={[0, Math.random() * Math.PI * 2, 0]}
        scale={[scale, 0.5 + Math.random(), scale]}
      >
        <planeGeometry />
        <meshStandardMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.2 + Math.random() * 0.1}
          depthWrite={false}
        />
      </mesh>
    );
  }
  
  return <>{meshes}</>;
};

// Forest Trees
const ForestTrees = () => {
  // Create bamboo/pine shapes
  const treeCount = 30;
  const trees = [];
  
  for (let i = 0; i < treeCount; i++) {
    const x = (Math.random() - 0.5) * 50;
    const z = (Math.random() - 0.5) * 50;
    const height = 8 + Math.random() * 10;
    const thickness = 0.3 + Math.random() * 0.3;
    
    // Don't place trees on the path (roughly z=0, x from -15 to 15)
    if (Math.abs(z) < 5 && Math.abs(x) < 15) continue;
    
    trees.push(
      <group key={`tree-${i}`} position={[x, 0, z]}>
        {/* Tree trunk */}
        <mesh position={[0, height/2, 0]}>
          <cylinderGeometry args={[thickness, thickness*1.2, height, 8]} />
          <meshStandardMaterial color="#5D4037" roughness={0.8} />
        </mesh>
        
        {/* Tree foliage - different shapes for variety */}
        {i % 3 === 0 ? (
          // Pine tree shape
          <mesh position={[0, height*0.8, 0]}>
            <coneGeometry args={[height/4, height*0.8, 8]} />
            <meshStandardMaterial color="#2D4F21" roughness={0.9} />
          </mesh>
        ) : (
          // Bamboo/leafy shape
          Array.from({ length: 5 }).map((_, idx) => (
            <mesh 
              key={`foliage-${i}-${idx}`} 
              position={[
                Math.sin(idx) * 0.5, 
                height - 2 + idx, 
                Math.cos(idx) * 0.5
              ]}
            >
              <sphereGeometry args={[1.5 + Math.random(), 8, 8]} />
              <meshStandardMaterial 
                color={i % 2 === 0 ? "#1E3A29" : "#2D5A31"} 
                roughness={0.8} 
              />
            </mesh>
          ))
        )}
      </group>
    );
  }
  
  return <>{trees}</>;
};

// Stone Path
const StonePath = () => {
  // Create main path
  return (
    <group>
      {/* Main stone path - slightly winding */}
      <mesh 
        position={[0, 0.01, 0]} 
        rotation={[-Math.PI / 2, 0, 0.1]}
      >
        <planeGeometry args={[6, 30]} />
        <meshStandardMaterial 
          color="#7D7F7C" 
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
      
      {/* Path borders - mossy stones */}
      {Array.from({ length: 20 }).map((_, i) => {
        const side = i % 2 === 0 ? 1 : -1;
        const z = i - 10;
        
        return (
          <mesh 
            key={`stone-${i}`}
            position={[side * 3.5 + (Math.random() - 0.5), 0.1, z * 1.5]} 
            rotation={[
              Math.random() * 0.2, 
              Math.random() * Math.PI, 
              Math.random() * 0.2
            ]}
          >
            <boxGeometry args={[
              0.8 + Math.random() * 0.8, 
              0.3 + Math.random() * 0.3, 
              0.8 + Math.random() * 0.8
            ]} />
            <meshStandardMaterial 
              color={Math.random() > 0.5 ? "#566357" : "#4A5E48"}
              roughness={0.9}
            />
          </mesh>
        );
      })}
      
      {/* Stone steps */}
      {Array.from({ length: 7 }).map((_, i) => (
        <mesh 
          key={`step-${i}`}
          position={[0, 0.1 * (i+1), -8 - i * 1.5]} 
          rotation={[-0.1 * i, 0, 0]}
        >
          <boxGeometry args={[5, 0.2, 1]} />
          <meshStandardMaterial color="#727377" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
};

// Herbal Plants
const HerbalPlants = ({ onHover }: { onHover: (herbName: string, isHovered: boolean) => void }) => {
  const herbsData = [
    { name: "Tulsi", position: [-2, 0.1, -3] as [number, number, number], color: "#3A7D44" },
    { name: "Brahmi", position: [2, 0.1, -5] as [number, number, number], color: "#5E9C60" },
    { name: "Gotu Kola", position: [-3, 0.1, -8] as [number, number, number], color: "#8FBC8F" },
    { name: "Ashwagandha", position: [3, 0.1, -10] as [number, number, number], color: "#567D46" },
    { name: "Turmeric", position: [-2.5, 0.1, 2] as [number, number, number], color: "#D4AC2B" },
    { name: "Ginseng", position: [2.5, 0.1, 4] as [number, number, number], color: "#B97D60" },
    { name: "Mint", position: [-2, 0.1, 7] as [number, number, number], color: "#52B788" },
    { name: "Lavender", position: [2, 0.1, 10] as [number, number, number], color: "#A388E5" }
  ];
  
  return (
    <>
      {herbsData.map((herb, index) => (
        <group key={`herb-${index}`} position={herb.position}>
          {/* Stem */}
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.05, 0.08, 0.6, 8]} />
            <meshStandardMaterial color="#3E704D" />
          </mesh>
          
          {/* Leaves cluster */}
          <mesh position={[0, 0.7, 0]}>
            <sphereGeometry args={[0.4, 8, 8]} />
            <meshStandardMaterial color={herb.color} roughness={0.8} />
          </mesh>
          
          {/* Interactive hover area */}
          <mesh
            position={[0, 0.7, 0]}
            scale={1.2}
            visible={false}
            onPointerOver={() => onHover(herb.name, true)}
            onPointerOut={() => onHover(herb.name, false)}
          >
            <sphereGeometry args={[0.5, 8, 8]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>
        </group>
      ))}
    </>
  );
};

// Glowing Lanterns
const Lanterns = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => {
        const side = i % 2 === 0 ? 1 : -1;
        const z = i * 3 - 15;
        
        return (
          <group key={`lantern-${i}`} position={[side * 3, 0.5, z]}>
            {/* Lantern base */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.1, 0.1, 1.2, 8]} />
              <meshStandardMaterial color="#5D4037" />
            </mesh>
            
            {/* Lantern body */}
            <mesh position={[0, 1, 0]}>
              <boxGeometry args={[0.4, 0.6, 0.4]} />
              <meshStandardMaterial 
                color="#F8D675" 
                transparent 
                opacity={0.7} 
                emissive="#F8D675"
                emissiveIntensity={0.5}
              />
            </mesh>
            
            {/* Light source */}
            <pointLight 
              position={[0, 1, 0]} 
              color="#FFF4D4" 
              intensity={0.8} 
              distance={3} 
              decay={2}
            />
          </group>
        );
      })}
    </>
  );
};

// Zone Markers
const ZoneMarkers = ({ onNavigate }: { onNavigate: (path: string) => void }) => {
  const zones = [
    { name: "Immunity Herbs", position: [-10, 0, -10] as [number, number, number], path: "immunity" },
    { name: "Aromatic Garden", position: [10, 0, -10] as [number, number, number], path: "floral" },
    { name: "Relaxation Zone", position: [10, 0, 10] as [number, number, number], path: "respiratory" },
    { name: "Ancient Remedies", position: [-10, 0, 10] as [number, number, number], path: "ayurvedic" },
  ];
  
  return (
    <>
      {zones.map((zone, index) => (
        <group key={`zone-${index}`} position={zone.position}>
          {/* Zone platform */}
          <mesh position={[0, 0.05, 0]} rotation={[-Math.PI/2, 0, 0]}>
            <circleGeometry args={[3, 32]} />
            <meshStandardMaterial color="#D0C090" roughness={0.8} />
          </mesh>
          
          {/* Zone pillar */}
          <mesh position={[0, 1, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 2, 8]} />
            <meshStandardMaterial color="#8B4513" roughness={0.7} />
          </mesh>
          
          {/* Zone label - replaced Text3D with Text */}
          <group position={[0, 2.5, 0]} rotation={[0, Math.PI / 4, 0]}>
            <Text
              fontSize={0.5}
              color="#D4AC2B"
              anchorX="center"
              anchorY="middle"
              position={[0, 0, 0]}
              onClick={() => onNavigate(zone.path)}
              userData={{ hoverable: true }}
            >
              {zone.name}
              <meshStandardMaterial 
                color="#D4AC2B" 
                metalness={0.5}
                roughness={0.2}
                emissive="#D4AC2B"
                emissiveIntensity={0.2}
              />
            </Text>
          </group>
          
          {/* Glowing element */}
          <pointLight 
            position={[0, 2, 0]} 
            color="#FFF4D4" 
            intensity={0.5} 
            distance={4} 
          />
        </group>
      ))}
    </>
  );
};

interface Props {
  children: React.ReactNode;
  position: [number, number, number];
}

// Fix missing Html import
const Html = ({ position, children }: Props) => {
  return (
    <mesh position={position}>
      <planeGeometry args={[0.1, 0.1]} />
      <meshBasicMaterial transparent opacity={0} />
      <div
        style={{
          position: 'absolute',
          transform: `translate3d(${position[0]}px, ${-position[1]}px, ${position[2]}px)`,
          transformOrigin: 'center',
          pointerEvents: 'none',
        }}
      >
        {children}
      </div>
    </mesh>
  );
};

// Main scene component
const CinematicGardenScene = ({ onNavigate }: { onNavigate: (path: string) => void }) => {
  const [hoveredHerb, setHoveredHerb] = useState<string | null>(null);
  
  const handleHerbHover = (herbName: string, isHovered: boolean) => {
    setHoveredHerb(isHovered ? herbName : null);
  };

  return (
    <>
      {/* Camera setup */}
      <PerspectiveCamera 
        makeDefault 
        position={[0, 5, 18]} 
        fov={50}
      />
      
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} color="#B8C5D6" />
      
      {/* Directional sunlight */}
      <directionalLight 
        position={[10, 20, 5]} 
        intensity={0.8} 
        castShadow
        shadow-mapSize={[2048, 2048]}
        color="#F8D9C0"
      />
      
      {/* Atmospheric sky */}
      <Sky 
        distance={450000} 
        sunPosition={[10, 2, 5]} 
        turbidity={10}
        rayleigh={0.5}
        mieCoefficient={0.005}
        mieDirectionalG={0.7}
      />
      
      {/* Subtle stars in the sky */}
      <Stars radius={100} depth={50} count={1000} factor={2} saturation={0} />
      
      {/* Environment ambient lighting */}
      <Environment preset="forest" />
      
      {/* Misty clouds - fixed Cloud props */}
      <Cloud position={[0, 10, -15]} opacity={0.5} speed={0.4} segments={20} />
      <Cloud position={[-10, 6, -20]} opacity={0.3} speed={0.2} segments={10} />
      <Cloud position={[15, 8, -15]} opacity={0.4} speed={0.3} segments={15} />
      
      {/* Scene fog */}
      <fog attach="fog" color="#B8C5D6" near={1} far={50} />
      
      {/* Ground plane */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial 
          color="#3A523B" 
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
      
      {/* Garden Elements */}
      <ForestTrees />
      <StonePath />
      <VolumetricMist />
      <Lanterns />
      <HerbalPlants onHover={handleHerbHover} />
      <ZoneMarkers onNavigate={onNavigate} />
      
      {/* Herb info popup */}
      {hoveredHerb && (
        <Html position={[0, 3, -5]}>
          <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-lg">
            <h3 className="text-herb-green-dark font-bold">{hoveredHerb}</h3>
            <p className="text-sm">Click to explore more herbs like this.</p>
          </div>
        </Html>
      )}
    </>
  );
};

// Main component
const CinematicGardenPreview = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const handleNavigate = (zonePath: string) => {
    navigate(`/garden-explorer?zone=${zonePath}`);
  };
  
  useEffect(() => {
    // Simple visibility observer to load 3D scene when in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
  
  return (
    <section className="relative w-full h-[700px] overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 z-10">
        {isVisible && (
          <Canvas shadows>
            <CinematicGardenScene onNavigate={handleNavigate} />
          </Canvas>
        )}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-herb-green-dark to-transparent opacity-30 z-20" />
      
      <div className="absolute bottom-10 left-0 w-full text-center z-30">
        <div className="bg-black/30 backdrop-blur-sm px-6 py-4 rounded-lg inline-block max-w-2xl mx-auto">
          <h2 className="text-3xl font-playfair text-white mb-2">Explore Our Sacred Garden</h2>
          <p className="text-herb-cream mb-4">
            Wander through our mystic 3D herbal sanctuary and discover ancient healing wisdom
          </p>
          <button 
            onClick={() => navigate('/garden-explorer')}
            className="herb-button group"
          >
            <span className="absolute inset-0 w-0 bg-herb-gold group-hover:w-full transition-all duration-500"></span>
            <span className="relative">Enter Sacred Garden</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CinematicGardenPreview;
