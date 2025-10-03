# Card + Panel Design System

## Overview

The dashboard implements a consistent card-to-panel drill-down pattern that allows users to:
1. View KPI snapshots at the overview level
2. Click to open detailed panels with comprehensive analysis
3. Explore data at building and unit levels
4. Export data and adjust assumptions

## Design Pattern

### Card Level (Overview)
Each card provides:
- **Headline KPI**: Large number with unit
- **Traffic Light**: Visual risk indicator (🔴 🟡 🟢)
- **Context**: Benchmarks and supporting metrics
- **Opportunity Statement**: Italic text explaining the "so what"
- **CTA Button**: Pill-shaped secondary button to open detail panel

### Panel Level (Drill-Down)
Each panel follows a consistent 6-section structure:

1. **KPI Bar** - Top-line metrics in gray box
2. **Charts Section** - Visual analysis (trends, comparisons, distributions)
3. **Breakdown Table** - Unit-level or granular data
4. **Scenarios** - Comparison of retrofit pathways vs "Do Nothing"
5. **Insights & Guidance** - Key takeaways in blue info box
6. **User Actions** - Export, download, edit assumptions buttons

## Implemented Panels

### 1. Energy Use Panel

**Card Trigger**: "Total Energy Use" card → "See energy breakdown" button

**Panel Content**:
- KPI Bar: Total use, intensity, vs benchmark, TM46 category
- Charts: Monthly consumption trends, fuel split pie chart
- Table: Unit-level consumption and intensity
- Scenarios: Do Nothing vs EPC C retrofit savings
- Insights: High consumption areas, heating inefficiency, quick wins
- Actions: Export data, download chart, edit assumptions, view retrofit plan

### 2. Carbon Panel

**Card Trigger**: "Annual Carbon" card → "View CRREM alignment" button

**Panel Content**:
- KPI Bar: Annual carbon, intensity, CRREM limit, stranded year
- Charts: CRREM trajectory with stranding point, retrofit pathway comparison
- Table: Carbon breakdown by fuel source with emission factors
- Scenarios: Stranding year comparison across scenarios
- Insights: Stranding urgency, intensity gap, retrofit solution
- Actions: Export CRREM report, download chart, adjust grid assumptions, view retrofit plan

### 3. Spend Panel

**Card Trigger**: "Annual Spend" card → "See cost breakdown" button

**Panel Content**:
- KPI Bar: Annual spend, spend/m², vs benchmark, price risk exposure
- Charts: Monthly spend breakdown, tariff sensitivity analysis
- Table: Unit-level costs and priority ratings
- Scenarios: Cost reduction and cumulative savings
- Insights: High cost areas, price volatility risk, payback calculations
- Actions: Export cost data, download chart, edit tariff assumptions, view savings plan

### 4. MEES Compliance Panel

**Card Trigger**: "MEES Compliance Timeline" card → "View EPC breakdown per unit" button

**Panel Content**:
- KPI Bar: Total units, % at risk 2027, rent at risk, action required
- Charts: EPC distribution pie chart, compliance timeline bar chart
- Table: Unit-level EPC ratings with 2027/2030 compliance status
- Scenarios: Rent at risk across compliance pathways
- Insights: 2027 deadline urgency, strategic upgrade recommendations
- Actions: Export EPC data, download compliance report, view unit EPCs, view retrofit plan

### 5. CRREM Stranding Panel

**Card Trigger**: "CRREM Stranding" card → "Explore retrofit pathways" button

**Panel Content**:
- KPI Bar: Stranded year, years to stranding, current intensity, CRREM limit
- Charts: CRREM pathway with stranding marker, retrofit pathway comparison
- Table: Stranding risk by scenario with years extended
- Scenarios: Asset value protection, refinancing risk
- Insights: Stranding consequences, institutional investor requirements, strategic timing
- Actions: Export CRREM analysis, download pathway chart, adjust grid assumptions, view retrofit options

## Technical Implementation

### Components Structure

```
/components
  /panels
    DetailPanel.tsx       - Base panel wrapper + reusable components
    EnergyPanel.tsx       - Energy-specific panel content
    CarbonPanel.tsx       - Carbon/CRREM panel content
    SpendPanel.tsx        - Cost analysis panel content
    MEESPanel.tsx         - MEES compliance panel content
    CRREMPanel.tsx        - CRREM stranding panel content
```

### Panel Wrapper (DetailPanel.tsx)

