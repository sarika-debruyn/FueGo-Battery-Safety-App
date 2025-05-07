import React from 'react';
import { ChevronRight } from 'lucide-react';
import SafetyScoreGauge from '../components/dashboard/SafetyScoreGauge';
import BatteryHealthCard from '../components/dashboard/BatteryHealthCard';
import RewardsWidget from '../components/dashboard/RewardsWidget';
import HistoryChart from '../components/dashboard/HistoryChart';
import SwapStationCard from '../components/swap/SwapStationCard';
import Button from '../components/ui/Button';
import { safetyScore, batteryData, userAchievements, availableRewards, userPoints, nearbySwapStations } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // Get the closest available swap station
  const closestAvailableStation = nearbySwapStations
    .filter(station => station.isOpen && station.availableBatteries > 0)
    .sort((a, b) => (a.distance || 0) - (b.distance || 0))[0];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Safety Score</h2>
            <SafetyScoreGauge safetyScore={safetyScore} size="lg" />
            
            <div className="mt-4 w-full">
              <div className="flex items-center justify-between text-sm">
                <div className="text-red-500">Risk</div>
                <div className="text-amber-500">Moderate</div>
                <div className="text-green-500">Safe</div>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-500 via-amber-500 to-green-500"></div>
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>
            
            <p className="text-sm text-slate-600 mt-6 text-center">
              Last updated: {new Date(safetyScore.lastUpdated).toLocaleDateString()}
            </p>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4"
              icon={<ChevronRight size={16} />}
              iconPosition="right"
              onClick={() => navigate('/battery')}
            >
              View battery details
            </Button>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <HistoryChart safetyScore={safetyScore} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BatteryHealthCard batteryData={batteryData} />
        
        <RewardsWidget 
          rewards={availableRewards}
          achievements={userAchievements}
          userPoints={userPoints}
          onViewAllRewards={() => navigate('/rewards')}
        />
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">Nearby Swap Stations</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            icon={<ChevronRight size={16} />}
            iconPosition="right"
            onClick={() => navigate('/swap-stations')}
          >
            View all stations
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {nearbySwapStations.slice(0, 3).map((station) => (
            <SwapStationCard
              key={station.id}
              station={station}
              onViewDetails={() => navigate('/swap-stations', { state: { selectedStation: station.id } })}
              onGetDirections={() => window.open(`https://maps.google.com/?q=${station.latitude},${station.longitude}`)}
            />
          ))}
        </div>
      </div>
      
      {closestAvailableStation && (
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-teal-500">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-slate-800">Closest Available Swap Station</h3>
              <p className="text-sm text-slate-600 mt-1">
                {closestAvailableStation.name} ({closestAvailableStation.distance} km away)
              </p>
              <p className="text-sm text-green-600 mt-1">
                {closestAvailableStation.availableBatteries} batteries available
              </p>
            </div>
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => window.open(`https://maps.google.com/?q=${closestAvailableStation.latitude},${closestAvailableStation.longitude}`)}
            >
              Navigate
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;