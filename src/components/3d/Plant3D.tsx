
import { useState, useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

// Define more specific types for our GLTF result
type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.Material>;
  animations: THREE.AnimationClip[];
};

interface PlantProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  model: string;
  onClick: () => void;
  isRaining: boolean;
  color?: string; // Added color prop for fallback geometry
}

const Plant3D = ({ 
  position, 
  rotation = [0, 0, 0], 
  scale = 1, 
  model, 
  onClick, 
  isRaining, 
  color = "#2D6A4F" // Default color if none provided
}: PlantProps) => {
  // Use any to bypass the type mismatch issues with the Three.js version
  const group = useRef<any>(null);
  const [modelError, setModelError] = useState(false);
  
  // Try to load the model, but handle errors gracefully
  let gltfResult: any = null;
  try {
    // Use the useGLTF hook correctly without the error callback
    gltfResult = useGLTF(model);
  } catch (error) {
    console.error(`Error loading model ${model}:`, error);
    setModelError(true);
  }
  
  // Handle errors after trying to load the model
  useEffect(() => {
    const handleModelError = () => {
      console.error(`Failed to load model ${model}`);
      setModelError(true);
    };
    
    // Check if the model failed to load
    if (!gltfResult || !gltfResult.scene) {
      handleModelError();
    }
  }, [gltfResult, model]);
  
  // Animations are only available if model loaded successfully
  const { actions } = useAnimations(
    modelError ? [] : (gltfResult?.animations || []), 
    group
  );
  
  const [hovered, setHovered] = useState(false);
  
  // Try to play animations if available
  useEffect(() => {
    if (!modelError && gltfResult?.animations && gltfResult.animations.length > 0 && actions) {
      // Play the first animation if it exists
      const firstAnimation = Object.keys(actions)[0];
      if (firstAnimation) {
        actions[firstAnimation]?.play();
      }
    }
  }, [actions, modelError, gltfResult]);
  
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
      {/* If model failed to load, show a fallback geometry */}
      {modelError ? (
        <group>
          {/* Base/stem */}
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 1, 8]} />
            <meshStandardMaterial color="#3e8948" />
          </mesh>
          
          {/* Plant top/leaves/flower */}
          <mesh position={[0, 1.2, 0]}>
            <sphereGeometry args={[0.8, 16, 16]} />
            <meshStandardMaterial color={color} />
          </mesh>
        </group>
      ) : (
        /* If model loaded successfully, show it */
        <primitive object={gltfResult?.scene} />
      )}
      
      {/* Apply hover effect */}
      {hovered && (
        <group>
          {/* This is a visual indicator for hover state */}
          <mesh position={[0, modelError ? 2 : 0.5, 0]} scale={[0.2, 0.2, 0.2]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial color="#52B788" transparent opacity={0.5} />
          </mesh>
        </group>
      )}
    </group>
  );
};

// Remove preload since the models aren't available
// This prevents errors during initial load

export default Plant3D;
