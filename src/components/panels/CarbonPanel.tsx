import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { PanelSection, KPIBar, ActionButtons } from './DetailPanel';

const crremTrajectory = [
  { year: 2024, building: 58, crrem: 65, limit: 65 },
  { year: 2025, building: 58, crrem: 62, limit: 62 },
  { year: 2026, building: 58, crrem: 59, limit: 59 },
  { year: 2027, building: 58, crrem: 56, limit: 56 },
  { year: 2028, building: 58, crrem: 53, limit: 53 },
  { year: 2029, building: 58, crrem: 50, limit: 50 }, // Stranding point
  { year: 2030, building: 58, crrem: 47, limit: 47 },
  { year: 2031, building: 58, crrem: 44, limit: 44 },
  { year: 2032, building: 58, crrem: 41, limit: 41 },
  { year: 2033, building: 58, crrem: 38, limit: 38 },
  { year: 2034, building: 58, crrem: 35, limit: 35 },
  { year: 2035, building: 58, crrem: 32, limit: 32 },
];

const retrofitComparison = [
  { year: 2024, doNothing: 58, retrofit: 58 },
  { year: 2025, doNothing: 58, retrofit: 58 },
  { year: 2026, doNothing: 58, retrofit: 58 },
  { year: 2027, doNothing: 58, retrofit: 40 },
  { year: 2028, doNothing: 58, retrofit: 39 },
  { year: 2029, doNothing: 58, retrofit: 38 },
  { year: 2030, doNothing: 58, retrofit: 37 },
  { year: 2035, doNothing: 58, retrofit: 34 },
  { year: 2040, doNothing: 58, retrofit: 28 },
  { year: 2045, doNothing: 58, retrofit: 20 },
  { year: 2050, doNothing: 58, retrofit: 10 },
];

const carbonBreakdown = [
  { source: 'Electricity', emissions: 203, percentage: 54 },
  { source: 'Gas', emissions: 172, percentage: 46 },
];

