# Sustainable Asset Report Structure

## Overview

The report follows a clear two-part narrative structure designed for senior sustainability leaders:

1. **Executive Overview (Risks Today)** - What's at stake
2. **Opportunities (Future Pathways)** - How to protect and create value

---

## MapMortar Brand Integration

### Visual Identity
- **Primary Brand Color**: Orange (#F97316) - Used for section headers, CTAs, and AI features
- **Vertical Navigation**: Fixed left sidebar with Portfolio selected
- **Logo**: Orange "M" in top-left corner
- **Typography**: Clean, professional hierarchy with consistent icon usage

### Key Brand Elements
- Orange section titles and primary CTAs
- Pill-shaped secondary buttons
- Traffic-light color system (Red/Amber/Green) for risk indicators
- Consistent icon + title + subtitle structure for all sections

---

## 1. Hero Section (Building Identity)

**Components**: PropertyHero.tsx, AssetInformation.tsx

### Features
- Building name & address prominently displayed
- Split banner: Location map + Building photo
- Key asset info in 4-column layout:
  - Size (43,930 m² GIA)
  - Occupancy (6 of 7 units, 86%)
  - Lease Profile (3.2 yr WAULT)
  - Key Timing (TP ICAP 2028)

### Actions (Top-Right)
- **Back to Portfolio** - Returns to portfolio view
- **Export PDF** - Generates report (orange button)

### Asset Information Actions
- **Edit** (pencil) - Edit building facts
- **Documents** (badge count) - View uploaded documents
- **Ask AI** (sparkle + orange) - AI chatbot for building queries

### Metadata
- Confidence score: 92% (with tooltip)
- Notes line: Building type, EPC mix, construction/refurb dates

---

## 2. Executive Overview (Risks Today)

**Component**: ExecutiveOverview.tsx  
**Section ID**: `overview`

### Structure

#### A. Energy, Carbon & Spend
**Icon**: ⚡ Zap (Blue)  
**Subtitle**: "Current performance vs. benchmarks"

Three KPI cards in equal-width grid:

1. **Total Energy Use**
   - Value: 2,450 MWh/year
   - Intensity: 122 kWh/m²
   - Fuel split: 62% electricity, 38% gas
   - Traffic light: 🔴 12% above REEB benchmark
   - CTA: "See energy breakdown" → Opens EnergyPanel

2. **Annual Carbon**
   - Value: 485 tCO₂e/year
   - Intensity: 11.0 kgCO₂/m²
   - Traffic light: 🟡 Above CRREM 1.5°C pathway
   - CTA: "View carbon details" → Opens CarbonPanel

3. **Annual Spend**
   - Value: £342k
   - Intensity: £7.78/m²
   - Traffic light: 🟡 8% above benchmark
   - CTA: "See cost breakdown" → Opens SpendPanel

#### B. Transition Risks
**Icon**: 🛡️ Shield (Red)  
**Subtitle**: "Regulatory compliance deadlines (MEES & CRREM)"

Layout: 2/3 + 1/3 grid

1. **MEES Compliance Timeline** (2/3 width)
   - Component: TransitionRiskCard.tsx
   - Shows: Timeline table (Today/2027/2030)
   - Metrics: % units at risk + £ rent at risk
   - Traffic light: 🔴 High Risk - Below EPC C
   - CTA: "View MEES details" → Opens MEESPanel

2. **CRREM Stranding** (1/3 width)
   - Component: StrandedYearCard.tsx
   - Shows: Stranded year (2029), years until stranding (4)
   - Traffic light: 🔴 High Risk
   - CTA: "See CRREM analysis" → Opens CRREMPanel

#### C. Physical Climate Risks
**Icon**: 💧 Droplets (Purple)  
**Subtitle**: "Long-term climate exposure (informational only)"

Two cards in equal-width grid:

1. **Flood Risk**
   - Value: Low
   - Traffic light: 🟢 Low Risk
   - Benchmarks: 1 in 1000 year event (EA)
   - CTA: "See climate assumptions"

2. **Overheating Risk**
   - Value: Medium
   - Traffic light: 🟡 Medium Risk
   - Benchmarks: CIBSE TM59 RCP 8.5 (2050)
   - CTA: "See climate assumptions"

**Note**: Physical risks are clearly marked as informational and not directly linked to retrofit plans.

---

## 3. Opportunities (Future Pathways)

**Component**: OpportunitiesSection.tsx  
**Section ID**: `opportunities`

### Header
**Icon**: 📈 TrendingUp (Green)  
**Title**: "Opportunities" (Orange)  
**Subtitle**: "Protect asset value and unlock upside through strategic retrofit"

### A. Retrofit Pathways
**Icon**: 💡 Lightbulb (Blue)  
**Subtitle**: "Compare investment options to meet compliance and reduce operating costs"

#### Scenario Cards (3-column grid)

1. **EPC C by 2027** (Recommended - Amber badge)
   - CAPEX: £2.8M
   - Rent Protected: £1.2M
   - Annual Savings: £68k
   - Payback: 8.5 years
   - Energy Reduction: 35%
   - Carbon Reduction: 35%
   - CRREM Aligned Until: 2036
   - Key Benefits: 4 bullet points
   - CTA: "See details / Edit Plan"

2. **Net Zero 2050** (Future-proof - Green badge)
   - CAPEX: £6.2M
   - Rent Protected: £1.3M (inc. 8% uplift)
   - Annual Savings: £142k
   - Payback: 11 years
   - Energy Reduction: 58%
   - Carbon Reduction: 95%
   - CRREM Aligned Until: 2050+
   - Key Benefits: 4 bullet points
   - CTA: "See details / Edit Plan"

3. **Add Scenario** (Placeholder card)
   - Allows users to create custom scenarios

### B. Quick Comparison Table
Side-by-side comparison of:
- Do Nothing (baseline)
- EPC C by 2027 (amber highlight)
- Net Zero 2050 (green highlight)

Metrics compared:
- CAPEX
- Annual Savings
- Payback Period
- Rent Protected
- Energy Reduction
- Carbon Reduction
- CRREM Alignment

### C. Key Takeaways
Three insight cards:
1. **Best for Immediate Compliance** (Amber)
2. **Best for Long-Term Value** (Green)
3. **Decision Support** (Blue)

---

## Design Consistency Rules

### Section Headers
Every section follows the pattern:
```
[Icon in colored background] + Title (Orange for main, Black for sub) + Subtitle (Gray)
```

### Icons & Colors
- **Orange (#F97316)**: Main section titles, primary CTAs, AI features
- **Blue**: Energy, general information
- **Green**: Success, opportunities, positive metrics
- **Amber**: Warnings, moderate risk
- **Red**: High risk, urgent action required
- **Purple**: Physical/environmental risks

### Traffic Lights
Consistent across all risk cards:
- 🔴 Red = High Risk / Non-compliant
- 🟡 Amber = Medium Risk / Warning
- 🟢 Green = Low Risk / Compliant

### Metrics Display
- **Large numbers** (32px-36px) for primary values
- **Units always shown** (£, %, MWh, tCO₂e, kWh/m²)
- **Secondary metrics** in smaller text below
- **Context/benchmarks** in gray text

### CTA Buttons
- **Primary**: Orange background, white text, rounded-full
- **Secondary**: Outline style, gray, pill-shaped
- **Drill-down**: "See [details]" / "View [analysis]" pattern

### Panel System
All detail panels follow 6-section structure:
1. KPI Bar (top-line metrics)
2. Charts (temporal trends, comparisons)
3. Table (unit-level breakdown)
4. Scenarios (what-if comparisons)
5. Insights (interpretation)
6. Actions (next steps)

---

## Navigation Structure

### Vertical Sidebar (Left)
- Portfolio (selected - orange highlight)
- Assets
- Reports
- Team
- Settings

### Horizontal Navigation (Top)
- Executive Overview
- Opportunities

### Sticky Action Bar (Bottom)
- Warning message: "£1.2M rental income at risk by 2027"
- Primary CTA: "Explore Retrofit Options" (Orange)
- Secondary CTAs: Export PDF, Share Report

---

## User Journey

1. **Hero** → Understand which building
2. **Asset Info** → Verify building facts, ask AI questions
3. **Executive Overview** → Understand risks (Energy/Carbon/Spend → MEES/CRREM → Physical)
4. **Drill-down panels** → Explore detailed analysis for any metric
5. **Opportunities** → Compare retrofit pathways
6. **Decision** → Choose scenario based on capital and strategy
7. **Export/Share** → Document decision and share with stakeholders

---

## Key Differentiators

### Risks vs. Opportunities
- **Part 1 (Overview)**: Diagnostic - "What's wrong? What's at stake?"
- **Part 2 (Opportunities)**: Prescriptive - "What can we do? What's the upside?"

### Executive-Friendly
- No jargon without explanation
- Every number prompts "So what?"
- Inline benchmarks and context
- Clear next steps

### Consistent Visual Language
- MapMortar orange throughout
- Icon + title + subtitle pattern
- Traffic lights for quick scanning
- Pill buttons for secondary actions

---

## File Structure

```
components/
├── AssetInformation.tsx       # Asset info block with AI chat
├── ExecutiveOverview.tsx      # Part 1: Risks
├── OpportunitiesSection.tsx   # Part 2: Retrofit pathways
├── KPICard.tsx               # Reusable metric card
├── TransitionRiskCard.tsx    # MEES compliance table
├── StrandedYearCard.tsx      # CRREM stranding summary
├── CompactScenarioCard.tsx   # Retrofit scenario card
├── PropertyHero.tsx          # Building header
├── VerticalNav.tsx           # Left sidebar navigation
├── StickyNav.tsx             # Top section navigation
├── StickyActionBar.tsx       # Bottom action bar
└── panels/
    ├── EnergyPanel.tsx       # Energy drill-down
    ├── CarbonPanel.tsx       # Carbon drill-down
    ├── SpendPanel.tsx        # Cost drill-down
    ├── MEESPanel.tsx         # MEES drill-down
    └── CRREMPanel.tsx        # CRREM drill-down
```
