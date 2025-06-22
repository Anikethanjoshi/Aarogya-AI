import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Phone, Clock, Star, Directions } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  type: 'hospital' | 'pharmacy' | 'clinic' | 'diagnostic' | 'jan-aushadhi';
  address: string;
  phone: string;
  rating: number;
  distance: string;
  openHours: string;
  services: string[];
  lat: number;
  lng: number;
  verified: boolean;
}

interface GoogleMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  searchType?: string;
  onLocationSelect?: (location: Location) => void;
  className?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  center = { lat: 12.9716, lng: 77.5946 }, // Bangalore default
  zoom = 12,
  searchType = 'all',
  onLocationSelect,
  className = ''
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearbyLocations, setNearbyLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const [mapInitialized, setMapInitialized] = useState(false);

  // Mock data for demonstration - In real app, this would come from Google Places API
  const mockLocations: Location[] = [
    {
      id: '1',
      name: 'Apollo Hospital',
      type: 'hospital',
      address: 'Bannerghatta Road, Bangalore, Karnataka 560076',
      phone: '+91 80 2692 2222',
      rating: 4.5,
      distance: '2.3 km',
      openHours: '24/7',
      services: ['Emergency', 'ICU', 'Surgery', 'Cardiology'],
      lat: 12.9352,
      lng: 77.6245,
      verified: true
    },
    {
      id: '2',
      name: 'Jan Aushadhi Store - Koramangala',
      type: 'jan-aushadhi',
      address: '5th Block, Koramangala, Bangalore, Karnataka 560095',
      phone: '+91 80 4112 3456',
      rating: 4.2,
      distance: '1.8 km',
      openHours: '9:00 AM - 9:00 PM',
      services: ['Generic Medicines', 'Health Supplements', 'Medical Devices'],
      lat: 12.9352,
      lng: 77.6245,
      verified: true
    },
    {
      id: '3',
      name: 'Fortis Hospital',
      type: 'hospital',
      address: 'Cunningham Road, Bangalore, Karnataka 560052',
      phone: '+91 80 6621 4444',
      rating: 4.4,
      distance: '3.1 km',
      openHours: '24/7',
      services: ['Emergency', 'Neurology', 'Orthopedics', 'Oncology'],
      lat: 12.9716,
      lng: 77.5946,
      verified: true
    },
    {
      id: '4',
      name: 'MedPlus Pharmacy',
      type: 'pharmacy',
      address: 'Indiranagar, Bangalore, Karnataka 560038',
      phone: '+91 80 2521 7890',
      rating: 4.1,
      distance: '2.7 km',
      openHours: '8:00 AM - 11:00 PM',
      services: ['Prescription Medicines', 'OTC Drugs', 'Health Products'],
      lat: 12.9716,
      lng: 77.5946,
      verified: true
    },
    {
      id: '5',
      name: 'Narayana Health Diagnostics',
      type: 'diagnostic',
      address: 'HSR Layout, Bangalore, Karnataka 560102',
      phone: '+91 80 3988 1234',
      rating: 4.3,
      distance: '4.2 km',
      openHours: '6:00 AM - 10:00 PM',
      services: ['Blood Tests', 'X-Ray', 'Ultrasound', 'ECG'],
      lat: 12.9116,
      lng: 77.6412,
      verified: true
    }
  ];

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
        },
        (error) => {
          console.error('Error getting location:', error);
          setUserLocation(center); // Fallback to default center
        }
      );
    } else {
      setUserLocation(center);
    }
  }, [center]);

  useEffect(() => {
    // Initialize mock map
    if (mapRef.current && !mapInitialized) {
      setMapInitialized(true);
      // Simulate map loading
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [mapInitialized]);

  useEffect(() => {
    // Filter locations based on search type
    const filtered = searchType === 'all' 
      ? mockLocations 
      : mockLocations.filter(loc => loc.type === searchType);
    setNearbyLocations(filtered);
  }, [searchType]);

  const getDirections = (location: Location) => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${location.lat},${location.lng}`;
      window.open(url, '_blank');
    } else {
      alert('Location access required for directions');
    }
  };

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
    if (onLocationSelect) {
      onLocationSelect(location);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Map Container */}
      <div 
        ref={mapRef} 
        className="w-full h-96 rounded-lg border border-gray-300 bg-gray-100 relative overflow-hidden"
      >
        {/* Mock Map Interface */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
          {/* Map Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#666" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* User Location Marker */}
          {userLocation && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
              <div className="text-xs text-blue-600 font-medium mt-1 whitespace-nowrap">You are here</div>
            </div>
          )}

          {/* Location Markers */}
          {nearbyLocations.map((location, index) => (
            <div
              key={location.id}
              className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                selectedLocation?.id === location.id ? 'z-20' : 'z-10'
              }`}
              style={{
                top: `${30 + (index * 15)}%`,
                left: `${40 + (index * 10)}%`
              }}
              onClick={() => handleLocationClick(location)}
            >
              <div className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold ${
                location.type === 'hospital' ? 'bg-red-500' :
                location.type === 'pharmacy' ? 'bg-green-500' :
                location.type === 'jan-aushadhi' ? 'bg-orange-500' :
                location.type === 'diagnostic' ? 'bg-purple-500' :
                'bg-blue-500'
              } ${selectedLocation?.id === location.id ? 'scale-125' : 'hover:scale-110'} transition-transform`}>
                {location.type === 'hospital' ? '🏥' :
                 location.type === 'pharmacy' ? '💊' :
                 location.type === 'jan-aushadhi' ? '🏪' :
                 location.type === 'diagnostic' ? '🔬' : '📍'}
              </div>
              {selectedLocation?.id === location.id && (
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 min-w-48 border">
                  <div className="text-sm font-medium text-gray-900">{location.name}</div>
                  <div className="text-xs text-gray-600">{location.distance}</div>
                </div>
              )}
            </div>
          ))}

          {/* Map Controls */}
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2">
            <button className="block w-8 h-8 text-gray-600 hover:text-gray-800 text-lg font-bold">+</button>
            <button className="block w-8 h-8 text-gray-600 hover:text-gray-800 text-lg font-bold">-</button>
          </div>

          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>
      </div>

      {/* Selected Location Info */}
      {selectedLocation && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="font-semibold text-gray-900">{selectedLocation.name}</h3>
                {selectedLocation.verified && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Verified
                  </span>
                )}
              </div>
              
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedLocation.address}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${selectedLocation.phone}`} className="hover:text-blue-600">
                    {selectedLocation.phone}
                  </a>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{selectedLocation.openHours}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{selectedLocation.rating} • {selectedLocation.distance}</span>
                </div>
              </div>
              
              <div className="mt-2">
                <div className="flex flex-wrap gap-1">
                  {selectedLocation.services.slice(0, 3).map((service, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2 ml-4">
              <button
                onClick={() => getDirections(selectedLocation)}
                className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
              >
                <Directions className="w-3 h-3" />
                <span>Directions</span>
              </button>
              
              <button
                onClick={() => setSelectedLocation(null)}
                className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMap;