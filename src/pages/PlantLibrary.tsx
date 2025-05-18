
import { useState, useEffect, useRef } from 'react';
import Layout from '../components/layout/Layout';
import SearchFilters from '../components/library/SearchFilters';
import PlantCard from '../components/library/PlantCard';
import { Book, Filter, List, Grid, ChevronDown } from 'lucide-react';

// Enhanced plant data with more details
const plantsData = [
  {
    id: 1,
    name: "Lavender",
    scientificName: "Lavandula angustifolia",
    image: "/plants/lavender.jpg",
    benefits: "Known for its calming properties and beautiful purple flowers. Commonly used for sleep aid, anxiety relief, and as an antiseptic.",
    ailments: ["Anxiety", "Insomnia", "Stress", "Headache"],
    regions: ["Mediterranean", "Europe"],
    growthHabit: "Perennial shrub",
    parts: ["Flowers", "Essential oil"],
    harvestSeason: "Summer"
  },
  {
    id: 2,
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis miller",
    image: "/plants/aloe.jpg",
    benefits: "Succulent plant with thick, fleshy leaves filled with gel. Used for skin healing, burn treatment, and digestive health.",
    ailments: ["Burns", "Skin Conditions", "Digestion"],
    regions: ["Africa", "Mediterranean"],
    growthHabit: "Succulent perennial",
    parts: ["Gel", "Latex"],
    harvestSeason: "Year-round"
  },
  {
    id: 3,
    name: "Ginger",
    scientificName: "Zingiber officinale",
    image: "/plants/ginger.jpg",
    benefits: "Spicy root with powerful anti-inflammatory and digestive properties. Used for nausea, digestion, and immune support.",
    ailments: ["Nausea", "Digestion", "Inflammation", "Cold & Flu"],
    regions: ["Asia"],
    growthHabit: "Herbaceous perennial",
    parts: ["Rhizome"],
    harvestSeason: "Fall"
  },
  {
    id: 4,
    name: "Echinacea",
    scientificName: "Echinacea purpurea",
    image: "/plants/echinacea.jpg",
    benefits: "Popular herb used to prevent and treat the common cold. It may boost your immune system and help fight infections.",
    ailments: ["Cold & Flu", "Immunity", "Inflammation"],
    regions: ["North America"],
    growthHabit: "Herbaceous perennial",
    parts: ["Roots", "Flowers", "Leaves"],
    harvestSeason: "Summer, Fall"
  },
  {
    id: 5,
    name: "Chamomile",
    scientificName: "Matricaria chamomilla",
    image: "/plants/chamomile.jpg",
    benefits: "Daisy-like flowers used for their calming properties. Helps with sleep, anxiety, and digestive issues.",
    ailments: ["Anxiety", "Insomnia", "Digestion"],
    regions: ["Europe", "Western Asia"],
    growthHabit: "Annual herb",
    parts: ["Flowers"],
    harvestSeason: "Summer"
  },
  {
    id: 6,
    name: "Turmeric",
    scientificName: "Curcuma longa",
    image: "/plants/turmeric.jpg",
    benefits: "Bright yellow spice with powerful anti-inflammatory and antioxidant properties. Used for pain relief and inflammation.",
    ailments: ["Inflammation", "Pain", "Arthritis"],
    regions: ["Asia"],
    growthHabit: "Herbaceous perennial",
    parts: ["Rhizome"],
    harvestSeason: "Winter"
  },
  {
    id: 7,
    name: "Peppermint",
    scientificName: "Mentha piperita",
    image: "/plants/peppermint.jpg",
    benefits: "Cooling herb used for digestive issues, headaches, and mental clarity. Also provides fresh breath.",
    ailments: ["Digestion", "Headache", "Nausea"],
    regions: ["Europe", "North America"],
    growthHabit: "Perennial herb",
    parts: ["Leaves", "Essential oil"],
    harvestSeason: "Spring, Summer"
  },
  {
    id: 8,
    name: "Valerian",
    scientificName: "Valeriana officinalis",
    image: "/plants/valerian.jpg",
    benefits: "Known as nature's tranquilizer, helps with sleep disorders and anxiety. Has a calming effect on the nervous system.",
    ailments: ["Insomnia", "Anxiety", "Stress"],
    regions: ["Europe", "Asia"],
    growthHabit: "Perennial herb",
    parts: ["Roots"],
    harvestSeason: "Fall"
  }
];

