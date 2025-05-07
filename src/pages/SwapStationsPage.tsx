import React, { useState } from 'react';
import { MapPin, Search, Filter, Info, Battery, ExternalLink } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import StationMap from '../components/swap/StationMap';
import SwapStationCard from '../components/swap/SwapStationCard';
import { nearbySwapStations, SwapStation } from '../data/mockData';

const SwapStationsPage: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState<SwapStation | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    onlyOpen: true,
    onlyAvailable: true,
    maxDistance: 10,
  });
  
  const handleStationSelect = (station: SwapStation) => {
    setSelectedStation(station);
    setShowDetails(true);
  };
  
  const handleGetDirections = (station: SwapStation) => {
    window.open(`https://maps.google.com/?q=${station.latitude},${station.longitude}`);
  };
  
  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };
  
  const handleFilterChange = (field: keyof typeof filters, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };
  
  const filteredStations = nearbySwapStations.filter(station => {
    if (filters.onlyOpen && !station.isOpen) return false;
    if (filters.onlyAvailable && station.availableBatteries <= 0) return false;
    if ((station.distance || 0) > filters.maxDistance) return false;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return station.name.toLowerCase().includes(query) || station.address.toLowerCase().includes(query);
    }
    
    return true;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Swap Stations</h1>
        <Button 
          variant="outline" 
          size="sm" 
          icon={<Filter size={16} />}
          onClick={toggleFilter}
        >
          Filter
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 lg:w-3/5">
          <Card className="p-0 h-[500px]">
            <StationMap 
              stations={filteredStations}
              selectedStation={selectedStation || undefined}
              onSelectStation={handleStationSelect}
            />
          </Card>
        </div>
        
        <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col">
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-500" />
            </div>
            <input
              type="text"
              placeholder="Search by name or address"
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {filterOpen && (
            <Card className="mb-4">
              <h3 className="font-medium text-slate-800 mb-3">Filters</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-slate-700">Only show open stations</label>
                  <input
                    type="checkbox"
                    checked={filters.onlyOpen}
                    onChange={(e) => handleFilterChange('onlyOpen', e.target.checked)}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm text-slate-700">Only show stations with available batteries</label>
                  <input
                    type="checkbox"
                    checked={filters.onlyAvailable}
                    onChange={(e) => handleFilterChange('onlyAvailable', e.target.checked)}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-700 block mb-1">
                    Maximum distance: {filters.maxDistance} km
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={filters.maxDistance}
                    onChange={(e) => handleFilterChange('maxDistance', parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>1 km</span>
                    <span>10 km</span>
                    <span>20 km</span>
                  </div>
                </div>
              </div>
            </Card>
          )}
          
          <div className="flex-1 overflow-y-auto space-y-4 max-h-[400px] pr-1">
            {filteredStations.length > 0 ? (
              filteredStations.map((station) => (
                <SwapStationCard
                  key={station.id}
                  station={station}
                  onViewDetails={() => handleStationSelect(station)}
                  onGetDirections={() => handleGetDirections(station)}
                />
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <Info size={36} className="mx-auto text-slate-400 mb-2" />
                <h3 className="text-lg font-medium text-slate-800 mb-1">No stations found</h3>
                <p className="text-sm text-slate-600">
                  Try adjusting your filters or search criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Station Details Drawer */}
      {showDetails && selectedStation && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowDetails(false)}
          ></div>
          
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-slate-800">{selectedStation.name}</h2>
                      <button
                        className="rounded-md text-slate-400 hover:text-slate-500"
                        onClick={() => setShowDetails(false)}
                      >
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-slate-500 flex items-center">
                        <MapPin size={16} className="mr-1" />
                        {selectedStation.address}
                      </p>
                      <p className="text-sm text-slate-500 mt-1">
                        {selectedStation.distance} km away from your location
                      </p>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="border border-slate-200 rounded-md p-4">
                        <p className="text-xs text-slate-500">Available Batteries</p>
                        <div className="flex items-center mt-2">
                          <Battery className={`mr-2 ${selectedStation.availableBatteries > 0 ? 'text-green-500' : 'text-red-500'}`} size={20} />
                          <span className="text-lg font-medium text-slate-800">
                            {selectedStation.availableBatteries}
                          </span>
                        </div>
                      </div>
                      
                      <div className="border border-slate-200 rounded-md p-4">
                        <p className="text-xs text-slate-500">Status</p>
                        <p className={`text-lg font-medium mt-2 ${selectedStation.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                          {selectedStation.isOpen ? 'Open' : 'Closed'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-medium text-slate-800 mb-2">Operating Hours</h3>
                      <div className="bg-slate-50 p-4 rounded-md">
                        <p className="text-sm text-slate-700">{selectedStation.operatingHours}</p>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-medium text-slate-800 mb-2">Features</h3>
                      <ul className="bg-slate-50 p-4 rounded-md space-y-2">
                        <li className="text-sm text-slate-700 flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          Fast charge available
                        </li>
                        <li className="text-sm text-slate-700 flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          Indoor waiting area
                        </li>
                        <li className="text-sm text-slate-700 flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          Certified technicians
                        </li>
                        <li className="text-sm text-slate-700 flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          Maintenance services
                        </li>
                      </ul>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-medium text-slate-800 mb-2">Recent Reviews</h3>
                      <div className="space-y-4">
                        <div className="border border-slate-200 p-3 rounded-md">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">User123</p>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  className={`w-4 h-4 ${star <= 4 ? 'text-amber-400' : 'text-slate-300'}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-slate-600 mt-2">
                            Quick service, was in and out in 10 minutes. Clean facility.
                          </p>
                          <p className="text-xs text-slate-500 mt-1">May 10, 2025</p>
                        </div>
                        
                        <div className="border border-slate-200 p-3 rounded-md">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">Driver42</p>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  className={`w-4 h-4 ${star <= 5 ? 'text-amber-400' : 'text-slate-300'}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-slate-600 mt-2">
                            Staff was helpful and battery was fully charged. Would recommend!
                          </p>
                          <p className="text-xs text-slate-500 mt-1">May 4, 2025</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex border-t border-slate-200 p-4">
                  <Button variant="outline" className="mr-2 flex-1">
                    Call Station
                  </Button>
                  <Button 
                    variant="primary" 
                    className="flex-1"
                    icon={<ExternalLink size={16} />}
                    iconPosition="right"
                    onClick={() => handleGetDirections(selectedStation)}
                  >
                    Get Directions
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwapStationsPage;