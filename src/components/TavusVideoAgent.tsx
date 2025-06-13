import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // 3 minutes default

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden ${className}`}>
      {/* Video Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-blue-100 text-sm">Powered by Tavus AI Technology</p>
      </div>

      {/* Video Display Area */}
      <div className="aspect-video bg-gray-900 relative flex items-center justify-center">
        {!isPlaying ? (
          <div className="text-center text-white">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Play className="h-10 w-10 ml-1" />
            </div>
            <p className="text-lg font-medium">Dr. Aarogya AI</p>
            <p className="text-sm opacity-80">Your Health Companion</p>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center relative">
            {/* AI Avatar Simulation */}
            <div className="text-center text-white">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <div className="w-24 h-24 bg-white/30 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/40 rounded-full"></div>
                </div>
              </div>
              <p className="text-xl font-medium mb-2">Dr. Aarogya AI</p>
              <div className="bg-black/30 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-sm leading-relaxed">{script}</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="absolute bottom-16 left-4 right-4">
              <div className="bg-black/50 rounded-full h-1">
                <div 
                  className="bg-white rounded-full h-1 transition-all duration-1000"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Controls */}
      <div className="bg-gray-50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlay}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </button>
            
            <button
              onClick={toggleMute}
              className="text-gray-600 hover:text-gray-800 p-2 transition-colors"
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            
            <span className="text-sm text-gray-600">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          
          <button className="text-gray-600 hover:text-gray-800 p-2 transition-colors">
            <Maximize2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TavusVideoAgent;