import React from 'react'
import { Link } from 'react-router-dom'
import { Video, Shield, Clock, Users, Zap, Heart, Stethoscope, Pill, UserCheck } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const HomePage: React.FC = () => {
  const { t } = useLanguage()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="mb-6">
          <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
            <Zap className="w-4 h-4 mr-2" />
            Built with Bolt.new & Powered by Tavus AI
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          {t('hero.title')}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
            {' '}AI Video Agents
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          {t('hero.subtitle')}. Get instant medical consultations, health monitoring, and wellness guidance 
          through face-to-face interactions with Tavus-powered AI agents.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/consultation" 
            className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-lg transition-colors duration-200"
          >
            <Video className="w-5 h-5 mr-2" />
            Start AI Consultation
          </Link>
          <Link 
            to="/subscription" 
            className="inline-flex items-center justify-center px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-lg font-medium rounded-lg transition-colors duration-200"
          >
            View Plans
          </Link>
        </div>
      </div>

      {/* Health Resources Section */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Comprehensive Health Resources
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access detailed information about hospital tools, medicines, and certified doctors 
            with WHO standards and Jan Aushadhi guidelines.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Link to="/hospital-tools" className="group">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 group-hover:scale-105">
              <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
                <Stethoscope className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                Hospital Tools
              </h3>
              <p className="text-gray-600 text-center">
                Complete guide to medical equipment and tools used across all hospital departments
              </p>
            </div>
          </Link>

          <Link to="/medicines" className="group">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 group-hover:scale-105">
              <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
                <Pill className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                Medicines Guide
              </h3>
              <p className="text-gray-600 text-center">
                Detailed information about medicines with WHO standards and Jan Aushadhi pricing
              </p>
            </div>
          </Link>

          <Link to="/doctors" className="group">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 group-hover:scale-105">
              <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-4">
                <UserCheck className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                Find Doctors
              </h3>
              <p className="text-gray-600 text-center">
                Connect with certified healthcare professionals across India and globally
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Tavus Integration Highlight */}
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-8 mb-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Powered by Tavus AI Video Technology
          </h2>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Experience the future of healthcare with real-time AI video agents that provide personalized, 
            face-to-face medical consultations using cutting-edge Tavus technology.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Video className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Real-time Video AI</h3>
              <p className="text-sm text-gray-600">Interactive AI agents with natural conversation flow</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Heart className="h-8 w-8 text-red-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Healthcare Focused</h3>
              <p className="text-sm text-gray-600">Specialized medical knowledge and empathetic responses</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Instant Access</h3>
              <p className="text-sm text-gray-600">24/7 availability with immediate response times</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
            <Video className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
            Tavus AI Agents
          </h3>
          <p className="text-gray-600 text-center">
            Interact with advanced AI health agents through natural video conversations powered by Tavus
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
            <Shield className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
            Secure & Private
          </h3>
          <p className="text-gray-600 text-center">
            Your health data is protected with enterprise-grade security and privacy compliance
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-4">
            <Clock className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
            24/7 Available
          </h3>
          <p className="text-gray-600 text-center">
            Get health guidance and support anytime, anywhere with our AI companions
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="bg-orange-100 p-3 rounded-full w-fit mx-auto mb-4">
            <Users className="h-8 w-8 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
            Personalized Care
          </h3>
          <p className="text-gray-600 text-center">
            Tailored health recommendations based on your unique profile and needs
          </p>
        </div>
      </div>

      {/* Built with Bolt.new Section */}
      <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 mb-16 text-white">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/>
            </svg>
            <h2 className="text-2xl font-bold">Built with Bolt.new</h2>
          </div>
          <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
            This entire application was created using Bolt.new's powerful AI-driven development platform, 
            showcasing the future of rapid application development.
          </p>
          <a 
            href="https://bolt.new" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            Learn More About Bolt.new
          </a>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Transform Your Healthcare?
        </h2>
        <p className="text-xl mb-6 opacity-90">
          Join thousands of users who trust Aarogya AI for their health and wellness needs
        </p>
        <Link 
          to="/consultation" 
          className="inline-flex items-center bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200"
        >
          <Video className="w-5 h-5 mr-2" />
          Start Your AI Consultation
        </Link>
      </div>
    </div>
  )
}

export default HomePage