import React, { useState } from 'react';
import { ArrowLeft, Download, Share2, ChevronDown, Plus, BarChart3, TrendingUp, Building2, Clock, Zap, Leaf, CheckCircle, PoundSterling } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { FinancePanel, PerformancePanel, MeasuresPanel, RoadmapPanel } from '../scenario-panels';

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
        </div>
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
      
      {/* Horizontal segmented bar */}
      <div className="flex w-full h-6 rounded overflow-hidden mb-3">
        <div className="bg-blue-500 w-[10%]" title="Optimisation"></div>
        <div className="bg-amber-500 w-[35%]" title="Light Retrofit"></div>
        <div className="bg-purple-600 w-[45%]" title="Deep Retrofit"></div>
        <div className="bg-green-500 w-[10%]" title="Renewables"></div>
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

      {/* Two Side-by-Side Chart Placeholders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-[220px] bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
          CRREM Trajectory Chart <br /> (coming in detailed view)
        </div>
        <div className="h-[220px] bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
          Energy Waterfall Chart <br /> (Baseline → Post Retrofit)
        </div>
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
        <SummaryKPIsSection onOpenPanel={() => openPanel('finance')} />
        <RetrofitCompositionSection onOpenPanel={() => openPanel('measures')} />
        <ImpactSnapshotSection onOpenPanel={() => openPanel('performance')} />
        <FinancialHighlightsSection onOpenPanel={() => openPanel('finance')} />
        <TimelineOverviewSection onOpenPanel={() => openPanel('roadmap')} />
        <BusinessCaseInsight />
      </main>
      
      <FooterActionsBar />

      {/* Side Panels */}
      <FinancePanel open={activePanel === 'finance'} onClose={closePanel} />
      <PerformancePanel open={activePanel === 'performance'} onClose={closePanel} />
      <MeasuresPanel open={activePanel === 'measures'} onClose={closePanel} />
      <RoadmapPanel open={activePanel === 'roadmap'} onClose={closePanel} />
    </div>
  );
}
