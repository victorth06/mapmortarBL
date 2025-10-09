// Centralized building and scenario configuration
// This file ensures data consistency across all components

export interface UnitData {
  id: string;
  name: string;
  floor: string;
  nia: number; // m²
  epcRating: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'Unknown';
  epcScore: number | null;
  status: string;
  annualRent: number; // £/year
  meesRisk: boolean;
}

export interface BuildingConfig {
  // Basic Building Information
  id: string;
  name: string;
  address: string;
  postcode: string;
  buildingArea: number; // m²
  buildingAreaSqft: number; // sq ft
  constructionYear: number;
  buildingType: string;
  
  // Energy Configuration
  energyRates: {
    electricity: number; // p/kWh
    gas: number; // p/kWh
  };
  
  // Baseline Performance
  baseline: {
    totalEnergyUse: number; // MWh/year
    electricityUse: number; // kWh/year
    gasUse: number; // kWh/year
    energyUseIntensity: number; // kWh/m²
    totalCarbon: number; // tCO₂e/year
    carbonIntensity: number; // kgCO₂/m²
    annualSpend: number; // £/year
    costPerM2: number; // £/m²
    epcRating: string;
    crremStrandedYear: number;
  };
  
  // Rental Configuration
  rental: {
    averageRentPerSqft: number; // £/sq ft
    totalAnnualRent: number; // £/year
    occupancyRate: number; // percentage
  };
  
  // Unit-level data
  units: UnitData[];
}

export interface ScenarioConfig {
  id: string;
  name: string;
  description: string;
  targetYear: number;
  scenarioType: 'epc_c' | 'net_zero_2050' | 'do_nothing';
  
  // Financial Metrics
  capex: number; // £
  annualSavings: number; // £/year
  paybackYears: number;
  rentProtected: number; // £
  rentalUplift: number; // £ (ESG premium)
  
  // Advanced Financial Metrics
  roi25y: number; // percentage
  npv6percent: number; // £
  carbonPaybackYears: number; // years
  irr: number; // percentage
  dcf: number; // £
  greenValueUplift: number; // percentage
  
  // Environmental Impact
  energyReduction: number; // percentage
  carbonReduction: number; // percentage
  
  // Compliance
  crremAlignedUntil: number;
  
  // Intervention Details
  totalMeasures: number;
  categories: {
    optimise: number; // percentage
    lightRetrofit: number; // percentage
    deepRetrofit: number; // percentage
    renewable: number; // percentage
  };
}

