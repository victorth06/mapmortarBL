-- Migration: Building and Scenario Data Schema
-- Description: Schema for storing building baseline data and scenario analysis results

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Buildings table
CREATE TABLE buildings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT,
  building_area DECIMAL(10,2), -- m²
  building_type TEXT,
  construction_year INTEGER,
  epc_rating TEXT,
  cibse_benchmark TEXT,
  transition_risk TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Building baseline energy data
CREATE TABLE building_energy_baseline (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  building_id UUID REFERENCES buildings(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  total_energy_use DECIMAL(10,2), -- MWh/year
  electricity_use DECIMAL(12,2), -- kWh/year
  gas_use DECIMAL(12,2), -- kWh/year
  energy_use_intensity DECIMAL(8,2), -- kWh/m²
  electricity_intensity DECIMAL(8,2), -- kWh/m²
  gas_intensity DECIMAL(8,2), -- kWh/m²
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(building_id, year)
);

-- Building baseline carbon data
CREATE TABLE building_carbon_baseline (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  building_id UUID REFERENCES buildings(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  total_carbon DECIMAL(10,2), -- tCO₂e/year
  carbon_intensity DECIMAL(8,2), -- kgCO₂/m²
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(building_id, year)
);

-- Building baseline cost data
CREATE TABLE building_cost_baseline (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  building_id UUID REFERENCES buildings(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  annual_spend DECIMAL(12,2), -- £/year
  cost_per_m2 DECIMAL(8,2), -- £/m²
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(building_id, year)
);

-- Scenarios table
CREATE TABLE scenarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  building_id UUID REFERENCES buildings(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  target_year INTEGER,
  scenario_type TEXT, -- 'epc_c', 'net_zero_2050', 'custom'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scenario impact data
CREATE TABLE scenario_impacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  scenario_id UUID REFERENCES scenarios(id) ON DELETE CASCADE,
  energy_reduction DECIMAL(5,2), -- percentage
  carbon_reduction DECIMAL(5,2), -- percentage
  cost_savings DECIMAL(12,2), -- £/year
  payback_years DECIMAL(5,2),
  stranded_year INTEGER, -- when building becomes non-compliant
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scenario totals (financial summary)
CREATE TABLE scenario_totals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  scenario_id UUID REFERENCES scenarios(id) ON DELETE CASCADE,
  total_cost DECIMAL(12,2), -- £
  total_electricity_saving DECIMAL(12,2), -- kWh
  total_gas_saving DECIMAL(12,2), -- kWh
  total_cost_saving DECIMAL(12,2), -- £
  total_co2e_saving DECIMAL(12,2), -- kgCO₂e
  average_payback_years DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Intervention categories
CREATE TABLE intervention_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  scenario_id UUID REFERENCES scenarios(id) ON DELETE CASCADE,
  name TEXT NOT NULL, -- 'Optimise', 'Light Retrofit', 'Deep Retrofit', 'Renewable'
  order_index INTEGER,
  total_cost DECIMAL(12,2),
  total_electricity_saving DECIMAL(12,2),
  total_gas_saving DECIMAL(12,2),
  total_cost_saving DECIMAL(12,2),
  total_co2e_saving DECIMAL(12,2),
  average_payback_years DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Intervention measures
CREATE TABLE intervention_measures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES intervention_categories(id) ON DELETE CASCADE,
  initiative TEXT NOT NULL,
  cost DECIMAL(12,2), -- £
  electricity_saving DECIMAL(12,2), -- kWh
  gas_saving DECIMAL(12,2), -- kWh
  cost_saving DECIMAL(12,2), -- £
  co2e_saving DECIMAL(12,2), -- kgCO₂e
  payback_years DECIMAL(5,2), -- null for N/A
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Monthly energy pattern data
CREATE TABLE monthly_energy_patterns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  building_id UUID REFERENCES buildings(id) ON DELETE CASCADE,
  scenario_id UUID REFERENCES scenarios(id) ON DELETE CASCADE,
  month INTEGER NOT NULL, -- 1-12
  electricity DECIMAL(10,2), -- kWh
  gas DECIMAL(10,2), -- kWh
  period TEXT NOT NULL, -- 'before' or 'after'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(building_id, scenario_id, month, period)
);

-- CRREM trajectory data
CREATE TABLE crrem_trajectory_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  building_id UUID REFERENCES buildings(id) ON DELETE CASCADE,
  scenario_id UUID REFERENCES scenarios(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  baseline DECIMAL(8,2),
  scenario DECIMAL(8,2),
  crrem DECIMAL(8,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(building_id, scenario_id, year)
);

-- Energy waterfall data
CREATE TABLE energy_waterfall_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  building_id UUID REFERENCES buildings(id) ON DELETE CASCADE,
  scenario_id UUID REFERENCES scenarios(id) ON DELETE CASCADE,
  stage TEXT NOT NULL,
  eui DECIMAL(8,2), -- energy use intensity (kWh/m²)
  reduction DECIMAL(5,2), -- percentage reduction from baseline
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(building_id, scenario_id, stage)
);

-- Create indexes for better performance
CREATE INDEX idx_buildings_name ON buildings(name);
CREATE INDEX idx_building_energy_baseline_building_year ON building_energy_baseline(building_id, year);
CREATE INDEX idx_building_carbon_baseline_building_year ON building_carbon_baseline(building_id, year);
CREATE INDEX idx_building_cost_baseline_building_year ON building_cost_baseline(building_id, year);
CREATE INDEX idx_scenarios_building ON scenarios(building_id);
CREATE INDEX idx_scenario_impacts_scenario ON scenario_impacts(scenario_id);
CREATE INDEX idx_scenario_totals_scenario ON scenario_totals(scenario_id);
CREATE INDEX idx_intervention_categories_scenario ON intervention_categories(scenario_id);
CREATE INDEX idx_intervention_measures_category ON intervention_measures(category_id);
CREATE INDEX idx_monthly_energy_patterns_building_scenario ON monthly_energy_patterns(building_id, scenario_id);
CREATE INDEX idx_crrem_trajectory_building_scenario ON crrem_trajectory_data(building_id, scenario_id);
CREATE INDEX idx_energy_waterfall_building_scenario ON energy_waterfall_data(building_id, scenario_id);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to all tables
CREATE TRIGGER update_buildings_updated_at BEFORE UPDATE ON buildings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_building_energy_baseline_updated_at BEFORE UPDATE ON building_energy_baseline FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_building_carbon_baseline_updated_at BEFORE UPDATE ON building_carbon_baseline FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_building_cost_baseline_updated_at BEFORE UPDATE ON building_cost_baseline FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_scenarios_updated_at BEFORE UPDATE ON scenarios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_scenario_impacts_updated_at BEFORE UPDATE ON scenario_impacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_scenario_totals_updated_at BEFORE UPDATE ON scenario_totals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_intervention_categories_updated_at BEFORE UPDATE ON intervention_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_intervention_measures_updated_at BEFORE UPDATE ON intervention_measures FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_monthly_energy_patterns_updated_at BEFORE UPDATE ON monthly_energy_patterns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_crrem_trajectory_data_updated_at BEFORE UPDATE ON crrem_trajectory_data FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_energy_waterfall_data_updated_at BEFORE UPDATE ON energy_waterfall_data FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for 135 Bishopsgate building
INSERT INTO buildings (id, name, address, building_area, building_type, construction_year, epc_rating, cibse_benchmark, transition_risk) 
VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  '135 Bishopsgate',
  '135 Bishopsgate, Broadgate, London EC2M 3YD',
  4081.00, -- 43,930 sq ft converted to m²
  'Office',
  2010,
  'D',
  'Below Average',
  'Low'
);

-- Insert baseline energy data for 2024 (135 Bishopsgate)
INSERT INTO building_energy_baseline (building_id, year, total_energy_use, electricity_use, gas_use, energy_use_intensity, electricity_intensity, gas_intensity)
VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  2024,
  490.0, -- MWh/year
  294000, -- kWh/year
  196000, -- kWh/year
  120.0, -- kWh/m²
  72.0, -- kWh/m²
  48.0 -- kWh/m²
);

-- Insert baseline carbon data for 2024
INSERT INTO building_carbon_baseline (building_id, year, total_carbon, carbon_intensity)
VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  2024,
  98.5, -- tCO₂e/year
  10.8 -- kgCO₂/m²
);

