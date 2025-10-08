// Mock data for CAPEX vs ROI Chart - 2050 Scenario Interventions

export interface CapexVsRoiDatum {
  id: string;
  measure: string;
  group: string;
  capex: number; // in thousands (£k)
  roi: number; // percentage
  carbon_saved: number; // tCO₂
  payback: number | null; // years, null for N/A
}

// CAPEX vs ROI data based on 2050 scenario intervention measures
export const capexVsRoiData: CapexVsRoiDatum[] = [
  // Optimise measures
  {
    id: 'opt-1',
    measure: 'Thermostat Optimization',
    group: 'Optimise',
    capex: 0, // £0
    roi: 999, // Very high ROI for immediate payback
    carbon_saved: 228.6, // 228,609 kgCO₂e
    payback: 0 // Immediate
  },
  {
    id: 'opt-2',
    measure: 'Energy Management',
    group: 'Optimise',
    capex: 140.5, // £140,450
    roi: 155, // High ROI
    carbon_saved: 172.9, // 172,936 kgCO₂e
    payback: 0.6
  },
  
  // Light Retrofit measures
  {
    id: 'light-1',
    measure: 'Demand Control Ventilation',
    group: 'Light Retrofit',
    capex: 421.4, // £421,350
    roi: 10, // Low ROI due to N/A payback
    carbon_saved: 101.2, // 101,174 kgCO₂e
    payback: null // N/A
  },
  {
    id: 'light-2',
    measure: 'Daylighting Control',
    group: 'Light Retrofit',
    capex: 210.7, // £210,670
    roi: 38, // Good ROI
    carbon_saved: 56.5, // 56,494 kgCO₂e
    payback: 2.7
  },
  {
    id: 'light-3',
    measure: 'Lighting Controls',
    group: 'Light Retrofit',
    capex: 210.7, // £210,670
    roi: 80, // Very good ROI
    carbon_saved: 117.2, // 117,249 kgCO₂e
    payback: 1.2
  },
  {
    id: 'light-4',
    measure: 'Low Energy Lighting',
    group: 'Light Retrofit',
    capex: 1264.0, // £1,264,000
    roi: 27, // Moderate ROI
    carbon_saved: 230.3, // 230,282 kgCO₂e
    payback: 3.8
  },
  {
    id: 'light-5',
    measure: 'Equipment Load Reduction',
    group: 'Light Retrofit',
    capex: 140.5, // £140,450
    roi: 235, // Excellent ROI
    carbon_saved: 219.2, // 219,206 kgCO₂e
    payback: 0.4
  },
  {
    id: 'light-6',
    measure: 'DHW Heat Pump',
    group: 'Light Retrofit',
    capex: 506.0, // £506,040
    roi: -6, // Negative ROI due to negative cost savings
    carbon_saved: 148.5, // 148,471 kgCO₂e
    payback: null // N/A
  },
  
  // Deep Retrofit measures
  {
    id: 'deep-1',
    measure: 'MVHR System',
    group: 'Deep Retrofit',
    capex: 4915.7, // £4,915,700
    roi: 1, // Very low ROI
    carbon_saved: 151.9, // 151,870 kgCO₂e
    payback: 83.4
  },
  {
    id: 'deep-2',
    measure: 'Space Heating Heat Pump',
    group: 'Deep Retrofit',
    capex: 386.1, // £386,130
    roi: 5, // Low ROI
    carbon_saved: 161.5, // 161,451 kgCO₂e
    payback: 19.6
  },
  
  // Renewable measures
  {
    id: 'renew-1',
    measure: 'Rooftop PV (74%)',
    group: 'Renewable',
    capex: 1147.9, // £1,147,900
    roi: 13, // Low ROI
    carbon_saved: 120.1, // 120,066 kgCO₂e
    payback: 7.5
  }
];

// EPC C Scenario (Pathway Refresh) CAPEX vs ROI data
export const epcCCapexVsRoiData: CapexVsRoiDatum[] = [
  // Optimise measures
  {
    id: 'epc-opt-1',
    measure: 'Thermostat Optimization',
    group: 'Optimise',
    capex: 0, // £0
    roi: 999, // Very high ROI for immediate payback
    carbon_saved: 228.6, // 228,609 kgCO₂e
    payback: 0 // Immediate
  },
  {
    id: 'epc-opt-2',
    measure: 'BMS Analytics',
    group: 'Optimise',
    capex: 140.5, // £140,450
    roi: 155, // High ROI
    carbon_saved: 172.9, // 172,936 kgCO₂e
    payback: 0.6
  },
  
  // Light Retrofit measures
  {
    id: 'epc-light-1',
    measure: 'Demand Control Ventilation',
    group: 'Light Retrofit',
    capex: 421.4, // £421,350
    roi: 10, // Low ROI due to N/A payback
    carbon_saved: 101.2, // 101,174 kgCO₂e
    payback: null // N/A
  },
  {
    id: 'epc-light-2',
    measure: 'Lighting Controls',
    group: 'Light Retrofit',
    capex: 210.7, // £210,670
    roi: 80, // Very good ROI
    carbon_saved: 117.2, // 117,249 kgCO₂e
    payback: 1.2
  },
  {
    id: 'epc-light-3',
    measure: 'DHW Heat Pump',
    group: 'Light Retrofit',
    capex: 386.1, // £386,130
    roi: -8, // Negative ROI due to negative cost savings
    carbon_saved: 148.5, // 148,471 kgCO₂e
    payback: null // N/A
  },
  
  // Deep Retrofit measures
  {
    id: 'epc-deep-1',
    measure: 'Chiller COP Upgrade',
    group: 'Deep Retrofit',
    capex: 118.6, // £118,560
    roi: 60, // Good ROI
    carbon_saved: 56.9, // 56,875 kgCO₂e
    payback: 1.7
  },
  {
    id: 'epc-deep-2',
    measure: 'Space Heating Heat Pump',
    group: 'Deep Retrofit',
    capex: 386.1, // £386,130
    roi: 5, // Low ROI
    carbon_saved: 161.5, // 161,451 kgCO₂e
    payback: 19.6
  },
  
  // Renewable measures
  {
    id: 'epc-renew-1',
    measure: 'Rooftop PV (74%)',
    group: 'Renewable',
    capex: 1147.9, // £1,147,900
    roi: 13, // Low ROI
    carbon_saved: 120.1, // 120,066 kgCO₂e
    payback: 7.5
  }
];