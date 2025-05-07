import React from 'react';
import { Battery, Zap, Thermometer, Clock, AlertTriangle } from 'lucide-react';
import Card from '../ui/Card';
import { BatteryData } from '../../types';

interface BatteryHealthCardProps {
  batteryData: BatteryData;
}

const BatteryHealthCard: React.FC<BatteryHealthCardProps> = ({ batteryData }) => {
  const getTemperatureColor = (temp: number) => {
    if (temp <= 25) return 'text-green-500';
    if (temp <= 35) return 'text-amber-500';
    return 'text-red-500';
  };
  
  const getChargingFrequencyText = (frequency: number) => {
    if (frequency <= 2) return 'Low (Optimal)';
    if (frequency <= 5) return 'Moderate';
    return 'High (Consider reducing)';
  };
  
  const getChargingFrequencyColor = (frequency: number) => {
    if (frequency <= 2) return 'text-green-500';
    if (frequency <= 5) return 'text-amber-500';
    return 'text-red-500';
  };
  
  const tempColor = getTemperatureColor(batteryData.averageTemperature);
  const freqColor = getChargingFrequencyColor(batteryData.chargingFrequency);
  
  const healthMetrics = [
    {
      label: 'Average Temperature',
      value: `${batteryData.averageTemperature}°C`,
      icon: <Thermometer size={18} className={tempColor} />,
      color: tempColor,
    },
    {
      label: 'Charging Frequency',
      value: getChargingFrequencyText(batteryData.chargingFrequency),
      icon: <Zap size={18} className={freqColor} />,
      color: freqColor,
    },
    {
      label: 'Battery Age',
      value: `${batteryData.age} years`,
      icon: <Clock size={18} className="text-slate-500" />,
      color: 'text-slate-500',
    },
    {
      label: 'Incidents',
      value: batteryData.incidentCount > 0 ? `${batteryData.incidentCount} reported` : 'None reported',
      icon: <AlertTriangle size={18} className={batteryData.incidentCount > 0 ? 'text-red-500' : 'text-green-500'} />,
      color: batteryData.incidentCount > 0 ? 'text-red-500' : 'text-green-500',
    },
  ];
  
  return (
    <Card 
      title="Battery Health"
      icon={<Battery className="text-teal-500" size={20} />}
      className="h-full"
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <div className="bg-slate-100 rounded-md px-3 py-1 text-sm text-slate-800">
            {batteryData.make} {batteryData.model}
          </div>
          {batteryData.isCertified && (
            <div className="bg-green-100 rounded-md px-3 py-1 text-sm text-green-800 flex items-center">
              <span className="mr-1">●</span> UL Certified
            </div>
          )}
        </div>
        
        <p className="text-sm text-slate-600">
          Last maintenance: <span className="font-medium text-slate-800">{new Date(batteryData.lastMaintenance).toLocaleDateString()}</span>
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {healthMetrics.map((metric, index) => (
            <div key={index} className="flex items-center p-3 border border-slate-200 rounded-lg">
              <div className="mr-3">{metric.icon}</div>
              <div>
                <p className="text-xs text-slate-500">{metric.label}</p>
                <p className={`text-sm font-medium ${metric.color}`}>{metric.value}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-2">
          <h4 className="text-sm font-medium text-slate-700 mb-2">Recommendations</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            {batteryData.averageTemperature > 30 && (
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">●</span> 
                <span>Consider storing in cooler conditions to reduce average temperature</span>
              </li>
            )}
            {batteryData.chargingFrequency > 4 && (
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">●</span> 
                <span>Reduce charging frequency to extend battery lifespan</span>
              </li>
            )}
            {new Date().getTime() - new Date(batteryData.lastMaintenance).getTime() > 90 * 24 * 60 * 60 * 1000 && (
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">●</span> 
                <span>Schedule maintenance check (last check {'>'} 90 days ago)</span>
              </li>
            )}
            {healthMetrics.every(m => m.label !== 'Incidents' || m.value === 'None reported') && (
              <li className="flex items-start">
                <span className="text-green-500 mr-2">●</span> 
                <span>Your battery is in good condition, continue current practices</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default BatteryHealthCard;