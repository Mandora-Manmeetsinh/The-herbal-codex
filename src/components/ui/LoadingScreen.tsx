
import { Leaf } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="three-loading">
      <div className="flex flex-col items-center">
        <Leaf size={48} className="animate-sway text-white mb-4" />
        <p className="text-xl font-playfair">Loading the Garden...</p>
        <div className="mt-4 w-48 h-1 bg-white/30 rounded-full overflow-hidden">
          <div className="h-full bg-herb-gold animate-pulse rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
