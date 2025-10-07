import React from 'react';
import { Badge } from '../ui/badge';

export default function PortfolioFilters() {
  return (
    <div className="mb-6 pb-4 border-b border-gray-200">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-[#6B7280] mr-2">Filter by:</span>
        <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer">
          All Locations
        </Badge>
        <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer">
          Office
        </Badge>
        <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer">
          Active
        </Badge>
        <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer">
          EPC C+
        </Badge>
      </div>
    </div>
  );
}