// 135 Bishopsgate Configuration
export const buildingConfig: BuildingConfig = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  name: '135 Bishopsgate',
  address: '135 Bishopsgate, Broadgate, London EC2M 3YD',
  postcode: 'EC2M 3YD',
  buildingArea: 4081, // m²
  buildingAreaSqft: 43930, // sq ft
  constructionYear: 2010,
  buildingType: 'Office',
  
  energyRates: {
    electricity: 26.35, // p/kWh
    gas: 6.29, // p/kWh
  },
  
  baseline: {
    totalEnergyUse: 490, // MWh/year
    electricityUse: 294000, // kWh/year
    gasUse: 196000, // kWh/year
    energyUseIntensity: 120, // kWh/m²
    totalCarbon: 98.5, // tCO₂e/year
    carbonIntensity: 10.8, // kgCO₂/m²
    annualSpend: 83400, // £/year
    costPerM2: 20.4, // £/m²
    epcRating: 'D',
    crremStrandedYear: 2029,
  },
  
  rental: {
    averageRentPerSqft: 100, // £/sq ft
    totalAnnualRent: 4393000, // £/year (43,930 sq ft × £100)
    occupancyRate: 98.3, // percentage
  },
  
  // Unit-level data based on EPC Rating by Unit
  units: [
    {
      id: 'unit-1',
      name: 'The Maple Spoon',
      floor: 'G-1',
      nia: 4012, // m²
      epcRating: 'C',
      epcScore: 60,
      status: 'Compliant',
      annualRent: 401200, // £100/sq ft × 4,012 m²
      meesRisk: false,
    },
    {
      id: 'unit-2',
      name: 'FKT',
      floor: '10',
      nia: 4039, // m²
      epcRating: 'C',
      epcScore: 67,
      status: 'Compliant',
      annualRent: 403900, // £100/sq ft × 4,039 m²
      meesRisk: false,
    },
    {
      id: 'unit-3',
      name: 'VACANT',
      floor: '12',
      nia: 695, // m²
      epcRating: 'C',
      epcScore: 75,
      status: 'Compliant',
      annualRent: 0, // Vacant unit
      meesRisk: false,
    },
    {
      id: 'unit-4',
      name: 'TN CAP',
      floor: '2-4',
      nia: 12778, // m²
      epcRating: 'D',
      epcScore: 85,
      status: 'MEES Risk',
      annualRent: 1277800, // £100/sq ft × 12,778 m²
      meesRisk: true,
    },
    {
      id: 'unit-5',
      name: 'TN CAP',
      floor: '9',
      nia: 2443, // m²
      epcRating: 'D',
      epcScore: 88,
      status: 'MEES Risk',
      annualRent: 244300, // £100/sq ft × 2,443 m²
      meesRisk: true,
    },
    {
      id: 'unit-6',
      name: 'TN CAP',
      floor: '11',
      nia: 1611, // m²
      epcRating: 'D',
      epcScore: 87,
      status: 'MEES Risk',
      annualRent: 161100, // £100/sq ft × 1,611 m²
      meesRisk: true,
    },
    {
      id: 'unit-7',
      name: 'McKay',
      floor: '5-8',
      nia: 16155, // m²
      epcRating: 'Unknown',
      epcScore: null,
      status: 'No EPC Lodged',
      annualRent: 1615500, // £100/sq ft × 16,155 m²
      meesRisk: true, // Assume below C since no EPC lodged
    },
  ],
};

// Scenario Configurations
export const scenarioConfigs: ScenarioConfig[] = [
  {
    id: 'do-nothing',
    name: 'Do Nothing',
    description: 'No intervention - baseline scenario',
    targetYear: 2029,
    scenarioType: 'do_nothing',
    capex: 0,
    annualSavings: 0,
    paybackYears: 0,
    rentProtected: 4100000, // £4.1M - all rent at risk
    rentalUplift: 0,
    roi25y: 0,
    npv6percent: 0,
    carbonPaybackYears: 0,
    irr: 0,
    dcf: 0,
    greenValueUplift: 0,
    energyReduction: 0,
    carbonReduction: 0,
    crremAlignedUntil: 2029,
    totalMeasures: 0,
    categories: {
      optimise: 0,
      lightRetrofit: 0,
      deepRetrofit: 0,
      renewable: 0,
    },
  },
  {
    id: 'epc-c-2027',
    name: 'EPC C by 2027',
    description: 'Achieves EPC C by 2027',
    targetYear: 2027,
    scenarioType: 'epc_c',
    capex: 2500000, // £2.5M
    annualSavings: 68000, // £68k/year
    paybackYears: 8.5,
    rentProtected: 3300000, // £3.3M - partial protection
    rentalUplift: 0,
    roi25y: 8.4, // percentage
    npv6percent: -500000, // -£0.5M
    carbonPaybackYears: 10,
    irr: 3.8, // percentage
    dcf: -500000, // -£0.5M
    greenValueUplift: 0,
    energyReduction: 35,
    carbonReduction: 35,
    crremAlignedUntil: 2036,
    totalMeasures: 7,
    categories: {
      optimise: 10,
      lightRetrofit: 35,
      deepRetrofit: 45,
      renewable: 10,
    },
  },
  {
    id: 'net-zero-2050',
    name: 'Net Zero 2050',
    description: 'Near-complete decarbonisation',
    targetYear: 2050,
    scenarioType: 'net_zero_2050',
    capex: 6200000, // £6.2M
    annualSavings: 142000, // £142k/year
    paybackYears: 11,
    rentProtected: 4100000, // £4.1M
    rentalUplift: 205000, // £205k ESG premium
    roi25y: 12.3, // percentage
    npv6percent: -300000, // -£0.3M
    carbonPaybackYears: 12,
    irr: 4.2, // percentage
    dcf: -300000, // -£0.3M
    greenValueUplift: 6.5, // percentage
    energyReduction: 58,
    carbonReduction: 95,
    crremAlignedUntil: 2050,
    totalMeasures: 11,
    categories: {
      optimise: 10,
      lightRetrofit: 35,
      deepRetrofit: 45,
      renewable: 10,
    },
  },
];

