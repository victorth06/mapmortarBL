import React from 'react';

interface InfoCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  iconColor: string;
  iconBgColor: string;
}

export default function InfoCard({ icon: Icon, label, value, iconColor, iconBgColor }: InfoCardProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
      <div className={`p-2 ${iconBgColor} rounded-lg flex-shrink-0`}>
        <Icon className={`w-4 h-4 ${iconColor}`} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-[#6B7280] mb-0.5">{label}</p>
        <p className="text-[#1A1A1A]" style={{ fontWeight: 700 }}>{value}</p>
      </div>
    </div>
  );
}
