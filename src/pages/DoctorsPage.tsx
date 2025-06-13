import React, { useState } from 'react';
import { Search, MapPin, Phone, Mail, Star, Filter, Globe } from 'lucide-react';
import TavusVideoAgent from '../components/TavusVideoAgent';

const DoctorsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const specialties = [
    { id: 'all', name: 'All Specialties' },
    { id: 'cardiology', name: 'Cardiology' },
    { id: 'neurology', name: 'Neurology' },
    { id: 'orthopedics', name: 'Orthopedics' },
    { id: 'pediatrics', name: 'Pediatrics' },
    { id: 'dermatology', name: 'Dermatology' },
  ];

  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'bangalore', name: 'Bangalore' },
    { id: 'mumbai', name: 'Mumbai' },
    { id: 'delhi', name: 'Delhi' },
    { id: 'chennai', name: 'Chennai' },
    { id: 'hyderabad', name: 'Hyderabad' },
  ];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      specialty: 'cardiology',
      qualification: 'MD, DM Cardiology',
      experience: '15 years',
      location: 'bangalore',
      hospital: 'Apollo Hospital, Bangalore',
      rating: 4.8,
      reviews: 245,
      phone: '+91 9876543210',
      email: 'dr.rajesh@apollo.com',
      consultationFee: '₹800',
      languages: ['English', 'Hindi', 'Kannada'],
      availability: 'Mon-Sat: 9:00 AM - 5:00 PM',
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      name: 'Dr. Priya Sharma',
      specialty: 'neurology',
      qualification: 'MD, DM Neurology',
      experience: '12 years',
      location: 'mumbai',
      hospital: 'Fortis Hospital, Mumbai',
      rating: 4.9,
      reviews: 189,
      phone: '+91 9876543211',
      email: 'dr.priya@fortis.com',
      consultationFee: '₹1000',
      languages: ['English', 'Hindi', 'Marathi'],
      availability: 'Mon-Fri: 10:00 AM - 6:00 PM',
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      name: 'Dr. Amit Patel',
      specialty: 'orthopedics',
      qualification: 'MS Orthopedics',
      experience: '18 years',
      location: 'delhi',
      hospital: 'AIIMS, New Delhi',
      rating: 4.7,
      reviews: 312,
      phone: '+91 9876543212',
      email: 'dr.amit@aiims.edu',
      consultationFee: '₹600',
      languages: ['English', 'Hindi', 'Gujarati'],
      availability: 'Tue-Sat: 8:00 AM - 4:00 PM',
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
    const matchesLocation = selectedLocation === 'all' || doctor.location === selectedLocation;
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  const tavusScript = "Namaste! I'm Dr. Aarogya, your trusted AI health companion. I'm here to help you find the right medical experts for your healthcare needs. Our comprehensive directory includes certified doctors from across India and globally, with detailed information about their specializations, qualifications, and contact details. Whether you need a cardiologist, neurologist, or any other specialist, I'll guide you to the right healthcare professional for your specific condition.";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Find Certified Doctors & Specialists
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Connect with qualified healthcare professionals across India and globally. 
          Find the right specialist for your medical needs with verified credentials and contact information.
        </p>
      </div>

      {/* Tavus Video Agent */}
      <div className="mb-12">
        <TavusVideoAgent
          script={tavusScript}
          title="Doctor Directory Guide with Dr. Aarogya"
          className="max-w-4xl mx-auto"
        />
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search doctors, specialties, or hospitals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {specialties.map((specialty) => (
              <option key={specialty.id} value={specialty.id}>
                {specialty.name}
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
                {location.name}
              </option>
            ))}
          </select>
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
                  <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                  <p className="text-blue-600 font-medium capitalize">{doctor.specialty}</p>
                  <p className="text-sm text-gray-600">{doctor.qualification}</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Experience:</span>
                  <span className="text-sm font-medium">{doctor.experience}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Consultation Fee:</span>
                  <span className="text-sm font-medium text-green-600">{doctor.consultationFee}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{doctor.rating}</span>
                  <span className="text-sm text-gray-600">({doctor.reviews} reviews)</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {doctor.hospital}
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <a href={`tel:${doctor.phone}`} className="hover:text-blue-600">
                    {doctor.phone}
                  </a>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <a href={`mailto:${doctor.email}`} className="hover:text-blue-600">
                    {doctor.email}
                  </a>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Languages:</p>
                <div className="flex flex-wrap gap-1">
                  {doctor.languages.map((language, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      <Globe className="w-3 h-3 mr-1" />
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Availability:</p>
                <p className="text-sm font-medium text-gray-900">{doctor.availability}</p>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm">
                  Book Appointment
                </button>
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors text-sm">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Verification Notice */}
      <div className="mt-12 bg-green-50 border border-green-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Verified Healthcare Professionals
        </h3>
        <p className="text-green-700">
          All doctors listed in our directory are verified healthcare professionals with valid 
          medical licenses and certifications. We ensure that you connect with qualified experts 
          who meet international medical standards and ethical practices.
        </p>
      </div>

      {/* Global Network */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          Global Healthcare Network
        </h3>
        <p className="text-blue-700">
          Our platform connects you with healthcare professionals not just in India, but across 
          the globe. Whether you need a second opinion or specialized treatment, we help you 
          find the right medical expert anywhere in the world.
        </p>
      </div>
    </div>
  );
};

export default DoctorsPage;