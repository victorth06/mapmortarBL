import React, { useState } from 'react';
import { TrendingUp, ArrowRight, AlertTriangle, CheckCircle, Clock, Calendar } from 'lucide-react';
import { Building as BuildingType, Scenario } from '../utils/supabase/types';

interface BuildingPriorityTableProps {
  buildings: BuildingType[];
  scenarios: Scenario[];
  onViewBuilding: (buildingId: string) => void;
}

interface BuildingPriority {
  building: BuildingType;
  optimalScenario: string;
  payback: number;
  rentAtRisk: number;
  carbonReduction: number;
  priorityScore: 'high' | 'medium' | 'low';
  scenarioYear: string;
}

export function BuildingPriorityTable({ buildings, scenarios, onViewBuilding }: BuildingPriorityTableProps) {
  const [sortBy, setSortBy] = useState<'priority' | 'payback' | 'rent' | 'carbon'>('priority');

  // Mock data - in real implementation, this would be calculated from actual building and scenario data
  const buildingPriorities: BuildingPriority[] = [
    {
      building: buildings[0] || { id: '1', name: '135 Bishopsgate', address: 'London EC2M 3YD', size_m2: 20000, created_at: '', updated_at: '' },
      optimalScenario: 'EPC C 2027',
      payback: 8,
      rentAtRisk: 1200000,
      carbonReduction: 35,
      priorityScore: 'high',
      scenarioYear: '2027'
    },
    {
      building: buildings[1] || { id: '2', name: 'Victoria House', address: 'London SW1E 5NA', size_m2: 8000, created_at: '', updated_at: '' },
      optimalScenario: 'EPC C 2027',
      payback: 7,
      rentAtRisk: 720000,
      carbonReduction: 40,
      priorityScore: 'high',
      scenarioYear: '2027'
    },
    {
      building: buildings[2] || { id: '3', name: 'Broadgate Tower', address: 'London EC2A 2EW', size_m2: 15000, created_at: '', updated_at: '' },
      optimalScenario: 'Net Zero 2050',
      payback: 11,
      rentAtRisk: 950000,
      carbonReduction: 58,
      priorityScore: 'medium',
      scenarioYear: '2050'
    },
    {
      building: buildings[3] || { id: '4', name: 'Canary Wharf 3', address: 'London E14 5AB', size_m2: 25000, created_at: '', updated_at: '' },
      optimalScenario: 'Net Zero 2050',
      payback: 13,
      rentAtRisk: 500000,
      carbonReduction: 62,
      priorityScore: 'medium',
      scenarioYear: '2050'
    },
    {
      building: buildings[4] || { id: '5', name: 'Paddington Central', address: 'London W2 1AS', size_m2: 12000, created_at: '', updated_at: '' },
      optimalScenario: 'BAU',
      payback: 0,
      rentAtRisk: 0,
      carbonReduction: 5,
      priorityScore: 'low',
      scenarioYear: 'N/A'
    }
  ];

  // Sort by priority (high first) by default, then by selected criteria
  const sortedPriorities = [...buildingPriorities].sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priorityScore] - priorityOrder[b.priorityScore];
    }
    // Add other sorting logic here
    return 0;
  });

  const getPriorityIcon = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'medium':
        return <Clock className="w-4 h-4 text-amber-600" />;
      case 'low':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
    }
  };

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const getPriorityHeatColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-amber-500';
      case 'low':
        return 'bg-green-500';
    }
  };

  return (
    <section className="mb-12">
      {/* Section Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-[#F97316] mb-1">Building Priority Matrix</h2>
            <p className="text-[#6B7280]">Ranked by Financial + Carbon Opportunity</p>
          </div>
        </div>
      </div>

      {/* Priority Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-[#6B7280]">Building</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-[#6B7280]">Priority</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-[#6B7280]">Optimal Pathway</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-[#6B7280]">Payback</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-[#6B7280]">Rent at Risk</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-[#6B7280]">Carbon Reduction</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-[#6B7280]">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedPriorities.map((item, index) => (
                <tr key={item.building.id} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer" onClick={() => onViewBuilding(item.building.id)}>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-semibold text-[#1A1A1A]">{item.building.name}</p>
                      <p className="text-sm text-[#6B7280]">{item.building.address}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      {/* Priority Heat Bar */}
                      <div className="w-2 h-8 rounded-full bg-gray-200 relative overflow-hidden">
                        <div 
                          className={`absolute bottom-0 left-0 right-0 ${getPriorityHeatColor(item.priorityScore)}`}
                          style={{ height: item.priorityScore === 'high' ? '100%' : item.priorityScore === 'medium' ? '66%' : '33%' }}
                        />
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(item.priorityScore)}`}>
                        {getPriorityIcon(item.priorityScore)}
                        {item.priorityScore.charAt(0).toUpperCase() + item.priorityScore.slice(1)}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.optimalScenario === 'EPC C 2027' ? 'bg-amber-100 text-amber-800' :
                        item.optimalScenario === 'Net Zero 2050' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.optimalScenario}
                      </span>
                      {item.scenarioYear !== 'N/A' && (
                        <div className="flex items-center gap-1 text-xs text-[#6B7280]">
                          <Calendar className="w-3 h-3" />
                          <span>{item.scenarioYear}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[#1A1A1A]">
                      {item.payback > 0 ? `${item.payback} yrs` : 'N/A'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[#1A1A1A]">
                      {item.rentAtRisk > 0 ? `£${(item.rentAtRisk / 1000).toFixed(0)}k` : '£0'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2 relative">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${Math.min(item.carbonReduction, 100)}%` }}
                        />
                      </div>
                      <span className="text-green-600 font-medium text-sm">
                        -{item.carbonReduction}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <button 
                      className="flex items-center gap-2 text-[#F97316] hover:text-orange-600 text-sm font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewBuilding(item.building.id);
                      }}
                    >
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insight Box */}
      <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500 mt-6">
        <h4 className="text-green-900 mb-2 font-semibold">Action Priority</h4>
        <p className="text-green-800 text-sm">
          Focus on high-priority buildings first to maximize impact. These buildings offer the best combination 
          of financial returns and carbon reduction potential.
        </p>
      </div>
    </section>
  );
}
