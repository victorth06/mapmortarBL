import React from 'react';
import { MapPin, Building2 } from 'lucide-react';
import { Building as BuildingType } from '../utils/supabase/types';

interface PortfolioMapProps {
  buildings: BuildingType[];
  onBuildingClick?: (buildingId: string) => void;
}

export function PortfolioMap({ buildings, onBuildingClick }: PortfolioMapProps) {
  // Mock building locations for London area
  const buildingLocations = [
    { id: '1', name: '135 Bishopsgate', lat: 51.5194, lng: -0.0808, priority: 'high' as const },
    { id: '2', name: 'Victoria House', lat: 51.4994, lng: -0.1300, priority: 'high' as const },
    { id: '3', name: 'Broadgate Tower', lat: 51.5200, lng: -0.0800, priority: 'medium' as const },
    { id: '4', name: 'Canary Wharf 3', lat: 51.5054, lng: -0.0235, priority: 'medium' as const },
    { id: '5', name: 'Paddington Central', lat: 51.5154, lng: -0.1755, priority: 'low' as const },
  ];

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return 'bg-red-500 border-red-600';
      case 'medium':
        return 'bg-amber-500 border-amber-600';
      case 'low':
        return 'bg-green-500 border-green-600';
    }
  };

  const getPriorityText = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return 'High Priority';
      case 'medium':
        return 'Medium Priority';
      case 'low':
        return 'Low Priority';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <MapPin className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-[#1A1A1A]">Portfolio Map</h3>
          <p className="text-sm text-[#6B7280]">Building locations by priority</p>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="relative bg-gray-100 rounded-lg h-64 mb-4 overflow-hidden">
        {/* Simple SVG map representation */}
        <svg viewBox="0 0 400 300" className="w-full h-full">
          {/* London outline (simplified) */}
          <path
            d="M50 150 Q100 100 200 120 Q300 140 350 160 Q320 200 250 220 Q150 240 80 200 Q40 180 50 150 Z"
            fill="#E5E7EB"
            stroke="#9CA3AF"
            strokeWidth="2"
          />
          
          {/* Building pins */}
          {buildingLocations.map((building, index) => {
            const x = 50 + (index * 70) + (index % 2 === 0 ? 0 : 20);
            const y = 120 + (index % 2 === 0 ? 0 : 40);
            
            return (
              <g key={building.id}>
                {/* Pin shadow */}
                <circle
                  cx={x + 2}
                  cy={y + 2}
                  r="8"
                  fill="rgba(0,0,0,0.2)"
                />
                {/* Pin */}
                <circle
                  cx={x}
                  cy={y}
                  r="8"
                  fill={building.priority === 'high' ? '#EF4444' : building.priority === 'medium' ? '#F59E0B' : '#22C55E'}
                  stroke="white"
                  strokeWidth="2"
                  className="cursor-pointer hover:r-10 transition-all"
                  onClick={() => onBuildingClick?.(building.id)}
                />
                {/* Building icon */}
                <text
                  x={x}
                  y={y + 2}
                  textAnchor="middle"
                  className="text-white text-xs font-bold fill-white"
                  style={{ fontSize: '10px' }}
                >
                  <tspan>🏢</tspan>
                </text>
              </g>
            );
          })}
        </svg>
        
        {/* Map overlay info */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
          <p className="text-sm font-medium text-[#1A1A1A]">London Portfolio</p>
          <p className="text-xs text-[#6B7280]">{buildings.length} buildings</p>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-[#1A1A1A] mb-3">Priority Legend</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full border-2 ${getPriorityColor('high')}`}></div>
            <span className="text-sm text-[#6B7280]">High Priority - Immediate action required</span>
          </div>
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full border-2 ${getPriorityColor('medium')}`}></div>
            <span className="text-sm text-[#6B7280]">Medium Priority - Medium-term planning</span>
          </div>
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full border-2 ${getPriorityColor('low')}`}></div>
            <span className="text-sm text-[#6B7280]">Low Priority - Minimal risk</span>
          </div>
        </div>
      </div>

      {/* Building List */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-[#1A1A1A] mb-3">Building Details</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {buildingLocations.map((building) => (
            <div
              key={building.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => onBuildingClick?.(building.id)}
            >
              <div className={`w-2 h-2 rounded-full ${getPriorityColor(building.priority).replace('bg-', 'bg-').replace(' border-', '')}`}></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#1A1A1A] truncate">{building.name}</p>
                <p className="text-xs text-[#6B7280]">{getPriorityText(building.priority)}</p>
              </div>
              <Building2 className="w-4 h-4 text-[#6B7280]" />
            </div>
          ))}
        </div>
      </div>

      {/* Note */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-800">
          <strong>Note:</strong> This is a simplified map view. Click on building pins or list items to view detailed building information.
        </p>
      </div>
    </div>
  );
}
