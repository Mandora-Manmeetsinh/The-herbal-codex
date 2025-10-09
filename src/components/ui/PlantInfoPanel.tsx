import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Leaf, 
  Droplets, 
  Sun, 
  MapPin, 
  Calendar,
  Sparkles,
  Heart,
  Share2,
  BookmarkPlus,
  ChevronLeft,
  ChevronRight,
  Info,
  Lightbulb,
  Shield,
  Clock,
  ThermometerSun,
  Wind,
  AlertCircle,
  Check,
  Star,
  Zap,
  Volume,
  VolumeOff
} from 'lucide-react';

interface Plant {
  name: string;
  scientificName: string;
  description: string;
  uses: string;
  nativeRegions: string;
  growingConditions: string;
  imageUrl?: string;
  family?: string;
  toxicity?: string;
  floweringSeason?: string;
  sunlight?: string;
  waterNeeds?: string;
  specialFeatures?: string[];
}

interface PlantInfoPanelProps {
  plant: Plant;
  onClose: () => void;
}

// Enhanced plant data structure to support the new design
interface EnhancedPlant {
  name: string;
  scientificName: string;
  commonNames: string[];
  description: string;
  images: string[];
  rating: number;
  reviews: number;
  difficulty: string;
  medicinalUses: Array<{ name: string; icon: any; description: string }>;
  nativeRegions: string[];
  growingInfo: {
    sunlight: string;
    water: string;
    soil: string;
    temperature: string;
    humidity: string;
    spacing: string;
  };
  harvestSeason: string[];
  uses: string[];
  tips: string[];
  companion: string[];
  warnings: string[];
}

// Helper function to transform basic Plant data to EnhancedPlant
const transformPlantData = (plant: Plant): EnhancedPlant => {
  // Parse uses string into array
  const usesArray = plant.uses ? plant.uses.split(',').map(u => u.trim()).filter(Boolean) : ['Medicinal purposes', 'Traditional medicine'];
  
  // Parse native regions string into array
  const regionsArray = plant.nativeRegions ? plant.nativeRegions.split(',').map(r => r.trim()).filter(Boolean) : ['Various regions'];
  
  // Create medicinal uses from description/uses
  const medicinalUses = [
    { name: "Traditional Use", icon: Shield, description: usesArray[0] || "Various medicinal applications" },
    { name: "Health Benefits", icon: Zap, description: usesArray[1] || "Supports overall wellness" },
  ];
  
  // Parse growing conditions
  const growingInfo = {
    sunlight: plant.sunlight || "Full to partial sun",
    water: plant.waterNeeds || "Moderate watering",
    soil: "Well-draining soil",
    temperature: "Moderate climate",
    humidity: "Medium humidity",
    spacing: "12-18 inches"
  };
  
  return {
    name: plant.name,
    scientificName: plant.scientificName,
    commonNames: [plant.name],
    description: plant.description,
    images: plant.imageUrl ? [plant.imageUrl] : ['/plants/lavender.png'],
    rating: 4.5,
    reviews: 128,
    difficulty: "Moderate",
    medicinalUses,
    nativeRegions: regionsArray,
    growingInfo,
    harvestSeason: plant.floweringSeason ? [plant.floweringSeason] : ["Summer"],
    uses: usesArray,
    tips: plant.growingConditions ? plant.growingConditions.split('.').filter(Boolean).map(t => t.trim()) : [
      "Provide adequate sunlight and water",
      "Monitor for pests regularly",
      "Harvest during optimal season"
    ],
    companion: plant.specialFeatures || [],
    warnings: plant.toxicity ? [plant.toxicity] : []
  };
};

// Floating Particle Component  
const FloatingParticle = ({ delay = 0 }: { delay?: number }) => {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
        animationDelay: `${delay}s`
      }}
    >
      <Sparkles className="text-emerald-400 opacity-20" size={12 + Math.random() * 12} />
    </div>
  );
};

