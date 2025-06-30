import React, { useState, useMemo } from 'react';
import { Search, Stethoscope, Syringe, Activity, Award, Globe, Shield } from 'lucide-react';
import TavusVideoAgent from '../components/TavusVideoAgent';
import { hospitalToolsData, toolCategories, departments } from '../data/hospitalTools';

const HospitalToolsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedComplexity, setSelectedComplexity] = useState('all');

  const filteredTools = useMemo(() => {
    return hospitalToolsData.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.uses.some(use => use.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      const matchesDepartment = selectedDepartment === 'all' || tool.department.includes(selectedDepartment);
      const matchesComplexity = selectedComplexity === 'all' || tool.complexity === selectedComplexity;
      return matchesSearch && matchesCategory && matchesDepartment && matchesComplexity;
    });
  }, [searchTerm, selectedCategory, selectedDepartment, selectedComplexity]);

  const tavusScript = "Namaste! I'm Dr. Aarogya, your AI health companion. Welcome to our comprehensive hospital tools database - the most extensive collection of medical equipment information in India. From basic diagnostic tools to advanced surgical systems, I'll guide you through thousands of medical devices used across all hospital departments. Each tool is verified for WHO standards, FDA approval, and includes detailed specifications, pricing, and training requirements. Let's explore the world of medical technology together!";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Comprehensive Hospital Tools Database
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
          India's most extensive collection of medical equipment and tools. Explore thousands of devices 
          used across all hospital departments with detailed specifications, pricing, and compliance information.
        </p>
        <div className="flex justify-center space-x-4 text-sm">
          <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full">
            <Shield className="w-4 h-4 mr-1" />
            WHO Approved
          </span>
          <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
            <Award className="w-4 h-4 mr-1" />
            FDA Certified
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
          title="Complete Hospital Tools Guide with Dr. Aarogya"
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
              placeholder="Search tools, uses, specifications..."
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
            {toolCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name} ({category.count})
              </option>
            ))}
          </select>
          
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          
          <select
            value={selectedComplexity}
            onChange={(e) => setSelectedComplexity(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Complexity Levels</option>
            <option value="Basic">Basic</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          
          <div className="flex items-center justify-center bg-gray-100 rounded-lg px-4 py-3">
            <span className="text-sm font-medium text-gray-700">
              {filteredTools.length} tools found
            </span>
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
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-900">{tool.name}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  tool.complexity === 'Basic' ? 'bg-green-100 text-green-800' :
                  tool.complexity === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {tool.complexity}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4 text-sm">{tool.description}</p>
              
              {/* Certifications */}
              <div className="flex space-x-2 mb-4">
                {tool.whoApproved && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    WHO
                  </span>
                )}
                {tool.fdaApproved && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    FDA
                  </span>
                )}
                {tool.ceMarked && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    CE
                  </span>
                )}
              </div>
              
              <div className="space-y-3 mb-4">
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">Primary Uses:</h4>
                  <ul className="text-xs text-gray-600 mt-1">
                    {tool.uses.slice(0, 3).map((use, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1 h-1 bg-blue-500 rounded-full mr-2"></span>
                        {use}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">Departments:</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {tool.department.slice(0, 3).map((dept, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {dept}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">Price Range:</h4>
                  <p className="text-sm font-semibold text-blue-600">{tool.priceRange}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">Training Required:</h4>
                  <p className="text-xs text-gray-600">{tool.training}</p>
                </div>
              </div>
              
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm">
                View Full Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Statistics */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-blue-600">{hospitalToolsData.length}+</div>
          <div className="text-sm text-blue-700">Medical Tools</div>
        </div>
        <div className="bg-green-50 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-green-600">{departments.length}+</div>
          <div className="text-sm text-green-700">Departments Covered</div>
        </div>
        <div className="bg-purple-50 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-purple-600">100%</div>
          <div className="text-sm text-purple-700">WHO Compliant</div>
        </div>
        <div className="bg-orange-50 rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-orange-600">24/7</div>
          <div className="text-sm text-orange-700">Database Updates</div>
        </div>
      </div>

      {/* Compliance Information */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Global Standards & Compliance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">WHO Standards</h4>
            <p className="text-sm text-gray-600">
              All equipment meets World Health Organization quality and safety standards
            </p>
          </div>
          <div className="text-center">
            <Award className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">FDA Approved</h4>
            <p className="text-sm text-gray-600">
              Certified by the US Food and Drug Administration for medical use
            </p>
          </div>
          <div className="text-center">
            <Globe className="h-12 w-12 text-purple-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">CE Marked</h4>
            <p className="text-sm text-gray-600">
              European Conformity marking for health, safety, and environmental protection
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalToolsPage;