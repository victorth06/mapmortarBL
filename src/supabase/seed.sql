-- Seed data for quick demo/editing in Supabase

-- Building
insert into public.buildings (name, address, postcode, size_m2)
select '135 Bishopsgate', 'London EC2M 3YD', 'EC2M 3YD', 50000
where not exists (
  select 1 from public.buildings where name = '135 Bishopsgate'
);

-- Interventions library
insert into public.interventions (name, category, strategy_type)
values
  ('Thermostat Setpoints','Optimisation','Optimisation'),
  ('BMS Upgrade','Optimisation','Optimisation'),
  ('LED Lighting','Light Retrofit','Light Retrofit'),
  ('Double Glazing','Deep Retrofit','Deep Retrofit'),
  ('Solar PV','Light Retrofit','Light Retrofit'),
  ('Heat Pump','Deep Retrofit','Deep Retrofit')
on conflict (name) do nothing;

-- Create baseline and two scenarios for the building
with b as (
  select id from public.buildings where name='135 Bishopsgate' limit 1
)
insert into public.scenarios (building_id, name, type, description, is_baseline)
select id, 'Business as Usual', 'bau', 'Do-nothing baseline', true from b
where not exists (
  select 1 from public.scenarios s where s.building_id = b.id and s.name = 'Business as Usual'
);

with b as (
  select id from public.buildings where name='135 Bishopsgate' limit 1
)
insert into public.scenarios (
  building_id, name, type, description, is_recommended,
  capex, rent_protected, annual_savings, simple_payback_years,
  energy_reduction, carbon_reduction, crrem_aligned_until,
  discount_rate_pct, energy_escalation_pct, include_opex
)
select id, 'EPC C by 2027', 'epc_c_2027', 'Achieves EPC C by 2027', true,
  2800000, 2100000, 68000, 8.5,
  35, 35, '2036',
  6, 3, false
from b
where not exists (
  select 1 from public.scenarios s where s.building_id = b.id and s.name = 'EPC C by 2027'
);

with b as (
  select id from public.buildings where name='135 Bishopsgate' limit 1
)
insert into public.scenarios (
  building_id, name, type, description,
  capex, rent_protected, annual_savings, simple_payback_years,
  energy_reduction, carbon_reduction, crrem_aligned_until,
  discount_rate_pct, energy_escalation_pct, include_opex
)
select id, 'Net Zero 2050', 'net_zero_2050', 'Near-complete decarbonisation',
  6200000, 5200000, 142000, 11,
  58, 95, '2050+',
  6, 3, false
from b
where not exists (
  select 1 from public.scenarios s where s.building_id = b.id and s.name = 'Net Zero 2050'
);

-- Create 20 units with realistic EPC scores and rent data
with b as (
  select id bid from public.buildings where name='135 Bishopsgate' limit 1
)
insert into public.units (
  building_id, name, floor, size_m2, epc_rating, epc_score, current_rent, market_rent, rent_per_m2, is_vacant
)
select bid, unit_name, unit_floor, unit_size, epc_rating, epc_score, current_rent, market_rent, rent_per_m2, is_vacant
from b,
(values
  -- Ground Floor Retail Units (EPC C-D)
  ('Ground Floor Retail Unit 1', 'Ground', 850, 'C', 75, 425000, 450000, 500, false),
  ('Ground Floor Retail Unit 2', 'Ground', 650, 'D', 65, 325000, 350000, 500, false),
  
  -- 1st Floor Office Units (EPC B-C)
  ('1st Floor Office Suite A', '1st', 1200, 'B', 85, 480000, 500000, 400, false),
  ('1st Floor Office Suite B', '1st', 1000, 'C', 70, 400000, 420000, 400, false),
  ('1st Floor Office Suite C', '1st', 800, 'C', 72, 320000, 340000, 400, false),
  
  -- 2nd Floor Office Units (EPC C-D)
  ('2nd Floor Office Suite A', '2nd', 1100, 'C', 68, 440000, 460000, 400, false),
  ('2nd Floor Office Suite B', '2nd', 900, 'D', 58, 360000, 380000, 400, false),
  ('2nd Floor Office Suite C', '2nd', 750, 'D', 55, 300000, 320000, 400, false),
  
  -- 3rd Floor Office Units (EPC B-C)
  ('3rd Floor Office Suite A', '3rd', 1300, 'B', 88, 520000, 540000, 400, false),
  ('3rd Floor Office Suite B', '3rd', 950, 'C', 74, 380000, 400000, 400, false),
  ('3rd Floor Office Suite C', '3rd', 700, 'C', 71, 280000, 300000, 400, false),
  
  -- 4th Floor Office Units (EPC C-E)
  ('4th Floor Office Suite A', '4th', 1050, 'C', 69, 420000, 440000, 400, false),
  ('4th Floor Office Suite B', '4th', 850, 'D', 62, 340000, 360000, 400, false),
  ('4th Floor Office Suite C', '4th', 600, 'E', 45, 240000, 260000, 400, false),
  
  -- 5th Floor Office Units (EPC B-D)
  ('5th Floor Office Suite A', '5th', 1400, 'B', 90, 560000, 580000, 400, false),
  ('5th Floor Office Suite B', '5th', 1000, 'C', 73, 400000, 420000, 400, false),
  ('5th Floor Office Suite C', '5th', 800, 'D', 60, 320000, 340000, 400, false),
  
  -- 6th Floor Office Units (EPC D-E) - Higher risk
  ('6th Floor Office Suite A', '6th', 950, 'D', 55, 380000, 400000, 400, false),
  ('6th Floor Office Suite B', '6th', 750, 'E', 42, 300000, 320000, 400, false),
  
  -- Common Areas (EPC E-F) - No rent but still at risk
  ('Common Areas - Ground', 'Ground', 500, 'E', 40, 0, 0, 0, false),
  ('Common Areas - Upper', 'Upper', 300, 'F', 25, 0, 0, 0, false)
) as units(unit_name, unit_floor, unit_size, epc_rating, epc_score, current_rent, market_rent, rent_per_m2, is_vacant)
where not exists (
  select 1 from public.units u where u.building_id = b.bid and u.name = units.unit_name
);

