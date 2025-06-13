import React, { useState, useEffect } from 'react'
import { Play, Pause, Video, Mic, MicOff, Camera, CameraOff } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'

const ConsultationPage: React.FC = () => {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [isVideoActive, setIsVideoActive] = useState(false)
  const [isMicActive, setIsMicActive] = useState(true)
  const [isCameraActive, setIsCameraActive] = useState(true)
  const [sessionDuration, setSessionDuration] = useState(0)
  const [aiResponse, setAiResponse] = useState('')

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
    "Is there anything else you'd like to discuss about your health?"
  ]

  const startConsultation = () => {
    setIsVideoActive(true)
    setAiResponse(aiResponses[0])
    // Simulate AI responses every 10 seconds
    setTimeout(() => setAiResponse(aiResponses[1]), 10000)
    setTimeout(() => setAiResponse(aiResponses[2]), 20000)
    setTimeout(() => setAiResponse(aiResponses[3]), 30000)
  }

  const endConsultation = () => {
    setIsVideoActive(false)
    setSessionDuration(0)
    setAiResponse('')
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

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

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Video Interface */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="aspect-video bg-gray-900 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
              {!isVideoActive ? (
                <div className="text-center">
                  <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">Click start to begin Tavus AI consultation</p>
                  <p className="text-gray-500 text-sm mt-2">
                    {user ? `Welcome ${user.name}` : 'Please login to start consultation'}
                  </p>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center relative">
                  {/* AI Agent Video Simulation */}
                  <div className="text-center text-white">
                    <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <Video className="h-16 w-16" />
                    </div>
                    <p className="text-2xl font-medium">Dr. Aarogya AI</p>
                    <p className="text-sm opacity-80">Tavus AI Health Agent</p>
                    <div className="mt-4 bg-black/30 rounded-lg p-3 max-w-md">
                      <p className="text-sm">{aiResponse}</p>
                    </div>
                  </div>
                  
                  {/* User Video Placeholder */}
                  <div className="absolute bottom-4 right-4 w-32 h-24 bg-black/50 rounded-lg flex items-center justify-center">
                    {isCameraActive ? (
                      <div className="text-white text-xs">Your Video</div>
                    ) : (
                      <CameraOff className="h-6 w-6 text-white" />
                    )}
                  </div>
                  
                  {/* Session Timer */}
                  <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {formatTime(sessionDuration)}
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={isVideoActive ? endConsultation : startConsultation}
                disabled={!user}
                className={`p-4 rounded-full transition-colors ${
                  isVideoActive 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed'
                }`}
              >
                {isVideoActive ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
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
              Session Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`font-medium ${isVideoActive ? 'text-green-600' : 'text-gray-500'}`}>
                  {isVideoActive ? 'Active' : 'Inactive'}
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
                <span className="font-medium text-purple-600">Tavus AI</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="font-medium text-gray-900">General Health Check</div>
                <div className="text-sm text-gray-600">Basic health assessment with AI</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="font-medium text-gray-900">Symptom Analysis</div>
                <div className="text-sm text-gray-600">Describe your symptoms to AI</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
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
            <a 
              href="https://tavus.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800 text-sm font-medium"
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