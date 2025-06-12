import React from 'react'
import { Check, Star, Crown } from 'lucide-react'

const SubscriptionPage: React.FC = () => {
  const plans = [
    {
      name: 'Basic',
      price: '$9.99',
      period: 'month',
      description: 'Perfect for occasional health consultations',
      features: [
        '5 AI consultations per month',
        'Basic health monitoring',
        'Email support',
        'Health tips and reminders'
      ],
      icon: Star,
      popular: false
    },
    {
      name: 'Premium',
      price: '$19.99',
      period: 'month',
      description: 'Ideal for regular health management',
      features: [
        'Unlimited AI consultations',
        'Advanced health analytics',
        'Priority support',
        'Personalized health plans',
        'Family sharing (up to 4 members)',
        'Integration with wearables'
      ],
      icon: Crown,
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For healthcare organizations',
      features: [
        'Custom AI training',
        'White-label solution',
        'Advanced security features',
        'Dedicated support team',
        'Custom integrations',
        'Compliance certifications'
      ],
      icon: Crown,
      popular: false
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your Health Plan
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select the perfect plan for your health and wellness journey. 
          All plans include access to our AI health companions.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {plans.map((plan, index) => {
          const IconComponent = plan.icon
          return (
            <div
              key={index}
              className={`card relative ${
                plan.popular 
                  ? 'ring-2 ring-primary-500 shadow-xl scale-105' 
                  : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`inline-flex p-3 rounded-full mb-4 ${
                  plan.popular 
                    ? 'bg-primary-100' 
                    : 'bg-gray-100'
                }`}>
                  <IconComponent className={`h-8 w-8 ${
                    plan.popular 
                      ? 'text-primary-600' 
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
                    <Check className="h-5 w-5 text-health-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  plan.popular
                    ? 'bg-primary-600 hover:bg-primary-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
              </button>
            </div>
          )
        })}
      </div>

      {/* FAQ Section */}
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              How does the AI consultation work?
            </h3>
            <p className="text-gray-600 mb-4">
              Our AI health companions use advanced video technology to provide face-to-face consultations, 
              analyzing your symptoms and providing personalized health guidance.
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
              Can I cancel my subscription anytime?
            </h3>
            <p className="text-gray-600 mb-4">
              Absolutely! You can cancel your subscription at any time through your account settings. 
              No long-term commitments required.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Do you offer family plans?
            </h3>
            <p className="text-gray-600 mb-4">
              Yes, our Premium plan includes family sharing for up to 4 members, 
              allowing your entire family to access AI health consultations.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPage