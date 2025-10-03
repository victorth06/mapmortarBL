# Traffic Light System Documentation

## Overview
The traffic light system provides instant visual risk assessment across all dashboard cards. All traffic lights are aligned at the same vertical position for easy scanning.

## Visual Alignment Strategy

### Positioning Rules
1. **Header** (title + icon) - Always at top
2. **Traffic Light Badge** - Immediately below header
3. **Context/Definition** - Below traffic light
4. **Main Content** - Supporting details, metrics, tables
5. **Opportunity Text** - Italicized recommendation
6. **CTA Button** - Bottom right

### Implementation

#### MEES Compliance Card
- Header: "MEES Compliance Timeline" + Avg EPC badge
- Traffic Light: Risk status based on EPC distribution
- Content: Timeline table (Today/2027/2030)

#### CRREM Stranding Card  
- Header: "CRREM Stranding"
- Content: Stranded Year (large number)
- Traffic Light: Below stranded year
- Supporting: Years to stranding text

#### KPI Cards (Energy/Carbon/Spend)
- Header: Title + icon
- Main Value: Large number with unit
- Traffic Light: `performanceLabel` prop
- Supporting: Intensity metrics, fuel split, benchmarks

#### Physical Risk Cards (Flood/Overheating)
- Header: Title + icon (de-emphasized with gray colors)
- Traffic Light: Positioned directly under header (no large value)
- Supporting: Context text (e.g., "1 in 1000 year event")
- Visual De-emphasis: Lighter opacity, gray icon background

## Traffic Light Logic

### MEES Compliance Timeline
```
🔴 High Risk: Any units below EPC C
   → Immediate 2027 cliff edge risk
   
🟡 Medium Risk: All units ≥C but some below B  
   → 2030 risk, but 2027 safe
   
🟢 Low Risk: All units meet or exceed EPC B
   → Compliant through 2030+
```

**Why stricter:** EPC C is the real short-term regulatory cliff (2027 is ~2 years away), so being below C now is effectively high risk even if technically above minimum E standard.

### CRREM Stranding
```
🔴 High Risk: Stranded ≤5 years from today
   → Urgent retrofit needed
   
🟡 Medium Risk: Stranded 6-15 years away
   → Plan retrofit in medium term
   
🟢 Low Risk: Stranded >15 years or aligned beyond 2050
   → Long-term planning horizon
```

### Energy/Carbon/Spend KPIs
```
🔴 Risk: Significantly above benchmark
   → Requires immediate attention
   
🟡 Warning: Moderately above benchmark  
   → Monitor and improve
   
🟢 Success: At or below benchmark
   → Performing well
```

## Component Usage

### TrafficLight Component
```tsx
import { TrafficLight } from './TrafficLight';

<TrafficLight 
  level="high" | "medium" | "low"
  text="Risk description"
  className="mb-3"
/>
```

### KPICard performanceLabel
```tsx
// Default KPI Card (Energy/Carbon/Spend)
<KPICard
  title="Total Energy Use"
  value="2,450"
  unit="MWh/year"
  performanceLabel={{
    text: "12% above REEB benchmark",
    color: "risk" | "warning" | "success"
  }}
/>

// Physical Risk Card (Flood/Overheating)
<KPICard
  title="Flood Risk"
  value="Low" // Hidden in UI
  variant="physical-risk"
  performanceLabel={{
    text: "Low Risk - Monitoring only",
    color: "success"
  }}
/>
```

## Visual Consistency
- All traffic lights use pill-shaped badges
- Consistent emoji indicators (🔴 🟡 🟢)
- Standard color scheme:
  - Red: `bg-red-100 text-red-800 border-red-300`
  - Amber: `bg-amber-100 text-amber-800 border-amber-300`
  - Green: `bg-green-100 text-green-800 border-green-300`
- Fixed height container for main values ensures horizontal alignment across grid

## Visual Hierarchy
- **Primary Cards** (Energy/Carbon/Spend/MEES/CRREM): Full emphasis with large values and vibrant icons
- **Secondary Cards** (Physical Risks): De-emphasized with:
  - No large headline value (traffic light is primary indicator)
  - Gray icon background instead of blue
  - Lighter icon color
  - Reduced opacity (90%)
  - Compact layout focuses on traffic light + context

## Benefits
1. **Instant Risk Assessment**: Scan across row to see all risks at once
2. **Consistent Positioning**: Eye doesn't need to search for status
3. **Color + Text + Icon**: Multiple visual cues for accessibility
4. **Actionable Context**: Each indicator includes brief explanation