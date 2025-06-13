import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Phone, Clock, Star, Construction as Directions } from 'lucide-react';

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
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearbyLocations, setNearbyLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);

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
        }
      );
    }
  }, []);

  useEffect(() => {
    // Initialize Google Map
    if (mapRef.current && !map) {
      const googleMap = new google.maps.Map(mapRef.current, {
        center: userLocation || center,
        zoom: zoom,
        styles: [
          {
            featureType: 'poi.medical',
            elementType: 'geometry',
            stylers: [{ color: '#ffeaa7' }]
          },
          {
            featureType: 'poi.medical',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d63031' }]
          }
        ]
      });

      setMap(googleMap);
    }
  }, [mapRef, map, userLocation, center, zoom]);

  useEffect(() => {
    // Add markers to map
    if (map) {
      // Clear existing markers
      // Add user location marker
      if (userLocation) {
        new google.maps.Marker({
          position: userLocation,
          map: map,
          title: 'Your Location',
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="8" fill="#3b82f6"/>
                <circle cx="12" cy="12" r="3" fill="white"/>
              </svg>
            `),
            scaledSize: new google.maps.Size(24, 24)
          }
        });
      }

      // Add location markers
      nearbyLocations.forEach((location) => {
        const marker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: location.name,
          icon: {
            url: getMarkerIcon(location.type),
            scaledSize: new google.maps.Size(32, 32)
          }
        });

        marker.addListener('click', () => {
          setSelectedLocation(location);
          if (onLocationSelect) {
            onLocationSelect(location);
          }
        });
      });
    }
  }, [map, userLocation, nearbyLocations, onLocationSelect]);

  useEffect(() => {
    // Filter locations based on search type
    const filtered = searchType === 'all' 
      ? mockLocations 
      : mockLocations.filter(loc => loc.type === searchType);
    setNearbyLocations(filtered);
  }, [searchType]);

  const getMarkerIcon = (type: string) => {
    const colors = {
      hospital: '#ef4444',
      pharmacy: '#10b981',
      clinic: '#3b82f6',
      diagnostic: '#8b5cf6',
      'jan-aushadhi': '#f59e0b'
    };
    
    const color = colors[type as keyof typeof colors] || '#6b7280';
    
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="${color}"/>
        <circle cx="12" cy="9" r="2.5" fill="white"/>
      </svg>
    `)}`;
  };

  const searchNearby = async (query: string) => {
    setLoading(true);
    // In real implementation, this would use Google Places API
    // For now, we'll simulate the search
    setTimeout(() => {
      const filtered = mockLocations.filter(loc => 
        loc.name.toLowerCase().includes(query.toLowerCase()) ||
        loc.services.some(service => service.toLowerCase().includes(query.toLowerCase()))
      );
      setNearbyLocations(filtered);
      setLoading(false);
    }, 1000);
  };

  const getDirections = (location: Location) => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${location.lat},${location.lng}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Map Container */}
      <div ref={mapRef} className="w-full h-96 rounded-lg border border-gray-300" />
      
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

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