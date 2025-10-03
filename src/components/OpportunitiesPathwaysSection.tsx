import React from 'react';
import { TrendingUp, Lightbulb, Target, DollarSign, Leaf } from 'lucide-react';
import { Building as BuildingType, Scenario } from '../utils/supabase/types';

interface OpportunitiesPathwaysSectionProps {
  buildings: BuildingType[];
  scenarios: Scenario[];
}

export function OpportunitiesPathwaysSection({ buildings, scenarios }: OpportunitiesPathwaysSectionProps) {
  // Mock aggregated data - in real implementation, this would be calculated from actual building and scenario data
  const aggregatedOpportunities = {
    totalSavings: 3500000, // £3.5M/year
    carbonReduction: 48, // 48%
    rentProtected: 2200000, // £2.2M/year
    capexRequired: 18500000, // £18.5M
    highPriorityBuildings: 8,
    mediumPriorityBuildings: 12,
    lowPriorityBuildings: 5
  };

  return (
    <section className="mb-12">
      {/* Section Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-[#F97316] mb-1">Opportunities & Pathways</h2>
            <p className="text-[#6B7280]">Aggregated retrofit potential across priority buildings</p>
          </div>
        </div>
      </div>

      {/* Opportunity KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-[#6B7280]">Total Potential Savings</p>
              <p className="text-2xl font-bold text-green-600">
                £{(aggregatedOpportunities.totalSavings / 1000000).toFixed(1)}M/year
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Leaf className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-[#6B7280]">Carbon Reduction Potential</p>
              <p className="text-2xl font-bold text-blue-600">
                -{aggregatedOpportunities.carbonReduction}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Target className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-[#6B7280]">Rent Protected</p>
              <p className="text-2xl font-bold text-amber-600">
                £{(aggregatedOpportunities.rentProtected / 1000000).toFixed(1)}M/year
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Lightbulb className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-[#6B7280]">CAPEX Required</p>
              <p className="text-2xl font-bold text-purple-600">
                £{(aggregatedOpportunities.capexRequired / 1000000).toFixed(1)}M
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Priority Building Distribution */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
        <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">Priority Building Distribution</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <h4 className="font-semibold text-red-900">High Priority</h4>
            </div>
            <p className="text-2xl font-bold text-red-800">{aggregatedOpportunities.highPriorityBuildings}</p>
            <p className="text-sm text-red-600">Buildings requiring immediate action</p>
          </div>

          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <h4 className="font-semibold text-amber-900">Medium Priority</h4>
            </div>
            <p className="text-2xl font-bold text-amber-800">{aggregatedOpportunities.mediumPriorityBuildings}</p>
            <p className="text-sm text-amber-600">Buildings for medium-term planning</p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h4 className="font-semibold text-green-900">Low Priority</h4>
            </div>
            <p className="text-2xl font-bold text-green-800">{aggregatedOpportunities.lowPriorityBuildings}</p>
            <p className="text-sm text-green-600">Buildings with minimal risk</p>
          </div>
        </div>
      </div>

      {/* Pathway Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
        <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">Recommended Pathways</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <h4 className="font-semibold text-amber-900 mb-2">EPC C by 2027</h4>
            <p className="text-sm text-amber-800 mb-3">
              Focus on high-priority buildings to meet immediate compliance requirements
            </p>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• {aggregatedOpportunities.highPriorityBuildings} buildings prioritized</li>
              <li>• £{(aggregatedOpportunities.rentProtected * 0.6 / 1000000).toFixed(1)}M rent protected</li>
              <li>• 8-12 year payback periods</li>
            </ul>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Net Zero 2050</h4>
            <p className="text-sm text-green-800 mb-3">
              Comprehensive approach for long-term value and carbon reduction
            </p>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• All buildings included in pathway</li>
              <li>• {aggregatedOpportunities.carbonReduction}% carbon reduction</li>
              <li>• 10-15 year payback periods</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Insight Box */}
      <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
        <h4 className="text-green-900 mb-2 font-semibold">Strategic Approach</h4>
        <p className="text-green-800 text-sm">
          Focus on high-priority buildings first to maximize impact. These buildings offer the best combination 
          of financial returns and carbon reduction potential across your portfolio.
        </p>
      </div>
    </section>
  );
}
