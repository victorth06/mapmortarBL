import React from 'react';
import { Button } from '../ui/button';
import { Calendar } from 'lucide-react';
import { TrafficLight } from './TrafficLight';

interface StrandedYearCardProps {
  onViewDetails?: () => void;
}

export function StrandedYearCard({ onViewDetails }: StrandedYearCardProps) {
  // Traffic light logic:
  // Red: Stranded ≤5 years from today
  // Amber: Stranded 6-15 years away
  // Green: Stranded >15 years or aligned beyond 2050
  const yearsToStrand = 4;
  const trafficLevel = yearsToStrand <= 5 ? 'high' : yearsToStrand <= 15 ? 'medium' : 'low';
  const trafficText = yearsToStrand <= 5 
    ? 'High Risk - Stranded ≤5 years'
    : yearsToStrand <= 15 
    ? 'Medium Risk - Stranded 6-15 years'
    : 'Low Risk - Aligned >15 years';
  return (
    <div 
      className={`bg-white rounded-lg shadow-sm p-6 flex flex-col hover:shadow-lg transition-all h-full ${
        onViewDetails ? 'cursor-pointer hover:border-[#F97316] border-2 border-transparent' : ''
      }`}
      onClick={onViewDetails}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <p className="text-[#6B7280]">CRREM Stranding</p>
        <div className="p-2 bg-orange-50 rounded-lg">
          <Calendar className="w-5 h-5 text-[#F97316]" />
        </div>
      </div>

      {/* Context explanation */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <p className="text-xs text-[#6B7280]">
          <strong>CRREM</strong> = global decarbonisation pathway. Misalignment means energy/carbon use exceeds science-based limits, risking asset stranding.
        </p>
      </div>

      {/* Big Number - Stranded Year */}
      <div className="mb-3 flex-1 flex flex-col">
        <p className="text-sm text-[#6B7280] mb-2">Stranded Year</p>
        <div className="text-[56px] leading-none mb-2" style={{ fontWeight: 700 }}>
          2029
        </div>
        
        {/* Traffic Light - Aligned with other cards */}
        <TrafficLight level={trafficLevel} text={trafficText} className="mb-3" />

        {/* Supporting detail below traffic light */}
        <p className="text-sm text-[#6B7280]">
          Stranded in <span style={{ fontWeight: 700 }}>4 years</span> (without retrofit)
        </p>
      </div>

      {/* Opportunity */}
      <p className="mb-4 text-sm text-[#9CA3AF] italic">
        Retrofit extends compliance to 2036+ and protects asset value.
      </p>

      {/* CTA */}
      <div className="pt-4 border-t border-gray-200 flex justify-end">
        <Button 
          variant="ghost" 
          size="sm"
          className="rounded-full text-sm text-[#F97316] hover:text-[#F97316] hover:bg-orange-50"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails?.();
          }}
        >
          See CRREM analysis →
        </Button>
      </div>
    </div>
  );
}
