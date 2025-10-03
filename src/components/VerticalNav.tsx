import { Building2, LayoutGrid, Settings, FileText, Users, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface VerticalNavProps {
  onViewBuilding?: (buildingId: string) => void;
  selectedBuilding?: string | null;
}

export function VerticalNav({ onViewBuilding, selectedBuilding }: VerticalNavProps) {
  const [showBuildings, setShowBuildings] = useState(false);
  
  // Mock building data - in real implementation, this would come from props or API
  const buildings = [
    { id: '1', name: '135 Bishopsgate', address: 'London EC2M 3YD' },
    { id: '2', name: 'Victoria House', address: 'London SW1E 5NA' },
    { id: '3', name: 'Broadgate Tower', address: 'London EC2A 2EW' },
    { id: '4', name: 'Canary Wharf 3', address: 'London E14 5AB' },
    { id: '5', name: 'Paddington Central', address: 'London W2 1AS' },
  ];

  const navItems = [
    { id: 'portfolio', label: 'Portfolio', icon: LayoutGrid, active: !selectedBuilding },
    { id: 'assets', label: 'Assets', icon: Building2, active: false, hasSubItems: true },
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
          const isAssets = item.id === 'assets';
          
          return (
            <div key={item.id}>
              <button
                className={`relative w-12 h-12 rounded-lg flex items-center justify-center transition-colors group ${
                  item.active
                    ? 'bg-orange-50 text-[#F97316]'
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                }`}
                title={item.label}
                onClick={() => {
                  if (isAssets) {
                    setShowBuildings(!showBuildings);
                  }
                }}
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
              
              {/* Buildings submenu for Assets */}
              {isAssets && showBuildings && (
                <div className="ml-2 mt-1 space-y-1">
                  {buildings.map((building) => (
                    <button
                      key={building.id}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors group ${
                        selectedBuilding === building.id
                          ? 'bg-orange-50 text-[#F97316]'
                          : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                      }`}
                      title={building.name}
                      onClick={() => onViewBuilding?.(building.id)}
                    >
                      {selectedBuilding === building.id && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#F97316] rounded-r"></div>
                      )}
                      <Building2 className="w-4 h-4" />
                      
                      {/* Tooltip */}
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                        {building.name}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