export function CarbonPanelContent() {
  return (
    <>
      {/* KPI Bar */}
      <KPIBar
        items={[
          { label: 'Annual Carbon', value: '375', unit: 'tCO₂e/yr', highlight: 'risk' },
          { label: 'Carbon Intensity', value: '58', unit: 'kgCO₂/m²/yr', highlight: 'risk' },
          { label: '2025 CRREM Limit', value: '62', unit: 'kgCO₂/m²/yr' },
          { label: 'Stranded Year', value: '2029', highlight: 'risk' },
        ]}
      />

      {/* Charts Section */}
      <PanelSection title="📊 CRREM Pathway Analysis">
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <h4 className="text-sm text-[#6B7280] mb-4">Building Carbon vs CRREM Decarbonisation Pathway</h4>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={crremTrajectory}>
              <defs>
                <linearGradient id="colorCrrem" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorBuilding" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="year" stroke="#6B7280" />
              <YAxis stroke="#6B7280" label={{ value: 'kgCO₂/m²/yr', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="crrem" stroke="#3B82F6" fillOpacity={1} fill="url(#colorCrrem)" name="CRREM Pathway" strokeWidth={2} />
              <Area type="monotone" dataKey="building" stroke="#EF4444" fillOpacity={1} fill="url(#colorBuilding)" name="135 Bishopsgate (Do Nothing)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
            <p className="text-sm text-red-800">
              <span style={{ fontWeight: 600 }}>⚠️ Stranding Point: 2029</span> — Without intervention, this asset will exceed CRREM limits in 4 years, making it non-compliant and potentially stranded.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="text-sm text-[#6B7280] mb-4">Retrofit Pathway Impact</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={retrofitComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="year" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="doNothing" stroke="#EF4444" strokeWidth={2} name="Do Nothing" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="retrofit" stroke="#22C55E" strokeWidth={2} name="EPC C Retrofit" />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-green-600 mt-2" style={{ fontWeight: 600 }}>
            ✓ Retrofit extends compliance to 2036+ with 31% carbon reduction
          </p>
        </div>
      </PanelSection>

      {/* Breakdown Table */}
      <PanelSection title="🏢 Carbon Emissions Breakdown">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-[#6B7280]">Energy Source</th>
                <th className="px-4 py-3 text-right text-xs text-[#6B7280]">Annual Emissions (tCO₂e)</th>
                <th className="px-4 py-3 text-right text-xs text-[#6B7280]">% of Total</th>
                <th className="px-4 py-3 text-left text-xs text-[#6B7280]">Emission Factor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {carbonBreakdown.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{item.source}</td>
                  <td className="px-4 py-3 text-sm text-right" style={{ fontWeight: 600 }}>{item.emissions}</td>
                  <td className="px-4 py-3 text-sm text-right">{item.percentage}%</td>
                  <td className="px-4 py-3 text-xs text-[#6B7280]">
                    {item.source === 'Electricity' ? '0.13354 kgCO₂e/kWh' : '0.18387 kgCO₂e/kWh'}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50">
                <td className="px-4 py-3 text-sm" style={{ fontWeight: 700 }}>Total</td>
                <td className="px-4 py-3 text-sm text-right" style={{ fontWeight: 700 }}>375</td>
                <td className="px-4 py-3 text-sm text-right" style={{ fontWeight: 700 }}>100%</td>
                <td className="px-4 py-3 text-xs text-[#6B7280]">UK Grid 2024</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[#6B7280] mt-2 italic">
          Emission factors based on BEIS 2024 conversion factors. Electricity factor will decline as grid decarbonises.
        </p>
      </PanelSection>

      {/* Scenarios */}
      <PanelSection title="🎯 Decarbonisation Scenarios">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-red-50 to-white rounded-lg border-2 border-red-200 p-4">
            <h4 className="text-sm text-[#6B7280] mb-2">Do Nothing</h4>
            <p className="text-2xl text-red-600 mb-1" style={{ fontWeight: 700 }}>2029</p>
            <p className="text-xs text-red-600">Stranded in 4 years</p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-white rounded-lg border-2 border-amber-200 p-4">
            <h4 className="text-sm text-[#6B7280] mb-2">EPC C Retrofit</h4>
            <p className="text-2xl text-amber-600 mb-1" style={{ fontWeight: 700 }}>2036</p>
            <p className="text-xs text-green-600" style={{ fontWeight: 600 }}>+7 years extended</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-white rounded-lg border-2 border-green-200 p-4">
            <h4 className="text-sm text-[#6B7280] mb-2">Net Zero 2050</h4>
            <p className="text-2xl text-green-600 mb-1" style={{ fontWeight: 700 }}>2050+</p>
            <p className="text-xs text-green-600" style={{ fontWeight: 600 }}>Full compliance</p>
          </div>
        </div>
      </PanelSection>

      {/* Insights */}
      <PanelSection title="💡 Key Insights & Guidance">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
          <p className="text-sm">
            <span style={{ fontWeight: 600 }}>🔴 Urgent Action Required:</span> Asset will be CRREM-stranded in 2029 (4 years) without intervention.
          </p>
          <p className="text-sm">
            <span style={{ fontWeight: 600 }}>📉 Intensity Too High:</span> At 58 kgCO₂/m²/yr, building is already above 2025 CRREM pathway (62 kgCO₂/m²/yr). Gap widens each year.
          </p>
          <p className="text-sm">
            <span style={{ fontWeight: 600 }}>✅ Retrofit Solution:</span> EPC C pathway reduces carbon by 31%, extending compliance to 2036 and protecting asset value.
          </p>
          <p className="text-sm">
            <span style={{ fontWeight: 600 }}>⚡ Grid Decarbonisation:</span> Electricity emissions will naturally decline, but not fast enough to avoid stranding without retrofit.
          </p>
        </div>
      </PanelSection>

      {/* Actions */}
      <PanelSection title="🔧 Available Actions">
        <ActionButtons
          actions={[
            { label: 'Export CRREM Report', variant: 'secondary' },
            { label: 'Download Chart', variant: 'secondary' },
            { label: 'Adjust Grid Assumptions', variant: 'secondary' },
            { label: 'View Retrofit Plan', variant: 'primary' },
          ]}
        />
      </PanelSection>
    </>
  );
}