const PlantLibrary = () => {
  const [filteredPlants, setFilteredPlants] = useState(plantsData);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'region'>('name');
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{
    search: string;
    benefits: string[];
    ailments: string[];
    regions: string[];
  }>({
    search: '',
    benefits: [],
    ailments: [],
    regions: []
  });
  
  const pageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  useEffect(() => {
    // Apply filtering
    let results = [...plantsData];
    
    // Text search
    if (activeFilters.search) {
      const searchLower = activeFilters.search.toLowerCase();
      results = results.filter(plant => 
        plant.name.toLowerCase().includes(searchLower) ||
        plant.scientificName.toLowerCase().includes(searchLower) ||
        plant.benefits.toLowerCase().includes(searchLower) ||
        plant.ailments?.some(ailment => ailment.toLowerCase().includes(searchLower)) ||
        plant.regions?.some(region => region.toLowerCase().includes(searchLower))
      );
    }
    
    // Benefits filter
    if (activeFilters.benefits.length > 0) {
      results = results.filter(plant => 
        activeFilters.benefits.some(benefit => 
          plant.benefits.toLowerCase().includes(benefit.toLowerCase())
        )
      );
    }
    
    // Ailments filter
    if (activeFilters.ailments.length > 0) {
      results = results.filter(plant => 
        plant.ailments && plant.ailments.some(ailment => 
          activeFilters.ailments.includes(ailment)
        )
      );
    }
    
    // Regions filter
    if (activeFilters.regions.length > 0) {
      results = results.filter(plant => 
        plant.regions && plant.regions.some(region => 
          activeFilters.regions.includes(region)
        )
      );
    }
    
    // Apply sorting
    if (sortBy === 'name') {
      results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'region') {
      results.sort((a, b) => {
        const regionA = a.regions && a.regions.length > 0 ? a.regions[0] : '';
        const regionB = b.regions && b.regions.length > 0 ? b.regions[0] : '';
        return regionA.localeCompare(regionB);
      });
    }
    
    setFilteredPlants(results);
  }, [activeFilters, sortBy]);
  
  const handleSearch = (searchTerm: string) => {
    setActiveFilters(prev => ({ ...prev, search: searchTerm }));
  };
  
  const handleFilterChange = (filters: {
    benefits: string[];
    ailments: string[];
    regions: string[];
  }) => {
    setActiveFilters(prev => ({ 
      ...prev, 
      benefits: filters.benefits,
      ailments: filters.ailments,
      regions: filters.regions 
    }));
  };
  
  const handleSort = (sortOption: 'name' | 'region') => {
    setSortBy(sortOption);
  };
  
  const activeFilterCount = 
    activeFilters.benefits.length + 
    activeFilters.ailments.length + 
    activeFilters.regions.length;

  return (
    <Layout>
      <div className="relative bg-gradient-to-b from-herb-cream/30 to-white" ref={pageRef}>
        {/* Background pattern */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="herb-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20,0 Q30,20 20,40 Q10,20 20,0" fill="currentColor" className="text-herb-green"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#herb-pattern)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-6 py-12">
          <div 
            className={`text-center mb-12 transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="inline-flex items-center bg-herb-green-dark/10 text-herb-green-dark px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Book className="h-4 w-4 mr-1" />
              <span>Plant Encyclopedia</span>
            </div>
            <h1 className="text-4xl font-bold text-herb-green-dark mb-4">Plant Library</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Explore our collection of medicinal plants and learn about their benefits, uses, and growing conditions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div 
              className={`lg:col-span-1 transition-all duration-700 delay-200 transform ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
              }`}
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-herb-green-light/20">
                <div className="p-4 bg-herb-green-dark text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-5 w-5" />
                    <h2 className="font-semibold">Filter Plants</h2>
                  </div>
                  {activeFilterCount > 0 && (
                    <span className="bg-white text-herb-green-dark text-xs font-bold px-2 py-1 rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                <SearchFilters onSearch={handleSearch} onFilterChange={handleFilterChange} />
              </div>
              
              <div className="bg-white mt-6 p-5 rounded-xl shadow-lg border border-herb-green-light/20">
                <h3 className="font-bold text-herb-green-dark mb-3 flex items-center">
                  <ChevronDown className="h-5 w-5 mr-1" />
                  Quick Facts
                </h3>
                <div className="space-y-3">
                  <div className="bg-herb-cream/50 p-3 rounded-md">
                    <span className="block font-medium text-herb-green-dark mb-1">Did you know?</span>
                    <p className="text-sm text-gray-700">Over 25% of modern medicines are derived from plants originally used in traditional medicine.</p>
                  </div>
                  <div className="bg-herb-cream/50 p-3 rounded-md">
                    <span className="block font-medium text-herb-green-dark mb-1">Herb Identification</span>
                    <p className="text-sm text-gray-700">Always verify a plant's identity before use. Many medicinal plants have toxic look-alikes.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Plant Grid */}
            <div 
              className={`lg:col-span-3 transition-all duration-700 delay-300 transform ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
              }`}
            >
              {/* Controls */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="font-medium text-gray-700">
                  Showing <span className="text-herb-green-dark">{filteredPlants.length}</span> plants
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {/* Sort options */}
                  <div className="inline-flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Sort:</span>
                    <select 
                      className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-herb-green focus:border-herb-green p-2"
                      value={sortBy}
                      onChange={(e) => handleSort(e.target.value as 'name' | 'region')}
                    >
                      <option value="name">Name (A-Z)</option>
                      <option value="region">Region</option>
                    </select>
                  </div>
                  
                  {/* View toggle */}
                  <div className="bg-white border border-gray-300 rounded-lg flex overflow-hidden">
                    <button
                      className={`flex items-center px-3 py-2 text-sm ${viewMode === 'grid' ? 'bg-herb-green-dark text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => setViewMode('grid')}
                      aria-label="Grid view"
                    >
                      <Grid className="h-4 w-4 mr-1" /> Grid
                    </button>
                    <button
                      className={`flex items-center px-3 py-2 text-sm ${viewMode === 'list' ? 'bg-herb-green-dark text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => setViewMode('list')}
                      aria-label="List view"
                    >
                      <List className="h-4 w-4 mr-1" /> List
                    </button>
                  </div>
                </div>
              </div>
              
              {filteredPlants.length > 0 ? (
                <>
                  {/* Grid View */}
                  {viewMode === 'grid' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredPlants.map((plant, idx) => (
                        <div 
                          key={plant.id}
                          style={{ 
                            animationDelay: `${idx * 100}ms`,
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                            transition: `all 0.5s ease ${idx * 0.1}s`
                          }}
                        >
                          <PlantCard plant={plant} />
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* List View */}
                  {viewMode === 'list' && (
                    <div className="space-y-4">
                      {filteredPlants.map((plant, idx) => (
                        <div 
                          key={plant.id}
                          className="herb-card group flex flex-col md:flex-row overflow-hidden"
                          style={{ 
                            animationDelay: `${idx * 100}ms`,
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                            transition: `all 0.5s ease ${idx * 0.1}s`
                          }}
                        >
                          <div className="relative md:w-1/3 h-48 md:h-auto overflow-hidden">
                            <img 
                              src={plant.image} 
                              alt={plant.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-3 left-3">
                              {plant.regions && plant.regions.length > 0 && (
                                <span className="bg-herb-green-dark text-white text-xs px-2 py-1 rounded-full">
                                  {plant.regions[0]}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="p-5 md:w-2/3">
                            <h3 className="text-xl font-bold text-herb-green-dark">{plant.name}</h3>
                            <p className="text-sm italic text-gray-600 mb-2">{plant.scientificName}</p>
                            
                            <p className="text-gray-700 mb-3">{plant.benefits}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {plant.ailments && plant.ailments.map((ailment, index) => (
                                <span key={index} className="bg-herb-cream text-herb-green-dark text-xs px-2 py-1 rounded-full">
                                  {ailment}
                                </span>
                              ))}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-700">
                              <div>
                                <span className="font-medium">Growth:</span> {plant.growthHabit}
                              </div>
                              <div>
                                <span className="font-medium">Harvest:</span> {plant.harvestSeason}
                              </div>
                              <div>
                                <span className="font-medium">Used parts:</span> {plant.parts.join(', ')}
                              </div>
                            </div>
                            
                            <Link 
                              to={`/library/${plant.id}`}
                              className="inline-block text-herb-green font-medium hover:text-herb-green-dark transition-colors"
                            >
                              View Details →
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16 bg-herb-cream rounded-lg">
                  <svg className="mx-auto h-12 w-12 text-herb-green-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-bold text-herb-green-dark mt-4 mb-2">No plants found</h3>
                  <p className="text-gray-700 mb-4">
                    Try adjusting your search or filter criteria.
                  </p>
                  <button 
                    onClick={() => {
                      setActiveFilters({search: '', benefits: [], ailments: [], regions: []});
                    }}
                    className="px-4 py-2 bg-herb-green-dark text-white rounded-md hover:bg-herb-green transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlantLibrary;
