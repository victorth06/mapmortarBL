import React from 'react';
import { Button } from '../ui/button';
import { AlertTriangle } from 'lucide-react';
import { TrafficLight } from './TrafficLight';
import { useBuildingData } from '../../hooks/useBuildingData';

interface TransitionRiskCardProps {
  onViewDetails?: () => void;
}

export function TransitionRiskCard({ onViewDetails }: TransitionRiskCardProps) {
  const { meesSummary, loading, error } = useBuildingData();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#F97316]"></div>
        <p className="text-[#6B7280] ml-3">Loading...</p>
      </div>
    );
  }

  if (error || !meesSummary) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-red-600">Error loading MEES data</p>
      </div>
    );
  }

  // Traffic light logic:
  // Red: Any units below EPC C (immediate 2027 risk)
  // Amber: All units ≥C but some below B (2030 risk)
  // Green: All units meet or exceed EPC B
  const trafficLevel = meesSummary.unitsAtRisk2027 > 0 ? 'high' : 
                      meesSummary.unitsAtRisk2030 > 0 ? 'medium' : 'low';
  const trafficText = meesSummary.unitsAtRisk2027 > 0 ? 'High Risk - Below EPC C' :
                      meesSummary.unitsAtRisk2030 > 0 ? 'Medium Risk - Below EPC B' :
                      'Low Risk - Compliant';
  return (
    <div 
      className={`bg-white rounded-lg shadow-sm p-6 flex flex-col hover:shadow-lg transition-all h-full ${
        onViewDetails ? 'cursor-pointer hover:border-[#F97316] border-2 border-transparent' : ''
      }`}
      onClick={onViewDetails}
    >
      {/* Header with Avg EPC Badge */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <p className="text-[#6B7280]">MEES Compliance Timeline</p>
          <div className="px-3 py-1 bg-amber-100 rounded-full border border-amber-300">
            <p className="text-xs text-amber-800" style={{ fontWeight: 600 }}>Avg EPC: D (62)</p>
          </div>
        </div>
        <div className="p-2 bg-orange-50 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-[#F97316]" />
        </div>
      </div>

      {/* Traffic Light - Positioned for alignment */}
      <TrafficLight level={trafficLevel} text={trafficText} className="mb-3" />

      {/* Context explanation */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <p className="text-xs text-[#6B7280]">
          <strong>MEES</strong> = UK regulation setting minimum EPC standards (E today, C by 2027, B by 2030). Non-compliance risks rental income.
        </p>
      </div>

      {/* Timeline Table - Clean and compact */}
      <div className="mb-4 flex-1">
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm text-[#6B7280]" style={{ fontWeight: 600 }}>
                  Year
                </th>
                <th className="px-4 py-3 text-left text-sm text-[#6B7280]" style={{ fontWeight: 600 }}>
                  Standard
                </th>
                <th className="px-4 py-3 text-right text-sm text-[#6B7280]" style={{ fontWeight: 600 }}>
                  % Units at Risk
                </th>
                <th className="px-4 py-3 text-right text-sm text-[#6B7280]" style={{ fontWeight: 600 }}>
                  £ Rent at Risk
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Today - Baseline */}
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <span className="text-[18px]" style={{ fontWeight: 700 }}>Today</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-[#6B7280]">Min EPC E</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-[18px]" style={{ fontWeight: 700 }}>0%</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-[18px] text-green-600" style={{ fontWeight: 700 }}>£0</span>
                </td>
              </tr>
              {/* 2027 */}
              <tr className="hover:bg-amber-50 transition-colors">
                <td className="px-4 py-3">
                  <span className="text-[18px]" style={{ fontWeight: 700 }}>2027</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-[#6B7280]">Min EPC C</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-[18px]" style={{ fontWeight: 700 }}>{meesSummary.percentageAtRisk2027.toFixed(0)}%</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-[18px] text-amber-600" style={{ fontWeight: 700 }}>
                    {meesSummary.rentAtRisk2027 >= 1000000 ? `£${(meesSummary.rentAtRisk2027 / 1000000).toFixed(1)}M` : 
                     meesSummary.rentAtRisk2027 >= 1000 ? `£${(meesSummary.rentAtRisk2027 / 1000).toFixed(0)}k` : 
                     `£${meesSummary.rentAtRisk2027.toLocaleString()}`}
                  </span>
                </td>
              </tr>
              {/* 2030 */}
              <tr className="hover:bg-red-50 transition-colors">
                <td className="px-4 py-3">
                  <span className="text-[18px]" style={{ fontWeight: 700 }}>2030</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-[#6B7280]">Min EPC B</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-[18px]" style={{ fontWeight: 700 }}>{meesSummary.percentageAtRisk2030.toFixed(0)}%</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-[18px] text-red-600" style={{ fontWeight: 700 }}>
                    {meesSummary.rentAtRisk2030 >= 1000000 ? `£${(meesSummary.rentAtRisk2030 / 1000000).toFixed(1)}M` : 
                     meesSummary.rentAtRisk2030 >= 1000 ? `£${(meesSummary.rentAtRisk2030 / 1000).toFixed(0)}k` : 
                     `£${meesSummary.rentAtRisk2030.toLocaleString()}`}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary stats */}
      <div className="mb-3 space-y-1">
        <p className="text-sm text-[#6B7280]">{meesSummary.percentageAtRisk2027.toFixed(0)}% of portfolio ({meesSummary.totalUnits} units) below EPC C standard</p>
        <p className="text-sm text-[#6B7280]">{((meesSummary.totalUnits - meesSummary.unitsAtRisk2030) / meesSummary.totalUnits * 100).toFixed(0)}% already compliant with 2030 standards (A-B)</p>
      </div>

      {/* Opportunity */}
      <p className="mb-4 text-sm text-[#9CA3AF] italic">
        Retrofit to EPC C protects {meesSummary.rentAtRisk2027 >= 1000000 ? `£${(meesSummary.rentAtRisk2027 / 1000000).toFixed(1)}M` : `£${(meesSummary.rentAtRisk2027 / 1000).toFixed(0)}k`} and extends compliance to 2027 → see scenarios below.
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
          View MEES details →
        </Button>
      </div>
    </div>
  );
}
