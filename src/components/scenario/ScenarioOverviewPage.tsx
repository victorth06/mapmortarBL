import React, { useState } from 'react';
import { ArrowLeft, Download, Share2, ChevronDown, Plus, BarChart3, TrendingUp, Building2, Clock, Zap, Leaf, CheckCircle, PoundSterling } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface ScenarioOverviewPageProps {
  scenarioName: string;
  onBack: () => void;
  onOpenPanel?: (panelType: string) => void;
}

// Scenario Header Component
function ScenarioHeader({ scenarioName, onBack, onOpenPanel }: ScenarioOverviewPageProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left Area */}
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack} className="rounded-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Building
            </Button>
            
            <div className="h-6 w-px bg-gray-200" />
            
            <div className="flex items-center gap-3">
              <div>
                <p className="text-xs text-gray-500">Portfolio ▸ The Galleria</p>
                <h1 className="text-[#1A1A1A] font-semibold text-lg">{scenarioName}</h1>
              </div>
              <Badge className="bg-green-600 text-white">Future-proof</Badge>
            </div>
            
            <div className="text-xs text-gray-500">
              Target Year: 2050
            </div>
            
            <div className="flex gap-2">
              <Badge variant="outline" className="text-xs">MEES ✓</Badge>
              <Badge variant="outline" className="text-xs">CRREM ✓</Badge>
            </div>
          </div>

          {/* Right Area */}
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="rounded-full">
              Switch Scenario <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              Compare Scenarios
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

// Summary KPIs Section
function SummaryKPIsSection({ onOpenPanel }: { onOpenPanel?: (panelType: string) => void }) {
  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[#1A1A1A] font-semibold text-lg mb-1">Investment Overview</h3>
          <p className="text-sm text-gray-500">Key financial metrics at a glance</p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onOpenPanel?.('finance')}
          className="text-[#F97316] hover:text-orange-600"
        >
          See more →
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <PoundSterling className="w-5 h-5 text-[#F97316]" />
            <p className="text-sm text-gray-500">Total Investment</p>
          </div>
          <p className="text-2xl font-bold text-[#1A1A1A]">£6.2M</p>
          <p className="text-xs text-gray-500 mt-1">Upfront CAPEX</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <p className="text-sm text-gray-500">Annual Savings</p>
          </div>
          <p className="text-2xl font-bold text-green-600">£142k</p>
          <p className="text-xs text-gray-500 mt-1">Per year</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-[#1A1A1A]" />
            <p className="text-sm text-gray-500">Simple Payback</p>
          </div>
          <p className="text-2xl font-bold text-[#1A1A1A]">11 years</p>
          <p className="text-xs text-gray-500 mt-1">Break-even point</p>
        </div>
      </div>
    </section>
  );
}

// Retrofit Composition Section
function RetrofitCompositionSection({ onOpenPanel }: { onOpenPanel?: (panelType: string) => void }) {
  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[#1A1A1A] font-semibold text-lg mb-1">Retrofit Composition</h3>
          <p className="text-sm text-gray-500">What the plan includes</p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onOpenPanel?.('measures')}
          className="text-[#F97316] hover:text-orange-600"
        >
          See more →
        </Button>
      </div>
      
      {/* Segmented Bar Placeholder */}
      <div className="mb-4">
        <div className="flex h-8 bg-gray-100 rounded-lg overflow-hidden">
          <div className="bg-blue-500 flex items-center justify-center text-white text-xs font-medium" style={{ width: '33%' }}>
            Optimisation
          </div>
          <div className="bg-amber-500 flex items-center justify-center text-white text-xs font-medium" style={{ width: '33%' }}>
            Light
          </div>
          <div className="bg-purple-600 flex items-center justify-center text-white text-xs font-medium" style={{ width: '34%' }}>
            Deep
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-600">
        6 measures — 2 deep, 2 light, 2 optimisation covering envelope, plant, and controls.
      </p>
    </section>
  );
}

