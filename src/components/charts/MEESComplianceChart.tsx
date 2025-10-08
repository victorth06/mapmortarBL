import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

interface MEESComplianceData {
  summary: Array<{
    band: string;
    count: number;
  }>;
  table: Array<{
    unit: string;
    current: string;
    target: string;
    compliant2027: boolean;
    compliant2030: boolean;
  }>;
}

interface MEESComplianceChartProps {
  data: MEESComplianceData;
  onUnitClick?: (unit: string) => void;
}

export function MEESComplianceChart({ data, onUnitClick }: MEESComplianceChartProps) {
  const formatTooltipValue = (value: number, name: string) => {
    return [`${value} units`, `EPC ${name}`];
  };

  // Define colors for EPC bands
  const getBandColor = (band: string) => {
    const colors: { [key: string]: string } = {
      'A': '#10b981', // Green
      'B': '#22c55e', // Light green
      'C': '#eab308', // Yellow
      'D': '#f59e0b', // Orange
      'E': '#ef4444', // Red
      'F': '#dc2626', // Dark red
      'G': '#991b1b', // Darker red
    };
    return colors[band] || '#6b7280';
  };

  const pieData = data.summary.map(item => ({
    name: item.band,
    value: item.count,
    color: getBandColor(item.band)
  }));

  const totalUnits = data.summary.reduce((sum, item) => sum + item.count, 0);
  const compliant2027 = data.table.filter(unit => unit.compliant2027).length;
  const compliant2030 = data.table.filter(unit => unit.compliant2030).length;

  return (
    <div className="h-[400px] w-full">
      <div className="h-full bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-700">MEES Compliance Breakdown</h4>
          <div className="text-xs text-gray-500">
            {totalUnits} units total
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          {/* Pie Chart */}
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={formatTooltipValue}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '11px' }}
                  iconType="rect"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Compliance Summary */}
          <div className="space-y-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-800">EPC C (2027)</span>
                <span className="text-lg font-bold text-green-600">
                  {Math.round((compliant2027 / totalUnits) * 100)}%
                </span>
              </div>
              <p className="text-xs text-green-700 mt-1">
                {compliant2027} of {totalUnits} units compliant
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-amber-800">EPC B (2030)</span>
                <span className="text-lg font-bold text-amber-600">
                  {Math.round((compliant2030 / totalUnits) * 100)}%
                </span>
              </div>
              <p className="text-xs text-amber-700 mt-1">
                {compliant2030} of {totalUnits} units compliant
              </p>
            </div>

            <div className="text-xs text-gray-500">
              <p className="font-medium mb-1">Compliance Status:</p>
              <ul className="space-y-1">
                <li>• {compliant2027 === totalUnits ? 'All' : `${totalUnits - compliant2027}`} units need EPC C upgrade by 2027</li>
                <li>• {compliant2030 === totalUnits ? 'All' : `${totalUnits - compliant2030}`} units need EPC B upgrade by 2030</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Unit Table */}
        <div className="mt-4">
          <h5 className="text-xs font-medium text-gray-700 mb-2">Unit-Level Compliance</h5>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-1 text-left text-gray-500">Unit</th>
                  <th className="px-2 py-1 text-left text-gray-500">Current</th>
                  <th className="px-2 py-1 text-left text-gray-500">Target</th>
                  <th className="px-2 py-1 text-left text-gray-500">2027</th>
                  <th className="px-2 py-1 text-left text-gray-500">2030</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.table.map((unit) => (
                  <tr 
                    key={unit.unit}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => onUnitClick?.(unit.unit)}
                  >
                    <td className="px-2 py-1 font-medium text-gray-700">{unit.unit}</td>
                    <td className="px-2 py-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        unit.current === 'A' || unit.current === 'B' ? 'bg-green-100 text-green-800' :
                        unit.current === 'C' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        EPC {unit.current}
                      </span>
                    </td>
                    <td className="px-2 py-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        unit.target === 'A' || unit.target === 'B' ? 'bg-green-100 text-green-800' :
                        unit.target === 'C' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        EPC {unit.target}
                      </span>
                    </td>
                    <td className="px-2 py-1">
                      <span className={`px-1 py-0.5 rounded text-xs ${
                        unit.compliant2027 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {unit.compliant2027 ? '✓' : '✗'}
                      </span>
                    </td>
                    <td className="px-2 py-1">
                      <span className={`px-1 py-0.5 rounded text-xs ${
                        unit.compliant2030 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {unit.compliant2030 ? '✓' : '✗'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Insight box */}
        <div className="mt-3 p-3 bg-blue-50 rounded-lg text-xs text-blue-800 border border-blue-200">
          <span className="font-medium">
            {compliant2027 === totalUnits ? 'All' : `${Math.round((compliant2027 / totalUnits) * 100)}%`} of units meet EPC C (2027) and {Math.round((compliant2030 / totalUnits) * 100)}% meet EPC B (2030).
          </span>
          <br />
          <span className="text-blue-700">
            {totalUnits - compliant2027 > 0 ? `${totalUnits - compliant2027} D-rated units are targeted for upgrade before 2028 to maintain rent protection.` : 'All units maintain rent protection through 2030.'}
          </span>
        </div>
      </div>
    </div>
  );
}
