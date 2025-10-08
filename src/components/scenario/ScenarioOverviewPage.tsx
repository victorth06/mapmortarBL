import React, { useState } from 'react';
import { ArrowLeft, Download, Share2, ChevronDown, Plus, BarChart3, TrendingUp, Building2, Clock, Zap, Leaf, CheckCircle, PoundSterling } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { DetailPanel } from '../panels/DetailPanel';
import { CrremTrajectoryChart, EnergyWaterfallChart } from '../charts';
import { crremTrajectoryData, energyWaterfallData } from '../../data/mockChartData';

// Panel Content Components
function FinancePanelContent({ scenarioName }: { scenarioName: string }) {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Financial Analysis — {scenarioName}</h3>
        <p className="text-sm text-blue-700">
          Detailed financial metrics, cashflow analysis, and scenario comparison tools.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500 mb-1">Total CAPEX</p>
          <p className="text-xl font-bold text-gray-700">£6.2M</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500 mb-1">Annual Savings</p>
          <p className="text-xl font-bold text-green-600">£142k/year</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500 mb-1">Simple Payback</p>
          <p className="text-xl font-bold text-gray-700">11 years</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500 mb-1">ROI (25y)</p>
          <p className="text-xl font-bold text-green-600">+12.3%</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500 mb-1">NPV @6%</p>
          <p className="text-xl font-bold text-red-600">–£0.3M</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-500 mb-1">Carbon Payback</p>
          <p className="text-xl font-bold text-gray-700">12 years</p>
        </div>
      </div>

      <div className="h-[300px] bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
        <div className="text-center">
          <BarChart3 className="w-8 h-8 mx-auto mb-2 text-gray-300" />
          Cashflow Analysis Chart
          <p className="text-xs mt-1">Coming Soon</p>
        </div>
      </div>
    </div>
  );
}

function MeasuresPanelContent() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Intervention Measures</h3>
        <p className="text-sm text-blue-700">
          Detailed breakdown of retrofit measures, costs, and implementation timeline.
        </p>
      </div>

      <div className="h-[300px] bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
        <div className="text-center">
          <Building2 className="w-8 h-8 mx-auto mb-2 text-gray-300" />
          Measures Details
          <p className="text-xs mt-1">Coming Soon</p>
        </div>
      </div>
    </div>
  );
}

function PerformancePanelContent() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Performance & Benchmark Details</h3>
        <p className="text-sm text-blue-700">
          Environmental and performance metrics with detailed charts and analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-[300px] bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
          <div className="text-center">
            <BarChart3 className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            CRREM Trajectory Chart
            <p className="text-xs mt-1">Coming Soon</p>
          </div>
        </div>
        <div className="h-[300px] bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
          <div className="text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            Energy Waterfall Chart
            <p className="text-xs mt-1">Coming Soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RoadmapPanelContent() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Implementation Roadmap</h3>
        <p className="text-sm text-blue-700">
          Detailed timeline, milestones, and implementation schedule for the retrofit plan.
        </p>
      </div>

      <div className="h-[300px] bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
        <div className="text-center">
          <Clock className="w-8 h-8 mx-auto mb-2 text-gray-300" />
          Implementation Timeline
          <p className="text-xs mt-1">Coming Soon</p>
        </div>
      </div>
    </div>
  );
}

interface ScenarioOverviewPageProps {
  scenarioName: string;
  onBack: () => void;
  onOpenPanel?: (panelType: string) => void;
}

// Scenario Header Component
function ScenarioHeader({ scenarioName, onBack, onOpenPanel }: ScenarioOverviewPageProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-8 py-3 space-y-3">
        {/* Row 1: Navigation & Context */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onBack} className="rounded-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Building
            </Button>
            <div className="text-sm text-gray-500">
              <span className="font-medium text-gray-700">Portfolio:</span> The Galleria
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="bg-green-600 text-white">Future-proof</Badge>
            <span className="text-sm text-gray-500">Target Year: <strong>2050</strong></span>
          </div>
        </div>

        {/* Row 2: Scenario title + filters + actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-gray-800">{scenarioName}</h1>
            <div className="flex items-center gap-2">
              <Badge variant="outline">MEES ✓</Badge>
              <Badge variant="outline">CRREM ✓</Badge>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Select defaultValue="crrem">
              <SelectTrigger className="w-[120px] text-sm">
                <SelectValue placeholder="CRREM" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="crrem">CRREM</SelectItem>
                <SelectItem value="mees">MEES</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" className="rounded-full">
              Switch Scenario
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              Compare Scenarios
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              <Download className="w-4 h-4 mr-1" /> Export
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              <Share2 className="w-4 h-4 mr-1" /> Share
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

// Scenario Summary Banner
function ScenarioSummaryBanner() {
  return (
    <section className="bg-orange-50 border-l-4 border-[#F97316] rounded-r-xl p-4 mb-6">
      <p className="text-sm text-gray-800">
        <span className="font-semibold">Net Zero 2050:</span> 
        This deep retrofit pathway aligns the building with CRREM 1.5°C targets, 
        eliminating 95% of operational carbon and protecting £1.3M of rental value by 2027.
      </p>
    </section>
  );
}

// Summary KPIs Section
function SummaryKPIsSection({ onOpenPanel }: { onOpenPanel?: (panelType: string) => void }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700">Investment Overview</h3>
          <p className="text-xs text-gray-500">Key financial metrics at a glance</p>
        </div>
        <div className="text-sm text-[#F97316] font-medium">See more →</div>
      </div>
      <section 
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-[#F97316] transition-all cursor-pointer"
        onClick={() => onOpenPanel?.('finance')}
      >
      
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
          <p className="text-xs text-gray-500 mt-1">Equivalent to £42 per tCO₂ saved</p>
        </div>
      </div>
      
      {/* Financial Insight Commentary */}
      <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm text-gray-700 border border-blue-100">
        <span className="font-medium">Financial Insight:</span> 
        Estimated £6.2M CAPEX achieves £142k annual OPEX savings with an 11-year payback, 
        primarily through plant upgrades and building fabric improvements.
      </div>
      </section>
    </div>
  );
}

