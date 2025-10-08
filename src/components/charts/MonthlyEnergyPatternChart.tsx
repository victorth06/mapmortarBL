import React, { useState } from 'react';
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface MonthlyEnergyData {
  month: string;
  electricity: number;
  gas: number;
}

interface MonthlyEnergyPatternData {
  before: MonthlyEnergyData[];
  after: MonthlyEnergyData[];
}

interface MonthlyEnergyPatternChartProps {
  data: MonthlyEnergyPatternData;
}

export function MonthlyEnergyPatternChart({ data }: MonthlyEnergyPatternChartProps) {
  const [showAfter, setShowAfter] = useState(true);

  const formatTooltipValue = (value: number, name: string) => {
    const label = name === 'electricity' ? 'Electricity' : 'Gas';
    return [`${value} kWh/m²`, label];
  };

  const formatXAxisLabel = (tickItem: string) => {
    return tickItem.substring(0, 3); // Show first 3 letters of month
  };

  const chartData = showAfter ? data.after : data.before;
  const periodLabel = showAfter ? 'After Retrofit' : 'Before Retrofit';

  return (
    <div className="h-[300px] w-full">
      <div className="h-full bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-700">Monthly Energy Consumption Pattern</h4>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAfter(false)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                !showAfter 
                  ? 'bg-gray-200 text-gray-800' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Before
            </button>
            <button
              onClick={() => setShowAfter(true)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                showAfter 
                  ? 'bg-gray-200 text-gray-800' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              After
            </button>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={220}>
          <ComposedChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 11 }}
              tickFormatter={formatXAxisLabel}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              label={{ value: 'kWh/m²', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 11 } }}
            />
            <Tooltip 
              formatter={formatTooltipValue}
              labelFormatter={(label) => `Month: ${label}`}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
              iconType="rect"
            />
            
            <Bar 
              dataKey="electricity" 
              stackId="energy" 
              fill="#3b82f6" 
              name="Electricity"
              radius={[0, 0, 0, 0]}
            />
            <Bar 
              dataKey="gas" 
              stackId="energy" 
              fill="#f59e0b" 
              name="Gas"
              radius={[2, 2, 0, 0]}
            />
          </ComposedChart>
        </ResponsiveContainer>
        
        {/* Insight box */}
        <div className="mt-3 p-3 bg-blue-50 rounded-lg text-xs text-blue-800 border border-blue-200">
          <span className="font-medium">
            {showAfter 
              ? "Post-retrofit consumption reduces peak winter demand by 35% and cuts total annual energy use by 42%."
              : "Baseline shows typical seasonal variation with peak winter heating demand."
            }
          </span>
          <br />
          <span className="text-blue-700">
            {showAfter 
              ? "Gas reduction dominates due to electrification of heating."
              : "Gas heating drives winter peaks; electricity remains relatively constant."
            }
          </span>
        </div>
      </div>
    </div>
  );
}
