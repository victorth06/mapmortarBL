import React, { useEffect, useState } from 'react';
import { CompactScenarioCard } from '../scenario/CompactScenarioCard';
import { AddScenarioCard } from '../scenario/AddScenarioCard';
import { RentCalculationConfig } from './RentCalculationConfig';
import { TrendingUp, Lightbulb } from 'lucide-react';
import { supabase } from '../../utils/supabase/queries';
import { useBuildingData } from '../../hooks/useBuildingData';
import { formatRent, getDefaultRentParams } from '../../utils/rentCalculations';
import { scenarioConfigs } from '../../config/buildingConfig';

interface OpportunitiesSectionProps {
  onScenarioClick?: (scenarioName: string) => void;
}

export function OpportunitiesSection({ onScenarioClick }: OpportunitiesSectionProps) {
  const [scenarios, setScenarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [rentParams, setRentParams] = useState(getDefaultRentParams());
  const { rentCalculations, meesSummary } = useBuildingData(undefined, rentParams);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const { data, error } = await supabase
        .from('scenarios')
        .select('*')
        .in('type', ['epc_c_2027', 'net_zero_2050'])
        .order('is_recommended', { ascending: false });
      
      if (isMounted && data) {
        setScenarios(data);
      }
      setLoading(false);
    })();
    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return (
      <section id="opportunities" className="mb-12 pt-12 border-t-4 border-[#F97316]">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F97316] mx-auto"></div>
          <p className="text-[#6B7280] mt-4">Loading scenarios...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="opportunities" className="mb-12 pt-12 border-t-4 border-[#F97316]">
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-[#F97316] mb-1">Opportunities</h2>
            <p className="text-[#6B7280]">Protect asset value and unlock upside through strategic retrofit</p>
          </div>
        </div>
      </div>

      {/* Retrofit Pathways Subsection */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Lightbulb className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="text-[#1A1A1A] mb-0">Retrofit Pathways</h3>
              <p className="text-sm text-[#6B7280]">Compare investment options to meet compliance and reduce operating costs</p>
            </div>
          </div>
          <RentCalculationConfig
            epcAUpliftPercent={rentParams.epcAUpliftPercent}
            epcBUpliftPercent={rentParams.epcBUpliftPercent}
            onUpdate={setRentParams}
          />
        </div>
      </div>

      {/* Scenario Cards - 3 Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {scenarios.map((scenario) => {
          // Map database scenario names to config IDs and use config values
          let configId = '';
          if (scenario.name?.includes('EPC C') || scenario.name?.includes('epc_c')) {
            configId = 'epc-c-2027';
          } else if (scenario.name?.includes('Net Zero') || scenario.name?.includes('net_zero')) {
            configId = 'net-zero-2050';
          }
          
          const configScenario = scenarioConfigs.find(s => s.id === configId);
          const rentProtected = configScenario ? configScenario.rentProtected : 0;
          const rentalUplift = configScenario ? configScenario.rentalUplift : 0;
          const totalBenefit = rentProtected + rentalUplift;
          
          const calculatedRentProtected = formatRent(rentProtected);
          const calculatedRentUplift = formatRent(rentalUplift);
          const totalRentBenefit = formatRent(totalBenefit);
          
          return (
            <CompactScenarioCard
              key={scenario.id}
              title={scenario.name}
              badge={scenario.is_recommended ? 'Recommended' : 'Future-proof'}
              badgeColor={scenario.is_recommended ? 'amber' : 'green'}
              tagline={scenario.description || ''}
              capex={scenario.capex ? `£${(scenario.capex / 1_000_000).toFixed(1)}M` : '—'}
              rentProtected={totalRentBenefit}
              annualSavings={scenario.annual_savings ? `£${(scenario.annual_savings / 1000).toFixed(0)}k` : '—'}
              payback={scenario.simple_payback_years ? `${scenario.simple_payback_years} years` : '—'}
              energyReduction={scenario.energy_reduction ? `${scenario.energy_reduction}%` : '—'}
              carbonReduction={scenario.carbon_reduction ? `${scenario.carbon_reduction}%` : '—'}
              strandedYear={scenario.crrem_aligned_until || '—'}
              keyBenefits={[
                scenario.is_recommended ? 'Meets MEES 2027 minimum standard' : 'CRREM aligned until 2050+',
                scenario.is_recommended ? `Protects ${calculatedRentProtected} rental income` : `${calculatedRentUplift} rental uplift via ESG premium`,
                scenario.is_recommended ? `Strong payback period (${scenario.simple_payback_years || '—'} years)` : 'Future-proofs asset value',
                scenario.is_recommended ? 'Moderate upfront investment' : `Maximum carbon impact (${scenario.carbon_reduction || '—'}%)`,
              ]}
              onViewDetails={() => onScenarioClick?.(scenario.name)}
            />
          );
        })}

        {/* Add Scenario Placeholder */}
        <AddScenarioCard />
      </div>

      {/* Quick Comparison Table */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-8">
        <h4 className="mb-4">Quick Comparison</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-[#6B7280]">Metric</th>
                <th className="text-left py-3 px-4 text-[#6B7280]">Do Nothing</th>
                {scenarios.map((scenario, idx) => (
                  <th
                    key={scenario.id}
                    className={`text-left py-3 px-4 ${
                      scenario.is_recommended ? 'text-amber-600 bg-amber-50' : 'text-green-600 bg-green-50'
                    }`}
                  >
                    {scenario.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-[#6B7280]">CAPEX</td>
                <td className="py-3 px-4">£0</td>
                {scenarios.map((scenario) => (
                  <td
                    key={scenario.id}
                    className={`py-3 px-4 ${
                      scenario.is_recommended ? 'bg-amber-50' : 'bg-green-50'
                    }`}
                  >
                    {scenario.capex ? `£${(scenario.capex / 1_000_000).toFixed(1)}M` : '—'}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-[#6B7280]">Annual Savings</td>
                <td className="py-3 px-4 text-red-600">£0</td>
                {scenarios.map((scenario) => (
                  <td
                    key={scenario.id}
                    className={`py-3 px-4 text-green-600 ${
                      scenario.is_recommended ? 'bg-amber-50' : 'bg-green-50'
                    }`}
                  >
                    {scenario.annual_savings ? `£${(scenario.annual_savings / 1000).toFixed(0)}k/year` : '—'}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-[#6B7280]">Payback Period</td>
                <td className="py-3 px-4">N/A</td>
                {scenarios.map((scenario) => (
                  <td
                    key={scenario.id}
                    className={`py-3 px-4 ${
                      scenario.is_recommended ? 'bg-amber-50' : 'bg-green-50'
                    }`}
                  >
                    {scenario.simple_payback_years ? `${scenario.simple_payback_years} years` : '—'}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-[#6B7280]">Rent Protected</td>
                <td className="py-3 px-4 text-red-600">
                  {(() => {
                    const doNothingConfig = scenarioConfigs.find(s => s.id === 'do-nothing');
                    return doNothingConfig ? `-${formatRent(doNothingConfig.rentProtected)} at risk` : '-£4.1M at risk';
                  })()}
                </td>
                {scenarios.map((scenario) => {
                  // Map database scenario names to config IDs
                  let configId = '';
                  if (scenario.name?.includes('EPC C') || scenario.name?.includes('epc_c')) {
                    configId = 'epc-c-2027';
                  } else if (scenario.name?.includes('Net Zero') || scenario.name?.includes('net_zero')) {
                    configId = 'net-zero-2050';
                  }
                  
                  const configScenario = scenarioConfigs.find(s => s.id === configId);
                  const rentProtected = configScenario ? configScenario.rentProtected : 0;
                  const rentalUplift = configScenario ? configScenario.rentalUplift : 0;
                  const totalBenefit = rentProtected + rentalUplift;
                  
                  return (
                    <td
                      key={scenario.id}
                      className={`py-3 px-4 text-green-600 ${
                        scenario.is_recommended ? 'bg-amber-50' : 'bg-green-50'
                      }`}
                    >
                      {formatRent(totalBenefit)} protected
                    </td>
                  );
                })}
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-[#6B7280]">Energy Reduction</td>
                <td className="py-3 px-4 text-red-600">0%</td>
                {scenarios.map((scenario) => (
                  <td
                    key={scenario.id}
                    className={`py-3 px-4 text-green-600 ${
                      scenario.is_recommended ? 'bg-amber-50' : 'bg-green-50'
                    }`}
                  >
                    {scenario.energy_reduction ? `${scenario.energy_reduction}%` : '—'}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-[#6B7280]">Carbon Reduction</td>
                <td className="py-3 px-4 text-red-600">0%</td>
                {scenarios.map((scenario) => (
                  <td
                    key={scenario.id}
                    className={`py-3 px-4 text-green-600 ${
                      scenario.is_recommended ? 'bg-amber-50' : 'bg-green-50'
                    }`}
                  >
                    {scenario.carbon_reduction ? `${scenario.carbon_reduction}%` : '—'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 text-[#6B7280]">CRREM Aligned Until</td>
                <td className="py-3 px-4 text-red-600">2029 (stranded)</td>
                {scenarios.map((scenario) => (
                  <td
                    key={scenario.id}
                    className={`py-3 px-4 ${
                      scenario.is_recommended ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'
                    }`}
                  >
                    {scenario.crrem_aligned_until || '—'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Takeaways */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-amber-50 rounded-lg p-5 border-l-4 border-amber-500">
          <h4 className="text-amber-900 mb-2">Best for Immediate Compliance</h4>
          <p className="text-sm text-amber-800">
            <span style={{ fontWeight: 600 }}>EPC C by 2027</span> offers the fastest path to MEES compliance with strong financial returns and moderate investment.
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-5 border-l-4 border-green-500">
          <h4 className="text-green-900 mb-2">Best for Long-Term Value</h4>
          <p className="text-sm text-green-800">
            <span style={{ fontWeight: 600 }}>Net Zero 2050</span> maximizes carbon reduction, adds rental uplift, and future-proofs the asset until 2050+.
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-5 border-l-4 border-blue-500">
          <h4 className="text-blue-900 mb-2">Decision Support</h4>
          <p className="text-sm text-blue-800">
            Both pathways protect your rental income. Choose based on capital availability and long-term strategic goals.
          </p>
        </div>
      </div>
    </section>
  );
}