Provides:
- `DetailPanel` - Main wrapper using shadcn Sheet component
- `PanelSection` - Consistent section header styling
- `KPIBar` - Gray box with 2-4 column KPI grid
- `ActionButtons` - Standardized action button group

### State Management

```tsx
// In ExecutiveOverview.tsx
const [activePanel, setActivePanel] = useState<PanelType>(null);

// Card onClick
<KPICard
  cta={{
    text: "See energy breakdown",
    onClick: () => setActivePanel('energy')
  }}
/>

// Panel rendering
<DetailPanel
  isOpen={activePanel === 'energy'}
  onClose={() => setActivePanel(null)}
  title="Energy Use Analysis"
>
  <EnergyPanelContent />
</DetailPanel>
```

### Responsive Design

- Panels use shadcn Sheet component (slide-out drawer)
- Full width on mobile, max-width 3xl on desktop
- Sticky header with close button
- Scrollable content area
- Charts are responsive (ResponsiveContainer from recharts)

## Design Consistency

### Visual Hierarchy
1. **KPI Bar**: Gray background (`bg-gray-50`), 4-column grid on desktop, 2-column on mobile
2. **Section Titles**: H3 with emoji prefix for visual scanning
3. **Charts**: White cards with border, labeled axes, legends
4. **Tables**: Striped rows with hover states, header in gray
5. **Insights Box**: Blue background (`bg-blue-50`) with blue border
6. **Action Buttons**: Pill-shaped, secondary variant (except primary CTA)

### Color Coding
- **Risk/High**: Red (#EF4444)
- **Warning/Medium**: Amber (#F59E0B)  
- **Success/Low**: Green (#22C55E)
- **Neutral/Info**: Blue (#3B82F6)

### Typography
- **KPI Bar Values**: 20px bold (24px for primary)
- **Section Headers**: 18px medium
- **Chart Labels**: 12px gray
- **Table Text**: 14px regular
- **Insight Text**: 14px regular

## User Experience Flow

1. **Scan Overview**: User sees traffic lights and headline KPIs across all cards
2. **Identify Priority**: Red/amber traffic lights draw attention to risk areas
3. **Click for Detail**: CTA button opens relevant panel
4. **Explore Data**: Charts show trends, tables show granular breakdown
5. **Understand Impact**: Scenarios compare "Do Nothing" vs retrofit options
6. **Get Guidance**: Insights box explains "so what" and recommended actions
7. **Take Action**: Export data, adjust assumptions, or navigate to retrofit plans

## Future Enhancements

### Phase 2: Unit-Level Drill-Down
- Add toggle to switch from building → unit level view
- Filter tables by unit
- Compare units side-by-side

### Phase 3: Scenario Panels
- Similar panel structure for each retrofit scenario card
- CAPEX breakdown, measure-by-measure impact
- Compare scenarios side-by-side
- Edit plan within panel

### Phase 4: Interactive Assumptions
- Modal/drawer for editing key assumptions
- Real-time recalculation of metrics
- Version history and scenario saving

### Phase 5: Data Export
- CSV export for tables
- PNG/SVG export for charts
- PDF export for full panel report
- API integration for external BI tools

## Best Practices

### When Adding New Panels

1. **Create Panel Content Component**
   - Use consistent section structure (KPI Bar → Charts → Table → Scenarios → Insights → Actions)
   - Follow naming convention: `[Topic]PanelContent`
   - Import reusable components from `DetailPanel.tsx`

2. **Add State Management**
   - Extend `PanelType` union in parent component
   - Add panel state to `useState`
   - Wire up card CTA onClick

3. **Render Panel**
   - Add `DetailPanel` wrapper at end of parent component
   - Pass appropriate title
   - Render content component as children

4. **Test Responsiveness**
   - Check mobile (stacked layout)
   - Check tablet (2-column grids)
   - Check desktop (full width charts)

5. **Ensure Consistency**
   - Use standard color palette
   - Match typography scale
   - Follow traffic light logic
   - Include all 6 sections

## Accessibility

- Panels use semantic HTML (section, table, etc.)
- Close button has screen reader text
- Focus management on open/close
- Keyboard navigation (Esc to close)
- ARIA labels on charts
- Color not sole indicator (icons + text)

## Performance

- Panels lazy-load content (only render when open)
- Charts use lightweight recharts library
- State management keeps panels in DOM (fast re-open)
- No data fetching (static mock data for now)
- Smooth animations via shadcn Sheet transitions
