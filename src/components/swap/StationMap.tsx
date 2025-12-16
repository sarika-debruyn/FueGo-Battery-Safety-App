import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
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
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
    if (!apiKey) {
      console.warn('Google Maps API key missing: set VITE_GOOGLE_MAPS_API_KEY in .env.local');
      return;
    }

    const loader = new Loader({
      apiKey,
      version: 'weekly',
    });

    let isMounted = true;

    loader.load().then(() => {
      if (!isMounted || !mapRef.current) return;

      const center = stations[0]
        ? { lat: stations[0].latitude, lng: stations[0].longitude }
        : { lat: 37.7749, lng: -122.4194 };

      if (!mapInstance.current) {
        mapInstance.current = new google.maps.Map(mapRef.current, {
          center,
          zoom: 12,
          mapTypeControl: false,
          streetViewControl: false,
        });
      } else {
        mapInstance.current.setCenter(center);
      }

      // Clear previous markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      stations.forEach(station => {
        const marker = new google.maps.Marker({
          position: { lat: station.latitude, lng: station.longitude },
          map: mapInstance.current!,
          title: station.name,
        });

        marker.addListener('click', () => onSelectStation?.(station));
        markersRef.current.push(marker);
      });

      if (selectedStation) {
        mapInstance.current.panTo({
          lat: selectedStation.latitude,
          lng: selectedStation.longitude,
        });
        mapInstance.current.setZoom(Math.max(mapInstance.current.getZoom() ?? 12, 13));
      }
    });

    return () => {
      isMounted = false;
    };
  }, [stations, selectedStation, onSelectStation]);

  return (
    <div ref={mapRef} className="w-full h-full min-h-[300px] rounded-lg overflow-hidden"></div>
  );
};

export default StationMap;
