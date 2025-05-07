import React from 'react';
import { MapPin, Battery, Clock, ExternalLink } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { SwapStation } from '../../types';

interface SwapStationCardProps {
  station: SwapStation;
  onViewDetails?: (station: SwapStation) => void;
  onGetDirections?: (station: SwapStation) => void;
}

const SwapStationCard: React.FC<SwapStationCardProps> = ({
  station,
  onViewDetails,
  onGetDirections,
}) => {
  return (
    <Card className="h-full">
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-slate-800">{station.name}</h3>
            <p className="text-sm text-slate-500 flex items-center mt-1">
              <MapPin size={14} className="mr-1" /> {station.address}
            </p>
            <div className="flex mt-2 space-x-2">
              <Badge 
                variant={station.isOpen ? 'success' : 'danger'} 
                size="sm"
              >
                {station.isOpen ? 'Open' : 'Closed'}
              </Badge>
              <Badge variant="default" size="sm">
                {station.distance} km away
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="border border-slate-200 rounded-md p-2">
            <p className="text-xs text-slate-500">Available Batteries</p>
            <div className="flex items-center mt-1">
              <Battery className={`mr-1 ${station.availableBatteries > 0 ? 'text-green-500' : 'text-red-500'}`} size={16} />
              <span className="text-sm font-medium text-slate-800">{station.availableBatteries}</span>
            </div>
          </div>
          
          <div className="border border-slate-200 rounded-md p-2">
            <p className="text-xs text-slate-500">Hours</p>
            <div className="flex items-center mt-1">
              <Clock className="mr-1 text-slate-500" size={16} />
              <span className="text-xs font-medium text-slate-800 truncate">{station.operatingHours}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex gap-2 pt-2 mt-auto">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewDetails && onViewDetails(station)}
          >
            Details
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            className="flex-1"
            icon={<ExternalLink size={14} />}
            iconPosition="right"
            onClick={() => onGetDirections && onGetDirections(station)}
          >
            Directions
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SwapStationCard;