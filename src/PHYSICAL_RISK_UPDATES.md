# Physical Risk Cards - Update Summary

## Changes Made

### 1. Removed Large Headline Text
**Before:** Cards displayed "Low" / "Medium" in large 32px font  
**After:** Large headline text is hidden for physical risk cards

### 2. Traffic Light as Primary Indicator
The traffic light badge is now the first visual element users see:
- 🟢 "Low Risk - Monitoring only" (Flood Risk)
- 🟡 "Medium Risk - Action needed by 2040" (Overheating Risk)

### 3. Supporting Context Maintained
Below the traffic light, cards still show:
- Environmental Agency data ("1 in 1000 year event")
- CIBSE TM59 scenario information
- Surface water risk ratings

### 4. Italicized Recommendations Maintained
Opportunity text remains at the bottom in italicized gray:
- "No immediate mitigation required → maintain monitoring."
- "Passive cooling & shading → mitigate tenant comfort risk."

### 5. Visual De-emphasis
Physical risk cards are now visually lighter compared to energy/carbon cards:

**De-emphasis Techniques:**
- **Opacity**: 90% opacity on entire card (vs 100% for primary cards)
- **Icon Background**: Gray (`bg-gray-100`) instead of blue (`bg-[#F3F4F6]`)
- **Icon Color**: Muted gray (`text-gray-500`) instead of vibrant blue (`text-[#3B82F6]`)
- **Compact Layout**: No large value section → more vertical space for content
- **Visual Weight**: Less prominent without drawing attention away from core metrics

## Technical Implementation

### New Variant Prop
Added `variant` prop to KPICard component:
```tsx
variant?: 'default' | 'physical-risk'
```

### Usage
```tsx
<KPICard
  title="Flood Risk"
  value="Low" // Still passed but hidden in UI
  variant="physical-risk" // Triggers special styling
  performanceLabel={{
    text: "Low Risk - Monitoring only",
    color: "success"
  }}
  icon={Droplets}
  benchmarks={[...]}
  opportunity="..."
  cta={{...}}
/>
```

### Layout Hierarchy

**Physical Risk Card Structure:**
1. Header (title + gray icon)
2. Traffic Light Badge (primary visual indicator)
3. Supporting Context (benchmarks)
4. Italicized Opportunity Text
5. CTA Button

**Standard KPI Card Structure:**
1. Header (title + blue icon)
2. Large Value (32px number)
3. Traffic Light Badge
4. Supporting Metrics
5. Italicized Opportunity Text
6. CTA Button

## Benefits

### ✅ Cleaner Layout
- No redundancy between large text and traffic light
- More efficient use of space
- Consistent visual pattern across all cards

### ✅ Appropriate Visual Weight
- Physical risks don't overshadow energy/carbon priorities
- Reflects current product focus on actionable transition risks
- Still visible and accessible for monitoring

### ✅ Maintains Information
- All context and recommendations preserved
- No loss of data or insight
- Traffic light provides instant risk assessment

### ✅ Consistency
- Aligns with traffic light system across dashboard
- Same positioning pattern (header → indicator → details)
- Unified design language

## Product Positioning

Physical risks are **important to note** but **not currently actionable** through the core retrofit pathways product. This visual hierarchy reflects that strategic positioning:

- **Primary Focus**: Energy, Carbon, MEES, CRREM (large, prominent)
- **Secondary Monitoring**: Physical climate risks (compact, de-emphasized)

This ensures the dashboard maintains focus on the core value proposition while still providing comprehensive risk coverage for senior sustainability leaders.