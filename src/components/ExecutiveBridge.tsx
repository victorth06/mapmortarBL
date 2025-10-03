import { AlertTriangle, TrendingUp, ArrowRight, Download, Share2 } from 'lucide-react';
import { Button } from './ui/button';

export function ExecutiveBridge() {
  return (
    <section className="mb-12">
      {/* Compact Bridge Card with Gradient */}
      <div className="bg-gradient-to-r from-red-50 via-gray-50 to-green-50 rounded-lg border-2 border-gray-200 shadow-md overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-6 pb-4 bg-white/80 backdrop-blur-sm">
          <h3 className="text-[#1A1A1A] mb-1">📊 Executive Risk & Opportunity Summary</h3>
          <p className="text-sm text-[#6B7280]">
            Compare exposure if no action is taken with potential gains from Net Zero retrofit
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
          {/* LEFT: RISKS (Do Nothing) */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h4 className="text-red-600">What's at Stake</h4>
            </div>
            
            <div className="space-y-3">
              {/* Rent at Risk 2027 */}
              <div className="bg-white rounded-lg p-5 border-l-4 border-red-500 shadow-sm">
                <p className="text-xs text-[#6B7280] mb-1">Rental income at risk (2027)</p>
                <p className="text-[36px] text-red-600 leading-none" style={{ fontWeight: 700 }}>£1.2M</p>
              </div>
              
              {/* Rent at Risk 2030 */}
              <div className="bg-white rounded-lg p-5 border-l-4 border-red-500 shadow-sm">
                <p className="text-xs text-[#6B7280] mb-1">Rental income at risk (2030)</p>
                <p className="text-[36px] text-red-600 leading-none" style={{ fontWeight: 700 }}>£2.5M</p>
              </div>
              
              {/* Asset Stranded Year */}
              <div className="bg-white rounded-lg p-5 border-l-4 border-red-500 shadow-sm">
                <p className="text-xs text-[#6B7280] mb-1">Asset stranded by</p>
                <p className="text-[36px] text-red-600 leading-none" style={{ fontWeight: 700 }}>2029</p>
                <p className="text-xs text-[#6B7280] mt-1">CRREM pathway misalignment</p>
              </div>
            </div>
          </div>

          {/* RIGHT: OPPORTUNITIES (Net Zero Retrofit) */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <h4 className="text-green-600">Retrofit Potential</h4>
            </div>
            
            <div className="space-y-3">
              {/* Rent Protected */}
              <div className="bg-white rounded-lg p-5 border-l-4 border-green-500 shadow-sm">
                <p className="text-xs text-[#6B7280] mb-1">Rent protected</p>
                <p className="text-[36px] text-green-600 leading-none" style={{ fontWeight: 700 }}>£1.3M</p>
                <p className="text-xs text-[#6B7280] mt-1">Inc. 8% ESG rental uplift</p>
              </div>
              
              {/* Annual Savings */}
              <div className="bg-white rounded-lg p-5 border-l-4 border-green-500 shadow-sm">
                <p className="text-xs text-[#6B7280] mb-1">Annual energy savings</p>
                <p className="text-[36px] text-green-600 leading-none" style={{ fontWeight: 700 }}>£142k</p>
                <p className="text-xs text-[#6B7280] mt-1">Operational cost reduction</p>
              </div>
              
              {/* Energy & Carbon Reductions */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-4 border-l-4 border-green-500 shadow-sm">
                  <p className="text-xs text-[#6B7280] mb-1">Energy reduction</p>
                  <p className="text-[28px] text-green-600 leading-none" style={{ fontWeight: 700 }}>58%</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 border-l-4 border-green-500 shadow-sm">
                  <p className="text-xs text-[#6B7280] mb-1">Carbon reduction</p>
                  <p className="text-[28px] text-green-600 leading-none" style={{ fontWeight: 700 }}>95%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="px-8 pb-6 pt-2 bg-white/80 backdrop-blur-sm border-t border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-[#6B7280]">
              <span style={{ fontWeight: 600 }}>Decision point:</span> Explore retrofit pathways to protect asset value and achieve compliance
            </p>
            <div className="flex flex-wrap gap-3">
              <Button 
                size="lg"
                className="rounded-full bg-[#F97316] text-white hover:bg-orange-600 px-8"
                onClick={() => document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See Retrofit Options
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
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
