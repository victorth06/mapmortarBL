import React from 'react';
import { X, Wrench, Clock, TrendingUp, Target } from 'lucide-react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '../ui/drawer';

export function MeasuresPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="w-full md:w-[700px] max-w-[90vw] bg-white border-l border-gray-200 overflow-y-auto">
        <DrawerHeader className="border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <DrawerTitle className="text-lg font-semibold text-gray-800">Intervention Measures</DrawerTitle>
              <DrawerDescription className="text-sm text-gray-500 mt-1">Detailed breakdown of retrofit measures and interventions</DrawerDescription>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </DrawerHeader>
        <div className="p-6 space-y-6">
          {/* Coming Soon Message */}
          <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Coming Soon</h3>
            <p className="text-sm text-blue-700">
              The detailed measures panel will include intervention prioritization, 
              cost breakdowns, and implementation timelines.
            </p>
          </div>

          {/* Placeholder Sections */}
          <div className="space-y-4">
            <div className="h-[200px] bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
              <div className="text-center">
                <Wrench className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                Intervention Details Placeholder
                <p className="text-xs mt-1">Measure prioritization and cost breakdown</p>
              </div>
            </div>

            <div className="h-[200px] bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
              <div className="text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                Implementation Timeline Placeholder
                <p className="text-xs mt-1">Phased implementation schedule</p>
              </div>
            </div>

            <div className="h-[200px] bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
              <div className="text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                Performance Impact Placeholder
                <p className="text-xs mt-1">Energy and carbon savings by measure</p>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
