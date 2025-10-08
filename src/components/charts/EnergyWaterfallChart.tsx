import React from 'react';
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';
import { EnergyWaterfallDatum, chartColors } from '../../data/mockChartData';

interface EnergyWaterfallChartProps {
  data: EnergyWaterfallDatum[];
}

export function EnergyWaterfallChart({ data }: EnergyWaterfallChartProps) {
  const formatTooltipValue = (value: number, name: string) => {
    if (name === 'start') return ['', ''];
    return [`${Math.abs(value)} kWh/m²`, name === 'change' ? 'Change' : 'Energy Use Intensity'];
  };

  const formatXAxisLabel = (tickItem: string) => {
    // Shorten labels for better display
    const labelMap: { [key: string]: string } = {
      'Baseline': 'Baseline',
      'Optimisation': 'Opt',
      'Light Retrofit': 'Light',
      'Deep Retrofit': 'Deep', 
      'Renewables': 'Renew',
      'Final': 'Final'
    };
    return labelMap[tickItem] || tickItem;
  };

  // Define colors for each stage
  const getBarColor = (stage: string) => {
    if (stage === 'Baseline') return chartColors.gray;
    if (stage === 'Final') return chartColors.final;
    if (stage.includes('Optimisation')) return chartColors.optimisation;
    if (stage.includes('Light')) return chartColors.lightRetrofit;
    if (stage.includes('Deep')) return chartColors.deepRetrofit;
    if (stage.includes('Renewables')) return chartColors.renewables;
    return chartColors.gray;
  };

  // Calculate waterfall data with start positions and changes
  let cumulative = 0;
  const waterfallData = data.map((item, index) => {
    let start = 0;
    let change = item.eui;
    
    if (index === 0) {
      // Baseline - starts at 0, shows full value
      start = 0;
      change = item.eui;
      cumulative = item.eui;
    } else if (index === data.length - 1) {
      // Final value - starts at 0, shows the final absolute value
      start = 0;
      change = item.eui;
    } else {
      // Intermediate steps - start at previous cumulative, show the reduction
      start = cumulative;
      change = item.eui; // This is already negative for reductions
      cumulative += change;
    }
    
    return {
      stage: item.stage,
      start: start,
      change: change,
      color: getBarColor(item.stage),
      reduction: item.reduction,
    };
  });

  return (
    <div className="h-[220px] w-full">
      <div className="h-full bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-700">Energy Reduction Stages</h4>
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
              <span className="text-gray-600">Baseline</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
              <span className="text-gray-600">Opt</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-amber-500 rounded-sm"></div>
              <span className="text-gray-600">Light</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-purple-600 rounded-sm"></div>
              <span className="text-gray-600">Deep</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-emerald-500 rounded-sm"></div>
              <span className="text-gray-600">Final</span>
            </div>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={180}>
          <ComposedChart data={waterfallData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="stage" 
              tick={{ fontSize: 10 }}
              tickFormatter={formatXAxisLabel}
              axisLine={false}
              tickLine={false}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              label={{ value: 'kWh/m²', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: 11 } }}
            />
            <Tooltip 
              formatter={formatTooltipValue}
              labelFormatter={(label) => `Stage: ${label}`}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            
            {/* Invisible bar for positioning */}
            <Bar dataKey="start" stackId="a" fill="transparent" />
            
            {/* Visible waterfall bars */}
            <Bar dataKey="change" stackId="a" radius={[2, 2, 0, 0]}>
              {waterfallData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <LabelList 
                dataKey="change" 
                position="top" 
                formatter={(value, entry, index) => {
                  // entry might be undefined, so we use index to get the data point
                  const dataPoint = waterfallData[index];
                  if (!dataPoint) return '';
                  
                  if (dataPoint.stage === 'Baseline') return `${value} kWh/m²`;
                  if (dataPoint.stage === 'Final') return `${value} kWh/m²`;
                  // Show reduction amounts with minus sign for clarity
                  return `-${Math.abs(value)} kWh/m²`;
                }}
                style={{ fontSize: '10px', fill: '#374151', fontWeight: '600' }}
                offset={5}
              />
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
        
        {/* Insight box */}
        <div className="mt-3 p-3 bg-blue-50 rounded-lg text-xs text-blue-800 border border-blue-200">
          <span className="font-medium">Optimisation and light retrofit deliver 40% of total reduction; deep retrofit and renewables bring the remaining 60%.</span>
          <br />
          <span className="text-blue-700">Baseline 260 → 140 kWh/m² (–46%).</span>
        </div>
      </div>
    </div>
  );
}
