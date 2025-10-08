import React from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface CarbonIntensityByFuelData {
  year: number;
  electricity: number;
  gas: number;
  target: number;
}

interface CarbonIntensityByFuelChartProps {
  data: CarbonIntensityByFuelData[];
}

export function CarbonIntensityByFuelChart({ data }: CarbonIntensityByFuelChartProps) {
  const formatTooltipValue = (value: number, name: string) => {
    const label = name === 'electricity' ? 'Electricity' : 
                  name === 'gas' ? 'Gas' : 
                  name === 'target' ? 'CRREM Target' : name;
    return [`${value} kgCO₂e/m²`, label];
  };

  const formatXAxisLabel = (tickItem: number) => {
    return tickItem.toString();
  };

  return (
    <div className="h-[300px] w-full">
      <div className="h-full bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-700">Carbon Intensity by Fuel Type</h4>
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
              <span className="text-gray-600">Electricity</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-amber-500 rounded-sm"></div>
              <span className="text-gray-600">Gas</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-green-500 border-dashed border-t border-green-500"></div>
              <span className="text-gray-600">Target</span>
            </div>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={220}>
          <ComposedChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="year" 
              tick={{ fontSize: 11 }}
              tickFormatter={formatXAxisLabel}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              label={{ value: 'kgCO₂e/m²', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 11 } }}
            />
            <Tooltip 
              formatter={formatTooltipValue}
              labelFormatter={(label) => `Year: ${label}`}
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
              stackId="carbon" 
              fill="#3b82f6" 
              name="Electricity"
              radius={[0, 0, 0, 0]}
            />
            <Bar 
              dataKey="gas" 
              stackId="carbon" 
              fill="#f59e0b" 
              name="Gas"
              radius={[2, 2, 0, 0]}
            />
            
            <Line
              type="monotone"
              dataKey="target"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="CRREM Target"
            />
          </ComposedChart>
        </ResponsiveContainer>
        
        {/* Insight box */}
        <div className="mt-3 p-3 bg-green-50 rounded-lg text-xs text-green-800 border border-green-200">
          <span className="font-medium">Transition to low-carbon electricity and reduced gas dependency brings carbon intensity to 15 kgCO₂e/m² by 2050, aligned with CRREM targets.</span>
          <br />
          <span className="text-green-700">Electricity carbon intensity drops 67% while gas consumption reduces 94% through electrification.</span>
        </div>
      </div>
    </div>
  );
}