const PlantInfoPanel = ({ plant, onClose }: PlantInfoPanelProps) => {
  const enhancedPlant = transformPlantData(plant);
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorited, setIsFavorited] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isNarrating, setIsNarrating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallaxStyle = (depth: number) => ({
    transform: `translate(${mousePosition.x * depth * 20}px, ${mousePosition.y * depth * 20}px)`
  });

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % enhancedPlant.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + enhancedPlant.images.length) % enhancedPlant.images.length);
  };

  const handleNarration = () => {
    if (isNarrating) {
      window.speechSynthesis.cancel();
      setIsNarrating(false);
      return;
    }

    const text = `${plant.name}, scientifically known as ${plant.scientificName}. ${plant.description} It is commonly used for ${plant.uses}. This plant is native to ${plant.nativeRegions} and thrives in ${plant.growingConditions}.`;

    const newUtterance = new SpeechSynthesisUtterance(text);
    newUtterance.rate = 0.9;
    newUtterance.pitch = 1;
    newUtterance.onend = () => setIsNarrating(false);

    setIsNarrating(true);
    window.speechSynthesis.speak(newUtterance);
  };

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed inset-4 md:inset-8 lg:inset-16 z-50 overflow-hidden rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-full bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-y-auto">
          
          {/* Animated background elements */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div 
              className="absolute top-20 left-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
              style={parallaxStyle(1)}
            />
            <div 
              className="absolute top-40 right-20 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
              style={{ ...parallaxStyle(1.5), animationDelay: '1s' }}
            />
            <div 
              className="absolute bottom-20 left-40 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"
              style={{ ...parallaxStyle(2), animationDelay: '2s' }}
            />
          </div>

          {/* Floating particles */}
          {[...Array(15)].map((_, i) => (
            <FloatingParticle key={i} delay={i * 0.3} />
          ))}

          <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
            {/* Close button */}
            <button 
              onClick={onClose}
              className="mb-6 flex items-center gap-2 text-emerald-700 hover:text-emerald-900 transition-all hover:gap-3 group"
            >
              <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Garden</span>
            </button>

            {/* Hero Section */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Image Gallery */}
              <div className="relative group">
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 backdrop-blur">
                  <img
                    src={enhancedPlant.images[currentImageIndex]}
                    alt={enhancedPlant.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Image navigation */}
                  {enhancedPlant.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-3 rounded-full shadow-lg hover:bg-white transition-all hover:scale-110 active:scale-95"
                      >
                        <ChevronLeft className="text-emerald-700" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-3 rounded-full shadow-lg hover:bg-white transition-all hover:scale-110 active:scale-95"
                      >
                        <ChevronRight className="text-emerald-700" />
                      </button>
                      
                      {/* Image indicators */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {enhancedPlant.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              idx === currentImageIndex
                                ? 'bg-white w-8'
                                : 'bg-white/50 hover:bg-white/75'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
                  <Star className="fill-white" size={16} />
                  <span className="font-bold">{enhancedPlant.rating}</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-full shadow-lg animate-pulse">
                  <span className="font-bold">{enhancedPlant.difficulty}</span>
                </div>
              </div>

              {/* Plant Info */}
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-2 animate-fade-in">
                  <div className="flex items-center gap-3">
                    <h1 className="text-5xl font-bold text-emerald-900 bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-teal-600">
                      {enhancedPlant.name}
                    </h1>
                    <Sparkles className="text-yellow-500 animate-spin-slow" />
                  </div>
                  <p className="text-xl italic text-emerald-600">{enhancedPlant.scientificName}</p>
                  <div className="flex flex-wrap gap-2">
                    {enhancedPlant.commonNames.map((name, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium hover:bg-emerald-200 transition-colors cursor-default"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed animate-slide-up">
                  {enhancedPlant.description}
                </p>

                {/* Action buttons */}
                <div className="flex gap-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  <button
                    onClick={() => setIsFavorited(!isFavorited)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 active:scale-95 shadow-lg ${
                      isFavorited
                        ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Heart className={isFavorited ? 'fill-white' : ''} size={20} />
                    {isFavorited ? 'Favorited' : 'Add to Favorites'}
                  </button>
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`p-3 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-lg ${
                      isBookmarked
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <BookmarkPlus size={20} />
                  </button>
                  <button className="p-3 rounded-full bg-white text-gray-700 hover:bg-gray-50 transition-all transform hover:scale-105 active:scale-95 shadow-lg">
                    <Share2 size={20} />
                  </button>
                  <button
                    onClick={handleNarration}
                    className="p-3 rounded-full bg-white text-gray-700 hover:bg-gray-50 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                  >
                    {isNarrating ? <VolumeOff size={20} /> : <Volume size={20} />}
                  </button>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                  <div className="bg-white/80 backdrop-blur rounded-2xl p-4 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    <Sun className="mx-auto mb-2 text-yellow-500" size={32} />
                    <p className="text-sm text-gray-600">Sunlight</p>
                    <p className="font-bold text-emerald-700 text-sm">{enhancedPlant.growingInfo.sunlight.split('(')[0]}</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur rounded-2xl p-4 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    <Droplets className="mx-auto mb-2 text-blue-500" size={32} />
                    <p className="text-sm text-gray-600">Water</p>
                    <p className="font-bold text-emerald-700 text-sm">{enhancedPlant.growingInfo.water}</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur rounded-2xl p-4 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    <Calendar className="mx-auto mb-2 text-purple-500" size={32} />
                    <p className="text-sm text-gray-600">Harvest</p>
                    <p className="font-bold text-emerald-700 text-sm">{enhancedPlant.harvestSeason[0]}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="mb-8">
              <div className="flex gap-2 bg-white/80 backdrop-blur rounded-2xl p-2 shadow-lg overflow-x-auto">
                {[
                  { id: 'overview', label: 'Overview', icon: Info },
                  { id: 'growing', label: 'Growing Guide', icon: Leaf },
                  { id: 'medicinal', label: 'Medicinal Uses', icon: Shield },
                  { id: 'tips', label: 'Tips & Care', icon: Lightbulb }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg transform scale-105'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon size={20} />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'overview' && (
                <div className="space-y-6 animate-fade-in">
                  {/* Native Regions */}
                  <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg">
                        <MapPin className="text-white" size={28} />
                      </div>
                      <h2 className="text-3xl font-bold text-emerald-900">Native Regions</h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {enhancedPlant.nativeRegions.map((region, idx) => (
                        <div
                          key={idx}
                          className="px-6 py-3 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 rounded-full text-lg font-semibold hover:from-emerald-200 hover:to-teal-200 transition-all cursor-default transform hover:scale-105"
                        >
                          {region}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Uses */}
                  <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl shadow-lg">
                        <Sparkles className="text-white" size={28} />
                      </div>
                      <h2 className="text-3xl font-bold text-emerald-900">Common Uses</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {enhancedPlant.uses.map((use, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all transform hover:scale-105"
                        >
                          <Check className="text-emerald-600 flex-shrink-0" size={20} />
                          <span className="text-gray-800 font-medium">{use}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'growing' && (
                <div className="space-y-6 animate-fade-in">
                  {/* Growing Conditions */}
                  <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl shadow-lg">
                        <Leaf className="text-white" size={28} />
                      </div>
                      <h2 className="text-3xl font-bold text-emerald-900">Growing Conditions</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        { label: 'Sunlight', value: enhancedPlant.growingInfo.sunlight, icon: Sun, color: 'from-yellow-400 to-orange-500' },
                        { label: 'Water Needs', value: enhancedPlant.growingInfo.water, icon: Droplets, color: 'from-blue-400 to-cyan-500' },
                        { label: 'Soil Type', value: enhancedPlant.growingInfo.soil, icon: Leaf, color: 'from-amber-400 to-orange-500' },
                        { label: 'Temperature', value: enhancedPlant.growingInfo.temperature, icon: ThermometerSun, color: 'from-red-400 to-pink-500' },
                        { label: 'Humidity', value: enhancedPlant.growingInfo.humidity, icon: Wind, color: 'from-sky-400 to-blue-500' },
                        { label: 'Spacing', value: enhancedPlant.growingInfo.spacing, icon: Sparkles, color: 'from-purple-400 to-pink-500' }
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl hover:shadow-lg transition-all transform hover:scale-105"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`p-2 bg-gradient-to-br ${item.color} rounded-lg shadow`}>
                              <item.icon className="text-white" size={24} />
                            </div>
                            <h3 className="font-bold text-emerald-900 text-lg">{item.label}</h3>
                          </div>
                          <p className="text-gray-700 font-medium text-lg">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Companion Plants */}
                  {enhancedPlant.companion.length > 0 && (
                    <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl shadow-lg">
                          <Leaf className="text-white" size={28} />
                        </div>
                        <h2 className="text-3xl font-bold text-emerald-900">Companion Plants</h2>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {enhancedPlant.companion.map((companion, idx) => (
                          <div
                            key={idx}
                            className="px-6 py-3 bg-gradient-to-r from-green-100 to-teal-100 text-green-800 rounded-full text-lg font-semibold hover:from-green-200 hover:to-teal-200 transition-all cursor-pointer transform hover:scale-105"
                          >
                            {companion}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'medicinal' && (
                <div className="animate-fade-in">
                  <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-3 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl shadow-lg">
                        <Shield className="text-white" size={28} />
                      </div>
                      <h2 className="text-3xl font-bold text-emerald-900">Medicinal Properties</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      {enhancedPlant.medicinalUses.map((use, idx) => (
                        <div
                          key={idx}
                          className="group p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl hover:from-blue-100 hover:to-purple-100 transition-all transform hover:scale-105 hover:shadow-xl"
                        >
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                              <use.icon className="text-white" size={28} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-emerald-900 text-xl mb-2">{use.name}</h3>
                              <p className="text-gray-700 font-medium">{use.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Warnings */}
                    {enhancedPlant.warnings.length > 0 && (
                      <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl">
                        <div className="flex items-center gap-3 mb-4">
                          <AlertCircle className="text-orange-500" size={28} />
                          <h3 className="text-xl font-bold text-orange-900">Important Warnings</h3>
                        </div>
                        <ul className="space-y-2">
                          {enhancedPlant.warnings.map((warning, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-gray-800 font-medium">{warning}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'tips' && (
                <div className="animate-fade-in">
                  <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-3 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl shadow-lg">
                        <Lightbulb className="text-white" size={28} />
                      </div>
                      <h2 className="text-3xl font-bold text-emerald-900">Care Tips & Tricks</h2>
                    </div>
                    <div className="space-y-4">
                      {enhancedPlant.tips.map((tip, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-4 p-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl hover:from-yellow-100 hover:to-amber-100 transition-all transform hover:scale-105"
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 shadow-lg">
                            {idx + 1}
                          </div>
                          <p className="text-gray-800 font-medium text-lg flex-1">{tip}</p>
                        </div>
                      ))}
                    </div>

                    {/* Harvest Season */}
                    <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
                      <div className="flex items-center gap-3 mb-4">
                        <Calendar className="text-emerald-600" size={28} />
                        <h3 className="text-xl font-bold text-emerald-900">Best Harvest Season</h3>
                      </div>
                      <div className="flex gap-3 flex-wrap">
                        {enhancedPlant.harvestSeason.map((season, idx) => (
                          <div
                            key={idx}
                            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full text-lg font-bold shadow-lg"
                          >
                            {season}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </AnimatePresence>
  );
};

export default PlantInfoPanel;