-- Insert baseline cost data for 2024 (using 26.35p/kWh electricity, 6.29p/kWh gas)
INSERT INTO building_cost_baseline (building_id, year, annual_spend, cost_per_m2)
VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  2024,
  83400.00, -- £/year (294k * 0.2635 + 196k * 0.0629)
  20.4 -- £/m²
);

-- Insert EPC C scenario
INSERT INTO scenarios (id, building_id, name, description, target_year, scenario_type)
VALUES (
  '550e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440000',
  'EPC C by 2027',
  'Pathway Refresh scenario to achieve EPC C rating by 2027',
  2027,
  'epc_c'
);

-- Insert Net Zero 2050 scenario
INSERT INTO scenarios (id, building_id, name, description, target_year, scenario_type)
VALUES (
  '550e8400-e29b-41d4-a716-446655440002',
  '550e8400-e29b-41d4-a716-446655440000',
  'Net Zero 2050',
  'CRREM Pathway scenario to achieve net zero by 2050',
  2050,
  'net_zero_2050'
);

-- Insert scenario impacts (scaled for 135 Bishopsgate)
INSERT INTO scenario_impacts (scenario_id, energy_reduction, carbon_reduction, cost_savings, payback_years, stranded_year)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440001', 42.0, 84.0, 35000.00, 3.9, 2036),
  ('550e8400-e29b-41d4-a716-446655440002', 80.0, 95.0, 66700.00, 7.4, 2050);