// Helper functions to get scenario data
export const getScenarioConfig = (scenarioId: string): ScenarioConfig | undefined => {
  return scenarioConfigs.find(scenario => scenario.id === scenarioId);
};

export const getScenarioConfigByName = (scenarioName: string): ScenarioConfig | undefined => {
  return scenarioConfigs.find(scenario => 
    scenario.name.toLowerCase().includes(scenarioName.toLowerCase()) ||
    scenarioName.toLowerCase().includes(scenario.name.toLowerCase())
  );
};

// Calculate derived values
export const calculateProjectedValues = (scenario: ScenarioConfig) => {
  const baseline = buildingConfig.baseline;
  
  return {
    projectedEnergyUse: baseline.totalEnergyUse * (1 - scenario.energyReduction / 100),
    projectedCarbon: baseline.totalCarbon * (1 - scenario.carbonReduction / 100),
    projectedSpend: baseline.annualSpend - scenario.annualSavings,
    totalRentProtected: scenario.rentProtected + scenario.rentalUplift,
  };
};

// Building-level constants
export const buildingConstants = {
  // Risk values - calculated from unit data
  rentAtRisk2027: 3293700, // £3.29M at risk by 2027 (units with D rating + no EPC)
  rentAtRisk2030: 805400, // £0.81M at risk by 2030 (units with C rating that need B)
  
  // Benchmark values
  reebBenchmark: 12, // percentage above REEB benchmark
  cibseBenchmark: 18, // percentage above CIBSE TM46 Good Practice
  costBenchmark: 8, // percentage above cost benchmark
  
  // Sensitivity analysis values
  sensitivityAnalysis: {
    discountRateImprovement: 400000, // +£0.4M improvement from 6% to 5%
    energyInflationBenefit: 300000, // +£0.3M from 2% energy inflation
    capexDelayCost: 200000, // -£0.2M from 2-year CAPEX delay
  },
  
  // Breakeven assumptions
  breakevenYear: 2031,
  discountRate: 6, // percentage
};

// Unit-level calculations
export const calculateRentAtRisk = () => {
  const units = buildingConfig.units;
  
  // Units at immediate risk (D rating or no EPC) - need C by 2027
  const immediateRiskUnits = units.filter(unit => 
    unit.epcRating === 'D' || unit.epcRating === 'Unknown' || unit.meesRisk
  );
  const immediateRiskRent = immediateRiskUnits.reduce((sum, unit) => sum + unit.annualRent, 0);
  
  // Units at future risk (C rating) - need B by 2030
  const futureRiskUnits = units.filter(unit => 
    unit.epcRating === 'C' && !unit.meesRisk
  );
  const futureRiskRent = futureRiskUnits.reduce((sum, unit) => sum + unit.annualRent, 0);
  
  return {
    immediateRisk2027: immediateRiskRent,
    futureRisk2030: futureRiskRent,
    totalAtRisk: immediateRiskRent + futureRiskRent,
    immediateRiskUnits: immediateRiskUnits.length,
    futureRiskUnits: futureRiskUnits.length,
  };
};

// Risk calculations
export const calculateRentalRisk = () => {
  const baseline = buildingConfig.baseline;
  const totalRent = buildingConfig.rental.totalAnnualRent;
  const yearsToStranding = baseline.crremStrandedYear - new Date().getFullYear();
  
  return {
    totalRentAtRisk: totalRent * yearsToStranding,
    yearsToStranding,
    annualRentAtRisk: totalRent,
  };
};
