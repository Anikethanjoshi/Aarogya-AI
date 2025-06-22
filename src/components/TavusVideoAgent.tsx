import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react';
import AnimatedAvatar from './AI/AnimatedAvatar';

interface TavusVideoAgentProps {
  script: string;
  title: string;
  className?: string;
  autoPlay?: boolean;
}

const TavusVideoAgent: React.FC<TavusVideoAgentProps> = ({ 
  script, 
  title, 
  className = '', 
  autoPlay = false 
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // 3 minutes default
  const [currentScriptIndex, setCurrentScriptIndex] = useState(0);
  const videoRef = useRef<HTMLDivElement>(null);

  // Split script into sentences for realistic speech simulation
  const scriptSentences = script.split(/[.!?]+/).filter(s => s.trim().length > 0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          
          // Change script sentence every 15 seconds
          if (newTime % 15 === 0 && scriptSentences.length > 1) {
            setCurrentScriptIndex(prevIndex => 
              (prevIndex + 1) % scriptSentences.length
            );
          }
          
          if (newTime >= duration) {
            setIsPlaying(false);
            setCurrentScriptIndex(0);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, scriptSentences.length]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setCurrentTime(0);
      setCurrentScriptIndex(0);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen && videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentScript = () => {
    if (scriptSentences.length === 0) return script;
    return scriptSentences[currentScriptIndex]?.trim() || script;
  };

  const progressPercentage = (currentTime / duration) * 100;

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden ${className}`}>
      {/* Video Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-blue-100 text-sm">Powered by Tavus AI Technology</p>
      </div>

      {/* Video Display Area */}
      <div 
        ref={videoRef}
        className={`aspect-video bg-gray-900 relative flex items-center justify-center ${
          isFullscreen ? 'fixed inset-0 z-50' : ''
        }`}
      >
        {!isPlaying ? (
          <div className="text-center text-white">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-white/30 transition-colors cursor-pointer"
                 onClick={togglePlay}>
              <Play className="h-10 w-10 ml-1" />
            </div>
            <p className="text-lg font-medium">Dr. Aarogya AI</p>
            <p className="text-sm opacity-80">Your Health Companion</p>
            <p className="text-xs opacity-60 mt-2">Click to start Tavus AI session</p>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center relative">
            {/* AI Avatar */}
            <div className="text-center text-white">
              <div className="mb-4">
                <AnimatedAvatar 
                  isActive={isPlaying}
                  agentType="doctor"
                  size="lg"
                  showPulse={true}
                />
              </div>
              <p className="text-xl font-medium mb-2">Dr. Aarogya AI</p>
              <div className="bg-black/30 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-sm leading-relaxed">{getCurrentScript()}</p>
              </div>
              
              {/* Speaking indicator */}
              {isPlaying && (
                <div className="flex justify-center mt-3">
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-1 bg-white rounded-full animate-pulse"
                        style={{
                          height: `${Math.random() * 20 + 10}px`,
                          animationDelay: `${i * 0.2}s`,
                          animationDuration: '0.8s'
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Progress Bar */}
            <div className="absolute bottom-16 left-4 right-4">
              <div className="bg-black/50 rounded-full h-1">
                <div 
                  className="bg-white rounded-full h-1 transition-all duration-1000"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-white mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Mute indicator */}
            {isMuted && (
              <div className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full">
                <VolumeX className="h-4 w-4" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Video Controls */}
      <div className="bg-gray-50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlay}
              className={`p-3 rounded-full transition-colors ${
                isPlaying 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </button>
            
            <button
              onClick={toggleMute}
              className={`p-2 rounded transition-colors ${
                isMuted 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            
            <span className="text-sm text-gray-600">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="text-xs text-gray-500">
              {isPlaying ? 'Speaking...' : 'Ready to speak'}
            </div>
            <button 
              onClick={toggleFullscreen}
              className="text-gray-600 hover:text-gray-800 p-2 transition-colors"
            >
              {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Progress bar in controls */}
        <div className="mt-3">
          <div className="bg-gray-200 rounded-full h-2 cursor-pointer"
               onClick={(e) => {
                 const rect = e.currentTarget.getBoundingClientRect();
                 const clickX = e.clientX - rect.left;
                 const newTime = (clickX / rect.width) * duration;
                 setCurrentTime(Math.floor(newTime));
               }}>
            <div 
              className="bg-blue-600 rounded-full h-2 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TavusVideoAgent;