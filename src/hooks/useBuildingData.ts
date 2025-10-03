import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase/queries';
import type { Building, Unit, BuildingWithUnits } from '../utils/supabase/types';
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

export function useBuildingData(buildingId?: string, rentParams?: { epcAUpliftPercent: number; epcBUpliftPercent: number }) {
  const [building, setBuilding] = useState<BuildingWithUnits | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
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
    let isMounted = true;

    const fetchBuildingData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get the first building if no ID provided
        let targetBuildingId = buildingId;
        if (!targetBuildingId) {
          const { data: buildings, error: buildingsError } = await supabase
            .from('buildings')
            .select('id')
            .limit(1);
          
          if (buildingsError) throw buildingsError;
          if (!buildings || buildings.length === 0) {
            throw new Error('No buildings found');
          }
          targetBuildingId = buildings[0].id;
        }

        // Fetch building with all related data
        const { data: buildingData, error: buildingError } = await supabase
          .from('buildings')
          .select(`
            *,
            units (*),
            scenarios (*),
            milestones (*)
          `)
          .eq('id', targetBuildingId)
          .single();

        if (buildingError) throw buildingError;
        if (!isMounted) return;

        setBuilding(buildingData);
        setUnits(buildingData.units || []);

        // Calculate MEES compliance summary
        const summary = calculateMEESSummary(buildingData.units || []);
        setMeesSummary(summary);

        // Calculate EPC distribution
        const distribution = calculateEPCDistribution(buildingData.units || []);
        setEpcDistribution(distribution);

        // Generate unit details
        const details = generateUnitDetails(buildingData.units || []);
        setUnitDetails(details);

        // Calculate rent protected for each scenario
        const params = rentParams || getDefaultRentParams();
        const rentCalcs = {
          epcC2027: calculateRentProtected(buildingData.units || [], 'epc_c_2027', params),
          netZero2050: calculateRentProtected(buildingData.units || [], 'net_zero_2050', params),
          bau: calculateRentProtected(buildingData.units || [], 'bau', params),
        };
        setRentCalculations(rentCalcs);

      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch building data');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBuildingData();

    return () => {
      isMounted = false;
    };
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

function calculateMEESSummary(units: Unit[]): MEESComplianceSummary {
  const totalUnits = units.length;
  
  // Units at risk for 2027 (below EPC C)
  const unitsAtRisk2027 = units.filter(u => 
    ['D', 'E', 'F', 'G'].includes(u.epc_rating || '')
  ).length;
  
  // Units at risk for 2030 (below EPC B)
  const unitsAtRisk2030 = units.filter(u => 
    ['C', 'D', 'E', 'F', 'G'].includes(u.epc_rating || '')
  ).length;
  
  // Rent at risk calculations
  const rentAtRisk2027 = units
    .filter(u => ['D', 'E', 'F', 'G'].includes(u.epc_rating || ''))
    .reduce((sum, u) => sum + (u.current_rent || 0), 0);
    
  const rentAtRisk2030 = units
    .filter(u => ['C', 'D', 'E', 'F', 'G'].includes(u.epc_rating || ''))
    .reduce((sum, u) => sum + (u.current_rent || 0), 0);

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

function calculateEPCDistribution(units: Unit[]): EPCDistribution[] {
  const ratings = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const colors = ['#22C55E', '#84CC16', '#EAB308', '#F59E0B', '#EF4444', '#DC2626', '#991B1B'];
  
  return ratings.map((rating, index) => {
    const count = units.filter(u => u.epc_rating === rating).length;
    return {
      rating,
      count,
      color: colors[index]
    };
  });
}

function generateUnitDetails(units: Unit[]): UnitDetail[] {
  return units.map(unit => {
    const epcRating = unit.epc_rating || '';
    const compliant2027 = !['D', 'E', 'F', 'G'].includes(epcRating);
    const compliant2030 = !['C', 'D', 'E', 'F', 'G'].includes(epcRating);
    
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
      epc_rating: unit.epc_rating,
      epc_score: unit.epc_score,
      current_rent: unit.current_rent,
      size_m2: unit.size_m2,
      compliant2027,
      compliant2030,
      action
    };
  });
}
