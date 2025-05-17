
import { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchFiltersProps {
  onSearch: (searchTerm: string) => void;
  onFilterChange: (filters: {
    benefits: string[];
    ailments: string[];
    regions: string[];
  }) => void;
}

const SearchFilters = ({ onSearch, onFilterChange }: SearchFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);
  const [selectedAilments, setSelectedAilments] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  
  // Sample filter options
  const benefitOptions = ['Immunity', 'Digestion', 'Sleep', 'Anti-inflammatory', 'Skin Health', 'Stress Relief'];
  const ailmentOptions = ['Anxiety', 'Digestion', 'Insomnia', 'Pain', 'Inflammation', 'Cold & Flu', 'Skin Conditions'];
  const regionOptions = ['Asia', 'Europe', 'North America', 'South America', 'Africa', 'Australia', 'Mediterranean'];
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };
  
  const toggleBenefit = (benefit: string) => {
    const updatedBenefits = selectedBenefits.includes(benefit)
      ? selectedBenefits.filter(b => b !== benefit)
      : [...selectedBenefits, benefit];
    setSelectedBenefits(updatedBenefits);
    updateFilters(updatedBenefits, selectedAilments, selectedRegions);
  };
  
  const toggleAilment = (ailment: string) => {
    const updatedAilments = selectedAilments.includes(ailment)
      ? selectedAilments.filter(a => a !== ailment)
      : [...selectedAilments, ailment];
    setSelectedAilments(updatedAilments);
    updateFilters(selectedBenefits, updatedAilments, selectedRegions);
  };
  
  const toggleRegion = (region: string) => {
    const updatedRegions = selectedRegions.includes(region)
      ? selectedRegions.filter(r => r !== region)
      : [...selectedRegions, region];
    setSelectedRegions(updatedRegions);
    updateFilters(selectedBenefits, selectedAilments, updatedRegions);
  };
  
  const updateFilters = (benefits: string[], ailments: string[], regions: string[]) => {
    onFilterChange({ benefits, ailments, regions });
  };
  
  const clearFilters = () => {
    setSelectedBenefits([]);
    setSelectedAilments([]);
    setSelectedRegions([]);
    updateFilters([], [], []);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Search Input */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search for plants..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-10 w-full py-3 border border-gray-300 rounded-lg focus:ring-herb-green focus:border-herb-green"
        />
      </div>
      
      {/* Filter Sections */}
      <div className="space-y-6">
        {/* Benefits Filter */}
        <div>
          <h3 className="font-bold text-herb-green-dark mb-2">Health Benefits</h3>
          <div className="flex flex-wrap gap-2">
            {benefitOptions.map((benefit) => (
              <button
                key={benefit}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedBenefits.includes(benefit) 
                    ? 'bg-herb-green text-white' 
                    : 'bg-herb-cream text-herb-green-dark hover:bg-herb-green-light hover:text-white'
                }`}
                onClick={() => toggleBenefit(benefit)}
              >
                {benefit}
              </button>
            ))}
          </div>
        </div>
        
        {/* Ailments Filter */}
        <div>
          <h3 className="font-bold text-herb-green-dark mb-2">Ailments</h3>
          <div className="flex flex-wrap gap-2">
            {ailmentOptions.map((ailment) => (
              <button
                key={ailment}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedAilments.includes(ailment) 
                    ? 'bg-herb-green text-white' 
                    : 'bg-herb-cream text-herb-green-dark hover:bg-herb-green-light hover:text-white'
                }`}
                onClick={() => toggleAilment(ailment)}
              >
                {ailment}
              </button>
            ))}
          </div>
        </div>
        
        {/* Regions Filter */}
        <div>
          <h3 className="font-bold text-herb-green-dark mb-2">Native Regions</h3>
          <div className="flex flex-wrap gap-2">
            {regionOptions.map((region) => (
              <button
                key={region}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedRegions.includes(region) 
                    ? 'bg-herb-green text-white' 
                    : 'bg-herb-cream text-herb-green-dark hover:bg-herb-green-light hover:text-white'
                }`}
                onClick={() => toggleRegion(region)}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Clear Filters Button */}
      {(selectedBenefits.length > 0 || selectedAilments.length > 0 || selectedRegions.length > 0) && (
        <div className="mt-6 text-center">
          <button 
            onClick={clearFilters}
            className="text-herb-green-dark hover:text-herb-green underline text-sm"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
