import React from 'react';
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface CashflowData {
  year: number;
  capex: number;
  savings: number;
  cumulative: number;
}

interface CashflowChartProps {
  data?: CashflowData[];
  height?: number;
}

const defaultCashflowData: CashflowData[] = [
  { year: 2025, capex: -2000, savings: 100, cumulative: -1900 },
  { year: 2026, capex: -800, savings: 200, cumulative: -2500 },
  { year: 2027, capex: 0, savings: 350, cumulative: -2150 },
  { year: 2028, capex: 0, savings: 350, cumulative: -1800 },
  { year: 2030, capex: 0, savings: 400, cumulative: -800 },
  { year: 2035, capex: 0, savings: 400, cumulative: 400 },
  { year: 2040, capex: 0, savings: 400, cumulative: 1400 },
];

export function CashflowChart({ data = defaultCashflowData, height = 240 }: CashflowChartProps) {
  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="year" 
            tick={{ fontSize: 11, fill: '#6b7280' }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            tick={{ fontSize: 11, fill: '#6b7280' }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickFormatter={(value) => `£${value}k`}
          />
          <Tooltip 
            formatter={(value: number, name: string) => {
              const labels: { [key: string]: string } = {
                'capex': 'Annual CAPEX',
                'savings': 'Annual Savings',
                'cumulative': 'Cumulative Cashflow'
              };
              return [`£${value}k`, labels[name] || name];
            }}
            labelFormatter={(label) => `Year: ${label}`}
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
            dataKey="capex" 
            fill="#F87171" 
            name="Annual CAPEX"
            radius={[2, 2, 0, 0]}
          />
          <Bar 
            dataKey="savings" 
            fill="#4ADE80" 
            name="Annual Savings"
            radius={[2, 2, 0, 0]}
          />
          <Line 
            dataKey="cumulative" 
            stroke="#F97316" 
            strokeWidth={2} 
            name="Cumulative Cashflow"
            dot={{ fill: '#F97316', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#F97316', strokeWidth: 2 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
