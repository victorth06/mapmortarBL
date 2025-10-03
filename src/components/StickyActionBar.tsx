import { Button } from './ui/button';
import { Download, Share2, ArrowRight } from 'lucide-react';

export function StickyActionBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-300 shadow-lg z-40 print:hidden">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <p className="text-sm text-[#6B7280]">
              <strong>Action required:</strong> £1.2M rental income at risk by 2027
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button 
              className="rounded-full bg-[#F97316] text-white hover:bg-orange-600"
              onClick={() => document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Retrofit Options
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              className="rounded-full"
              onClick={() => window.print()}
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" className="rounded-full">
              <Share2 className="w-4 h-4 mr-2" />
              Share Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
