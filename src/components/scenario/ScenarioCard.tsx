import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Zap, Leaf } from 'lucide-react';
import { Button } from '../ui/button';

interface ScenarioCardProps {
  title: string;
  description: string;
  type: 'baseline' | 'recommended' | 'future';
  capex: string;
  rentProtected: string;
  annualSavings: string;
  payback: string;
  carbonReduction: string;
  energyReduction?: string;
  strandedYear: string;
  annotation?: string;
  assumptions?: string[];
}

export function ScenarioCard({
  title,
  description,
  type,
  capex,
  rentProtected,
  annualSavings,
  payback,
  carbonReduction,
  energyReduction,
  strandedYear,
  annotation,
  assumptions = [],
}: ScenarioCardProps) {
  const [expanded, setExpanded] = useState(false);

  const typeStyles = {
    baseline: {
      border: 'border-[#6B7280]',
      bg: 'bg-gray-50',
      badge: 'bg-[#6B7280] text-white',
      button: 'border-[#6B7280] text-[#6B7280]',
    },
    recommended: {
      border: 'border-[#F59E0B]',
      bg: 'bg-amber-50',
      badge: 'bg-[#F59E0B] text-white',
      button: 'border-[#F59E0B] text-[#F59E0B]',
    },
    future: {
      border: 'border-[#22C55E]',
      bg: 'bg-green-50',
      badge: 'bg-[#22C55E] text-white',
      button: 'border-[#22C55E] text-[#22C55E]',
    },
  };

  const styles = typeStyles[type];

  // Parse percentage for visual meters
  const energyPercent = energyReduction ? parseInt(energyReduction) : 0;
  const carbonPercent = carbonReduction ? parseInt(carbonReduction) : 0;

  return (
    <div className={`bg-white rounded-lg shadow-md border-2 ${styles.border} p-6 hover:shadow-lg transition-shadow`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="mb-1">{title}</h3>
          <p className="text-sm text-[#6B7280]">{description}</p>
        </div>
        {type === 'recommended' && (
          <span className={`px-3 py-1 rounded-full text-sm ${styles.badge}`}>
            Recommended
          </span>
        )}
      </div>

      {annotation && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <p className="text-sm text-[#1A1A1A]">{annotation}</p>
        </div>
      )}

      {/* Visual KPI Meters for Energy & Carbon */}
      {(energyReduction || carbonReduction) && (
        <div className="mb-6 space-y-4">
          {energyReduction && (
            <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-[#6B7280]">Energy Use Reduction</span>
                <span className="ml-auto text-blue-600" style={{ fontWeight: 700 }}>{energyReduction}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-500" 
                  style={{ width: `${energyPercent}%` }}
                />
              </div>
            </div>
          )}

          {carbonReduction && (
            <div className="bg-gradient-to-r from-green-50 to-white p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="w-5 h-5 text-green-600" />
                <span className="text-sm text-[#6B7280]">Carbon Reduction</span>
                <span className="ml-auto text-green-600" style={{ fontWeight: 700 }}>{carbonReduction}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    type === 'baseline' ? 'bg-red-500' : 'bg-green-600'
                  }`}
                  style={{ width: `${carbonPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="text-[#6B7280]">CAPEX</span>
          <span>{capex}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="text-[#6B7280]">Rent Protected/Uplift</span>
          <span className={type === 'baseline' ? 'text-[#EF4444]' : 'text-[#22C55E]'}>
            {rentProtected}
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="text-[#6B7280]">Annual Savings</span>
          <span className="text-[#22C55E]">{annualSavings}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="text-[#6B7280]">Payback Period</span>
          <span>{payback}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-[#6B7280]">Stranded Year</span>
          <span className={type === 'future' ? 'text-[#22C55E]' : 'text-[#F59E0B]'}>
            {strandedYear}
          </span>
        </div>
      </div>

      {assumptions.length > 0 && (
        <div className="mb-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-between w-full text-left text-sm text-[#6B7280] hover:text-[#1A1A1A]"
          >
            <span>Key Assumptions</span>
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {expanded && (
            <ul className="mt-3 space-y-2 text-sm text-[#6B7280]">
              {assumptions.map((assumption, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#22C55E] mt-0.5 flex-shrink-0" />
                  <span>{assumption}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="outline" className="rounded-full flex-1">
          See details
        </Button>
        <Button variant="outline" className="rounded-full flex-1">
          Adjust assumptions
        </Button>
      </div>
    </div>
  );
}
