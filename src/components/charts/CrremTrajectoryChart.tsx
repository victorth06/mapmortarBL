import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { CrremTrajectoryDatum, chartColors } from '../../data/mockChartData';

interface CrremTrajectoryChartProps {
  data: CrremTrajectoryDatum[];
}

export function CrremTrajectoryChart({ data }: CrremTrajectoryChartProps) {
  const formatTooltipValue = (value: number, name: string) => {
    const label = name === 'baseline' ? 'Baseline' : 
                  name === 'scenario' ? 'Scenario' : 
                  name === 'crrem' ? 'CRREM Target' : name;
    return [`${value} kgCO₂e/m²`, label];
  };

  const formatXAxisLabel = (tickItem: number) => {
    return tickItem.toString();
  };

  // Find the year where scenario crosses below CRREM target
  const alignmentYear = data.find(d => d.scenario <= d.crrem)?.year;

  return (
    <div className="h-[220px] w-full">
      <div className="h-full bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-700">CRREM Trajectory</h4>
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-red-500"></div>
              <span className="text-gray-600">Baseline</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-orange-500"></div>
              <span className="text-gray-600">Scenario</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-blue-500 border-dashed border-t border-blue-500"></div>
              <span className="text-gray-600">CRREM</span>
            </div>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
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
            
            {/* Baseline line */}
            <Line
              type="monotone"
              dataKey="baseline"
              stroke={chartColors.baseline}
              strokeWidth={2}
              dot={false}
              name="baseline"
            />
            
            {/* Scenario line */}
            <Line
              type="monotone"
              dataKey="scenario"
              stroke={chartColors.scenario}
              strokeWidth={3}
              dot={false}
              name="scenario"
            />
            
            {/* CRREM target line */}
            <Line
              type="monotone"
              dataKey="crrem"
              stroke={chartColors.crrem}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="crrem"
            />
            
            {/* Reference line at alignment year */}
            {alignmentYear && (
              <ReferenceLine 
                x={alignmentYear} 
                stroke="#10b981" 
                strokeDasharray="2 2"
                strokeWidth={1}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
        
        {/* Insight box */}
        <div className="mt-3 p-3 bg-green-50 rounded-lg text-xs text-green-800 border border-green-200">
          <span className="font-medium">Scenario carbon intensity follows CRREM 1.5°C pathway from {alignmentYear || '2028'} onwards.</span>
          <br />
          <span className="text-green-700">Baseline: 70 → 45 kgCO₂e/m²; Scenario: 70 → 15 kgCO₂e/m² (–79%).</span>
        </div>
      </div>
    </div>
  );
}
