# Building Configuration System

This centralized configuration system ensures data consistency across all components in the application.

## Files

- `buildingConfig.ts` - Centralized building and scenario configuration

## Usage

### Import the configuration
```typescript
import { buildingConfig, getScenarioConfigByName, calculateProjectedValues } from '../../config/buildingConfig';
```

### Get building information
```typescript
const building = buildingConfig;
console.log(building.name); // "135 Bishopsgate"
console.log(building.buildingArea); // 4081 m²
console.log(building.baseline.annualSpend); // £83,400/year
```

### Get scenario data
```typescript
const epcCScenario = getScenarioConfigByName('EPC C by 2027');
console.log(epcCScenario?.capex); // £2,500,000
console.log(epcCScenario?.annualSavings); // £68,000
console.log(epcCScenario?.energyReduction); // 35%
```

### Calculate projected values
```typescript
const scenario = getScenarioConfigByName('Net Zero 2050');
const projected = calculateProjectedValues(scenario);
console.log(projected.projectedEnergyUse); // Reduced energy use
console.log(projected.projectedCarbon); // Reduced carbon emissions
```

## Configuration Structure

### BuildingConfig
- Basic building information (name, address, area)
- Energy rates (electricity: 26.35p/kWh, gas: 6.29p/kWh)
- Baseline performance metrics
- Rental configuration

### ScenarioConfig
- Financial metrics (CAPEX, savings, payback)
- Environmental impact (energy/carbon reduction)
- Compliance information (CRREM alignment)
- Intervention details

## Benefits

1. **Data Consistency** - Single source of truth for all building data
2. **Easy Updates** - Change values in one place, updates everywhere
3. **Type Safety** - TypeScript interfaces ensure correct data structure
4. **Calculated Values** - Helper functions for derived metrics
5. **Scenario Management** - Easy to add new scenarios or modify existing ones

## Adding New Scenarios

To add a new scenario, simply add it to the `scenarioConfigs` array in `buildingConfig.ts`:

```typescript
{
  id: 'new-scenario',
  name: 'New Scenario Name',
  description: 'Description of the scenario',
  targetYear: 2030,
  scenarioType: 'epc_c',
  capex: 1000000,
  annualSavings: 50000,
  paybackYears: 20,
  // ... other properties
}
```

## Updating Values

To update any building or scenario values:

1. Edit the values in `buildingConfig.ts`
2. All components using the config will automatically reflect the changes
3. No need to update multiple files

This system ensures that the ExecutiveOverview and ScenarioOverviewPage always show consistent data!
