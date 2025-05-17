
import { useState } from 'react';
import Layout from '../components/layout/Layout';
import SearchFilters from '../components/library/SearchFilters';
import PlantCard from '../components/library/PlantCard';

// Sample plant data - in a real app, this would come from an API or database
const plantsData = [
  {
    id: 1,
    name: "Lavender",
    scientificName: "Lavandula angustifolia",
    image: "/plants/lavender.jpg",
    benefits: "Known for its calming properties and beautiful purple flowers. Commonly used for sleep aid, anxiety relief, and as an antiseptic.",
    ailments: ["Anxiety", "Insomnia", "Stress", "Headache"],
    regions: ["Mediterranean", "Europe"]
  },
  {
    id: 2,
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis miller",
    image: "/plants/aloe.jpg",
    benefits: "Succulent plant with thick, fleshy leaves filled with gel. Used for skin healing, burn treatment, and digestive health.",
    ailments: ["Burns", "Skin Conditions", "Digestion"],
    regions: ["Africa", "Mediterranean"]
  },
  {
    id: 3,
    name: "Ginger",
    scientificName: "Zingiber officinale",
    image: "/plants/ginger.jpg",
    benefits: "Spicy root with powerful anti-inflammatory and digestive properties. Used for nausea, digestion, and immune support.",
    ailments: ["Nausea", "Digestion", "Inflammation", "Cold & Flu"],
    regions: ["Asia"]
  },
  {
    id: 4,
    name: "Echinacea",
    scientificName: "Echinacea purpurea",
    image: "/plants/echinacea.jpg",
    benefits: "Popular herb used to prevent and treat the common cold. It may boost your immune system and help fight infections.",
    ailments: ["Cold & Flu", "Immunity", "Inflammation"],
    regions: ["North America"]
  },
  {
    id: 5,
    name: "Chamomile",
    scientificName: "Matricaria chamomilla",
    image: "/plants/chamomile.jpg",
    benefits: "Daisy-like flowers used for their calming properties. Helps with sleep, anxiety, and digestive issues.",
    ailments: ["Anxiety", "Insomnia", "Digestion"],
    regions: ["Europe", "Western Asia"]
  },
  {
    id: 6,
    name: "Turmeric",
    scientificName: "Curcuma longa",
    image: "/plants/turmeric.jpg",
    benefits: "Bright yellow spice with powerful anti-inflammatory and antioxidant properties. Used for pain relief and inflammation.",
    ailments: ["Inflammation", "Pain", "Arthritis"],
    regions: ["Asia"]
  },
  {
    id: 7,
    name: "Peppermint",
    scientificName: "Mentha piperita",
    image: "/plants/peppermint.jpg",
    benefits: "Cooling herb used for digestive issues, headaches, and mental clarity. Also provides fresh breath.",
    ailments: ["Digestion", "Headache", "Nausea"],
    regions: ["Europe", "North America"]
  },
  {
    id: 8,
    name: "Valerian",
    scientificName: "Valeriana officinalis",
    image: "/plants/valerian.jpg",
    benefits: "Known as nature's tranquilizer, helps with sleep disorders and anxiety. Has a calming effect on the nervous system.",
    ailments: ["Insomnia", "Anxiety", "Stress"],
    regions: ["Europe", "Asia"]
  }
];

const PlantLibrary = () => {
  const [filteredPlants, setFilteredPlants] = useState(plantsData);
  
  const handleSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredPlants(plantsData);
      return;
    }
    
    const searchLower = searchTerm.toLowerCase();
    const results = plantsData.filter(plant => 
      plant.name.toLowerCase().includes(searchLower) ||
      plant.scientificName.toLowerCase().includes(searchLower) ||
      plant.benefits.toLowerCase().includes(searchLower) ||
      plant.ailments?.some(ailment => ailment.toLowerCase().includes(searchLower)) ||
      plant.regions?.some(region => region.toLowerCase().includes(searchLower))
    );
    
    setFilteredPlants(results);
  };
  
  const handleFilterChange = (filters: {
    benefits: string[];
    ailments: string[];
    regions: string[];
  }) => {
    // Start with all plants
    let results = [...plantsData];
    
    // Apply benefits filter
    if (filters.benefits.length > 0) {
      results = results.filter(plant => 
        filters.benefits.some(benefit => 
          plant.benefits.toLowerCase().includes(benefit.toLowerCase())
        )
      );
    }
    
    // Apply ailments filter
    if (filters.ailments.length > 0) {
      results = results.filter(plant => 
        plant.ailments && plant.ailments.some(ailment => 
          filters.ailments.includes(ailment)
        )
      );
    }
    
    // Apply regions filter
    if (filters.regions.length > 0) {
      results = results.filter(plant => 
        plant.regions && plant.regions.some(region => 
          filters.regions.includes(region)
        )
      );
    }
    
    setFilteredPlants(results);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-herb-green-dark mb-4">Plant Library</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Explore our collection of medicinal plants and learn about their benefits, uses, and growing conditions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <SearchFilters onSearch={handleSearch} onFilterChange={handleFilterChange} />
          </div>
          
          {/* Plant Grid */}
          <div className="lg:col-span-3">
            {filteredPlants.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlants.map((plant) => (
                  <PlantCard key={plant.id} plant={plant} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-herb-cream rounded-lg">
                <h3 className="text-xl font-bold text-herb-green-dark mb-2">No plants found</h3>
                <p className="text-gray-700">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlantLibrary;
