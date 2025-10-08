import React from 'react';
import { X } from 'lucide-react';
import { Drawer, DrawerContent } from '../ui/drawer';

export function RoadmapPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="w-full md:w-[700px] max-w-[90vw] bg-white border-l border-gray-200 overflow-y-auto">
        <div className="flex justify-between items-center p-6 pb-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Implementation Roadmap</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6">
          <div className="text-sm text-gray-500 mb-4">Detailed timeline and implementation schedule.</div>
          <div className="h-[400px] bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
            Timeline Gantt Placeholder
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
