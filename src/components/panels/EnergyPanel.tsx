import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { PanelSection, KPIBar, ActionButtons } from './DetailPanel';
import { Download, FileText, Settings } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', building: 210, benchmark: 185 },
  { month: 'Feb', building: 195, benchmark: 180 },
  { month: 'Mar', building: 188, benchmark: 175 },
  { month: 'Apr', building: 165, benchmark: 160 },
  { month: 'May', building: 155, benchmark: 150 },
  { month: 'Jun', building: 145, benchmark: 145 },
  { month: 'Jul', building: 142, benchmark: 140 },
  { month: 'Aug', building: 148, benchmark: 142 },
  { month: 'Sep', building: 160, benchmark: 155 },
  { month: 'Oct', building: 180, benchmark: 165 },
  { month: 'Nov', building: 200, benchmark: 180 },
  { month: 'Dec', building: 215, benchmark: 190 },
];

const fuelSplitData = [
  { name: 'Electricity', value: 62, color: '#3B82F6' },
  { name: 'Gas', value: 38, color: '#F59E0B' },
];

const unitBreakdown = [
  { unit: 'Ground Floor Retail', area: 850, intensity: 125, annual: 106.3, status: 'Above benchmark' },
  { unit: '1st-5th Floor Offices', area: 4200, intensity: 95, annual: 399.0, status: 'On target' },
  { unit: '6th Floor Office', area: 850, intensity: 110, annual: 93.5, status: 'Above benchmark' },
  { unit: 'Common Areas', area: 650, intensity: 88, annual: 57.2, status: 'Below benchmark' },
];

export function EnergyPanelContent() {
  return (
    <>
      {/* KPI Bar */}
      <KPIBar
        items={[
          { label: 'Total Energy Use', value: '2,450', unit: 'MWh/yr' },
          { label: 'Energy Intensity', value: '122', unit: 'kWh/m²/yr', highlight: 'warning' },
          { label: 'vs REEB Benchmark', value: '+12%', highlight: 'risk' },
          { label: 'TM46 Category', value: 'Type 4' },
        ]}
      />

      {/* Charts Section */}
      <PanelSection title="📊 Energy Consumption Trends">
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <h4 className="text-sm text-[#6B7280] mb-4">Monthly Consumption vs Benchmark (MWh)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="building" stroke="#EF4444" strokeWidth={2} name="135 Bishopsgate" />
              <Line type="monotone" dataKey="benchmark" stroke="#3B82F6" strokeWidth={2} strokeDasharray="5 5" name="REEB Benchmark" />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-[#6B7280] mt-2 italic">
            Building consistently runs 10-15% above REEB benchmark, especially in winter months.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h4 className="text-sm text-[#6B7280] mb-4">Fuel Split</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={fuelSplitData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {fuelSplitData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h4 className="text-sm text-[#6B7280] mb-4">Annual Breakdown</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                <div>
                  <p className="text-sm" style={{ fontWeight: 600 }}>⚡ Electricity</p>
                  <p className="text-xs text-[#6B7280]">1,519 MWh/year</p>
                </div>
                <p className="text-lg" style={{ fontWeight: 700 }}>62%</p>
              </div>
              <div className="flex justify-between items-center p-3 bg-amber-50 rounded">
                <div>
                  <p className="text-sm" style={{ fontWeight: 600 }}>🔥 Gas</p>
                  <p className="text-xs text-[#6B7280]">931 MWh/year</p>
                </div>
                <p className="text-lg" style={{ fontWeight: 700 }}>38%</p>
              </div>
            </div>
          </div>
        </div>
      </PanelSection>

      {/* Breakdown Table */}
      <PanelSection title="🏢 Unit-Level Breakdown">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-[#6B7280]">Unit</th>
                <th className="px-4 py-3 text-right text-xs text-[#6B7280]">Area (m²)</th>
                <th className="px-4 py-3 text-right text-xs text-[#6B7280]">Intensity (kWh/m²)</th>
                <th className="px-4 py-3 text-right text-xs text-[#6B7280]">Annual (MWh)</th>
                <th className="px-4 py-3 text-left text-xs text-[#6B7280]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {unitBreakdown.map((unit, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{unit.unit}</td>
                  <td className="px-4 py-3 text-sm text-right">{unit.area.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-right" style={{ fontWeight: 600 }}>{unit.intensity}</td>
                  <td className="px-4 py-3 text-sm text-right">{unit.annual.toFixed(1)}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      unit.status === 'Below benchmark' ? 'bg-green-100 text-green-800' :
                      unit.status === 'On target' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {unit.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PanelSection>

      {/* Scenarios */}
      <PanelSection title="🎯 Retrofit Impact Scenarios">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-red-50 to-white rounded-lg border-2 border-red-200 p-4">
            <h4 className="text-sm text-[#6B7280] mb-2">Do Nothing</h4>
            <p className="text-2xl text-red-600 mb-1" style={{ fontWeight: 700 }}>2,450 MWh/yr</p>
            <p className="text-xs text-[#6B7280]">Remains 12% above benchmark</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-white rounded-lg border-2 border-green-200 p-4">
            <h4 className="text-sm text-[#6B7280] mb-2">EPC C Retrofit</h4>
            <p className="text-2xl text-green-600 mb-1" style={{ fontWeight: 700 }}>1,715 MWh/yr</p>
            <p className="text-xs text-green-600" style={{ fontWeight: 600 }}>↓ 30% reduction (735 MWh saved)</p>
          </div>
        </div>
      </PanelSection>

      {/* Insights */}
      <PanelSection title="💡 Key Insights & Guidance">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
          <p className="text-sm">
            <span style={{ fontWeight: 600 }}>🔴 High Consumption:</span> Building is 12% above REEB benchmark (Office Category 4), indicating significant energy waste.
          </p>
          <p className="text-sm">
            <span style={{ fontWeight: 600 }}>❄️ Heating Dominated:</span> Winter peaks suggest heating system inefficiency. Consider boiler upgrade or controls optimization.
          </p>
          <p className="text-sm">
            <span style={{ fontWeight: 600 }}>🎯 Quick Win:</span> Ground Floor Retail shows highest intensity (125 kWh/m²). Targeted lighting/HVAC improvements could yield fast payback.
          </p>
          <p className="text-sm">
            <span style={{ fontWeight: 600 }}>📊 Data Quality:</span> Based on actual meter readings (Jan-Dec 2024). High confidence in analysis.
          </p>
        </div>
      </PanelSection>

      {/* Actions */}
      <PanelSection title="🔧 Available Actions">
        <ActionButtons
          actions={[
            { label: 'Export Data', variant: 'secondary' },
            { label: 'Download Chart', variant: 'secondary' },
            { label: 'Edit Assumptions', variant: 'secondary' },
            { label: 'View Retrofit Plan', variant: 'primary' },
          ]}
        />
      </PanelSection>
    </>
  );
}
