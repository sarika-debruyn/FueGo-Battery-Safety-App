import React, { useState } from 'react';
import { Battery, Calendar, Zap, Thermometer, History, PlusCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { batteryData, safetyScore } from '../data/mockData';
import SafetyScoreGauge from '../components/dashboard/SafetyScoreGauge';

const BatteryDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'health' | 'history'>('overview');
  
  const handleLogCharge = () => {
    alert('Charging logged successfully!');
  };
  
  const handleLogMaintenance = () => {
    alert('Maintenance logged successfully!');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Battery Details</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleLogCharge}>
            Log Charge
          </Button>
          <Button variant="primary" size="sm" onClick={handleLogMaintenance}>
            Log Maintenance
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex border-b border-slate-200">
          <button
            className={`px-4 py-3 font-medium text-sm flex-1 text-center ${
              activeTab === 'overview' 
                ? 'text-teal-600 border-b-2 border-teal-600' 
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm flex-1 text-center ${
              activeTab === 'health' 
                ? 'text-teal-600 border-b-2 border-teal-600' 
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
            }`}
            onClick={() => setActiveTab('health')}
          >
            Health Metrics
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm flex-1 text-center ${
              activeTab === 'history' 
                ? 'text-teal-600 border-b-2 border-teal-600' 
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
            }`}
            onClick={() => setActiveTab('history')}
          >
            Usage History
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-4 items-center">
                <div>
                  <div className="text-3xl mb-4">
                    <Battery className="text-teal-500" size={36} />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-800">
                    {batteryData.make} {batteryData.model}
                  </h2>
                  <p className="text-sm text-slate-600">ID: {batteryData.id}</p>
                </div>
                
                <div className="ml-auto">
                  <SafetyScoreGauge safetyScore={safetyScore} size="md" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <Card className="p-0">
                  <div className="p-4">
                    <div className="flex items-center">
                      <div className="mr-3 p-2 bg-slate-100 rounded-md">
                        <Calendar size={20} className="text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Age</p>
                        <p className="font-medium">{batteryData.age} years</p>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-0">
                  <div className="p-4">
                    <div className="flex items-center">
                      <div className="mr-3 p-2 bg-slate-100 rounded-md">
                        <Zap size={20} className="text-amber-500" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Charging Frequency</p>
                        <p className="font-medium">{batteryData.chargingFrequency}/week</p>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-0">
                  <div className="p-4">
                    <div className="flex items-center">
                      <div className="mr-3 p-2 bg-slate-100 rounded-md">
                        <Thermometer size={20} className="text-red-500" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Avg Temperature</p>
                        <p className="font-medium">{batteryData.averageTemperature}°C</p>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-0">
                  <div className="p-4">
                    <div className="flex items-center">
                      <div className="mr-3 p-2 bg-slate-100 rounded-md">
                        <History size={20} className="text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Last Maintenance</p>
                        <p className="font-medium">{new Date(batteryData.lastMaintenance).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="mt-6">
                <h3 className="text-md font-semibold text-slate-800 mb-3">Battery Information</h3>
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-500">Manufacturer</p>
                      <p className="font-medium">{batteryData.make}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Model</p>
                      <p className="font-medium">{batteryData.model}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Purchase Date</p>
                      <p className="font-medium">{new Date(new Date().setFullYear(new Date().getFullYear() - batteryData.age)).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Certification</p>
                      <p className="font-medium flex items-center">
                        {batteryData.isCertified ? (
                          <Badge variant="success" size="sm">UL Certified</Badge>
                        ) : (
                          <Badge variant="danger" size="sm">Not Certified</Badge>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-md font-semibold text-slate-800 mb-3">Safety Tips</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-sm text-slate-600">Keep your battery away from direct sunlight and extreme temperatures</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-sm text-slate-600">Charge your battery regularly but avoid overcharging</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-sm text-slate-600">Schedule regular maintenance checks every 3 months</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-sm text-slate-600">Inspect for physical damage, swelling, or leakage regularly</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
          
          {activeTab === 'health' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-slate-800">Health Metrics</h2>
              
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="text-md font-medium text-slate-800 mb-3">Temperature Trends</h3>
                <div className="h-60 bg-white rounded p-2 flex items-center justify-center">
                  <p className="text-slate-500">Temperature chart would appear here</p>
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="text-md font-medium text-slate-800 mb-3">Charging Cycles</h3>
                <div className="h-60 bg-white rounded p-2 flex items-center justify-center">
                  <p className="text-slate-500">Charging cycles chart would appear here</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-md font-medium text-slate-800 mb-3">Maintenance Records</h3>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Date</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Type</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Notes</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Provider</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="py-3 px-4 text-sm text-slate-600">2025-03-15</td>
                        <td className="py-3 px-4 text-sm text-slate-600">Regular Check</td>
                        <td className="py-3 px-4 text-sm text-slate-600">Battery in good condition, no signs of wear</td>
                        <td className="py-3 px-4 text-sm text-slate-600">EcoPower Service Center</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-slate-600">2024-12-10</td>
                        <td className="py-3 px-4 text-sm text-slate-600">Regular Check</td>
                        <td className="py-3 px-4 text-sm text-slate-600">Cleaned connectors, battery health optimal</td>
                        <td className="py-3 px-4 text-sm text-slate-600">EcoPower Service Center</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-slate-600">2024-09-22</td>
                        <td className="py-3 px-4 text-sm text-slate-600">Regular Check</td>
                        <td className="py-3 px-4 text-sm text-slate-600">No issues found</td>
                        <td className="py-3 px-4 text-sm text-slate-600">EcoPower Service Center</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    icon={<PlusCircle size={16} />}
                    onClick={handleLogMaintenance}
                  >
                    Add Maintenance Record
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'history' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-slate-800">Usage History</h2>
              
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="text-md font-medium text-slate-800 mb-3">Monthly Usage</h3>
                <div className="h-60 bg-white rounded p-2 flex items-center justify-center">
                  <p className="text-slate-500">Monthly usage chart would appear here</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-md font-medium text-slate-800 mb-3">Recent Charging Sessions</h3>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Date</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Duration</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Max Temp</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Location</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="py-3 px-4 text-sm text-slate-600">2025-05-12</td>
                        <td className="py-3 px-4 text-sm text-slate-600">1h 45m</td>
                        <td className="py-3 px-4 text-sm text-slate-600">29.2°C</td>
                        <td className="py-3 px-4 text-sm text-slate-600">Home</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-slate-600">2025-05-09</td>
                        <td className="py-3 px-4 text-sm text-slate-600">2h 10m</td>
                        <td className="py-3 px-4 text-sm text-slate-600">30.5°C</td>
                        <td className="py-3 px-4 text-sm text-slate-600">Work</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-slate-600">2025-05-06</td>
                        <td className="py-3 px-4 text-sm text-slate-600">1h 30m</td>
                        <td className="py-3 px-4 text-sm text-slate-600">28.7°C</td>
                        <td className="py-3 px-4 text-sm text-slate-600">Home</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-sm text-slate-600">2025-05-03</td>
                        <td className="py-3 px-4 text-sm text-slate-600">1h 55m</td>
                        <td className="py-3 px-4 text-sm text-slate-600">31.1°C</td>
                        <td className="py-3 px-4 text-sm text-slate-600">Public Charger</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    icon={<PlusCircle size={16} />}
                    onClick={handleLogCharge}
                  >
                    Log Charging Session
                  </Button>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-md font-medium text-slate-800 mb-3">Safety Score History</h3>
                <div className="bg-white p-4 rounded border border-slate-200">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="py-2 text-left text-sm font-medium text-slate-700">Date</th>
                        <th className="py-2 text-left text-sm font-medium text-slate-700">Score</th>
                        <th className="py-2 text-left text-sm font-medium text-slate-700">Category</th>
                        <th className="py-2 text-left text-sm font-medium text-slate-700">Change</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {safetyScore.history.map((item, index) => {
                        const prevScore = index < safetyScore.history.length - 1 
                          ? safetyScore.history[index + 1].score 
                          : item.score;
                        const change = item.score - prevScore;
                        let changeColor = 'text-slate-500';
                        if (change > 0) changeColor = 'text-green-500';
                        if (change < 0) changeColor = 'text-red-500';
                        
                        return (
                          <tr key={item.date}>
                            <td className="py-3 text-sm text-slate-600">
                              {new Date(item.date).toLocaleDateString()}
                            </td>
                            <td className="py-3 text-sm text-slate-600">{item.score}</td>
                            <td className="py-3 text-sm">
                              <Badge 
                                variant={item.score >= 80 ? 'success' : item.score >= 60 ? 'warning' : 'danger'} 
                                size="sm"
                              >
                                {item.score >= 80 ? 'Safe' : item.score >= 60 ? 'Moderate Risk' : 'High Risk'}
                              </Badge>
                            </td>
                            <td className={`py-3 text-sm ${changeColor}`}>
                              {change > 0 ? `+${change}` : change}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatteryDetails;