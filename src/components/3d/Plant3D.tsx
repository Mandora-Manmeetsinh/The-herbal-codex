
import { useState, useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    [key: string]: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.Material;
  };
  animations: THREE.AnimationClip[];
};

interface PlantProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  model: string;
  onClick: () => void;
  isRaining: boolean;
}

const Plant3D = ({ position, rotation = [0, 0, 0], scale = 1, model, onClick, isRaining }: PlantProps) => {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(model) as GLTFResult;
  const { actions } = useAnimations(animations, group);
  const [hovered, setHovered] = useState(false);
  
  useEffect(() => {
    if (animations.length > 0 && actions) {
      // Play the first animation if it exists
      const firstAnimation = Object.keys(actions)[0];
      if (firstAnimation) {
        actions[firstAnimation]?.play();
      }
    }
  }, [actions, animations]);
  
  // Handle hover effect
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);
  
  // Make plants sway slightly
  useFrame((state) => {
    if (group.current) {
      const windStrength = isRaining ? 0.05 : 0.02;
      const swayAmount = Math.sin(state.clock.elapsedTime) * windStrength;
      group.current.rotation.z = rotation[2] + swayAmount;
      
      // Slight rotation on y-axis too
      group.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.5) * windStrength;
    }
  });
  
  return (
    <group 
      ref={group} 
      position={position}
      rotation={rotation as [number, number, number]}
      scale={[scale, scale, scale]}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Render all meshes from the loaded model */}
      {Object.keys(nodes).map((nodeName) => {
        const node = nodes[nodeName];
        
        // Skip non-mesh objects
        if (!(node instanceof THREE.Mesh)) return null;
        
        return (
          <mesh
            key={nodeName}
            geometry={node.geometry}
            material={node.material || new THREE.MeshStandardMaterial({ color: 0x2D6A4F })}
            castShadow
            receiveShadow
          >
            {hovered && (
              <meshStandardMaterial
                attach="material"
                color={new THREE.Color("#52B788")}
                emissive={new THREE.Color("#2D6A4F")}
                emissiveIntensity={0.5}
              />
            )}
          </mesh>
        );
      })}
    </group>
  );
};

export default Plant3D;
