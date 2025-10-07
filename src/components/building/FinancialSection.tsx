import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  ComposedChart,
} from 'recharts';

export function FinancialSection() {
  const comparisonData = [
    {
      scenario: 'Do Nothing',
      capex: 0,
      savings: 0,
      rentProtected: -1200000,
      carbonReduction: 0,
    },
    {
      scenario: 'EPC C 2027',
      capex: 2800000,
      savings: 68000,
      rentProtected: 1200000,
      carbonReduction: 35,
    },
    {
      scenario: 'Net Zero 2050',
      capex: 6200000,
      savings: 142000,
      rentProtected: 1296000,
      carbonReduction: 95,
    },
  ];

  return (
    <section id="financial" className="mb-8 pt-8 border-t border-gray-300">
      <div className="mb-6">
        <div className="inline-block px-4 py-2 bg-gray-100 rounded-full mb-3">
          <p className="text-sm text-gray-700">Supporting Details</p>
        </div>
        <h2 className="mb-2">Detailed Financial & Carbon Analysis</h2>
        <p className="text-[#6B7280]">
          Comprehensive comparison of investment requirements, savings, and carbon impact to support decision-making
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="mb-4">CAPEX vs Annual Savings</h3>
        <p className="text-sm text-[#6B7280] mb-4">
          <strong>Key insight:</strong> EPC C offers moderate upfront cost (£2.8M) with strong annual savings (£68k). 
          Net Zero requires higher investment (£6.2M) but delivers greater long-term savings (£142k/year) and carbon reduction.
        </p>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="scenario" stroke="#6B7280" />
              <YAxis
                yAxisId="left"
                stroke="#6B7280"
                label={{ value: '£ (Thousands)', angle: -90, position: 'insideLeft' }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#6B7280"
                label={{ value: 'Carbon Reduction %', angle: 90, position: 'insideRight' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                }}
                formatter={(value: any, name: string) => {
                  if (name === 'Carbon Reduction') return [`${value}%`, name];
                  return [`£${(value / 1000).toFixed(0)}k`, name];
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="capex" fill="#3B82F6" name="CAPEX" />
              <Bar yAxisId="left" dataKey="savings" fill="#22C55E" name="Annual Savings" />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="carbonReduction"
                stroke="#8B5CF6"
                strokeWidth={3}
                name="Carbon Reduction"
                dot={{ fill: '#8B5CF6', r: 5 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="mb-4">Rent Protected / At Risk</h3>
        <p className="text-sm text-[#6B7280] mb-4">
          <strong>Key insight:</strong> Without action, £1.2M of rental income is at risk by 2027. 
          Both retrofit pathways protect this income, with Net Zero adding 8% rental uplift through enhanced ESG credentials.
        </p>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="scenario" stroke="#6B7280" />
              <YAxis
                stroke="#6B7280"
                label={{ value: '£ (Thousands)', angle: -90, position: 'insideLeft' }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                }}
                formatter={(value: any) => `£${(value / 1000).toFixed(0)}k`}
              />
              <Legend />
              <Bar
                dataKey="rentProtected"
                fill="#22C55E"
                name="Rent Protected/Uplift"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-[#6B7280] mt-4">
          <strong>Do Nothing</strong> scenario shows £1.2M rental income at risk due to MEES non-compliance by 2027.
          Active interventions protect this income and potentially generate uplift through improved building ratings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="mb-2 text-[#6B7280]">Best Financial Return</h4>
          <div className="text-[28px] mb-2" style={{ fontWeight: 700 }}>
            EPC C by 2027
          </div>
          <p className="text-sm text-[#6B7280]">
            Shortest payback period (8.5 years) with strong carbon reduction and compliance protection
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="mb-2 text-[#6B7280]">Highest Carbon Impact</h4>
          <div className="text-[28px] mb-2" style={{ fontWeight: 700 }}>
            Net Zero 2050
          </div>
          <p className="text-sm text-[#6B7280]">
            95% carbon reduction aligns with science-based targets and future-proofs the asset
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="mb-2 text-[#6B7280]">Greatest Risk</h4>
          <div className="text-[28px] mb-2" style={{ fontWeight: 700 }}>
            Do Nothing
          </div>
          <p className="text-sm text-[#6B7280]">
            £1.2M rental income at risk with asset stranding by 2031 - requires immediate action
          </p>
        </div>
      </div>
    </section>
  );
}