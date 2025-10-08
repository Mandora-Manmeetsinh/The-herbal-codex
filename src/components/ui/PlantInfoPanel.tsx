import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume, VolumeOff, Leaf, Flower, Sun, Droplet, Shield, MapPin, Sprout, Info, Sparkles } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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

// Floating Particle Component
const FloatingParticle = ({ delay = 0 }: { delay?: number }) => {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-primary/30 rounded-full"
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 0],
        y: [-20, -100],
        x: [0, Math.random() * 40 - 20],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay: delay,
        ease: "easeOut"
      }}
      style={{
        left: `${Math.random() * 100}%`,
        top: '100%',
      }}
    />
  );
};

const PlantInfoPanel = ({ plant, onClose }: PlantInfoPanelProps) => {
  const [isNarrating, setIsNarrating] = useState(false);
  const [, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleNarration = () => {
    if (isNarrating) {
      window.speechSynthesis.cancel();
      setIsNarrating(false);
      return;
    }

    const text = `${plant.name}, scientifically known as ${plant.scientificName}. ${plant.description} It is commonly used for ${plant.uses}. This plant is native to ${plant.nativeRegions} and thrives in ${plant.growingConditions}.` +
      (plant.family ? ` It belongs to the ${plant.family} family.` : '') +
      (plant.floweringSeason ? ` It flowers in ${plant.floweringSeason}.` : '') +
      (plant.toxicity ? ` Toxicity: ${plant.toxicity}.` : '') +
      (plant.sunlight ? ` Sunlight needs: ${plant.sunlight}.` : '') +
      (plant.waterNeeds ? ` Water needs: ${plant.waterNeeds}.` : '');

    const newUtterance = new SpeechSynthesisUtterance(text);
    newUtterance.rate = 0.9;
    newUtterance.pitch = 1;
    newUtterance.onend = () => setIsNarrating(false);

    setUtterance(newUtterance);
    setIsNarrating(true);
    window.speechSynthesis.speak(newUtterance);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 100 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.9, x: 100 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed inset-y-0 right-0 w-full md:w-[550px] lg:w-[650px] z-50 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glassmorphism Container */}
        <div className="relative h-full bg-gradient-to-br from-background/95 via-background/90 to-primary/5 backdrop-blur-2xl border-l border-primary/20 shadow-2xl overflow-y-auto">
          
          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <FloatingParticle key={i} delay={i * 0.3} />
            ))}
          </div>

          {/* Dynamic Light Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-30"
            animate={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary) / 0.15), transparent 40%)`
            }}
            transition={{ type: "tween", ease: "linear", duration: 0.2 }}
          />

          {/* Header with Shimmer Effect */}
          <motion.div 
            className="sticky top-0 z-10 relative overflow-hidden"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-shimmer" />
            
            {/* Content */}
            <div className="relative p-6 text-primary-foreground">
              <div className="flex justify-between items-start">
                <motion.div 
                  className="flex-1"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-6 h-6 text-accent" />
                    </motion.div>
                    <h2 className="text-3xl font-playfair font-bold animate-shimmer bg-clip-text text-transparent bg-gradient-to-r from-white via-accent-foreground to-white bg-[length:200%_100%]">
                      {plant.name}
                    </h2>
                  </div>
                  <p className="text-sm italic text-primary-foreground/80 ml-9">{plant.scientificName}</p>
                </motion.div>
                
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleNarration}
                    className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all border border-white/30"
                    aria-label={isNarrating ? "Stop narration" : "Start narration"}
                  >
                    {isNarrating ? <VolumeOff size={20} /> : <Volume size={20} />}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all border border-white/30"
                    aria-label="Close plant information"
                  >
                    <X size={20} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image with Parallax Effect */}
          {plant.imageUrl && (
            <motion.div 
              className="relative h-72 w-full overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.img
                src={plant.imageUrl}
                alt={plant.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              
              {/* Glow effect on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent mix-blend-overlay" />
            </motion.div>
          )}

          {/* Content Area */}
          <motion.div 
            className="p-6 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6 bg-primary/10 backdrop-blur-md border border-primary/20 p-1">
                <TabsTrigger 
                  value="overview" 
                  className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all"
                >
                  <Info size={16} />
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="growing" 
                  className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all"
                >
                  <Sprout size={16} />
                  Growing
                </TabsTrigger>
                <TabsTrigger 
                  value="details" 
                  className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all"
                >
                  <Leaf size={16} />
                  Details
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="glass-card border-primary/20 overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-primary">
                        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                          <Leaf className="text-secondary" size={20} />
                        </motion.div>
                        Description
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground leading-relaxed">{plant.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="glass-card border-primary/20 overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-primary">
                        <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
                          <Shield className="text-secondary" size={20} />
                        </motion.div>
                        Medicinal Uses
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground leading-relaxed">{plant.uses}</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="glass-card border-primary/20 overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-primary">
                        <motion.div 
                          animate={{ y: [0, -3, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <MapPin className="text-accent" size={20} />
                        </motion.div>
                        Native Regions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground">{plant.nativeRegions}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="growing" className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="glass-card border-primary/20 overflow-hidden">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-primary">
                        <Sprout className="text-secondary" size={20} />
                        Growing Conditions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground leading-relaxed mb-4">{plant.growingConditions}</p>
                      
                      <Separator className="my-4 bg-primary/20" />
                      
                      <div className="grid grid-cols-1 gap-4 mt-4">
                        {plant.sunlight && (
                          <motion.div 
                            className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 hover:border-accent/40 transition-all"
                            whileHover={{ scale: 1.02, x: 5 }}
                          >
                            <Sun size={20} className="text-accent mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-semibold text-primary">Sunlight Requirements</p>
                              <p className="text-foreground/80 text-sm">{plant.sunlight}</p>
                            </div>
                          </motion.div>
                        )}
                        
                        {plant.waterNeeds && (
                          <motion.div 
                            className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 hover:border-blue-500/40 transition-all"
                            whileHover={{ scale: 1.02, x: 5 }}
                          >
                            <Droplet size={20} className="text-blue-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-semibold text-primary">Water Needs</p>
                              <p className="text-foreground/80 text-sm">{plant.waterNeeds}</p>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="glass-card border-primary/20 overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-primary">Additional Information</CardTitle>
                      <CardDescription>Botanical and growing details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {plant.family && (
                        <motion.div 
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-all"
                          whileHover={{ x: 5 }}
                        >
                          <Leaf size={18} className="text-secondary mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="font-semibold text-primary">Plant Family</p>
                            <p className="text-foreground/80">{plant.family}</p>
                          </div>
                        </motion.div>
                      )}
                      
                      {plant.floweringSeason && (
                        <motion.div 
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-all"
                          whileHover={{ x: 5 }}
                        >
                          <Flower size={18} className="text-secondary mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="font-semibold text-primary">Flowering Season</p>
                            <p className="text-foreground/80">{plant.floweringSeason}</p>
                          </div>
                        </motion.div>
                      )}
                      
                      {plant.toxicity && (
                        <motion.div 
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-destructive/5 transition-all"
                          whileHover={{ x: 5 }}
                        >
                          <Shield size={18} className="text-destructive mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="font-semibold text-primary">Toxicity Information</p>
                            <Badge variant="outline" className="mt-1 border-destructive/50 text-destructive">{plant.toxicity}</Badge>
                          </div>
                        </motion.div>
                      )}
                      
                      {plant.specialFeatures && plant.specialFeatures.length > 0 && (
                        <div>
                          <p className="font-semibold text-primary mb-2">Special Features</p>
                          <div className="flex flex-wrap gap-2">
                            {plant.specialFeatures.map((feature, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ scale: 1.1, rotate: 2 }}
                              >
                                <Badge 
                                  variant="secondary" 
                                  className="bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30 hover:shadow-lg transition-all"
                                >
                                  {feature}
                                </Badge>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PlantInfoPanel;
