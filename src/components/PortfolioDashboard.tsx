import React from 'react';
import { Building2, MapPin, PoundSterling, Zap, CheckCircle, Plus, Sparkles, ArrowRight, TrendingUp, AlertTriangle, Shield, Target, Clock, Users, BarChart3, Building, Leaf, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import PortfolioPerformanceChart from './PortfolioPerformanceChart';
import EnergyBenchmarkChart from './EnergyBenchmarkChart';
import CRREMAlignmentChart from './CRREMAlignmentChart';

interface PortfolioDashboardProps {
  onViewBuilding: (id: string) => void;
}

interface InfoCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  iconColor: string;
  iconBgColor: string;
}

interface ConfidenceBarProps {
  high: number;
  medium: number;
  low: number;
  total: number;
}

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

function InfoCard({ icon: Icon, label, value, iconColor, iconBgColor }: InfoCardProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
      <div className={`p-2 ${iconBgColor} rounded-lg flex-shrink-0`}>
        <Icon className={`w-4 h-4 ${iconColor}`} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-[#6B7280] mb-0.5">{label}</p>
        <p className="text-[#1A1A1A]" style={{ fontWeight: 700 }}>{value}</p>
      </div>
    </div>
  );
}

function ConfidenceBar({ high, medium, low, total }: ConfidenceBarProps) {
  const highPercentage = (high / total) * 100;
  const mediumPercentage = (medium / total) * 100;
  const lowPercentage = (low / total) * 100;

  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
      <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
        <CheckCircle className="w-4 h-4 text-green-600" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-[#6B7280] mb-2">Data Confidence</p>
        <div className="space-y-2">
          {/* Visual Bar */}
          <div className="flex h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="bg-green-500 h-full transition-all duration-300"
              style={{ width: `${highPercentage}%` }}
            />
            <div 
              className="bg-amber-500 h-full transition-all duration-300"
              style={{ width: `${mediumPercentage}%` }}
            />
            <div 
              className="bg-red-500 h-full transition-all duration-300"
              style={{ width: `${lowPercentage}%` }}
            />
          </div>
          {/* Legend */}
          <div className="flex justify-between text-xs text-[#6B7280]">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>High ({high})</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span>Medium ({medium})</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>Low ({low})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniChart({ icon: Icon, label, value, iconColor, iconBgColor, segments, total }: MiniChartProps) {
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

interface KPICardProps {
  title: string;
  icon: React.ElementType;
  iconColor: string;
  iconBgColor: string;
  children: React.ReactNode;
}

function KPICard({ title, icon: Icon, iconColor, iconBgColor, children }: KPICardProps) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col h-full border-2 border-transparent hover:border-[#F97316] hover:shadow-lg transition-all">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 ${iconBgColor} rounded-lg`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
          <h3 className="font-semibold text-[#1A1A1A]">{title}</h3>
        </div>
        {children}
      </div>
    );
  }


export default function PortfolioDashboard({ onViewBuilding }: PortfolioDashboardProps) {
  return (
    <main className="max-w-7xl mx-auto px-6 py-8 bg-[#FAFAFA]">
      {/* Global Portfolio Filters */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-[#6B7280] mr-2">Filter by:</span>
          <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer">
            All Locations
          </Badge>
          <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer">
            Office
          </Badge>
          <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer">
            Active
          </Badge>
          <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer">
            EPC C+
          </Badge>
        </div>
      </div>

      {/* 1️⃣ Portfolio Status Overview */}
      <div className="mb-8 bg-gray-50 rounded-lg border border-gray-200 p-6">
        {/* Header with Actions */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="mb-1 text-[#F97316]">Portfolio Information</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-[#6B7280] hover:text-[#1A1A1A]"
            >
              <Sparkles className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 border-orange-200 bg-orange-50 hover:bg-orange-100 text-[#F97316]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Ask
            </Button>
          </div>
        </div>

        {/* Grid layout — 3 columns wide, 3 rows tall */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6 items-stretch">
        {/* Left 2 columns: stacked KPI + analytic cards */}
        <div className="lg:col-span-2 flex flex-col gap-2 h-full">
            {/* Row 1: Top KPIs (3 cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <InfoCard
                icon={Building2}
                label="Total Buildings"
                value="12"
                iconColor="text-blue-600"
                iconBgColor="bg-blue-100"
            />
            <InfoCard
                icon={MapPin}
                label="Total GIA"
                value="245,670 m²"
                iconColor="text-green-600"
                iconBgColor="bg-green-100"
            />
            <InfoCard
                icon={PoundSterling}
                label="Total Rent Roll"
                value="£8.2M"
                iconColor="text-purple-600"
                iconBgColor="bg-purple-100"
            />
            </div>

            {/* Row 2: EPC + Data Confidence — together span full width of 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <MiniChart
                icon={Zap}
                label="EPC Distribution"
                value="C (65)"
                iconColor="text-green-600"
                iconBgColor="bg-green-100"
                segments={[
                { label: "A", count: 1, color: "text-green-700", bgColor: "bg-green-500" },
                { label: "B", count: 3, color: "text-emerald-700", bgColor: "bg-emerald-500" },
                { label: "C", count: 5, color: "text-yellow-700", bgColor: "bg-yellow-500" },
                { label: "D", count: 2, color: "text-orange-700", bgColor: "bg-orange-500" },
                { label: "E", count: 1, color: "text-red-700", bgColor: "bg-red-500" },
                ]}
                total={12}
            />

            <MiniChart
                icon={CheckCircle}
                label="Data Confidence"
                value="79%"
                iconColor="text-green-600"
                iconBgColor="bg-green-100"
                segments={[
                { label: "High", count: 8, color: "text-green-700", bgColor: "bg-green-500" },
                { label: "Medium", count: 3, color: "text-amber-700", bgColor: "bg-amber-500" },
                { label: "Low", count: 1, color: "text-red-700", bgColor: "bg-red-500" },
                ]}
                total={12}
            />
            </div>

            {/* Row 3: Portfolio Metadata and CTA */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 h-full">
              <div className="flex flex-col gap-1">
                <p className="text-xs text-[#6B7280]">
                  Multi-let office portfolio · Mixed EPC ratings (B to E) · Built 1992-2015, various refurbishments
                </p>
                <p className="text-xs text-[#6B7280]">
                  Portfolio created: 12 Jul 2024 · Last updated: 03 Oct 2025
                </p>
              </div>
              <Button variant="outline" className="border-orange-200 bg-orange-50 hover:bg-orange-100 text-[#F97316] hover:text-orange-700 self-end sm:self-auto">
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </Button>
            </div>
        </div>

        {/* Right column: Map (spans all 3 rows) */}
        <div className="lg:row-span-3">
            <div className="bg-white border border-gray-200 rounded-lg p-4 h-full flex flex-col">
            <div className="rounded-md overflow-hidden" style={{ height: '280px' }}>
                <img 
                    src="/img/Frame 1000003340.png" 
                    alt="Portfolio Locations Map" 
                    className="w-full h-full object-cover rounded-md"
                />
            </div>
            </div>
        </div>
        </div>
      </div>

      {/* 2️⃣ Portfolio Retrofit Opportunities */}
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
                    <p className="text-xl font-semibold" style={{ color: '#dc2626' }}>12 / 25</p>
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

      {/* 3️⃣ Performance & Risk Overview */}
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
                    <span className="text-sm font-medium text-amber-600">58%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full transition-all duration-500" style={{ width: '58%' }}></div>
                  </div>
                </div>
                
                {/* EPC B compliance */}
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#6B7280]">Above EPC B (MEES 2030)</span>
                    <span className="text-sm font-medium text-orange-600">42%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full transition-all duration-500" style={{ width: '42%' }}></div>
                  </div>
                </div>
                
                {/* Separator for MEES vs CRREM */}
                <div className="my-3 border-t border-gray-200"></div>
                
                {/* Stranded risk */}
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#6B7280]">Stranded before 2050</span>
                    <span className="text-sm font-medium text-red-600">18%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full transition-all duration-500" style={{ width: '18%' }}></div>
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
                    <span className="text-lg font-semibold text-red-600">2 / 12</span>
                    </div>
                  </div>
              </div>

              {/* Stacked bar showing risk distribution */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2 flex">
                <div className="bg-green-600 h-3 rounded-l-full" style={{ width: '60%' }}></div>
                <div className="bg-orange-500 h-3" style={{ width: '25%' }}></div>
                <div className="bg-red-500 h-3 rounded-r-full" style={{ width: '15%' }}></div>
              </div>

              {/* Labels below bar */}
              <div className="flex justify-between text-[10px] text-gray-500 mb-2">
                <span>Low (7)</span>
                <span>Medium (3)</span>
                <span>High (2)</span>
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
                    <span className="text-lg font-semibold text-red-600">4 / 12</span>
                    </div>
                  </div>
              </div>

              


              {/* Stacked bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2 flex">
                <div className="bg-green-600 h-3 rounded-l-full" style={{ width: '45%' }}></div>
                <div className="bg-orange-500 h-3" style={{ width: '20%' }}></div>
                <div className="bg-red-500 h-3 rounded-r-full" style={{ width: '35%' }}></div>
              </div>

              {/* Labels */}
              <div className="flex justify-between text-[10px] text-gray-500 mb-2">
                <span>Low (5)</span>
                <span>Medium (2)</span>
                <span>High (4)</span>
              </div>

              <p className="text-xs text-[#6B7280] italic mt-auto">
                See how to integrate overheating resilience into next retrofit plan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4️⃣ Building Priority Table */}
      <div className="mb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#6B7280]" />
            <h2 className="text-2xl font-semibold text-[#1A1A1A]">
              Building Priority Table
            </h2>
          </div>
          <Button
            variant="outline"
            className="text-[#6B7280] hover:text-[#1A1A1A]"
          >
            Export Data
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-hidden border border-gray-200 rounded-xl bg-white shadow-sm">
          <table className="w-full border-collapse text-sm">
            {/* Table Head */}
            <thead className="bg-gray-50 text-left text-[#1A1A1A]">
              <tr>
                <th className="px-6 py-3 font-medium">Building</th>
                <th className="px-4 py-3 font-medium text-center">EPC</th>
                <th className="px-4 py-3 font-medium text-center">GIA</th>
                <th className="px-4 py-3 font-medium text-center">Pathway</th>
                <th className="px-4 py-3 font-medium text-center">Payback</th>
                <th className="px-4 py-3 font-medium text-center">Rent at Risk</th>
                <th className="px-4 py-3 font-medium text-center">Carbon</th>
                <th className="px-4 py-3 font-medium text-center">Priority</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">
              {[
                {
                  name: "135 Bishopsgate",
                  location: "London EC2M 3YD",
                  epc: "D",
                  gia: "43,390 sqm",
                  pathway: "EPC C 2027",
                  payback: "8y",
                  rentAtRisk: "£1.2M",
                  carbon: "-36%",
                  priority: "high",
                },
                {
                  name: "Broadgate Tower",
                  location: "London EC2A 2EW",
                  epc: "C",
                  gia: "52,000 sqm",
                  pathway: "Net Zero 2050",
                  payback: "11y",
                  rentAtRisk: "£950k",
                  carbon: "-58%",
                  priority: "medium",
                },
                {
                  name: "Canary Wharf 3",
                  location: "London E14 5AB",
                  epc: "C",
                  gia: "25,000 sqm",
                  pathway: "Net Zero 2050",
                  payback: "13y",
                  rentAtRisk: "£500k",
                  carbon: "-62%",
                  priority: "medium",
                },
                {
                  name: "Victoria House",
                  location: "London SW1E 5NA",
                  epc: "D",
                  gia: "8,000 sqm",
                  pathway: "EPC C 2027",
                  payback: "7y",
                  rentAtRisk: "£720k",
                  carbon: "-40%",
                  priority: "high",
                },
                {
                  name: "Paddington Central",
                  location: "London W2 1AS",
                  epc: "B",
                  gia: "12,000 sqm",
                  pathway: "BAU",
                  payback: "N/A",
                  rentAtRisk: "£0",
                  carbon: "-5%",
                  priority: "low",
                },
              ].map((b) => (
                <tr
                  key={b.name}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => onViewBuilding(b.name)}
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-[#1A1A1A]">{b.name}</div>
                    <div className="text-[#6B7280] text-xs">{b.location}</div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span
                      className={`inline-flex items-center justify-center px-2 py-1 text-xs font-semibold rounded-full ${
                        b.epc === "A"
                          ? "bg-green-100 text-green-700"
                          : b.epc === "B"
                          ? "bg-emerald-100 text-emerald-700"
                          : b.epc === "C"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {b.epc}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center text-[#1A1A1A]">{b.gia}</td>
                  <td className="px-4 py-4 text-center text-[#6B7280]">
                    {b.pathway}
                  </td>
                  <td className="px-4 py-4 text-center text-[#1A1A1A]">{b.payback}</td>
                  <td className="px-4 py-4 text-center font-medium text-red-500">
                    {b.rentAtRisk}
                  </td>
                  <td className="px-4 py-4 text-center font-medium text-green-600">
                    {b.carbon}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span
                      className={`inline-flex items-center justify-center px-3 py-1 text-xs font-semibold rounded-full ${
                        b.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : b.priority === "medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {b.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-[#6B7280] mt-2">
          Ranked by risk and opportunity
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <div className="text-center">
          <p className="text-lg text-[#1A1A1A] mb-2">
            <strong>£4.37M rental income at risk by 2030</strong> — Retrofitting 4 buildings could protect £4.37M and cut 201% carbon emissions annually.
          </p>
          <p className="text-sm text-[#6B7280]">
            Focus on high-risk buildings (135 Bishopsgate, Victoria House) with strong retrofit potential for maximum impact.
          </p>
        </div>
      </div>
    </main>
  );
}