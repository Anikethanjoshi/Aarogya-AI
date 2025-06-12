import React from 'react'
import { Link } from 'react-router-dom'
import { Video, Shield, Clock, Users } from 'lucide-react'

const HomePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Your AI Health
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-health-600">
            {' '}Companion
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Experience personalized healthcare with our advanced AI video agents. 
          Get instant medical consultations, health monitoring, and wellness guidance 
          through face-to-face interactions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/consultation" className="btn-primary text-lg px-8 py-3">
            Start Consultation
          </Link>
          <Link to="/subscription" className="btn-secondary text-lg px-8 py-3">
            View Plans
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div className="card text-center">
          <div className="bg-primary-100 p-3 rounded-full w-fit mx-auto mb-4">
            <Video className="h-8 w-8 text-primary-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Face-to-Face AI
          </h3>
          <p className="text-gray-600">
            Interact with our advanced AI health agents through natural video conversations
          </p>
        </div>

        <div className="card text-center">
          <div className="bg-health-100 p-3 rounded-full w-fit mx-auto mb-4">
            <Shield className="h-8 w-8 text-health-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Secure & Private
          </h3>
          <p className="text-gray-600">
            Your health data is protected with enterprise-grade security and privacy
          </p>
        </div>

        <div className="card text-center">
          <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-4">
            <Clock className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            24/7 Available
          </h3>
          <p className="text-gray-600">
            Get health guidance and support anytime, anywhere with our AI companions
          </p>
        </div>

        <div className="card text-center">
          <div className="bg-orange-100 p-3 rounded-full w-fit mx-auto mb-4">
            <Users className="h-8 w-8 text-orange-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Personalized Care
          </h3>
          <p className="text-gray-600">
            Tailored health recommendations based on your unique profile and needs
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="card bg-gradient-to-r from-primary-500 to-health-500 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Transform Your Healthcare?
        </h2>
        <p className="text-xl mb-6 opacity-90">
          Join thousands of users who trust Aarogya AI for their health and wellness needs
        </p>
        <Link to="/consultation" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200 inline-block">
          Get Started Today
        </Link>
      </div>
    </div>
  )
}

export default HomePage