
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
  isNightMode: boolean;
  color?: string; // Added color prop for fallback geometry
}

const Plant3D = ({ 
  position, 
  rotation = [0, 0, 0], 
  scale = 1, 
  model, 
  onClick, 
  isRaining,
  isNightMode,
  color = "#2D6A4F" // Default color if none provided
}: PlantProps) => {
  // Use any to bypass the type mismatch issues with the Three.js version
  const group = useRef<any>(null);
  const [modelError, setModelError] = useState(false);
  const [hovered, setHovered] = useState(false);
  
  // Try to load the model using a memoized approach to prevent infinite renders
  let gltfResult;
  try {
    gltfResult = useGLTF(model);
  } catch (error) {
    // This catch will handle synchronous errors, but not async loading failures
    console.error(`Error loading model ${model}:`, error);
  }
  
  // Handle errors after trying to load the model - only run this effect when needed
  useEffect(() => {
    // Only check for model loading errors if we have a result to check
    if (gltfResult && !gltfResult.scene) {
      console.error(`Failed to load model ${model}`);
      setModelError(true);
    }
  }, [gltfResult, model]);
  
  // Animations are only available if model loaded successfully
  const { actions } = useAnimations(
    !modelError && gltfResult?.animations ? gltfResult.animations : [], 
    group
  );
  
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
  
  // Check if model failed to load immediately (for static known failures)
  const hasModelError = modelError || !gltfResult || gltfResult instanceof Error;

  // Adjust color based on night mode
  const plantColor = isNightMode 
    ? new THREE.Color(color).multiplyScalar(0.5).getHexString() // Darker at night
    : color;
  
  // Visual effects for night mode
  const emissiveIntensity = isNightMode ? 0.2 : 0;
  
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
      {hasModelError ? (
        <group>
          {/* Base/stem */}
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 1, 8]} />
            <meshStandardMaterial 
              color="#3e8948" 
              emissive={isNightMode ? "#1a2e18" : "#000000"} 
              emissiveIntensity={emissiveIntensity}
            />
          </mesh>
          
          {/* Plant top/leaves/flower */}
          <mesh position={[0, 1.2, 0]}>
            <sphereGeometry args={[0.8, 16, 16]} />
            <meshStandardMaterial 
              color={plantColor} 
              emissive={isNightMode ? plantColor : "#000000"} 
              emissiveIntensity={emissiveIntensity}
            />
          </mesh>
        </group>
      ) : (
        /* If model loaded successfully, show it with adjusted materials for night mode */
        <primitive 
          object={gltfResult?.scene} 
          // Apply night mode effect to loaded model
          onAfterRender={() => {
            if (isNightMode && gltfResult?.scene) {
              gltfResult.scene.traverse((child: any) => {
                if (child.isMesh && child.material) {
                  // Store original colors if not already stored
                  if (!child.userData.originalColor) {
                    child.userData.originalColor = child.material.color.clone();
                  }
                  
                  if (isNightMode) {
                    // Darken the color for night mode
                    child.material.color.copy(child.userData.originalColor).multiplyScalar(0.5);
                    child.material.emissive = new THREE.Color(0x112211);
                    child.material.emissiveIntensity = 0.2;
                  } else {
                    // Restore original color
                    if (child.userData.originalColor) {
                      child.material.color.copy(child.userData.originalColor);
                      child.material.emissive = new THREE.Color(0x000000);
                      child.material.emissiveIntensity = 0;
                    }
                  }
                }
              });
            }
          }}
        />
      )}
      
      {/* Apply hover effect */}
      {hovered && (
        <group>
          {/* This is a visual indicator for hover state */}
          <mesh position={[0, hasModelError ? 2 : 0.5, 0]} scale={[0.2, 0.2, 0.2]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial color="#52B788" transparent opacity={0.5} />
          </mesh>
        </group>
      )}

      {/* Add firefly effect at night */}
      {isNightMode && (
        <group>
          {[...Array(3)].map((_, i) => (
            <mesh 
              key={`firefly-${i}`} 
              position={[
                Math.random() * 1.5 - 0.75, 
                Math.random() * 1.5 + 0.5, 
                Math.random() * 1.5 - 0.75
              ]}
            >
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshBasicMaterial color="#FFD700" transparent opacity={0.7} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
};

export default Plant3D;
