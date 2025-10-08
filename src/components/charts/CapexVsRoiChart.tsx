import React from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ZAxis } from 'recharts';
import { capexVsRoiData } from '../../data/mockCapexVsRoiData';

interface CapexVsRoiChartProps {
  onSelect?: (id: string) => void;
  height?: number;
}

export function CapexVsRoiChart({ onSelect, height = 300 }: CapexVsRoiChartProps) {
  const colorMap = {
    Optimise: "#3B82F6", // blue
    "Light Retrofit": "#22C55E", // green
    "Deep Retrofit": "#F59E0B", // orange
    Renewable: "#EC4899", // pink
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
          <p className="font-medium text-gray-900 mb-1">{data.measure}</p>
          <p className="text-xs text-gray-600 mb-2">{data.group}</p>
          <div className="space-y-1 text-xs">
            <p><span className="font-medium">CAPEX:</span> £{data.capex}k</p>
            <p><span className="font-medium">ROI:</span> {data.roi}%</p>
            <p><span className="font-medium">Carbon Saved:</span> {data.carbon_saved} tCO₂</p>
            <p><span className="font-medium">Payback:</span> {
              data.payback === null ? 'N/A' : 
              data.payback === 0 ? 'Immediate' : 
              `${data.payback} years`
            }</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart 
          data={capexVsRoiData} 
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="capex" 
            name="CAPEX (£k)" 
            tick={{ fontSize: 11, fill: '#6b7280' }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickFormatter={(value) => `£${value}k`}
          />
          <YAxis 
            dataKey="roi" 
            name="ROI (%)" 
            tick={{ fontSize: 11, fill: '#6b7280' }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickFormatter={(value) => `${value}%`}
          />
          <ZAxis 
            dataKey="carbon_saved" 
            range={[80, 400]} 
            name="tCO₂ saved" 
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
          />

          {Object.keys(colorMap).map((group) => (
            <Scatter
              key={group}
              name={group}
              data={capexVsRoiData.filter((d) => d.group === group)}
              fill={colorMap[group as keyof typeof colorMap]}
              onClick={(data) => onSelect?.(data.id)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
