import React from 'react';

interface KPICardProps {
  title: string;
  icon: React.ElementType;
  iconColor: string;
  iconBgColor: string;
  children: React.ReactNode;
}

export default function KPICard({ title, icon: Icon, iconColor, iconBgColor, children }: KPICardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col h-full border-2 border-transparent hover:border-[#F97316] hover:shadow-lg transition-all">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 ${iconBgColor} rounded-lg`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        <h3 className="font-semibold text-[#1A1A1A]">{title}</h3>
      </div>
      {children}
    </div>
  );
}
