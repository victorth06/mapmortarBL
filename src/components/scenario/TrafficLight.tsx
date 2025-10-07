import React from 'react';

/**
 * TrafficLight Component
 * 
 * Standardized risk indicator used across all dashboard cards.
 * Ensures consistent visual alignment and risk communication.
 * 
 * Risk Levels:
 * - HIGH (Red 🔴): Immediate action required
 * - MEDIUM (Amber 🟡): Action needed within planning horizon
 * - LOW (Green 🟢): Compliant / Low risk
 * 
 * Card-Specific Logic:
 * 
 * MEES Compliance:
 * - Red: Any units below EPC C (immediate 2027 risk)
 * - Amber: All units ≥C but some below B (2030 risk)
 * - Green: All units meet or exceed EPC B
 * 
 * CRREM Stranding:
 * - Red: Stranded ≤5 years from today
 * - Amber: Stranded 6-15 years away
 * - Green: Stranded >15 years or aligned beyond 2050
 * 
 * Energy/Carbon/Spend KPIs:
 * - Use performanceLabel prop with 'risk'/'warning'/'success' color
 * - Positioned consistently below main metric value
 */

interface TrafficLightProps {
  level: 'high' | 'medium' | 'low';
  text: string;
  className?: string;
}

export function TrafficLight({ level, text, className = '' }: TrafficLightProps) {
  const colors = {
    high: 'bg-red-100 text-red-800 border-red-300',
    medium: 'bg-amber-100 text-amber-800 border-amber-300',
    low: 'bg-green-100 text-green-800 border-green-300',
  };

  const icons = {
    high: '🔴',
    medium: '🟡',
    low: '🟢',
  };

  return (
    <div className={`px-3 py-2 rounded-lg border ${colors[level]} inline-block ${className}`}>
      <p className="text-sm" style={{ fontWeight: 600 }}>
        {icons[level]} {text}
      </p>
    </div>
  );
}