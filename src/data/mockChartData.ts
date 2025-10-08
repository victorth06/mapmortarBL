// Mock data for Impact Snapshot charts

export interface CrremTrajectoryDatum {
  year: number;
  baseline: number;
  scenario: number;
  crrem: number;
}

export interface EnergyWaterfallDatum {
  stage: string;
  eui: number; // energy use intensity (kWh/m²)
  reduction?: number; // percentage reduction from baseline
}

// CRREM Trajectory Chart Data
export const crremTrajectoryData: CrremTrajectoryDatum[] = [
  { year: 2024, baseline: 70, scenario: 70, crrem: 62 },
  { year: 2025, baseline: 68, scenario: 60, crrem: 58 },
  { year: 2026, baseline: 66, scenario: 52, crrem: 54 },
  { year: 2027, baseline: 64, scenario: 46, crrem: 50 },
  { year: 2028, baseline: 62, scenario: 42, crrem: 46 },
  { year: 2029, baseline: 60, scenario: 38, crrem: 42 },
  { year: 2030, baseline: 58, scenario: 34, crrem: 38 },
  { year: 2035, baseline: 52, scenario: 28, crrem: 28 },
  { year: 2040, baseline: 48, scenario: 20, crrem: 20 },
  { year: 2050, baseline: 45, scenario: 15, crrem: 12 },
];

// Energy Waterfall Chart Data - True Waterfall Format
export const energyWaterfallData: EnergyWaterfallDatum[] = [
  { stage: 'Baseline', eui: 260, reduction: 0 },
  { stage: 'Optimisation', eui: -20, reduction: 8 },
  { stage: 'Light Retrofit', eui: -40, reduction: 23 },
  { stage: 'Deep Retrofit', eui: -40, reduction: 38 },
  { stage: 'Renewables', eui: -20, reduction: 46 },
  { stage: 'Final', eui: 140, reduction: 46 },
];

// Monthly Energy Pattern Data
export interface MonthlyEnergyData {
  month: string;
  electricity: number;
  gas: number;
}

export interface MonthlyEnergyPatternData {
  before: MonthlyEnergyData[];
  after: MonthlyEnergyData[];
}

export const monthlyEnergyPatternData: MonthlyEnergyPatternData = {
  before: [
    { month: 'Jan', electricity: 180, gas: 420 },
    { month: 'Feb', electricity: 160, gas: 380 },
    { month: 'Mar', electricity: 170, gas: 400 },
    { month: 'Apr', electricity: 190, gas: 380 },
    { month: 'May', electricity: 210, gas: 360 },
    { month: 'Jun', electricity: 230, gas: 340 },
    { month: 'Jul', electricity: 240, gas: 320 },
    { month: 'Aug', electricity: 235, gas: 330 },
    { month: 'Sep', electricity: 200, gas: 350 },
    { month: 'Oct', electricity: 170, gas: 370 },
    { month: 'Nov', electricity: 160, gas: 390 },
    { month: 'Dec', electricity: 180, gas: 420 },
  ],
  after: [
    { month: 'Jan', electricity: 150, gas: 240 },
    { month: 'Feb', electricity: 140, gas: 210 },
    { month: 'Mar', electricity: 145, gas: 230 },
    { month: 'Apr', electricity: 150, gas: 220 },
    { month: 'May', electricity: 160, gas: 200 },
    { month: 'Jun', electricity: 170, gas: 180 },
    { month: 'Jul', electricity: 180, gas: 170 },
    { month: 'Aug', electricity: 175, gas: 180 },
    { month: 'Sep', electricity: 160, gas: 200 },
    { month: 'Oct', electricity: 150, gas: 220 },
    { month: 'Nov', electricity: 145, gas: 230 },
    { month: 'Dec', electricity: 155, gas: 240 },
  ],
};

// Carbon Intensity by Fuel Type Data
export interface CarbonIntensityByFuelData {
  year: number;
  electricity: number;
  gas: number;
  target: number;
}

export const carbonIntensityByFuelData: CarbonIntensityByFuelData[] = [
  { year: 2024, electricity: 15, gas: 35, target: 45 },
  { year: 2026, electricity: 13, gas: 25, target: 40 },
  { year: 2030, electricity: 10, gas: 15, target: 35 },
  { year: 2035, electricity: 8, gas: 7, target: 25 },
  { year: 2040, electricity: 7, gas: 4, target: 18 },
  { year: 2050, electricity: 5, gas: 2, target: 15 },
];

// MEES Compliance Data
export interface MEESComplianceData {
  summary: Array<{
    band: string;
    count: number;
  }>;
  table: Array<{
    unit: string;
    current: string;
    target: string;
    compliant2027: boolean;
    compliant2030: boolean;
  }>;
}

export const meesComplianceData: MEESComplianceData = {
  summary: [
    { band: 'A', count: 3 },
    { band: 'B', count: 6 },
    { band: 'C', count: 5 },
    { band: 'D', count: 2 },
    { band: 'E', count: 1 },
  ],
  table: [
    { unit: 'A1', current: 'B', target: 'B', compliant2027: true, compliant2030: true },
    { unit: 'A2', current: 'C', target: 'B', compliant2027: true, compliant2030: true },
    { unit: 'A3', current: 'B', target: 'A', compliant2027: true, compliant2030: true },
    { unit: 'B1', current: 'D', target: 'C', compliant2027: false, compliant2030: false },
    { unit: 'B2', current: 'C', target: 'B', compliant2027: true, compliant2030: false },
    { unit: 'B3', current: 'B', target: 'A', compliant2027: true, compliant2030: true },
    { unit: 'C1', current: 'C', target: 'B', compliant2027: true, compliant2030: false },
    { unit: 'C2', current: 'B', target: 'A', compliant2027: true, compliant2030: true },
    { unit: 'C3', current: 'A', target: 'A', compliant2027: true, compliant2030: true },
    { unit: 'D1', current: 'D', target: 'C', compliant2027: false, compliant2030: false },
    { unit: 'D2', current: 'E', target: 'D', compliant2027: false, compliant2030: false },
    { unit: 'E1', current: 'E', target: 'D', compliant2027: false, compliant2030: false },
  ],
};

// Chart color schemes
export const chartColors = {
  baseline: '#EF4444', // red
  scenario: '#F97316', // orange
  crrem: '#3B82F6', // blue
  optimisation: '#3B82F6', // blue
  lightRetrofit: '#F59E0B', // amber
  deepRetrofit: '#9333EA', // purple
  renewables: '#22C55E', // green
  final: '#10B981', // emerald green (for final bar)
  gray: '#9CA3AF', // gray
};
