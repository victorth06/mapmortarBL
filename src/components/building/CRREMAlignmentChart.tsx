import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  ReferenceLine,
  Area,
  AreaChart,
} from 'recharts';

// --- Mock data for CRREM pathway and building trajectories ---
const crremData = [
  { year: 2020, crrem: 25, avg: 33, building1: 34, building2: 28, building3: 32, building4: 30 },
  { year: 2024, crrem: 23, avg: 32, building1: 33, building2: 27, building3: 31, building4: 29 },
  { year: 2025, crrem: 21, avg: 31, building1: 32, building2: 26, building3: 30, building4: 28 },
  { year: 2027, crrem: 19, avg: 30, building1: 30, building2: 24, building3: 28, building4: 26 },
  { year: 2030, crrem: 18, avg: 29, building1: 28, building2: 23, building3: 27, building4: 25 },
  { year: 2035, crrem: 14, avg: 25, building1: 25, building2: 19, building3: 23, building4: 21 },
  { year: 2040, crrem: 10, avg: 22, building1: 22, building2: 15, building3: 20, building4: 18 },
  { year: 2045, crrem: 7, avg: 18, building1: 19, building2: 12, building3: 16, building4: 14 },
  { year: 2050, crrem: 4, avg: 14, building1: 16, building2: 10, building3: 13, building4: 11 },
];

// Building data for individual trajectories
const buildingTrajectories = [
  { name: '135 Bishopsgate', trajectory: [34, 32, 28, 25, 22, 19, 16], epc: 'D' },
  { name: '40 Leadenhall', trajectory: [28, 26, 23, 19, 15, 12, 10], epc: 'B' },
  { name: '25 Old Broad St', trajectory: [32, 30, 27, 23, 20, 16, 13], epc: 'C' },
  { name: '99 Fenchurch', trajectory: [30, 28, 25, 21, 18, 14, 11], epc: 'B' },
];

// --- EPC color mapping ---
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
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const year = label;
    const crremValue = payload.find((p: any) => p.dataKey === 'crrem')?.value;
    const avgValue = payload.find((p: any) => p.dataKey === 'avg')?.value;
    const gap = avgValue && crremValue ? (avgValue - crremValue).toFixed(1) : 0;
    
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-[#1A1A1A] mb-2">Year {year}</p>
        <div className="space-y-1">
          <p className="text-xs text-[#6B7280]">
            CRREM Target: <span className="font-medium text-orange-600">{crremValue} kgCO₂/m²</span>
          </p>
          <p className="text-xs text-[#6B7280]">
            Portfolio Avg: <span className="font-medium text-blue-600">{avgValue} kgCO₂/m²</span>
          </p>
          <p className="text-xs font-medium text-red-600">
            Δ Stranding Gap: +{gap} kgCO₂/m²
          </p>
        </div>
      </div>
    );
  }
  return null;
};

// --- Chart Component Props ---
interface CRREMAlignmentChartProps {
  data?: Array<{
    year: number;
    crrem: number;
    avg: number;
    [key: string]: any;
  }>;
  showBuildingTrajectories?: boolean;
}

