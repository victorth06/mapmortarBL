import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PanelSection, KPIBar, ActionButtons } from './DetailPanel';

const crremPathway = [
  { year: 2024, building: 58, crrem: 65, stranding: null },
  { year: 2025, building: 58, crrem: 62, stranding: null },
  { year: 2026, building: 58, crrem: 59, stranding: null },
  { year: 2027, building: 58, crrem: 56, stranding: null },
  { year: 2028, building: 58, crrem: 53, stranding: null },
  { year: 2029, building: 58, crrem: 50, stranding: 58 }, // Stranding point
  { year: 2030, building: 58, crrem: 47, stranding: null },
  { year: 2031, building: 58, crrem: 44, stranding: null },
  { year: 2032, building: 58, crrem: 41, stranding: null },
  { year: 2033, building: 58, crrem: 38, stranding: null },
  { year: 2034, building: 58, crrem: 35, stranding: null },
  { year: 2035, building: 58, crrem: 32, stranding: null },
];

const scenarioComparison = [
  { year: 2024, doNothing: 58, epcC: 58, netZero: 58 },
  { year: 2027, doNothing: 58, epcC: 40, netZero: 35 },
  { year: 2030, doNothing: 58, epcC: 37, netZero: 25 },
  { year: 2035, doNothing: 58, epcC: 34, netZero: 15 },
  { year: 2040, doNothing: 58, epcC: 28, netZero: 8 },
  { year: 2045, doNothing: 58, epcC: 20, netZero: 3 },
  { year: 2050, doNothing: 58, epcC: 10, netZero: 0 },
];

