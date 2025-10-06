import React from 'react';
import { Building2, LayoutGrid, Settings, FileText, Users } from 'lucide-react';

interface VerticalNavProps {
  currentView: 'portfolio' | 'building';
  onNavigate: (view: 'portfolio' | 'building') => void;
}

export function VerticalNav({ currentView, onNavigate }: VerticalNavProps) {
  const navItems = [
    { id: 'portfolio', label: 'Portfolio', icon: LayoutGrid, active: currentView === 'portfolio' },
    { id: 'building', label: 'Building', icon: Building2, active: currentView === 'building' },
    { id: 'reports', label: 'Reports', icon: FileText, active: false },
    { id: 'team', label: 'Team', icon: Users, active: false },
    { id: 'settings', label: 'Settings', icon: Settings, active: false },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen bg-white border-r border-gray-200 flex flex-col items-center py-4 w-16 z-40">
      {/* Logo */}
      <div className="mb-8 p-2">
        <div className="w-8 h-8 bg-[#F97316] rounded-lg flex items-center justify-center">
          <span className="text-white" style={{ fontWeight: 700, fontSize: '14px' }}>M</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'portfolio' || item.id === 'building') {
                  onNavigate(item.id as 'portfolio' | 'building');
                }
              }}
              className={`relative w-12 h-12 rounded-lg flex items-center justify-center transition-colors group ${
                item.active
                  ? 'bg-orange-50 text-[#F97316]'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
              title={item.label}
            >
              {item.active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#F97316] rounded-r"></div>
              )}
              <Icon className="w-5 h-5" />
              
              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {item.label}
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