-- Insert scenario totals (scaled for 135 Bishopsgate)
INSERT INTO scenario_totals (scenario_id, total_cost, total_electricity_saving, total_gas_saving, total_cost_saving, total_co2e_saving, average_payback_years)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440001', 136000.00, 123480.00, 82320.00, 35000.00, 82740.00, 3.9),
  ('550e8400-e29b-41d4-a716-446655440002', 380000.00, 235200.00, 156800.00, 66700.00, 93575.00, 7.4);

-- Insert unit data for 135 Bishopsgate
CREATE TABLE building_units (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  building_id UUID REFERENCES buildings(id) ON DELETE CASCADE,
  unit_name TEXT NOT NULL,
  address TEXT,
  gross_internal_area_sqft DECIMAL(10,2),
  gross_internal_area_m2 DECIMAL(10,2),
  occupancy_class TEXT,
  annual_rent DECIMAL(12,2), -- £/year
  energy_use DECIMAL(10,2), -- kWh/year
  electricity_use DECIMAL(10,2), -- kWh/year
  gas_use DECIMAL(10,2), -- kWh/year
  energy_cost DECIMAL(10,2), -- £/year
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert the 7 units for 135 Bishopsgate
INSERT INTO building_units (building_id, unit_name, address, gross_internal_area_sqft, gross_internal_area_m2, occupancy_class, annual_rent, energy_use, electricity_use, gas_use, energy_cost)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'Eataly', 'Eataly 135 Bishopsgate London EC2M 3YD', 4223.0, 392.3, 'Retail', 422300.00, 47000.0, 28200.0, 18800.0, 7800.0),
  ('550e8400-e29b-41d4-a716-446655440000', 'TP ICAP', '2nd, 3rd and 4th floors 135 Bishopsgate LONDON EC2M 3YD', 13451.0, 1249.6, 'Office', 1345100.00, 150000.0, 90000.0, 60000.0, 24900.0),
  ('550e8400-e29b-41d4-a716-446655440000', 'McCann', '5th, 6th, 7th and 8th floors 135 Bishopsgate LONDON EC2M 3YD', 17005.6, 1579.9, 'Office', 1700560.00, 190000.0, 114000.0, 76000.0, 31500.0),
  ('550e8400-e29b-41d4-a716-446655440000', 'TP ICAP (9th Floor)', 'Ninth floor 135 Bishopsgate LONDON EC2M 3YD', 2572.0, 238.9, 'Office', 257200.00, 29000.0, 17400.0, 11600.0, 4800.0),
  ('550e8400-e29b-41d4-a716-446655440000', 'FNZ', 'Tenth floor 135 Bishopsgate LONDON EC2M 3YD', 4251.4, 395.0, 'Office', 425140.00, 47000.0, 28200.0, 18800.0, 7800.0),
  ('550e8400-e29b-41d4-a716-446655440000', 'TP ICAP (11th Floor)', 'Eleventh floor 135 Bishopsgate LONDON EC2M 3YD', 1696.0, 157.6, 'Office', 169600.00, 19000.0, 11400.0, 7600.0, 3150.0),
  ('550e8400-e29b-41d4-a716-446655440000', 'Vacant', '12TH FLOOR 135 BISHOPSGATE LONDON EC2M 3YD', 731.0, 67.9, 'Vacant', 0.00, 8000.0, 4800.0, 3200.0, 1350.0);

-- Create index for building units
CREATE INDEX idx_building_units_building ON building_units(building_id);

-- Create trigger for building_units
CREATE TRIGGER update_building_units_updated_at BEFORE UPDATE ON building_units FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
