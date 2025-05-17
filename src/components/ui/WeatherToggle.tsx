
import { CloudSun, CloudMoon } from 'lucide-react';

interface WeatherToggleProps {
  isRaining: boolean;
  onToggle: () => void;
}

const WeatherToggle = ({ isRaining, onToggle }: WeatherToggleProps) => {
  return (
    <button 
      onClick={onToggle}
      className="weather-toggle p-3 rounded-full bg-white shadow-lg hover:bg-herb-cream transition-colors"
      aria-label={isRaining ? "Switch to sunny weather" : "Switch to rainy weather"}
    >
      {isRaining ? (
        <CloudMoon className="text-herb-green-dark" size={24} />
      ) : (
        <CloudSun className="text-herb-gold" size={24} />
      )}
    </button>
  );
};

export default WeatherToggle;
