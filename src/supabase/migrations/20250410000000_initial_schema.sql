-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- ENUMS
-- ============================================

-- Scenario types
CREATE TYPE scenario_type AS ENUM ('bau', 'epc_c_2027', 'net_zero_2050', 'custom');

-- Intervention status
CREATE TYPE intervention_status AS ENUM ('planned', 'in_progress', 'completed');

-- ============================================
-- CORE TABLES
-- ============================================

-- Buildings (top-level assets)
CREATE TABLE buildings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text,
  postcode text,
  size_m2 numeric NOT NULL,
  gross_internal_area numeric,
  occupancy_rate numeric,
  construction_year int,
  refurbishment_year int,
  building_type text,
  -- Energy metrics
  total_energy_kwh numeric,
  energy_intensity numeric, -- kWh/m²
  electricity_percentage numeric,
  gas_percentage numeric,
  -- Carbon metrics
  total_carbon_tco2e numeric,
  carbon_intensity numeric, -- kgCO₂e/m²
  -- Cost metrics
  annual_energy_cost numeric,
  cost_per_m2 numeric,
  -- CRREM
  crrem_stranded_year int,
  years_to_stranding int,
  -- Metadata
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Units (sub-assets within buildings)
CREATE TABLE units (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  building_id uuid REFERENCES buildings(id) ON DELETE CASCADE,
  name text NOT NULL,
  floor text,
  size_m2 numeric NOT NULL,
  -- EPC data
  epc_rating text,
  epc_score int,
  epc_expiry date,
  epc_certificate_number text,
  -- Rent data
  current_rent numeric,
  market_rent numeric,
  rent_per_m2 numeric,
  -- Energy data
  annual_energy_kwh numeric,
  energy_intensity numeric,
  -- Status
  is_vacant boolean DEFAULT false,
  -- Metadata
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(building_id, name)
);

-- Tenants
CREATE TABLE tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  industry text,
  contact_email text,
  contact_phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Unit-Tenant relationship (many-to-many)
CREATE TABLE unit_tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id uuid REFERENCES units(id) ON DELETE CASCADE,
  tenant_id uuid REFERENCES tenants(id) ON DELETE CASCADE,
  -- Lease details
  lease_start date NOT NULL,
  lease_end date NOT NULL,
  rent_per_annum numeric NOT NULL,
  break_option date,
  break_notice_months int,
  -- Lease type
  lease_type text, -- FRI, internal repairing, etc.
  -- Metadata
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- SCENARIO & INTERVENTION TABLES
-- ============================================

-- Scenarios (building-level retrofit plans)
CREATE TABLE scenarios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  building_id uuid REFERENCES buildings(id) ON DELETE CASCADE,
  name text NOT NULL,
  type scenario_type NOT NULL,
  description text,
  -- Financial metrics
  capex numeric,
  annual_savings numeric,
  payback_years numeric,
  simple_payback_years numeric,
  npv numeric,
  irr numeric,
  roi_10y numeric,
  dcf numeric,
  -- Impact metrics
  rent_protected numeric,
  energy_reduction numeric, -- percentage
  carbon_reduction numeric, -- percentage
  total_energy_saved_kwh numeric,
  total_carbon_saved_tco2e numeric,
  -- Compliance
  crrem_aligned_until text,
  mees_compliant_2027 boolean,
  mees_compliant_2030 boolean,
  -- Status
  is_baseline boolean DEFAULT false,
  is_recommended boolean DEFAULT false,
  -- Metadata
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Interventions library (retrofit measure templates)
CREATE TABLE interventions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL, -- HVAC, Envelope, Renewables, Lighting, Controls, etc.
  description text,
  -- Default costs and savings (can be overridden per unit)
  default_capex_per_m2 numeric,
  default_capex_fixed numeric,
  default_saving_per_m2 numeric,
  default_saving_percentage numeric,
  default_carbon_reduction_percentage numeric,
  default_payback_years numeric,
  -- Technical details
  lifespan_years int,
  maintenance_cost_annual numeric,
  -- Strategy classification
  strategy_type text, -- Optimisation, Light Retrofit, Deep Retrofit
  -- Metadata
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Unit-level interventions (interventions applied to specific units in a scenario)
CREATE TABLE unit_interventions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id uuid REFERENCES units(id) ON DELETE CASCADE,
  scenario_id uuid REFERENCES scenarios(id) ON DELETE CASCADE,
  intervention_id uuid REFERENCES interventions(id) ON DELETE SET NULL,
  -- Custom intervention details
  intervention_name text NOT NULL,
  category text,
  -- Costs and savings
  capex numeric NOT NULL,
  annual_saving numeric,
  carbon_reduction_tco2e numeric,
  energy_reduction_kwh numeric,
  payback_years numeric,
  -- Timeline
  planned_start_year int,
  planned_end_year int,
  actual_start_date date,
  actual_end_date date,
  -- Status
  status intervention_status DEFAULT 'planned',
  -- Notes
  notes text,
  -- Metadata
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Scenario financial results (year-by-year projections)
CREATE TABLE scenario_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scenario_id uuid REFERENCES scenarios(id) ON DELETE CASCADE,
  year int NOT NULL,
  -- Cashflow
  annual_capex numeric DEFAULT 0,
  annual_savings numeric DEFAULT 0,
  annual_opex numeric DEFAULT 0,
  net_cashflow numeric,
  cumulative_cashflow numeric,
  cumulative_discounted_cashflow numeric,
  -- Performance
  energy_use_kwh numeric,
  energy_intensity numeric,
  carbon_emissions_tco2e numeric,
  carbon_intensity numeric,
  -- Financial metrics
  npv numeric,
  irr numeric,
  noi numeric, -- Net Operating Income
  -- Metadata
  created_at timestamptz DEFAULT now(),
  UNIQUE(scenario_id, year)
);

