import React from 'react';
import { Shield, Zap, AlertTriangle, Clock, BarChart3 } from 'lucide-react';
import { Building as BuildingType } from '../utils/supabase/types';
import { TrafficLight } from './TrafficLight';

interface TransitionRisksSectionProps {
  buildings: BuildingType[];
}

export function TransitionRisksSection({ buildings }: TransitionRisksSectionProps) {
  // Mock data - in real implementation, this would be calculated from actual building data
  const riskData = {
    energy: {
      percentage: 40,
      level: 'high' as const,
      description: 'above benchmark'
    },
    mees: {
      percentage: 32,
      level: 'high' as const,
      description: 'below EPC C'
    },
    stranding: {
      percentage: 18,
      level: 'medium' as const,
      description: 'stranded by 2030'
    }
  };

  // Mock stranded year distribution
  const strandedYearDistribution = [
    { year: '2030', count: 3, percentage: 12 },
    { year: '2035', count: 5, percentage: 20 },
    { year: '2040', count: 7, percentage: 28 },
    { year: '2045', count: 6, percentage: 24 },
    { year: '2050+', count: 4, percentage: 16 }
  ];

  return (
    <section className="mb-12">
      {/* Section Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <Shield className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h2 className="text-[#F97316] mb-1">Transition Risk (Regulatory)</h2>
            <p className="text-[#6B7280]">Portfolio exposure to regulatory compliance deadlines</p>
          </div>
        </div>
      </div>

      {/* Risk Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Energy Performance Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-[#1A1A1A]">Energy Performance</h3>
              <p className="text-sm text-[#6B7280]">Usage vs benchmark</p>
            </div>
          </div>
          
          <div className="mb-4">
            <TrafficLight 
              level={riskData.energy.level}
              text={`${riskData.energy.percentage}% ${riskData.energy.description}`}
            />
          </div>
          
          <div className="text-sm text-[#6B7280]">
            <p>• Buildings consuming above industry benchmarks</p>
            <p>• Higher operating costs and carbon exposure</p>
            <p>• Potential tenant dissatisfaction</p>
          </div>
        </div>

        {/* MEES Compliance Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-[#1A1A1A]">MEES Compliance</h3>
              <p className="text-sm text-[#6B7280]">2027 & 2030 deadlines</p>
            </div>
          </div>
          
          <div className="mb-4">
            <TrafficLight 
              level={riskData.mees.level}
              text={`${riskData.mees.percentage}% ${riskData.mees.description}`}
            />
          </div>
          
          <div className="text-sm text-[#6B7280]">
            <p>• Buildings below EPC C rating</p>
            <p>• Rental income at risk from 2027</p>
            <p>• Potential enforcement action</p>
          </div>
        </div>

        {/* CRREM Stranding Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-[#1A1A1A]">CRREM Stranding</h3>
              <p className="text-sm text-[#6B7280]">Compliance timeline</p>
            </div>
          </div>
          
          <div className="mb-4">
            <TrafficLight 
              level={riskData.stranding.level}
              text={`${riskData.stranding.percentage}% ${riskData.stranding.description}`}
            />
          </div>
          
          <div className="text-sm text-[#6B7280]">
            <p>• Buildings exceeding CRREM limits</p>
            <p>• Asset value at risk from 2030</p>
            <p>• Potential stranded asset scenario</p>
          </div>
        </div>
      </div>

      {/* Stranded Year Distribution Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <BarChart3 className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-[#1A1A1A]">Stranded Year Distribution</h3>
            <p className="text-sm text-[#6B7280]">When buildings will exceed CRREM limits</p>
          </div>
        </div>

        <div className="space-y-3">
          {strandedYearDistribution.map((item) => (
            <div key={item.year} className="flex items-center gap-4">
              <div className="w-16 text-sm font-medium text-[#6B7280]">{item.year}</div>
              <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                <div 
                  className="bg-purple-500 h-6 rounded-full flex items-center justify-end pr-2"
                  style={{ width: `${item.percentage}%` }}
                >
                  <span className="text-white text-xs font-medium">{item.count}</span>
                </div>
              </div>
              <div className="w-12 text-sm text-[#6B7280] text-right">{item.percentage}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Insight Box */}
      <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-500">
        <h4 className="text-red-900 mb-2 font-semibold">Risk Prioritisation</h4>
        <p className="text-red-800 text-sm">
          These risks highlight where the portfolio is most exposed to regulation and obsolescence. 
          Start with red buildings to preserve income and compliance.
        </p>
      </div>
    </section>
  );
}
