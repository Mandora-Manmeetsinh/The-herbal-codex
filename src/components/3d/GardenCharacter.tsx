import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';

interface GardenCharacterProps {
  position: [number, number, number];
  onMove: (position: [number, number, number]) => void;
}

const GardenCharacter = ({ position, onMove }: GardenCharacterProps) => {
  const characterRef = useRef<THREE.Mesh>(null);
  const [moveForward, setMoveForward] = useState(false);
  const [moveBackward, setMoveBackward] = useState(false);
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);
  const [characterRotation, setCharacterRotation] = useState(0);
  const { camera } = useThree();

  // Set up keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch(e.code) {
        case 'KeyW':
        case 'ArrowUp':
          setMoveForward(true);
          break;
        case 'KeyS':
        case 'ArrowDown':
          setMoveBackward(true);
          break;
        case 'KeyA':
        case 'ArrowLeft':
          setMoveLeft(true);
          break;
        case 'KeyD':
        case 'ArrowRight':
          setMoveRight(true);
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch(e.code) {
        case 'KeyW':
        case 'ArrowUp':
          setMoveForward(false);
          break;
        case 'KeyS':
        case 'ArrowDown':
          setMoveBackward(false);
          break;
        case 'KeyA':
        case 'ArrowLeft':
          setMoveLeft(false);
          break;
        case 'KeyD':
        case 'ArrowRight':
          setMoveRight(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Move character based on keyboard input
  useFrame(() => {
    if (characterRef.current) {
      const moveSpeed = 0.1;
      const turnSpeed = 0.05;
      let hasMoved = false;
      const currentPosition = [...position] as [number, number, number];

      // Set rotation based on movement
      if (moveLeft) {
        setCharacterRotation(characterRotation - turnSpeed);
        hasMoved = true;
      }
      if (moveRight) {
        setCharacterRotation(characterRotation + turnSpeed);
        hasMoved = true;
      }
      
      // Move character forward/backward based on current rotation
      if (moveForward) {
        currentPosition[0] -= Math.sin(characterRotation) * moveSpeed;
        currentPosition[2] -= Math.cos(characterRotation) * moveSpeed;
        hasMoved = true;
      }
      if (moveBackward) {
        currentPosition[0] += Math.sin(characterRotation) * moveSpeed;
        currentPosition[2] += Math.cos(characterRotation) * moveSpeed;
        hasMoved = true;
      }

      // Enforce garden boundaries - keep character within a 10x10 area
      currentPosition[0] = Math.max(-9, Math.min(9, currentPosition[0]));
      currentPosition[2] = Math.max(-9, Math.min(9, currentPosition[2]));

      // Update character position and rotation
      characterRef.current.position.set(currentPosition[0], currentPosition[1], currentPosition[2]);
      characterRef.current.rotation.y = characterRotation;
      
      // Update camera to follow character if moving
      if (hasMoved) {
        onMove(currentPosition);
        
        // Position camera behind character
        const cameraDistance = 5;
        const cameraHeight = 3;
        const cameraPositionX = currentPosition[0] + cameraDistance * Math.sin(characterRotation);
        const cameraPositionZ = currentPosition[2] + cameraDistance * Math.cos(characterRotation);
        
        camera.position.lerp(new THREE.Vector3(cameraPositionX, cameraHeight, cameraPositionZ), 0.05);
        camera.lookAt(new THREE.Vector3(currentPosition[0], currentPosition[1] + 1, currentPosition[2]));
      }
    }
  });

  return (
    <mesh ref={characterRef} position={position} castShadow receiveShadow>
      {/* Character body */}
      <group>
        {/* Body */}
        <mesh position={[0, 0.9, 0]}>
          <capsuleGeometry args={[0.3, 0.8, 4, 8]} />
          <meshStandardMaterial color="#634e34" />
        </mesh>
        
        {/* Head */}
        <mesh position={[0, 1.7, 0]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial color="#f8d5c0" />
        </mesh>
        
        {/* Arms */}
        <mesh position={[0.4, 1.0, 0]} rotation={[0, 0, -Math.PI / 8]}>
          <capsuleGeometry args={[0.1, 0.7, 4, 8]} />
          <meshStandardMaterial color="#634e34" />
        </mesh>
        <mesh position={[-0.4, 1.0, 0]} rotation={[0, 0, Math.PI / 8]}>
          <capsuleGeometry args={[0.1, 0.7, 4, 8]} />
          <meshStandardMaterial color="#634e34" />
        </mesh>
        
        {/* Legs */}
        <mesh position={[0.2, 0.4, 0]}>
          <capsuleGeometry args={[0.12, 0.7, 4, 8]} />
          <meshStandardMaterial color="#3a5a78" />
        </mesh>
        <mesh position={[-0.2, 0.4, 0]}>
          <capsuleGeometry args={[0.12, 0.7, 4, 8]} />
          <meshStandardMaterial color="#3a5a78" />
        </mesh>
        
        {/* Hat */}
        <mesh position={[0, 1.95, 0]} rotation={[Math.PI / 16, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.35, 0.2, 16]} />
          <meshStandardMaterial color="#87ceeb" />
        </mesh>
      </group>
    </mesh>
  );
};

export default GardenCharacter;
