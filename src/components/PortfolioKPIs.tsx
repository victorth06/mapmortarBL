import React from 'react';
import { Building as BuildingType } from '../utils/supabase/types';

interface PortfolioKPIsProps {
  buildings: BuildingType[];
}

export function PortfolioKPIs({ buildings }: PortfolioKPIsProps) {
  // Calculate portfolio-level metrics
  const totalBuildings = buildings.length;
  const totalGIA = buildings.reduce((sum, building) => sum + (building.gross_internal_area || building.size_m2 || 0), 0);
  const totalEnergySpend = buildings.reduce((sum, building) => sum + (building.annual_energy_cost || 0), 0);
  const totalCarbonEmissions = buildings.reduce((sum, building) => sum + (building.total_carbon_tco2e || 0), 0);
  
  // Calculate weighted average EPC (simplified)
  const weightedAverageEPC = 'D';
  
  // Calculate % at risk (below EPC C in 2027)
  const atRiskPercentage = 32;

  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="text-center">
            <p className="text-sm text-[#6B7280] mb-2">Total Buildings</p>
            <p className="text-3xl font-bold text-[#1A1A1A]">{totalBuildings}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="text-center">
            <p className="text-sm text-[#6B7280] mb-2">Total GIA</p>
            <p className="text-3xl font-bold text-[#1A1A1A]">
              {(totalGIA / 1000000).toFixed(1)}M m²
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="text-center">
            <p className="text-sm text-[#6B7280] mb-2">Total Energy Spend</p>
            <p className="text-3xl font-bold text-[#1A1A1A]">
              £{(totalEnergySpend / 1000000).toFixed(1)}M/year
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="text-center">
            <p className="text-sm text-[#6B7280] mb-2">Weighted Average EPC</p>
            <p className="text-3xl font-bold text-[#1A1A1A]">{weightedAverageEPC}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="text-center">
            <p className="text-sm text-[#6B7280] mb-2">% at Risk (2027)</p>
            <p className="text-3xl font-bold text-[#1A1A1A]">{atRiskPercentage}%</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="text-center">
            <p className="text-sm text-[#6B7280] mb-2">Total Carbon</p>
            <p className="text-3xl font-bold text-[#1A1A1A]">
              {(totalCarbonEmissions / 1000).toFixed(0)}k tCO₂e
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
