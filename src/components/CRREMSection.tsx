import { Button } from './ui/button';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
} from 'recharts';

export function CRREMSection() {
  const alignmentData = [
    { year: 2024, doNothing: 48.5, epcC: 48.5, netZero: 48.5, crrem: 45, cibse: 50 },
    { year: 2026, doNothing: 48.2, epcC: 42, netZero: 38, crrem: 42, cibse: 50 },
    { year: 2028, doNothing: 48, epcC: 40, netZero: 32, crrem: 39, cibse: 50 },
    { year: 2030, doNothing: 47.8, epcC: 38, netZero: 26, crrem: 36, cibse: 50 },
    { year: 2032, doNothing: 47.5, epcC: 36, netZero: 20, crrem: 33, cibse: 50 },
    { year: 2034, doNothing: 47.2, epcC: 34, netZero: 15, crrem: 30, cibse: 50 },
    { year: 2036, doNothing: 47, epcC: 32, netZero: 10, crrem: 27, cibse: 50 },
    { year: 2038, doNothing: 46.8, epcC: 30, netZero: 7, crrem: 24, cibse: 50 },
    { year: 2040, doNothing: 46.5, epcC: 28, netZero: 5, crrem: 21, cibse: 50 },
    { year: 2045, doNothing: 46, epcC: 24, netZero: 3, crrem: 15, cibse: 50 },
    { year: 2050, doNothing: 45.5, epcC: 20, netZero: 2.4, crrem: 10, cibse: 50 },
  ];

  return (
    <section id="crrem" className="mb-8 pt-8 border-t-4 border-purple-500">
      <div className="mb-6">
        <div className="inline-block px-4 py-2 bg-purple-100 rounded-full mb-3">
          <p className="text-sm text-purple-800">Step 3: Long-Term Alignment</p>
        </div>
        <h2 className="mb-2">CRREM Alignment & Stranding Analysis</h2>
        <p className="text-[#6B7280]">
          How each pathway aligns with the CRREM 1.5°C trajectory for science-based climate compliance
        </p>
      </div>

      {/* Context Banner */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <h4 className="mb-2">Why CRREM matters</h4>
        <p className="text-[#6B7280]">
          The Carbon Risk Real Estate Monitor (CRREM) provides science-based decarbonization pathways 
          aligned with the Paris Agreement 1.5°C target. Assets exceeding the CRREM pathway face <strong>stranding risk</strong>—loss 
          of value due to regulatory obsolescence, financing restrictions, and reduced tenant demand.
        </p>
        <p className="text-sm text-[#6B7280] mt-2">
          <strong>Decision point:</strong> Choose a retrofit pathway that keeps your asset aligned with CRREM limits to protect capital value 
          and maintain access to green financing.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="mb-4">Carbon Intensity Pathways (kgCO₂e/m² per year)</h3>
        <p className="text-sm text-[#6B7280] mb-4">
          Compare how each scenario performs against the CRREM 1.5°C pathway and identify when stranding occurs
        </p>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={alignmentData}>
              {/* Stranding zone - area above CRREM line */}
              <defs>
                <linearGradient id="strandingZone" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="year"
                stroke="#6B7280"
                label={{ value: 'Year', position: 'insideBottom', offset: -5 }}
              />
              <YAxis
                stroke="#6B7280"
                label={{ value: 'kgCO₂e/m²/year', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                }}
                formatter={(value: any) => `${value} kgCO₂e/m²`}
              />
              <Legend />

              {/* CIBSE Benchmark */}
              <Line
                type="monotone"
                dataKey="cibse"
                stroke="#9CA3AF"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="CIBSE Benchmark"
                dot={false}
              />

              {/* CRREM 1.5°C */}
              <Line
                type="monotone"
                dataKey="crrem"
                stroke="#3B82F6"
                strokeWidth={3}
                strokeDasharray="8 4"
                name="CRREM 1.5°C"
                dot={false}
              />

              {/* Do Nothing - Red */}
              <Line
                type="monotone"
                dataKey="doNothing"
                stroke="#EF4444"
                strokeWidth={3}
                name="Do Nothing"
                dot={{ fill: '#EF4444', r: 4 }}
              />

              {/* EPC C - Amber */}
              <Line
                type="monotone"
                dataKey="epcC"
                stroke="#F59E0B"
                strokeWidth={3}
                name="EPC C by 2027"
                dot={{ fill: '#F59E0B', r: 4 }}
              />

              {/* Net Zero - Green */}
              <Line
                type="monotone"
                dataKey="netZero"
                stroke="#22C55E"
                strokeWidth={3}
                name="Net Zero 2050"
                dot={{ fill: '#22C55E', r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-red-50 rounded-lg border border-[#EF4444]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-[#EF4444] rounded-full"></div>
              <span className="text-sm">Do Nothing</span>
            </div>
            <div className="text-[24px] mb-1" style={{ fontWeight: 700 }}>
              ⚠️ 2031
            </div>
            <p className="text-sm text-[#6B7280]">
              Asset becomes stranded - exceeds CRREM pathway with no compliance route
            </p>
          </div>

          <div className="p-4 bg-amber-50 rounded-lg border border-[#F59E0B]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-[#F59E0B] rounded-full"></div>
              <span className="text-sm">EPC C by 2027</span>
            </div>
            <div className="text-[24px] mb-1" style={{ fontWeight: 700 }}>
              ⚠️ 2036
            </div>
            <p className="text-sm text-[#6B7280]">
              Medium-term alignment - requires further interventions beyond 2036
            </p>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border border-[#22C55E]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-[#22C55E] rounded-full"></div>
              <span className="text-sm">Net Zero 2050</span>
            </div>
            <div className="text-[24px] mb-1" style={{ fontWeight: 700 }}>
              ✅ 2050+
            </div>
            <p className="text-sm text-[#6B7280]">
              Full alignment - exceeds CRREM requirements and future-proofs asset value
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="mb-4">Key Insights</h4>
          <ul className="space-y-3 text-[#6B7280]">
            <li className="flex items-start gap-3">
              <span className="text-[#EF4444] mt-1">⚠️</span>
              <span>
                <strong>Do Nothing</strong> pathway exceeds CRREM threshold by 2031, creating immediate stranding risk
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#F59E0B] mt-1">⚠️</span>
              <span>
                <strong>EPC C</strong> provides 9 years of alignment but requires additional measures by mid-2030s
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#22C55E] mt-1">✅</span>
              <span>
                <strong>Net Zero</strong> maintains consistent alignment through 2050 and positions asset as market leader
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#3B82F6] mt-1">📊</span>
              <span>
                CRREM pathway becomes increasingly stringent - early action provides more pathway options
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="mb-4">Stranding Risk Impact</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-[#6B7280]">Investment Attractiveness</span>
                <span className="text-[#EF4444]">High Risk</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#EF4444] h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-[#6B7280]">Financing Availability</span>
                <span className="text-[#F59E0B]">Limited</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#F59E0B] h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-[#6B7280]">Tenant Demand Impact</span>
                <span className="text-[#EF4444]">Declining</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#EF4444] h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-[#6B7280]">Asset Valuation Pressure</span>
                <span className="text-[#EF4444]">Severe</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#EF4444] h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" className="rounded-full">
          See sensitivity analysis
        </Button>
        <Button variant="outline" className="rounded-full">
          Compare to portfolio average
        </Button>
      </div>
    </section>
  );
}