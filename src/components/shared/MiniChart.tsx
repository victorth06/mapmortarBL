import React from 'react';
import { Badge } from '../ui/badge';

interface MiniChartProps {
  icon: React.ElementType;
  label: string;
  value: string;
  iconColor: string;
  iconBgColor: string;
  segments: Array<{
    label: string;
    count: number;
    color: string;
    bgColor: string;
  }>;
  total: number;
}

export default function MiniChart({ icon: Icon, label, value, iconColor, iconBgColor, segments, total }: MiniChartProps) {
  // Determine badge color based on label
  const getBadgeColor = (label: string, value: string) => {
    if (label.includes("EPC")) {
      const epcGrade = value.charAt(0);
      switch (epcGrade) {
        case 'A': return { backgroundColor: '#dcfce7', color: '#166534' }; // green-100, green-800
        case 'B': return { backgroundColor: '#d1fae5', color: '#065f46' }; // emerald-100, emerald-800
        case 'C': return { backgroundColor: '#fef3c7', color: '#92400e' }; // yellow-100, yellow-800
        case 'D': return { backgroundColor: '#fed7aa', color: '#9a3412' }; // orange-100, orange-800
        case 'E': return { backgroundColor: '#fee2e2', color: '#991b1b' }; // red-100, red-800
        case 'F': return { backgroundColor: '#fee2e2', color: '#991b1b' }; // red-100, red-800
        case 'G': return { backgroundColor: '#fee2e2', color: '#991b1b' }; // red-100, red-800
        default: return { backgroundColor: '#f3f4f6', color: '#374151' }; // gray-100, gray-800
      }
    }
    if (label.includes("Confidence")) {
      return { backgroundColor: '#dcfce7', color: '#166534' }; // green-100, green-800
    }
    return { backgroundColor: '#f3f4f6', color: '#374151' }; // gray-100, gray-800
  };

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200">
      {/* Top Section: Icon + Label + Value */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 ${iconBgColor} rounded-lg flex-shrink-0`}>
            <Icon className={`w-4 h-4 ${iconColor}`} />
          </div>
          <p className="text-xs text-[#6B7280]">{label}</p>
        </div>
        <Badge 
          variant="secondary" 
          className="px-2 py-1 rounded-full text-xs font-medium"
          style={getBadgeColor(label, value)}
        >
          {value}
        </Badge>
      </div>
      
      {/* Bottom Section: Visual Bar + Legend */}
      <div className="space-y-2">
        {/* Visual Bar */}
        <div className="flex h-2 bg-gray-200 rounded-full overflow-hidden">
          {segments.filter(segment => segment.count > 0).map((segment, index) => {
            const percentage = (segment.count / total) * 100;
            // Define colors explicitly
            const getSegmentColor = (label: string) => {
              switch (label) {
                case 'A': return '#10b981'; // green-500
                case 'B': return '#059669'; // emerald-600
                case 'C': return '#eab308'; // yellow-500
                case 'D': return '#f97316'; // orange-500
                case 'E': return '#ef4444'; // red-500
                case 'High': return '#10b981'; // green-500
                case 'Medium': return '#f59e0b'; // amber-500
                case 'Low': return '#ef4444'; // red-500
                default: return '#6b7280'; // gray-500
              }
            };
            return (
              <div 
                key={index}
                className="h-full transition-all duration-300"
                style={{ 
                  width: `${percentage}%`,
                  backgroundColor: getSegmentColor(segment.label)
                }}
              />
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-x-1 gap-y-0.5 text-[10px] text-[#6B7280]">
          {segments.map((segment, index) => {
            const getSegmentColor = (label: string) => {
              switch (label) {
                case 'A': return '#10b981'; // green-500
                case 'B': return '#059669'; // emerald-600
                case 'C': return '#eab308'; // yellow-500
                case 'D': return '#f97316'; // orange-500
                case 'E': return '#ef4444'; // red-500
                case 'High': return '#10b981'; // green-500
                case 'Medium': return '#f59e0b'; // amber-500
                case 'Low': return '#ef4444'; // red-500
                default: return '#6b7280'; // gray-500
              }
            };
            return (
              <div key={index} className="flex items-center gap-0.5">
                <div 
                  className="w-0.5 h-0.5 rounded-full"
                  style={{ backgroundColor: getSegmentColor(segment.label) }}
                ></div>
                <span>{segment.label} ({segment.count})</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
