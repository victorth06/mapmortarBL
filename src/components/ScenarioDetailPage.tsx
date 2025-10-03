import { useState } from 'react';
import { ArrowLeft, Download, Share2, Filter, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ScatterChart, Scatter, ZAxis } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface ScenarioDetailPageProps {
  scenarioName: string;
  onBack: () => void;
}

// Mock data for charts
const energyPathwayData = [
  { year: 2024, baseline: 260, scenario: 260, crrem: 220 },
  { year: 2025, baseline: 258, scenario: 245, crrem: 210 },
  { year: 2026, baseline: 256, scenario: 230, crrem: 200 },
  { year: 2027, baseline: 254, scenario: 168, crrem: 190 },
  { year: 2028, baseline: 252, scenario: 166, crrem: 185 },
  { year: 2029, baseline: 250, scenario: 164, crrem: 180 },
  { year: 2030, baseline: 248, scenario: 162, crrem: 175 },
  { year: 2035, baseline: 240, scenario: 155, crrem: 155 },
  { year: 2040, baseline: 232, scenario: 148, crrem: 135 },
  { year: 2045, baseline: 224, scenario: 142, crrem: 125 },
  { year: 2050, baseline: 216, scenario: 138, crrem: 123 },
];

const carbonPathwayData = [
  { year: 2024, baseline: 72, scenario: 72, crrem: 62 },
  { year: 2025, baseline: 71, scenario: 68, crrem: 58 },
  { year: 2026, baseline: 70, scenario: 64, crrem: 54 },
  { year: 2027, baseline: 69, scenario: 36, crrem: 50 },
  { year: 2028, baseline: 68, scenario: 34, crrem: 46 },
  { year: 2029, baseline: 67, scenario: 32, crrem: 42 },
  { year: 2030, baseline: 66, scenario: 30, crrem: 38 },
  { year: 2035, baseline: 62, scenario: 24, crrem: 28 },
  { year: 2040, baseline: 58, scenario: 18, crrem: 20 },
  { year: 2045, baseline: 54, scenario: 12, crrem: 15 },
  { year: 2050, baseline: 50, scenario: 8, crrem: 12 },
];

const cashflowData = [
  { year: 2024, bau: 0, scenario: 0 },
  { year: 2025, bau: 0, scenario: -2000 },
  { year: 2026, bau: 0, scenario: -4500 },
  { year: 2027, bau: 0, scenario: -6058 },
  { year: 2028, bau: 0, scenario: -5916 },
  { year: 2029, bau: 0, scenario: -5774 },
  { year: 2030, bau: 0, scenario: -5490 },
  { year: 2031, bau: 0, scenario: -5348 },
  { year: 2032, bau: 0, scenario: -5064 },
  { year: 2033, bau: 0, scenario: -4780 },
  { year: 2034, bau: 0, scenario: -4496 },
  { year: 2035, bau: 0, scenario: -4070 },
  { year: 2040, bau: 0, scenario: -1640 },
  { year: 2045, bau: 0, scenario: 1210 },
];

const interventionBubbleData = [
  { name: 'Double Glazing', capex: 2622, roi: 2, carbon: 73, x: 2622, y: 2, z: 400 },
  { name: 'Low Energy Lighting', capex: 681, roi: 15, carbon: 61, x: 681, y: 15, z: 300 },
  { name: 'Heat Pump', capex: 890, roi: 8, carbon: 95, x: 890, y: 8, z: 500 },
  { name: 'Solar PV', capex: 450, roi: 12, carbon: 45, x: 450, y: 12, z: 250 },
  { name: 'BMS Upgrade', capex: 120, roi: 22, carbon: 28, x: 120, y: 22, z: 150 },
  { name: 'Thermostat', capex: 0, roi: 999, carbon: 124, x: 10, y: 50, z: 200 },
];

