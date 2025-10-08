import React, { useState } from 'react';
import { ArrowLeft, Download, Share2, ChevronDown, Plus, BarChart3, TrendingUp, Building2, Clock, Zap, Leaf, CheckCircle, PoundSterling } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { DetailPanel } from '../panels/DetailPanel';
import { CrremTrajectoryChart, EnergyWaterfallChart, OpexBreakdownChart, CashflowChart, CapexVsRoiChart } from '../charts';
import { crremTrajectoryData, energyWaterfallData } from '../../data/mockChartData';

// Panel Content Components
function FinancePanelContent({ scenarioName }: { scenarioName: string }) {
  const [isFinancialInputsCollapsed, setIsFinancialInputsCollapsed] = useState(true);
  const [comparisonScenario, setComparisonScenario] = useState('EPC C');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-1">
          Financial Analysis — {scenarioName}
        </h3>
        <p className="text-sm text-blue-700">
          Explore detailed financial metrics, OpEx breakdowns, cashflow projections, and scenario comparison tools.
        </p>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: "Total CAPEX", value: "£6.2M" },
          { label: "Annual Savings", value: "£142k/year", color: "text-green-600" },
          { label: "Simple Payback", value: "11 years" },
          { label: "ROI (25y)", value: "+12.3%", color: "text-green-600" },
          { label: "NPV @6%", value: "–£0.3M", color: "text-red-600" },
          { label: "Carbon Payback", value: "12 years" },
        ].map((item) => (
          <div key={item.label} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">{item.label}</p>
            <p className={`text-xl font-bold ${item.color || "text-gray-700"}`}>{item.value}</p>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-500 italic">
        Breakeven reached in 2038 under current assumptions (6% discount rate, £142k annual savings).
      </p>

      {/* Financial Parameters */}
      <div className="border border-gray-200 rounded-lg p-4">
        <button
          className="flex justify-between items-center w-full text-sm font-medium text-gray-700 mb-1"
          onClick={() => setIsFinancialInputsCollapsed(!isFinancialInputsCollapsed)}
        >
          Financial Parameters
          <ChevronDown 
            className={`w-4 h-4 transform transition-transform ${
              isFinancialInputsCollapsed ? 'rotate-0' : 'rotate-180'
            }`} 
          />
        </button>
        <p className="text-xs text-gray-500 italic mb-3">Click to adjust financial parameters</p>
        
        {/* Sensitivity Insights - Always Visible */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <h5 className="text-xs font-medium text-gray-700 mb-2">Sensitivity Insights</h5>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Lower discount rate (6 → 5%) improves NPV by <span className="font-semibold text-green-600">+£0.4M</span></li>
            <li>• +2% energy inflation raises annual savings by <span className="font-semibold text-green-600">£0.3M</span></li>
            <li>• 2-year CAPEX delay reduces ROI by <span className="font-semibold text-red-600">–£0.2M</span></li>
          </ul>
        </div>

        {!isFinancialInputsCollapsed && (
          <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
            <label>
              <span className="block mb-1 font-medium">Baseline Rent (£/m²)</span>
              <input type="number" className="w-full rounded border-gray-300" placeholder="Enter value" />
            </label>
            <label>
              <span className="block mb-1 font-medium">Rent Growth (%/yr)</span>
              <input type="number" className="w-full rounded border-gray-300" placeholder="2.0" />
            </label>
            <label>
              <span className="block mb-1 font-medium">Baseline OPEX (£/m²)</span>
              <input type="number" className="w-full rounded border-gray-300" placeholder="Enter value" />
            </label>
            <label>
              <span className="block mb-1 font-medium">Energy Escalation (%/yr)</span>
              <input type="number" className="w-full rounded border-gray-300" placeholder="3.0" />
            </label>
            <label>
              <span className="block mb-1 font-medium">Discount Rate (%)</span>
              <input type="range" min="0" max="10" step="0.5" className="w-full" />
            </label>
            <label>
              <span className="block mb-1 font-medium">Study Period (years)</span>
              <select className="w-full rounded border-gray-300">
                <option>10</option>
                <option>20</option>
                <option selected>25</option>
              </select>
            </label>
          </div>
        )}
        {!isFinancialInputsCollapsed && (
          <Button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white text-xs px-4 py-2 rounded-full">
            Recalculate
          </Button>
        )}
      </div>

      {/* OPEX Breakdown Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Operational Cost Breakdown</h4>
        <OpexBreakdownChart />
        <p className="text-xs text-gray-500 mt-3">
          Energy savings reduce total OPEX by <span className="font-semibold text-green-600">22%</span>,
          improving NOI by <span className="font-semibold">£120k/year</span>.
        </p>
      </div>

      {/* Cashflow Analysis Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Cashflow Analysis Over Time</h4>
        <CashflowChart />
        <p className="text-xs text-gray-500 mt-3">
          Breakeven achieved in <span className="font-semibold">2038</span>. Cumulative cashflow turns positive from that year onward.
        </p>
      </div>

      {/* CAPEX vs ROI Prioritisation Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">CAPEX vs ROI Prioritisation</h4>
        <p className="text-xs text-gray-500 mb-3">
          Prioritise interventions by ROI and carbon impact. Bubble size represents carbon savings (tCO₂).
        </p>
        
        <CapexVsRoiChart 
          onSelect={(id) => {
            // Future: Open intervention details panel
            console.log('Selected intervention:', id);
          }} 
        />
        
        <p className="text-xs text-gray-500 mt-3">
          Click any bubble to open detailed intervention timeline and cost breakdown.
        </p>
      </div>

      {/* Scenario Comparison Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Scenario Comparison</h4>
        <p className="text-xs text-gray-500 mb-3">
          Compare key financial metrics of {scenarioName} against another scenario.
        </p>
        
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-sm text-gray-600">Compare with:</span>
          <Select value={comparisonScenario} onValueChange={setComparisonScenario}>
            <SelectTrigger className="w-[140px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EPC C">EPC C</SelectItem>
              <SelectItem value="Do Nothing">Do Nothing</SelectItem>
              <SelectItem value="Net Zero 2050">Net Zero 2050</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-gray-500 uppercase tracking-wider">Metric</th>
                <th className="px-4 py-2 text-left text-gray-500 uppercase tracking-wider">{scenarioName}</th>
                <th className="px-4 py-2 text-left text-gray-500 uppercase tracking-wider">{comparisonScenario}</th>
                <th className="px-4 py-2 text-left text-gray-500 uppercase tracking-wider">Difference</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2 font-medium text-gray-700">Total CAPEX</td>
                <td className="px-4 py-2">£6.2M</td>
                <td className="px-4 py-2">
                  {comparisonScenario === 'EPC C' ? '£3.2M' : 
                   comparisonScenario === 'Do Nothing' ? '£0M' : '£6.2M'}
                </td>
                <td className="px-4 py-2">
                  {comparisonScenario === 'EPC C' ? 
                    <span className="text-red-600">-£3.0M</span> :
                   comparisonScenario === 'Do Nothing' ? 
                    <span className="text-red-600">-£6.2M</span> :
                    <span className="text-gray-500">£0M</span>}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-gray-700">Annual Savings</td>
                <td className="px-4 py-2">£142k</td>
                <td className="px-4 py-2">
                  {comparisonScenario === 'EPC C' ? '£85k' : 
                   comparisonScenario === 'Do Nothing' ? '£0k' : '£142k'}
                </td>
                <td className="px-4 py-2">
                  {comparisonScenario === 'EPC C' ? 
                    <span className="text-green-600">+£57k</span> :
                   comparisonScenario === 'Do Nothing' ? 
                    <span className="text-green-600">+£142k</span> :
                    <span className="text-gray-500">£0k</span>}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-gray-700">ROI (25y)</td>
                <td className="px-4 py-2 text-green-600">+12.3%</td>
                <td className="px-4 py-2">
                  {comparisonScenario === 'EPC C' ? 
                    <span className="text-green-600">+8.4%</span> :
                   comparisonScenario === 'Do Nothing' ? 
                    <span className="text-gray-500">0%</span> :
                    <span className="text-green-600">+12.3%</span>}
                </td>
                <td className="px-4 py-2">
                  {comparisonScenario === 'EPC C' ? 
                    <span className="text-green-600">+3.9%</span> :
                   comparisonScenario === 'Do Nothing' ? 
                    <span className="text-green-600">+12.3%</span> :
                    <span className="text-gray-500">0%</span>}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-gray-700">NPV @6%</td>
                <td className="px-4 py-2 text-red-600">-£0.3M</td>
                <td className="px-4 py-2">
                  {comparisonScenario === 'EPC C' ? 
                    <span className="text-red-600">-£0.5M</span> :
                   comparisonScenario === 'Do Nothing' ? 
                    <span className="text-gray-500">£0M</span> :
                    <span className="text-red-600">-£0.3M</span>}
                </td>
                <td className="px-4 py-2">
                  {comparisonScenario === 'EPC C' ? 
                    <span className="text-green-600">+£0.2M</span> :
                   comparisonScenario === 'Do Nothing' ? 
                    <span className="text-red-600">-£0.3M</span> :
                    <span className="text-gray-500">£0M</span>}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-gray-700">CRREM Aligned Until</td>
                <td className="px-4 py-2">2050+</td>
                <td className="px-4 py-2">
                  {comparisonScenario === 'EPC C' ? '2033' : 
                   comparisonScenario === 'Do Nothing' ? '2029' : '2050+'}
                </td>
                <td className="px-4 py-2">
                  {comparisonScenario === 'EPC C' ? 
                    <span className="text-green-600">+17 years</span> :
                   comparisonScenario === 'Do Nothing' ? 
                    <span className="text-green-600">+21 years</span> :
                    <span className="text-gray-500">0 years</span>}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-500 mt-3">
          {comparisonScenario === 'EPC C' ? 
            `${scenarioName} delivers higher carbon savings and long-term compliance compared to EPC C, but requires higher upfront CAPEX.` :
           comparisonScenario === 'Do Nothing' ? 
            `${scenarioName} significantly improves all metrics compared to doing nothing, with substantial long-term benefits.` :
            `Comparing ${scenarioName} with itself shows identical metrics.`}
        </p>
      </div>


      {/* Footer Actions */}
      <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
        <Button variant="outline" size="sm" className="rounded-full">Reset to Defaults</Button>
        <Button variant="outline" size="sm" className="rounded-full">Export to Excel</Button>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full">Apply Changes</Button>
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

        {/* Row 3: Orange Banner Summary */}
        <div className="bg-orange-50 border-l-4 border-[#F97316] rounded-r-xl p-4">
          <p className="text-sm text-gray-800">
            <span className="font-semibold">Net Zero 2050:</span> 
            This deep retrofit pathway aligns the building with CRREM 1.5°C targets, 
            eliminating 95% of operational carbon and protecting £1.3M of rental value by 2027.
          </p>
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
        className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg hover:border-[#F97316] border-2 border-transparent transition-all cursor-pointer"
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
      
      {/* Financial Highlights Cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
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
        className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg hover:border-[#F97316] border-2 border-transparent transition-all cursor-pointer"
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
        className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg hover:border-[#F97316] border-2 border-transparent transition-all cursor-pointer"
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
        className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg hover:border-[#F97316] border-2 border-transparent transition-all cursor-pointer"
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
      <div className="min-h-screen bg-[#FAFAFA]">
        <ScenarioHeader scenarioName={scenarioName} onBack={onBack} onOpenPanel={openPanel} />
        
        <main className="max-w-7xl mx-auto px-8 py-8 bg-[#FAFAFA]">
          <SummaryKPIsSection onOpenPanel={() => openPanel('finance')} />
          <RetrofitCompositionSection onOpenPanel={() => openPanel('measures')} />
          <ImpactSnapshotSection onOpenPanel={() => openPanel('performance')} />
          <TimelineOverviewSection onOpenPanel={() => openPanel('roadmap')} />
          
          {/* Footer Actions - Regular Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex justify-end gap-3">
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
        </main>

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
