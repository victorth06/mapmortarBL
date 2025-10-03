import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PanelSection, KPIBar, ActionButtons } from './DetailPanel';

const monthlySpend = [
  { month: 'Jan', electricity: 18500, gas: 14200 },
  { month: 'Feb', electricity: 17200, gas: 13100 },
  { month: 'Mar', electricity: 16800, gas: 11900 },
  { month: 'Apr', electricity: 15200, gas: 9800 },
  { month: 'May', electricity: 14500, gas: 8500 },
  { month: 'Jun', electricity: 13800, gas: 7200 },
  { month: 'Jul', electricity: 13500, gas: 6800 },
  { month: 'Aug', electricity: 14100, gas: 7100 },
  { month: 'Sep', electricity: 15300, gas: 8900 },
  { month: 'Oct', electricity: 16900, gas: 10500 },
  { month: 'Nov', electricity: 18100, gas: 12800 },
  { month: 'Dec', electricity: 19200, gas: 14500 },
];

const tariffSensitivity = [
  { scenario: 'Current Tariff', annual: 214000 },
  { scenario: '+10% Increase', annual: 235400 },
  { scenario: '+20% Increase', annual: 256800 },
  { scenario: '+30% Increase', annual: 278200 },
];

const unitSpendBreakdown = [
  { unit: 'Ground Floor Retail', annual: 52800, perM2: 62.12, percentage: 25 },
  { unit: '1st-5th Floor Offices', annual: 124200, perM2: 29.57, percentage: 58 },
  { unit: '6th Floor Office', annual: 29100, perM2: 34.24, percentage: 14 },
  { unit: 'Common Areas', annual: 7900, perM2: 12.15, percentage: 3 },
];

export function SpendPanelContent() {
  return (
    <>
      {/* KPI Bar */}
      <KPIBar
        items={[
          { label: 'Annual Energy Spend', value: '£214k', highlight: 'risk' },
          { label: 'Spend per m²', value: '£33.85', unit: '/m²/yr', highlight: 'warning' },
          { label: 'vs Benchmark', value: '+18%', highlight: 'risk' },
          { label: 'Price Risk Exposure', value: 'High' },
        ]}
      />

      {/* Charts Section */}
      <PanelSection title="📊 Energy Cost Analysis">
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <h4 className="text-sm text-[#6B7280] mb-4">Monthly Energy Spend Breakdown (£)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlySpend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="electricity" fill="#3B82F6" name="Electricity" />
              <Bar dataKey="gas" fill="#F59E0B" name="Gas" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-[#6B7280] mt-2 italic">
            Peak winter months (Dec-Feb) account for 32% of annual spend due to heating costs.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="text-sm text-[#6B7280] mb-4">Tariff Increase Sensitivity Analysis</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={tariffSensitivity} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" stroke="#6B7280" />
              <YAxis dataKey="scenario" type="category" stroke="#6B7280" width={120} />
              <Tooltip />
              <Bar dataKey="annual" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
            <p className="text-sm text-red-800">
              <span style={{ fontWeight: 600 }}>⚠️ Price Risk:</span> A 20% tariff increase would add £42.8k to annual costs. Locking in fixed rates or reducing consumption recommended.
            </p>
          </div>
        </div>
      </PanelSection>

      {/* Breakdown Table */}
      <PanelSection title="🏢 Unit-Level Cost Breakdown">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-[#6B7280]">Unit</th>
                <th className="px-4 py-3 text-right text-xs text-[#6B7280]">Annual Spend</th>
                <th className="px-4 py-3 text-right text-xs text-[#6B7280]">£/m²/yr</th>
                <th className="px-4 py-3 text-right text-xs text-[#6B7280]">% of Total</th>
                <th className="px-4 py-3 text-left text-xs text-[#6B7280]">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {unitSpendBreakdown.map((unit, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{unit.unit}</td>
                  <td className="px-4 py-3 text-sm text-right" style={{ fontWeight: 600 }}>
                    £{unit.annual.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-right">£{unit.perM2.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm text-right">{unit.percentage}%</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      unit.perM2 > 50 ? 'bg-red-100 text-red-800' :
                      unit.perM2 > 30 ? 'bg-amber-100 text-amber-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {unit.perM2 > 50 ? 'High' : unit.perM2 > 30 ? 'Medium' : 'Low'}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm" style={{ fontWeight: 700 }}>Total Portfolio</td>
                <td className="px-4 py-3 text-sm text-right" style={{ fontWeight: 700 }}>£214,000</td>
                <td className="px-4 py-3 text-sm text-right" style={{ fontWeight: 700 }}>£33.85</td>
                <td className="px-4 py-3 text-sm text-right" style={{ fontWeight: 700 }}>100%</td>
                <td className="px-4 py-3"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[#6B7280] mt-2 italic">
          Current tariffs: Electricity £0.14/kWh, Gas £0.05/kWh (variable rates, subject to market fluctuation).
        </p>
      </PanelSection>

      {/* Scenarios */}
      <PanelSection title="🎯 Cost Reduction Scenarios">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-red-50 to-white rounded-lg border-2 border-red-200 p-4">
            <h4 className="text-sm text-[#6B7280] mb-2">Do Nothing</h4>
            <p className="text-2xl text-red-600 mb-1" style={{ fontWeight: 700 }}>£214k/yr</p>
            <p className="text-xs text-red-600">+ exposure to price rises</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-white rounded-lg border-2 border-green-200 p-4">
            <h4 className="text-sm text-[#6B7280] mb-2">EPC C Retrofit</h4>
            <p className="text-2xl text-green-600 mb-1" style={{ fontWeight: 700 }}>£150k/yr</p>
            <p className="text-xs text-green-600" style={{ fontWeight: 600 }}>↓ £64k annual saving (30%)</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg border-2 border-blue-200 p-4">
            <h4 className="text-sm text-[#6B7280] mb-2">10-Year Cumulative</h4>
            <p className="text-2xl text-blue-600 mb-1" style={{ fontWeight: 700 }}>£640k</p>
            <p className="text-xs text-blue-600" style={{ fontWeight: 600 }}>Total savings over decade</p>
          </div>
        </div>
      </PanelSection>

      {/* Insights */}
      <PanelSection title="💡 Key Insights & Guidance">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
          <p className="text-sm">
            <span style={{ fontWeight: 600 }}>💰 High Cost Intensity:</span> At £33.85/m²/yr, building is 18% above benchmark, indicating energy waste translates directly to financial loss.
          </p>
          <p className="text-sm">
            <span style={{ fontWeight: 600 }}>🎯 Quick Win Opportunity:</span> Ground Floor Retail (£62/m²/yr) is the highest cost per area. Targeted upgrades could yield fast ROI.
          </p>
          <p className="text-sm">
            <span style={{ fontWeight: 600 }}>📈 Price Volatility Risk:</span> Currently on variable tariffs. A 20% increase would cost an additional £42.8k/year. Consider fixed-rate contracts.
          </p>
          <p className="text-sm">
            <span style={{ fontWeight: 600 }}>✅ Retrofit Payback:</span> £64k annual saving from EPC C retrofit provides 8.5-year simple payback on £545k investment.
          </p>
        </div>
      </PanelSection>

      {/* Actions */}
      <PanelSection title="🔧 Available Actions">
        <ActionButtons
          actions={[
            { label: 'Export Cost Data', variant: 'secondary' },
            { label: 'Download Chart', variant: 'secondary' },
            { label: 'Edit Tariff Assumptions', variant: 'secondary' },
            { label: 'View Savings Plan', variant: 'primary' },
          ]}
        />
      </PanelSection>
    </>
  );
}
