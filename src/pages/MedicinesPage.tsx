import React, { useState } from 'react';
import { Search, Filter, Pill, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import TavusVideoAgent from '../components/TavusVideoAgent';

const MedicinesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Medicines' },
    { id: 'antibiotics', name: 'Antibiotics' },
    { id: 'painkillers', name: 'Pain Relief' },
    { id: 'vitamins', name: 'Vitamins' },
    { id: 'cardiac', name: 'Cardiac' },
  ];

  const medicines = [
    {
      id: 1,
      name: 'Paracetamol',
      genericName: 'Acetaminophen',
      category: 'painkillers',
      description: 'Common pain reliever and fever reducer',
      dosage: '500mg-1000mg every 4-6 hours',
      maxDose: 'Maximum 4000mg per day',
      sideEffects: ['Nausea', 'Stomach upset', 'Liver damage (overdose)'],
      benefits: ['Effective pain relief', 'Reduces fever', 'Safe for most people'],
      contraindications: ['Severe liver disease', 'Alcohol dependency'],
      janAushadhiPrice: '₹2-5 per tablet',
      brandPrice: '₹8-15 per tablet',
      whoApproved: true,
      janAushadhiAvailable: true
    },
    {
      id: 2,
      name: 'Amoxicillin',
      genericName: 'Amoxicillin',
      category: 'antibiotics',
      description: 'Broad-spectrum antibiotic for bacterial infections',
      dosage: '250mg-500mg every 8 hours',
      maxDose: 'As prescribed by doctor',
      sideEffects: ['Diarrhea', 'Nausea', 'Skin rash', 'Allergic reactions'],
      benefits: ['Treats bacterial infections', 'Well-tolerated', 'Oral administration'],
      contraindications: ['Penicillin allergy', 'Mononucleosis'],
      janAushadhiPrice: '₹15-25 per course',
      brandPrice: '₹50-100 per course',
      whoApproved: true,
      janAushadhiAvailable: true
    },
    {
      id: 3,
      name: 'Vitamin D3',
      genericName: 'Cholecalciferol',
      category: 'vitamins',
      description: 'Essential vitamin for bone health and immunity',
      dosage: '1000-4000 IU daily',
      maxDose: '4000 IU per day (adults)',
      sideEffects: ['Nausea', 'Vomiting', 'Kidney stones (overdose)'],
      benefits: ['Bone health', 'Immune support', 'Muscle function'],
      contraindications: ['Hypercalcemia', 'Kidney stones'],
      janAushadhiPrice: '₹20-40 per bottle',
      brandPrice: '₹100-300 per bottle',
      whoApproved: true,
      janAushadhiAvailable: true
    }
  ];

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const tavusScript = "Namaste! I'm Dr. Aarogya, here to guide you through essential medicines and their proper usage. I'll help you understand medications with WHO standards and Jan Aushadhi guidelines - covering dosages, side effects, benefits, and cost-effective alternatives. Remember, always consult with healthcare professionals before starting any medication. Let's explore safe and effective treatment options together.";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Medicines & Pharmaceuticals Guide
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Comprehensive information about medicines, their uses, dosages, side effects, and availability 
          through Jan Aushadhi and WHO-approved sources.
        </p>
      </div>

      {/* Tavus Video Agent */}
      <div className="mb-12">
        <TavusVideoAgent
          script={tavusScript}
          title="Medicines Guide with Dr. Aarogya"
          className="max-w-4xl mx-auto"
        />
      </div>

      {/* Search and Filter */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-3 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Medicines Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredMedicines.map((medicine) => (
          <div key={medicine.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{medicine.name}</h3>
                <p className="text-gray-600">Generic: {medicine.genericName}</p>
              </div>
              <div className="flex space-x-2">
                {medicine.whoApproved && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    WHO Approved
                  </span>
                )}
                {medicine.janAushadhiAvailable && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Jan Aushadhi
                  </span>
                )}
              </div>
            </div>

            <p className="text-gray-600 mb-4">{medicine.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Dosage Information */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                  <Pill className="w-4 h-4 mr-2" />
                  Dosage
                </h4>
                <p className="text-sm text-blue-700 mb-1">{medicine.dosage}</p>
                <p className="text-xs text-blue-600">{medicine.maxDose}</p>
              </div>

              {/* Price Comparison */}
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Price Comparison</h4>
                <div className="text-sm">
                  <p className="text-green-700">Jan Aushadhi: {medicine.janAushadhiPrice}</p>
                  <p className="text-gray-600">Brand: {medicine.brandPrice}</p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Benefits
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {medicine.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Side Effects */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-yellow-500" />
                Side Effects
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {medicine.sideEffects.map((effect, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></span>
                    {effect}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contraindications */}
            <div className="bg-red-50 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                <Info className="w-4 h-4 mr-2" />
                Contraindications
              </h4>
              <ul className="text-sm text-red-700 space-y-1">
                {medicine.contraindications.map((contraindication, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    {contraindication}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Jan Aushadhi & WHO Information */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Jan Aushadhi Initiative
          </h3>
          <p className="text-blue-700 text-sm">
            Jan Aushadhi stores provide quality generic medicines at affordable prices. 
            These medicines are WHO-GMP certified and offer the same therapeutic benefits 
            as branded medicines at significantly lower costs.
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            WHO Standards
          </h3>
          <p className="text-green-700 text-sm">
            All medicines listed here comply with World Health Organization standards 
            for quality, safety, and efficacy. We provide evidence-based information 
            to help you make informed healthcare decisions.
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">
          Important Disclaimer
        </h3>
        <p className="text-yellow-700 text-sm">
          This information is for educational purposes only. Always consult with qualified 
          healthcare professionals before starting, stopping, or changing any medication. 
          Self-medication can be dangerous and should be avoided.
        </p>
      </div>
    </div>
  );
};

export default MedicinesPage;