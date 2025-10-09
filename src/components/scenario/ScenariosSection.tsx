import React from 'react';
import { CompactScenarioCard } from './CompactScenarioCard';
import { AddScenarioCard } from './AddScenarioCard';
import { AlertTriangle } from 'lucide-react';

export function ScenariosSection() {
  return (
    <section id="scenarios" className="mb-8 pt-8 border-t-4 border-blue-500">
      <div className="mb-6">
        <div className="inline-block px-4 py-2 bg-blue-100 rounded-full mb-3">
          <p className="text-sm text-blue-800">Step 2: What You Can Do</p>
        </div>
        <h2 className="mb-2">Retrofit Pathways: Compare Your Options</h2>
        <p className="text-[#6B7280]">
          Side-by-side comparison of investment options to protect rental income and meet compliance
        </p>
      </div>

      {/* Baseline Risk Banner - Compact */}
      <div className="mb-8 p-5 bg-red-50 rounded-lg border-l-4 border-red-500">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-red-600 mb-1">Baseline Risk (Do Nothing)</h4>
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div>
                <span className="text-[#6B7280]">Rent at risk (2027): </span>
                <span className="text-red-600" style={{ fontWeight: 700 }}>£1.2M</span>
              </div>
              <div>
                <span className="text-[#6B7280]">Asset stranded by: </span>
                <span className="text-red-600" style={{ fontWeight: 700 }}>2029</span>
              </div>
              <div>
                <span className="text-[#6B7280]">Energy reduction: </span>
                <span className="text-red-600" style={{ fontWeight: 700 }}>0%</span>
              </div>
              <div>
                <span className="text-[#6B7280]">Carbon reduction: </span>
                <span className="text-red-600" style={{ fontWeight: 700 }}>0%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scenario Cards - 3 Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* EPC C by 2027 */}
        <CompactScenarioCard
          title="EPC C by 2027"
          badge="Recommended"
          badgeColor="amber"
          tagline="Quick compliance with strong ROI and immediate rent protection"
          capex="£2.8M"
          rentProtected="£3.3M"
          annualSavings="£724k"
          payback="3.9 years"
          energyReduction="85.4%"
          carbonReduction="84.3%"
          strandedYear="2036"
          keyBenefits={[
            'Meets MEES 2027 minimum standard',
            'Protects £3.3M rental income',
            'Strong payback period (3.9 years)',
            'Moderate upfront investment',
          ]}
        />

        {/* Net Zero 2050 */}
        <CompactScenarioCard
          title="Net Zero 2050"
          badge="Future-proof"
          badgeColor="green"
          tagline="Maximum carbon reduction with long-term CRREM alignment and rental uplift"
          capex="£9.3M"
          rentProtected="£4.3M"
          annualSavings="£1.26M"
          payback="7.4 years"
          energyReduction="123.8%"
          carbonReduction="124.6%"
          strandedYear="2050+"
          keyBenefits={[
            'CRREM aligned until 2050+',
            '8% rental uplift via ESG premium',
            'Future-proofs asset value',
            'Maximum carbon impact (124.6%)',
          ]}
        />

        {/* Add Scenario Placeholder */}
        <AddScenarioCard />
      </div>

      {/* Quick Comparison Table */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h4 className="mb-4">Quick Comparison</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-[#6B7280]">Metric</th>
                <th className="text-left py-3 px-4 text-[#6B7280]">Do Nothing</th>
                <th className="text-left py-3 px-4 text-amber-600 bg-amber-50">EPC C by 2027</th>
                <th className="text-left py-3 px-4 text-green-600 bg-green-50">Net Zero 2050</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-[#6B7280]">CAPEX</td>
                <td className="py-3 px-4">£0</td>
                <td className="py-3 px-4 bg-amber-50">£2.8M</td>
                <td className="py-3 px-4 bg-green-50">£9.3M</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-[#6B7280]">Annual Savings</td>
                <td className="py-3 px-4 text-red-600">£0</td>
                <td className="py-3 px-4 bg-amber-50 text-green-600">£724k/year</td>
                <td className="py-3 px-4 bg-green-50 text-green-600">£1.26M/year</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-[#6B7280]">Payback Period</td>
                <td className="py-3 px-4">N/A</td>
                <td className="py-3 px-4 bg-amber-50">3.9 years</td>
                <td className="py-3 px-4 bg-green-50">7.4 years</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-[#6B7280]">Rent Protected</td>
                <td className="py-3 px-4 text-red-600">-£4.1M at risk</td>
                <td className="py-3 px-4 bg-amber-50 text-green-600">£3.3M protected</td>
                <td className="py-3 px-4 bg-green-50 text-green-600">£4.3M (inc. uplift)</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-[#6B7280]">Energy Reduction</td>
                <td className="py-3 px-4 text-red-600">0%</td>
                <td className="py-3 px-4 bg-amber-50 text-green-600">85.4%</td>
                <td className="py-3 px-4 bg-green-50 text-green-600">123.8%</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-[#6B7280]">Carbon Reduction</td>
                <td className="py-3 px-4 text-red-600">0%</td>
                <td className="py-3 px-4 bg-amber-50 text-green-600">84.3%</td>
                <td className="py-3 px-4 bg-green-50 text-green-600">124.6%</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-[#6B7280]">CRREM Aligned Until</td>
                <td className="py-3 px-4 text-red-600">2029 (stranded)</td>
                <td className="py-3 px-4 bg-amber-50 text-amber-600">2036</td>
                <td className="py-3 px-4 bg-green-50 text-green-600">2050+</td>
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
            <strong>EPC C by 2027</strong> offers the fastest path to MEES compliance with strong financial returns and moderate investment.
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-5 border-l-4 border-green-500">
          <h4 className="text-green-900 mb-2">Best for Long-Term Value</h4>
          <p className="text-sm text-green-800">
            <strong>Net Zero 2050</strong> maximizes carbon reduction, adds rental uplift, and future-proofs the asset until 2050+.
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