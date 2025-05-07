import React, { useEffect, useRef } from 'react';
import { SafetyScore } from '../../types';
import Card from '../ui/Card';
import { LineChart, ArrowUpRight } from 'lucide-react';

interface HistoryChartProps {
  safetyScore: SafetyScore;
  className?: string;
}

const HistoryChart: React.FC<HistoryChartProps> = ({ safetyScore, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    const history = safetyScore.history;
    const width = canvasRef.current.width;
    const height = canvasRef.current.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw grid lines
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 1; i < 5; i++) {
      const y = height - (height * (i * 20) / 100);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Set up data points
    const dataPoints = history.map((item, index) => ({
      x: (index / (history.length - 1)) * width,
      y: height - (height * item.score / 100),
      score: item.score,
      date: new Date(item.date),
    }));
    
    // Draw line
    ctx.beginPath();
    ctx.moveTo(dataPoints[0].x, dataPoints[0].y);
    
    for (let i = 1; i < dataPoints.length; i++) {
      // Draw a curved line
      const xc = (dataPoints[i].x + dataPoints[i-1].x) / 2;
      const yc = (dataPoints[i].y + dataPoints[i-1].y) / 2;
      ctx.quadraticCurveTo(dataPoints[i-1].x, dataPoints[i-1].y, xc, yc);
    }
    
    // Draw the last point
    ctx.quadraticCurveTo(
      dataPoints[dataPoints.length-2].x, 
      dataPoints[dataPoints.length-2].y, 
      dataPoints[dataPoints.length-1].x, 
      dataPoints[dataPoints.length-1].y
    );
    
    ctx.strokeStyle = '#0D9488';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Create gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(13, 148, 136, 0.1)');
    gradient.addColorStop(1, 'rgba(13, 148, 136, 0)');
    
    // Fill area under the line
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw data points
    dataPoints.forEach((point, i) => {
      // Only draw points for first, last and higher scores
      if (i === 0 || i === dataPoints.length - 1 || 
          (i > 0 && point.score > dataPoints[i-1].score && (i < dataPoints.length - 1 && point.score >= dataPoints[i+1].score))) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#0D9488';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Add tooltip on hover (basic implementation)
        ctx.fillStyle = '#334155';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        if (i === 0) {
          ctx.textAlign = 'left';
        } else if (i === dataPoints.length - 1) {
          ctx.textAlign = 'right';
        }
        
        // Date label
        const dateLabel = point.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        ctx.fillText(dateLabel, point.x, height - 5);
        
        // Score label for first and last points
        if (i === 0 || i === dataPoints.length - 1) {
          ctx.fillText(`${point.score}`, point.x, point.y - 10);
        }
      }
    });
    
  }, [safetyScore]);
  
  const getScoreTrend = () => {
    const history = safetyScore.history;
    if (history.length < 2) return { text: 'No change', color: 'text-slate-500' };
    
    const firstScore = history[0].score;
    const lastScore = history[history.length - 1].score;
    const difference = lastScore - firstScore;
    const percentChange = (difference / firstScore) * 100;
    
    if (difference > 0) {
      return { 
        text: `+${difference.toFixed(0)} points (${percentChange.toFixed(1)}%)`, 
        color: 'text-green-500' 
      };
    } else if (difference < 0) {
      return { 
        text: `${difference.toFixed(0)} points (${percentChange.toFixed(1)}%)`, 
        color: 'text-red-500' 
      };
    } else {
      return { text: 'No change', color: 'text-slate-500' };
    }
  };
  
  const trend = getScoreTrend();
  
  return (
    <Card 
      title="Safety Score History"
      icon={<LineChart className="text-teal-500" size={20} />}
      className={className}
      subtitle={
        <div className="flex items-center">
          <span className={`text-xs ${trend.color} flex items-center`}>
            {trend.color === 'text-green-500' && <ArrowUpRight size={12} className="mr-1" />}
            {trend.text}
          </span>
        </div>
      }
    >
      <div className="h-48 relative">
        <canvas ref={canvasRef} width={500} height={200} className="w-full h-full"></canvas>
      </div>
    </Card>
  );
};

export default HistoryChart;