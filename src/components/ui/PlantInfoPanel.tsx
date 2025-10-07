import { useState } from 'react';
import { X, Volume, VolumeOff, Leaf, Flower, Sun, Droplet, Shield, MapPin, Sprout, Info } from 'lucide-react';
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

const PlantInfoPanel = ({ plant, onClose }: PlantInfoPanelProps) => {
  const [isNarrating, setIsNarrating] = useState(false);
  const [, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

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
    <div className="fixed inset-y-0 right-0 w-full md:w-[500px] lg:w-[600px] bg-background shadow-2xl z-50 overflow-y-auto animate-slide-in-right">
      <div className="sticky top-0 bg-gradient-to-r from-herb-green to-herb-green-dark text-white p-6 z-10">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-3xl font-playfair font-bold mb-2 animate-fade-in">{plant.name}</h2>
            <p className="text-sm italic text-white/90 animate-fade-in">{plant.scientificName}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleNarration}
              className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all hover:scale-110 duration-200"
              aria-label={isNarrating ? "Stop narration" : "Start narration"}
            >
              {isNarrating ? <VolumeOff size={20} /> : <Volume size={20} />}
            </button>
            <button
              onClick={onClose}
              className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all hover:scale-110 duration-200"
              aria-label="Close plant information"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>

      {plant.imageUrl && (
        <div className="relative h-64 w-full overflow-hidden">
          <img
            src={plant.imageUrl}
            alt={plant.name}
            className="w-full h-full object-cover animate-scale-in"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>
      )}

      <div className="p-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview" className="gap-2">
              <Info size={16} />
              Overview
            </TabsTrigger>
            <TabsTrigger value="growing" className="gap-2">
              <Sprout size={16} />
              Growing
            </TabsTrigger>
            <TabsTrigger value="details" className="gap-2">
              <Leaf size={16} />
              Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 animate-fade-in">
            <Card className="border-herb-green/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-herb-green-dark">
                  <Leaf className="text-herb-green" size={20} />
                  Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{plant.description}</p>
              </CardContent>
            </Card>

            <Card className="border-herb-green/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-herb-green-dark">
                  <Shield className="text-herb-green" size={20} />
                  Medicinal Uses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{plant.uses}</p>
              </CardContent>
            </Card>

            <Card className="border-herb-green/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-herb-green-dark">
                  <MapPin className="text-herb-green" size={20} />
                  Native Regions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{plant.nativeRegions}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="growing" className="space-y-4 animate-fade-in">
            <Card className="border-herb-green/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-herb-green-dark">
                  <Sprout className="text-herb-green" size={20} />
                  Growing Conditions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">{plant.growingConditions}</p>
                
                <Separator className="my-4" />
                
                <div className="grid grid-cols-1 gap-4 mt-4">
                  {plant.sunlight && (
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-herb-cream/50">
                      <Sun size={20} className="text-herb-gold mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-herb-green-dark">Sunlight Requirements</p>
                        <p className="text-gray-700 text-sm">{plant.sunlight}</p>
                      </div>
                    </div>
                  )}
                  
                  {plant.waterNeeds && (
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-herb-cream/50">
                      <Droplet size={20} className="text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-herb-green-dark">Water Needs</p>
                        <p className="text-gray-700 text-sm">{plant.waterNeeds}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-4 animate-fade-in">
            <Card className="border-herb-green/20">
              <CardHeader>
                <CardTitle className="text-herb-green-dark">Additional Information</CardTitle>
                <CardDescription>Botanical and growing details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {plant.family && (
                  <div className="flex items-start gap-3">
                    <Leaf size={18} className="text-herb-green mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-herb-green-dark">Plant Family</p>
                      <p className="text-gray-700">{plant.family}</p>
                    </div>
                  </div>
                )}
                
                {plant.floweringSeason && (
                  <div className="flex items-start gap-3">
                    <Flower size={18} className="text-herb-green mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-herb-green-dark">Flowering Season</p>
                      <p className="text-gray-700">{plant.floweringSeason}</p>
                    </div>
                  </div>
                )}
                
                {plant.toxicity && (
                  <div className="flex items-start gap-3">
                    <Shield size={18} className="text-red-500 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-herb-green-dark">Toxicity Information</p>
                      <Badge variant="outline" className="mt-1">{plant.toxicity}</Badge>
                    </div>
                  </div>
                )}
                
                {plant.specialFeatures && plant.specialFeatures.length > 0 && (
                  <div>
                    <p className="font-semibold text-herb-green-dark mb-2">Special Features</p>
                    <div className="flex flex-wrap gap-2">
                      {plant.specialFeatures.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-herb-green/10 text-herb-green-dark">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PlantInfoPanel;
