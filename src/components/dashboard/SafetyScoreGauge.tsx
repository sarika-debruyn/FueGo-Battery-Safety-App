import React, { useEffect, useState } from 'react';
import { SafetyScore } from '../../types';

interface SafetyScoreGaugeProps {
  safetyScore: SafetyScore;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
}

const SafetyScoreGauge: React.FC<SafetyScoreGaugeProps> = ({
  safetyScore,
  size = 'md',
  showLabel = true,
  animated = true,
}) => {
  const [displayScore, setDisplayScore] = useState(0);
  
  useEffect(() => {
    if (animated) {
      let start = 0;
      const increment = safetyScore.score / 60; // Complete in 60 frames (~1 second)
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= safetyScore.score) {
          setDisplayScore(safetyScore.score);
          clearInterval(timer);
        } else {
          setDisplayScore(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    } else {
      setDisplayScore(safetyScore.score);
    }
  }, [safetyScore.score, animated]);
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };
  
  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };
  
  const getSize = () => {
    switch (size) {
      case 'sm': return { container: 'w-24 h-24', text: 'text-xl', label: 'text-xs' };
      case 'lg': return { container: 'w-56 h-56', text: 'text-5xl', label: 'text-lg' };
      default: return { container: 'w-40 h-40', text: 'text-3xl', label: 'text-sm' };
    }
  };
  
  const sizeClasses = getSize();
  const textColor = getScoreColor(displayScore);
  const bgColor = getScoreBgColor(displayScore);
  
  // Calculate the circumference and the offset based on the score
  const radius = size === 'sm' ? 40 : size === 'lg' ? 100 : 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayScore / 100) * circumference;
  
  return (
    <div className={`${sizeClasses.container} relative`}>
      <svg className="w-full h-full" viewBox="0 0 232 232">
        {/* Background track */}
        <circle
          cx="116"
          cy="116"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="16"
          className="opacity-25"
        />
        {/* Score indicator */}
        <circle
          cx="116"
          cy="116"
          r={radius}
          fill="none"
          stroke={bgColor.replace('text-', 'stroke-').replace('bg-', 'stroke-')}
          strokeWidth="16"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 116 116)"
          className="transition-all duration-1000 ease-out"
        />
        {/* Score text */}
        <text
          x="116"
          y="116"
          textAnchor="middle"
          dominantBaseline="middle"
          className={`${sizeClasses.text} ${textColor} font-bold`}
        >
          {displayScore}
        </text>
        {showLabel && (
          <text
            x="116"
            y={size === 'sm' ? 140 : size === 'lg' ? 146 : 142}
            textAnchor="middle"
            dominantBaseline="middle"
            className={`${sizeClasses.label} text-slate-500 font-medium`}
          >
            {safetyScore.category}
          </text>
        )}
      </svg>
    </div>
  );
};

export default SafetyScoreGauge;