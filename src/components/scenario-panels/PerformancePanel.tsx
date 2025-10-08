import React from 'react';
import { X, BarChart3, TrendingUp, Target, Zap, Leaf } from 'lucide-react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '../ui/drawer';

export function PerformancePanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="w-full md:w-[800px] max-w-[90vw] bg-white border-l border-gray-200 overflow-y-auto">
        <DrawerHeader className="border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <DrawerTitle className="text-lg font-semibold text-gray-800">Performance & Benchmark Details</DrawerTitle>
              <DrawerDescription className="text-sm text-gray-500 mt-1">Environmental and performance metrics with detailed charts</DrawerDescription>
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
              The performance panel will include detailed CRREM trajectory analysis, 
              energy benchmarking, and carbon reduction tracking.
            </p>
          </div>

          {/* Placeholder Sections */}
          <div className="space-y-4">
            <div className="h-[300px] bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
              <div className="text-center">
                <BarChart3 className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                CRREM Trajectory Detailed Chart
                <p className="text-xs mt-1">Carbon reduction pathway over time</p>
              </div>
            </div>

            <div className="h-[300px] bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
              <div className="text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                Energy Waterfall Detailed Chart
                <p className="text-xs mt-1">Energy savings breakdown by measure</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-[200px] bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                <div className="text-center">
                  <Zap className="w-6 h-6 mx-auto mb-2 text-gray-300" />
                  Energy Benchmarking
                  <p className="text-xs mt-1">Performance vs industry standards</p>
                </div>
              </div>
              <div className="h-[200px] bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                <div className="text-center">
                  <Leaf className="w-6 h-6 mx-auto mb-2 text-gray-300" />
                  Carbon Tracking
                  <p className="text-xs mt-1">Real-time carbon reduction monitoring</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
