import React, { useEffect, useState } from 'react';
import { ArrowLeft, Download, Share2, Filter, Plus, TrendingUp, DollarSign, HelpCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, Legend, ResponsiveContainer, AreaChart, Area, ScatterChart, Scatter, ZAxis, ComposedChart, Bar } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Slider } from '../ui/slider';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';
import { supabase } from '../../utils/supabase/queries';

interface ScenarioDetailPageProps {
  scenarioName: string;
  onBack: () => void;
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

type BubbleDatum = { name: string; capex: number; roi: number; carbon: number; x: number; y: number; z: number };

type TableRow = { strategy: string; initiative: string; capex: number; electricitySaving: number; gasSaving: number; costSaving: number; co2Saved: number; payback: string };

// Gantt chart data for roadmap - EPC C by 2027
const roadmapDataEPCC = [
  { intervention: 'Thermostat Setpoints', start: 2025, end: 2025, strategy: 'Optimisation' },
  { intervention: 'BMS Upgrade', start: 2025, end: 2025, strategy: 'Optimisation' },
  { intervention: 'LED Lighting', start: 2025, end: 2026, strategy: 'Light Retrofit' },
  { intervention: 'Double Glazing', start: 2026, end: 2026, strategy: 'Deep Retrofit' },
];

// Gantt chart data for roadmap - Net Zero 2050
const roadmapDataNetZero = [
  { intervention: 'Thermostat Setpoints', start: 2025, end: 2025, strategy: 'Optimisation' },
  { intervention: 'BMS Upgrade', start: 2026, end: 2026, strategy: 'Optimisation' },
  { intervention: 'LED Lighting', start: 2026, end: 2027, strategy: 'Light Retrofit' },
  { intervention: 'Solar PV', start: 2027, end: 2028, strategy: 'Light Retrofit' },
  { intervention: 'Double Glazing', start: 2028, end: 2029, strategy: 'Deep Retrofit' },
  { intervention: 'Heat Pump', start: 2029, end: 2030, strategy: 'Deep Retrofit' },
];

const milestonesEPCC = [
  { year: 2027, label: 'MEES EPC C', color: 'amber' },
  { year: 2028, label: '70% Leases End', color: 'blue' },
];

const milestonesNetZero = [
  { year: 2027, label: 'MEES EPC C', color: 'amber' },
  { year: 2028, label: '70% Leases End', color: 'blue' },
  { year: 2030, label: 'Boiler EoL', color: 'purple' },
];

// Helper function to calculate NPV
function calculateNPV(cashflows: number[], discountRate: number): number {
  return cashflows.reduce((npv, cf, year) => {
    return npv + cf / Math.pow(1 + discountRate, year);
  }, 0);
}

// Helper function to calculate IRR (simplified - uses Newton's method approximation)
function calculateIRR(cashflows: number[]): number {
  let irr = 0.1; // Initial guess
  const iterations = 20;
  const epsilon = 0.0001;
  
  for (let i = 0; i < iterations; i++) {
    const npv = calculateNPV(cashflows, irr);
    const npvDerivative = cashflows.reduce((sum, cf, year) => {
      return sum - (year * cf) / Math.pow(1 + irr, year + 1);
    }, 0);
    
    const newIrr = irr - npv / npvDerivative;
    if (Math.abs(newIrr - irr) < epsilon) break;
    irr = newIrr;
  }
  
  return irr;
}

// Intervention timelines by scenario
const interventionTimelineEPCC = [
  { year: 2025, name: 'Thermostat Setpoints', capex: 0, annualSaving: 20 },
  { year: 2025, name: 'BMS Upgrade', capex: 120, annualSaving: 15 },
  { year: 2025, name: 'LED Lighting', capex: 681, annualSaving: 25 },
  { year: 2026, name: 'Double Glazing', capex: 2623, annualSaving: 8 },
];

const interventionTimelineNetZero = [
  { year: 2025, name: 'Thermostat Setpoints', capex: 0, annualSaving: 84 },
  { year: 2026, name: 'BMS Upgrade', capex: 120, annualSaving: 35 },
  { year: 2027, name: 'LED Lighting', capex: 681, annualSaving: 103 },
  { year: 2028, name: 'Solar PV', capex: 450, annualSaving: 38 },
  { year: 2029, name: 'Double Glazing', capex: 2623, annualSaving: 15 },
  { year: 2030, name: 'Heat Pump', capex: 890, annualSaving: 48 },
];

// Generate cashflow data based on discount rate and energy escalation
function generateCashflowData(
  capex: number, 
  annualSavings: number, 
  discountRate: number, 
  energyEscalation: number,
  includeOpex: boolean,
  interventionTimeline: Array<{ year: number; name: string; capex: number; annualSaving: number }>
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
  const opexReduction = includeOpex ? annualSavings * 0.3 : 0; // OPEX is ~30% of savings
  
  // Calculate cumulative savings by year based on interventions
  let cumulativeSavingsCapacity = 0;
  
  for (let year = 0; year <= 16; year++) {
    const realYear = 2024 + year;
    
    // Check if any intervention happens this year
    const intervention = interventionTimeline.find(i => i.year === realYear);
    const yearCapex = intervention ? intervention.capex * 1000 : 0;
    
    // Add to cumulative savings capacity when intervention completes
    if (intervention) {
      cumulativeSavingsCapacity += intervention.annualSaving * 1000;
    }
    
    // Calculate escalated savings based on cumulative capacity
    const baseSavings = cumulativeSavingsCapacity;
    const escalatedSavings = year === 0 ? 0 : baseSavings * Math.pow(1 + energyEscalation, year - 1);
    const totalSavings = escalatedSavings + (year > 0 && includeOpex ? opexReduction : 0);
    
    // Annual cashflow = savings - costs
    const annualCosts = -yearCapex;
    const annualSavings = totalSavings;
    const yearCashflow = annualCosts + annualSavings;
    
    const discountFactor = Math.pow(1 + discountRate, year);
    const discountedCashflow = yearCashflow / discountFactor;
    
    const prevCumulative = year === 0 ? 0 : data[year - 1].cumulativeDiscounted;
    const prevCumulativeUndiscounted = year === 0 ? 0 : data[year - 1].cumulativeUndiscounted;
    
    // BAU (do nothing) line - no CAPEX, no savings, just existing costs
    const bauCumulative = 0; // Flat line at 0
    
    data.push({
      year: realYear,
      costs: annualCosts / 1000, // Negative values
      savings: annualSavings / 1000, // Positive values
      netAnnual: yearCashflow / 1000,
      discounted: discountedCashflow / 1000,
      cumulativeUndiscounted: prevCumulativeUndiscounted + yearCashflow / 1000,
      cumulativeDiscounted: prevCumulative + discountedCashflow / 1000,
      bau: bauCumulative,
      intervention: intervention?.name || null,
      hasIntervention: !!intervention,
    });
  }
  
  return data;
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
  
  // Loaded from Supabase
  const [scenarioData, setScenarioData] = useState<any | null>(null);
  const [interventionTableData, setInterventionTableData] = useState<TableRow[]>([]);
  const [interventionBubbleData, setInterventionBubbleData] = useState<BubbleDatum[]>([]);
  const [roadmapData, setRoadmapData] = useState(roadmapDataEPCC);
  const [milestones, setMilestones] = useState(milestonesEPCC);
  const [interventionTimeline, setInterventionTimeline] = useState(interventionTimelineEPCC);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const { data: scenario, error } = await supabase
        .from('scenarios')
        .select('*')
        .eq('name', scenarioName)
        .maybeSingle();
      if (error) return;
      if (!isMounted || !scenario) return;

      const badge = scenario.is_recommended ? { text: 'Recommended', color: 'amber' as const } : { text: 'Future-proof', color: 'green' as const };
      const kpis = {
        capex: scenario.capex != null ? `£${(scenario.capex/1_000_000).toFixed(1)}M` : '—',
        rentProtected: scenario.rent_protected != null ? `£${(scenario.rent_protected/1_000_000).toFixed(1)}M` : '—',
        annualSavings: scenario.annual_savings != null ? `£${(scenario.annual_savings/1000).toFixed(0)}k` : '—',
        payback: scenario.simple_payback_years != null ? `${scenario.simple_payback_years} years` : '—',
        energyReduction: scenario.energy_reduction != null ? `${scenario.energy_reduction}%` : '—',
        carbonReduction: scenario.carbon_reduction != null ? `${scenario.carbon_reduction}%` : '—',
        crremAlignedUntil: scenario.crrem_aligned_until || '—',
        // New financial metrics
        roi25y: 12.3, // 12.3%
        greenValueUplift: 6.5, // +6.5%
        carbonPayback: 12, // 12 years
      };
      const capexNum = scenario.capex || 0;
      const annualSavingsNum = scenario.annual_savings || 0;
      setScenarioData({
        badge,
        kpis,
        summary: scenario.description || '',
        euiBaseline: 260,
        euiScenario: 190,
        euiCRREM: 180,
        capexNum,
        annualSavingsNum,
      });

      // Interventions for bubble and table
      const { data: interventions } = await supabase
        .from('unit_interventions')
        .select('*')
        .eq('scenario_id', scenario.id);

      const tableRows: TableRow[] = (interventions || []).map((iv: any) => ({
        strategy: iv.category || '—',
        initiative: iv.intervention_name,
        capex: Math.round(iv.capex || 0),
        electricitySaving: Math.round(iv.energy_reduction_kwh || 0),
        gasSaving: 0,
        costSaving: Math.round(iv.annual_saving || 0),
        co2Saved: Math.round((iv.carbon_reduction_tco2e || 0) * 1000),
        payback: iv.payback_years != null ? String(iv.payback_years) : '—',
      }));
      setInterventionTableData(tableRows);

      const bubbles: BubbleDatum[] = (interventions || []).map((iv: any) => {
        const capexK = (iv.capex || 0) / 1000;
        const roi = iv.payback_years && iv.payback_years > 0 ? Math.max(0, Math.min(100, Math.round((iv.annual_saving || 0) / (iv.capex || 1) * 100))) : 0;
        const carbonT = Math.max(0, (iv.carbon_reduction_tco2e || 0));
        return { name: iv.intervention_name, capex: capexK, roi, carbon: carbonT, x: capexK, y: roi, z: Math.max(50, carbonT * 10) };
      });
      setInterventionBubbleData(bubbles);

      // Roadmap and timeline from intervention years
      const timeline = (interventions || [])
        .filter((iv: any) => iv.planned_start_year && iv.planned_end_year)
        .map((iv: any) => ({ intervention: iv.intervention_name, start: iv.planned_start_year, end: iv.planned_end_year, strategy: iv.category || 'Optimisation' }));
      setRoadmapData(timeline.length ? timeline : roadmapDataEPCC);
      setInterventionTimeline(
        (interventions || [])
          .filter((iv: any) => iv.planned_start_year)
          .map((iv: any) => ({ year: iv.planned_start_year, name: iv.intervention_name, capex: Math.round((iv.capex || 0)/1000), annualSaving: Math.round((iv.annual_saving || 0)/1000) }))
      );

      // Milestones by building
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

  const badgeColor = scenarioData && scenarioData.badge.color === 'amber' ? 'bg-amber-500' : 'bg-green-600';
  
  // Calculate financial metrics with current settings
  const cashflowData = generateCashflowData(
    (scenarioData?.capexNum || 0),
    (scenarioData?.annualSavingsNum || 0),
    discountRate[0] / 100,
    energyEscalation[0] / 100,
    includeOpex,
    interventionTimeline
  );
  
  // Show loading state while data is being fetched
  if (!scenarioData) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F97316] mx-auto mb-4"></div>
          <p className="text-[#6B7280]">Loading scenario data...</p>
        </div>
      </div>
    );
  }
  
  // Calculate NPV, IRR, and other metrics
  const cashflowsForIRR = cashflowData.map(d => d.netAnnual * 1000);
  const npv = cashflowData[cashflowData.length - 1].cumulativeDiscounted * 1000;
  const irr = calculateIRR(cashflowsForIRR) * 100;
  const roi25y = ((25 * scenarioData.annualSavingsNum) - scenarioData.capexNum) / scenarioData.capexNum * 100;
  const dcf = npv; // DCF = NPV in this context
  
  // Get new KPI values from scenario data
  const greenValueUplift = scenarioData?.kpis?.greenValueUplift || 6.5;
  const carbonPaybackYears = scenarioData?.kpis?.carbonPayback || 12;
  
  // Simple payback calculation (years until cumulative > 0)
  const simplePaybackYear = cashflowData.find(d => d.cumulativeUndiscounted > 0)?.year;
  const simplePayback = simplePaybackYear ? simplePaybackYear - 2024 : (scenarioData?.kpis?.payback ? parseFloat(String(scenarioData.kpis.payback)) : 0);

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Unified Header with KPIs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          {/* Top Row: Navigation and Actions */}
          <div className="flex items-center justify-between mb-3">
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
                <Badge className={`${badgeColor} text-white`}>{scenarioData?.badge.text || ''}</Badge>
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
          
          {/* Bottom Row: Key Financial KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center md:text-left">
              <p className="text-xs text-[#6B7280] mb-1">Total Investment</p>
              <p className="text-lg font-semibold text-[#1A1A1A]">{scenarioData?.kpis.capex || '—'}</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-xs text-[#6B7280] mb-1">Annual Savings</p>
              <p className="text-lg font-semibold text-green-600">{scenarioData?.kpis.annualSavings || '—'}</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-xs text-[#6B7280] mb-1">Simple Payback</p>
              <p className="text-lg font-semibold text-[#1A1A1A]">{scenarioData?.kpis.payback || '—'}</p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* 1. Performance & Benchmark Summary */}
        <section className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
            <FinancialKPICard
              label="Rent Protected"
              value={scenarioData?.kpis.rentProtected || '—'}
              subtitle="Annual rent safeguarded by MEES compliance"
              tooltip="Estimated rental income protected by maintaining EPC compliance"
              valueColor="text-green-600"
            />
            <FinancialKPICard
              label="Energy Reduction"
              value={scenarioData?.kpis.energyReduction || '—'}
              subtitle="Improvement vs baseline"
              tooltip="Percentage reduction in energy use intensity (EUI) compared to baseline"
              valueColor="text-green-600"
            />
            <FinancialKPICard
              label="Carbon Reduction"
              value={scenarioData?.kpis.carbonReduction || '—'}
              subtitle="Reduction in annual emissions"
              tooltip="CO₂e reduction achieved vs baseline scenario"
              valueColor="text-green-600"
            />
            <FinancialKPICard
              label="CRREM Aligned Until"
              value={scenarioData?.kpis.crremAlignedUntil || '—'}
              subtitle="Compliance with CRREM pathway"
              tooltip="Shows until which year this scenario remains aligned with the CRREM carbon intensity target"
              valueColor="text-green-600"
            />
            <FinancialKPICard
              label="Green Value Uplift"
              value={`+${scenarioData?.kpis.greenValueUplift || 0}%`}
              subtitle="Estimated asset value premium"
              tooltip="Indicative uplift in rent or capital value for improved EPC / ESG rating"
              valueColor="text-green-600"
            />
          </div>

          {/* Scenario Summary */}
          <div className="bg-blue-50 border-l-4 border-[#F97316] rounded-lg p-6">
            <p className="text-sm text-[#1A1A1A]">
              <span style={{ fontWeight: 600 }}>Scenario Summary: </span>
              {scenarioData?.summary || ''}
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
                      <ChartTooltip />
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
                      <ChartTooltip />
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
                This shows how the scenario reduces energy use and emissions relative to baseline. The dotted line represents CRREM's decarbonisation pathway, with this scenario aligned until {scenarioData?.kpis?.crremAlignedUntil || '—'}. 
                Baseline EUI: {scenarioData?.euiBaseline || '—'} kWh/m² → Scenario: {scenarioData?.euiScenario || '—'} kWh/m² (CRREM 2030: {scenarioData?.euiCRREM || '—'} kWh/m²).
              </p>
            </div>
          </div>
        </section>

        {/* 3. Financial Impact & Investment Case */}
        <section className="mb-8">
          <div className="mb-4">
            <h3 className="text-[#1A1A1A] mb-1">Financial Impact & Investment Case</h3>
            <p className="text-sm text-[#6B7280]">Evaluate retrofit as a business investment with standard financial metrics</p>
          </div>

          {/* Advanced Financial KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <FinancialKPICard
              label="ROI (25y)"
              value={`${roi25y.toFixed(1)}%`}
              subtitle="Total net benefit vs cost over 25 years"
              tooltip="Return on investment over 25 years. Reflects the full retrofit lifetime, including later-year savings."
              valueColor={roi25y >= 0 ? "text-green-600" : "text-red-600"}
            />

            <FinancialKPICard
              label={`NPV @ ${discountRate[0]}%`}
              value={npv >= 0 ? `£${(npv / 1000000).toFixed(1)}M` : `£${(npv / 1000000).toFixed(1)}M`}
              subtitle="Net present value of future savings"
              tooltip="NPV accounts for the time value of money. Positive = value accretive."
              valueColor={npv >= 0 ? "text-green-600" : "text-red-600"}
            />

            <FinancialKPICard
              label="Carbon Payback"
              value={`${carbonPaybackYears} years`}
              subtitle="Years to offset embodied carbon"
              tooltip="Time required for operational CO₂ savings to equal embodied retrofit emissions."
              valueColor="text-[#1A1A1A]"
            />
          </div>

          {/* Discount Rate Explainer Panel */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 flex items-start gap-4 border-l-4 border-[#F97316]">
            <HelpCircle className="w-5 h-5 text-[#F97316] mt-1" />
            <div>
              <p className="text-sm text-[#1A1A1A] font-semibold mb-1">Understanding the Discount Rate</p>
              <p className="text-xs text-[#6B7280] mb-2">
                The discount rate combines inflation (≈3%) and opportunity cost (≈3%), giving 6%. It reduces future savings to today's value. 
                Lower it to 3–4% to see how long-term savings increase project viability.
              </p>
              <div className="text-xs text-[#6B7280] bg-white p-2 rounded border">
                <strong>At 3%:</strong> NPV = £{(npv * 1.2 / 1000000).toFixed(1)}M &nbsp;|&nbsp;
                <strong>At 6%:</strong> £{(npv / 1000000).toFixed(1)}M &nbsp;|&nbsp;
                <strong>At 8%:</strong> £{(npv * 0.8 / 1000000).toFixed(1)}M
              </div>
            </div>
          </div>

          {/* Commentary */}
          <div className="bg-blue-50 border-l-4 border-[#F97316] rounded-lg p-6 mb-6">
            <p className="text-sm text-[#1A1A1A]">
              <span style={{ fontWeight: 600 }}>Financial Insight: </span>
              These financial metrics align retrofit scenarios with standard investment decision frameworks (NPV, IRR, ROI). Use them to compare sustainability strategies with other capital projects in your portfolio.
            </p>
          </div>

          {/* Cashflow Analysis */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
            <h4 className="mb-4">Cashflow Analysis</h4>
            
            {/* Interactive Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-[#6B7280]">Discount Rate</label>
                  <span className="text-sm" style={{ fontWeight: 600 }}>{discountRate[0]}%</span>
                </div>
                <Slider
                  value={discountRate}
                  onValueChange={setDiscountRate}
                  min={0}
                  max={10}
                  step={0.5}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-[#6B7280]">Energy Price Escalation</label>
                  <span className="text-sm" style={{ fontWeight: 600 }}>{energyEscalation[0]}%</span>
                </div>
                <Slider
                  value={energyEscalation}
                  onValueChange={setEnergyEscalation}
                  min={0}
                  max={8}
                  step={0.5}
                  className="w-full"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeOpex}
                    onChange={(e) => setIncludeOpex(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-[#6B7280]">Include OPEX savings</span>
                </label>
                <Button variant="outline" size="sm" className="rounded-full ml-auto">
                  <Download className="w-4 h-4 mr-2" />
                  Export Cashflow
                </Button>
              </div>
            </div>

            {/* Dynamic Cashflow Chart */}
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={cashflowData} margin={{ top: 30, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="year" 
                  stroke="#6B7280"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="#6B7280" 
                  label={{ value: '£k', angle: -90, position: 'insideLeft' }}
                  tick={{ fontSize: 12 }}
                />
                <ChartTooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                          <p className="font-semibold mb-2">Year {data.year}</p>
                          {data.intervention && (
                            <p className="text-xs text-[#F97316] mb-2 font-semibold">
                              🔧 {data.intervention}
                            </p>
                          )}
                          {data.costs < 0 && (
                            <p className="text-xs text-red-600">
                              CAPEX: £{Math.abs(data.costs).toFixed(0)}k
                            </p>
                          )}
                          {data.savings > 0 && (
                            <p className="text-xs text-green-600">
                              Annual Savings: £{data.savings.toFixed(0)}k
                            </p>
                          )}
                          <p className="text-xs font-semibold mt-2 border-t pt-2">
                            Net Annual: £{data.netAnnual.toFixed(0)}k
                          </p>
                          <p className="text-xs font-semibold">
                            Cumulative: £{data.cumulativeUndiscounted.toFixed(0)}k
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                
                {/* Annual costs as red bars */}
                <Bar 
                  dataKey={(d) => Math.abs(d.costs)} 
                  fill="#EF4444" 
                  name="Annual Costs (CAPEX)"
                  shape={(props: any) => {
                    const { x, y, width, height, payload } = props;
                    if (Math.abs(payload.costs) === 0) return null;
                    
                    return (
                      <g>
                        <rect
                          x={x}
                          y={y}
                          width={width}
                          height={height}
                          fill="#EF4444"
                          opacity={0.9}
                        />
                        {payload.hasIntervention && Math.abs(payload.costs) > 50 && (
                          <>
                            <circle
                              cx={x + width / 2}
                              cy={y + height + 8}
                              r={4}
                              fill="#F97316"
                              stroke="#fff"
                              strokeWidth={2}
                            />
                          </>
                        )}
                      </g>
                    );
                  }}
                />
                
                {/* Annual savings as green bars */}
                <Bar 
                  dataKey="savings" 
                  fill="#22C55E" 
                  name="Annual Savings"
                  opacity={0.85}
                  shape={(props: any) => {
                    const { x, y, width, height, payload, index } = props;
                    if (payload.savings === 0) return null;
                    
                    // Check if this is when annual cashflow becomes positive
                    const prevData = index > 0 ? cashflowData[index - 1] : null;
                    const showAnnualBreakeven = payload.netAnnual > 0 && (!prevData || prevData.netAnnual <= 0);
                    
                    return (
                      <g>
                        <rect
                          x={x}
                          y={y}
                          width={width}
                          height={height}
                          fill="#22C55E"
                        />
                        {showAnnualBreakeven && (
                          <>
                            <circle 
                              cx={x + width / 2} 
                              cy={y - 8} 
                              r={5} 
                              fill="#10B981" 
                              stroke="#fff" 
                              strokeWidth={2} 
                            />
                            <text 
                              x={x + width / 2} 
                              y={y - 18} 
                              fill="#10B981" 
                              fontSize={10}
                              fontWeight="bold"
                              textAnchor="middle"
                            >
                              Annual +ve
                            </text>
                          </>
                        )}
                      </g>
                    );
                  }}
                />
                
                {/* BAU baseline */}
                <Line 
                  type="monotone" 
                  dataKey="bau" 
                  stroke="#9CA3AF" 
                  strokeWidth={2} 
                  strokeDasharray="8 4"
                  name="BAU (Do Nothing)" 
                  dot={false}
                />
                
                {/* BAU baseline */}
                <Line 
                  type="monotone" 
                  dataKey="bau" 
                  stroke="#9CA3AF" 
                  strokeWidth={2} 
                  strokeDasharray="8 4"
                  name="BAU (Do Nothing)" 
                  dot={false}
                />
                
                {/* Cumulative line with color change at breakeven */}
                <Line 
                  type="monotone" 
                  dataKey="cumulativeUndiscounted" 
                  stroke="#F97316" 
                  strokeWidth={3} 
                  name="Cumulative Cashflow"
                  dot={(props) => {
                    const { cx, cy, payload } = props;
                    // Highlight breakeven year
                    if (payload.cumulativeUndiscounted > 0 && 
                        cashflowData[cashflowData.indexOf(payload) - 1]?.cumulativeUndiscounted <= 0) {
                      return (
                        <g>
                          <circle cx={cx} cy={cy} r={6} fill="#22C55E" stroke="#fff" strokeWidth={2} />
                          <text 
                            x={cx} 
                            y={cy - 12} 
                            fill="#22C55E" 
                            fontSize={11}
                            fontWeight="bold"
                            textAnchor="middle"
                          >
                            Break-even
                          </text>
                        </g>
                      );
                    }
                    return null;
                  }}
                />
                

              </ComposedChart>
            </ResponsiveContainer>

            {/* Intervention Timeline Legend */}
            <div className="mt-4 p-4 bg-orange-50 border-l-4 border-[#F97316] rounded-lg">
              <p className="text-xs font-semibold text-[#1A1A1A] mb-2">Intervention Timeline:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                {interventionTimeline.map((intervention, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#F97316] rounded-full"></div>
                    <span className="text-[#6B7280]">
                      {intervention.year}: {intervention.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Breakeven Info */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-[#6B7280]">
                <span style={{ fontWeight: 600 }}>Cashflow Story: </span>
                Small optimisation savings in 2025-2026, major CAPEX investments during 2027-2030 (heat pump, glazing, lighting), 
                then steady savings accumulation. Break-even at year {cashflowData.find(d => d.cumulativeUndiscounted > 0)?.year || 'N/A'} 
                when cumulative savings offset all investments. Adjust discount rate and energy escalation to stress-test.
              </p>
            </div>
          </div>

          {/* Cashflow Insights */}
          <div className="mt-6">
            <h4 className="text-sm text-[#1A1A1A] font-semibold mb-3">Cashflow Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FinancialKPICard
                label="IRR"
                value={!isFinite(irr) || isNaN(irr) || irr < 1 ? 'No IRR' : (irr > 100 ? '>100' : `${irr.toFixed(1)}%`)}
                subtitle="Effective return rate over lifetime"
                tooltip="IRR represents the discount rate at which NPV = 0. For long-payback projects, it may not be meaningful."
                valueColor={irr >= 6 ? "text-green-600" : "text-red-600"}
              />
              <FinancialKPICard
                label="DCF"
                value={dcf >= 0 ? `£${(dcf / 1000000).toFixed(1)}M` : `£${(dcf / 1000000).toFixed(1)}M`}
                subtitle="Discounted cumulative cashflow"
                tooltip="Equivalent to NPV. Shows lifetime cash position adjusted for discount rate."
                valueColor={dcf >= 0 ? "text-green-600" : "text-red-600"}
              />
            </div>
          </div>

          {/* CAPEX vs ROI vs Carbon Bubble Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="mb-1">CAPEX vs ROI Prioritisation Tool</h4>
                <p className="text-sm text-[#6B7280]">Click bubbles or table rows below to explore each intervention. Bubble size = CO₂ saved.</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-full">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter by Type
                </Button>
                <Button variant="outline" size="sm" className="rounded-full">
                  Quick Wins Only
                </Button>
                <Button variant="outline" size="sm" className="rounded-full" onClick={() => setSelectedIntervention(null)}>
                  Clear Selection
                </Button>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={380}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="CAPEX" 
                  unit="k" 
                  stroke="#6B7280"
                  domain={[0, 'dataMax + 200']}
                  label={{ value: 'CAPEX (£k)', position: 'insideBottom', offset: -5 }} 
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="ROI" 
                  unit="%" 
                  stroke="#6B7280"
                  domain={[0, 'dataMax + 5']}
                  label={{ value: 'ROI (%)', angle: -90, position: 'insideLeft' }} 
                />
                <ZAxis type="number" dataKey="z" range={[200, 1200]} name="CO₂ Saved" unit="t" />
                <ChartTooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                          <p className="font-semibold mb-2">{data.name}</p>
                          <p className="text-xs text-[#6B7280]">
                            CAPEX: <span className="font-semibold">£{data.capex}k</span>
                          </p>
                          <p className="text-xs text-[#6B7280]">
                            ROI: <span className="font-semibold text-green-600">{data.roi}%</span>
                          </p>
                          <p className="text-xs text-[#6B7280]">
                            CO₂ Saved: <span className="font-semibold text-green-600">{data.carbon}t</span>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Scatter 
                  name="Interventions" 
                  data={interventionBubbleData} 
                  fill="#F97316"
                  shape={(props: any) => {
                    const { cx, cy, payload } = props;
                    const isSelected = selectedIntervention === payload.name;
                    // Calculate bubble size based on z value (carbon saved)
                    const baseRadius = 8;
                    const maxRadius = 35;
                    const scaledRadius = baseRadius + (payload.z / 100) * (maxRadius - baseRadius) / 5;
                    const radius = isSelected ? scaledRadius * 1.3 : scaledRadius;
                    
                    return (
                      <g>
                        <circle
                          cx={cx}
                          cy={cy}
                          r={radius}
                          fill={isSelected ? '#EF4444' : '#F97316'}
                          opacity={isSelected ? 1 : 0.7}
                          stroke={isSelected ? '#FFF' : '#F97316'}
                          strokeWidth={isSelected ? 3 : 1}
                          style={{ cursor: 'pointer' }}
                          onClick={() => setSelectedIntervention(payload.name)}
                        />
                        {/* Label for larger bubbles */}
                        {scaledRadius > 20 && (
                          <text
                            x={cx}
                            y={cy}
                            textAnchor="middle"
                            dy=".3em"
                            fontSize={10}
                            fill="#fff"
                            fontWeight="bold"
                            style={{ pointerEvents: 'none' }}
                          >
                            {payload.name.split(' ')[0]}
                          </text>
                        )}
                      </g>
                    );
                  }}
                />
              </ScatterChart>
            </ResponsiveContainer>

            {/* Commentary */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-[#6B7280]">
                <span style={{ fontWeight: 600 }}>Prioritisation Insight: </span>
                Use this view to balance ROI with carbon impact. High bubbles (top of chart) = faster returns. Large bubbles = higher carbon savings. 
                Click any bubble or table row below to highlight that intervention and see full details. "Quick Wins" have payback under 3 years.
              </p>
            </div>
          </div>

          {/* Link to Measures Table */}
          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-[#F97316] rounded-lg">
            <p className="text-sm text-[#1A1A1A]">
              <span style={{ fontWeight: 600 }}>Interactive Tool: </span>
              The chart and measures table below are linked. Click any intervention in either view to highlight it in both places and compare financial vs carbon metrics.
            </p>
          </div>

          {/* Business Case Summary */}
          <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-5 mt-6">
            <p className="text-sm text-[#1A1A1A]">
              <span className="font-semibold">Business Case Summary:</span> 
              This retrofit achieves a <span className="font-semibold text-green-600">95% carbon reduction</span> 
              and aligns with <span className="font-semibold">CRREM beyond 2050</span>. 
              Despite a neutral NPV at 6%, the <span className="font-semibold">25-year ROI is positive (+{roi25y.toFixed(1)}%)</span>. 
              Combined efficiency gains and improved EPC rating support an estimated 
              <span className="font-semibold text-green-600">+{greenValueUplift}% rental uplift</span> and enhance long-term asset value.
            </p>
          </div>

        </section>

        {/* 4. Retrofit Roadmap & Implementation */}
        <section className="mb-8">
          <div className="mb-4">
            <h3 className="text-[#1A1A1A] mb-1">Retrofit Roadmap & Implementation</h3>
            <p className="text-sm text-[#6B7280]">Implementation timeline aligned with asset events and tenant schedules</p>
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

          {/* Commentary */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-[#6B7280]">
              <span style={{ fontWeight: 600 }}>Roadmap Insight: </span>
              Align retrofit timing with tenant churn and asset lifecycle events (70% of leases ending 2028, boiler end-of-life 2030) to minimise disruption and maximise rental protection. Drag interventions in the timeline to see cashflow impact.
            </p>
          </div>
        </section>

        {/* 5. Intervention Breakdown */}
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
                  {interventionTableData.map((row, idx) => {
                    // Map table initiatives to bubble chart names
                    const bubbleName = row.initiative.includes('Windows') ? 'Double Glazing' :
                                      row.initiative.includes('Lighting') ? 'Low Energy Lighting' :
                                      row.initiative.includes('Heat Pump') ? 'Heat Pump' :
                                      row.initiative.includes('Solar') ? 'Solar PV' :
                                      row.initiative.includes('BMS') ? 'BMS Upgrade' :
                                      row.initiative.includes('Thermostat') ? 'Thermostat' : null;
                    
                    const isSelected = selectedIntervention === bubbleName;
                    
                    return (
                      <TableRow 
                        key={idx} 
                        className={`hover:bg-orange-50 cursor-pointer transition-colors ${isSelected ? 'bg-orange-100 border-l-4 border-[#F97316]' : ''}`}
                        onClick={() => bubbleName && setSelectedIntervention(bubbleName)}
                      >
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
                        <TableCell style={{ fontWeight: isSelected ? 700 : 600 }}>{row.initiative}</TableCell>
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
                    );
                  })}
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

        {/* 6. Footer Actions */}
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