export function CRREMPanelContent() {
  return (
    <>
      {/* KPI Bar */}
      <KPIBar
        items={[
          { label: 'Stranded Year', value: '2029', highlight: 'risk' },
          { label: 'Years to Stranding', value: '4', highlight: 'risk' },
          { label: 'Current Intensity', value: '58', unit: 'kgCO₂/m²', highlight: 'risk' },
          { label: '2025 CRREM Limit', value: '62', unit: 'kgCO₂/m²' },
        ]}
      />

      {/* Charts Section */}
      <PanelSection title="📊 CRREM Stranding Analysis">
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <h4 className="text-sm text-[#6B7280] mb-4">Building Carbon Intensity vs CRREM Pathway (kgCO₂/m²/yr)</h4>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={crremPathway}>
              <defs>
                <linearGradient id="colorCrremPathway" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorBuildingPath" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="year" stroke="#6B7280" />
              <YAxis stroke="#6B7280" label={{ value: 'kgCO₂/m²/yr', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="crrem" 
                stroke="#3B82F6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorCrremPathway)" 
                name="CRREM Pathway (1.5°C)" 
              />
              <Area 
                type="monotone" 
                dataKey="building" 
                stroke="#EF4444" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorBuildingPath)" 
                name="135 Bishopsgate (Do Nothing)" 
              />
              {/* Stranding marker */}
              <Line
                type="monotone"
                dataKey="stranding"
                stroke="#DC2626"
                strokeWidth={4}
                dot={{ r: 8, fill: '#DC2626' }}
                name="Stranding Point"
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-red-50 border-2 border-red-300 rounded-lg">
            <p className="text-sm text-red-800 mb-2">
              <span style={{ fontWeight: 700 }}>⚠️ STRANDING ALERT: 2029</span>
            </p>
            <p className="text-sm text-red-800">
              This asset will exceed CRREM carbon limits in <span style={{ fontWeight: 700 }}>4 years</span> without intervention. 
              Stranded assets face significant valuation risk, difficulty refinancing, and potential forced sales.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="text-sm text-[#6B7280] mb-4">Retrofit Pathway Comparison</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={scenarioComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="year" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="doNothing" stroke="#EF4444" strokeWidth={2} name="Do Nothing" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="epcC" stroke="#F59E0B" strokeWidth={2} name="EPC C Retrofit" />
              <Line type="monotone" dataKey="netZero" stroke="#22C55E" strokeWidth={2} name="Net Zero 2050" />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-[#6B7280] mt-2 italic">
            All pathways assume grid decarbonisation per CRREM assumptions. Retrofit scenarios include fabric, HVAC, and renewables interventions.
          </p>
        </div>
      </PanelSection>

      {/* Breakdown Table */}
      <PanelSection title="🏢 Stranding Risk by Scenario">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-[#6B7280]">Scenario</th>
                <th className="px-4 py-3 text-right text-xs text-[#6B7280]">Stranded Year</th>
                <th className="px-4 py-3 text-right text-xs text-[#6B7280]">Years Extended</th>
                <th className="px-4 py-3 text-right text-xs text-[#6B7280]">Carbon Reduction</th>
                <th className="px-4 py-3 text-left text-xs text-[#6B7280]">Risk Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">Do Nothing</td>
                <td className="px-4 py-3 text-sm text-right" style={{ fontWeight: 700 }}>2029</td>
                <td className="px-4 py-3 text-sm text-right">—</td>
                <td className="px-4 py-3 text-sm text-right">0%</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                    🔴 High Risk
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">EPC C Retrofit</td>
                <td className="px-4 py-3 text-sm text-right" style={{ fontWeight: 700 }}>2036</td>
                <td className="px-4 py-3 text-sm text-right text-green-600" style={{ fontWeight: 600 }}>+7 years</td>
                <td className="px-4 py-3 text-sm text-right">31%</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800">
                    🟡 Medium Risk
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">Net Zero 2050</td>
                <td className="px-4 py-3 text-sm text-right" style={{ fontWeight: 700 }}>2050+</td>
                <td className="px-4 py-3 text-sm text-right text-green-600" style={{ fontWeight: 600 }}>+21 years</td>
                <td className="px-4 py-3 text-sm text-right">83%</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    🟢 Low Risk
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </PanelSection>

      {/* Scenarios */}
      <PanelSection title="🎯 Asset Value Protection">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-red-50 to-white rounded-lg border-2 border-red-200 p-4">
            <h4 className="text-sm text-[#6B7280] mb-2">Stranding Impact</h4>
            <p className="text-2xl text-red-600 mb-1" style={{ fontWeight: 700 }}>-15-30%</p>
            <p className="text-xs text-red-600">Estimated value loss if stranded</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-white rounded-lg border-2 border-green-200 p-4">
            <h4 className="text-sm text-[#6B7280] mb-2">EPC C Protection</h4>
            <p className="text-2xl text-green-600 mb-1" style={{ fontWeight: 700 }}>2036</p>
            <p className="text-xs text-green-600" style={{ fontWeight: 600 }}>Extended compliance → value protected</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg border-2 border-blue-200 p-4">
            <h4 className="text-sm text-[#6B7280] mb-2">Refinancing Risk</h4>
            <p className="text-2xl text-blue-600 mb-1" style={{ fontWeight: 700 }}>High</p>
            <p className="text-xs text-blue-600">Lenders increasingly require CRREM compliance</p>
          </div>
        </div>
      </PanelSection>

      {/* Insights */}
      <PanelSection title="💡 Key Insights & Guidance">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
          <p className="text-sm">
            <span style={{ fontWeight: 600 }}>🔴 Critical Urgency:</span> 4 years to stranding. Asset valuation at significant risk. Institutional investors and lenders increasingly require CRREM compliance.
          </p>
          <p className="text-sm">
            <span style={{ fontWeight: 600 }}>📉 Stranding Consequences:</span> CRREM-stranded assets face 15-30% value erosion, difficulty refinancing, and forced sale scenarios.
          </p>
          <p className="text-sm">
            <span style={{ fontWeight: 600 }}>✅ EPC C Solution:</span> Extends compliance to 2036 (7 additional years), protecting asset value and maintaining refinancing options.
          </p>
          <p className="text-sm">
            <span style={{ fontWeight: 600 }}>🎯 Strategic Timing:</span> Act now to avoid emergency retrofit in 2028-2029 when costs will be higher and options limited.
          </p>
          <p className="text-sm">
            <span style={{ fontWeight: 600 }}>🌍 CRREM Methodology:</span> Based on CRREM v2.0 Office pathway, 1.5°C scenario. Widely adopted by investors including GRESB, MSCI, and major pension funds.
          </p>
        </div>
      </PanelSection>

      {/* Actions */}
      <PanelSection title="🔧 Available Actions">
        <ActionButtons
          actions={[
            { label: 'Export CRREM Analysis', variant: 'secondary' },
            { label: 'Download Pathway Chart', variant: 'secondary' },
            { label: 'Adjust Grid Assumptions', variant: 'secondary' },
            { label: 'View Retrofit Options', variant: 'primary' },
          ]}
        />
      </PanelSection>
    </>
  );
}
