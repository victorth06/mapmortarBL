import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { PanelSection, KPIBar, ActionButtons } from './DetailPanel';

const epcDistribution = [
  { rating: 'A', count: 0, color: '#22C55E' },
  { rating: 'B', count: 0, color: '#84CC16' },
  { rating: 'C', count: 2, color: '#EAB308' },
  { rating: 'D', count: 1, color: '#F59E0B' },
  { rating: 'E', count: 1, color: '#EF4444' },
  { rating: 'F', count: 0, color: '#DC2626' },
  { rating: 'G', count: 0, color: '#991B1B' },
];

const complianceTimeline = [
  { milestone: 'Today (2025)', compliant: 2, atRisk: 2, total: 4 },
  { milestone: '2027 (EPC C)', compliant: 2, atRisk: 2, total: 4 },
  { milestone: '2030 (EPC B)', compliant: 0, atRisk: 4, total: 4 },
];

const unitDetails = [
  { unit: 'Ground Floor Retail', epc: 'C', rent: 425000, size: 850, compliant2027: '✓', compliant2030: '✗', action: 'Upgrade to B by 2030' },
  { unit: '1st-5th Floor Offices', epc: 'C', rent: 840000, size: 4200, compliant2027: '✓', compliant2030: '✗', action: 'Upgrade to B by 2030' },
  { unit: '6th Floor Office', epc: 'D', rent: 187000, size: 850, compliant2027: '✗', compliant2030: '✗', action: 'Immediate upgrade to C' },
  { unit: 'Common Areas', epc: 'E', rent: 0, size: 650, compliant2027: '✗', compliant2030: '✗', action: 'Immediate upgrade to C' },
];

