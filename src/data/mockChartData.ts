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
