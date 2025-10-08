import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface OpexData {
  category: string;
  before: number;
  after: number;
}

interface OpexBreakdownChartProps {
  data?: OpexData[];
  height?: number;
}

const defaultOpexData: OpexData[] = [
  { category: "Energy", before: 420, after: 240 },
  { category: "Maintenance", before: 350, after: 330 },
  { category: "Carbon Cost", before: 150, after: 80 },
  { category: "Other", before: 80, after: 80 },
];

export function OpexBreakdownChart({ data = defaultOpexData, height = 200 }: OpexBreakdownChartProps) {
  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="category" 
            tick={{ fontSize: 11, fill: '#6b7280' }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            tick={{ fontSize: 11, fill: '#6b7280' }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickFormatter={(value) => `£${value}k`}
          />
          <Tooltip 
            formatter={(value: number, name: string) => [`£${value}k`, name === 'before' ? 'Before Retrofit' : 'After Retrofit']}
            labelFormatter={(label) => `Category: ${label}`}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              fontSize: '12px'
            }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
          />
          <Bar 
            dataKey="before" 
            fill="#9CA3AF" 
            name="Before Retrofit"
            radius={[2, 2, 0, 0]}
          />
          <Bar 
            dataKey="after" 
            fill="#10B981" 
            name="After Retrofit"
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
