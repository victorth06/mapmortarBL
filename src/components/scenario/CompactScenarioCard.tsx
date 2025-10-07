import React from 'react';
import { Check, ChevronRight, Zap, Leaf } from 'lucide-react';
import { Button } from '../ui/button';

interface CompactScenarioCardProps {
  title: string;
  badge: string;
  badgeColor: 'amber' | 'green';
  tagline: string;
  capex: string;
  rentProtected: string;
  annualSavings: string;
  payback: string;
  energyReduction: string;
  carbonReduction: string;
  strandedYear: string;
  keyBenefits: string[];
  onViewDetails?: () => void;
}

export function CompactScenarioCard({
  title,
  badge,
  badgeColor,
  tagline,
  capex,
  rentProtected,
  annualSavings,
  payback,
  energyReduction,
  carbonReduction,
  strandedYear,
  keyBenefits,
  onViewDetails,
}: CompactScenarioCardProps) {
  const badgeStyles = {
    amber: 'bg-amber-500 text-white',
    green: 'bg-green-600 text-white',
  };

  const borderStyles = {
    amber: 'border-amber-500',
    green: 'border-green-600',
  };

  const energyPercent = parseInt(energyReduction);
  const carbonPercent = parseInt(carbonReduction);

  return (
    <div 
      className={`bg-white rounded-lg border-2 ${borderStyles[badgeColor]} shadow-lg hover:shadow-xl transition-all ${
        onViewDetails ? 'cursor-pointer hover:scale-[1.02]' : ''
      }`}
      onClick={onViewDetails}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-[#1A1A1A]">{title}</h3>
          <span className={`px-3 py-1 rounded-full text-sm ${badgeStyles[badgeColor]}`}>
            {badge}
          </span>
        </div>
        <p className="text-sm text-[#6B7280]">{tagline}</p>
      </div>

      {/* KPI Grid - Compact & Comparable */}
      <div className="p-6 space-y-4">
        {/* Financial Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-[#6B7280] mb-1">CAPEX</p>
            <p className="text-[24px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>{capex}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-xs text-[#6B7280] mb-1">Rent Protected</p>
            <p className="text-[24px] text-green-600" style={{ fontWeight: 700 }}>{rentProtected}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-[#6B7280] mb-1">Annual Savings</p>
            <p className="text-[24px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>{annualSavings}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-[#6B7280] mb-1">Payback</p>
            <p className="text-[24px] text-[#1A1A1A]" style={{ fontWeight: 700 }}>{payback}</p>
          </div>
        </div>

        {/* Energy & Carbon Reduction - Visual Meters */}
        <div className="space-y-3 pt-2">
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-[#6B7280]">Energy Reduction</span>
              </div>
              <span className="text-blue-600" style={{ fontWeight: 700 }}>{energyReduction}</span>
            </div>
            <div className="w-full bg-white rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all" 
                style={{ width: `${energyPercent}%` }}
              />
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-green-600" />
                <span className="text-xs text-[#6B7280]">Carbon Reduction</span>
              </div>
              <span className="text-green-600" style={{ fontWeight: 700 }}>{carbonReduction}</span>
            </div>
            <div className="w-full bg-white rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all" 
                style={{ width: `${carbonPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stranded Year */}
        <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
          <p className="text-xs text-[#6B7280] mb-1">CRREM Aligned Until</p>
          <p className="text-[24px] text-purple-600" style={{ fontWeight: 700 }}>{strandedYear}</p>
        </div>

        {/* Key Benefits */}
        <div className="pt-2">
          <p className="text-xs text-[#6B7280] mb-2">Key Benefits:</p>
          <ul className="space-y-1.5">
            {keyBenefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-[#1A1A1A]">
                <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="p-6 pt-0">
        <Button 
          className={`w-full rounded-full ${
            badgeColor === 'amber' 
              ? 'bg-amber-500 hover:bg-amber-600 text-white' 
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails?.();
          }}
        >
          See Full Details
          <ChevronRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}