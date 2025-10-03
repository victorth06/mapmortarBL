import React from 'react';
import { Droplets, Thermometer, MapPin, Wrench } from 'lucide-react';
import { Building as BuildingType } from '../utils/supabase/types';

interface PhysicalRisksSectionProps {
  buildings: BuildingType[];
}

export function PhysicalRisksSection({ buildings }: PhysicalRisksSectionProps) {
  // Mock data - in real implementation, this would be calculated from climate risk data
  const physicalRiskData = {
    flood: {
      highRisk: 6,
      total: buildings.length,
      description: 'high flood risk'
    },
    overheating: {
      highRisk: 4,
      total: buildings.length,
      description: 'overheating exposure >30 days/year by 2050'
    }
  };

  return (
    <section className="mb-12">
      {/* Section Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <MapPin className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-[#F97316] mb-1">Physical Risk</h2>
            <p className="text-[#6B7280]">Portfolio-level climate exposure assessment</p>
          </div>
        </div>
      </div>

      {/* Risk Map/Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
        <h3 className="text-lg font-semibold text-[#1A1A1A] mb-6">Climate Risk Overview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Flood Risk */}
          <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Droplets className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900">Flood Risk</h4>
              <p className="text-2xl font-bold text-blue-800">
                {physicalRiskData.flood.highRisk} buildings
              </p>
              <p className="text-sm text-blue-600">
                {physicalRiskData.flood.description}
              </p>
            </div>
          </div>

          {/* Overheating Risk */}
          <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Thermometer className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h4 className="font-semibold text-orange-900">Overheating Risk</h4>
              <p className="text-2xl font-bold text-orange-800">
                {physicalRiskData.overheating.highRisk} buildings
              </p>
              <p className="text-sm text-orange-600">
                {physicalRiskData.overheating.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h4 className="font-semibold text-[#1A1A1A] mb-3">Flood Risk Assessment</h4>
          <div className="space-y-2 text-sm text-[#6B7280]">
            <p>• Based on Environment Agency flood maps</p>
            <p>• 1 in 100 year event probability</p>
            <p>• Surface water and river flooding</p>
            <p>• Insurance implications</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h4 className="font-semibold text-[#1A1A1A] mb-3">Overheating Risk Assessment</h4>
          <div className="space-y-2 text-sm text-[#6B7280]">
            <p>• Based on 2050 CIBSE TM59 RCP 8.5 scenario</p>
            <p>• &gt;30 days above comfort threshold</p>
            <p>• Tenant comfort and productivity impact</p>
            <p>• Cooling system requirements</p>
          </div>
        </div>
      </div>

      {/* Retrofit Linkage */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <Wrench className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h4 className="font-semibold text-[#1A1A1A]">Link to Retrofit</h4>
            <p className="text-sm text-[#6B7280]">Physical risks may influence retrofit scope and priorities</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h5 className="font-medium text-blue-900 mb-2">Flood-Proofing Measures</h5>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Raised electrical systems</li>
              <li>• Water-resistant materials</li>
              <li>• Drainage improvements</li>
              <li>• Emergency power systems</li>
            </ul>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <h5 className="font-medium text-orange-900 mb-2">Passive Cooling Solutions</h5>
            <ul className="text-sm text-orange-800 space-y-1">
              <li>• External shading systems</li>
              <li>• Natural ventilation</li>
              <li>• Thermal mass optimization</li>
              <li>• Green roof systems</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Insight Box */}
      <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-500">
        <h4 className="text-purple-900 mb-2 font-semibold">Long-term Planning</h4>
        <p className="text-purple-800 text-sm">
          Physical risk is long-term, but material for resilience planning and insurance. 
          Consider these factors in your retrofit and asset management strategies.
        </p>
      </div>
    </section>
  );
}
