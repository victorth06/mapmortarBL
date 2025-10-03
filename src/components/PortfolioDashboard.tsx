import React, { useState, useEffect } from 'react';
import { PortfolioHero } from './PortfolioHero';
import { PortfolioKPIs } from './PortfolioKPIs';
import { DataConfidenceSection } from './DataConfidenceSection';
import { TransitionRisksSection } from './TransitionRisksSection';
import { PhysicalRisksSection } from './PhysicalRisksSection';
import { OpportunitiesPathwaysSection } from './OpportunitiesPathwaysSection';
import { BuildingPriorityTable } from './BuildingPriorityTable';
import { VerticalNav } from './VerticalNav';
import { PortfolioStickyActionBar } from './PortfolioStickyActionBar';
import { Building, Scenario } from '../utils/supabase/types';
import { getAllBuildings } from '../utils/supabase/queries';

interface PortfolioDashboardProps {
  onViewBuilding: (buildingId: string) => void;
}

export function PortfolioDashboard({ onViewBuilding }: PortfolioDashboardProps) {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        const buildingsData = await getAllBuildings();
        setBuildings(buildingsData);
        
        // Load scenarios for all buildings
        // This would need to be implemented in queries.ts
        // const scenariosData = await getAllScenarios();
        // setScenarios(scenariosData);
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading portfolio data:', error);
        setLoading(false);
      }
    };

    loadPortfolioData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA]">
        <VerticalNav />
        <div className="ml-16 flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F97316] mx-auto mb-4"></div>
            <p className="text-[#6B7280]">Loading portfolio data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      <VerticalNav />
      <div className="ml-16">
        <PortfolioStickyActionBar />
        
        <main className="max-w-7xl mx-auto px-6 py-8">
          <PortfolioHero buildings={buildings} />
          <PortfolioKPIs buildings={buildings} />
          <DataConfidenceSection buildings={buildings} />
          <TransitionRisksSection buildings={buildings} />
          <PhysicalRisksSection buildings={buildings} />
          <OpportunitiesPathwaysSection buildings={buildings} scenarios={scenarios} />
          <BuildingPriorityTable buildings={buildings} scenarios={scenarios} onViewBuilding={onViewBuilding} />

          <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-[#6B7280]">
            <p className="mb-2">
              Portfolio Dashboard generated on {new Date().toLocaleDateString('en-GB', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
            </p>
            <p className="text-sm">
              Data sources: EPC Register, CRREM Tool v2.0, CIBSE TM46, building energy meters
            </p>
            <p className="text-sm mt-2">
              © 2025 Sustainable Asset Reports. All rights reserved.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
