import React, { useState } from 'react'
import { Play, Pause, Video, Mic, MicOff } from 'lucide-react'

const ConsultationPage: React.FC = () => {
  const [isVideoActive, setIsVideoActive] = useState(false)
  const [isMicActive, setIsMicActive] = useState(true)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          AI Health Consultation
        </h1>
        <p className="text-lg text-gray-600">
          Start a face-to-face conversation with your AI health companion
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Video Interface */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="aspect-video bg-gray-900 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
              {!isVideoActive ? (
                <div className="text-center">
                  <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">Click start to begin consultation</p>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary-600 to-health-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Video className="h-12 w-12" />
                    </div>
                    <p className="text-xl font-medium">Dr. Aarogya AI</p>
                    <p className="text-sm opacity-80">Your AI Health Companion</p>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setIsVideoActive(!isVideoActive)}
                className={`p-4 rounded-full transition-colors ${
                  isVideoActive 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-health-500 hover:bg-health-600 text-white'
                }`}
              >
                {isVideoActive ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </button>
              
              <button
                onClick={() => setIsMicActive(!isMicActive)}
                className={`p-4 rounded-full transition-colors ${
                  isMicActive 
                    ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                {isMicActive ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Consultation Info */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Session Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`font-medium ${isVideoActive ? 'text-health-600' : 'text-gray-500'}`}>
                  {isVideoActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium text-gray-900">
                  {isVideoActive ? '00:00' : '--:--'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">AI Agent:</span>
                <span className="font-medium text-gray-900">Dr. Aarogya</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="font-medium text-gray-900">General Health Check</div>
                <div className="text-sm text-gray-600">Basic health assessment</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="font-medium text-gray-900">Symptom Analysis</div>
                <div className="text-sm text-gray-600">Describe your symptoms</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="font-medium text-gray-900">Wellness Guidance</div>
                <div className="text-sm text-gray-600">Lifestyle recommendations</div>
              </button>
            </div>
          </div>

          <div className="card bg-yellow-50 border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              Important Notice
            </h3>
            <p className="text-sm text-yellow-700">
              This AI consultation is for informational purposes only and should not replace professional medical advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConsultationPage