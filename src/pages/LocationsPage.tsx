import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Phone, Clock, Star, Construction as Directions } from 'lucide-react';
import GoogleMap from '../components/GoogleMap';
import LocationSearch from '../components/LocationSearch';
import TavusVideoAgent from '../components/TavusVideoAgent';

interface HealthcareLocation {
  id: string;
  name: string;
  type: 'hospital' | 'pharmacy' | 'clinic' | 'diagnostic' | 'jan-aushadhi';
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email?: string;
  website?: string;
  rating: number;
  reviews: number;
  distance: string;
  openHours: string;
  services: string[];
  facilities: string[];
  lat: number;
  lng: number;
  verified: boolean;
  emergency: boolean;
  insurance: string[];
  images: string[];
}

const LocationsPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState<HealthcareLocation | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearbyLocations, setNearbyLocations] = useState<HealthcareLocation[]>([]);
  const [searchRadius, setSearchRadius] = useState(5); // km

  // Mock comprehensive healthcare locations data
  const healthcareLocations: HealthcareLocation[] = [
    {
      id: '1',
      name: 'Apollo Hospital Bannerghatta',
      type: 'hospital',
      address: 'Bannerghatta Road, Hulimavu',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560076',
      phone: '+91 80 2692 2222',
      email: 'info@apollobangalore.com',
      website: 'https://www.apollohospitals.com',
      rating: 4.5,
      reviews: 2847,
      distance: '2.3 km',
      openHours: '24/7',
      services: ['Emergency', 'ICU', 'Surgery', 'Cardiology', 'Neurology', 'Oncology'],
      facilities: ['Parking', 'Pharmacy', 'Cafeteria', 'ATM', 'WiFi', 'Ambulance'],
      lat: 12.8546,
      lng: 77.6211,
      verified: true,
      emergency: true,
      insurance: ['Cashless', 'CGHS', 'ESI', 'Mediclaim'],
      images: ['https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400']
    },
    {
      id: '2',
      name: 'Jan Aushadhi Store - Koramangala',
      type: 'jan-aushadhi',
      address: '5th Block, Koramangala',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560095',
      phone: '+91 80 4112 3456',
      rating: 4.2,
      reviews: 156,
      distance: '1.8 km',
      openHours: '9:00 AM - 9:00 PM',
      services: ['Generic Medicines', 'Health Supplements', 'Medical Devices', 'Ayurvedic'],
      facilities: ['Home Delivery', 'Online Ordering', 'Prescription Upload'],
      lat: 12.9352,
      lng: 77.6245,
      verified: true,
      emergency: false,
      insurance: ['Jan Aushadhi Scheme'],
      images: ['https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400']
    },
    {
      id: '3',
      name: 'Fortis Hospital Cunningham Road',
      type: 'hospital',
      address: '14, Cunningham Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560052',
      phone: '+91 80 6621 4444',
      email: 'enquiry@fortishealthcare.com',
      website: 'https://www.fortishealthcare.com',
      rating: 4.4,
      reviews: 1923,
      distance: '3.1 km',
      openHours: '24/7',
      services: ['Emergency', 'Neurology', 'Orthopedics', 'Oncology', 'Transplant'],
      facilities: ['Parking', 'Pharmacy', 'Blood Bank', 'Diagnostic Center'],
      lat: 12.9716,
      lng: 77.5946,
      verified: true,
      emergency: true,
      insurance: ['Cashless', 'CGHS', 'ESI', 'Star Health'],
      images: ['https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400']
    },
    {
      id: '4',
      name: 'MedPlus Pharmacy Indiranagar',
      type: 'pharmacy',
      address: '100 Feet Road, Indiranagar',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560038',
      phone: '+91 80 2521 7890',
      website: 'https://www.medplusmart.com',
      rating: 4.1,
      reviews: 342,
      distance: '2.7 km',
      openHours: '8:00 AM - 11:00 PM',
      services: ['Prescription Medicines', 'OTC Drugs', 'Health Products', 'Baby Care'],
      facilities: ['Home Delivery', 'Online Ordering', '24/7 Helpline'],
      lat: 12.9716,
      lng: 77.6412,
      verified: true,
      emergency: false,
      insurance: ['Mediclaim', 'Health Insurance'],
      images: ['https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400']
    },
    {
      id: '5',
      name: 'Narayana Health Diagnostics HSR',
      type: 'diagnostic',
      address: 'HSR Layout, Sector 1',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560102',
      phone: '+91 80 3988 1234',
      email: 'diagnostics@narayanahealth.org',
      rating: 4.3,
      reviews: 567,
      distance: '4.2 km',
      openHours: '6:00 AM - 10:00 PM',
      services: ['Blood Tests', 'X-Ray', 'Ultrasound', 'ECG', 'MRI', 'CT Scan'],
      facilities: ['Home Collection', 'Online Reports', 'Parking'],
      lat: 12.9116,
      lng: 77.6412,
      verified: true,
      emergency: false,
      insurance: ['Cashless', 'CGHS', 'ESI'],
      images: ['https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=400']
    }
  ];

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to Bangalore
          setUserLocation({ lat: 12.9716, lng: 77.5946 });
        }
      );
    }
  }, []);

  useEffect(() => {
    // Filter locations based on selected type
    const filtered = selectedType === 'all' 
      ? healthcareLocations 
      : healthcareLocations.filter(loc => loc.type === selectedType);
    setNearbyLocations(filtered);
  }, [selectedType]);

  const tavusScript = "Namaste! I'm Dr. Aarogya, your AI health companion. Welcome to our comprehensive location finder - your gateway to discovering healthcare facilities near you. Using advanced Google Maps integration and real-time satellite data, I'll help you find the nearest hospitals, Jan Aushadhi stores, pharmacies, diagnostic centers, and clinics. Each location is verified with complete details including contact information, services, operating hours, and patient reviews. Whether you need emergency care or routine health services, I'm here to guide you to the right place at the right time.";

  const handleLocationSelect = (locationData: any) => {
    // Find the matching location from our comprehensive data
    const matchingLocation = healthcareLocations.find(loc => 
      loc.id === locationData.id || 
      loc.name.toLowerCase().includes(locationData.name?.toLowerCase() || '') ||
      loc.phone === locationData.phone
    );
    
    if (matchingLocation) {
      setSelectedLocation(matchingLocation);
    }
  };

  const getDirections = (location: HealthcareLocation) => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${location.lat},${location.lng}`;
      window.open(url, '_blank');
    }
  };

  const callLocation = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Find Healthcare Facilities Near You
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
          Discover hospitals, pharmacies, Jan Aushadhi stores, and diagnostic centers in your area 
          with real-time Google Maps integration and comprehensive facility information.
        </p>
        <div className="flex justify-center space-x-4 text-sm">
          <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full">
            <MapPin className="w-4 h-4 mr-1" />
            Real-time Locations
          </span>
          <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
            <Navigation className="w-4 h-4 mr-1" />
            GPS Navigation
          </span>
          <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
            <Star className="w-4 h-4 mr-1" />
            Verified Reviews
          </span>
        </div>
      </div>

      {/* Tavus Video Agent */}
      <div className="mb-12">
        <TavusVideoAgent
          script={tavusScript}
          title="Healthcare Location Finder with Dr. Aarogya"
          className="max-w-4xl mx-auto"
        />
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <LocationSearch
          onLocationSelect={handleLocationSelect}
          searchType={selectedType}
          className="mb-6"
        />
        
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex space-x-2">
            {[
              { id: 'all', name: 'All', icon: '🏥' },
              { id: 'hospital', name: 'Hospitals', icon: '🏥' },
              { id: 'pharmacy', name: 'Pharmacies', icon: '💊' },
              { id: 'jan-aushadhi', name: 'Jan Aushadhi', icon: '🏪' },
              { id: 'diagnostic', name: 'Diagnostics', icon: '🔬' },
              { id: 'clinic', name: 'Clinics', icon: '🩺' }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`inline-flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedType === type.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{type.icon}</span>
                <span>{type.name}</span>
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Radius:</span>
            <select
              value={searchRadius}
              onChange={(e) => setSearchRadius(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value={2}>2 km</option>
              <option value={5}>5 km</option>
              <option value={10}>10 km</option>
              <option value={25}>25 km</option>
            </select>
          </div>
        </div>
      </div>

      {/* Map and Locations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map */}
        <div className="lg:col-span-2">
          <GoogleMap
            center={userLocation || { lat: 12.9716, lng: 77.5946 }}
            zoom={13}
            searchType={selectedType}
            onLocationSelect={handleLocationSelect}
            className="h-96 lg:h-[600px]"
          />
        </div>

        {/* Locations List */}
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          <h3 className="text-lg font-semibold text-gray-900 sticky top-0 bg-white py-2">
            Nearby Locations ({nearbyLocations.length})
          </h3>
          
          {nearbyLocations.map((location) => (
            <div
              key={location.id}
              className={`bg-white rounded-lg border-2 p-4 cursor-pointer transition-all ${
                selectedLocation?.id === location.id
                  ? 'border-blue-500 shadow-lg'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => setSelectedLocation(location)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{location.name}</h4>
                  <p className="text-sm text-gray-600 capitalize">{location.type.replace('-', ' ')}</p>
                </div>
                {location.verified && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Verified
                  </span>
                )}
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{location.address}, {location.city}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{location.openHours}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{location.rating}</span>
                  <span className="text-gray-600">({location.reviews} reviews)</span>
                  <span className="text-blue-600 font-medium">{location.distance}</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex flex-wrap gap-1">
                  {location.services.slice(0, 3).map((service, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {service}
                    </span>
                  ))}
                  {location.services.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      +{location.services.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    getDirections(location);
                  }}
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  <Directions className="w-4 h-4" />
                  <span>Directions</span>
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    callLocation(location.phone);
                  }}
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Location Details */}
      {selectedLocation && (
        <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedLocation.name}</h2>
                <p className="text-lg text-gray-600 capitalize">{selectedLocation.type.replace('-', ' ')}</p>
              </div>
              <div className="flex space-x-2">
                {selectedLocation.verified && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Verified
                  </span>
                )}
                {selectedLocation.emergency && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    Emergency
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Contact Information */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{selectedLocation.address}, {selectedLocation.city}, {selectedLocation.state} - {selectedLocation.pincode}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a href={`tel:${selectedLocation.phone}`} className="hover:text-blue-600">
                      {selectedLocation.phone}
                    </a>
                  </div>
                  {selectedLocation.email && (
                    <div className="flex items-center space-x-2">
                      <span className="w-4 h-4 text-gray-400">✉️</span>
                      <a href={`mailto:${selectedLocation.email}`} className="hover:text-blue-600">
                        {selectedLocation.email}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{selectedLocation.openHours}</span>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Services</h3>
                <div className="flex flex-wrap gap-1">
                  {selectedLocation.services.map((service, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Facilities */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Facilities</h3>
                <div className="flex flex-wrap gap-1">
                  {selectedLocation.facilities.map((facility, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                      {facility}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Insurance */}
            {selectedLocation.insurance.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Insurance Accepted</h3>
                <div className="flex flex-wrap gap-1">
                  {selectedLocation.insurance.map((insurance, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                      {insurance}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex space-x-4">
              <button
                onClick={() => getDirections(selectedLocation)}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Directions className="w-5 h-5" />
                <span>Get Directions</span>
              </button>
              
              <button
                onClick={() => callLocation(selectedLocation.phone)}
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Phone className="w-5 h-5" />
                <span>Call Now</span>
              </button>
              
              {selectedLocation.website && (
                <a
                  href={selectedLocation.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  <span>🌐</span>
                  <span>Visit Website</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Google Maps Integration Notice */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Powered by Google Maps & Real-time Data
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Real-time Locations</h4>
            <p className="text-sm text-gray-600">
              Live data from Google Maps with up-to-date location information and operating hours
            </p>
          </div>
          <div className="text-center">
            <Navigation className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">GPS Navigation</h4>
            <p className="text-sm text-gray-600">
              Turn-by-turn directions powered by Google Maps for accurate navigation
            </p>
          </div>
          <div className="text-center">
            <Star className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Verified Reviews</h4>
            <p className="text-sm text-gray-600">
              Authentic patient reviews and ratings from Google My Business listings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationsPage;