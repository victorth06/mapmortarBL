import React from 'react';
import { Building, Download, Filter, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

export function PortfolioStickyActionBar() {
  const handleDrillIntoBuilding = () => {
    // Navigate to building view
    console.log('Navigate to building view');
  };

  const handleExportPortfolio = () => {
    // Export portfolio report
    window.print();
  };

  const handleFilterHighRisk = () => {
    // Filter to show only high-risk buildings
    console.log('Filter high-risk buildings');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[#6B7280]">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium">8 high-priority buildings require immediate attention</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full px-4"
              onClick={handleFilterHighRisk}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter High-Risk Only
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="rounded-full px-4"
              onClick={handleExportPortfolio}
            >
              <Download className="w-4 h-4 mr-2" />
              Export Portfolio Report
            </Button>
            
            <Button
              size="sm"
              className="bg-[#F97316] hover:bg-orange-600 text-white rounded-full px-6"
              onClick={handleDrillIntoBuilding}
            >
              <Building className="w-4 h-4 mr-2" />
              Drill into Building View
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
