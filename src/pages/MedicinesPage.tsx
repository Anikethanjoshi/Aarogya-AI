import React, { useState, useMemo } from 'react';
import { Search, Pill, AlertTriangle, CheckCircle, Info, Shield, Award, Globe } from 'lucide-react';
import TavusVideoAgent from '../components/TavusVideoAgent';
import { medicinesData, medicineCategories } from '../data/medicines';

const MedicinesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [prescriptionFilter, setPrescriptionFilter] = useState('all');
  const [janAushadhiFilter, setJanAushadhiFilter] = useState('all');

  const filteredMedicines = useMemo(() => {
    return medicinesData.filter(medicine => {
      const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           medicine.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
      const matchesPrescription = prescriptionFilter === 'all' || 
                                 (prescriptionFilter === 'prescription' && medicine.prescriptionRequired) ||
                                 (prescriptionFilter === 'otc' && !medicine.prescriptionRequired);
      const matchesJanAushadhi = janAushadhiFilter === 'all' || 
                                (janAushadhiFilter === 'available' && medicine.janAushadhiAvailable);
      return matchesSearch && matchesCategory && matchesPrescription && matchesJanAushadhi;
    });
  }, [searchTerm, selectedCategory, prescriptionFilter, janAushadhiFilter]);

  const tavusScript = "Namaste! I'm Dr. Aarogya, your trusted AI health companion. Welcome to India's most comprehensive medicines database, featuring thousands of medications with complete information about dosages, side effects, interactions, and Jan Aushadhi availability. I'll guide you through WHO-approved medicines, help you understand generic alternatives, and provide cost-effective treatment options. Remember, this information is for educational purposes - always consult healthcare professionals before taking any medication.";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Comprehensive Medicines Database
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
          India's largest pharmaceutical database with detailed information about medicines, 
          their uses, dosages, side effects, and Jan Aushadhi availability. All information 
          follows WHO standards and government guidelines.
        </p>
        <div className="flex justify-center space-x-4 text-sm">
          <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full">
            <Shield className="w-4 h-4 mr-1" />
            WHO Approved
          </span>
          <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
            <Award className="w-4 h-4 mr-1" />
            Jan Aushadhi Available
          </span>
          <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
            <Globe className="w-4 h-4 mr-1" />
            Global Standards
          </span>
        </div>
      </div>

      {/* Tavus Video Agent */}
      <div className="mb-12">
        <TavusVideoAgent
          script={tavusScript}
          title="Complete Medicines Guide with Dr. Aarogya"
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
              placeholder="Search medicines, generic names, conditions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {medicineCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name} ({category.count})
              </option>
            ))}
          </select>
          
          <select
            value={prescriptionFilter}
            onChange={(e) => setPrescriptionFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Medicines</option>
            <option value="prescription">Prescription Only</option>
            <option value="otc">Over-the-Counter</option>
          </select>
          
          <select
            value={janAushadhiFilter}
            onChange={(e) => setJanAushadhiFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Availability</option>
            <option value="available">Jan Aushadhi Available</option>
          </select>
          
          <div className="flex items-center justify-center bg-gray-100 rounded-lg px-4 py-3">
            <span className="text-sm font-medium text-gray-700">
              {filteredMedicines.length} medicines found
            </span>
          </div>
        </div>
      </div>

      {/* Medicines Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredMedicines.map((medicine) => (
          <div key={medicine.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{medicine.name}</h3>
                <p className="text-gray-600">Generic: {medicine.genericName}</p>
                <p className="text-sm text-gray-500">{medicine.composition}</p>
              </div>
              <div className="flex flex-col space-y-2">
                {medicine.whoApproved && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    WHO
                  </span>
                )}
                {medicine.janAushadhiAvailable && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Jan Aushadhi
                  </span>
                )}
                {medicine.prescriptionRequired && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Prescription
                  </span>
                )}
              </div>
            </div>

            <p className="text-gray-600 mb-4 text-sm">{medicine.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Dosage Information */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center text-sm">
                  <Pill className="w-4 h-4 mr-2" />
                  Dosage & Administration
                </h4>
                <p className="text-sm text-blue-700 mb-1">{medicine.dosage}</p>
                <p className="text-xs text-blue-600">{medicine.maxDose}</p>
                <div className="mt-2 text-xs">
                  <p className="text-blue-700">Age Groups: {medicine.ageGroup.join(', ')}</p>
                  <p className="text-blue-700">Pregnancy: {medicine.pregnancy}</p>
                </div>
              </div>

              {/* Price Comparison */}
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2 text-sm">Price Comparison</h4>
                <div className="text-sm space-y-1">
                  <p className="text-green-700">Jan Aushadhi: {medicine.janAushadhiPrice}</p>
                  <p className="text-gray-600">Brand: {medicine.brandPrice}</p>
                  <p className="text-xs text-green-600 mt-2">
                    Savings: Up to 80% with Jan Aushadhi
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-sm">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Benefits & Uses
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {medicine.benefits.slice(0, 4).map((benefit, index) => (
                  <div key={index} className="flex items-center text-xs text-gray-600">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                    {benefit}
                  </div>
                ))}
              </div>
            </div>

            {/* Side Effects */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-sm">
                <AlertTriangle className="w-4 h-4 mr-2 text-yellow-500" />
                Common Side Effects
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {medicine.sideEffects.slice(0, 4).map((effect, index) => (
                  <div key={index} className="flex items-center text-xs text-gray-600">
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></span>
                    {effect}
                  </div>
                ))}
              </div>
            </div>

            {/* Contraindications */}
            <div className="bg-red-50 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-red-800 mb-2 flex items-center text-sm">
                <Info className="w-4 h-4 mr-2" />
                Important Warnings
              </h4>
              <div className="space-y-1">
                {medicine.contraindications.slice(0, 3).map((contraindication, index) => (
                  <div key={index} className="flex items-center text-xs text-red-700">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                    {contraindication}
                  </div>
                ))}
              </div>
            </div>

            {/* Manufacturers */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">Trusted Manufacturers</h4>
              <div className="flex flex-wrap gap-1">
                {medicine.manufacturer.slice(0, 3).map((mfg, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {mfg}
                  </span>
                ))}
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm">
              View Complete Information
            </button>
          </div>
        ))}
      </div>

      {/* Statistics */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-blue-600">{medicinesData.length}+</div>
          <div className="text-sm text-blue-700">Medicines Listed</div>
        </div>
        <div className="bg-green-50 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-green-600">
            {medicinesData.filter(m => m.janAushadhiAvailable).length}+
          </div>
          <div className="text-sm text-green-700">Jan Aushadhi Available</div>
        </div>
        <div className="bg-purple-50 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-purple-600">100%</div>
          <div className="text-sm text-purple-700">WHO Compliant</div>
        </div>
        <div className="bg-orange-50 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-orange-600">80%</div>
          <div className="text-sm text-orange-700">Average Savings</div>
        </div>
      </div>

      {/* Jan Aushadhi & WHO Information */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Jan Aushadhi Initiative
          </h3>
          <p className="text-blue-700 text-sm mb-4">
            Jan Aushadhi stores provide quality generic medicines at affordable prices. 
            These medicines are WHO-GMP certified and offer the same therapeutic benefits 
            as branded medicines at significantly lower costs.
          </p>
          <div className="text-xs text-blue-600">
            <p>• Over 8,000 Jan Aushadhi stores across India</p>
            <p>• Average savings of 50-90% on medicine costs</p>
            <p>• Same quality and efficacy as branded medicines</p>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            WHO Standards & Safety
          </h3>
          <p className="text-green-700 text-sm mb-4">
            All medicines listed here comply with World Health Organization standards 
            for quality, safety, and efficacy. We provide evidence-based information 
            to help you make informed healthcare decisions.
          </p>
          <div className="text-xs text-green-600">
            <p>• WHO-GMP certified manufacturing</p>
            <p>• Regular quality audits and testing</p>
            <p>• International safety standards compliance</p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">
          Important Medical Disclaimer
        </h3>
        <p className="text-yellow-700 text-sm">
          This comprehensive database is for educational and informational purposes only. 
          Always consult with qualified healthcare professionals before starting, stopping, 
          or changing any medication. Self-medication can be dangerous and should be avoided. 
          Individual responses to medications may vary.
        </p>
      </div>
    </div>
  );
};

export default MedicinesPage;