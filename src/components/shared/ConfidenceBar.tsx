import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ConfidenceBarProps {
  high: number;
  medium: number;
  low: number;
  total: number;
}

export default function ConfidenceBar({ high, medium, low, total }: ConfidenceBarProps) {
  const highPercentage = (high / total) * 100;
  const mediumPercentage = (medium / total) * 100;
  const lowPercentage = (low / total) * 100;

  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
      <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
        <CheckCircle className="w-4 h-4 text-green-600" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-[#6B7280] mb-2">Data Confidence</p>
        <div className="space-y-2">
          {/* Visual Bar */}
          <div className="flex h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="bg-green-500 h-full transition-all duration-300"
              style={{ width: `${highPercentage}%` }}
            />
            <div 
              className="bg-amber-500 h-full transition-all duration-300"
              style={{ width: `${mediumPercentage}%` }}
            />
            <div 
              className="bg-red-500 h-full transition-all duration-300"
              style={{ width: `${lowPercentage}%` }}
            />
          </div>
          {/* Legend */}
          <div className="flex justify-between text-xs text-[#6B7280]">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>High ({high})</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span>Medium ({medium})</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>Low ({low})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
