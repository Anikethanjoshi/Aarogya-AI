import React, { useState, useEffect } from 'react';
import { Search, MapPin, Navigation, Star, Clock } from 'lucide-react';

interface LocationSearchProps {
  onLocationSelect?: (location: any) => void;
  searchType?: string;
  className?: string;
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  onLocationSelect,
  searchType = 'all',
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (_position) => {
          // In real app, use Google Geocoding API to get address
          setCurrentLocation('Bangalore, Karnataka, India');
        },
        (error) => {
          console.error('Error getting location:', error);
          setCurrentLocation('Location not available');
        }
      );
    } else {
      setCurrentLocation('Location not available');
    }
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      setIsLoading(true);
      // Simulate search delay
      setTimeout(() => {
        const mockSuggestions = [
          {
            id: '1',
            name: 'Apollo Hospital Bannerghatta',
            type: 'hospital',
            address: 'Bannerghatta Road, Bangalore',
            distance: '2.3 km',
            rating: 4.5,
            phone: '+91 80 2692 2222',
            openHours: '24/7'
          },
          {
            id: '2',
            name: 'Jan Aushadhi Store Koramangala',
            type: 'pharmacy',
            address: '5th Block, Koramangala, Bangalore',
            distance: '1.8 km',
            rating: 4.2,
            phone: '+91 80 4112 3456',
            openHours: '9:00 AM - 9:00 PM'
          },
          {
            id: '3',
            name: 'Fortis Hospital Cunningham Road',
            type: 'hospital',
            address: 'Cunningham Road, Bangalore',
            distance: '3.1 km',
            rating: 4.4,
            phone: '+91 80 6621 4444',
            openHours: '24/7'
          },
          {
            id: '4',
            name: 'MedPlus Pharmacy Indiranagar',
            type: 'pharmacy',
            address: 'Indiranagar, Bangalore',
            distance: '2.7 km',
            rating: 4.1,
            phone: '+91 80 2521 7890',
            openHours: '8:00 AM - 11:00 PM'
          }
        ].filter(item => 
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.address.toLowerCase().includes(query.toLowerCase()) ||
          (searchType !== 'all' && item.type === searchType)
        );
        
        setSuggestions(mockSuggestions);
        setIsLoading(false);
      }, 500);
    } else {
      setSuggestions([]);
    }
  };

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'hospital':
        return '🏥';
      case 'pharmacy':
        return '💊';
      case 'clinic':
        return '🩺';
      case 'diagnostic':
        return '🔬';
      case 'jan-aushadhi':
        return '🏪';
      default:
        return '📍';
    }
  };

  const handleLocationClick = (location: any) => {
    if (onLocationSelect) {
      onLocationSelect(location);
    }
    setSuggestions([]);
    setSearchQuery('');
  };

  return (
    <div className={`relative ${className}`}>
      {/* Current Location */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-2">
          <Navigation className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-blue-800">Current Location:</span>
          <span className="text-sm font-medium text-blue-900">{currentLocation}</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search hospitals, pharmacies, clinics near you..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>

      {/* Search Suggestions */}
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              onClick={() => handleLocationClick(suggestion)}
              className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{getLocationIcon(suggestion.type)}</div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{suggestion.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span className="text-sm text-gray-600">{suggestion.address}</span>
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600">{suggestion.rating}</span>
                    </div>
                    <span className="text-xs text-gray-600">{suggestion.distance}</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-600">{suggestion.openHours}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Filters */}
      <div className="mt-4 flex flex-wrap gap-2">
        {[
          { id: 'hospital', name: 'Hospitals', icon: '🏥' },
          { id: 'pharmacy', name: 'Pharmacies', icon: '💊' },
          { id: 'jan-aushadhi', name: 'Jan Aushadhi', icon: '🏪' },
          { id: 'diagnostic', name: 'Diagnostics', icon: '🔬' },
          { id: 'clinic', name: 'Clinics', icon: '🩺' }
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => handleSearch(filter.name)}
            className="inline-flex items-center space-x-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-colors"
          >
            <span>{filter.icon}</span>
            <span>{filter.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LocationSearch;