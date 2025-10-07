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
  { building: "135 Bishopsgate", payback: 8.0, co2Saving: 280000, investment: 2400000, epc: "D" },
  { building: "184-192 Drummond Street", payback: 12.0, co2Saving: 180000, investment: 2200000, epc: "C" },
  { building: "Broadwalk House", payback: 10.0, co2Saving: 220000, investment: 2200000, epc: "C" },
  { building: "BAE Systems Digital Intelligence", payback: 9.0, co2Saving: 200000, investment: 1800000, epc: "D" },
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
            domain={[0, 300000]}
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