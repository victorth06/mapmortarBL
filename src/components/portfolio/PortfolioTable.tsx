import React from 'react';
import { Building2 } from 'lucide-react';
import { Button } from '../ui/button';

interface PortfolioTableProps {
  onViewBuilding: (id: string) => void;
}

export default function PortfolioTable({ onViewBuilding }: PortfolioTableProps) {
  const buildings = [
    {
      name: "135 Bishopsgate",
      location: "London EC2M 3YD",
      epc: "D",
      gia: "43,390 sqm",
      pathway: "EPC C 2027",
      payback: "8y",
      rentAtRisk: "£1.2M",
      carbon: "-36%",
      priority: "high",
    },
    {
      name: "184-192 Drummond Street",
      location: "London NW1 3HP",
      epc: "C",
      gia: "8,500 sqm",
      pathway: "Net Zero 2050",
      payback: "12y",
      rentAtRisk: "£420k",
      carbon: "-45%",
      priority: "medium",
    },
    {
      name: "Broadwalk House",
      location: "London EC2A 2DA",
      epc: "C",
      gia: "15,200 sqm",
      pathway: "Net Zero 2050",
      payback: "10y",
      rentAtRisk: "£680k",
      carbon: "-52%",
      priority: "medium",
    },
    {
      name: "BAE Systems Digital Intelligence",
      location: "Guildford GU2 7YJ",
      epc: "D",
      gia: "12,800 sqm",
      pathway: "EPC C 2027",
      payback: "9y",
      rentAtRisk: "£580k",
      carbon: "-38%",
      priority: "high",
    },
  ];

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#6B7280]" />
          <h2 className="text-2xl font-semibold text-[#1A1A1A]">
            Building Priority Table
          </h2>
        </div>
        <Button
          variant="outline"
          className="text-[#6B7280] hover:text-[#1A1A1A]"
        >
          Export Data
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-gray-200 rounded-xl bg-white shadow-sm">
        <table className="w-full border-collapse text-sm">
          {/* Table Head */}
          <thead className="bg-gray-50 text-left text-[#1A1A1A]">
            <tr>
              <th className="px-6 py-3 font-medium">Building</th>
              <th className="px-4 py-3 font-medium text-center">EPC</th>
              <th className="px-4 py-3 font-medium text-center">GIA</th>
              <th className="px-4 py-3 font-medium text-center">Pathway</th>
              <th className="px-4 py-3 font-medium text-center">Payback</th>
              <th className="px-4 py-3 font-medium text-center">Rent at Risk</th>
              <th className="px-4 py-3 font-medium text-center">Carbon</th>
              <th className="px-4 py-3 font-medium text-center">Priority</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100">
            {buildings.map((b) => (
              <tr
                key={b.name}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => onViewBuilding(b.name)}
              >
                <td className="px-6 py-4">
                  <div className="font-medium text-[#1A1A1A]">{b.name}</div>
                  <div className="text-[#6B7280] text-xs">{b.location}</div>
                </td>
                <td className="px-4 py-4 text-center">
                  <span
                    className={`inline-flex items-center justify-center px-2 py-1 text-xs font-semibold rounded-full ${
                      b.epc === "A"
                        ? "bg-green-100 text-green-700"
                        : b.epc === "B"
                        ? "bg-emerald-100 text-emerald-700"
                        : b.epc === "C"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {b.epc}
                  </span>
                </td>
                <td className="px-4 py-4 text-center text-[#1A1A1A]">{b.gia}</td>
                <td className="px-4 py-4 text-center text-[#6B7280]">
                  {b.pathway}
                </td>
                <td className="px-4 py-4 text-center text-[#1A1A1A]">{b.payback}</td>
                <td className="px-4 py-4 text-center font-medium text-red-500">
                  {b.rentAtRisk}
                </td>
                <td className="px-4 py-4 text-center font-medium text-green-600">
                  {b.carbon}
                </td>
                <td className="px-4 py-4 text-center">
                  <span
                    className={`inline-flex items-center justify-center px-3 py-1 text-xs font-semibold rounded-full ${
                      b.priority === "high"
                        ? "bg-red-100 text-red-700"
                        : b.priority === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {b.priority}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-[#6B7280] mt-2">
        Ranked by risk and opportunity
      </p>
    </div>
  );
}
