import { useState } from 'react';
import { KPICard } from './KPICard';
import { TransitionRiskCard } from './TransitionRiskCard';
import { StrandedYearCard } from './StrandedYearCard';
import { AssetInformation } from './AssetInformation';
import { DetailPanel } from './panels/DetailPanel';
import { EnergyPanelContent } from './panels/EnergyPanel';
import { CarbonPanelContent } from './panels/CarbonPanel';
import { SpendPanelContent } from './panels/SpendPanel';
import { MEESPanelContent } from './panels/MEESPanel';
import { CRREMPanelContent } from './panels/CRREMPanel';
import { Zap, Leaf, DollarSign, Droplets, Thermometer, AlertTriangle, Shield } from 'lucide-react';

type PanelType = 'energy' | 'carbon' | 'spend' | 'mees' | 'crrem' | null;

export function ExecutiveOverview() {
  const [activePanel, setActivePanel] = useState<PanelType>(null);

  return (
    <section id="overview" className="mb-12">
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-[#F97316]" />
          </div>
          <div>
            <h2 className="text-[#F97316] mb-1">Executive Overview</h2>
            <p className="text-[#6B7280]">Key performance indicators and strategic risks at a glance</p>
          </div>
        </div>
      </div>

      {/* Asset Information - Context Setting */}
      <AssetInformation />

      {/* Energy, Carbon & Spend Section */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Zap className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h3 className="text-[#1A1A1A] mb-0">Energy, Carbon & Spend</h3>
            <p className="text-sm text-[#6B7280]">Current performance vs. benchmarks</p>
          </div>
        </div>
      </div>

      {/* Top Row: Energy, Carbon, Spend */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <KPICard
          title="Total Energy Use"
          value="2,450"
          unit="MWh/year"
          intensity={{
            value: "122",
            label: "kWh/m²"
          }}
          fuelSplit={{
            electricity: "62",
            gas: "38"
          }}
          performanceLabel={{
            text: "12% above REEB benchmark",
            color: "risk"
          }}
          icon={Zap}
          benchmarks={[
            "18% above CIBSE TM46 Good Practice"
          ]}
          opportunity="Retrofit could reduce by 30–40%, saving ~£250k/year."
          cta={{
            text: "See energy breakdown",
            onClick: () => setActivePanel('energy')
          }}
        />
        <KPICard
          title="Annual Carbon"
          value="485"
          unit="tCO₂e/year"
          intensity={{
            value: "11.0",
            label: "kgCO₂/m²"
          }}
          performanceLabel={{
            text: "Above CRREM 1.5°C pathway",
            color: "warning"
          }}
          icon={Leaf}
          benchmarks={[
            "Above CRREM 2025 limit (422 tCO₂e)",
            "Stranded from 2029 if no action"
          ]}
          opportunity="Retrofit extends compliance to 2036 → protects asset value."
          cta={{
            text: "View carbon details",
            onClick: () => setActivePanel('carbon')
          }}
        />
        <KPICard
          title="Annual Spend"
          value="£342k"
          intensity={{
            value: "£7.78",
            label: "per m²"
          }}
          performanceLabel={{
            text: "8% above benchmark",
            color: "warning"
          }}
          icon={DollarSign}
          benchmarks={[
            "Based on current tariffs",
            "Exposed to rising energy prices (4% annual)"
          ]}
          opportunity="Retrofit cuts exposure by up to 25% → £85k/year savings."
          cta={{
            text: "See cost breakdown",
            onClick: () => setActivePanel('spend')
          }}
        />
      </div>

      {/* Transition Risks Section */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <Shield className="w-4 h-4 text-red-600" />
          </div>
          <div>
            <h3 className="text-[#1A1A1A] mb-0">Transition Risks</h3>
            <p className="text-sm text-[#6B7280]">Regulatory compliance deadlines (MEES & CRREM)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <TransitionRiskCard onViewDetails={() => setActivePanel('mees')} />
        </div>
        <div className="lg:col-span-1">
          <StrandedYearCard onViewDetails={() => setActivePanel('crrem')} />
        </div>
      </div>

      {/* Physical Climate Risks Section */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Droplets className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <h3 className="text-[#1A1A1A] mb-0">Physical Climate Risks</h3>
            <p className="text-sm text-[#6B7280]">Long-term climate exposure (informational only)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <KPICard
          title="Flood Risk"
          value="Low"
          variant="physical-risk"
          performanceLabel={{
            text: "Low Risk",
            color: "success"
          }}
          icon={Droplets}
          benchmarks={[
            "1 in 1000 year event (Environment Agency)",
            "Surface water risk: Very Low"
          ]}
          opportunity="No immediate mitigation required → maintain monitoring."
          cta={{
            text: "See climate assumptions"
          }}
        />
        <KPICard
          title="Overheating Risk"
          value="Medium"
          variant="physical-risk"
          performanceLabel={{
            text: "Medium Risk",
            color: "warning"
          }}
          icon={Thermometer}
          benchmarks={[
            "Based on 2050 CIBSE TM59 RCP 8.5 scenario",
            "Risk increases post-2040"
          ]}
          opportunity="Passive cooling & shading → mitigate tenant comfort risk."
          cta={{
            text: "See climate assumptions"
          }}
        />
      </div>

      {/* Detail Panels */}
      <DetailPanel
        isOpen={activePanel === 'energy'}
        onClose={() => setActivePanel(null)}
        title="Energy Use Analysis"
      >
        <EnergyPanelContent />
      </DetailPanel>

      <DetailPanel
        isOpen={activePanel === 'carbon'}
        onClose={() => setActivePanel(null)}
        title="Carbon & CRREM Analysis"
      >
        <CarbonPanelContent />
      </DetailPanel>

      <DetailPanel
        isOpen={activePanel === 'spend'}
        onClose={() => setActivePanel(null)}
        title="Energy Cost Analysis"
      >
        <SpendPanelContent />
      </DetailPanel>

      <DetailPanel
        isOpen={activePanel === 'mees'}
        onClose={() => setActivePanel(null)}
        title="MEES Compliance Analysis"
      >
        <MEESPanelContent />
      </DetailPanel>

      <DetailPanel
        isOpen={activePanel === 'crrem'}
        onClose={() => setActivePanel(null)}
        title="CRREM Stranding Risk Analysis"
      >
        <CRREMPanelContent />
      </DetailPanel>
    </section>
  );
}
