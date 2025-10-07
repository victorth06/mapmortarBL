import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { BarChart3 } from 'lucide-react';

export function EPCDistributionCard() {
  const epcData = [
    { name: 'C (2027+)', value: 50, units: 2, color: '#F59E0B' },
    { name: 'D (2025+)', value: 50, units: 2, color: '#F97316' },
  ];

  const totalUnits = epcData.reduce((sum, item) => sum + item.units, 0);

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        style={{ fontSize: '14px', fontWeight: 700 }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col hover:shadow-md transition-shadow h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <p className="text-[#6B7280]">Portfolio Snapshot</p>
        <div className="p-2 bg-[#F3F4F6] rounded-lg">
          <BarChart3 className="w-5 h-5 text-[#3B82F6]" />
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-sm text-[#6B7280] mb-4">Current EPC distribution ({totalUnits} units)</p>

      {/* Chart */}
      <div className="flex-1 min-h-[240px] flex items-center justify-center mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={epcData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={CustomLabel}
              innerRadius={65}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
            >
              {epcData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              formatter={(value, entry: any) => {
                const item = epcData.find(d => d.name === entry.payload.name);
                return `${value}: ${item?.units} units`;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Compliance Summary */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-xs text-[#6B7280] mb-2" style={{ fontWeight: 600 }}>Compliance Summary:</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#6B7280]">Compliant with 2030 (A-B)</span>
            <span className="text-green-600" style={{ fontWeight: 700 }}>15%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#6B7280]">Compliant with 2027 (C+)</span>
            <span className="text-amber-600" style={{ fontWeight: 700 }}>50%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#6B7280]">Below 2027 compliance (D-G)</span>
            <span className="text-red-600" style={{ fontWeight: 700 }}>50%</span>
          </div>
        </div>
      </div>
    </div>
  );
}