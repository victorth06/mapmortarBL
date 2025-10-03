// Database types generated from Supabase schema

export type ScenarioType = 'bau' | 'epc_c_2027' | 'net_zero_2050' | 'custom';
export type InterventionStatus = 'planned' | 'in_progress' | 'completed';

export interface Building {
  id: string;
  name: string;
  address: string | null;
  postcode: string | null;
  size_m2: number;
  gross_internal_area: number | null;
  occupancy_rate: number | null;
  construction_year: number | null;
  refurbishment_year: number | null;
  building_type: string | null;
  // Energy metrics
  total_energy_kwh: number | null;
  energy_intensity: number | null;
  electricity_percentage: number | null;
  gas_percentage: number | null;
  // Carbon metrics
  total_carbon_tco2e: number | null;
  carbon_intensity: number | null;
  // Cost metrics
  annual_energy_cost: number | null;
  cost_per_m2: number | null;
  // CRREM
  crrem_stranded_year: number | null;
  years_to_stranding: number | null;
  // Metadata
  created_at: string;
  updated_at: string;
}

export interface Unit {
  id: string;
  building_id: string;
  name: string;
  floor: string | null;
  size_m2: number;
  // EPC data
  epc_rating: string | null;
  epc_score: number | null;
  epc_expiry: string | null;
  epc_certificate_number: string | null;
  // Rent data
  current_rent: number | null;
  market_rent: number | null;
  rent_per_m2: number | null;
  // Energy data
  annual_energy_kwh: number | null;
  energy_intensity: number | null;
  // Status
  is_vacant: boolean;
  // Metadata
  created_at: string;
  updated_at: string;
}

export interface Tenant {
  id: string;
  name: string;
  industry: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface UnitTenant {
  id: string;
  unit_id: string;
  tenant_id: string;
  // Lease details
  lease_start: string;
  lease_end: string;
  rent_per_annum: number;
  break_option: string | null;
  break_notice_months: number | null;
  // Lease type
  lease_type: string | null;
  // Metadata
  created_at: string;
  updated_at: string;
}

export interface Scenario {
  id: string;
  building_id: string;
  name: string;
  type: ScenarioType;
  description: string | null;
  // Financial metrics
  capex: number | null;
  annual_savings: number | null;
  payback_years: number | null;
  simple_payback_years: number | null;
  npv: number | null;
  irr: number | null;
  roi_10y: number | null;
  dcf: number | null;
  // Impact metrics
  rent_protected: number | null;
  energy_reduction: number | null;
  carbon_reduction: number | null;
  total_energy_saved_kwh: number | null;
  total_carbon_saved_tco2e: number | null;
  // Compliance
  crrem_aligned_until: string | null;
  mees_compliant_2027: boolean | null;
  mees_compliant_2030: boolean | null;
  // Status
  is_baseline: boolean;
  is_recommended: boolean;
  // Metadata
  created_at: string;
  updated_at: string;
}

export interface Intervention {
  id: string;
  name: string;
  category: string;
  description: string | null;
  // Default costs and savings
  default_capex_per_m2: number | null;
  default_capex_fixed: number | null;
  default_saving_per_m2: number | null;
  default_saving_percentage: number | null;
  default_carbon_reduction_percentage: number | null;
  default_payback_years: number | null;
  // Technical details
  lifespan_years: number | null;
  maintenance_cost_annual: number | null;
  // Strategy classification
  strategy_type: string | null;
  // Metadata
  created_at: string;
  updated_at: string;
}

export interface UnitIntervention {
  id: string;
  unit_id: string;
  scenario_id: string;
  intervention_id: string | null;
  // Custom intervention details
  intervention_name: string;
  category: string | null;
  // Costs and savings
  capex: number;
  annual_saving: number | null;
  carbon_reduction_tco2e: number | null;
  energy_reduction_kwh: number | null;
  payback_years: number | null;
  // Timeline
  planned_start_year: number | null;
  planned_end_year: number | null;
  actual_start_date: string | null;
  actual_end_date: string | null;
  // Status
  status: InterventionStatus;
  // Notes
  notes: string | null;
  // Metadata
  created_at: string;
  updated_at: string;
}

export interface ScenarioResult {
  id: string;
  scenario_id: string;
  year: number;
  // Cashflow
  annual_capex: number;
  annual_savings: number;
  annual_opex: number;
  net_cashflow: number | null;
  cumulative_cashflow: number | null;
  cumulative_discounted_cashflow: number | null;
  // Performance
  energy_use_kwh: number | null;
  energy_intensity: number | null;
  carbon_emissions_tco2e: number | null;
  carbon_intensity: number | null;
  // Financial metrics
  npv: number | null;
  irr: number | null;
  noi: number | null;
  // Metadata
  created_at: string;
}

export interface Milestone {
  id: string;
  building_id: string;
  name: string;
  milestone_type: string;
  year: number;
  date: string | null;
  description: string | null;
  impact_on_scenario: string | null;
  created_at: string;
}

// Joined types for common queries

export interface UnitWithTenants extends Unit {
  tenants: Array<Tenant & { lease: UnitTenant }>;
}

export interface ScenarioWithInterventions extends Scenario {
  interventions: UnitIntervention[];
  results: ScenarioResult[];
}

export interface BuildingWithUnits extends Building {
  units: Unit[];
  scenarios: Scenario[];
  milestones: Milestone[];
}
