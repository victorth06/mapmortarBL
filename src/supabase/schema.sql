-- Schema for Sustainable Asset Web Report (matches src/utils/supabase/types.ts and queries.ts)
-- Run this in Supabase SQL editor. Adjust RLS as needed.

-- Enums
do $$ begin
  create type scenario_type as enum ('bau','epc_c_2027','net_zero_2050','custom');
exception when duplicate_object then null; end $$;

do $$ begin
  create type intervention_status as enum ('planned','in_progress','completed');
exception when duplicate_object then null; end $$;

-- Core tables
create table if not exists public.buildings (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid, -- link to auth.users.id for RLS ownership
  name text not null,
  address text,
  postcode text,
  currency text default 'GBP',
  size_m2 numeric,
  gross_internal_area numeric,
  occupancy_rate numeric,
  construction_year int,
  refurbishment_year int,
  building_type text,
  -- Energy metrics
  total_energy_kwh numeric,
  energy_intensity numeric,
  electricity_percentage numeric,
  gas_percentage numeric,
  -- Carbon metrics
  total_carbon_tco2e numeric,
  carbon_intensity numeric,
  -- Cost metrics
  annual_energy_cost numeric,
  cost_per_m2 numeric,
  -- CRREM
  crrem_stranded_year int,
  years_to_stranding int,
  -- Metadata
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.units (
  id uuid primary key default gen_random_uuid(),
  building_id uuid not null references public.buildings(id) on delete cascade,
  name text not null,
  floor text,
  size_m2 numeric not null,
  -- EPC
  epc_rating text,
  epc_score numeric,
  epc_expiry date,
  epc_certificate_number text,
  -- Rent
  current_rent numeric,
  market_rent numeric,
  rent_per_m2 numeric,
  -- Energy
  annual_energy_kwh numeric,
  energy_intensity numeric,
  -- Status
  is_vacant boolean not null default false,
  -- Metadata
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_units_building on public.units(building_id);

create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  industry text,
  contact_email text,
  contact_phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.unit_tenants (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references public.units(id) on delete cascade,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  lease_start date not null,
  lease_end date not null,
  rent_per_annum numeric not null,
  break_option text,
  break_notice_months int,
  lease_type text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_unit_tenants_unit on public.unit_tenants(unit_id);
create index if not exists idx_unit_tenants_tenant on public.unit_tenants(tenant_id);

-- Interventions library
create table if not exists public.interventions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  description text,
  default_capex_per_m2 numeric,
  default_capex_fixed numeric,
  default_saving_per_m2 numeric,
  default_saving_percentage numeric,
  default_carbon_reduction_percentage numeric,
  default_payback_years numeric,
  lifespan_years numeric,
  maintenance_cost_annual numeric,
  strategy_type text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index if not exists idx_interventions_name on public.interventions(name);

-- Scenarios
create table if not exists public.scenarios (
  id uuid primary key default gen_random_uuid(),
  building_id uuid not null references public.buildings(id) on delete cascade,
  name text not null,
  type scenario_type not null default 'custom',
  description text,
  -- Financial metrics
  capex numeric,
  annual_savings numeric,
  simple_payback_years numeric,        -- keep only simple payback at scenario level
  npv numeric,                         -- scenario-level summary (not per year)
  irr numeric,
  roi_10y numeric,
  dcf numeric,
  -- Impact metrics
  rent_protected numeric,
  energy_reduction numeric,
  carbon_reduction numeric,
  total_energy_saved_kwh numeric,
  total_carbon_saved_tco2e numeric,
  -- Compliance
  crrem_aligned_until text,
  mees_compliant_2027 boolean,
  mees_compliant_2030 boolean,
  -- Assumptions for reproducibility
  discount_rate_pct numeric,
  energy_escalation_pct numeric,
  include_opex boolean default false,
  -- Versioning/snapshots
  version_label text,
  snapshot_of uuid references public.scenarios(id) on delete set null,
  -- Flags
  is_baseline boolean not null default false,
  is_recommended boolean not null default false,
  -- Metadata
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_scenarios_building on public.scenarios(building_id);

-- Unit-specific interventions assigned to a scenario
create table if not exists public.unit_interventions (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references public.units(id) on delete cascade,
  scenario_id uuid not null references public.scenarios(id) on delete cascade,
  intervention_id uuid references public.interventions(id) on delete set null,
  intervention_name text not null,
  category text,
  capex numeric not null,
  annual_saving numeric,
  carbon_reduction_tco2e numeric,
  energy_reduction_kwh numeric,
  payback_years numeric,
  planned_start_year int,
  planned_end_year int,
  actual_start_date date,
  actual_end_date date,
  status intervention_status not null default 'planned',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_unit_interventions_scenario on public.unit_interventions(scenario_id);
create index if not exists idx_unit_interventions_unit on public.unit_interventions(unit_id);

-- Scenario yearly results (cashflows + performance)
create table if not exists public.scenario_results (
  id uuid primary key default gen_random_uuid(),
  scenario_id uuid not null references public.scenarios(id) on delete cascade,
  year int not null,
  annual_capex numeric not null default 0,
  annual_savings numeric not null default 0,
  annual_opex numeric not null default 0,
  net_cashflow numeric,
  cumulative_cashflow numeric,
  cumulative_discounted_cashflow numeric,
  energy_use_kwh numeric,
  energy_intensity numeric,
  carbon_emissions_tco2e numeric,
  carbon_intensity numeric,
  noi numeric,
  created_at timestamptz not null default now(),
  unique (scenario_id, year)
);
create index if not exists idx_scenario_results_scenario on public.scenario_results(scenario_id);

-- Building-level milestones
create table if not exists public.milestones (
  id uuid primary key default gen_random_uuid(),
  building_id uuid not null references public.buildings(id) on delete cascade,
  name text not null,
  milestone_type text not null,
  year int not null,
  date date,
  description text,
  impact_on_scenario text,
  created_at timestamptz not null default now()
);
create index if not exists idx_milestones_building on public.milestones(building_id);

-- Basic RLS (open read; auth required to write). Adjust for your needs.
alter table public.buildings enable row level security;
alter table public.units enable row level security;
alter table public.tenants enable row level security;
alter table public.unit_tenants enable row level security;
alter table public.interventions enable row level security;
alter table public.scenarios enable row level security;
alter table public.unit_interventions enable row level security;
alter table public.scenario_results enable row level security;
alter table public.milestones enable row level security;

-- Buildings RLS: only owner can write; everyone can read (adjust as needed)
do $$ begin
  create policy read_all_buildings on public.buildings for select using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy write_buildings_owner on public.buildings for all
  using (auth.uid() = owner_user_id)
  with check (auth.uid() = owner_user_id);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy read_all_units on public.units for select using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy read_all_tenants on public.tenants for select using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy read_all_unit_tenants on public.unit_tenants for select using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy read_all_interventions on public.interventions for select using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy read_all_scenarios on public.scenarios for select using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy read_all_unit_interventions on public.unit_interventions for select using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy read_all_scenario_results on public.scenario_results for select using (true);
exception when duplicate_object then null; end $$;
do $$ begin
  create policy read_all_milestones on public.milestones for select using (true);
exception when duplicate_object then null; end $$;

-- Authenticated write policies (broad). You can scope by user later.
-- Cascade write permissions via building ownership
-- Units
do $$ begin
  create policy write_units_owner on public.units for all
  using (exists (select 1 from public.buildings b where b.id = units.building_id and b.owner_user_id = auth.uid()))
  with check (exists (select 1 from public.buildings b where b.id = units.building_id and b.owner_user_id = auth.uid()));
exception when duplicate_object then null; end $$;

-- Scenarios
do $$ begin
  create policy write_scenarios_owner on public.scenarios for all
  using (exists (select 1 from public.buildings b where b.id = scenarios.building_id and b.owner_user_id = auth.uid()))
  with check (exists (select 1 from public.buildings b where b.id = scenarios.building_id and b.owner_user_id = auth.uid()));
exception when duplicate_object then null; end $$;

-- Unit interventions (via unit -> building)
do $$ begin
  create policy write_unit_interventions_owner on public.unit_interventions for all
  using (
    exists (
      select 1 from public.units u
      join public.buildings b on b.id = u.building_id
      where u.id = unit_interventions.unit_id and b.owner_user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.units u
      join public.buildings b on b.id = u.building_id
      where u.id = unit_interventions.unit_id and b.owner_user_id = auth.uid()
    )
  );
exception when duplicate_object then null; end $$;

-- Results (via scenario -> building)
do $$ begin
  create policy write_scenario_results_owner on public.scenario_results for all
  using (
    exists (
      select 1 from public.scenarios s
      join public.buildings b on b.id = s.building_id
      where s.id = scenario_results.scenario_id and b.owner_user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.scenarios s
      join public.buildings b on b.id = s.building_id
      where s.id = scenario_results.scenario_id and b.owner_user_id = auth.uid()
    )
  );
exception when duplicate_object then null; end $$;

-- Tenants, unit_tenants, milestones, interventions keep broad write (adjust later)
do $$ declare t text; begin
  foreach t in array array['tenants','unit_tenants','milestones','interventions']
  loop
    execute format('create policy write_%s_insert on public.%I for insert to authenticated with check (auth.role() = ''authenticated'');', t, t);
    execute format('create policy write_%s_update on public.%I for update to authenticated using (auth.role() = ''authenticated'');', t, t);
    execute format('create policy write_%s_delete on public.%I for delete to authenticated using (auth.role() = ''authenticated'');', t, t);
  end loop;
end $$;

-- Helpful indexes
create index if not exists idx_scenarios_name on public.scenarios(name);
create index if not exists idx_interventions_category on public.interventions(category);
create index if not exists idx_unit_interventions_status on public.unit_interventions(status);

-- Lease helper view: active leases by year (for rent-at-risk queries)
create or replace view public.v_unit_tenants_active_by_year as
select
  ut.id as unit_tenant_id,
  ut.unit_id,
  ut.tenant_id,
  extract(year from g.y) as year,
  ut.rent_per_annum,
  (g.y between ut.lease_start and ut.lease_end)::boolean as is_active
from public.unit_tenants ut
join generate_series(date_trunc('year', ut.lease_start), date_trunc('year', ut.lease_end), interval '1 year') as g(y) on true;


