import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { PanelSection, KPIBar, ActionButtons } from './DetailPanel';
import { useBuildingData } from '../../hooks/useBuildingData';

export function MEESPanelContent() {
  const { meesSummary, epcDistribution, unitDetails, loading, error } = useBuildingData();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F97316]"></div>
        <p className="text-[#6B7280] ml-4">Loading MEES compliance data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Error loading MEES data: {error}</p>
      </div>
    );
  }

  if (!meesSummary || !epcDistribution || !unitDetails) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-gray-600">No MEES compliance data available</p>
      </div>
    );
  }

  // Calculate compliance timeline
  const complianceTimeline = [
    { 
      milestone: 'Today (2025)', 
      compliant: meesSummary.totalUnits - meesSummary.unitsAtRisk2027, 
      atRisk: meesSummary.unitsAtRisk2027, 
      total: meesSummary.totalUnits 
    },
    { 
      milestone: '2027 (EPC C)', 
      compliant: meesSummary.totalUnits - meesSummary.unitsAtRisk2027, 
      atRisk: meesSummary.unitsAtRisk2027, 
      total: meesSummary.totalUnits 
    },
    { 
      milestone: '2030 (EPC B)', 
      compliant: meesSummary.totalUnits - meesSummary.unitsAtRisk2030, 
      atRisk: meesSummary.unitsAtRisk2030, 
      total: meesSummary.totalUnits 
    },
  ];

  // Format rent at risk
  const formatRent = (amount: number) => {
    if (amount >= 1000000) {
      return `£${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `£${(amount / 1000).toFixed(0)}k`;
    } else {
      return `£${amount.toLocaleString()}`;
    }
  };

  return (
    <>
      {/* KPI Bar */}
      <KPIBar
        items={[
          { label: 'Total Units', value: meesSummary.totalUnits.toString() },
          { label: 'At Risk 2027', value: `${meesSummary.percentageAtRisk2027.toFixed(0)}%`, highlight: 'risk' },
          { label: 'Rent at Risk', value: formatRent(meesSummary.rentAtRisk2027), highlight: 'risk' },
          { label: 'Action Required', value: meesSummary.unitsAtRisk2027 > 0 ? 'Urgent' : 'None', highlight: meesSummary.unitsAtRisk2027 > 0 ? 'risk' : 'success' },
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
                <span style={{ fontWeight: 600 }}>⚠️ 2027 Deadline:</span> {meesSummary.percentageAtRisk2027.toFixed(0)}% of units ({formatRent(meesSummary.rentAtRisk2027)} rent) require immediate upgrade to meet minimum EPC C standard.
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
              {unitDetails.map((unit) => (
                <tr key={unit.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{unit.name}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded text-white text-sm ${
                      unit.epc_rating === 'A' ? 'bg-green-600' :
                      unit.epc_rating === 'B' ? 'bg-green-500' :
                      unit.epc_rating === 'C' ? 'bg-amber-500' :
                      unit.epc_rating === 'D' ? 'bg-orange-500' :
                      unit.epc_rating === 'E' ? 'bg-red-500' :
                      unit.epc_rating === 'F' ? 'bg-red-600' :
                      unit.epc_rating === 'G' ? 'bg-red-700' :
                      'bg-gray-500'
                    }`} style={{ fontWeight: 700 }}>
                      {unit.epc_rating || 'N/A'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-right" style={{ fontWeight: 600 }}>
                    {unit.current_rent && unit.current_rent > 0 ? formatRent(unit.current_rent) : 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-center text-lg">
                    {unit.compliant2027 ? '✅' : '❌'}
                  </td>
                  <td className="px-4 py-3 text-center text-lg">
                    {unit.compliant2030 ? '✅' : '❌'}
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
              <span style={{ fontWeight: 600 }}>2027 Risk:</span> {meesSummary.unitsAtRisk2027} units ({formatRent(meesSummary.rentAtRisk2027)} rent) cannot be let from April 2027 without upgrade to EPC C minimum.
            </p>
          </div>
          <div className="p-3 bg-amber-50 border border-amber-200 rounded">
            <p className="text-sm text-amber-800">
              <span style={{ fontWeight: 600 }}>2030 Risk:</span> {meesSummary.unitsAtRisk2030} units require upgrade to EPC B ({formatRent(meesSummary.rentAtRisk2030)} total rent at risk if not compliant).
            </p>
          </div>
        </div>
      </PanelSection>

      {/* Scenarios */}
      <PanelSection title="🎯 Compliance Scenarios">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-red-50 to-white rounded-lg border-2 border-red-200 p-4">
            <h4 className="text-sm text-[#6B7280] mb-2">Do Nothing</h4>
            <p className="text-2xl text-red-600 mb-1" style={{ fontWeight: 700 }}>{formatRent(meesSummary.rentAtRisk2027)}</p>
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
            <span style={{ fontWeight: 600 }}>🔴 Immediate Action Required:</span> {meesSummary.percentageAtRisk2027.toFixed(0)}% of portfolio ({meesSummary.unitsAtRisk2027} units, {formatRent(meesSummary.rentAtRisk2027)} rent) cannot be legally let from April 2027 without EPC C minimum.
          </p>
          <p className="text-sm">
            <span style={{ fontWeight: 600 }}>📅 2027 MEES Threshold:</span> All domestic and non-domestic lettings require minimum EPC C from April 2027 (existing tenancies) and April 2030 (all tenancies).
          </p>
          <p className="text-sm">
            <span style={{ fontWeight: 600 }}>💡 Strategic Recommendation:</span> Upgrade all units to EPC B now to avoid double-spend (C in 2027, then B in 2030) and protect full rental income.
          </p>
          <p className="text-sm">
            <span style={{ fontWeight: 600 }}>✅ Retrofit Solution:</span> Proposed EPC C pathway brings all units to C+ standard, eliminating 2027 risk and protecting {formatRent(meesSummary.rentAtRisk2027)} rent.
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
