import React, { useState } from 'react';
import { Search, Filter, Heart, Stethoscope, Syringe, Activity } from 'lucide-react';
import TavusVideoAgent from '../components/TavusVideoAgent';

const HospitalToolsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Tools', icon: Heart },
    { id: 'diagnostic', name: 'Diagnostic', icon: Stethoscope },
    { id: 'surgical', name: 'Surgical', icon: Syringe },
    { id: 'monitoring', name: 'Monitoring', icon: Activity },
  ];

  const hospitalTools = [
    {
      id: 1,
      name: 'Digital Stethoscope',
      category: 'diagnostic',
      description: 'Advanced digital stethoscope with noise cancellation and recording capabilities',
      uses: 'Heart and lung examination, telemedicine consultations',
      benefits: 'Enhanced sound quality, digital recording, remote consultation capability',
      price: '₹15,000 - ₹50,000',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      name: 'Ultrasound Machine',
      category: 'diagnostic',
      description: 'Portable ultrasound machine for real-time imaging',
      uses: 'Pregnancy monitoring, organ examination, emergency diagnostics',
      benefits: 'Non-invasive imaging, real-time results, portable design',
      price: '₹2,00,000 - ₹15,00,000',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      name: 'Surgical Forceps',
      category: 'surgical',
      description: 'Precision surgical forceps for delicate procedures',
      uses: 'Tissue handling, suturing, microsurgery',
      benefits: 'Precise control, sterile design, ergonomic grip',
      price: '₹500 - ₹5,000',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      name: 'Patient Monitor',
      category: 'monitoring',
      description: 'Multi-parameter patient monitoring system',
      uses: 'Vital signs monitoring, ICU care, surgery monitoring',
      benefits: 'Continuous monitoring, alarm systems, data recording',
      price: '₹50,000 - ₹3,00,000',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const filteredTools = hospitalTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const tavusScript = "Namaste! I'm Dr. Aarogya, your AI health companion. Let me guide you through our comprehensive collection of hospital tools and medical equipment. From diagnostic instruments like digital stethoscopes and ultrasound machines to surgical tools and patient monitoring systems - I'll help you understand their uses, benefits, and how they contribute to better healthcare outcomes. Each tool is carefully selected based on WHO standards and modern medical practices.";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Hospital Tools & Medical Equipment
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Comprehensive guide to medical tools and equipment used across all hospital departments, 
          with detailed information about their uses, benefits, and specifications.
        </p>
      </div>

      {/* Tavus Video Agent */}
      <div className="mb-12">
        <TavusVideoAgent
          script={tavusScript}
          title="Hospital Tools Guide with Dr. Aarogya"
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
              placeholder="Search hospital tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTools.map((tool) => (
          <div key={tool.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <img
              src={tool.image}
              alt={tool.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{tool.name}</h3>
              <p className="text-gray-600 mb-4">{tool.description}</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900">Uses:</h4>
                  <p className="text-sm text-gray-600">{tool.uses}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">Benefits:</h4>
                  <p className="text-sm text-gray-600">{tool.benefits}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">Price Range:</h4>
                  <p className="text-sm font-semibold text-blue-600">{tool.price}</p>
                </div>
              </div>
              
              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* WHO Standards Notice */}
      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          WHO & International Standards
        </h3>
        <p className="text-blue-700">
          All medical equipment listed here meets World Health Organization standards and international 
          quality certifications. We ensure that every tool recommendation follows global healthcare guidelines 
          and safety protocols for optimal patient care.
        </p>
      </div>
    </div>
  );
};

export default HospitalToolsPage;