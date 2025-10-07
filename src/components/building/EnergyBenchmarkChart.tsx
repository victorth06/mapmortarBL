import React from 'react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  ReferenceLine,
  Cell,
} from 'recharts';

// --- Mock data for energy performance ---
const energyData = [
  { building: '135 Bishopsgate', energyIntensity: 145, carbonIntensity: 16, epc: 'D', area: 43390 },
  { building: '184-192 Drummond Street', energyIntensity: 128, carbonIntensity: 13, epc: 'C', area: 8500 },
  { building: 'Broadwalk House', energyIntensity: 118, carbonIntensity: 11, epc: 'C', area: 15200 },
  { building: 'BAE Systems Digital Intelligence', energyIntensity: 142, carbonIntensity: 15, epc: 'D', area: 12800 },
];

// --- EPC colour mapping ---
const getEPCColor = (epc: string) => {
  switch (epc) {
    case 'A':
      return '#22C55E'; // green
    case 'B':
      return '#84CC16'; // lime
    case 'C':
      return '#FACC15'; // amber
    case 'D':
      return '#FB923C'; // orange
    case 'E':
    case 'F':
      return '#EF4444'; // red
    default:
      return '#9CA3AF'; // gray
  }
};

// --- Custom Tooltip ---
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    const benchmark = 121;
    const aboveBenchmark = d.energyIntensity > benchmark;
    const percentageDiff = ((d.energyIntensity - benchmark) / benchmark * 100).toFixed(1);
    
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-[#1A1A1A] mb-1">{d.building}</p>
        <p className="text-xs text-[#6B7280]">
          Energy Intensity: <span className="font-medium">{d.energyIntensity} kWh/m²</span>
        </p>
        <p className="text-xs text-[#6B7280]">
          Carbon Intensity: <span className="font-medium">{d.carbonIntensity} kgCO₂/m²</span>
        </p>
        <p className="text-xs text-[#6B7280]">
          EPC Rating: <span className="font-medium">{d.epc}</span>
        </p>
        <p className="text-xs text-[#6B7280]">
          Area: <span className="font-medium">{(d.area / 1000).toFixed(0)}k m²</span>
        </p>
        <p className={`text-xs font-medium ${aboveBenchmark ? 'text-red-600' : 'text-green-600'}`}>
          {aboveBenchmark ? '+' : ''}{percentageDiff}% vs benchmark
        </p>
      </div>
    );
  }
  return null;
};

// --- Chart Component Props ---
interface EnergyBenchmarkChartProps {
  data?: Array<{
    building: string;
    energyIntensity: number;
    carbonIntensity: number;
    epc: string;
    area: number;
  }>;
  benchmark?: number;
  average?: number;
}

// --- Main Chart Component ---
export default function EnergyBenchmarkChart({ 
  data = energyData, 
  benchmark = 121, 
  average = 135 
}: EnergyBenchmarkChartProps) {
  // Calculate portfolio statistics
  const totalBuildings = data.length;
  const buildingsAboveBenchmark = data.filter(d => d.energyIntensity > benchmark).length;
  const percentageAboveBenchmark = ((buildingsAboveBenchmark / totalBuildings) * 100).toFixed(0);

  return (
    <div className="h-full">
      {/* Chart */}
      <ResponsiveContainer width="100%" height={200}>
        <ScatterChart margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          
          <XAxis
            type="number"
            dataKey="energyIntensity"
            name="Energy Intensity"
            unit="kWh/m²"
            stroke="#6B7280"
            domain={[100, 150]}
            tick={{ fontSize: 10 }}
            tickLine={{ stroke: '#D1D5DB' }}
            axisLine={{ stroke: '#D1D5DB' }}
          />
          
          <YAxis
            type="number"
            dataKey="carbonIntensity"
            name="Carbon Intensity"
            unit="kgCO₂/m²"
            stroke="#6B7280"
            domain={[5, 20]}
            tick={{ fontSize: 10 }}
            tickLine={{ stroke: '#D1D5DB' }}
            axisLine={{ stroke: '#D1D5DB' }}
          />
          
          <ChartTooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
          
          {/* Benchmark Reference Line */}
          <ReferenceLine 
            x={benchmark} 
            stroke="#EF4444" 
            strokeDasharray="4 4" 
            label={{ 
              value: `REEB Benchmark ${benchmark} kWh/m²`, 
              position: "topRight",
              style: { fontSize: '10px', fill: '#EF4444' }
            }} 
          />
          
          {/* Portfolio Average Reference Line */}
          <ReferenceLine 
            x={average} 
            stroke="#60A5FA" 
            strokeDasharray="2 2" 
            label={{ 
              value: `Portfolio Avg ${average} kWh/m²`, 
              position: "topRight",
              style: { fontSize: '10px', fill: '#60A5FA' }
            }} 
          />
          
          <Scatter data={data} fill="#60A5FA">
            {data.map((d, i) => (
              <Cell
                key={`cell-${i}`}
                fill={getEPCColor(d.epc)}
                stroke="#fff"
                strokeWidth={1}
                r={Math.max(4, Math.min(12, d.area / 10000))} // Size based on area
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

      {/* Chart Annotations */}
      <div className="mt-3 flex justify-between items-center text-xs text-[#6B7280]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            Below benchmark = efficient
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            Above benchmark = upgrade focus
          </span>
        </div>
        <div className="text-right">
          <span className="font-medium text-red-600">{percentageAboveBenchmark}%</span> above benchmark
        </div>
      </div>

      {/* EPC Legend */}
      <div className="flex flex-wrap justify-center gap-3 mt-3">
        {[
          { label: 'EPC A', color: '#22C55E' },
          { label: 'EPC B', color: '#84CC16' },
          { label: 'EPC C', color: '#FACC15' },
          { label: 'EPC D', color: '#FB923C' },
          { label: 'EPC E-F', color: '#EF4444' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1 text-xs text-[#6B7280]">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
