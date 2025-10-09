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

// Energy Waterfall Chart Data - True Waterfall Format (Updated for 2050 scenario)
export const energyWaterfallData: EnergyWaterfallDatum[] = [
  { stage: 'Baseline', eui: 260, reduction: 0 },
  { stage: 'Optimisation', eui: -20, reduction: 8 }, // Based on 388,738 kgCO₂e saving
  { stage: 'Light Retrofit', eui: -40, reduction: 23 }, // Based on 949,952 kgCO₂e saving
  { stage: 'Deep Retrofit', eui: -40, reduction: 38 }, // Based on 201,550 kgCO₂e saving
  { stage: 'Renewables', eui: -20, reduction: 46 }, // Based on 120,066 kgCO₂e saving
  { stage: 'Final', eui: 140, reduction: 46 }, // Total 1,323,290 kgCO₂e saving (95% reduction)
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

// Intervention Measures Data Interfaces
export interface InterventionMeasure {
  id: string;
  category: 'Optimise' | 'Light Retrofit' | 'Deep Retrofit' | 'Renewable';
  initiative: string;
  cost: number; // £
  electricitySaving: number; // kWh
  gasSaving: number; // kWh
  costSaving: number; // £
  co2eSaving: number; // kgCO₂e
  paybackYears: number | null; // null for N/A
}

export interface InterventionCategory {
  name: string;
  measures: InterventionMeasure[];
  totalCost: number;
  totalElectricitySaving: number;
  totalGasSaving: number;
  totalCostSaving: number;
  totalCo2eSaving: number;
  averagePaybackYears: number;
}

// 2050 Scenario Intervention Measures Data
export const interventionMeasuresData: InterventionCategory[] = [
  {
    name: 'Optimise',
    measures: [
      {
        id: 'opt-1',
        category: 'Optimise',
        initiative: 'Adjust thermostat setpoints by degrees to optimise heating and cooling in line with occupancy patterns',
        cost: 0,
        electricitySaving: 618491,
        gasSaving: 549600,
        costSaving: 193784,
        co2eSaving: 228609,
        paybackYears: 0 // Immediate
      },
      {
        id: 'opt-2',
        category: 'Optimise',
        initiative: 'Reduce electricity consumption through operational tuning and energy management',
        cost: 140450,
        electricitySaving: 835158,
        gasSaving: 0,
        costSaving: 217141,
        co2eSaving: 172936,
        paybackYears: 0.6
      }
    ],
    totalCost: 140450,
    totalElectricitySaving: 1391799,
    totalGasSaving: 549600,
    totalCostSaving: 394844,
    totalCo2eSaving: 388738,
    averagePaybackYears: 0.4
  },
  {
    name: 'Light Retrofit',
    measures: [
      {
        id: 'light-1',
        category: 'Light Retrofit',
        initiative: 'Add demand control ventilation to regulate airflow rates based on occupancy',
        cost: 421350,
        electricitySaving: -396385,
        gasSaving: 1001767,
        costSaving: 42954,
        co2eSaving: 101174,
        paybackYears: null // N/A
      },
      {
        id: 'light-2',
        category: 'Light Retrofit',
        initiative: 'Add daylighting control to reduce artificial lighting when natural light is sufficient',
        cost: 210670,
        electricitySaving: 316468,
        gasSaving: -49403,
        costSaving: 79317,
        co2eSaving: 56494,
        paybackYears: 2.7
      },
      {
        id: 'light-3',
        category: 'Light Retrofit',
        initiative: 'Install lighting controls such as occupancy sensors and timers',
        cost: 210670,
        electricitySaving: 681290,
        gasSaving: -130246,
        costSaving: 169321,
        co2eSaving: 117249,
        paybackYears: 1.2
      },
      {
        id: 'light-4',
        category: 'Light Retrofit',
        initiative: 'Upgrade to low energy lighting to reduce electricity demand',
        cost: 1264000,
        electricitySaving: 1352902,
        gasSaving: -272581,
        costSaving: 335400,
        co2eSaving: 230282,
        paybackYears: 3.8
      },
      {
        id: 'light-5',
        category: 'Light Retrofit',
        initiative: 'Reduce electric equipment loads through efficiency measures and operational adjustments',
        cost: 140450,
        electricitySaving: 1345911,
        gasSaving: -325218,
        costSaving: 330424,
        co2eSaving: 219206,
        paybackYears: 0.4
      },
      {
        id: 'light-6',
        category: 'Light Retrofit',
        initiative: 'Replace DHW boiler with a simple air source heat pump for water heating (efficiency rating 2.5)',
        cost: 506040,
        electricitySaving: -410265,
        gasSaving: 1276032,
        costSaving: -30107,
        co2eSaving: 148471,
        paybackYears: null // N/A
      }
    ],
    totalCost: 2753180,
    totalElectricitySaving: 2723036,
    totalGasSaving: 2110603,
    totalCostSaving: 834626,
    totalCo2eSaving: 949952,
    averagePaybackYears: 3.3
  },
  {
    name: 'Deep Retrofit',
    measures: [
      {
        id: 'deep-1',
        category: 'Deep Retrofit',
        initiative: 'Install mechanical ventilation with heat recovery to improve heat retention and reduce energy demand',
        cost: 4915700,
        electricitySaving: 47525,
        gasSaving: 776412,
        costSaving: 58941,
        co2eSaving: 151870,
        paybackYears: 83.4
      },
      {
        id: 'deep-2',
        category: 'Deep Retrofit',
        initiative: 'Replace boiler with an air source heat pump for space heating (efficiency rating 3.5)',
        cost: 386130,
        electricitySaving: -173252,
        gasSaving: 1078697,
        costSaving: 19676,
        co2eSaving: 161451,
        paybackYears: 19.6
      }
    ],
    totalCost: 5301830,
    totalElectricitySaving: 20399,
    totalGasSaving: 1078697,
    totalCostSaving: 70026,
    totalCo2eSaving: 201550,
    averagePaybackYears: 75.7
  },
  {
    name: 'Renewable',
    measures: [
      {
        id: 'renew-1',
        category: 'Renewable',
        initiative: 'Add rooftop PV (74%) to generate on-site renewable electricity',
        cost: 1147900,
        electricitySaving: 592551,
        gasSaving: -14398,
        costSaving: 153199,
        co2eSaving: 120066,
        paybackYears: 7.5
      }
    ],
    totalCost: 1147900,
    totalElectricitySaving: 592551,
    totalGasSaving: -14398,
    totalCostSaving: 153199,
    totalCo2eSaving: 120066,
    averagePaybackYears: 7.5
  }
];

// Overall totals from the 2050 scenario
export const scenario2050Totals = {
  totalCost: 9343360,
  totalElectricitySaving: 4310326,
  totalGasSaving: 2354729,
  totalCostSaving: 1261968,
  totalCo2eSaving: 1323290,
  averagePaybackYears: 7.4
};

// EPC C Scenario (Pathway Refresh) Intervention Measures Data
export const epcCInterventionMeasuresData: InterventionCategory[] = [
  {
    name: 'Optimise',
    measures: [
      {
        id: 'epc-opt-1',
        category: 'Optimise',
        initiative: 'Adjust thermostat setpoints - Optimise heating (+2 °C) and cooling (-2 °C) setpoints to match occupancy patterns while maintaining comfort',
        cost: 0,
        electricitySaving: 618491,
        gasSaving: 549600,
        costSaving: 193784,
        co2eSaving: 228609,
        paybackYears: 0 // Immediate
      },
      {
        id: 'epc-opt-2',
        category: 'Optimise',
        initiative: 'Reduce electricity consumption - Use BMS analytics to identify and remove avoidable electricity use across all building systems',
        cost: 140450,
        electricitySaving: 835158,
        gasSaving: 0,
        costSaving: 217141,
        co2eSaving: 172936,
        paybackYears: 0.6
      }
    ],
    totalCost: 140450,
    totalElectricitySaving: 1391799,
    totalGasSaving: 549600,
    totalCostSaving: 394844,
    totalCo2eSaving: 388738,
    averagePaybackYears: 0.4
  },
  {
    name: 'Light Retrofit',
    measures: [
      {
        id: 'epc-light-1',
        category: 'Light Retrofit',
        initiative: 'Add demand control ventilation - Regulate ventilation rates using occupancy (CO₂) sensors to minimise fan energy and associated heating/cooling loads',
        cost: 421350,
        electricitySaving: -396385,
        gasSaving: 1001767,
        costSaving: 42954,
        co2eSaving: 101174,
        paybackYears: null // N/A
      },
      {
        id: 'epc-light-2',
        category: 'Light Retrofit',
        initiative: 'Install lighting controls - Fit occupancy and daylight sensors (targeting ~25% lighting energy reduction) to minimise operational hours and energy waste',
        cost: 210670,
        electricitySaving: 681290,
        gasSaving: -130246,
        costSaving: 169321,
        co2eSaving: 117249,
        paybackYears: 1.2
      },
      {
        id: 'epc-light-3',
        category: 'Light Retrofit',
        initiative: 'Replace DHW boiler with ASHP - Electrify domestic hot water generation with an air source heat pump (efficiency rating 2.5)',
        cost: 386130,
        electricitySaving: -410265,
        gasSaving: 1276032,
        costSaving: -30107,
        co2eSaving: 148471,
        paybackYears: null // N/A
      }
    ],
    totalCost: 1018150,
    totalElectricitySaving: -35993,
    totalGasSaving: 2258893,
    totalCostSaving: 126175,
    totalCo2eSaving: 405766,
    averagePaybackYears: 8.1
  },
  {
    name: 'Deep Retrofit',
    measures: [
      {
        id: 'epc-deep-1',
        category: 'Deep Retrofit',
        initiative: 'Increase chiller COP - Upgrade chiller components and controls to improve performance and reduce cooling energy use',
        cost: 118560,
        electricitySaving: 274666,
        gasSaving: 0,
        costSaving: 71413,
        co2eSaving: 56875,
        paybackYears: 1.7
      },
      {
        id: 'epc-deep-2',
        category: 'Deep Retrofit',
        initiative: 'Replace gas boiler with ASHP - Electrify space heating with a high-efficiency air source heat pump (efficiency rating 3.5)',
        cost: 386130,
        electricitySaving: -173252,
        gasSaving: 1078697,
        costSaving: 19676,
        co2eSaving: 161451,
        paybackYears: 19.6
      }
    ],
    totalCost: 504690,
    totalElectricitySaving: 101414,
    totalGasSaving: 1078697,
    totalCostSaving: 91090,
    totalCo2eSaving: 218326,
    averagePaybackYears: 5.5
  },
  {
    name: 'Renewable',
    measures: [
      {
        id: 'epc-renew-1',
        category: 'Renewable',
        initiative: 'Add rooftop PV (74%) - Install photovoltaic panels to generate on-site renewable electricity and offset grid consumption',
        cost: 1147900,
        electricitySaving: 592551,
        gasSaving: -14398,
        costSaving: 153199,
        co2eSaving: 120066,
        paybackYears: 7.5
      }
    ],
    totalCost: 1147900,
    totalElectricitySaving: 592551,
    totalGasSaving: -14398,
    totalCostSaving: 153199,
    totalCo2eSaving: 120066,
    averagePaybackYears: 7.5
  }
];

// Overall totals from the EPC C scenario (Pathway Refresh)
export const epcCScenarioTotals = {
  totalCost: 2811190,
  totalElectricitySaving: 2242148,
  totalGasSaving: 2354729,
  totalCostSaving: 724242,
  totalCo2eSaving: 895032,
  averagePaybackYears: 3.9
};

// Baseline Building Data (Current State)
export interface BuildingBaselineData {
  // Energy Data
  totalEnergyUse: number; // MWh/year
  electricityUse: number; // kWh/year
  gasUse: number; // kWh/year
  energyUseIntensity: number; // kWh/m²
  electricityIntensity: number; // kWh/m²
  gasIntensity: number; // kWh/m²
  
  // Carbon Data
  totalCarbon: number; // tCO₂e/year
  carbonIntensity: number; // kgCO₂/m²
  
  // Cost Data
  annualSpend: number; // £/year
  costPerM2: number; // £/m²
  
  // Performance Metrics
  epcRating: string;
  cibseBenchmark: string;
  transitionRisk: string;
  
  // Building Details
  buildingArea: number; // m²
  buildingName: string;
}

export const buildingBaselineData: BuildingBaselineData = {
  // Energy Data (calculated for 135 Bishopsgate - 43,930 sq ft = 4,081 m²)
  totalEnergyUse: 490.0, // MWh/year (490,000 kWh)
  electricityUse: 294000, // kWh/year (72 kWh/m²)
  gasUse: 196000, // kWh/year (48 kWh/m²)
  energyUseIntensity: 120, // kWh/m²
  electricityIntensity: 72, // kWh/m²
  gasIntensity: 48, // kWh/m²
  
  // Carbon Data
  totalCarbon: 98.5, // tCO₂e/year (98,500 kg)
  carbonIntensity: 10.8, // kgCO₂/m²
  
  // Cost Data (using provided rates: 26.35p/kWh electricity, 6.29p/kWh gas)
  annualSpend: 83400, // £/year (294k * 0.2635 + 196k * 0.0629)
  costPerM2: 20.4, // £/m²
  
  // Performance Metrics
  epcRating: "D",
  cibseBenchmark: "Below Average",
  transitionRisk: "Low",
  
  // Building Details
  buildingArea: 4081, // m² (43,930 sq ft converted)
  buildingName: "135 Bishopsgate"
};

// Unit Data Interface
export interface UnitData {
  id: string;
  unitName: string;
  address: string;
  grossInternalArea: number; // sq ft
  grossInternalAreaM2: number; // m²
  occupancyClass: string;
  annualRent: number; // £/year (at £100/sq ft)
  energyUse: number; // kWh/year (proportional to area)
  electricityUse: number; // kWh/year
  gasUse: number; // kWh/year
  energyCost: number; // £/year
}

// 135 Bishopsgate Unit Data
export const bishopsgateUnits: UnitData[] = [
  {
    id: 'unit-1',
    unitName: 'The Maple Spoon',
    address: 'Ground-1st Floor 135 Bishopsgate London EC2M 3YD',
    grossInternalArea: 4012,
    grossInternalAreaM2: 372.7,
    occupancyClass: 'Food & Beverage',
    annualRent: 401200, // £100/sq ft
    energyUse: 45000, // proportional to area
    electricityUse: 27000,
    gasUse: 18000,
    energyCost: 7500 // £/year
  },
  {
    id: 'unit-2',
    unitName: 'FKT',
    address: '10th Floor 135 Bishopsgate London EC2M 3YD',
    grossInternalArea: 4039,
    grossInternalAreaM2: 375.2,
    occupancyClass: 'Office',
    annualRent: 403900, // £100/sq ft
    energyUse: 45000, // proportional to area
    electricityUse: 27000,
    gasUse: 18000,
    energyCost: 7500 // £/year
  },
  {
    id: 'unit-3',
    unitName: 'VACANT',
    address: '12th Floor 135 Bishopsgate London EC2M 3YD',
    grossInternalArea: 695,
    grossInternalAreaM2: 64.6,
    occupancyClass: 'Vacant',
    annualRent: 0, // Vacant unit
    energyUse: 8000, // proportional to area
    electricityUse: 4800,
    gasUse: 3200,
    energyCost: 1350 // £/year
  },
  {
    id: 'unit-4',
    unitName: 'TN CAP',
    address: '2nd-4th Floors 135 Bishopsgate London EC2M 3YD',
    grossInternalArea: 12778,
    grossInternalAreaM2: 1187.1,
    occupancyClass: 'Office',
    annualRent: 1277800, // £100/sq ft
    energyUse: 142000, // proportional to area
    electricityUse: 85200,
    gasUse: 56800,
    energyCost: 23500 // £/year
  },
  {
    id: 'unit-5',
    unitName: 'TN CAP',
    address: '9th Floor 135 Bishopsgate London EC2M 3YD',
    grossInternalArea: 2443,
    grossInternalAreaM2: 227.0,
    occupancyClass: 'Office',
    annualRent: 244300, // £100/sq ft
    energyUse: 27000, // proportional to area
    electricityUse: 16200,
    gasUse: 10800,
    energyCost: 4500 // £/year
  },
  {
    id: 'unit-6',
    unitName: 'TN CAP',
    address: '11th Floor 135 Bishopsgate London EC2M 3YD',
    grossInternalArea: 1611,
    grossInternalAreaM2: 149.7,
    occupancyClass: 'Office',
    annualRent: 161100, // £100/sq ft
    energyUse: 18000, // proportional to area
    electricityUse: 10800,
    gasUse: 7200,
    energyCost: 3000 // £/year
  },
  {
    id: 'unit-7',
    unitName: 'McKay',
    address: '5th-8th Floors 135 Bishopsgate London EC2M 3YD',
    grossInternalArea: 16155,
    grossInternalAreaM2: 1500.8,
    occupancyClass: 'Office',
    annualRent: 1615500, // £100/sq ft
    energyUse: 180000, // proportional to area
    electricityUse: 108000,
    gasUse: 72000,
    energyCost: 30000 // £/year
  }
];

// Scenario Impact Data
export interface ScenarioImpactData {
  energyReduction: number; // percentage
  carbonReduction: number; // percentage
  costSavings: number; // £/year
  paybackYears: number;
  strandedYear: number; // when building becomes non-compliant
}

export const scenarioImpactData = {
  baseline: {
    energyReduction: 0,
    carbonReduction: 0,
    costSavings: 0,
    paybackYears: 0,
    strandedYear: 2029
  },
  epcC: {
    energyReduction: 42, // Based on EPC C savings vs baseline
    carbonReduction: 84, // Based on EPC C CO₂e savings
    costSavings: 35000, // £/year scaled for 135 Bishopsgate (42% of £83.4k)
    paybackYears: 3.9,
    strandedYear: 2036
  },
  netZero2050: {
    energyReduction: 80, // Based on 2050 scenario savings
    carbonReduction: 95, // Based on 2050 scenario CO₂e savings
    costSavings: 66700, // £/year scaled for 135 Bishopsgate (80% of £83.4k)
    paybackYears: 7.4,
    strandedYear: 2050
  }
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
