import React from 'react';
import { PoundSterling, Zap, Leaf } from 'lucide-react';
import PortfolioPerformanceChart from '../PortfolioPerformanceChart';

export default function PortfolioRetrofitOpportunities() {
  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-2">Portfolio Retrofit Opportunities</h2>
        <p className="text-sm text-[#6B7280]">The potential impact of upgrading underperforming assets.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Left Column - Stacked Cards */}
        <div className="flex flex-col gap-4">
          {/* Card 1 - Investment & Impact (Compact 2×2 Grid) */}
          <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-lg transition-all flex flex-col hover:border-[#F97316] border-2 border-transparent">
            <div className="flex items-start justify-between mb-4">
              <p className="text-[#6B7280] font-medium">Investment & Impact</p>
              <div className="p-2 bg-orange-50 rounded-lg">
                <PoundSterling className="w-5 h-5 text-[#F97316]" />
              </div>
            </div>
            <div className="space-y-3 flex-1">
              {/* 2×2 Grid for KPIs */}
              <div className="grid grid-cols-2 gap-3">
                {/* Top-Left: Total Investment */}
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Total Investment</span>
                    <span className="text-sm">💰</span>
                  </div>
                  <p className="text-lg font-semibold text-[#1A1A1A]">£12.4M</p>
                </div>
                
                {/* Top-Right: Annual Savings */}
                <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Annual Savings</span>
                    <span className="text-sm">💸</span>
                  </div>
                  <p className="text-xl font-semibold" style={{ color: '#15803d' }}>£1.9M/yr</p>
                </div>
                
                {/* Bottom-Left: Average Payback */}
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Avg Payback</span>
                    <span className="text-sm">⏱</span>
                  </div>
                  <p className="text-lg font-semibold text-[#1A1A1A]">4.2 yrs</p>
                </div>
                
                {/* Bottom-Right: Buildings Upgraded */}
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-red-700">Buildings to upgrade</span>
                    <span className="text-sm">🏢</span>
                  </div>
                  <p className="text-xl font-semibold" style={{ color: '#dc2626' }}>2 / 4</p>
                </div>
              </div>
              
              <div className="pt-3 border-t border-gray-200 mt-auto">
                <p className="text-sm text-[#6B7280]">
                  Invest <strong>£12.4M</strong> to bring portfolio to <strong>100% EPC C+</strong> and extend compliance by <strong>13 years</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 - Energy & Carbon Reduction (Refined with swapped layout) */}
          <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-lg transition-all flex flex-col hover:border-[#F97316] border-2 border-transparent">
            <div className="flex items-start justify-between mb-4">
              <p className="text-[#6B7280] font-medium">Energy & Carbon Reduction</p>
              <div className="p-2 bg-orange-50 rounded-lg">
                <Zap className="w-5 h-5 text-[#F97316]" />
              </div>
            </div>
            <div className="space-y-3 flex-1">
              {/* Two main KPI boxes - swapped layout */}
              <div className="grid grid-cols-2 gap-3">
                {/* Energy Cost Reduction (Left) */}
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#6B7280]">Energy Cost Reduction</span>
                    <span className="text-lg">💡</span>
                  </div>
                  <p className="text-xl font-semibold" style={{ color: '#15803d' }}>~£850k/year</p>
                </div>
                
                {/* CO₂ Reduction (Right) */}
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#6B7280]">CO₂ Reduction</span>
                    <span className="text-lg">🌱</span>
                  </div>
                  <p className="text-xl font-semibold" style={{ color: '#15803d' }}>2,870 tCO₂e/year</p>
                </div>
              </div>
              
              {/* Progress bars below each metric */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-r from-blue-50 to-white p-3 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-[#6B7280]">Energy Use Reduction</span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-lg font-bold text-blue-600">34%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                      style={{ width: '34%' }}
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-white p-3 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Leaf className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-[#6B7280]">Carbon Reduction</span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-lg font-bold text-green-600">42%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-500" 
                      style={{ width: '42%' }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-2 border-t border-gray-200 mt-auto">
                <p className="text-sm text-[#6B7280]">
                  Retrofit extends portfolio compliance by <strong>+13 years</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Portfolio Performance Chart */}
        <PortfolioPerformanceChart />
      </div>
      
      {/* Section Footer */}
      <div className="mt-6 text-right">
        <p className="text-xs text-[#6B7280]">
          Portfolio insights update monthly based on latest EPC and scenario data.
        </p>
      </div>
    </div>
  );
}