// Retrofit Composition Section
function RetrofitCompositionSection({ onOpenPanel }: { onOpenPanel?: (panelType: string) => void }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700">Retrofit Composition</h3>
          <p className="text-xs text-gray-500">What the plan includes</p>
        </div>
        <div className="text-sm text-[#F97316] font-medium">See more →</div>
      </div>
      <section 
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-[#F97316] transition-all cursor-pointer"
        onClick={() => onOpenPanel?.('measures')}
      >
      
      {/* Narrative Summary */}
      <p className="text-sm text-gray-700 mb-3">
        This scenario delivers a balanced mix of quick wins, targeted retrofits, and renewable integration 
        to achieve 95% carbon reduction by 2050.
      </p>
      
      {/* Enhanced Composition Chart */}
      <div className="mb-4">
        <div className="flex w-full h-8 rounded-lg overflow-hidden shadow-sm border border-gray-200 mb-2">
          <div className="bg-blue-500 flex-shrink-0 flex items-center justify-center" style={{width: '10%'}} title="Optimisation">
            <span className="text-white text-xs font-medium">10%</span>
          </div>
          <div className="bg-amber-500 flex-shrink-0 flex items-center justify-center" style={{width: '35%'}} title="Light Retrofit">
            <span className="text-white text-xs font-medium">35%</span>
          </div>
          <div className="bg-purple-600 flex-shrink-0 flex items-center justify-center" style={{width: '45%'}} title="Deep Retrofit">
            <span className="text-white text-xs font-medium">45%</span>
          </div>
          <div className="flex-shrink-0 flex items-center justify-center" style={{width: '10%', backgroundColor: '#10b981'}} title="Renewables">
            <span className="text-white text-xs font-medium">10%</span>
          </div>
        </div>
        
        {/* Chart Labels */}
        <div className="flex justify-between text-xs text-gray-500 mb-3">
          <span>Optimisation</span>
          <span>Light Retrofit</span>
          <span>Deep Retrofit</span>
          <span>Renewables</span>
        </div>
      </div>
      
      {/* Category Breakdown Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-gray-600 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-sm"></div> 
          <span>Optimisation (10%) — BMS & controls</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-amber-500 rounded-sm"></div> 
          <span>Light Retrofit (35%) — lighting & glazing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-600 rounded-sm"></div> 
          <span>Deep Retrofit (45%) — heat pumps, envelope</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{backgroundColor: '#10b981'}}></div> 
          <span>Renewables (10%) — rooftop PV</span>
        </div>
      </div>
      
      <p className="text-xs text-gray-500">
        6 measures — 2 deep, 2 light, 2 optimisation covering envelope, plant, and controls.
      </p>
      </section>
    </div>
  );
}

// Impact Snapshot Section
function ImpactSnapshotSection({ onOpenPanel }: { onOpenPanel?: (panelType: string) => void }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700">Impact Snapshot</h3>
          <p className="text-xs text-gray-500">Environmental and performance metrics</p>
        </div>
        <div className="text-sm text-[#F97316] font-medium">See more →</div>
      </div>
      <section 
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-[#F97316] transition-all cursor-pointer"
        onClick={() => onOpenPanel?.('performance')}
      >

      {/* Metrics Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">⚡ Energy Reduction</p>
          <p className="text-lg font-semibold text-green-600">58%</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">🌿 Carbon Reduction</p>
          <p className="text-lg font-semibold text-green-600">95%</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">🏢 Rent Protected</p>
          <p className="text-lg font-semibold text-green-600">£1.3M</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">🎯 CRREM Aligned Until</p>
          <p className="text-lg font-semibold text-green-600">2050+</p>
        </div>
      </div>

      {/* Two Side-by-Side Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <CrremTrajectoryChart data={crremTrajectoryData} />
        </div>
        <div>
          <EnergyWaterfallChart data={energyWaterfallData} />
        </div>
      </div>
      
      {/* CTA under charts */}
      <div className="mt-4 text-center">
        <button 
          onClick={() => onOpenPanel?.('performance')}
          className="text-xs text-[#F97316] hover:text-orange-600 font-medium transition-colors"
        >
          Explore detailed performance analysis →
        </button>
      </div>
      </section>
    </div>
  );
}

