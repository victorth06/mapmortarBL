import { ReactNode } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { X } from 'lucide-react';
import { Button } from '../ui/button';

interface DetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function DetailPanel({ isOpen, onClose, title, children }: DetailPanelProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-3xl overflow-y-auto p-0">
        <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
          <SheetHeader className="p-6 pb-4">
            <div className="flex items-start justify-between">
              <div>
                <SheetTitle className="text-[#1A1A1A]">{title}</SheetTitle>
                <SheetDescription className="text-sm text-gray-500 mt-1">
                  Detailed information and analysis for this section
                </SheetDescription>
              </div>
              <button
                onClick={onClose}
                className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </button>
            </div>
          </SheetHeader>
        </div>
        <div className="p-6">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface PanelSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function PanelSection({ title, children, className = '' }: PanelSectionProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <h3 className="text-[#1A1A1A] mb-4">{title}</h3>
      {children}
    </div>
  );
}

interface KPIBarItemProps {
  label: string;
  value: string | number;
  unit?: string;
  highlight?: 'success' | 'warning' | 'risk' | 'neutral';
}

export function KPIBar({ items }: { items: KPIBarItemProps[] }) {
  const highlightColors = {
    success: 'text-green-600',
    warning: 'text-amber-600',
    risk: 'text-red-600',
    neutral: 'text-[#1A1A1A]',
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg mb-6">
      {items.map((item, index) => (
        <div key={index} className="text-center">
          <p className="text-xs text-[#6B7280] mb-1">{item.label}</p>
          <p className={`text-xl ${item.highlight ? highlightColors[item.highlight] : 'text-[#1A1A1A]'}`} style={{ fontWeight: 700 }}>
            {item.value}{item.unit && <span className="text-base"> {item.unit}</span>}
          </p>
        </div>
      ))}
    </div>
  );
}

interface ActionButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export function ActionButtons({ actions }: { actions: ActionButtonProps[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action, index) => (
        <Button
          key={index}
          variant={action.variant === 'primary' ? 'default' : 'secondary'}
          size="sm"
          onClick={action.onClick}
          className="rounded-full"
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}
