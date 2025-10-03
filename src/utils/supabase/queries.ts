import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';
import type {
  Building,
  Unit,
  Scenario,
  UnitIntervention,
  ScenarioResult,
  Milestone,
  BuildingWithUnits,
  ScenarioWithInterventions,
} from './types';

// Create Supabase client
const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

// ============================================
// BUILDING QUERIES
// ============================================

/**
 * Get all buildings
 */
export async function getAllBuildings(): Promise<Building[]> {
  const { data, error } = await supabase
    .from('buildings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Get building by ID with all related data
 */
export async function getBuildingWithDetails(
  buildingId: string
): Promise<BuildingWithUnits | null> {
  const { data: building, error: buildingError } = await supabase
    .from('buildings')
    .select('*')
    .eq('id', buildingId)
    .single();

  if (buildingError) throw buildingError;
  if (!building) return null;

  // Get units
  const { data: units, error: unitsError } = await supabase
    .from('units')
    .select('*')
    .eq('building_id', buildingId)
    .order('name');

  if (unitsError) throw unitsError;

  // Get scenarios
  const { data: scenarios, error: scenariosError } = await supabase
    .from('scenarios')
    .select('*')
    .eq('building_id', buildingId)
    .order('created_at');

  if (scenariosError) throw scenariosError;

  // Get milestones
  const { data: milestones, error: milestonesError } = await supabase
    .from('milestones')
    .select('*')
    .eq('building_id', buildingId)
    .order('year');

  if (milestonesError) throw milestonesError;

  return {
    ...building,
    units: units || [],
    scenarios: scenarios || [],
    milestones: milestones || [],
  };
}

/**
 * Create a new building
 */
export async function createBuilding(
  buildingData: Omit<Building, 'id' | 'created_at' | 'updated_at'>
): Promise<Building> {
  const { data, error } = await supabase
    .from('buildings')
    .insert([buildingData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ============================================
// UNIT QUERIES
// ============================================

/**
 * Get units for a building with tenant information
 */
export async function getUnitsWithTenants(buildingId: string) {
  const { data: units, error: unitsError } = await supabase
    .from('units')
    .select('*')
    .eq('building_id', buildingId)
    .order('name');

  if (unitsError) throw unitsError;

  // Get tenant leases for each unit
  const unitsWithTenants = await Promise.all(
    (units || []).map(async (unit) => {
      const { data: unitTenants } = await supabase
        .from('unit_tenants')
        .select(`
          *,
          tenant:tenants(*)
        `)
        .eq('unit_id', unit.id);

      return {
        ...unit,
        tenants: unitTenants || [],
      };
    })
  );

  return unitsWithTenants;
}

/**
 * Get units at MEES risk (below EPC C)
 */
export async function getUnitsAtMEESRisk(buildingId: string) {
  const { data, error } = await supabase
    .from('units')
    .select('*')
    .eq('building_id', buildingId)
    .in('epc_rating', ['D', 'E', 'F', 'G'])
    .order('epc_rating', { ascending: false });

  if (error) throw error;
  return data || [];
}

// ============================================
// SCENARIO QUERIES
// ============================================

/**
 * Get all scenarios for a building
 */
export async function getScenariosByBuilding(
  buildingId: string
): Promise<Scenario[]> {
  const { data, error } = await supabase
    .from('scenarios')
    .select('*')
    .eq('building_id', buildingId)
    .order('created_at');

  if (error) throw error;
  return data || [];
}

/**
 * Get scenario with interventions and results
 */
export async function getScenarioWithDetails(
  scenarioId: string
): Promise<ScenarioWithInterventions | null> {
  const { data: scenario, error: scenarioError } = await supabase
    .from('scenarios')
    .select('*')
    .eq('id', scenarioId)
    .single();

  if (scenarioError) throw scenarioError;
  if (!scenario) return null;

  // Get interventions
  const { data: interventions, error: interventionsError } = await supabase
    .from('unit_interventions')
    .select('*')
    .eq('scenario_id', scenarioId)
    .order('planned_start_year');

  if (interventionsError) throw interventionsError;

  // Get results
  const { data: results, error: resultsError } = await supabase
    .from('scenario_results')
    .select('*')
    .eq('scenario_id', scenarioId)
    .order('year');

  if (resultsError) throw resultsError;

  return {
    ...scenario,
    interventions: interventions || [],
    results: results || [],
  };
}

/**
 * Create a new scenario
 */
export async function createScenario(
  scenarioData: Omit<Scenario, 'id' | 'created_at' | 'updated_at'>
): Promise<Scenario> {
  const { data, error } = await supabase
    .from('scenarios')
    .insert([scenarioData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update scenario metrics
 */
export async function updateScenarioMetrics(
  scenarioId: string,
  metrics: Partial<Scenario>
): Promise<Scenario> {
  const { data, error } = await supabase
    .from('scenarios')
    .update({
      ...metrics,
      updated_at: new Date().toISOString(),
    })
    .eq('id', scenarioId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ============================================
// INTERVENTION QUERIES
// ============================================

/**
 * Get all available interventions from library
 */
export async function getInterventionLibrary() {
  const { data, error } = await supabase
    .from('interventions')
    .select('*')
    .order('category', { ascending: true })
    .order('name', { ascending: true });

  if (error) throw error;
  return data || [];
}

/**
 * Add intervention to scenario
 */
export async function addInterventionToScenario(
  interventionData: Omit<UnitIntervention, 'id' | 'created_at' | 'updated_at'>
): Promise<UnitIntervention> {
  const { data, error } = await supabase
    .from('unit_interventions')
    .insert([interventionData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update intervention status
 */
export async function updateInterventionStatus(
  interventionId: string,
  status: 'planned' | 'in_progress' | 'completed'
): Promise<UnitIntervention> {
  const { data, error } = await supabase
    .from('unit_interventions')
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', interventionId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ============================================
// FINANCIAL QUERIES
// ============================================

/**
 * Get cashflow projections for a scenario
 */
export async function getScenarioCashflow(
  scenarioId: string,
  startYear: number = 2024,
  endYear: number = 2040
): Promise<ScenarioResult[]> {
  const { data, error } = await supabase
    .from('scenario_results')
    .select('*')
    .eq('scenario_id', scenarioId)
    .gte('year', startYear)
    .lte('year', endYear)
    .order('year');

  if (error) throw error;
  return data || [];
}

/**
 * Calculate and store scenario results for a year
 */
export async function upsertScenarioResult(
  resultData: Omit<ScenarioResult, 'id' | 'created_at'>
): Promise<ScenarioResult> {
  const { data, error } = await supabase
    .from('scenario_results')
    .upsert(
      [resultData],
      { onConflict: 'scenario_id,year' }
    )
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ============================================
// MILESTONE QUERIES
// ============================================

/**
 * Get milestones for a building
 */
export async function getMilestonesByBuilding(
  buildingId: string
): Promise<Milestone[]> {
  const { data, error } = await supabase
    .from('milestones')
    .select('*')
    .eq('building_id', buildingId)
    .order('year');

  if (error) throw error;
  return data || [];
}

/**
 * Get upcoming milestones
 */
export async function getUpcomingMilestones(
  buildingId: string,
  fromYear: number = new Date().getFullYear()
): Promise<Milestone[]> {
  const { data, error } = await supabase
    .from('milestones')
    .select('*')
    .eq('building_id', buildingId)
    .gte('year', fromYear)
    .order('year')
    .limit(5);

  if (error) throw error;
  return data || [];
}

// ============================================
// ANALYTICS QUERIES
// ============================================

/**
 * Get MEES compliance summary for a building
 */
export async function getMEESComplianceSummary(buildingId: string) {
  const units = await getUnitsWithTenants(buildingId);
  
  const totalUnits = units.length;
  const unitsAtRisk2027 = units.filter(u => 
    ['D', 'E', 'F', 'G'].includes(u.epc_rating || '')
  ).length;
  const unitsAtRisk2030 = units.filter(u => 
    ['C', 'D', 'E', 'F', 'G'].includes(u.epc_rating || '')
  ).length;
  
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
    percentageAtRisk2027: (unitsAtRisk2027 / totalUnits) * 100,
    percentageAtRisk2030: (unitsAtRisk2030 / totalUnits) * 100,
    rentAtRisk2027,
    rentAtRisk2030,
  };
}

/**
 * Compare scenarios side-by-side
 */
export async function compareScenarios(scenarioIds: string[]) {
  const scenarios = await Promise.all(
    scenarioIds.map(id => getScenarioWithDetails(id))
  );

  return scenarios.filter(s => s !== null);
}

export { supabase };