// Impact Snapshot Section
function ImpactSnapshotSection({ onOpenPanel }: { onOpenPanel?: (panelType: string) => void }) {
  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[#1A1A1A] font-semibold text-lg mb-1">Impact Snapshot</h3>
          <p className="text-sm text-gray-500">Environmental and performance metrics</p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onOpenPanel?.('performance')}
          className="text-[#F97316] hover:text-orange-600"
        >
          See more →
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - KPI Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-green-600" />
              <p className="text-xs text-gray-500">Energy Reduction</p>
            </div>
            <p className="text-lg font-semibold text-green-600">58%</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Leaf className="w-4 h-4 text-green-600" />
              <p className="text-xs text-gray-500">Carbon Reduction</p>
            </div>
            <p className="text-lg font-semibold text-green-600">95%</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <PoundSterling className="w-4 h-4 text-green-600" />
              <p className="text-xs text-gray-500">Rent Protected</p>
            </div>
            <p className="text-lg font-semibold text-green-600">£1.3M</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <p className="text-xs text-gray-500">CRREM Until</p>
            </div>
            <p className="text-lg font-semibold text-green-600">2050+</p>
          </div>
        </div>
        
        {/* Right Column - Chart Placeholder */}
        <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">CRREM Trajectory Chart</p>
            <p className="text-xs text-gray-400">Coming in detailed view</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Financial Highlights Section
function FinancialHighlightsSection({ onOpenPanel }: { onOpenPanel?: (panelType: string) => void }) {
  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[#1A1A1A] font-semibold text-lg mb-1">Financial Highlights</h3>
          <p className="text-sm text-gray-500">Secondary financial metrics</p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onOpenPanel?.('finance')}
          className="text-[#F97316] hover:text-orange-600"
        >
          See more →
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-1">ROI (25y)</p>
          <p className="text-lg font-semibold text-green-600">+12.3%</p>
          <p className="text-xs text-gray-500">Total return</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-1">NPV @ 6%</p>
          <p className="text-lg font-semibold text-red-600">-£0.3M</p>
          <p className="text-xs text-gray-500">Net present value</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-1">Carbon Payback</p>
          <p className="text-lg font-semibold text-[#1A1A1A]">12 years</p>
          <p className="text-xs text-gray-500">Offset embodied carbon</p>
        </div>
      </div>
    </section>
  );
}

// Timeline Overview Section
function TimelineOverviewSection({ onOpenPanel }: { onOpenPanel?: (panelType: string) => void }) {
  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[#1A1A1A] font-semibold text-lg mb-1">Implementation Timeline</h3>
          <p className="text-sm text-gray-500">Compact timeline overview</p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onOpenPanel?.('roadmap')}
          className="text-[#F97316] hover:text-orange-600"
        >
          See more →
        </Button>
      </div>
      
      {/* Timeline Placeholder */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <div className="flex-1">
            <div className="h-2 bg-blue-500 rounded" style={{ width: '20%' }}></div>
            <p className="text-xs text-gray-500 mt-1">BMS Optimisation (2025-2026)</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <div className="flex-1">
            <div className="h-2 bg-amber-500 rounded" style={{ width: '30%' }}></div>
            <p className="text-xs text-gray-500 mt-1">LED Lighting (2026-2027)</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-purple-600"></div>
          <div className="flex-1">
            <div className="h-2 bg-purple-600 rounded" style={{ width: '50%' }}></div>
            <p className="text-xs text-gray-500 mt-1">Deep Retrofit (2027-2030)</p>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex gap-4 mt-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <span className="text-gray-500">Optimisation</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
          <span className="text-gray-500">Light</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-purple-600"></div>
          <span className="text-gray-500">Deep</span>
        </div>
      </div>
    </section>
  );
}

// Business Case Insight
function BusinessCaseInsight() {
  return (
    <section className="bg-blue-50 border-l-4 border-[#F97316] rounded-lg p-4">
      <p className="text-sm text-[#1A1A1A]">
        <span className="font-semibold">Business Case Summary:</span> 
        Deep retrofit scenario achieves <span className="font-semibold text-green-600">95% carbon reduction</span> 
        and safeguards <span className="font-semibold">£1.3M rent at risk by 2027</span>. 
        Neutral NPV at 6%, positive ROI at 3% discount rate.
      </p>
    </section>
  );
}

// Footer Actions Bar
function FooterActionsBar() {
  return (
    <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 py-3 flex justify-end px-6 gap-3 z-40">
      <Button variant="outline" className="rounded-full">
        Compare Scenarios
      </Button>
      <Button variant="outline" className="rounded-full">
        <Download className="w-4 h-4 mr-2" />
        Export to Excel
      </Button>
      <Button className="bg-[#F97316] text-white hover:bg-orange-600 rounded-full">
        <Plus className="w-4 h-4 mr-2" />
        Add to Portfolio Plan
      </Button>
    </div>
  );
}

// Main Scenario Overview Page Component
export function ScenarioOverviewPage({ scenarioName, onBack, onOpenPanel }: ScenarioOverviewPageProps) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20">
      <ScenarioHeader scenarioName={scenarioName} onBack={onBack} onOpenPanel={onOpenPanel} />
      
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <SummaryKPIsSection onOpenPanel={onOpenPanel} />
        <RetrofitCompositionSection onOpenPanel={onOpenPanel} />
        <ImpactSnapshotSection onOpenPanel={onOpenPanel} />
        <FinancialHighlightsSection onOpenPanel={onOpenPanel} />
        <TimelineOverviewSection onOpenPanel={onOpenPanel} />
        <BusinessCaseInsight />
      </main>
      
      <FooterActionsBar />
    </div>
  );
}
