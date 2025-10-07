import React from 'react';
import {
  PortfolioFilters,
  PortfolioInfoSection,
  PortfolioRetrofitOpportunities,
  PortfolioPerformanceSection,
  PortfolioTable,
  PortfolioSummaryCard
} from './portfolio';

interface PortfolioDashboardProps {
  onViewBuilding: (id: string) => void;
}


export default function PortfolioDashboard({ onViewBuilding }: PortfolioDashboardProps) {
  return (
    <main className="max-w-7xl mx-auto px-6 py-8 bg-[#FAFAFA]">
      <PortfolioFilters />
      <PortfolioInfoSection />
      <PortfolioRetrofitOpportunities />
      <PortfolioPerformanceSection />
      <PortfolioTable onViewBuilding={onViewBuilding} />
      <PortfolioSummaryCard />
    </main>
  );
}