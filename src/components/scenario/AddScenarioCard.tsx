import React from 'react';
import { Plus } from 'lucide-react';

export function AddScenarioCard() {
  return (
    <button 
      className="bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all h-full min-h-[600px] flex flex-col items-center justify-center gap-4 group"
      onClick={() => alert('Custom scenario builder coming soon!')}
    >
      <div className="w-16 h-16 rounded-full bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
        <Plus className="w-8 h-8 text-gray-400 group-hover:text-blue-600 transition-colors" />
      </div>
      <div className="text-center px-6">
        <h3 className="text-[#1A1A1A] mb-2 group-hover:text-blue-600 transition-colors">
          Add Scenario
        </h3>
        <p className="text-sm text-[#6B7280]">
          Create a custom retrofit pathway with your own assumptions and targets
        </p>
      </div>
      <div className="mt-4 px-4 py-2 rounded-full border border-gray-300 group-hover:border-blue-500 group-hover:bg-white text-sm text-[#6B7280] group-hover:text-blue-600 transition-all">
        Click to customize
      </div>
    </button>
  );
}