// --- Main Chart Component ---
export default function CRREMAlignmentChart({ 
  data = crremData, 
  showBuildingTrajectories = true 
}: CRREMAlignmentChartProps) {
  // Calculate current gap and stranding year
  const currentYear = 2024;
  const currentData = data.find(d => d.year === currentYear) || data[0];
  const currentGap = currentData ? (currentData.avg - currentData.crrem).toFixed(1) : '0';
  
  // Find when portfolio becomes stranded (crosses CRREM line)
  const strandingYear = data.find(d => d.avg > d.crrem)?.year || 'Already stranded';
  
  // Calculate improvement potential
  const improvementPotential = currentData ? ((currentData.avg - currentData.crrem) / currentData.crrem * 100).toFixed(0) : '0';

  return (
    <div className="h-full">
      {/* Chart */}
      <ResponsiveContainer width="100%" height={220}>
        <ComposedChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          
          <XAxis
            dataKey="year"
            stroke="#6B7280"
            tick={{ fontSize: 10 }}
            tickLine={{ stroke: '#D1D5DB' }}
            axisLine={{ stroke: '#D1D5DB' }}
            domain={[2020, 2050]}
          />
          
          <YAxis
            label={{ value: "kgCO₂/m²", angle: -90, position: "insideLeft", style: { textAnchor: 'middle', fontSize: '10px', fill: '#6B7280' } }}
            stroke="#6B7280"
            tick={{ fontSize: 10 }}
            tickLine={{ stroke: '#D1D5DB' }}
            axisLine={{ stroke: '#D1D5DB' }}
            domain={[0, 50]}
          />
          
          <ChartTooltip content={<CustomTooltip />} />
          
          {/* Milestone Reference Lines */}
          <ReferenceLine 
            x={2027} 
            stroke="#9CA3AF" 
            strokeDasharray="4 4" 
            label={{ 
              value: "MEES 2027", 
              position: "top",
              style: { fontSize: '9px', fill: '#9CA3AF' }
            }} 
          />
          <ReferenceLine 
            x={2030} 
            stroke="#9CA3AF" 
            strokeDasharray="4 4" 
            label={{ 
              value: "MEES 2030", 
              position: "top",
              style: { fontSize: '9px', fill: '#9CA3AF' }
            }} 
          />
          <ReferenceLine 
            x={2050} 
            stroke="#9CA3AF" 
            strokeDasharray="4 4" 
            label={{ 
              value: "2050 Net Zero", 
              position: "top",
              style: { fontSize: '9px', fill: '#9CA3AF' }
            }} 
          />
          
          {/* Stranding Gap Area */}
          <Area
            type="monotone"
            dataKey="avg"
            stroke="none"
            fill="#FEE2E2"
            fillOpacity={0.3}
          />
          <Area
            type="monotone"
            dataKey="crrem"
            stroke="none"
            fill="#FEF3C7"
            fillOpacity={0.2}
          />
          
          {/* CRREM Target Path */}
          <Line
            type="monotone"
            dataKey="crrem"
            stroke="#F97316"
            strokeWidth={3}
            dot={false}
            name="CRREM 1.5°C Path"
          />
          
          {/* Portfolio Average */}
          <Line
            type="monotone"
            dataKey="avg"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 3 }}
            name="Portfolio Avg"
          />
          
          {/* Individual Building Trajectories (optional) */}
          {showBuildingTrajectories && buildingTrajectories.map((building, index) => (
            <Line
              key={building.name}
              type="monotone"
              dataKey={`building${index + 1}`}
              stroke={getEPCColor(building.epc)}
              strokeWidth={1}
              strokeDasharray="2 2"
              dot={false}
              name={building.name}
              opacity={0.6}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>

      {/* Chart Insights */}
      <div className="mt-3 flex justify-between items-center text-xs text-[#6B7280]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            CRREM 1.5°C pathway
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            Portfolio trajectory
          </span>
        </div>
        <div className="text-right">
          <span className="font-medium text-red-600">+{currentGap} kgCO₂/m²</span> current gap
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mt-2 flex gap-2 text-xs">
        <div className="bg-gray-50 rounded p-2 border border-gray-100 flex-1">
          <p className="text-[#6B7280]">Stranding Year</p>
          <p className="font-semibold text-red-600">{strandingYear}</p>
        </div>
        <div className="bg-gray-50 rounded p-2 border border-gray-100 flex-1">
          <p className="text-[#6B7280]">Gap vs CRREM</p>
          <p className="font-semibold text-orange-600">{currentGap} kgCO₂/m²</p>
        </div>
        <div className="bg-gray-50 rounded p-2 border border-gray-100 flex-1">
          <p className="text-[#6B7280]">Improvement Potential</p>
          <p className="font-semibold text-green-600">{improvementPotential}%</p>
        </div>
      </div>
    </div>
  );
}
