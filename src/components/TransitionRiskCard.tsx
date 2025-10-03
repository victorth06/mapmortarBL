import { Button } from './ui/button';
import { AlertTriangle } from 'lucide-react';
import { TrafficLight } from './TrafficLight';

interface TransitionRiskCardProps {
  onViewDetails?: () => void;
}

export function TransitionRiskCard({ onViewDetails }: TransitionRiskCardProps) {
  // Traffic light logic:
  // Red: Any units below EPC C (immediate 2027 risk)
  // Amber: All units ≥C but some below B (2030 risk)
  // Green: All units meet or exceed EPC B
  const trafficLevel = 'high'; // Currently any units below C
  const trafficText = 'High Risk - Below EPC C';
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
                  <span className="text-[18px]" style={{ fontWeight: 700 }}>18%</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-[18px] text-amber-600" style={{ fontWeight: 700 }}>£1.2M</span>
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
                  <span className="text-[18px]" style={{ fontWeight: 700 }}>42%</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-[18px] text-red-600" style={{ fontWeight: 700 }}>£2.5M</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary stats */}
      <div className="mb-3 space-y-1">
        <p className="text-sm text-[#6B7280]">50% of portfolio (20 units) below EPC C standard</p>
        <p className="text-sm text-[#6B7280]">15% already compliant with 2030 standards (A-B)</p>
      </div>

      {/* Opportunity */}
      <p className="mb-4 text-sm text-[#9CA3AF] italic">
        Retrofit to EPC C protects £1.2M and extends compliance to 2027 → see scenarios below.
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
