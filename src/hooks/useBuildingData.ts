import React, { useState, useEffect } from 'react';
import { buildingConfig, type UnitData } from '../config/buildingConfig';
import { calculateRentProtected, getDefaultRentParams, type RentProtectedResult } from '../utils/rentCalculations';

export interface MEESComplianceSummary {
  totalUnits: number;
  unitsAtRisk2027: number;
  unitsAtRisk2030: number;
  percentageAtRisk2027: number;
  percentageAtRisk2030: number;
  rentAtRisk2027: number;
  rentAtRisk2030: number;
}

export interface EPCDistribution {
  rating: string;
  count: number;
  color: string;
}

export interface UnitDetail {
  id: string;
  name: string;
  floor: string | null;
  epc_rating: string | null;
  epc_score: number | null;
  current_rent: number | null;
  size_m2: number;
  compliant2027: boolean;
  compliant2030: boolean;
  action: string;
}

export interface BuildingWithUnits {
  id: string;
  name: string;
  address: string;
  postcode: string;
  buildingArea: number;
  buildingAreaSqft: number;
  constructionYear: number;
  buildingType: string;
  units: UnitData[];
}

export function useBuildingData(buildingId?: string, rentParams?: { epcAUpliftPercent: number; epcBUpliftPercent: number }) {
  const [building, setBuilding] = useState<BuildingWithUnits | null>(null);
  const [units, setUnits] = useState<UnitData[]>([]);
  const [meesSummary, setMeesSummary] = useState<MEESComplianceSummary | null>(null);
  const [epcDistribution, setEpcDistribution] = useState<EPCDistribution[]>([]);
  const [unitDetails, setUnitDetails] = useState<UnitDetail[]>([]);
  const [rentCalculations, setRentCalculations] = useState<{
    epcC2027: RentProtectedResult;
    netZero2050: RentProtectedResult;
    bau: RentProtectedResult;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      setError(null);

      // Use config data instead of Supabase
      const buildingData: BuildingWithUnits = {
        id: buildingConfig.id,
        name: buildingConfig.name,
        address: buildingConfig.address,
        postcode: buildingConfig.postcode,
        buildingArea: buildingConfig.buildingArea,
        buildingAreaSqft: buildingConfig.buildingAreaSqft,
        constructionYear: buildingConfig.constructionYear,
        buildingType: buildingConfig.buildingType,
        units: buildingConfig.units,
      };

      setBuilding(buildingData);
      setUnits(buildingConfig.units);

      // Calculate MEES compliance summary
      const summary = calculateMEESSummary(buildingConfig.units);
      setMeesSummary(summary);

      // Calculate EPC distribution
      const distribution = calculateEPCDistribution(buildingConfig.units);
      setEpcDistribution(distribution);

      // Generate unit details
      const details = generateUnitDetails(buildingConfig.units);
      setUnitDetails(details);

      // Calculate rent protected for each scenario
      const params = rentParams || getDefaultRentParams();
      const rentCalcs = {
        epcC2027: calculateRentProtected(buildingConfig.units, 'epc_c_2027', params),
        netZero2050: calculateRentProtected(buildingConfig.units, 'net_zero_2050', params),
        bau: calculateRentProtected(buildingConfig.units, 'bau', params),
      };
      setRentCalculations(rentCalcs);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load building data');
    } finally {
      setLoading(false);
    }
  }, [buildingId, rentParams]);

  return {
    building,
    units,
    meesSummary,
    epcDistribution,
    unitDetails,
    rentCalculations,
    loading,
    error,
    refetch: () => {
      setLoading(true);
      // Trigger re-fetch by updating a dependency
    }
  };
}

function calculateMEESSummary(units: UnitData[]): MEESComplianceSummary {
  const totalUnits = units.length;
  
  // Units at risk for 2027 (below EPC C)
  const unitsAtRisk2027 = units.filter(u => 
    ['D', 'E', 'F', 'G', 'Unknown'].includes(u.epcRating)
  ).length;
  
  // Units at risk for 2030 (below EPC B)
  const unitsAtRisk2030 = units.filter(u => 
    ['C', 'D', 'E', 'F', 'G', 'Unknown'].includes(u.epcRating)
  ).length;
  
  // Rent at risk calculations
  const rentAtRisk2027 = units
    .filter(u => ['D', 'E', 'F', 'G', 'Unknown'].includes(u.epcRating))
    .reduce((sum, u) => sum + u.annualRent, 0);
    
  const rentAtRisk2030 = units
    .filter(u => ['C', 'D', 'E', 'F', 'G', 'Unknown'].includes(u.epcRating))
    .reduce((sum, u) => sum + u.annualRent, 0);

  return {
    totalUnits,
    unitsAtRisk2027,
    unitsAtRisk2030,
    percentageAtRisk2027: totalUnits > 0 ? (unitsAtRisk2027 / totalUnits) * 100 : 0,
    percentageAtRisk2030: totalUnits > 0 ? (unitsAtRisk2030 / totalUnits) * 100 : 0,
    rentAtRisk2027,
    rentAtRisk2030,
  };
}

function calculateEPCDistribution(units: UnitData[]): EPCDistribution[] {
  const ratings = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'Unknown'];
  const colors = ['#22C55E', '#84CC16', '#EAB308', '#F59E0B', '#EF4444', '#DC2626', '#991B1B', '#6B7280'];
  
  return ratings.map((rating, index) => {
    const count = units.filter(u => u.epcRating === rating).length;
    return {
      rating,
      count,
      color: colors[index]
    };
  });
}

function generateUnitDetails(units: UnitData[]): UnitDetail[] {
  return units.map(unit => {
    const epcRating = unit.epcRating;
    const compliant2027 = !['D', 'E', 'F', 'G', 'Unknown'].includes(epcRating);
    const compliant2030 = !['C', 'D', 'E', 'F', 'G', 'Unknown'].includes(epcRating);
    
    let action = '';
    if (!compliant2027) {
      action = 'Immediate upgrade to C';
    } else if (!compliant2030) {
      action = 'Upgrade to B by 2030';
    } else {
      action = 'Compliant';
    }

    return {
      id: unit.id,
      name: unit.name,
      floor: unit.floor,
      epc_rating: epcRating,
      epc_score: unit.epcScore,
      current_rent: unit.annualRent,
      size_m2: unit.nia,
      compliant2027,
      compliant2030,
      action
    };
  });
}
