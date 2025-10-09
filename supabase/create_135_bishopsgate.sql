-- Create 135 Bishopsgate building and units
-- This script first checks existing buildings and creates a new one if needed

-- First, let's see what buildings exist
SELECT 'Existing buildings:' as status, id, name, address FROM buildings;

-- Check if we need to create a new building or update an existing one
-- If you want to update an existing building, replace the UUID below with the actual ID

-- Option 1: Create a new building (recommended)
INSERT INTO buildings (
  id,
  name,
  address,
  postcode,
  currency,
  size_m2,
  gross_internal_area,
  occupancy_rate,
  construction_year,
  building_type,
  total_energy_kwh,
  energy_intensity,
  electricity_percentage,
  gas_percentage,
  total_carbon_tco2e,
  carbon_intensity,
  annual_energy_cost,
  cost_per_m2,
  crrem_stranded_year,
  years_to_stranding
) VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  '135 Bishopsgate',
  '135 Bishopsgate, Broadgate, London EC2M 3YD',
  'EC2M 3YD',
  'GBP',
  4081.00, -- 43,930 sq ft converted to m²
  43930.00, -- sq ft
  98.3, -- 6 out of 7 units occupied (731 sq ft vacant)
  2010,
  'Office',
  490000, -- kWh/year (490 MWh)
  120.0, -- kWh/m²
  60.0, -- 60% electricity
  40.0, -- 40% gas
  98.5, -- tCO₂e/year
  10.8, -- kgCO₂/m²
  83400.00, -- £/year (using 26.35p/kWh electricity, 6.29p/kWh gas)
  20.4, -- £/m²
  2029, -- Baseline stranded year
  5 -- Years until 2029
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  address = EXCLUDED.address,
  postcode = EXCLUDED.postcode,
  currency = EXCLUDED.currency,
  size_m2 = EXCLUDED.size_m2,
  gross_internal_area = EXCLUDED.gross_internal_area,
  occupancy_rate = EXCLUDED.occupancy_rate,
  construction_year = EXCLUDED.construction_year,
  building_type = EXCLUDED.building_type,
  total_energy_kwh = EXCLUDED.total_energy_kwh,
  energy_intensity = EXCLUDED.energy_intensity,
  electricity_percentage = EXCLUDED.electricity_percentage,
  gas_percentage = EXCLUDED.gas_percentage,
  total_carbon_tco2e = EXCLUDED.total_carbon_tco2e,
  carbon_intensity = EXCLUDED.carbon_intensity,
  annual_energy_cost = EXCLUDED.annual_energy_cost,
  cost_per_m2 = EXCLUDED.cost_per_m2,
  crrem_stranded_year = EXCLUDED.crrem_stranded_year,
  years_to_stranding = EXCLUDED.years_to_stranding,
  updated_at = NOW();

-- Create building_units table if it doesn't exist
CREATE TABLE IF NOT EXISTS building_units (
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

-- Create index for building_units if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_building_units_building ON building_units(building_id);

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

-- Verify the results
SELECT 'Building created/updated:' as status, name, address, size_m2, gross_internal_area, annual_energy_cost FROM buildings WHERE id = '550e8400-e29b-41d4-a716-446655440000';
SELECT 'Units created:' as status, COUNT(*) as unit_count, SUM(annual_rent) as total_rent FROM building_units WHERE building_id = '550e8400-e29b-41d4-a716-446655440000';
