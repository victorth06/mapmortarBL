import React, { useEffect, useState } from 'react';
import { ArrowLeft, Download, Share2, Filter, Plus, TrendingUp, DollarSign, HelpCircle, Clock, Zap, PoundSterling, Building2, CheckCircle, Leaf, List } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, Legend, ResponsiveContainer, AreaChart, Area, ScatterChart, Scatter, ZAxis, ComposedChart, Bar, PieChart, Pie, BarChart } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Slider } from '../ui/slider';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';
import { Drawer, DrawerContent } from '../ui/drawer';
import { supabase } from '../../utils/supabase/queries';

interface ScenarioDetailPageProps {
  scenarioName: string;
  onBack: () => void;
}

// Summary Card Component
interface SummaryCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  description: string;
  onClick: () => void;
}

function SummaryCard({ icon: Icon, label, value, description, onClick }: SummaryCardProps) {
  return (
    <div 
      className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:border-[#F97316] transition cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-[#F97316]" />
        <p className="text-xs text-gray-500">{label}</p>
      </div>
      <p className="text-xl font-semibold text-[#1A1A1A]">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </div>
  );
}

// Financial KPI Card with Tooltip
interface FinancialKPICardProps {
  label: string;
  value: string;
  subtitle: string;
  tooltip: string;
  valueColor?: string;
}

function FinancialKPICard({ label, value, subtitle, tooltip, valueColor = 'text-[#1A1A1A]' }: FinancialKPICardProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 hover:border-[#F97316] transition-colors cursor-help">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xs text-[#6B7280]">{label}</p>
            <HelpCircle className="w-3 h-3 text-[#9CA3AF]" />
          </div>
          <p className={`text-[24px] ${valueColor}`} style={{ fontWeight: 700 }}>{value}</p>
          <p className="text-xs text-[#6B7280] mt-1">{subtitle}</p>
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs">
        <p className="text-xs">{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}

// Mock data for charts (kept for now; can be moved to DB later)
const energyPathwayData = [
  { year: 2024, baseline: 260, scenario: 260, crrem: 220 },
  { year: 2025, baseline: 258, scenario: 245, crrem: 210 },
  { year: 2026, baseline: 256, scenario: 230, crrem: 200 },
  { year: 2027, baseline: 254, scenario: 215, crrem: 190 },
  { year: 2028, baseline: 252, scenario: 200, crrem: 180 },
  { year: 2029, baseline: 250, scenario: 185, crrem: 170 },
  { year: 2030, baseline: 248, scenario: 170, crrem: 160 },
  { year: 2031, baseline: 246, scenario: 165, crrem: 150 },
  { year: 2032, baseline: 244, scenario: 160, crrem: 140 },
  { year: 2033, baseline: 242, scenario: 155, crrem: 130 },
  { year: 2034, baseline: 240, scenario: 150, crrem: 120 },
  { year: 2035, baseline: 238, scenario: 145, crrem: 110 },
  { year: 2036, baseline: 236, scenario: 140, crrem: 100 },
  { year: 2037, baseline: 234, scenario: 135, crrem: 90 },
  { year: 2038, baseline: 232, scenario: 130, crrem: 80 },
  { year: 2039, baseline: 230, scenario: 125, crrem: 70 },
  { year: 2040, baseline: 228, scenario: 120, crrem: 60 },
];

const carbonPathwayData = [
  { year: 2024, baseline: 45, scenario: 45, crrem: 38 },
  { year: 2025, baseline: 44, scenario: 42, crrem: 36 },
  { year: 2026, baseline: 43, scenario: 39, crrem: 34 },
  { year: 2027, baseline: 42, scenario: 36, crrem: 32 },
  { year: 2028, baseline: 41, scenario: 33, crrem: 30 },
  { year: 2029, baseline: 40, scenario: 30, crrem: 28 },
  { year: 2030, baseline: 39, scenario: 27, crrem: 26 },
  { year: 2031, baseline: 38, scenario: 25, crrem: 24 },
  { year: 2032, baseline: 37, scenario: 23, crrem: 22 },
  { year: 2033, baseline: 36, scenario: 21, crrem: 20 },
  { year: 2034, baseline: 35, scenario: 19, crrem: 18 },
  { year: 2035, baseline: 34, scenario: 17, crrem: 16 },
  { year: 2036, baseline: 33, scenario: 15, crrem: 14 },
  { year: 2037, baseline: 32, scenario: 13, crrem: 12 },
  { year: 2038, baseline: 31, scenario: 11, crrem: 10 },
  { year: 2039, baseline: 30, scenario: 9, crrem: 8 },
  { year: 2040, baseline: 29, scenario: 7, crrem: 6 },
];

const roadmapDataEPCC = [
  { intervention: 'BMS Optimisation', strategy: 'Optimisation', start: 2025, end: 2026 },
  { intervention: 'LED Lighting Upgrade', strategy: 'Light Retrofit', start: 2026, end: 2027 },
  { intervention: 'Glazing Replacement', strategy: 'Deep Retrofit', start: 2027, end: 2028 },
  { intervention: 'Heat Pump Installation', strategy: 'Deep Retrofit', start: 2028, end: 2029 },
  { intervention: 'Insulation Upgrade', strategy: 'Deep Retrofit', start: 2029, end: 2030 },
  { intervention: 'Renewable Energy', strategy: 'Deep Retrofit', start: 2030, end: 2031 },
];

const milestonesEPCC = [
  { year: 2027, label: 'MEES EPC C Deadline', color: 'amber' },
  { year: 2028, label: '70% Leases Expire', color: 'blue' },
  { year: 2030, label: 'Boiler End-of-Life', color: 'purple' },
  { year: 2035, label: 'CRREM Phase 1', color: 'amber' },
  { year: 2040, label: 'CRREM Phase 2', color: 'amber' },
];

// Table row interface
interface TableRow {
  strategy: string;
  initiative: string;
  capex: number;
  energySaving: number;
  costSaving: number;
  co2Saved: number;
  payback: string;
}

// Bubble chart data interface
interface BubbleDatum {
  capex: number;
  roi: number;
  co2Saved: number;
  strategy: string;
  initiative: string;
}

// Cashflow data generation function
function generateCashflowData(
  capex: number,
  annualSavings: number,
  discountRate: number,
  energyEscalation: number,
  includeOpex: boolean,
  interventionTimeline: any[]
): Array<{
  year: number;
  costs: number;
  savings: number;
  netAnnual: number;
  discounted: number;
  cumulativeUndiscounted: number;
  cumulativeDiscounted: number;
  bau: number;
  intervention: string | null;
  hasIntervention: boolean;
}> {
  const data: Array<{
    year: number;
    costs: number;
    savings: number;
    netAnnual: number;
    discounted: number;
    cumulativeUndiscounted: number;
    cumulativeDiscounted: number;
    bau: number;
    intervention: string | null;
    hasIntervention: boolean;
  }> = [];
  
  let cumulativeUndiscounted = 0;
  let cumulativeDiscounted = 0;
  
  for (let year = 2024; year <= 2040; year++) {
    const intervention = interventionTimeline.find(i => year >= i.start && year <= i.end);
    const costs = intervention ? capex / (intervention.end - intervention.start + 1) : 0;
    const savings = annualSavings * Math.pow(1 + energyEscalation, year - 2024);
    const netAnnual = savings - costs;
    const discounted = netAnnual / Math.pow(1 + discountRate, year - 2024);
    
    cumulativeUndiscounted += netAnnual;
    cumulativeDiscounted += discounted;
    
    data.push({
      year,
      costs,
      savings,
      netAnnual,
      discounted,
      cumulativeUndiscounted,
      cumulativeDiscounted,
      bau: annualSavings * Math.pow(1 + energyEscalation, year - 2024),
      intervention: intervention?.name || null,
      hasIntervention: !!intervention,
    });
  }
  
  return data;
}

// Panel Components
function FinancePanel({ data, cashflowData, npv, roi25y, carbonPaybackYears, irr, dcf }: any) {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-lg font-semibold text-[#1A1A1A] mb-2">Financial Overview</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">ROI (25y)</p>
          <p className={`text-lg font-semibold ${roi25y >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {roi25y.toFixed(1)}%
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">NPV @ 6%</p>
          <p className={`text-lg font-semibold ${npv >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            £{(npv / 1000000).toFixed(1)}M
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Carbon Payback</p>
          <p className="text-lg font-semibold text-[#1A1A1A]">{carbonPaybackYears} yrs</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">IRR</p>
          <p className="text-lg font-semibold text-[#1A1A1A]">
            {!isFinite(irr) || isNaN(irr) || irr < 1 ? 'No IRR' : `${irr.toFixed(1)}%`}
          </p>
        </div>
      </div>

      <h3 className="text-sm font-semibold mt-4 mb-2">Cashflow Simulation</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={cashflowData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="year" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <ChartTooltip />
          <Legend />
          <Bar dataKey="savings" fill="#22C55E" name="Annual Savings" />
          <Bar dataKey={(d) => Math.abs(d.costs)} fill="#EF4444" name="Annual Costs" />
          <Line type="monotone" dataKey="cumulativeUndiscounted" stroke="#F97316" strokeWidth={2} name="Cumulative Cashflow" />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-4 bg-gray-50 p-3 rounded border-l-4 border-[#F97316] text-sm">
        <p>💡 <strong>Insight:</strong> Without retrofit, cumulative operating costs exceed retrofit case by £{(Math.abs(npv)/1_000_000).toFixed(1)}M by 2040.</p>
      </div>
    </div>
  );
}

function PerformancePanel({ data }: any) {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-lg font-semibold text-[#1A1A1A] mb-2">Energy & Carbon Performance</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Energy Reduction</p>
          <p className="text-lg font-semibold text-green-600">{data?.kpis?.energyReduction || '—'}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Carbon Reduction</p>
          <p className="text-lg font-semibold text-green-600">{data?.kpis?.carbonReduction || '—'}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">CRREM Aligned Until</p>
          <p className="text-lg font-semibold text-green-600">{data?.kpis?.crremAlignedUntil || '—'}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Green Value Uplift</p>
          <p className="text-lg font-semibold text-green-600">+{data?.kpis?.greenValueUplift || 0}%</p>
        </div>
      </div>

      <h3 className="text-sm font-semibold mt-4 mb-2">Performance vs Benchmarks</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={energyPathwayData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="year" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <ChartTooltip />
          <Legend />
          <Line type="monotone" dataKey="baseline" stroke="#EF4444" strokeWidth={2} name="Baseline" />
          <Line type="monotone" dataKey="scenario" stroke="#F97316" strokeWidth={3} name="This Scenario" />
          <Line type="monotone" dataKey="crrem" stroke="#3B82F6" strokeWidth={2} strokeDasharray="5 5" name="CRREM Target" />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 bg-blue-50 p-3 rounded border-l-4 border-[#F97316] text-sm">
        <p>📊 <strong>Insight:</strong> This scenario reduces energy use by {data?.kpis?.energyReduction || '—'} and carbon by {data?.kpis?.carbonReduction || '—'}, keeping alignment with CRREM until {data?.kpis?.crremAlignedUntil || '—'}.</p>
      </div>
    </div>
  );
}

function RoadmapPanel({ data }: any) {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-lg font-semibold text-[#1A1A1A] mb-2">Retrofit Roadmap</h2>
      
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold mb-3">Implementation Timeline</h3>
        <div className="space-y-3">
          {roadmapDataEPCC.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                item.strategy === 'Deep Retrofit' ? 'bg-purple-600' :
                item.strategy === 'Light Retrofit' ? 'bg-amber-500' : 'bg-blue-500'
              }`} />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.intervention}</p>
                <p className="text-xs text-gray-500">{item.strategy}</p>
              </div>
              <div className="text-xs text-gray-500">
                {item.start}-{item.end}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 bg-gray-50 p-3 rounded border-l-4 border-[#F97316] text-sm">
        <p>🗓️ <strong>Insight:</strong> Align retrofit timing with tenant churn and asset lifecycle events to minimise disruption and maximise rental protection.</p>
      </div>
    </div>
  );
}

function MeasuresPanel({ data }: any) {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-lg font-semibold text-[#1A1A1A] mb-2">Retrofit Measures</h2>
      
      <div className="space-y-3">
        {data.map((row: any, idx: number) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{row.initiative}</h3>
              <Badge className={
                row.strategy === 'Deep Retrofit' ? 'bg-purple-600 text-white' :
                row.strategy === 'Light Retrofit' ? 'bg-amber-500 text-white' :
                'bg-blue-500 text-white'
              }>
                {row.strategy}
              </Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-xs text-gray-500">CAPEX</p>
                <p className="font-medium">£{row.capex.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Annual Savings</p>
                <p className="font-medium text-green-600">£{row.costSaving.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">CO₂ Saved</p>
                <p className="font-medium text-green-600">{row.co2Saved.toLocaleString()} kg</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Payback</p>
                <p className="font-medium">{row.payback} years</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-orange-50 p-3 rounded border-l-4 border-[#F97316] text-sm">
        <p>🔧 <strong>Insight:</strong> Total CAPEX of £{data.reduce((sum: number, row: any) => sum + row.capex, 0).toLocaleString()} with average payback of {Math.round(data.reduce((sum: number, row: any) => sum + parseFloat(row.payback), 0) / data.length)} years.</p>
      </div>
    </div>
  );
}

export function ScenarioDetailPage({ scenarioName, onBack }: ScenarioDetailPageProps) {
  const [showCRREM, setShowCRREM] = useState(true);
  const [chartView, setChartView] = useState<'energy' | 'carbon' | 'both'>('both');
  const [timelineView, setTimelineView] = useState<'building' | 'unit'>('building');
  
  // Financial calculator states
  const [discountRate, setDiscountRate] = useState([6]);
  const [energyEscalation, setEnergyEscalation] = useState([3]);
  const [includeOpex, setIncludeOpex] = useState(false);
  
  // Interactive highlighting
  const [selectedIntervention, setSelectedIntervention] = useState<string | null>(null);
  
  // Side panel state
  const [activePanel, setActivePanel] = useState<string | null>(null);
  
  // Loaded from Supabase
  const [scenarioData, setScenarioData] = useState<any | null>(null);
  const [interventionTableData, setInterventionTableData] = useState<TableRow[]>([]);
  const [interventionBubbleData, setInterventionBubbleData] = useState<BubbleDatum[]>([]);
  const [interventionTimeline, setInterventionTimeline] = useState<any[]>([]);
  const [milestones, setMilestones] = useState<any[]>([]);

  // Load scenario data from Supabase
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const { data: scenario } = await supabase
        .from('scenarios')
        .select('*')
        .eq('name', scenarioName)
        .single();
      
      if (!isMounted || !scenario) return;
      
      setScenarioData({
        ...scenario,
        kpis: {
          capex: "£6.2M",
          rentProtected: "£1.3M",
          annualSavings: "£142k",
          payback: "11 years",
          energyReduction: "58%",
          carbonReduction: "95%",
          crremAlignedUntil: "2050+",
          npv: "-£0.3M",
          irr: "4.2%",
          roi25y: 12.3,
          dcf: "-£0.3M",
          greenValueUplift: 6.5,
          carbonPayback: 12
        }
      });

      // Load interventions
      const { data: interventions } = await supabase
        .from('interventions')
        .select('*')
        .eq('scenario_id', scenario.id)
        .order('capex');
      
      if (!isMounted) return;
      
      const tableData = (interventions || []).map((i: any) => ({
        strategy: i.strategy || 'Optimisation',
        initiative: i.name,
        capex: i.capex || 0,
        energySaving: i.energy_saving || 0,
        costSaving: i.cost_saving || 0,
        co2Saved: i.co2_saved || 0,
        payback: i.payback || '0'
      }));
      
      setInterventionTableData(tableData.length ? tableData : [
        { strategy: 'Optimisation', initiative: 'BMS Optimisation', capex: 50000, energySaving: 15000, costSaving: 8000, co2Saved: 2500, payback: '6' },
        { strategy: 'Light Retrofit', initiative: 'LED Lighting Upgrade', capex: 120000, energySaving: 25000, costSaving: 15000, co2Saved: 4200, payback: '8' },
        { strategy: 'Deep Retrofit', initiative: 'Glazing Replacement', capex: 800000, energySaving: 45000, costSaving: 28000, co2Saved: 7500, payback: '29' },
        { strategy: 'Deep Retrofit', initiative: 'Heat Pump Installation', capex: 1200000, energySaving: 60000, costSaving: 38000, co2Saved: 10000, payback: '32' },
        { strategy: 'Deep Retrofit', initiative: 'Insulation Upgrade', capex: 600000, energySaving: 35000, costSaving: 22000, co2Saved: 5800, payback: '27' },
        { strategy: 'Deep Retrofit', initiative: 'Renewable Energy', capex: 800000, energySaving: 40000, costSaving: 25000, co2Saved: 6700, payback: '32' }
      ]);

      const bubbleData = (interventions || []).map((i: any) => ({
        capex: i.capex || 0,
        roi: i.roi || 0,
        co2Saved: i.co2_saved || 0,
        strategy: i.strategy || 'Optimisation',
        initiative: i.name
      }));
      
      setInterventionBubbleData(bubbleData.length ? bubbleData : [
        { capex: 50000, roi: 16, co2Saved: 2500, strategy: 'Optimisation', initiative: 'BMS Optimisation' },
        { capex: 120000, roi: 12.5, co2Saved: 4200, strategy: 'Light Retrofit', initiative: 'LED Lighting Upgrade' },
        { capex: 800000, roi: 3.5, co2Saved: 7500, strategy: 'Deep Retrofit', initiative: 'Glazing Replacement' },
        { capex: 1200000, roi: 3.2, co2Saved: 10000, strategy: 'Deep Retrofit', initiative: 'Heat Pump Installation' },
        { capex: 600000, roi: 3.7, co2Saved: 5800, strategy: 'Deep Retrofit', initiative: 'Insulation Upgrade' },
        { capex: 800000, roi: 3.1, co2Saved: 6700, strategy: 'Deep Retrofit', initiative: 'Renewable Energy' }
      ]);

      // Load timeline
      const { data: timelineData } = await supabase
        .from('intervention_timeline')
        .select('*')
        .eq('scenario_id', scenario.id)
        .order('start_year');
      
      setInterventionTimeline((timelineData || []).map((t: any) => ({
        name: t.intervention_name,
        start: t.start_year,
        end: t.end_year
      })));

      // Load milestones
      const { data: milestonesData } = await supabase
        .from('milestones')
        .select('*')
        .eq('building_id', scenario.building_id)
        .order('year');
      const ms = (milestonesData || []).map((m: any) => ({ year: m.year, label: m.name, color: m.milestone_type === 'compliance' ? 'amber' : (m.milestone_type === 'leasing' ? 'blue' : 'purple') }));
      setMilestones(ms.length ? ms : milestonesEPCC);
    })();
    return () => { isMounted = false };
  }, [scenarioName]);

  const badgeColor = scenarioData && scenarioData.badge?.color === 'amber' ? 'bg-amber-500' : 'bg-green-600';
  
  // Calculate financial metrics with current settings
  const cashflowData = generateCashflowData(
    (scenarioData?.capexNum || 0),
    (scenarioData?.annualSavingsNum || 0),
    discountRate[0] / 100,
    energyEscalation[0] / 100,
    includeOpex,
    interventionTimeline
  );

  // Calculate NPV (sum of discounted cashflows)
  const npv = cashflowData.reduce((sum, d) => sum + d.discounted, 0);
  
  // Calculate IRR (simplified - find rate where NPV = 0)
  let irr = 0;
  for (let rate = 0.01; rate <= 0.2; rate += 0.01) {
    const testNpv = cashflowData.reduce((sum, d) => sum + (d.netAnnual / Math.pow(1 + rate, d.year - 2024)), 0);
    if (Math.abs(testNpv) < 10000) {
      irr = rate * 100;
      break;
    }
  }
  
  // Calculate DCF (same as NPV for this context)
  const dcf = npv;
  
  // Calculate 25-year ROI
  const roi25y = ((25 * (scenarioData?.annualSavingsNum || 0)) - (scenarioData?.capexNum || 0)) / (scenarioData?.capexNum || 1) * 100;
  
  // Carbon payback years (mock)
  const carbonPaybackYears = 12;
  
  // Filter bubble data based on selected intervention
  const filteredBubbleData = selectedIntervention 
    ? interventionBubbleData.filter(d => d.strategy === selectedIntervention)
    : interventionBubbleData;
  
  // Simple payback calculation (years until cumulative > 0)
  const simplePaybackYear = cashflowData.find(d => d.cumulativeUndiscounted > 0)?.year;
  const simplePayback = simplePaybackYear ? simplePaybackYear - 2024 : (scenarioData?.kpis?.payback ? parseFloat(String(scenarioData.kpis.payback)) : 0);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onBack} className="rounded-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
            <div className="h-6 w-px bg-gray-200" />
            <div>
              <p className="text-xs text-gray-500">Portfolio: UK Office Fund</p>
              <h1 className="text-[#1A1A1A] font-semibold text-base">
                The Galleria – <span className="text-[#F97316]">{scenarioName}</span>
              </h1>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-full">
              <Download className="w-4 h-4 mr-2" /> Export
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
          </div>
        </div>
      </header>

      {/* Overview Summary Grid */}
      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <SummaryCard 
            icon={Zap} 
            label="Energy & Carbon" 
            value="58% ↓" 
            description="Reduction vs baseline"
            onClick={() => setActivePanel('performance')}
          />
          <SummaryCard 
            icon={PoundSterling} 
            label="Financial Impact" 
            value="£6.2M" 
            description="Total CAPEX"
            onClick={() => setActivePanel('finance')}
          />
          <SummaryCard 
            icon={Clock} 
            label="Payback" 
            value="11 years" 
            description="Simple payback period"
            onClick={() => setActivePanel('finance')}
          />
          <SummaryCard 
            icon={Building2} 
            label="Retrofit Plan" 
            value="2025–2030" 
            description="6 interventions"
            onClick={() => setActivePanel('roadmap')}
          />
          <SummaryCard 
            icon={CheckCircle} 
            label="CRREM Alignment" 
            value="2050+" 
            description="Compliant with 1.5°C"
            onClick={() => setActivePanel('performance')}
          />
          <SummaryCard 
            icon={Leaf} 
            label="Carbon Reduction" 
            value="95%" 
            description="vs Baseline"
            onClick={() => setActivePanel('performance')}
          />
          <SummaryCard 
            icon={List} 
            label="Measures" 
            value="6 total" 
            description="View breakdown"
            onClick={() => setActivePanel('measures')}
          />
        </div>
      </section>

      {/* Side Panel System */}
      <Drawer open={!!activePanel} onOpenChange={() => setActivePanel(null)}>
        <DrawerContent className="w-full md:w-[600px] max-w-[90vw] bg-white border-l border-gray-200 overflow-y-auto">
          {activePanel === 'finance' && (
            <FinancePanel 
              data={scenarioData} 
              cashflowData={cashflowData}
              npv={npv}
              roi25y={roi25y}
              carbonPaybackYears={carbonPaybackYears}
              irr={irr}
              dcf={dcf}
            />
          )}
          {activePanel === 'performance' && <PerformancePanel data={scenarioData} />}
          {activePanel === 'roadmap' && <RoadmapPanel data={scenarioData} />}
          {activePanel === 'measures' && <MeasuresPanel data={interventionTableData} />}
        </DrawerContent>
      </Drawer>
    </div>
  );
}