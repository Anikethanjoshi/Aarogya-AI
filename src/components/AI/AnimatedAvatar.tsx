import React, { useEffect, useRef, useState } from 'react';

interface AnimatedAvatarProps {
  isActive: boolean;
  agentType: 'doctor' | 'nurse' | 'specialist';
  size?: 'sm' | 'md' | 'lg';
  showPulse?: boolean;
}

const AnimatedAvatar: React.FC<AnimatedAvatarProps> = ({
  isActive,
  agentType,
  size = 'md',
  showPulse = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [frame, setFrame] = useState(0);

  const sizeConfig = {
    sm: { width: 80, height: 80, scale: 0.6 },
    md: { width: 120, height: 120, scale: 0.8 },
    lg: { width: 160, height: 160, scale: 1.0 }
  };

  const avatarConfig = {
    doctor: {
      name: 'Dr. Aarogya',
      skinTone: '#fdbcb4',
      hairColor: '#4a4a4a',
      eyeColor: '#2d3748',
      backgroundColor: '#3b82f6',
      accessories: ['stethoscope', 'coat']
    },
    nurse: {
      name: 'Nurse Priya',
      skinTone: '#f7d794',
      hairColor: '#8b4513',
      eyeColor: '#2d3748',
      backgroundColor: '#10b981',
      accessories: ['cap', 'badge']
    },
    specialist: {
      name: 'Dr. Specialist',
      skinTone: '#deb887',
      hairColor: '#2f4f4f',
      eyeColor: '#2d3748',
      backgroundColor: '#8b5cf6',
      accessories: ['glasses', 'coat']
    }
  };

  const currentConfig = avatarConfig[agentType];
  const currentSize = sizeConfig[size];

  useEffect(() => {
    const animate = () => {
      setFrame(prev => prev + 0.1);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAvatar(ctx, frame, isActive);
  }, [frame, isActive, agentType, size]);

  const drawAvatar = (ctx: CanvasRenderingContext2D, frame: number, active: boolean) => {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    const scale = currentSize.scale;
    
    // Background circle with pulse effect
    if (showPulse && active) {
      const pulseScale = 1 + Math.sin(frame * 0.3) * 0.1;
      const radius = 45 * scale * pulseScale;
      
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, currentConfig.backgroundColor + '30');
      gradient.addColorStop(1, currentConfig.backgroundColor + '10');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Face
    ctx.fillStyle = currentConfig.skinTone;
    ctx.beginPath();
    ctx.arc(centerX, centerY - 2 * scale, 25 * scale, 0, Math.PI * 2);
    ctx.fill();
    
    // Hair
    ctx.fillStyle = currentConfig.hairColor;
    ctx.beginPath();
    ctx.arc(centerX, centerY - 18 * scale, 22 * scale, Math.PI, 0);
    ctx.fill();
    
    // Eyes with blinking animation
    const eyeY = centerY - 10 * scale;
    const blinkVerticalCompression = active && Math.sin(frame * 2) > 0.9 ? 1.5 * scale : 0;
    const eyeVerticalRadius = Math.max(0.1 * scale, 2 * scale - blinkVerticalCompression);
    const adjustedEyeY = eyeY + blinkVerticalCompression / 2;
    
    ctx.fillStyle = currentConfig.eyeColor;
    // Left eye
    ctx.beginPath();
    ctx.ellipse(centerX - 8 * scale, adjustedEyeY, 2 * scale, eyeVerticalRadius, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Right eye
    ctx.beginPath();
    ctx.ellipse(centerX + 8 * scale, adjustedEyeY, 2 * scale, eyeVerticalRadius, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Eyebrows
    ctx.strokeStyle = currentConfig.hairColor;
    ctx.lineWidth = 1.5 * scale;
    ctx.beginPath();
    ctx.moveTo(centerX - 12 * scale, centerY - 15 * scale);
    ctx.lineTo(centerX - 4 * scale, centerY - 13 * scale);
    ctx.moveTo(centerX + 4 * scale, centerY - 13 * scale);
    ctx.lineTo(centerX + 12 * scale, centerY - 15 * scale);
    ctx.stroke();
    
    // Nose
    ctx.strokeStyle = currentConfig.skinTone;
    ctx.lineWidth = 1 * scale;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - 5 * scale);
    ctx.lineTo(centerX - 1 * scale, centerY - 2 * scale);
    ctx.stroke();
    
    // Mouth with speaking animation
    const mouthY = centerY + 6 * scale;
    ctx.strokeStyle = '#8b4513';
    ctx.lineWidth = 1.5 * scale;
    ctx.beginPath();
    
    if (active) {
      // Animated mouth for speaking
      const mouthAnimation = Math.sin(frame * 1.5) * 0.2;
      ctx.ellipse(centerX, mouthY, 6 * scale, (3 + mouthAnimation) * scale, 0, 0, Math.PI);
    } else {
      // Neutral smile
      ctx.arc(centerX, mouthY - 1 * scale, 6 * scale, 0, Math.PI);
    }
    ctx.stroke();
    
    // Draw accessories
    drawAccessories(ctx, centerX, centerY, scale, frame, active);
    
    // Activity indicator
    if (active) {
      drawActivityIndicator(ctx, centerX, centerY + 35 * scale, scale, frame);
    }
  };

  const drawAccessories = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, scale: number, frame: number, active: boolean) => {
    switch (agentType) {
      case 'doctor':
        // Stethoscope
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 2 * scale;
        ctx.beginPath();
        ctx.arc(centerX - 15 * scale, centerY + 25 * scale, 5 * scale, 0, Math.PI * 2);
        ctx.moveTo(centerX - 10 * scale, centerY + 25 * scale);
        ctx.lineTo(centerX + 10 * scale, centerY + 25 * scale);
        ctx.arc(centerX + 15 * scale, centerY + 25 * scale, 5 * scale, 0, Math.PI * 2);
        ctx.stroke();
        
        // White coat collar
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.rect(centerX - 18 * scale, centerY + 15 * scale, 36 * scale, 20 * scale);
        ctx.fill();
        
        // Coat buttons
        ctx.fillStyle = '#333';
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.arc(centerX, centerY + (18 + i * 4) * scale, 1 * scale, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
        
      case 'nurse':
        // Nurse cap
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.ellipse(centerX, centerY - 25 * scale, 18 * scale, 6 * scale, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Red cross on cap
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(centerX - 1.5 * scale, centerY - 28 * scale, 3 * scale, 6 * scale);
        ctx.fillRect(centerX - 3 * scale, centerY - 26.5 * scale, 6 * scale, 3 * scale);
        
        // Uniform collar
        ctx.fillStyle = '#e0f2fe';
        ctx.beginPath();
        ctx.rect(centerX - 18 * scale, centerY + 15 * scale, 36 * scale, 20 * scale);
        ctx.fill();
        break;
        
      case 'specialist':
        // Glasses with slight animation
        const glassesOffset = active ? Math.sin(frame * 0.5) * 0.5 * scale : 0;
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1.5 * scale;
        ctx.beginPath();
        ctx.arc(centerX - 8 * scale, centerY - 10 * scale + glassesOffset, 6 * scale, 0, Math.PI * 2);
        ctx.arc(centerX + 8 * scale, centerY - 10 * scale + glassesOffset, 6 * scale, 0, Math.PI * 2);
        ctx.moveTo(centerX - 2 * scale, centerY - 10 * scale + glassesOffset);
        ctx.lineTo(centerX + 2 * scale, centerY - 10 * scale + glassesOffset);
        ctx.stroke();
        
        // Lab coat
        ctx.fillStyle = '#f8f9fa';
        ctx.beginPath();
        ctx.rect(centerX - 18 * scale, centerY + 15 * scale, 36 * scale, 20 * scale);
        ctx.fill();
        
        // Pocket with pen
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1 * scale;
        ctx.beginPath();
        ctx.rect(centerX - 8 * scale, centerY + 18 * scale, 16 * scale, 8 * scale);
        ctx.stroke();
        
        // Pen
        ctx.strokeStyle = '#1e40af';
        ctx.lineWidth = 1 * scale;
        ctx.beginPath();
        ctx.moveTo(centerX + 4 * scale, centerY + 18 * scale);
        ctx.lineTo(centerX + 4 * scale, centerY + 22 * scale);
        ctx.stroke();
        break;
    }
  };

  const drawActivityIndicator = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, scale: number, frame: number) => {
    // Pulsing dots
    for (let i = 0; i < 3; i++) {
      const opacity = (Math.sin(frame * 0.8 + i * 0.5) + 1) / 2;
      ctx.globalAlpha = opacity;
      ctx.fillStyle = currentConfig.backgroundColor;
      ctx.beginPath();
      ctx.arc(centerX + (i - 1) * 8 * scale, centerY, 2 * scale, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  return (
    <div className="relative inline-block">
      <canvas
        ref={canvasRef}
        width={currentSize.width}
        height={currentSize.height}
        className="rounded-full"
      />
      {isActive && (
        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
      )}
    </div>
  );
};

export default AnimatedAvatar;