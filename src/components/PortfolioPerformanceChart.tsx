import React from 'react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  ZAxis,
  Legend,
  Cell,
} from 'recharts';

// --- Mock data ---
const performanceData = [
  { building: "135 Bishopsgate", payback: 4.2, co2Saving: 310000, investment: 2100000, epc: "C" },
  { building: "25 Old Broad St", payback: 6.5, co2Saving: 240000, investment: 1800000, epc: "D" },
  { building: "40 Leadenhall", payback: 8.3, co2Saving: 190000, investment: 1500000, epc: "E" },
  { building: "10 Fenchurch Ave", payback: 3.8, co2Saving: 400000, investment: 2600000, epc: "B" },
  { building: "70 Gracechurch St", payback: 10.2, co2Saving: 280000, investment: 3200000, epc: "D" },
  { building: "1 Broadgate", payback: 5.0, co2Saving: 350000, investment: 2300000, epc: "C" },
  { building: "Broadgate Tower", payback: 11.0, co2Saving: 220000, investment: 2800000, epc: "D" },
  { building: "Canary Wharf 3", payback: 13.0, co2Saving: 180000, investment: 2000000, epc: "E" },
  { building: "Victoria House", payback: 7.0, co2Saving: 260000, investment: 1900000, epc: "D" },
  { building: "Paddington Central", payback: 2.5, co2Saving: 450000, investment: 3000000, epc: "B" },
];

// --- EPC colour mapping ---
const getEPCColor = (epc: string) => {
  switch (epc) {
    case "A":
    case "B":
      return "#4ADE80"; // green
    case "C":
      return "#A3E635"; // lime
    case "D":
      return "#FACC15"; // amber
    case "E":
    case "F":
      return "#F87171"; // red
    default:
      return "#9CA3AF"; // gray
  }
};

// --- Tooltip ---
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-[#1A1A1A] mb-1">{d.building}</p>
        <p className="text-xs text-[#6B7280]">
          Payback: <span className="font-medium">{d.payback} years</span>
        </p>
        <p className="text-xs text-[#6B7280]">
          CO₂ Saving: <span className="font-medium">{d.co2Saving.toLocaleString()} tCO₂e</span>
        </p>
        <p className="text-xs text-[#6B7280]">
          Investment: <span className="font-medium">£{(d.investment / 1_000_000).toFixed(1)}M</span>
        </p>
        <p className="text-xs text-[#6B7280]">
          EPC Rating: <span className="font-medium">{d.epc}</span>
        </p>
      </div>
    );
  }
  return null;
};

// --- Legend ---
const EPCLegend = () => {
  const items = [
    { label: "EPC A–B", color: "#4ADE80" },
    { label: "EPC C", color: "#A3E635" },
    { label: "EPC D", color: "#FACC15" },
    { label: "EPC E–F", color: "#F87171" },
  ];
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4 pt-2">
      {items.map((i) => (
        <div key={i.label} className="flex items-center gap-2 text-sm text-[#6B7280]">
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: i.color }}></span>
          {i.label}
        </div>
      ))}
    </div>
  );
};

// --- Main Chart ---
export default function PortfolioPerformanceChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">Portfolio Performance</h3>
        <p className="text-sm text-gray-500">
          This chart shows potential CO₂ savings vs payback period.
          <br />
          Bubbles in the top-left are quick wins (high savings, low payback).
        </p>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 40, right: 40, bottom: 80, left: 80 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            type="number"
            dataKey="payback"
            name="Payback"
            unit="yrs"
            stroke="#6B7280"
            domain={[0, 15]}
            label={{ value: "Payback (years)", position: "insideBottom", offset: -15 }}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            type="number"
            dataKey="co2Saving"
            name="CO₂ Saving"
            stroke="#6B7280"
            domain={[0, 500000]}
            label={{ value: "CO₂ Saving (tCO₂e)", angle: -90, position: "insideLeft", offset: -10 }}
            tick={{ fontSize: 12 }}
          />
          <ZAxis dataKey="investment" range={[100, 1200]} name="Investment" unit="£" />
          <ChartTooltip cursor={{ strokeDasharray: "3 3" }} content={<CustomTooltip />} />

          <Scatter name="Buildings" data={performanceData} fillOpacity={0.85}>
            {performanceData.map((b, i) => (
              <Cell
                key={`cell-${i}`}
                fill={getEPCColor(b.epc)}
                stroke={b.building === "135 Bishopsgate" ? "#1A1A1A" : "#fff"}
                strokeWidth={b.building === "135 Bishopsgate" ? 2 : 1}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

      <EPCLegend />
    </div>
  );
}