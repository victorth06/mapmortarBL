import React from 'react';
import { BarChart3, Upload, FileText, CheckCircle, Info } from 'lucide-react';
import { Building as BuildingType } from '../utils/supabase/types';

interface DataConfidenceSectionProps {
  buildings: BuildingType[];
}

export function DataConfidenceSection({ buildings }: DataConfidenceSectionProps) {
  // Mock data confidence levels - in real implementation, this would be calculated
  const confidenceData = {
    low: 8,    // estimates only
    medium: 12, // EPC + tenancy
    high: 5     // audits + detailed reports
  };

  const totalBuildings = buildings.length;

  return (
    <section className="mb-12">
      {/* Section Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-[#F97316] mb-1">Data Confidence</h2>
            <p className="text-[#6B7280]">Portfolio-wide data quality assessment</p>
          </div>
        </div>
      </div>

      {/* Confidence Visualization */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-[#1A1A1A]">Data Quality Distribution</h3>
          <div className="flex items-center gap-2 text-sm text-[#6B7280]">
            <Info className="w-4 h-4" />
            <span>You can begin analysis with low confidence — refine as more data becomes available</span>
          </div>
        </div>

        {/* Stacked Bar Chart with Softer Colors */}
        <div className="mb-6">
          <div className="flex h-12 rounded-lg overflow-hidden border border-gray-200">
            <div 
              className="bg-blue-100 flex items-center justify-center text-blue-800 font-semibold text-sm"
              style={{ width: `${(confidenceData.low / totalBuildings) * 100}%` }}
            >
              {confidenceData.low}
            </div>
            <div 
              className="bg-amber-100 flex items-center justify-center text-amber-800 font-semibold text-sm"
              style={{ width: `${(confidenceData.medium / totalBuildings) * 100}%` }}
            >
              {confidenceData.medium}
            </div>
            <div 
              className="bg-green-100 flex items-center justify-center text-green-800 font-semibold text-sm"
              style={{ width: `${(confidenceData.high / totalBuildings) * 100}%` }}
            >
              {confidenceData.high}
            </div>
          </div>
        </div>

        {/* Legend with Softer Messaging */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
            <div>
              <p className="font-semibold text-blue-800">Starting Point</p>
              <p className="text-sm text-blue-600">{confidenceData.low} buildings (estimates only)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-amber-100 border border-amber-300 rounded"></div>
            <div>
              <p className="font-semibold text-amber-800">Good Foundation</p>
              <p className="text-sm text-amber-600">{confidenceData.medium} buildings (EPC + tenancy)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
            <div>
              <p className="font-semibold text-green-800">Refined Analysis</p>
              <p className="text-sm text-green-600">{confidenceData.high} buildings (audits + detailed reports)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload CTA */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Upload className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h4 className="font-semibold text-[#1A1A1A]">Improve Data Quality</h4>
              <p className="text-sm text-[#6B7280]">
                Upload EPCs, audits, or tenancy profiles to refine your analysis
              </p>
            </div>
          </div>
          <button className="bg-[#F97316] hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
            Upload Documents
          </button>
        </div>
      </div>
    </section>
  );
}
