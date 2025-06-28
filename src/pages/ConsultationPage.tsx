import React, { useState, useEffect } from 'react'
import { Video, Mic, MicOff, Camera, CameraOff, Phone, PhoneOff } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import AnimatedAvatar from '../components/AI/AnimatedAvatar'
import TavusVideoAgent from '../components/TavusVideoAgent'

const ConsultationPage: React.FC = () => {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [isVideoActive, setIsVideoActive] = useState(false)
  const [isMicActive, setIsMicActive] = useState(true)
  const [isCameraActive, setIsCameraActive] = useState(true)
  const [sessionDuration, setSessionDuration] = useState(0)
  const [aiResponse, setAiResponse] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected')

  // Simulate session timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isVideoActive) {
      interval = setInterval(() => {
        setSessionDuration(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isVideoActive])

  // Simulate AI responses
  const aiResponses = [
    "Hello! I'm Dr. Aarogya, your AI health companion. How can I help you today?",
    "I understand your concerns. Let me analyze your symptoms...",
    "Based on what you've told me, I recommend the following steps...",
    "Is there anything else you'd like to discuss about your health?",
    "Thank you for consulting with me today. Take care of your health!"
  ]

  const startConsultation = async () => {
    if (!user) {
      alert('Please login to start a consultation')
      return
    }

    setIsConnecting(true)
    setConnectionStatus('connecting')
    
    // Simulate connection delay
    setTimeout(() => {
      setIsVideoActive(true)
      setConnectionStatus('connected')
      setIsConnecting(false)
      setAiResponse(aiResponses[0])
      
      // Simulate AI responses every 10 seconds
      setTimeout(() => setAiResponse(aiResponses[1]), 10000)
      setTimeout(() => setAiResponse(aiResponses[2]), 20000)
      setTimeout(() => setAiResponse(aiResponses[3]), 30000)
      setTimeout(() => setAiResponse(aiResponses[4]), 40000)
    }, 2000)
  }

  const endConsultation = () => {
    setIsVideoActive(false)
    setConnectionStatus('disconnected')
    setSessionDuration(0)
    setAiResponse('')
    setIsConnecting(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const tavusScript = "Welcome to your personalized AI health consultation. I'm Dr. Aarogya, powered by advanced Tavus AI technology. I'm here to provide you with comprehensive health guidance, answer your medical questions, and help you understand your symptoms. Please feel free to share your health concerns with me, and I'll provide you with evidence-based medical information and recommendations. Remember, while I can provide valuable health insights, always consult with a qualified healthcare professional for serious medical conditions."

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {t('consultation.title')}
        </h1>
        <p className="text-lg text-gray-600">
          {t('consultation.subtitle')}
        </p>
        <div className="mt-4 inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
          <Video className="w-4 h-4 mr-2" />
          Powered by Tavus AI Technology
        </div>
      </div>

      {/* Tavus Video Agent Demo */}
      <div className="mb-12">
        <TavusVideoAgent
          script={tavusScript}
          title="AI Health Consultation with Dr. Aarogya"
          className="max-w-4xl mx-auto"
          autoPlay={false}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Live Video Interface */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="aspect-video bg-gray-900 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
              {connectionStatus === 'disconnected' ? (
                <div className="text-center">
                  <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">Click start to begin live Tavus AI consultation</p>
                  <p className="text-gray-500 text-sm mt-2">
                    {user ? `Welcome ${user.name}` : 'Please login to start consultation'}
                  </p>
                </div>
              ) : connectionStatus === 'connecting' ? (
                <div className="text-center text-white">
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-lg">Connecting to Tavus AI...</p>
                  <p className="text-sm opacity-80">Establishing secure connection</p>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center relative">
                  {/* AI Agent Video Simulation */}
                  <div className="text-center text-white">
                    <div className="mb-4">
                      <AnimatedAvatar 
                        isActive={isVideoActive}
                        agentType="doctor"
                        size="lg"
                        showPulse={true}
                      />
                    </div>
                    <p className="text-2xl font-medium">Dr. Aarogya AI</p>
                    <p className="text-sm opacity-80">Live Tavus AI Health Agent</p>
                    {aiResponse && (
                      <div className="mt-4 bg-black/30 rounded-lg p-3 max-w-md">
                        <p className="text-sm">{aiResponse}</p>
                      </div>
                    )}
                  </div>
                  
                  {/* User Video Placeholder */}
                  <div className="absolute bottom-4 right-4 w-32 h-24 bg-black/50 rounded-lg flex items-center justify-center border-2 border-white/20">
                    {isCameraActive ? (
                      <div className="text-white text-xs text-center">
                        <Camera className="h-6 w-6 mx-auto mb-1" />
                        Your Video
                      </div>
                    ) : (
                      <CameraOff className="h-6 w-6 text-white" />
                    )}
                  </div>
                  
                  {/* Session Timer */}
                  <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    🔴 LIVE • {formatTime(sessionDuration)}
                  </div>

                  {/* Connection Status */}
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs">
                    Connected
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={isVideoActive ? endConsultation : startConsultation}
                disabled={isConnecting || !user}
                className={`p-4 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  isVideoActive 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isConnecting ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : isVideoActive ? (
                  <PhoneOff className="h-6 w-6" />
                ) : (
                  <Phone className="h-6 w-6" />
                )}
              </button>
              
              <button
                onClick={() => setIsMicActive(!isMicActive)}
                disabled={!isVideoActive}
                className={`p-4 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  isMicActive 
                    ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                {isMicActive ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
              </button>

              <button
                onClick={() => setIsCameraActive(!isCameraActive)}
                disabled={!isVideoActive}
                className={`p-4 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  isCameraActive 
                    ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                {isCameraActive ? <Camera className="h-6 w-6" /> : <CameraOff className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Consultation Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Live Session Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`font-medium capitalize ${
                  connectionStatus === 'connected' ? 'text-green-600' : 
                  connectionStatus === 'connecting' ? 'text-yellow-600' : 'text-gray-500'
                }`}>
                  {connectionStatus}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium text-gray-900">
                  {isVideoActive ? formatTime(sessionDuration) : '--:--'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">AI Agent:</span>
                <span className="font-medium text-gray-900">Dr. Aarogya (Tavus)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Technology:</span>
                <span className="font-medium text-purple-600">Tavus AI Live</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quality:</span>
                <span className="font-medium text-green-600">HD 1080p</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Health Topics
            </h3>
            <div className="space-y-3">
              <button 
                onClick={() => setAiResponse("Let's start with a general health assessment. How are you feeling today?")}
                className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="font-medium text-gray-900">General Health Check</div>
                <div className="text-sm text-gray-600">Basic health assessment with AI</div>
              </button>
              <button 
                onClick={() => setAiResponse("Please describe your symptoms in detail. When did they start?")}
                className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="font-medium text-gray-900">Symptom Analysis</div>
                <div className="text-sm text-gray-600">Describe your symptoms to AI</div>
              </button>
              <button 
                onClick={() => setAiResponse("I'd be happy to provide wellness guidance. What aspect of your health would you like to improve?")}
                className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="font-medium text-gray-900">Wellness Guidance</div>
                <div className="text-sm text-gray-600">AI lifestyle recommendations</div>
              </button>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              Important Notice
            </h3>
            <p className="text-sm text-yellow-700">
              This Tavus AI consultation is for informational purposes only and should not replace professional medical advice.
            </p>
          </div>

          {/* Tavus Integration Info */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">
              Tavus AI Technology
            </h3>
            <p className="text-sm text-purple-700 mb-3">
              Experience real-time AI video conversations with natural language processing and healthcare expertise.
            </p>
            <div className="text-xs text-purple-600 space-y-1">
              <p>• Real-time video AI responses</p>
              <p>• Natural conversation flow</p>
              <p>• Healthcare-specialized knowledge</p>
              <p>• Secure and private sessions</p>
            </div>
            <a 
              href="https://tavus.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800 text-sm font-medium mt-3 inline-block"
            >
              Learn more about Tavus →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConsultationPage