import React from 'react';
import { Building, TrendingUp, Upload, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Building as BuildingType } from '../utils/supabase/types';

interface PortfolioHeroProps {
  buildings: BuildingType[];
}

export function PortfolioHero({ buildings }: PortfolioHeroProps) {
  const totalBuildings = buildings.length;
  const totalGIA = buildings.reduce((sum, building) => sum + (building.gross_internal_area || building.size_m2 || 0), 0);
  const totalEnergySpend = buildings.reduce((sum, building) => sum + (building.annual_energy_cost || 0), 0);
  
  // Calculate weighted average EPC (simplified - would need actual EPC data)
  const weightedAverageEPC = 'D'; // This would be calculated from actual EPC data
  
  // Calculate % at risk (below EPC C in 2027)
  const atRiskPercentage = 32; // This would be calculated from actual EPC data
  
  const totalCarbonEmissions = buildings.reduce((sum, building) => sum + (building.total_carbon_tco2e || 0), 0);

  return (
    <section className="mb-12">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#F97316] to-orange-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Portfolio Dashboard</h1>
            <p className="text-xl text-orange-100 mb-4">
              Your entire portfolio at a glance. Drill down by risk category to prioritise which buildings need attention first.
            </p>
            <div className="flex items-center gap-2 text-orange-100">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm">AI-powered insights and recommendations</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-6xl font-bold mb-2">{totalBuildings}</div>
            <div className="text-orange-100">Buildings</div>
          </div>
        </div>
      </div>

      {/* Portfolio KPIs Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-[#6B7280]">Total Buildings</p>
              <p className="text-2xl font-bold text-[#1A1A1A]">{totalBuildings}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-[#6B7280]">Total GIA</p>
              <p className="text-2xl font-bold text-[#1A1A1A]">
                {(totalGIA / 1000000).toFixed(1)}M m²
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-[#6B7280]">Total Energy Spend</p>
              <p className="text-2xl font-bold text-[#1A1A1A]">
                £{(totalEnergySpend / 1000000).toFixed(1)}M/year
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-[#6B7280]">Weighted Average EPC</p>
              <p className="text-2xl font-bold text-[#1A1A1A]">{weightedAverageEPC}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-[#6B7280]">% at Risk (2027)</p>
              <p className="text-2xl font-bold text-[#1A1A1A]">{atRiskPercentage}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-[#6B7280]">Total Carbon</p>
              <p className="text-2xl font-bold text-[#1A1A1A]">
                {(totalCarbonEmissions / 1000).toFixed(0)}k tCO₂e
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
              Increase Data Confidence
            </h3>
            <p className="text-[#6B7280]">
              Upload more data and documents to refine your portfolio analysis and get more accurate insights.
            </p>
          </div>
          <Button className="bg-[#F97316] hover:bg-orange-600 text-white rounded-full px-6">
            <Upload className="w-4 h-4 mr-2" />
            Upload More Data
          </Button>
        </div>
      </div>

      {/* Insight Box */}
      <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
        <h4 className="text-blue-900 mb-2 font-semibold">Portfolio Overview</h4>
        <p className="text-blue-800 text-sm">
          This is your entire portfolio at a glance. Drill down by risk category to prioritise which buildings need attention first.
        </p>
      </div>
    </section>
  );
}
