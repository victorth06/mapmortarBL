import React, { useState, useEffect } from 'react';

interface StickyNavProps {
  activeSection: string;
}

export function StickyNav({ activeSection }: StickyNavProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const sections = [
    { id: 'overview', label: 'Executive Overview' },
    { id: 'opportunities', label: 'Opportunities' },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 bg-white border-b border-gray-200 transition-shadow ${
        isSticky ? 'shadow-md' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-6 overflow-x-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full transition-colors ${
                activeSection === section.id
                  ? 'bg-[#F97316] text-white'
                  : 'text-[#6B7280] hover:text-[#1A1A1A] hover:bg-gray-100'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}