export function MEESPanelContent() {
  return (
    <>
      {/* KPI Bar */}
      <KPIBar
        items={[
          { label: 'Total Units', value: '4' },
          { label: 'At Risk 2027', value: '50%', highlight: 'risk' },
          { label: 'Rent at Risk', value: '£187k', highlight: 'risk' },
          { label: 'Action Required', value: 'Urgent', highlight: 'risk' },
        ]}
      />

      {/* Charts Section */}
      <PanelSection title="📊 EPC Distribution & Compliance">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h4 className="text-sm text-[#6B7280] mb-4">Current EPC Distribution</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={epcDistribution.filter(d => d.count > 0)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ rating, count }) => `${rating}: ${count} unit${count > 1 ? 's' : ''}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {epcDistribution.filter(d => d.count > 0).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between p-2 bg-amber-50 rounded">
                <span className="text-sm">EPC C (Compliant 2027)</span>
                <span className="text-sm" style={{ fontWeight: 600 }}>2 units (50%)</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                <span className="text-sm">EPC D-E (Non-compliant)</span>
                <span className="text-sm" style={{ fontWeight: 600 }}>2 units (50%)</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h4 className="text-sm text-[#6B7280] mb-4">Compliance Timeline</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={complianceTimeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="milestone" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="compliant" fill="#22C55E" name="Compliant" stackId="a" />
                <Bar dataKey="atRisk" fill="#EF4444" name="At Risk" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
              <p className="text-sm text-red-800">
                <span style={{ fontWeight: 600 }}>⚠️ 2027 Deadline:</span> 50% of units (£187k rent) require immediate upgrade to meet minimum EPC C standard.
              </p>
            </div>
          </div>
        </div>
      </PanelSection>

      {/* Breakdown Table */}
      <PanelSection title="🏢 Unit-Level MEES Compliance">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-[#6B7280]">Unit</th>
                <th className="px-4 py-3 text-center text-xs text-[#6B7280]">Current EPC</th>
                <th className="px-4 py-3 text-right text-xs text-[#6B7280]">Annual Rent</th>
                <th className="px-4 py-3 text-center text-xs text-[#6B7280]">2027 (C)</th>
                <th className="px-4 py-3 text-center text-xs text-[#6B7280]">2030 (B)</th>
                <th className="px-4 py-3 text-left text-xs text-[#6B7280]">Required Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {unitDetails.map((unit, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{unit.unit}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded text-white text-sm ${
                      unit.epc === 'C' ? 'bg-amber-500' :
                      unit.epc === 'D' ? 'bg-orange-500' :
                      'bg-red-500'
                    }`} style={{ fontWeight: 700 }}>
                      {unit.epc}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-right" style={{ fontWeight: 600 }}>
                    {unit.rent > 0 ? `£${unit.rent.toLocaleString()}` : 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-center text-lg">
                    {unit.compliant2027 === '✓' ? '✅' : '❌'}
                  </td>
                  <td className="px-4 py-3 text-center text-lg">
                    {unit.compliant2030 === '✓' ? '✅' : '❌'}
                  </td>
                  <td className="px-4 py-3 text-xs text-[#6B7280]">{unit.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-red-50 border border-red-200 rounded">
            <p className="text-sm text-red-800">
              <span style={{ fontWeight: 600 }}>2027 Risk:</span> Units D & E (£187k rent) cannot be let from April 2027 without upgrade to EPC C minimum.
            </p>
          </div>
          <div className="p-3 bg-amber-50 border border-amber-200 rounded">
            <p className="text-sm text-amber-800">
              <span style={{ fontWeight: 600 }}>2030 Risk:</span> All units require upgrade to EPC B (£1.45M total rent at risk if not compliant).
            </p>
          </div>
        </div>
      </PanelSection>

      {/* Scenarios */}
      <PanelSection title="🎯 Compliance Scenarios">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-red-50 to-white rounded-lg border-2 border-red-200 p-4">
            <h4 className="text-sm text-[#6B7280] mb-2">Do Nothing</h4>
            <p className="text-2xl text-red-600 mb-1" style={{ fontWeight: 700 }}>£187k</p>
            <p className="text-xs text-red-600">Rent unlettable from 2027</p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-white rounded-lg border-2 border-amber-200 p-4">
            <h4 className="text-sm text-[#6B7280] mb-2">Minimum (EPC C)</h4>
            <p className="text-2xl text-amber-600 mb-1" style={{ fontWeight: 700 }}>£0</p>
            <p className="text-xs text-green-600" style={{ fontWeight: 600 }}>✓ 2027 compliant</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-white rounded-lg border-2 border-green-200 p-4">
            <h4 className="text-sm text-[#6B7280] mb-2">Future-Proof (EPC B)</h4>
            <p className="text-2xl text-green-600 mb-1" style={{ fontWeight: 700 }}>£0</p>
            <p className="text-xs text-green-600" style={{ fontWeight: 600 }}>✓ 2027 & 2030 compliant</p>
          </div>
        </div>
      </PanelSection>

      {/* Insights */}
      <PanelSection title="💡 Key Insights & Guidance">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
          <p className="text-sm">
            <span style={{ fontWeight: 600 }}>🔴 Immediate Action Required:</span> 50% of portfolio (2 units, £187k rent) cannot be legally let from April 2027 without EPC C minimum.
          </p>
          <p className="text-sm">
            <span style={{ fontWeight: 600 }}>📅 2027 MEES Threshold:</span> All domestic and non-domestic lettings require minimum EPC C from April 2027 (existing tenancies) and April 2030 (all tenancies).
          </p>
          <p className="text-sm">
            <span style={{ fontWeight: 600 }}>💡 Strategic Recommendation:</span> Upgrade all units to EPC B now to avoid double-spend (C in 2027, then B in 2030) and protect full rental income.
          </p>
          <p className="text-sm">
            <span style={{ fontWeight: 600 }}>✅ Retrofit Solution:</span> Proposed EPC C pathway brings all units to C+ standard, eliminating 2027 risk and protecting £187k rent.
          </p>
        </div>
      </PanelSection>

      {/* Actions */}
      <PanelSection title="🔧 Available Actions">
        <ActionButtons
          actions={[
            { label: 'Export EPC Data', variant: 'secondary' },
            { label: 'Download Compliance Report', variant: 'secondary' },
            { label: 'View Unit EPCs', variant: 'secondary' },
            { label: 'View Retrofit Plan', variant: 'primary' },
          ]}
        />
      </PanelSection>
    </>
  );
}
