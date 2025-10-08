import React from 'react';
import { X, Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '../ui/drawer';

export function RoadmapPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="w-full md:w-[800px] max-w-[90vw] bg-white border-l border-gray-200 overflow-y-auto">
        <DrawerHeader className="border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <DrawerTitle className="text-lg font-semibold text-gray-800">Implementation Roadmap</DrawerTitle>
              <DrawerDescription className="text-sm text-gray-500 mt-1">Detailed timeline and implementation schedule</DrawerDescription>
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
              The roadmap panel will include detailed Gantt charts, milestone tracking, 
              and resource allocation schedules.
            </p>
          </div>

          {/* Placeholder Sections */}
          <div className="space-y-4">
            <div className="h-[250px] bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
              <div className="text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                Gantt Chart Placeholder
                <p className="text-xs mt-1">Implementation timeline with dependencies</p>
              </div>
            </div>

            <div className="h-[200px] bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
              <div className="text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                Milestone Tracking Placeholder
                <p className="text-xs mt-1">Key project milestones and deadlines</p>
              </div>
            </div>

            <div className="h-[200px] bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm">
              <div className="text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                Resource Allocation Placeholder
                <p className="text-xs mt-1">Team and contractor scheduling</p>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
