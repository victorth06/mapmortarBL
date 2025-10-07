import React from 'react';
import { Building2, MapPin, PoundSterling, Zap, CheckCircle, Plus, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { InfoCard, MiniChart } from '../shared';

export default function PortfolioInfoSection() {
  return (
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
              value="4"
              iconColor="text-blue-600"
              iconBgColor="bg-blue-100"
            />
            <InfoCard
              icon={MapPin}
              label="Total GIA"
              value="79,890 m²"
              iconColor="text-green-600"
              iconBgColor="bg-green-100"
            />
            <InfoCard
              icon={PoundSterling}
              label="Total Rent Roll"
              value="£2.9M"
              iconColor="text-purple-600"
              iconBgColor="bg-purple-100"
            />
          </div>

          {/* Row 2: EPC + Data Confidence — together span full width of 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <MiniChart
              icon={Zap}
              label="EPC Distribution"
              value="C (50)"
              iconColor="text-green-600"
              iconBgColor="bg-green-100"
              segments={[
                { label: "C", count: 2, color: "text-yellow-700", bgColor: "bg-yellow-500" },
                { label: "D", count: 2, color: "text-orange-700", bgColor: "bg-orange-500" },
              ]}
              total={4}
            />

            <MiniChart
              icon={CheckCircle}
              label="Data Confidence"
              value="75%"
              iconColor="text-green-600"
              iconBgColor="bg-green-100"
              segments={[
                { label: "High", count: 3, color: "text-green-700", bgColor: "bg-green-500" },
                { label: "Medium", count: 1, color: "text-amber-700", bgColor: "bg-amber-500" },
                { label: "Low", count: 0, color: "text-red-700", bgColor: "bg-red-500" },
              ]}
              total={4}
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
  );
}
