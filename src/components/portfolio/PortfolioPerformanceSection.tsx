import React from 'react';
import { BarChart3, Zap, AlertTriangle, TrendingUp, Shield, Sun } from 'lucide-react';
import EnergyBenchmarkChart from '../EnergyBenchmarkChart';
import CRREMAlignmentChart from '../CRREMAlignmentChart';

export default function PortfolioPerformanceSection() {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-6">Performance & Risk Analysis</h2>
      
      {/* 1️⃣ Energy & Carbon Performance Section */}
      <div className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart Card - Left */}
          <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-lg transition-all hover:border-[#F97316] border-2 border-transparent">
            <div className="flex items-start justify-between mb-4">
              <p className="text-[#6B7280] font-medium">Building Energy Intensity vs Benchmark</p>
              <div className="p-2 bg-blue-50 rounded-lg">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <EnergyBenchmarkChart />
          </div>

          {/* Existing KPI Card - Right */}
          <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-lg transition-all flex flex-col hover:border-[#F97316] border-2 border-transparent">
            <div className="flex items-start justify-between mb-4">
              <p className="text-[#6B7280] font-medium">Energy & Carbon Performance</p>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="space-y-3 flex-1">
              {/* Average intensity metrics */}
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-[#6B7280]">Average Energy Intensity</span>
                  <span className="text-lg font-semibold text-blue-600">121 kWh/m²</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#6B7280]">Average Carbon Intensity</span>
                  <span className="text-lg font-semibold text-green-600">11.0 kgCO₂/m²</span>
                </div>
              </div>
              
              {/* Buildings above benchmark */}
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#6B7280]">Buildings above benchmark (REEB Good Practice)</span>
                  <span className="text-sm font-medium text-red-600">68%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full transition-all duration-500" style={{ width: '68%' }}></div>
                </div>
                <p className="text-xs text-[#6B7280] mt-1">Target: 0% above benchmark (100% compliant)</p>
              </div>
              
              <div className="pt-2 border-t border-gray-200 mt-auto">
                <p className="text-xs text-[#6B7280] italic">
                  Retrofit could cut intensity by up to 30%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2️⃣ Transition Risk Section */}
      <div className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Existing KPI Card */}
          <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-lg transition-all flex flex-col hover:border-[#F97316] border-2 border-transparent">
            <div className="flex items-start justify-between mb-4">
              <p className="text-[#6B7280] font-medium">Transition Risk</p>
              <div className="p-2 bg-amber-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <div className="space-y-3 flex-1">
              {/* EPC C compliance */}
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#6B7280]">Above EPC C (MEES 2027)</span>
                  <span className="text-sm font-medium text-amber-600">50%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full transition-all duration-500" style={{ width: '50%' }}></div>
                </div>
              </div>
              
              {/* EPC B compliance */}
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#6B7280]">Above EPC B (MEES 2030)</span>
                  <span className="text-sm font-medium text-orange-600">50%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full transition-all duration-500" style={{ width: '50%' }}></div>
                </div>
              </div>
              
              {/* Separator for MEES vs CRREM */}
              <div className="my-3 border-t border-gray-200"></div>
              
              {/* Stranded risk */}
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#6B7280]">Stranded before 2050</span>
                  <span className="text-sm font-medium text-red-600">25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full transition-all duration-500" style={{ width: '25%' }}></div>
                </div>
              </div>
              
              {/* Timeline indicator */}
              <div className="flex items-center justify-between text-xs text-[#6B7280] px-1">
                <span>Today</span>
                <span>2027</span>
                <span>2030</span>
                <span>2050</span>
              </div>
              
              <div className="pt-2 border-t border-gray-200 mt-auto">
                <p className="text-xs text-[#6B7280] italic">
                  Retrofit of 2027–2030 stranding assets could extend portfolio compliance to 2036.
                </p>
              </div>
            </div>
          </div>

          {/* CRREM Alignment Chart */}
          <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-lg transition-all hover:border-[#F97316] border-2 border-transparent">
            <div className="flex items-start justify-between mb-4">
              <p className="text-[#6B7280] font-medium">CRREM Alignment & Transition Risk</p>
              <div className="p-2 bg-amber-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <CRREMAlignmentChart />
          </div>
        </div>
      </div>

      {/* 3️⃣ Physical Risk Section */}
      <div className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Flood Risk Card */}
          <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-lg transition-all flex flex-col hover:border-[#F97316] border-2 border-transparent">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <p className="text-[#374151] font-medium">Flood Risk</p>
              <div className="p-2 bg-teal-50 rounded-lg">
                <Shield className="w-5 h-5 text-teal-600" />
              </div>
            </div>

            {/* KPI + subtitle */}
            <div className="mb-3">
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-[#6B7280]">Buildings at High risk</span>
                  <span className="text-lg font-semibold text-red-600">1 / 4</span>
                </div>
              </div>
            </div>

            {/* Stacked bar showing risk distribution */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2 flex">
              <div className="bg-green-600 h-3 rounded-l-full" style={{ width: '50%' }}></div>
              <div className="bg-orange-500 h-3" style={{ width: '25%' }}></div>
              <div className="bg-red-500 h-3 rounded-r-full" style={{ width: '25%' }}></div>
            </div>

            {/* Labels below bar */}
            <div className="flex justify-between text-[10px] text-gray-500 mb-2">
              <span>Low (2)</span>
              <span>Medium (1)</span>
              <span>High (1)</span>
            </div>

            <p className="text-xs text-[#6B7280] italic mt-auto">
              See how to integrate flood resilience into next retrofit plan.
            </p>
          </div>

          {/* Overheating Risk Card */}
          <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-lg transition-all flex flex-col hover:border-[#F97316] border-2 border-transparent">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <p className="text-[#374151] font-medium">Overheating Risk</p>
              <div className="p-2 bg-orange-50 rounded-lg">
                <Sun className="w-5 h-5 text-orange-600" />
              </div>
            </div>

            {/* KPI + subtitle */}
            <div className="mb-3">
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-[#6B7280]">Buildings at High risk:</span>
                  <span className="text-lg font-semibold text-red-600">1 / 4</span>
                </div>
              </div>
            </div>

            {/* Stacked bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2 flex">
              <div className="bg-green-600 h-3 rounded-l-full" style={{ width: '50%' }}></div>
              <div className="bg-orange-500 h-3" style={{ width: '25%' }}></div>
              <div className="bg-red-500 h-3 rounded-r-full" style={{ width: '25%' }}></div>
            </div>

            {/* Labels */}
            <div className="flex justify-between text-[10px] text-gray-500 mb-2">
              <span>Low (2)</span>
              <span>Medium (1)</span>
              <span>High (1)</span>
            </div>

            <p className="text-xs text-[#6B7280] italic mt-auto">
              See how to integrate overheating resilience into next retrofit plan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
