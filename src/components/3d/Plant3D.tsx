
import { useState, useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';
import type { ThreeEvent } from '@react-three/fiber';

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
  onClick: (plantData: unknown) => void;
  isRaining: boolean;
  isNightMode: boolean;
  color?: string;
  plantData?: unknown; // Add plant data prop
}

const Plant3D = ({ 
  position, 
  rotation = [0, 0, 0], 
  scale = 1, 
  model, 
  onClick, 
  isRaining,
  isNightMode,
  color = "#2D6A4F",
  plantData
}: PlantProps) => {
  const group = useRef<THREE.Group>(null);
  const [modelError, setModelError] = useState(false);
  const [hovered, setHovered] = useState(false);
  
  const gltfResult = useGLTF(model);
  
  useEffect(() => {
    if (gltfResult && !gltfResult.scene) {
      console.error(`Failed to load model ${model}`);
      setModelError(true);
    }
  }, [gltfResult, model]);
  
  const { actions } = useAnimations(
    !modelError && gltfResult?.animations ? gltfResult.animations : [], 
    group
  );
  
  useEffect(() => {
    if (!modelError && gltfResult?.animations && gltfResult.animations.length > 0 && actions) {
      const firstAnimation = Object.keys(actions)[0];
      if (firstAnimation) {
        actions[firstAnimation]?.play();
      }
    }
  }, [actions, modelError, gltfResult]);
  
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);
  
  useFrame((state) => {
    if (group.current) {
      const windStrength = isRaining ? 0.05 : 0.02;
      const swayAmount = Math.sin(state.clock.elapsedTime) * windStrength;
      group.current.rotation.z = rotation[2] + swayAmount;
      group.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.5) * windStrength;
    }
  });
  
  const hasModelError = modelError || !gltfResult || gltfResult instanceof Error;
  const plantColor = isNightMode 
    ? new THREE.Color(color).multiplyScalar(0.5).getHexString()
    : color;
  const emissiveIntensity = isNightMode ? 0.2 : 0;
  
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    console.log('Plant clicked:', plantData);
    // Pass the plant data instead of the scene
    if (plantData) {
      onClick(plantData);
    }
  };

  return (
    <group 
      ref={group} 
      position={position}
      rotation={rotation as [number, number, number]}
      scale={[scale, scale, scale]}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {hasModelError ? (
        <group>
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 1, 8]} />
            <meshStandardMaterial 
              color="#3e8948" 
              emissive={isNightMode ? "#1a2e18" : "#000000"} 
              emissiveIntensity={emissiveIntensity}
            />
          </mesh>
          
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
        <primitive 
          object={gltfResult?.scene} 
          onAfterRender={() => {
            if (isNightMode && gltfResult?.scene) {
              gltfResult.scene.traverse((child: THREE.Object3D) => {
                if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).material) {
                  const mesh = child as THREE.Mesh & { material: THREE.MeshStandardMaterial; userData: Record<string, unknown> };
                  if (!mesh.userData.originalColor) {
                    mesh.userData.originalColor = mesh.material.color.clone();
                  }
                  
                  if (isNightMode) {
                    mesh.material.color.copy(mesh.userData.originalColor).multiplyScalar(0.5);
                    mesh.material.emissive = new THREE.Color(0x112211);
                    mesh.material.emissiveIntensity = 0.2;
                  } else {
                    if (mesh.userData.originalColor) {
                      mesh.material.color.copy(mesh.userData.originalColor);
                      mesh.material.emissive = new THREE.Color(0x000000);
                      mesh.material.emissiveIntensity = 0;
                    }
                  }
                }
              });
            }
          }}
        />
      )}
      
      {hovered && (
        <group>
          <mesh position={[0, hasModelError ? 2 : 0.5, 0]} scale={[0.2, 0.2, 0.2]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshBasicMaterial color="#52B788" transparent opacity={0.5} />
          </mesh>
        </group>
      )}

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
