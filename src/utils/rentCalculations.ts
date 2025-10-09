import type { UnitData } from '../config/buildingConfig';

export interface RentCalculationParams {
  epcAUpliftPercent: number; // e.g., 8 for 8% uplift for EPC A
  epcBUpliftPercent: number; // e.g., 5 for 5% uplift for EPC B
}

export interface RentProtectedResult {
  rentProtected: number;
  rentUplift: number;
  unitsAtRisk2027: number;
  unitsAtRisk2030: number;
  totalRentAtRisk2027: number;
  totalRentAtRisk2030: number;
  breakdown: {
    unitId: string;
    unitName: string;
    currentEpc: string | null;
    postEpc: string;
    currentRent: number;
    rentProtected: number;
    rentUplift: number;
    totalBenefit: number;
    reason: string;
  }[];
}

/**
 * Calculate rent protected and uplift for a scenario based on EPC improvements
 */
export function calculateRentProtected(
  units: UnitData[],
  scenarioType: 'epc_c_2027' | 'net_zero_2050' | 'bau',
  params: RentCalculationParams
): RentProtectedResult {
  const breakdown: RentProtectedResult['breakdown'] = [];
  let totalRentProtected = 0;
  let totalRentUplift = 0;
  let unitsAtRisk2027 = 0;
  let unitsAtRisk2030 = 0;
  let totalRentAtRisk2027 = 0;
  let totalRentAtRisk2030 = 0;

  units.forEach(unit => {
    const currentEpc = unit.epcRating;
    const currentRent = unit.annualRent;
    
    // Determine post-scenario EPC rating
    let postEpc = currentEpc;
    let reason = 'No change';
    
    if (scenarioType === 'epc_c_2027') {
      // EPC C by 2027: Bring all units to at least EPC C
      if (['D', 'E', 'F', 'G', 'Unknown'].includes(currentEpc)) {
        postEpc = 'C';
        reason = 'Upgraded to EPC C for 2027 compliance';
      } else if (currentEpc === 'C') {
        reason = 'Already EPC C compliant';
      } else if (['A', 'B'].includes(currentEpc)) {
        reason = 'Already above EPC C standard';
      }
    } else if (scenarioType === 'net_zero_2050') {
      // Net Zero 2050: Bring all units to at least EPC B
      if (['C', 'D', 'E', 'F', 'G', 'Unknown'].includes(currentEpc)) {
        postEpc = 'B';
        reason = 'Upgraded to EPC B for 2030 compliance';
      } else if (currentEpc === 'B') {
        reason = 'Already EPC B compliant';
      } else if (currentEpc === 'A') {
        reason = 'Already above EPC B standard';
      }
    } else {
      // Business as usual: No changes
      reason = 'No retrofit - business as usual';
    }

    // Calculate rent protected (rent that would be at risk without retrofit)
    let rentProtected = 0;
    let rentUplift = 0;
    
    // Check if unit would be at risk without retrofit
    const wouldBeAtRisk2027 = ['D', 'E', 'F', 'G', 'Unknown'].includes(currentEpc);
    const wouldBeAtRisk2030 = ['C', 'D', 'E', 'F', 'G', 'Unknown'].includes(currentEpc);
    
    if (wouldBeAtRisk2027) {
      unitsAtRisk2027++;
      totalRentAtRisk2027 += currentRent;
    }
    
    if (wouldBeAtRisk2030) {
      unitsAtRisk2030++;
      totalRentAtRisk2030 += currentRent;
    }
    
    // Rent protected = rent that would be at risk
    if (scenarioType !== 'bau' && (wouldBeAtRisk2027 || wouldBeAtRisk2030)) {
      rentProtected = currentRent;
    }
    
    // Calculate rent uplift for high-performing EPC ratings
    if (scenarioType !== 'bau') {
      if (postEpc === 'A') {
        rentUplift = currentRent * (params.epcAUpliftPercent / 100);
      } else if (postEpc === 'B') {
        rentUplift = currentRent * (params.epcBUpliftPercent / 100);
      }
    }
    
    const totalBenefit = rentProtected + rentUplift;
    totalRentProtected += rentProtected;
    totalRentUplift += rentUplift;
    
    breakdown.push({
      unitId: unit.id,
      unitName: unit.name,
      currentEpc,
      postEpc,
      currentRent,
      rentProtected,
      rentUplift,
      totalBenefit,
      reason
    });
  });

  return {
    rentProtected: totalRentProtected,
    rentUplift: totalRentUplift,
    unitsAtRisk2027,
    unitsAtRisk2030,
    totalRentAtRisk2027,
    totalRentAtRisk2030,
    breakdown
  };
}

/**
 * Format rent amount for display
 */
export function formatRent(amount: number): string {
  if (amount >= 1000000) {
    return `£${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `£${(amount / 1000).toFixed(0)}k`;
  } else {
    return `£${amount.toLocaleString()}`;
  }
}

/**
 * Get default rent calculation parameters
 */
export function getDefaultRentParams(): RentCalculationParams {
  return {
    epcAUpliftPercent: 8, // 8% uplift for EPC A
    epcBUpliftPercent: 5, // 5% uplift for EPC B
  };
}
