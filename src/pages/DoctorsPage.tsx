import React, { useState, useMemo } from 'react';
import { Search, MapPin, Phone, Mail, Star, Globe, Award, Shield, Video, Clock } from 'lucide-react';
import TavusVideoAgent from '../components/TavusVideoAgent';
import { doctorsData, specialties, locations } from '../data/doctors';

const DoctorsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [telemedicineFilter, setTelemedicineFilter] = useState('all');
  const [emergencyFilter, setEmergencyFilter] = useState('all');

  const filteredDoctors = useMemo(() => {
    return doctorsData.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doctor.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
      const matchesLocation = selectedLocation === 'all' || doctor.location === selectedLocation;
      const matchesTelemedicine = telemedicineFilter === 'all' || 
                                 (telemedicineFilter === 'available' && doctor.telemedicine);
      const matchesEmergency = emergencyFilter === 'all' || 
                              (emergencyFilter === 'available' && doctor.emergencyAvailable);
      return matchesSearch && matchesSpecialty && matchesLocation && matchesTelemedicine && matchesEmergency;
    });
  }, [searchTerm, selectedSpecialty, selectedLocation, telemedicineFilter, emergencyFilter]);

  const tavusScript = "Namaste! I'm Dr. Aarogya, your trusted AI health companion. Welcome to India's most comprehensive doctor directory, featuring thousands of verified healthcare professionals across all specialties and locations. I'll help you find the right specialist for your medical needs, whether you're looking for a cardiologist in Mumbai, a pediatrician in Delhi, or any other medical expert. Each doctor profile includes detailed qualifications, experience, patient reviews, and contact information to ensure you get the best possible care.";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Comprehensive Doctor Directory
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
          India's largest verified database of healthcare professionals. Find qualified doctors 
          across all specialties with detailed profiles, patient reviews, and instant booking options.
        </p>
        <div className="flex justify-center space-x-4 text-sm">
          <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full">
            <Shield className="w-4 h-4 mr-1" />
            Verified Doctors
          </span>
          <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
            <Video className="w-4 h-4 mr-1" />
            Telemedicine Available
          </span>
          <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
            <Globe className="w-4 h-4 mr-1" />
            Global Network
          </span>
        </div>
      </div>

      {/* Tavus Video Agent */}
      <div className="mb-12">
        <TavusVideoAgent
          script={tavusScript}
          title="Complete Doctor Directory Guide with Dr. Aarogya"
          className="max-w-4xl mx-auto"
        />
      </div>

      {/* Advanced Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search doctors, specialties, hospitals, conditions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {specialties.map((specialty) => (
              <option key={specialty.id} value={specialty.id}>
                {specialty.name} ({specialty.count})
              </option>
            ))}
          </select>
          
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name} ({location.count})
              </option>
            ))}
          </select>
          
          <select
            value={telemedicineFilter}
            onChange={(e) => setTelemedicineFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Doctors</option>
            <option value="available">Telemedicine Available</option>
          </select>
          
          <select
            value={emergencyFilter}
            onChange={(e) => setEmergencyFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Availability</option>
            <option value="available">Emergency Available</option>
          </select>
          
          <div className="flex items-center justify-center bg-gray-100 rounded-lg px-4 py-3">
            <span className="text-sm font-medium text-gray-700">
              {filteredDoctors.length} doctors found
            </span>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                      <p className="text-blue-600 font-medium capitalize">{doctor.specialty}</p>
                      {doctor.subspecialty && (
                        <p className="text-sm text-gray-600 capitalize">{doctor.subspecialty.replace('-', ' ')}</p>
                      )}
                    </div>
                    {doctor.verified && (
                      <Shield className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>
              </div>

              {/* Qualifications */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {doctor.qualification.map((qual, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded font-medium">
                      {qual}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Experience:</span>
                  <span className="font-medium">{doctor.experience}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Consultation:</span>
                  <span className="font-medium text-green-600">{doctor.consultationFee}</span>
                </div>
                
                {doctor.onlineConsultationFee && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Online:</span>
                    <span className="font-medium text-blue-600">{doctor.onlineConsultationFee}</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{doctor.rating}</span>
                  <span className="text-sm text-gray-600">({doctor.reviews} reviews)</span>
                </div>
              </div>

              {/* Services */}
              <div className="flex space-x-2 mb-4">
                {doctor.telemedicine && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <Video className="w-3 h-3 mr-1" />
                    Online
                  </span>
                )}
                {doctor.emergencyAvailable && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <Clock className="w-3 h-3 mr-1" />
                    Emergency
                  </span>
                )}
              </div>

              {/* Location & Contact */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <div>
                    <p className="font-medium">{doctor.hospital}</p>
                    <p>{doctor.city}, {doctor.state}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <a href={`tel:${doctor.phone}`} className="hover:text-blue-600">
                    {doctor.phone}
                  </a>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <a href={`mailto:${doctor.email}`} className="hover:text-blue-600 truncate">
                    {doctor.email}
                  </a>
                </div>
              </div>

              {/* Specializations */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Specializations:</p>
                <div className="flex flex-wrap gap-1">
                  {doctor.specializations.slice(0, 3).map((spec, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {spec}
                    </span>
                  ))}
                  {doctor.specializations.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      +{doctor.specializations.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Languages */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Languages:</p>
                <div className="flex flex-wrap gap-1">
                  {doctor.languages.map((language, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                    >
                      <Globe className="w-3 h-3 mr-1" />
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Availability:</p>
                <p className="text-sm font-medium text-gray-900">{doctor.availability}</p>
              </div>

              {/* Awards & Publications */}
              {(doctor.awards || doctor.publications) && (
                <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
                  {doctor.awards && (
                    <div className="flex items-center text-sm text-yellow-800 mb-1">
                      <Award className="w-4 h-4 mr-2" />
                      <span>{doctor.awards.length} Awards</span>
                    </div>
                  )}
                  {doctor.publications && (
                    <div className="text-sm text-yellow-700">
                      {doctor.publications} Research Publications
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm">
                  Book Appointment
                </button>
                {doctor.telemedicine && (
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors text-sm">
                    Video Call
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Statistics */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-blue-600">{doctorsData.length}+</div>
          <div className="text-sm text-blue-700">Verified Doctors</div>
        </div>
        <div className="bg-green-50 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-green-600">
            {doctorsData.filter(d => d.telemedicine).length}+
          </div>
          <div className="text-sm text-green-700">Telemedicine Available</div>
        </div>
        <div className="bg-purple-50 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-purple-600">{specialties.length - 1}+</div>
          <div className="text-sm text-purple-700">Medical Specialties</div>
        </div>
        <div className="bg-orange-50 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-orange-600">{locations.length - 1}+</div>
          <div className="text-sm text-orange-700">Cities Covered</div>
        </div>
      </div>

      {/* Verification & Network Information */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Verified Healthcare Professionals
          </h3>
          <p className="text-green-700 text-sm mb-4">
            All doctors in our directory are verified healthcare professionals with valid 
            medical licenses and certifications. We ensure that you connect with qualified experts 
            who meet international medical standards and ethical practices.
          </p>
          <div className="text-xs text-green-600">
            <p>• Medical license verification</p>
            <p>• Educational credential checks</p>
            <p>• Hospital affiliation confirmation</p>
            <p>• Patient review authentication</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Global Healthcare Network
          </h3>
          <p className="text-blue-700 text-sm mb-4">
            Our platform connects you with healthcare professionals not just in India, but across 
            the globe. Whether you need a second opinion or specialized treatment, we help you 
            find the right medical expert anywhere in the world.
          </p>
          <div className="text-xs text-blue-600">
            <p>• International specialist network</p>
            <p>• Multi-language consultation support</p>
            <p>• Cross-border telemedicine</p>
            <p>• Global medical tourism assistance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;