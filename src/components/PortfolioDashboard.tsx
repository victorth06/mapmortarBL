import React from 'react';
import { Building2, MapPin, PoundSterling, Zap, CheckCircle, Plus, Sparkles, ArrowRight, TrendingUp, AlertTriangle, Shield, Target, Clock, Users, BarChart3, Building, Leaf } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import PortfolioPerformanceChart from './PortfolioPerformanceChart';

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
        <p className="text-[#1A1A1A] font-bold text-sm">{value}</p>
      </div>
      
      {/* Bottom Section: Visual Bar + Legend */}
      <div className="space-y-2">
        {/* Visual Bar */}
        <div className="flex h-2 bg-gray-200 rounded-full overflow-hidden">
          {segments.map((segment, index) => {
            const percentage = (segment.count / total) * 100;
            return (
              <div 
                key={index}
                className={`${segment.bgColor} h-full transition-all duration-300`}
                style={{ width: `${percentage}%` }}
              />
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[8px] text-[#6B7280]">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center gap-1">
              <div className={`w-1.5 h-1.5 ${segment.bgColor} rounded-full`}></div>
              <span>{segment.label} ({segment.count})</span>
            </div>
          ))}
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
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col h-full">
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

        {/* Grid layout — 3 columns wide, 2 rows tall */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Left 2 columns: stacked KPI + analytic cards */}
        <div className="lg:col-span-2 flex flex-col gap-3">
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
                label="Avg EPC Rating"
                value="C (65)"
                iconColor="text-amber-600"
                iconBgColor="bg-amber-100"
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
                value="89%"
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
        </div>

        {/* Right column: Map placeholder (spans both rows) */}
        <div className="lg:row-span-2">
            <div className="bg-white border border-gray-200 rounded-lg p-4 h-full flex flex-col">
            <h4 className="text-sm font-medium text-[#1A1A1A] mb-3">Portfolio Locations</h4>
            <div className="flex-1 bg-black rounded-md flex items-center justify-center min-h-[120px]">
                <span className="text-white text-lg font-medium">map</span>
            </div>
            </div>
        </div>
        </div>


        {/* Notes and Confidence Score */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-3 border-t border-gray-200">
          <p className="text-xs text-[#6B7280]">
            Multi-let office portfolio · Mixed EPC ratings (B to E) · Built 1992-2015, various refurbishments
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6B7280]">Confidence:</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
              89%
            </Badge>
          </div>
        </div>

        {/* Full Width CTA Button */}
        <div className="mt-6">
          <Button className="w-full bg-[#F97316] hover:bg-orange-600 text-white rounded-full px-6">
            <Plus className="w-4 h-4 mr-2" />
            Add Property
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
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
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Annual Savings</span>
                      <span className="text-sm">💸</span>
                    </div>
                    <p className="text-lg font-semibold text-[#1A1A1A]">£1.9M/yr</p>
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
                      <span className="text-xs text-gray-500">Buildings to upgrade</span>
                      <span className="text-sm">🏢</span>
                    </div>
                    <p className="text-lg font-semibold text-[#1A1A1A]">12 / 25</p>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-200 mt-auto">
                  <p className="text-xs text-[#6B7280]">
                    Invest £12.4M to bring portfolio to 100% EPC C+ and extend compliance by 13 years.
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
                    <p className="text-lg font-semibold text-[#1A1A1A">~£850k/year</p>
                  </div>
                  
                  {/* CO₂ Reduction (Right) */}
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#6B7280]">CO₂ Reduction</span>
                      <span className="text-lg">🌱</span>
                    </div>
                    <p className="text-lg font-semibold text-[#1A1A1A">2,870 tCO₂e/year</p>
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
                  <p className="text-xs text-[#6B7280]">
                    Retrofit extends portfolio compliance by +13 years.
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <KPICard
            title="Energy & Carbon Performance"
            icon={Zap}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          >
            <div className="space-y-4">
              <div>
                <p className="text-3xl font-bold text-[#1A1A1A]">67%</p>
                <p className="text-sm text-[#6B7280]">below benchmark</p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#6B7280]">Progress to 100%</span>
                  <span className="text-sm font-medium text-[#1A1A1A]">67%</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
              <div>
                <p className="text-lg font-semibold text-[#1A1A1A]">121 kWh/m²</p>
                <p className="text-sm text-[#6B7280]">Average intensity</p>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <p className="text-xs text-[#6B7280]">Top 3 highest intensity buildings</p>
                <p className="text-sm text-[#1A1A1A]">135 Bishopsgate, 25 Old Broad St, 40 Leadenhall</p>
              </div>
            </div>
          </KPICard>

          <KPICard
            title="Transition Risk"
            icon={AlertTriangle}
            iconColor="text-amber-600"
            iconBgColor="bg-amber-100"
          >
            <div className="space-y-4">
              <div>
                <p className="text-3xl font-bold text-[#1A1A1A]">42%</p>
                <p className="text-sm text-[#6B7280]">below EPC C (MEES 2027)</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-[#1A1A1A]">33%</p>
                <p className="text-sm text-[#6B7280]">stranded before 2030</p>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs text-[#6B7280] mb-2">
                  <span>Today</span>
                  <span>2027</span>
                  <span>2030</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '33%' }}></div>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <p className="text-xs text-[#6B7280]">Top 3 at risk</p>
                <p className="text-sm text-[#1A1A1A]">135 Bishopsgate, 25 Old Broad St, 40 Leadenhall</p>
              </div>
            </div>
          </KPICard>

          <KPICard
            title="Physical Risk"
            icon={Shield}
            iconColor="text-teal-600"
            iconBgColor="bg-teal-100"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-[#1A1A1A]">3</p>
                  <p className="text-sm text-[#6B7280]">Flood risk</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1A1A1A]">2</p>
                  <p className="text-sm text-[#6B7280]">Overheating risk</p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#6B7280]">Risk distribution</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Low</span>
                    <span className="text-[#1A1A1A]">7 buildings</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Medium</span>
                    <span className="text-[#1A1A1A]">3 buildings</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>High</span>
                    <span className="text-[#1A1A1A]">2 buildings</span>
                  </div>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <Button variant="ghost" size="sm" className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 p-0 h-auto">
                  View assumptions →
                </Button>
              </div>
            </div>
          </KPICard>
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