const interventionTableData = [
  {
    strategy: 'Deep Retrofit',
    initiative: 'Replace Windows (Double Glazing)',
    capex: 2622600,
    electricitySaving: 77818,
    gasSaving: 485430,
    costSaving: 15205,
    co2Saved: 72721,
    payback: '>20'
  },
  {
    strategy: 'Light Retrofit',
    initiative: 'Low Energy Lighting',
    capex: 681410,
    electricitySaving: 450090,
    gasSaving: -175160,
    costSaving: 102620,
    co2Saved: 61137,
    payback: '7'
  },
  {
    strategy: 'Optimisation',
    initiative: 'Adjust Thermostat Setpoints',
    capex: 0,
    electricitySaving: 198690,
    gasSaving: 450770,
    costSaving: 83527,
    co2Saved: 123630,
    payback: 'Immediate'
  },
  {
    strategy: 'Deep Retrofit',
    initiative: 'Air Source Heat Pump',
    capex: 890000,
    electricitySaving: -120000,
    gasSaving: 680000,
    costSaving: 48000,
    co2Saved: 95000,
    payback: '18'
  },
  {
    strategy: 'Light Retrofit',
    initiative: 'Solar PV Installation',
    capex: 450000,
    electricitySaving: 280000,
    gasSaving: 0,
    costSaving: 38000,
    co2Saved: 45000,
    payback: '12'
  },
  {
    strategy: 'Optimisation',
    initiative: 'BMS System Upgrade',
    capex: 120000,
    electricitySaving: 180000,
    gasSaving: 95000,
    costSaving: 35000,
    co2Saved: 28000,
    payback: '3.5'
  },
];

// Gantt chart data for roadmap
const roadmapData = [
  { intervention: 'Thermostat Setpoints', start: 2025, end: 2025, strategy: 'Optimisation' },
  { intervention: 'BMS Upgrade', start: 2026, end: 2026, strategy: 'Optimisation' },
  { intervention: 'LED Lighting', start: 2026, end: 2027, strategy: 'Light Retrofit' },
  { intervention: 'Solar PV', start: 2027, end: 2028, strategy: 'Light Retrofit' },
  { intervention: 'Double Glazing', start: 2028, end: 2029, strategy: 'Deep Retrofit' },
  { intervention: 'Heat Pump', start: 2029, end: 2030, strategy: 'Deep Retrofit' },
];

const milestones = [
  { year: 2027, label: 'MEES EPC C', color: 'amber' },
  { year: 2028, label: '70% Leases End', color: 'blue' },
  { year: 2030, label: 'Boiler EoL', color: 'purple' },
];

