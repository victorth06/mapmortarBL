import { LucideIcon } from 'lucide-react';
import { Button } from './ui/button';

interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  intensity?: {
    value: string;
    label: string;
  };
  fuelSplit?: {
    electricity: string;
    gas: string;
  };
  performanceLabel?: {
    text: string;
    color: 'success' | 'warning' | 'risk';
  };
  icon?: LucideIcon;
  badge?: {
    text: string;
    color: 'success' | 'warning' | 'risk' | 'neutral';
  };
  trend?: {
    value: string;
    direction: 'up' | 'down';
  };
  benchmarks?: string[];
  opportunity?: string;
  cta?: {
    text: string;
    onClick?: () => void;
  };
  variant?: 'default' | 'physical-risk';
}

export function KPICard({ 
  title, 
  value, 
  unit, 
  subtitle, 
  intensity, 
  fuelSplit, 
  performanceLabel, 
  icon: Icon, 
  badge, 
  trend, 
  benchmarks, 
  opportunity, 
  cta,
  variant = 'default'
}: KPICardProps) {
  const isPhysicalRisk = variant === 'physical-risk';

  const badgeColors = {
    success: 'bg-[#22C55E] text-white',
    warning: 'bg-[#F59E0B] text-white',
    risk: 'bg-[#EF4444] text-white',
    neutral: 'bg-[#3B82F6] text-white',
  };

  const performanceLabelColors = {
    success: 'bg-green-100 text-green-800 border-green-300',
    warning: 'bg-amber-100 text-amber-800 border-amber-300',
    risk: 'bg-red-100 text-red-800 border-red-300',
  };

  const handleCardClick = () => {
    if (cta?.onClick) {
      cta.onClick();
    }
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-all flex flex-col ${
        isPhysicalRisk ? 'opacity-90' : ''
      } ${cta?.onClick ? 'cursor-pointer hover:border-[#F97316] border-2 border-transparent' : ''}`}
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-[#6B7280]">{title}</p>
        {Icon && (
          <div className={`p-2 ${isPhysicalRisk ? 'bg-gray-100' : 'bg-orange-50'} rounded-lg`}>
            <Icon className={`w-5 h-5 ${isPhysicalRisk ? 'text-gray-500' : 'text-[#F97316]'}`} />
          </div>
        )}
      </div>
      
      {/* Main Value - Fixed height for traffic light alignment, hidden for physical risk variant */}
      {!isPhysicalRisk && (
        <div className="mb-3 min-h-[70px] flex flex-col justify-start">
          <div className="text-[32px] leading-none" style={{ fontWeight: 700 }}>
            {value}{unit && <span className="text-[24px]"> {unit}</span>}
          </div>
          {intensity && (
            <p className="text-sm text-[#6B7280] mt-1">{intensity.value} {intensity.label}</p>
          )}
        </div>
      )}

      {/* Traffic Light Label - Consistently positioned at same vertical level across all cards */}
      {performanceLabel && (
        <div className={`mb-3 px-3 py-2 rounded-lg border ${performanceLabelColors[performanceLabel.color]} inline-block`}>
          <p className="text-sm" style={{ fontWeight: 600 }}>
            {performanceLabel.color === 'risk' && '🔴 '}
            {performanceLabel.color === 'warning' && '🟡 '}
            {performanceLabel.color === 'success' && '🟢 '}
            {performanceLabel.text}
          </p>
        </div>
      )}
      
      {/* Supporting Metrics - Below traffic light */}
      {fuelSplit && (
        <div className="mb-3 p-2 bg-gray-50 rounded-lg">
          <p className="text-xs text-[#6B7280]">
            ⚡ <span style={{ fontWeight: 600 }}>{fuelSplit.electricity}% electricity</span> | 🔥 <span style={{ fontWeight: 600 }}>{fuelSplit.gas}% gas</span>
          </p>
        </div>
      )}
      
      {subtitle && !unit && <p className="text-sm text-[#6B7280]">{subtitle}</p>}
      
      {benchmarks && benchmarks.length > 0 && (
        <div className="mt-2 space-y-1">
          {benchmarks.map((benchmark, index) => (
            <p key={index} className="text-xs text-[#6B7280]">{benchmark}</p>
          ))}
        </div>
      )}
      
      {trend && !benchmarks && (
        <div className="mt-2 flex items-center gap-1 text-sm">
          <span className={trend.direction === 'up' ? 'text-[#22C55E]' : 'text-[#EF4444]'}>
            {trend.direction === 'up' ? '↑' : '↓'} {trend.value}
          </span>
          <span className="text-[#6B7280]">vs benchmark</span>
        </div>
      )}

      {opportunity && (
        <p className="mt-3 text-sm text-[#9CA3AF] italic">{opportunity}</p>
      )}

      {cta && (
        <div className="mt-auto pt-4 flex justify-end">
          <Button 
            variant="ghost" 
            size="sm"
            className="rounded-full text-sm text-[#F97316] hover:text-[#F97316] hover:bg-orange-50"
            onClick={(e) => {
              e.stopPropagation();
              cta.onClick?.();
            }}
          >
            {cta.text} →
          </Button>
        </div>
      )}
    </div>
  );
}
