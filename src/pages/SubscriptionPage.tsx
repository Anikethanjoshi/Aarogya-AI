import React, { useState } from 'react'
import { Check, Star, Crown, CreditCard, AlertCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const SubscriptionPage: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$9.99',
      period: 'month',
      description: 'Perfect for occasional health consultations',
      features: [
        '5 Tavus AI consultations per month',
        'Basic health monitoring',
        'Email support',
        'Health tips and reminders',
        'Mobile app access'
      ],
      icon: Star,
      popular: false,
      revenueCatId: 'basic_monthly'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$19.99',
      period: 'month',
      description: 'Ideal for regular health management',
      features: [
        'Unlimited Tavus AI consultations',
        'Advanced health analytics',
        'Priority support',
        'Personalized health plans',
        'Family sharing (up to 4 members)',
        'Integration with wearables',
        'RevenueCat subscription management'
      ],
      icon: Crown,
      popular: true,
      revenueCatId: 'premium_monthly'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For healthcare organizations',
      features: [
        'Custom Tavus AI training',
        'White-label solution',
        'Advanced security features',
        'Dedicated support team',
        'Custom integrations',
        'Compliance certifications',
        'RevenueCat enterprise features'
      ],
      icon: Crown,
      popular: false,
      revenueCatId: 'enterprise_custom'
    }
  ]

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      alert('Please login to subscribe to a plan');
      navigate('/auth');
      return;
    }

    setSelectedPlan(planId);
    setIsProcessing(true);
    
    try {
      // Simulate RevenueCat subscription flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const plan = plans.find(p => p.id === planId);
      if (plan) {
        // Update user subscription in localStorage (in real app, this would be handled by backend)
        const updatedUser = {
          ...user,
          subscription: planId as 'basic' | 'premium' | 'enterprise'
        };
        localStorage.setItem('aarogya_user', JSON.stringify(updatedUser));
        
        alert(`Successfully subscribed to ${plan.name} plan via RevenueCat!`);
        navigate('/dashboard');
      }
    } catch (error) {
      alert('Subscription failed. Please try again.');
    } finally {
      setSelectedPlan(null);
      setIsProcessing(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your Health Plan
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Select the perfect plan for your health and wellness journey with Tavus AI consultations. 
          All plans include access to our AI health companions.
        </p>
        <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 text-sm font-medium rounded-full">
          <CreditCard className="w-4 h-4 mr-2" />
          Powered by RevenueCat Subscription Management
        </div>
      </div>

      {!user && (
        <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
            <p className="text-yellow-800">
              Please <button 
                onClick={() => navigate('/auth')}
                className="font-medium underline hover:no-underline"
              >
                login
              </button> to subscribe to a plan.
            </p>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {plans.map((plan) => {
          const IconComponent = plan.icon
          const isLoading = selectedPlan === plan.id && isProcessing
          
          return (
            <div
              key={plan.id}
              className={`bg-white rounded-xl shadow-sm border-2 transition-all duration-200 relative ${
                plan.popular 
                  ? 'border-blue-500 shadow-lg scale-105' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-6">
                <div className="text-center mb-6">
                  <div className={`inline-flex p-3 rounded-full mb-4 ${
                    plan.popular 
                      ? 'bg-blue-100' 
                      : 'bg-gray-100'
                  }`}>
                    <IconComponent className={`h-8 w-8 ${
                      plan.popular 
                        ? 'text-blue-600' 
                        : 'text-gray-600'
                    }`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    {plan.price !== 'Custom' && (
                      <span className="text-gray-600">/{plan.period}</span>
                    )}
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isLoading || isProcessing}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                      Processing...
                    </div>
                  ) : !user ? (
                    'Login to Subscribe'
                  ) : plan.price === 'Custom' ? (
                    'Contact Sales'
                  ) : (
                    `Subscribe with RevenueCat`
                  )}
                </button>
                
                {plan.revenueCatId && (
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Plan ID: {plan.revenueCatId}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* RevenueCat Integration Info */}
      <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-8 mb-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Secure Subscription Management
          </h2>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            All subscriptions are managed through RevenueCat, providing secure payment processing, 
            subscription analytics, and seamless cross-platform support.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <CreditCard className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Secure Payments</h3>
              <p className="text-sm text-gray-600">Industry-standard payment security</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <Star className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Easy Management</h3>
              <p className="text-sm text-gray-600">Simple subscription controls</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <Crown className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Cross-Platform</h3>
              <p className="text-sm text-gray-600">Works on all devices</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              How does the Tavus AI consultation work?
            </h3>
            <p className="text-gray-600 mb-4">
              Our Tavus AI health companions use advanced video technology to provide face-to-face consultations, 
              analyzing your symptoms and providing personalized health guidance through natural conversations.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Is my health data secure?
            </h3>
            <p className="text-gray-600 mb-4">
              Yes, we use enterprise-grade encryption and comply with HIPAA regulations 
              to ensure your health information remains private and secure.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              How does RevenueCat subscription work?
            </h3>
            <p className="text-gray-600 mb-4">
              RevenueCat handles all subscription management, billing, and analytics. 
              You can easily manage your subscription through your account settings.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Can I cancel my subscription anytime?
            </h3>
            <p className="text-gray-600 mb-4">
              Absolutely! You can cancel your subscription at any time through RevenueCat's 
              secure portal. No long-term commitments required.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPage