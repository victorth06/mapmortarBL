import { useState, useEffect } from 'react';
import { VerticalNav } from './components/VerticalNav';
import { StickyNav } from './components/StickyNav';
import { StickyActionBar } from './components/StickyActionBar';
import { PropertyHero } from './components/PropertyHero';
import { ExecutiveOverview } from './components/ExecutiveOverview';
import { ExecutiveBridge } from './components/ExecutiveBridge';
import { OpportunitiesSection } from './components/OpportunitiesSection';
import { ScenarioDetailPage } from './components/ScenarioDetailPage';

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [currentView, setCurrentView] = useState<'report' | 'scenario'>('report');
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const handleScenarioClick = (scenarioName: string) => {
    setSelectedScenario(scenarioName);
    setCurrentView('scenario');
    window.scrollTo(0, 0);
  };

  const handleBackToReport = () => {
    setCurrentView('report');
    setSelectedScenario(null);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'opportunities'];
      const scrollPosition = window.scrollY + 150;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show scenario detail page if selected
  if (currentView === 'scenario' && selectedScenario) {
    return (
      <div className="min-h-screen bg-[#FAFAFA]">
        <VerticalNav />
        <div className="ml-16">
          <ScenarioDetailPage 
            scenarioName={selectedScenario}
            onBack={handleBackToReport}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      <VerticalNav />
      <div className="ml-16">
        <StickyNav activeSection={activeSection} />
        <StickyActionBar />
        
        <main className="max-w-7xl mx-auto px-6 py-8">
        <PropertyHero
          buildingName="135 Bishopsgate"
          address="London EC2M 3YD"
          reportId="SAR-2024-001"
          reportDate="2 October 2025"
          buildingImage="https://images.unsplash.com/photo-1676679992426-1803645cdd40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb25kb24lMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTkzOTI1MDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          mapImage="https://images.unsplash.com/photo-1542382257-80dedb725088?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbWFwJTIwYWVyaWFsfGVufDF8fHx8MTc1OTM5MjUwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        />

        <ExecutiveOverview />
        <ExecutiveBridge />
        <OpportunitiesSection onScenarioClick={handleScenarioClick} />

        <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-[#6B7280]">
          <p className="mb-2">
            This report was generated on 2 October 2025 for 135 Bishopsgate, London EC2M 3YD
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

      <style>{`
        @media print {
          .sticky {
            position: relative !important;
          }
          
          button {
            display: none !important;
          }
          
          .shadow-sm,
          .shadow-md,
          .shadow-lg {
            box-shadow: none !important;
          }
          
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
}