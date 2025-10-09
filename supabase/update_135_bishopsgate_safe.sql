-- Safe update script for 135 Bishopsgate data
-- This script only updates columns that are likely to exist

-- First, let's check what columns exist in the buildings table
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'buildings' 
ORDER BY ordinal_position;

-- Update the building record (only common columns)
UPDATE buildings 
SET 
  name = '135 Bishopsgate',
  address = '135 Bishopsgate, Broadgate, London EC2M 3YD',
  updated_at = NOW()
WHERE id = '550e8400-e29b-41d4-a716-446655440000';

-- Check if building_energy_baseline table exists and has the right columns
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'building_energy_baseline' 
ORDER BY ordinal_position;

-- Update baseline energy data (if table exists)
UPDATE building_energy_baseline 
SET 
  total_energy_use = 490.0,
  electricity_use = 294000,
  gas_use = 196000,
  energy_use_intensity = 120.0,
  electricity_intensity = 72.0,
  gas_intensity = 48.0,
  updated_at = NOW()
WHERE building_id = '550e8400-e29b-41d4-a716-446655440000' AND year = 2024;

-- Check if building_carbon_baseline table exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'building_carbon_baseline' 
ORDER BY ordinal_position;

-- Update baseline carbon data (if table exists)
UPDATE building_carbon_baseline 
SET 
  total_carbon = 98.5,
  carbon_intensity = 10.8,
  updated_at = NOW()
WHERE building_id = '550e8400-e29b-41d4-a716-446655440000' AND year = 2024;

-- Check if building_cost_baseline table exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'building_cost_baseline' 
ORDER BY ordinal_position;

-- Update baseline cost data (if table exists)
UPDATE building_cost_baseline 
SET 
  annual_spend = 83400.00,
  cost_per_m2 = 20.4,
  updated_at = NOW()
WHERE building_id = '550e8400-e29b-41d4-a716-446655440000' AND year = 2024;

-- Check if scenarios table exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'scenarios' 
ORDER BY ordinal_position;

-- Update scenarios (if table exists)
UPDATE scenarios 
SET 
  name = 'EPC C by 2027',
  description = 'Pathway Refresh scenario to achieve EPC C rating by 2027',
  target_year = 2027,
  updated_at = NOW()
WHERE id = '550e8400-e29b-41d4-a716-446655440001';

UPDATE scenarios 
SET 
  name = 'Net Zero 2050',
  description = 'CRREM Pathway scenario to achieve net zero by 2050',
  target_year = 2050,
  updated_at = NOW()
WHERE id = '550e8400-e29b-41d4-a716-446655440002';

-- Check if scenario_impacts table exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'scenario_impacts' 
ORDER BY ordinal_position;

-- Update scenario impacts (if table exists)
UPDATE scenario_impacts 
SET 
  energy_reduction = 42.0,
  carbon_reduction = 84.0,
  cost_savings = 35000.00,
  payback_years = 3.9,
  stranded_year = 2036,
  updated_at = NOW()
WHERE scenario_id = '550e8400-e29b-41d4-a716-446655440001';

UPDATE scenario_impacts 
SET 
  energy_reduction = 80.0,
  carbon_reduction = 95.0,
  cost_savings = 66700.00,
  payback_years = 7.4,
  stranded_year = 2050,
  updated_at = NOW()
WHERE scenario_id = '550e8400-e29b-41d4-a716-446655440002';

-- Check if scenario_totals table exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'scenario_totals' 
ORDER BY ordinal_position;

-- Update scenario totals (if table exists)
UPDATE scenario_totals 
SET 
  total_cost = 136000.00,
  total_electricity_saving = 123480.00,
  total_gas_saving = 82320.00,
  total_cost_saving = 35000.00,
  total_co2e_saving = 82740.00,
  average_payback_years = 3.9,
  updated_at = NOW()
WHERE scenario_id = '550e8400-e29b-41d4-a716-446655440001';

UPDATE scenario_totals 
SET 
  total_cost = 380000.00,
  total_electricity_saving = 235200.00,
  total_gas_saving = 156800.00,
  total_cost_saving = 66700.00,
  total_co2e_saving = 93575.00,
  average_payback_years = 7.4,
  updated_at = NOW()
WHERE scenario_id = '550e8400-e29b-41d4-a716-446655440002';

-- Check if building_units table exists
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'building_units' 
ORDER BY ordinal_position;

-- Create building_units table if it doesn't exist
CREATE TABLE IF NOT EXISTS building_units (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  building_id UUID REFERENCES buildings(id) ON DELETE CASCADE,
  unit_name TEXT NOT NULL,
  address TEXT,
  gross_internal_area_sqft DECIMAL(10,2),
  gross_internal_area_m2 DECIMAL(10,2),
  occupancy_class TEXT,
  annual_rent DECIMAL(12,2),
  energy_use DECIMAL(10,2),
  electricity_use DECIMAL(10,2),
  gas_use DECIMAL(10,2),
  energy_cost DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clear existing unit data for this building
DELETE FROM building_units WHERE building_id = '550e8400-e29b-41d4-a716-446655440000';

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

-- Verify the updates
SELECT 'Building updated:' as status, name, address FROM buildings WHERE id = '550e8400-e29b-41d4-a716-446655440000';
SELECT 'Units created:' as status, COUNT(*) as unit_count FROM building_units WHERE building_id = '550e8400-e29b-41d4-a716-446655440000';
