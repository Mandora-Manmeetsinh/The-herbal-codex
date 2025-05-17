
import React from 'react';
import { Html, useProgress } from '@react-three/drei';

const LoadingScreen = () => {
  const { progress } = useProgress();
  
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-40 h-1 bg-gray-300 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-white text-lg font-medium">
          Loading... {progress.toFixed(0)}%
        </p>
      </div>
    </Html>
  );
};

export default LoadingScreen;
