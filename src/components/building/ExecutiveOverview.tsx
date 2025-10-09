import React, { useState } from 'react';
import { KPICard } from './KPICard';
import { TransitionRiskCard } from '../scenario/TransitionRiskCard';
import { StrandedYearCard } from '../scenario/StrandedYearCard';
import { AssetInformation } from './AssetInformation';
import { DetailPanel } from '../panels/DetailPanel';
import { EnergyPanelContent } from '../panels/EnergyPanel';
import { CarbonPanelContent } from '../panels/CarbonPanel';
import { SpendPanelContent } from '../panels/SpendPanel';
import { MEESPanelContent } from '../panels/MEESPanel';
import { CRREMPanelContent } from '../panels/CRREMPanel';
import { Zap, Leaf, DollarSign, Droplets, Thermometer, AlertTriangle, Shield } from 'lucide-react';
import { buildingConfig, getScenarioConfigByName, calculateProjectedValues, buildingConstants, calculateRentAtRisk } from '../../config/buildingConfig';

type PanelType = 'energy' | 'carbon' | 'spend' | 'mees' | 'crrem' | null;

interface ExecutiveOverviewProps {
  scenarioName?: string;
  showScenarioData?: boolean;
}

export function ExecutiveOverview({ scenarioName, showScenarioData = false }: ExecutiveOverviewProps) {
  const [activePanel, setActivePanel] = useState<PanelType>(null);
  
  // Get scenario config based on scenario name
  const getScenarioConfig = () => {
    if (!showScenarioData || !scenarioName) {
      return null;
    }
    
    return getScenarioConfigByName(scenarioName);
  };
  
  const scenarioConfig = getScenarioConfig();
  
  // Calculate projected values based on scenario
  const projectedValues = scenarioConfig ? calculateProjectedValues(scenarioConfig) : null;
  
  const projectedEnergyUse = showScenarioData && projectedValues ? 
    projectedValues.projectedEnergyUse : 
    buildingConfig.baseline.totalEnergyUse;
    
  const projectedCarbon = showScenarioData && projectedValues ? 
    projectedValues.projectedCarbon : 
    buildingConfig.baseline.totalCarbon;
    
  const projectedSpend = showScenarioData && projectedValues ? 
    projectedValues.projectedSpend : 
    buildingConfig.baseline.annualSpend;

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
          title={showScenarioData ? "Projected Energy Use" : "Total Energy Use"}
          value={projectedEnergyUse.toFixed(0)}
          unit="MWh/year"
          intensity={{
            value: (projectedEnergyUse * 1000 / buildingConfig.buildingArea).toFixed(0),
            label: "kWh/m²"
          }}
          fuelSplit={{
            electricity: "60",
            gas: "40"
          }}
          performanceLabel={{
            text: showScenarioData && scenarioConfig ? 
              `${scenarioConfig.energyReduction}% reduction vs baseline` : 
              `${buildingConstants.reebBenchmark}% above REEB benchmark`,
            color: showScenarioData ? "success" : "risk"
          }}
          icon={Zap}
          benchmarks={showScenarioData && scenarioConfig ? [
            `Energy savings: ${scenarioConfig.energyReduction}%`,
            `Cost savings: £${(scenarioConfig.annualSavings / 1000).toFixed(0)}k/year`
          ] : [
            `${buildingConstants.cibseBenchmark}% above CIBSE TM46 Good Practice`
          ]}
          opportunity={showScenarioData && scenarioConfig ? 
            `Scenario achieves ${scenarioConfig.energyReduction}% energy reduction with ${scenarioConfig.paybackYears}-year payback.` :
            "Retrofit could reduce by 30–40%, saving ~£250k/year."
          }
          cta={{
            text: "See energy breakdown",
            onClick: () => setActivePanel('energy')
          }}
        />
        <KPICard
          title={showScenarioData ? "Projected Carbon" : "Annual Carbon"}
          value={projectedCarbon.toFixed(0)}
          unit="tCO₂e/year"
          intensity={{
            value: (projectedCarbon * 1000 / buildingConfig.buildingArea).toFixed(1),
            label: "kgCO₂/m²"
          }}
          performanceLabel={{
            text: showScenarioData && scenarioConfig ? 
              `${scenarioConfig.carbonReduction}% reduction vs baseline` : 
              "Above CRREM 1.5°C pathway",
            color: showScenarioData ? "success" : "warning"
          }}
          icon={Leaf}
          benchmarks={showScenarioData && scenarioConfig ? [
            `Carbon reduction: ${scenarioConfig.carbonReduction}%`,
            `Compliant until ${scenarioConfig.crremAlignedUntil}`
          ] : [
            "Above CRREM 2025 limit (422 tCO₂e)",
            "Stranded from 2029 if no action"
          ]}
          opportunity={showScenarioData && scenarioConfig ? 
            `Scenario achieves ${scenarioConfig.carbonReduction}% carbon reduction, extending compliance to ${scenarioConfig.crremAlignedUntil}.` :
            "Retrofit extends compliance to 2036 → protects asset value."
          }
          cta={{
            text: "View carbon details",
            onClick: () => setActivePanel('carbon')
          }}
        />
        <KPICard
          title={showScenarioData ? "Projected Spend" : "Annual Spend"}
          value={`£${(projectedSpend / 1000).toFixed(0)}k`}
          intensity={{
            value: `£${(projectedSpend / buildingConfig.buildingArea).toFixed(2)}`,
            label: "per m²"
          }}
          performanceLabel={{
            text: showScenarioData && scenarioConfig ? 
              `£${(scenarioConfig.annualSavings / 1000).toFixed(0)}k annual savings` : 
              `${buildingConstants.costBenchmark}% above benchmark`,
            color: showScenarioData ? "success" : "warning"
          }}
          icon={DollarSign}
          benchmarks={showScenarioData && scenarioConfig ? [
            `Annual savings: £${(scenarioConfig.annualSavings / 1000).toFixed(0)}k`,
            `Payback period: ${scenarioConfig.paybackYears} years`
          ] : [
            "Based on current tariffs",
            "Exposed to rising energy prices (4% annual)"
          ]}
          opportunity={showScenarioData && scenarioConfig ? 
            `Scenario delivers £${(scenarioConfig.annualSavings / 1000).toFixed(0)}k annual savings with ${scenarioConfig.paybackYears}-year payback.` :
            "Retrofit cuts exposure by up to 25% → £85k/year savings."
          }
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
        children={<EnergyPanelContent />}
      />

      <DetailPanel
        isOpen={activePanel === 'carbon'}
        onClose={() => setActivePanel(null)}
        title="Carbon & CRREM Analysis"
        children={<CarbonPanelContent />}
      />

      <DetailPanel
        isOpen={activePanel === 'spend'}
        onClose={() => setActivePanel(null)}
        title="Energy Cost Analysis"
        children={<SpendPanelContent />}
      />

      <DetailPanel
        isOpen={activePanel === 'mees'}
        onClose={() => setActivePanel(null)}
        title="MEES Compliance Analysis"
        children={<MEESPanelContent />}
      />

      <DetailPanel
        isOpen={activePanel === 'crrem'}
        onClose={() => setActivePanel(null)}
        title="CRREM Stranding Risk Analysis"
        children={<CRREMPanelContent />}
      />
    </section>
  );
}
