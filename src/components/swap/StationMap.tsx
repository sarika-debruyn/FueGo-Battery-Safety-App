import React, { useEffect, useRef } from 'react';
import { SwapStation } from '../../types';

interface StationMapProps {
  stations: SwapStation[];
  selectedStation?: SwapStation;
  onSelectStation?: (station: SwapStation) => void;
}

const StationMap: React.FC<StationMapProps> = ({
  stations,
  selectedStation,
  onSelectStation,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mapRef.current) return;
    
    // In a real application, this would use a mapping library like Mapbox or Google Maps
    // For this demo, we'll create a simple visual representation
    const mapContainer = mapRef.current;
    mapContainer.innerHTML = '';
    
    const mapBackground = document.createElement('div');
    mapBackground.className = 'w-full h-full bg-slate-100 rounded-lg overflow-hidden relative';
    mapContainer.appendChild(mapBackground);
    
    // Create a mock visual map with grid lines
    const mockMap = document.createElement('div');
    mockMap.className = 'absolute inset-0';
    mockMap.style.backgroundImage = 'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)';
    mockMap.style.backgroundSize = '40px 40px';
    mapBackground.appendChild(mockMap);
    
    // Add a mock roads
    const createRoad = (x1: number, y1: number, x2: number, y2: number, width: number) => {
      const road = document.createElement('div');
      road.className = 'absolute bg-slate-300';
      
      const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
      
      road.style.width = `${length}px`;
      road.style.height = `${width}px`;
      road.style.transform = `translate(${x1}px, ${y1}px) rotate(${angle}deg)`;
      road.style.transformOrigin = '0 0';
      
      mapBackground.appendChild(road);
    };
    
    createRoad(50, 100, 350, 100, 8); // Horizontal road
    createRoad(200, 50, 200, 250, 8); // Vertical road
    createRoad(50, 200, 350, 200, 4); // Smaller horizontal road
    createRoad(300, 50, 300, 250, 4); // Smaller vertical road
    
    // Plot each station on the map
    stations.forEach((station, index) => {
      // For demo purposes, we'll position the stations arbitrarily on our mock map
      const positions = [
        { left: '20%', top: '25%' },
        { left: '75%', top: '20%' },
        { left: '50%', top: '50%' },
        { left: '25%', top: '65%' }
      ];
      
      const position = positions[index % positions.length];
      
      const marker = document.createElement('div');
      marker.className = `absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
        selectedStation?.id === station.id ? 'scale-125 z-10' : 'hover:scale-110'
      }`;
      marker.style.left = position.left;
      marker.style.top = position.top;
      marker.onclick = () => onSelectStation && onSelectStation(station);
      
      const markerInner = document.createElement('div');
      markerInner.className = `w-full h-full rounded-full flex items-center justify-center cursor-pointer ${
        station.availableBatteries > 0 
          ? 'bg-green-500' 
          : 'bg-red-500'
      } ${station.isOpen ? '' : 'opacity-60'}`;
      marker.appendChild(markerInner);
      
      const markerIcon = document.createElement('div');
      markerIcon.className = 'text-white font-bold text-xs';
      markerIcon.innerText = `${station.availableBatteries}`;
      markerInner.appendChild(markerIcon);
      
      if (selectedStation?.id === station.id) {
        const pulse = document.createElement('div');
        pulse.className = 'absolute inset-0 rounded-full bg-teal-500 opacity-30 animate-ping';
        marker.appendChild(pulse);
      }
      
      mapBackground.appendChild(marker);
      
      // Add a simple label
      const label = document.createElement('div');
      label.className = 'absolute text-xs font-medium bg-white px-2 py-1 rounded shadow-sm';
      label.style.left = position.left;
      label.style.top = `calc(${position.top} + 20px)`;
      label.innerText = station.name;
      mapBackground.appendChild(label);
    });
    
    // Add a "You are here" marker
    const userLocation = document.createElement('div');
    userLocation.className = 'absolute w-6 h-6 bg-blue-500 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 shadow-md flex items-center justify-center';
    userLocation.style.left = '45%';
    userLocation.style.top = '40%';
    userLocation.innerHTML = '<div class="w-2 h-2 bg-white rounded-full"></div>';
    
    // Add a pulsing effect
    const pulseEffect = document.createElement('div');
    pulseEffect.className = 'absolute w-10 h-10 bg-blue-500 rounded-full opacity-30 transform -translate-x-1/2 -translate-y-1/2 animate-ping';
    pulseEffect.style.left = '45%';
    pulseEffect.style.top = '40%';
    
    mapBackground.appendChild(pulseEffect);
    mapBackground.appendChild(userLocation);
    
    // Add a label for user location
    const userLabel = document.createElement('div');
    userLabel.className = 'absolute text-xs bg-blue-500 text-white px-2 py-0.5 rounded transform -translate-x-1/2';
    userLabel.style.left = '45%';
    userLabel.style.top = 'calc(40% + 15px)';
    userLabel.innerText = 'You are here';
    mapBackground.appendChild(userLabel);
    
    // Add a compass/legend
    const compass = document.createElement('div');
    compass.className = 'absolute bottom-3 right-3 bg-white rounded-full w-14 h-14 flex items-center justify-center shadow-md';
    mapBackground.appendChild(compass);
    
    const compassInner = document.createElement('div');
    compassInner.className = 'relative w-8 h-8';
    compassInner.innerHTML = `
      <div class="absolute top-0 left-1/2 -translate-x-1/2 text-[8px] font-bold text-slate-600">N</div>
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 text-[8px] font-bold text-slate-600">S</div>
      <div class="absolute left-0 top-1/2 -translate-y-1/2 text-[8px] font-bold text-slate-600">W</div>
      <div class="absolute right-0 top-1/2 -translate-y-1/2 text-[8px] font-bold text-slate-600">E</div>
      <div class="w-px h-full bg-slate-400 absolute left-1/2 -translate-x-1/2"></div>
      <div class="h-px w-full bg-slate-400 absolute top-1/2 -translate-y-1/2"></div>
    `;
    compass.appendChild(compassInner);
    
    // Add a scale indicator
    const scale = document.createElement('div');
    scale.className = 'absolute bottom-3 left-3 bg-white px-2 py-1 rounded text-xs font-medium shadow-sm text-slate-600';
    scale.innerText = '200m';
    mapBackground.appendChild(scale);
    
  }, [stations, selectedStation, onSelectStation]);
  
  return (
    <div ref={mapRef} className="w-full h-full min-h-[300px]"></div>
  );
};

export default StationMap;