// Financial Highlights Section
function FinancialHighlightsSection({ onOpenPanel }: { onOpenPanel?: (panelType: string) => void }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700">Financial Highlights</h3>
          <p className="text-xs text-gray-500">Secondary financial metrics</p>
        </div>
        <div className="text-sm text-[#F97316] font-medium">See more →</div>
      </div>
      <section 
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-[#F97316] transition-all cursor-pointer"
        onClick={() => onOpenPanel?.('finance')}
      >
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">ROI (25y)</p>
          <p className="text-lg font-semibold text-green-600">+12.3%</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">NPV @6%</p>
          <p className="text-lg font-semibold text-red-600">-£0.3M</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Carbon Payback</p>
          <p className="text-lg font-semibold text-gray-700">12 years</p>
        </div>
      </div>
      </section>
    </div>
  );
}

// Timeline Overview Section
function TimelineOverviewSection({ onOpenPanel }: { onOpenPanel?: (panelType: string) => void }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700">Implementation Timeline</h3>
          <p className="text-xs text-gray-500">Compact timeline overview</p>
        </div>
        <div className="text-sm text-[#F97316] font-medium">See more →</div>
      </div>
      <section 
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-[#F97316] transition-all cursor-pointer"
        onClick={() => onOpenPanel?.('roadmap')}
      >
      
      <div className="space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div> BMS Optimisation (2025–2026)
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-amber-500 rounded-full"></div> LED Lighting (2026–2027)
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-600 rounded-full"></div> Deep Retrofit (2027–2030)
        </div>
      </div>

      <div className="mt-3 flex gap-6 text-xs text-gray-500">
        <span>🔵 Optimisation</span>
        <span>🟠 Light</span>
        <span>🟣 Deep</span>
      </div>
      </section>
    </div>
  );
}

// Business Case Insight
function BusinessCaseInsight() {
  return (
    <div className="mb-8">
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all">
      <div className="bg-blue-50 border-l-4 border-[#F97316] rounded-lg p-4">
        <p className="text-sm text-[#1A1A1A]">
          <span className="font-semibold">Business Case Summary:</span> 
          Deep retrofit scenario achieves <span className="font-semibold text-green-600">95% carbon reduction</span> 
          and safeguards <span className="font-semibold">£1.3M rent at risk by 2027</span>. 
          Neutral NPV at 6%, positive ROI at 3% discount rate.
        </p>
      </div>
      </section>
    </div>
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
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const openPanel = (panelType: string) => {
    setActivePanel(panelType);
  };

  const closePanel = () => {
    setActivePanel(null);
  };

  return (
      <div className="min-h-screen bg-[#FAFAFA] pb-20">
        <ScenarioHeader scenarioName={scenarioName} onBack={onBack} onOpenPanel={openPanel} />
        
        <main className="max-w-7xl mx-auto px-8 py-16 bg-[#FAFAFA] overflow-y-auto pb-40">
          <ScenarioSummaryBanner />
          <SummaryKPIsSection onOpenPanel={() => openPanel('finance')} />
          <RetrofitCompositionSection onOpenPanel={() => openPanel('measures')} />
          <ImpactSnapshotSection onOpenPanel={() => openPanel('performance')} />
          <FinancialHighlightsSection onOpenPanel={() => openPanel('finance')} />
          <TimelineOverviewSection onOpenPanel={() => openPanel('roadmap')} />
          <BusinessCaseInsight />
        </main>
        
        <FooterActionsBar />

        {/* Detail Panels */}
        <DetailPanel
          isOpen={activePanel === 'finance'}
          onClose={closePanel}
          title="Financial Analysis"
          children={<FinancePanelContent scenarioName={scenarioName} />}
        />

        <DetailPanel
          isOpen={activePanel === 'measures'}
          onClose={closePanel}
          title="Intervention Measures"
          children={<MeasuresPanelContent />}
        />

        <DetailPanel
          isOpen={activePanel === 'performance'}
          onClose={closePanel}
          title="Performance & Benchmark Details"
          children={<PerformancePanelContent />}
        />

        <DetailPanel
          isOpen={activePanel === 'roadmap'}
          onClose={closePanel}
          title="Implementation Roadmap"
          children={<RoadmapPanelContent />}
        />
      </div>
    );
}