export function ScenarioDetailPage({ scenarioName, onBack }: ScenarioDetailPageProps) {
  const [showCRREM, setShowCRREM] = useState(true);
  const [chartView, setChartView] = useState<'energy' | 'carbon' | 'both'>('both');
  const [timelineView, setTimelineView] = useState<'building' | 'unit'>('building');

  // Scenario-specific data
  const scenarioData = scenarioName === 'EPC C by 2027' ? {
    badge: { text: 'Recommended', color: 'amber' as const },
    kpis: {
      capex: '£2.8M',
      rentProtected: '£1.2M',
      annualSavings: '£68k',
      payback: '8.5 years',
      energyReduction: '35%',
      carbonReduction: '35%',
      crremAlignedUntil: '2036'
    },
    summary: 'This scenario focuses on achieving minimum EPC C compliance by 2027. It balances investment with risk protection, securing £1.2M rental income at risk and aligning CRREM performance until 2036.',
    euiBaseline: 260,
    euiScenario: 190,
    euiCRREM: 180
  } : {
    badge: { text: 'Future-proof', color: 'green' as const },
    kpis: {
      capex: '£6.2M',
      rentProtected: '£1.3M',
      annualSavings: '£142k',
      payback: '11 years',
      energyReduction: '58%',
      carbonReduction: '95%',
      crremAlignedUntil: '2050+'
    },
    summary: 'This scenario achieves near-complete decarbonisation and future-proofs the asset beyond 2050. It includes premium measures like heat pumps, solar PV, and advanced controls, delivering maximum carbon reduction and an 8% rental uplift via ESG premium.',
    euiBaseline: 260,
    euiScenario: 168,
    euiCRREM: 123
  };

  const badgeColor = scenarioData.badge.color === 'amber' ? 'bg-amber-500' : 'bg-green-600';

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header with Back Button */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={onBack}
                className="rounded-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Opportunities
              </Button>
              <div className="h-8 w-px bg-gray-200" />
              <div className="flex items-center gap-3">
                <h1 className="text-[#1A1A1A]">{scenarioName}</h1>
                <Badge className={`${badgeColor} text-white`}>{scenarioData.badge.text}</Badge>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="rounded-full">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" className="rounded-full">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* 1. Hero KPI Block (Consistent with Opportunity Cards) */}
        <section className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
              <p className="text-xs text-[#6B7280] mb-2">CAPEX</p>
              <p className="text-[24px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>{scenarioData.kpis.capex}</p>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
              <p className="text-xs text-[#6B7280] mb-2">Rent Protected</p>
              <p className="text-[24px] text-green-600" style={{ fontWeight: 700 }}>{scenarioData.kpis.rentProtected}</p>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
              <p className="text-xs text-[#6B7280] mb-2">Annual Savings</p>
              <p className="text-[24px] text-green-600" style={{ fontWeight: 700 }}>{scenarioData.kpis.annualSavings}</p>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
              <p className="text-xs text-[#6B7280] mb-2">Payback</p>
              <p className="text-[24px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>{scenarioData.kpis.payback}</p>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
              <p className="text-xs text-[#6B7280] mb-2">Energy ↓</p>
              <p className="text-[24px] text-green-600" style={{ fontWeight: 700 }}>{scenarioData.kpis.energyReduction}</p>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
              <p className="text-xs text-[#6B7280] mb-2">Carbon ↓</p>
              <p className="text-[24px] text-green-600" style={{ fontWeight: 700 }}>{scenarioData.kpis.carbonReduction}</p>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
              <p className="text-xs text-[#6B7280] mb-2">CRREM Until</p>
              <p className="text-[24px] text-green-600" style={{ fontWeight: 700 }}>{scenarioData.kpis.crremAlignedUntil}</p>
            </div>
          </div>

          {/* Scenario Summary */}
          <div className="bg-blue-50 border-l-4 border-[#F97316] rounded-lg p-6">
            <p className="text-sm text-[#1A1A1A]">
              <span style={{ fontWeight: 600 }}>Scenario Summary: </span>
              {scenarioData.summary}
            </p>
          </div>
        </section>

        {/* 2. Performance vs Benchmarks */}
        <section className="mb-8">
          <div className="mb-4">
            <h3 className="text-[#1A1A1A] mb-1">Performance vs Benchmarks</h3>
            <p className="text-sm text-[#6B7280]">Energy and carbon trajectory compared to baseline and CRREM targets</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showCRREM}
                    onChange={(e) => setShowCRREM(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-[#6B7280]">Show CRREM trajectory</span>
                </label>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={chartView === 'energy' ? 'default' : 'outline'}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setChartView('energy')}
                >
                  Energy
                </Button>
                <Button
                  variant={chartView === 'carbon' ? 'default' : 'outline'}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setChartView('carbon')}
                >
                  Carbon
                </Button>
                <Button
                  variant={chartView === 'both' ? 'default' : 'outline'}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setChartView('both')}
                >
                  Both
                </Button>
              </div>
            </div>

            <div className={`grid grid-cols-1 ${chartView === 'both' ? 'lg:grid-cols-2' : ''} gap-6`}>
              {/* Energy Chart */}
              {(chartView === 'energy' || chartView === 'both') && (
                <div>
                  <h4 className="mb-4">Energy Use Intensity (EUI)</h4>
                  <ResponsiveContainer width="100%" height={320}>
                    <LineChart data={energyPathwayData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="year" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" label={{ value: 'kWh/m²', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="baseline" stroke="#EF4444" strokeWidth={2} name="Baseline (Do Nothing)" />
                      <Line type="monotone" dataKey="scenario" stroke="#F97316" strokeWidth={3} name="This Scenario" />
                      {showCRREM && <Line type="monotone" dataKey="crrem" stroke="#3B82F6" strokeWidth={2} strokeDasharray="5 5" name="CRREM Target" />}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Carbon Chart */}
              {(chartView === 'carbon' || chartView === 'both') && (
                <div>
                  <h4 className="mb-4">Annual Carbon Emissions</h4>
                  <ResponsiveContainer width="100%" height={320}>
                    <LineChart data={carbonPathwayData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="year" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" label={{ value: 'kgCO₂e/m²', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="baseline" stroke="#EF4444" strokeWidth={2} name="Baseline (Do Nothing)" />
                      <Line type="monotone" dataKey="scenario" stroke="#22C55E" strokeWidth={3} name="This Scenario" />
                      {showCRREM && <Line type="monotone" dataKey="crrem" stroke="#3B82F6" strokeWidth={2} strokeDasharray="5 5" name="CRREM Target" />}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Commentary */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-[#6B7280]">
                <span style={{ fontWeight: 600 }}>Insight: </span>
                This shows how the scenario reduces energy use and emissions relative to baseline. The dotted line represents CRREM's decarbonisation pathway, with this scenario aligned until {scenarioData.kpis.crremAlignedUntil}. 
                Baseline EUI: {scenarioData.euiBaseline} kWh/m² → Scenario: {scenarioData.euiScenario} kWh/m² (CRREM 2030: {scenarioData.euiCRREM} kWh/m²).
              </p>
            </div>
          </div>
        </section>

        {/* 3. Roadmap & Cashflow Impact */}
        <section className="mb-8">
          <div className="mb-4">
            <h3 className="text-[#1A1A1A] mb-1">Retrofit Roadmap & Cashflow Impact</h3>
            <p className="text-sm text-[#6B7280]">Implementation timeline aligned with asset events and financial projections</p>
          </div>

          {/* A. Implementation Timeline (Gantt) */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-[#1A1A1A]">Implementation Timeline</h4>
              <div className="flex gap-2">
                <Button
                  variant={timelineView === 'building' ? 'default' : 'outline'}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setTimelineView('building')}
                >
                  Whole Building
                </Button>
                <Button
                  variant={timelineView === 'unit' ? 'default' : 'outline'}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setTimelineView('unit')}
                >
                  Per Unit
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Milestone
                </Button>
              </div>
            </div>

            {/* Gantt Chart */}
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Year Headers */}
                <div className="flex border-b border-gray-200 pb-2 mb-4">
                  <div className="w-48"></div>
                  {[2025, 2026, 2027, 2028, 2029, 2030].map(year => (
                    <div key={year} className="flex-1 text-center text-sm text-[#6B7280]" style={{ fontWeight: 600 }}>
                      {year}
                    </div>
                  ))}
                </div>

                {/* Intervention Rows */}
                {roadmapData.map((item, idx) => {
                  const strategyColors = {
                    'Optimisation': 'bg-blue-500',
                    'Light Retrofit': 'bg-amber-500',
                    'Deep Retrofit': 'bg-purple-600'
                  };
                  const startOffset = ((item.start - 2025) / 6) * 100;
                  const width = ((item.end - item.start + 1) / 6) * 100;
                  
                  return (
                    <div key={idx} className="flex items-center mb-3">
                      <div className="w-48 pr-4">
                        <p className="text-sm text-[#1A1A1A]" style={{ fontWeight: 600 }}>{item.intervention}</p>
                        <p className="text-xs text-[#6B7280]">{item.strategy}</p>
                      </div>
                      <div className="flex-1 relative h-8">
                        <div 
                          className={`absolute top-1 ${strategyColors[item.strategy as keyof typeof strategyColors]} rounded h-6 flex items-center justify-center text-white text-xs`}
                          style={{ 
                            left: `${startOffset}%`, 
                            width: `${width}%`,
                            minWidth: '60px'
                          }}
                        >
                          {item.start}-{item.end}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Milestones */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <p className="text-sm text-[#6B7280] mb-3" style={{ fontWeight: 600 }}>Key Milestones:</p>
                  <div className="flex">
                    <div className="w-48"></div>
                    <div className="flex-1 relative">
                      {milestones.map((milestone, idx) => {
                        const offset = ((milestone.year - 2025) / 6) * 100;
                        const colors = {
                          amber: 'border-amber-500 bg-amber-50 text-amber-700',
                          blue: 'border-blue-500 bg-blue-50 text-blue-700',
                          purple: 'border-purple-500 bg-purple-50 text-purple-700'
                        };
                        return (
                          <div 
                            key={idx}
                            className={`absolute bottom-0 border-2 ${colors[milestone.color as keyof typeof colors]} rounded px-2 py-1 text-xs`}
                            style={{ left: `${offset}%`, transform: 'translateX(-50%)' }}
                          >
                            {milestone.label}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-6 flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-[#6B7280]">Optimisation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-amber-500 rounded"></div>
                <span className="text-[#6B7280]">Light Retrofit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-600 rounded"></div>
                <span className="text-[#6B7280]">Deep Retrofit</span>
              </div>
            </div>
          </div>

          {/* B. Financial Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cumulative Cashflow */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h4 className="mb-4">Cumulative Cashflow (BAU vs Scenario)</h4>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={cashflowData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="year" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" label={{ value: '£k', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="bau" stroke="#6B7280" fill="#E5E7EB" name="BAU (Do Nothing)" />
                  <Area type="monotone" dataKey="scenario" stroke="#F97316" fill="#FED7AA" name="This Scenario" />
                </AreaChart>
              </ResponsiveContainer>
              <p className="text-xs text-[#6B7280] mt-3">
                Payback point: Year 11 (break-even at {scenarioData.kpis.payback})
              </p>
            </div>

            {/* CAPEX vs ROI Bubble */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h4 className="mb-4">CAPEX vs ROI by Intervention</h4>
              <ResponsiveContainer width="100%" height={280}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    type="number" 
                    dataKey="x" 
                    name="CAPEX" 
                    unit="k" 
                    stroke="#6B7280" 
                    label={{ value: 'CAPEX (£k)', position: 'insideBottom', offset: -5 }} 
                  />
                  <YAxis 
                    type="number" 
                    dataKey="y" 
                    name="ROI" 
                    unit="%" 
                    stroke="#6B7280" 
                    label={{ value: 'ROI (%)', angle: -90, position: 'insideLeft' }} 
                  />
                  <ZAxis type="number" dataKey="z" range={[100, 1000]} name="CO₂ Saved" unit="t" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Legend />
                  <Scatter name="Interventions" data={interventionBubbleData} fill="#F97316" />
                </ScatterChart>
              </ResponsiveContainer>
              <p className="text-xs text-[#6B7280] mt-3">
                Bubble size = CO₂ saved. Larger bubbles indicate greater carbon impact.
              </p>
            </div>
          </div>

          {/* Commentary */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-[#6B7280]">
              <span style={{ fontWeight: 600 }}>Insight: </span>
              These visuals highlight the balance between upfront investment and return. Aligning interventions with tenant and asset events (70% of leases ending 2028, boiler end-of-life 2030) reduces disruption and maximises rental protection.
            </p>
          </div>
        </section>

        {/* 4. Intervention Breakdown */}
        <section className="mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-[#1A1A1A] mb-1">Retrofit Measures in this Scenario</h3>
                <p className="text-sm text-[#6B7280]">Detailed breakdown of interventions, costs, and savings</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-full">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter by Strategy
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter by Tenant/Unit
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto mb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Strategy</TableHead>
                    <TableHead>Initiative</TableHead>
                    <TableHead className="text-right">CAPEX (£)</TableHead>
                    <TableHead className="text-right">Electricity Saving (kWh)</TableHead>
                    <TableHead className="text-right">Gas Saving (kWh)</TableHead>
                    <TableHead className="text-right">Cost Saving (£)</TableHead>
                    <TableHead className="text-right">CO₂ Saved (kg)</TableHead>
                    <TableHead className="text-right">Payback (yrs)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {interventionTableData.map((row, idx) => (
                    <TableRow key={idx} className="hover:bg-gray-50">
                      <TableCell>
                        <Badge 
                          variant={
                            row.strategy === 'Deep Retrofit' ? 'default' : 
                            row.strategy === 'Light Retrofit' ? 'secondary' : 
                            'outline'
                          }
                          className={
                            row.strategy === 'Deep Retrofit' ? 'bg-purple-600 text-white' :
                            row.strategy === 'Light Retrofit' ? 'bg-amber-500 text-white' :
                            'bg-blue-500 text-white'
                          }
                        >
                          {row.strategy}
                        </Badge>
                      </TableCell>
                      <TableCell style={{ fontWeight: 600 }}>{row.initiative}</TableCell>
                      <TableCell className="text-right">{row.capex.toLocaleString()}</TableCell>
                      <TableCell className={`text-right ${row.electricitySaving < 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {row.electricitySaving.toLocaleString()}
                      </TableCell>
                      <TableCell className={`text-right ${row.gasSaving < 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {row.gasSaving.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right text-green-600" style={{ fontWeight: 600 }}>
                        {row.costSaving.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right text-green-600">
                        {row.co2Saved.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right" style={{ fontWeight: 600 }}>
                        {row.payback}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Summary Cards - Same style as Hero KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-orange-50 border border-[#F97316] rounded-lg">
              <div>
                <p className="text-xs text-[#6B7280] mb-2">Total CAPEX</p>
                <p className="text-[24px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>{scenarioData.kpis.capex}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] mb-2">Total Annual Savings</p>
                <p className="text-[24px] text-green-600" style={{ fontWeight: 700 }}>{scenarioData.kpis.annualSavings}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] mb-2">Average Payback</p>
                <p className="text-[24px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>{scenarioData.kpis.payback}</p>
              </div>
              <div>
                <p className="text-xs text-[#6B7280] mb-2">Total CO₂ Reduction</p>
                <p className="text-[24px] text-green-600" style={{ fontWeight: 700 }}>{scenarioData.kpis.carbonReduction}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Footer Actions */}
        <section>
          <div className="flex flex-wrap justify-end gap-3">
            <Button variant="outline" className="rounded-full">
              <Download className="w-4 h-4 mr-2" />
              Export to Excel
            </Button>
            <Button variant="outline" className="rounded-full">
              Edit Scenario
            </Button>
            <Button className="rounded-full bg-[#F97316] text-white hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              Add to Portfolio Plan
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}