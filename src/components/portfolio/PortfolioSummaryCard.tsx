import React from 'react';

export default function PortfolioSummaryCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <div className="text-center">
        <p className="text-lg text-[#1A1A1A] mb-2">
          <strong>£4.37M rental income at risk by 2030</strong> — Retrofitting 4 buildings could protect £4.37M and cut 201% carbon emissions annually.
        </p>
        <p className="text-sm text-[#6B7280]">
          Focus on high-risk buildings (135 Bishopsgate, Victoria House) with strong retrofit potential for maximum impact.
        </p>
      </div>
    </div>
  );
}