-- ============================================
-- MILESTONES & EVENTS
-- ============================================

-- Key milestones and events (MEES deadlines, lease expiries, equipment EoL)
CREATE TABLE milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  building_id uuid REFERENCES buildings(id) ON DELETE CASCADE,
  name text NOT NULL,
  milestone_type text NOT NULL, -- mees_deadline, lease_expiry, equipment_eol, custom
  year int NOT NULL,
  date date,
  description text,
  impact_on_scenario text,
  -- Metadata
  created_at timestamptz DEFAULT now()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_units_building_id ON units(building_id);
CREATE INDEX idx_unit_tenants_unit_id ON unit_tenants(unit_id);
CREATE INDEX idx_unit_tenants_tenant_id ON unit_tenants(tenant_id);
CREATE INDEX idx_scenarios_building_id ON scenarios(building_id);
CREATE INDEX idx_unit_interventions_scenario_id ON unit_interventions(scenario_id);
CREATE INDEX idx_unit_interventions_unit_id ON unit_interventions(unit_id);
CREATE INDEX idx_scenario_results_scenario_id ON scenario_results(scenario_id);
CREATE INDEX idx_milestones_building_id ON milestones(building_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE buildings ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE unit_tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE interventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE unit_interventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenario_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;

-- Allow public read access for now (tighten this based on your auth requirements)
CREATE POLICY "Allow public read access to buildings" ON buildings FOR SELECT USING (true);
CREATE POLICY "Allow public read access to units" ON units FOR SELECT USING (true);
CREATE POLICY "Allow public read access to tenants" ON tenants FOR SELECT USING (true);
CREATE POLICY "Allow public read access to unit_tenants" ON unit_tenants FOR SELECT USING (true);
CREATE POLICY "Allow public read access to scenarios" ON scenarios FOR SELECT USING (true);
CREATE POLICY "Allow public read access to interventions" ON interventions FOR SELECT USING (true);
CREATE POLICY "Allow public read access to unit_interventions" ON unit_interventions FOR SELECT USING (true);
CREATE POLICY "Allow public read access to scenario_results" ON scenario_results FOR SELECT USING (true);
CREATE POLICY "Allow public read access to milestones" ON milestones FOR SELECT USING (true);

-- Allow public insert/update/delete for now (tighten based on auth)
CREATE POLICY "Allow public write to buildings" ON buildings FOR ALL USING (true);
CREATE POLICY "Allow public write to units" ON units FOR ALL USING (true);
CREATE POLICY "Allow public write to tenants" ON tenants FOR ALL USING (true);
CREATE POLICY "Allow public write to unit_tenants" ON unit_tenants FOR ALL USING (true);
CREATE POLICY "Allow public write to scenarios" ON scenarios FOR ALL USING (true);
CREATE POLICY "Allow public write to interventions" ON interventions FOR ALL USING (true);
CREATE POLICY "Allow public write to unit_interventions" ON unit_interventions FOR ALL USING (true);
CREATE POLICY "Allow public write to scenario_results" ON scenario_results FOR ALL USING (true);
CREATE POLICY "Allow public write to milestones" ON milestones FOR ALL USING (true);

-- ============================================
-- SEED DATA
-- ============================================

-- Insert sample building (135 Bishopsgate)
INSERT INTO buildings (
  name, address, postcode, size_m2, gross_internal_area, occupancy_rate,
  construction_year, building_type,
  total_energy_kwh, energy_intensity, electricity_percentage, gas_percentage,
  total_carbon_tco2e, carbon_intensity,
  annual_energy_cost, cost_per_m2,
  crrem_stranded_year, years_to_stranding
) VALUES (
  '135 Bishopsgate',
  '135 Bishopsgate, London',
  'EC2M 3YD',
  43930,
  43930,
  0.86,
  1985,
  'Office',
  2450000,
  122,
  62,
  38,
  485,
  11.0,
  342000,
  7.78,
  2029,
  4
);

-- Insert sample units
WITH building AS (SELECT id FROM buildings WHERE name = '135 Bishopsgate' LIMIT 1)
INSERT INTO units (building_id, name, floor, size_m2, epc_rating, epc_score, epc_expiry, current_rent, is_vacant)
SELECT
  building.id,
  'Unit ' || chr(64 + generate_series),
  CASE 
    WHEN generate_series <= 2 THEN 'Ground Floor'
    WHEN generate_series <= 4 THEN '1st Floor'
    ELSE '2nd Floor'
  END,
  6000 + (generate_series * 500),
  CASE
    WHEN generate_series % 3 = 0 THEN 'C'
    WHEN generate_series % 3 = 1 THEN 'D'
    ELSE 'E'
  END,
  CASE
    WHEN generate_series % 3 = 0 THEN 72
    WHEN generate_series % 3 = 1 THEN 62
    ELSE 45
  END,
  '2026-12-31'::date,
  175000 + (generate_series * 5000),
  CASE WHEN generate_series = 7 THEN true ELSE false END
FROM building, generate_series(1, 7);

-- Insert sample tenants
INSERT INTO tenants (name, industry, contact_email)
VALUES
  ('TP ICAP', 'Financial Services', 'facilities@tpicap.com'),
  ('HSBC', 'Banking', 'property@hsbc.com'),
  ('Allen & Overy', 'Legal', 'estates@allenovery.com'),
  ('Deloitte', 'Professional Services', 'realestate@deloitte.com'),
  ('Goldman Sachs', 'Investment Banking', 'facilities@gs.com'),
  ('BlackRock', 'Asset Management', 'property@blackrock.com');

-- Link tenants to units with lease details
WITH building AS (SELECT id FROM buildings WHERE name = '135 Bishopsgate' LIMIT 1),
     units_list AS (SELECT id, name FROM units WHERE building_id = (SELECT id FROM building)),
     tenants_list AS (SELECT id, name FROM tenants)
INSERT INTO unit_tenants (unit_id, tenant_id, lease_start, lease_end, rent_per_annum, break_option, break_notice_months)
VALUES
  ((SELECT id FROM units_list WHERE name = 'Unit A'), (SELECT id FROM tenants_list WHERE name = 'TP ICAP'), '2020-01-01', '2028-12-31', 180000, '2025-12-31', 6),
  ((SELECT id FROM units_list WHERE name = 'Unit B'), (SELECT id FROM tenants_list WHERE name = 'HSBC'), '2019-06-01', '2029-05-31', 185000, '2026-05-31', 6),
  ((SELECT id FROM units_list WHERE name = 'Unit C'), (SELECT id FROM tenants_list WHERE name = 'Allen & Overy'), '2021-03-01', '2027-02-28', 190000, NULL, NULL),
  ((SELECT id FROM units_list WHERE name = 'Unit D'), (SELECT id FROM tenants_list WHERE name = 'Deloitte'), '2022-01-01', '2030-12-31', 195000, '2027-12-31', 12),
  ((SELECT id FROM units_list WHERE name = 'Unit E'), (SELECT id FROM tenants_list WHERE name = 'Goldman Sachs'), '2018-09-01', '2026-08-31', 200000, '2024-08-31', 6),
  ((SELECT id FROM units_list WHERE name = 'Unit F'), (SELECT id FROM tenants_list WHERE name = 'BlackRock'), '2023-01-01', '2033-12-31', 205000, '2028-12-31', 12);

-- Insert intervention library
INSERT INTO interventions (
  name, category, description, strategy_type,
  default_capex_per_m2, default_saving_percentage, default_carbon_reduction_percentage, default_payback_years
) VALUES
  ('Adjust Thermostat Setpoints', 'Controls', 'Optimise heating/cooling setpoints', 'Optimisation', 0, 3, 5, 0),
  ('BMS System Upgrade', 'Controls', 'Install modern Building Management System', 'Optimisation', 15, 5, 8, 3.5),
  ('Low Energy LED Lighting', 'Lighting', 'Replace existing lighting with LED', 'Light Retrofit', 25, 8, 10, 7),
  ('Solar PV Installation', 'Renewables', 'Rooftop solar panels', 'Light Retrofit', 150, 12, 15, 12),
  ('Replace Windows (Double Glazing)', 'Envelope', 'Upgrade to high-performance glazing', 'Deep Retrofit', 400, 5, 12, 20),
  ('Air Source Heat Pump', 'HVAC', 'Replace gas boiler with ASHP', 'Deep Retrofit', 200, 15, 40, 18),
  ('Roof Insulation Upgrade', 'Envelope', 'Improve roof insulation', 'Deep Retrofit', 80, 7, 10, 15),
  ('Wall Insulation', 'Envelope', 'Install external wall insulation', 'Deep Retrofit', 180, 10, 15, 18);

-- Insert scenarios for the building
WITH building AS (SELECT id FROM buildings WHERE name = '135 Bishopsgate' LIMIT 1)
INSERT INTO scenarios (
  building_id, name, type, description,
  capex, annual_savings, payback_years, simple_payback_years,
  npv, irr, roi_10y, dcf,
  rent_protected, energy_reduction, carbon_reduction,
  crrem_aligned_until, mees_compliant_2027, mees_compliant_2030,
  is_baseline, is_recommended
)
SELECT building.id, 'Do Nothing (BAU)', 'bau', 'Business as usual - no interventions',
  0, 0, NULL, NULL,
  0, 0, 0, 0,
  0, 0, 0,
  '2029', false, false,
  true, false
FROM building
UNION ALL
SELECT building.id, 'EPC C by 2027', 'epc_c_2027', 'Achieve EPC C rating by 2027 MEES deadline',
  2800000, 68000, 8.5, 8.5,
  -1200000, 3, 5, -1200000,
  1200000, 0.35, 0.35,
  '2036', true, false,
  false, true
FROM building
UNION ALL
SELECT building.id, 'Net Zero 2050', 'net_zero_2050', 'Comprehensive retrofit to achieve net zero by 2050',
  6200000, 142000, 11, 11,
  -3800000, -7, 3, -3800000,
  1300000, 0.58, 0.95,
  '2050+', true, true,
  false, false
FROM building;

-- Insert milestones
WITH building AS (SELECT id FROM buildings WHERE name = '135 Bishopsgate' LIMIT 1)
INSERT INTO milestones (building_id, name, milestone_type, year, description)
SELECT building.id, 'MEES EPC C Deadline', 'mees_deadline', 2027, 'Minimum EPC C required for letting'
FROM building
UNION ALL
SELECT building.id, '70% Leases Expire', 'lease_expiry', 2028, '70% of tenant leases expire'
FROM building
UNION ALL
SELECT building.id, 'Boiler End of Life', 'equipment_eol', 2030, 'Main boiler requires replacement'
FROM building
UNION ALL
SELECT building.id, 'MEES EPC B Deadline', 'mees_deadline', 2030, 'Minimum EPC B required for letting'
FROM building;