with s as (
  select id, name from public.scenarios where name in ('EPC C by 2027','Net Zero 2050')
), u as (
  select id uid from public.units where name='Ground Floor Retail Unit 1' limit 1
), v as (
  select * from (
    values
      ('Thermostat Setpoints', 0::numeric, 83527::numeric, 124::numeric, 198690::numeric, 0::int, 0::int, 0::numeric),
      ('BMS Upgrade', 120, 35000, 28, 95000, 2025, 2025, 3.5),
      ('LED Lighting', 681, 102620, 61, 450090, 2025, 2026, 7),
      ('Double Glazing', 2622, 15205, 73, 77818, 2026, 2026, 20),
      ('Solar PV', 450, 38000, 45, 280000, 2027, 2028, 12),
      ('Heat Pump', 890, 48000, 95, -120000, 2029, 2030, 18)
  ) as t(name, capex, annual_saving, co2_saved, energy_saving, sy, ey, payback_years)
)
insert into public.unit_interventions (
  unit_id, scenario_id, intervention_id, intervention_name, category,
  capex, annual_saving, carbon_reduction_tco2e, energy_reduction_kwh,
  payback_years, planned_start_year, planned_end_year, status
)
select
  u.uid, s.id, i.id, i.name, i.category,
  v.capex*1000, v.annual_saving, v.co2_saved, v.energy_saving,
  v.payback_years, v.sy, v.ey, 'planned'
from s
cross join u
join v on true
join public.interventions i on i.name = v.name
where not exists (
  select 1 from public.unit_interventions ui
  where ui.unit_id = u.uid
    and ui.scenario_id = s.id
    and ui.intervention_name = v.name
);

-- Scenario yearly results (example rows for EPC C)
with s as (
  select id sid from public.scenarios where name='EPC C by 2027' limit 1
)
insert into public.scenario_results (
  scenario_id, year, annual_capex, annual_savings, annual_opex
)
select sid, y, capex, savings, 0 from s,
  (values
    (2024, 0, 0),
    (2025, -2000000, 0),
    (2026, -4500000, 0),
    (2027, -6058000, 0),
    (2028, -5916000, 0),
    (2029, -5774000, 0),
    (2030, -5490000, 0),
    (2031, 0, 5348000),
    (2032, 0, 5064000)
  ) as d(y, capex, savings)
on conflict (scenario_id, year) do nothing;

-- Milestones
with b as (
  select id bid from public.buildings where name='135 Bishopsgate' limit 1
)
insert into public.milestones (building_id, name, milestone_type, year, description)
select bid, 'MEES EPC C', 'compliance', 2027, null from b
where not exists (
  select 1 from public.milestones m where m.building_id = b.bid and m.name='MEES EPC C' and m.year=2027
);

with b as (
  select id bid from public.buildings where name='135 Bishopsgate' limit 1
)
insert into public.milestones (building_id, name, milestone_type, year, description)
select bid, '70% Leases End', 'leasing', 2028, null from b
where not exists (
  select 1 from public.milestones m where m.building_id = b.bid and m.name='70% Leases End' and m.year=2028
);


