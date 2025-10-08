import React, { useState } from 'react';
import { X, Download, RotateCcw, Info, TrendingUp, TrendingDown, Minus, Calculator, BarChart3, PieChart, Target, AlertTriangle } from 'lucide-react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '../ui/drawer';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface FinancePanelProps {
  open: boolean;
  onClose: () => void;
  scenarioName?: string;
}

// KPI Card Component
function KPICard({ label, value, trend, color = "gray", icon: Icon }: {
  label: string;
  value: string;
  trend?: "up" | "down" | "neutral";
  color?: "green" | "red" | "amber" | "gray";
  icon?: React.ComponentType<{ className?: string }>;
}) {
  const colorClasses = {
    green: "text-green-600",
    red: "text-red-600", 
    amber: "text-amber-600",
    gray: "text-gray-700"
  };

  const trendIcons = {
    up: <TrendingUp className="w-3 h-3 text-green-600" />,
    down: <TrendingDown className="w-3 h-3 text-red-600" />,
    neutral: <Minus className="w-3 h-3 text-gray-500" />
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        {Icon && <Icon className="w-4 h-4 text-gray-500" />}
        <p className="text-sm text-gray-500">{label}</p>
        {trend && trendIcons[trend]}
      </div>
      <p className={`text-xl font-bold ${colorClasses[color]}`}>{value}</p>
    </div>
  );
}

// Financial Input Group Component
interface FinancialInputGroupProps {
  label: string;
  tooltip?: string;
  children?: React.ReactNode;
}

function FinancialInputGroup({ label, tooltip, children }: FinancialInputGroupProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium text-gray-700">{label}</Label>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-3 h-3 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      {children}
    </div>
  );
}

// Scenario Comparison Row Component
function ComparisonRow({ metric, epcValue, netZeroValue, betterValue }: {
  metric: string;
  epcValue: string;
  netZeroValue: string;
  betterValue: "epc" | "netzero" | "neutral";
}) {
  const getValueColor = (value: string, isBetter: boolean) => {
    if (isBetter) return "text-green-600 font-semibold";
    return "text-gray-700";
  };

  return (
    <div className="grid grid-cols-3 gap-4 py-2 border-b border-gray-100 last:border-b-0">
      <div className="text-sm text-gray-600">{metric}</div>
      <div className={`text-sm ${getValueColor(epcValue, betterValue === "epc")}`}>
        {epcValue}
      </div>
      <div className={`text-sm ${getValueColor(netZeroValue, betterValue === "netzero")}`}>
        {netZeroValue}
      </div>
    </div>
  );
}

export function FinancePanel({ open, onClose, scenarioName = "Net Zero 2050" }: FinancePanelProps) {
  const [discountRate, setDiscountRate] = useState([6]);
  const [studyPeriod, setStudyPeriod] = useState("25");
  const [implementationPhasing, setImplementationPhasing] = useState("3-year");

  const handleRecalculate = () => {
    // Placeholder for recalculation logic
    console.log("Recalculating financial metrics...");
  };

  const handleResetDefaults = () => {
    setDiscountRate([6]);
    setStudyPeriod("25");
    setImplementationPhasing("3-year");
  };

  const handleExportExcel = () => {
    // Placeholder for export logic
    console.log("Exporting to Excel...");
  };

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="w-full md:w-[60vw] max-w-[90vw] bg-white border-l border-gray-200 overflow-y-auto">
        <DrawerHeader className="sticky top-0 bg-white z-10 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <DrawerTitle className="text-lg font-semibold text-gray-800">
                Financial Analysis — {scenarioName}
              </DrawerTitle>
              <DrawerDescription className="text-sm text-gray-500 mt-1">
                Adjust financial assumptions and explore scenario performance
              </DrawerDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleExportExcel}>
                <Download className="w-4 h-4 mr-2" />
                Export to Excel
              </Button>
              <Button variant="outline" size="sm" onClick={handleResetDefaults}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset to Defaults
              </Button>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </DrawerHeader>

        <div className="p-6 space-y-8">
          {/* 1️⃣ Section: Key Financial Summary (Top Sticky) */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Financial Summary</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <KPICard 
                label="Total CAPEX" 
                value="£6.2M" 
                icon={Calculator}
                color="gray"
              />
              <KPICard 
                label="Annual Savings" 
                value="£142k/year" 
                trend="up"
                color="green"
                icon={TrendingUp}
              />
              <KPICard 
                label="Simple Payback" 
                value="11 years" 
                color="gray"
                icon={Target}
              />
              <KPICard 
                label="ROI (25y)" 
                value="+12.3%" 
                trend="up"
                color="green"
                icon={TrendingUp}
              />
              <KPICard 
                label="NPV @6%" 
                value="–£0.3M" 
                trend="down"
                color="red"
                icon={TrendingDown}
              />
              <KPICard 
                label="Carbon Payback" 
                value="12 years" 
                color="gray"
                icon={Target}
              />
            </div>

            {/* Insight Line */}
            <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-3">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Financial Insight:</span> 
                At 6% discount rate and £142k annual savings, this scenario achieves breakeven by 2038 and positive ROI in year 14.
              </p>
            </div>
          </section>

          {/* 2️⃣ Section: Adjustable Inputs */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Adjustable Inputs</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Rental & Value */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700 border-b border-gray-200 pb-2">Rental & Value</h4>
                <FinancialInputGroup 
                  label="Baseline Rent (£/m²)" 
                  tooltip="Current market rent per square meter"
                >
                  <Input defaultValue="45" className="text-sm" />
                </FinancialInputGroup>
                <FinancialInputGroup 
                  label="Rent Growth (%/yr)" 
                  tooltip="Annual rent escalation rate"
                >
                  <Input defaultValue="2.5" className="text-sm" />
                </FinancialInputGroup>
                <FinancialInputGroup 
                  label="% Rent at Risk" 
                  tooltip="Percentage of rent at risk due to non-compliance"
                >
                  <Input defaultValue="15" className="text-sm" />
                </FinancialInputGroup>
                <FinancialInputGroup 
                  label="Green Value Uplift (%)" 
                  tooltip="Property value increase from green certification"
                >
                  <Input defaultValue="3" className="text-sm" />
                </FinancialInputGroup>
              </div>

              {/* Operating & Savings */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700 border-b border-gray-200 pb-2">Operating & Savings</h4>
                <FinancialInputGroup 
                  label="Baseline OPEX (£/m²)" 
                  tooltip="Current operational expenditure per square meter"
                >
                  <Input defaultValue="120" className="text-sm" />
                </FinancialInputGroup>
                <FinancialInputGroup 
                  label="Energy Cost Escalation (%/yr)" 
                  tooltip="Annual energy cost inflation rate"
                >
                  <Input defaultValue="4.2" className="text-sm" />
                </FinancialInputGroup>
                <FinancialInputGroup 
                  label="Annual Energy Savings (£)" 
                  tooltip="Annual energy cost savings from retrofit"
                >
                  <Input defaultValue="142000" className="text-sm" />
                </FinancialInputGroup>
                <FinancialInputGroup 
                  label="Carbon Price (£/tCO₂)" 
                  tooltip="Carbon pricing per tonne of CO₂"
                >
                  <Input defaultValue="85" className="text-sm" />
                </FinancialInputGroup>
              </div>

              {/* Capital & Discounting */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700 border-b border-gray-200 pb-2">Capital & Discounting</h4>
                <FinancialInputGroup 
                  label="Total CAPEX (£)" 
                  tooltip="Total capital expenditure for retrofit"
                >
                  <Input defaultValue="6200000" className="text-sm" />
                </FinancialInputGroup>
                <FinancialInputGroup 
                  label="Discount Rate (%)" 
                  tooltip="Discount rate for NPV calculations"
                >
                  <div className="space-y-2">
                    <Slider
                      value={discountRate}
                      onValueChange={setDiscountRate}
                      max={10}
                      min={0}
                      step={0.5}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-500 text-center">{discountRate[0]}%</div>
                  </div>
                </FinancialInputGroup>
                <FinancialInputGroup 
                  label="Study Period" 
                  tooltip="Analysis period for financial calculations"
                >
                  <Select value={studyPeriod} onValueChange={setStudyPeriod}>
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 years</SelectItem>
                      <SelectItem value="20">20 years</SelectItem>
                      <SelectItem value="25">25 years</SelectItem>
                    </SelectContent>
                  </Select>
                </FinancialInputGroup>
                <FinancialInputGroup 
                  label="Implementation Phasing" 
                  tooltip="How CAPEX is spread over time"
                >
                  <Select value={implementationPhasing} onValueChange={setImplementationPhasing}>
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single Year</SelectItem>
                      <SelectItem value="3-year">3-Year Phased</SelectItem>
                      <SelectItem value="continuous">Continuous</SelectItem>
                    </SelectContent>
                  </Select>
                </FinancialInputGroup>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button onClick={handleRecalculate} className="bg-[#F97316] text-white hover:bg-orange-600">
                <Calculator className="w-4 h-4 mr-2" />
                Recalculate
              </Button>
            </div>
          </section>

          {/* 3️⃣ Section: OPEX Breakdown */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">OPEX Breakdown</h3>
            <p className="text-sm text-gray-600 mb-4">
              Show how energy & carbon reductions lower operational costs
            </p>
            
            <div className="h-[220px] bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm">
              <div className="text-center">
                <PieChart className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                OPEX Breakdown Chart Placeholder
                <p className="text-xs mt-1">Energy / Maintenance / Carbon / Other</p>
              </div>
            </div>

            <div className="mt-4 bg-green-50 border-l-4 border-green-400 rounded-lg p-3">
              <p className="text-sm text-gray-700">
                <span className="font-medium">OPEX Insight:</span> 
                Energy savings reduce total OpEx by 22%, improving NOI by £120k per year.
              </p>
            </div>
          </section>

          {/* 4️⃣ Section: Financial Charts */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Financial Charts</h3>
            
            {/* A. Cashflow Analysis Over Time */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Cashflow Analysis Over Time</h4>
              <div className="h-[280px] bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm">
                <div className="text-center">
                  <BarChart3 className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  Cashflow Chart Placeholder
                  <p className="text-xs mt-1">CAPEX vs Savings vs Cumulative Cashflow</p>
                </div>
              </div>
              <div className="mt-3 bg-blue-50 border-l-4 border-blue-400 rounded-lg p-3">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Break-even Analysis:</span> 
                  Break-even achieved in 2038 under current assumptions.
                </p>
              </div>
            </div>

            {/* B. CAPEX vs ROI Prioritisation */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">CAPEX vs ROI Prioritisation</h4>
              <div className="h-[260px] bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm">
                <div className="text-center">
                  <Target className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  CAPEX vs ROI Chart Placeholder
                  <p className="text-xs mt-1">X=CAPEX (£k), Y=ROI (%), bubble size=CO₂ saved</p>
                </div>
              </div>
              <div className="mt-3 bg-amber-50 border-l-4 border-amber-400 rounded-lg p-3">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Quick Wins:</span> 
                  Quick Wins pay back in &lt;3 years
                </p>
              </div>
            </div>
          </section>

          {/* 5️⃣ Section: Scenario Comparison */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Scenario Comparison</h3>
            <p className="text-sm text-gray-600 mb-4">
              Compare EPC C vs Net Zero 2050 financial outcomes
            </p>
            
            <div className="flex gap-2 mb-4">
              <Button variant="outline" size="sm" className="rounded-full">EPC C</Button>
              <Button size="sm" className="bg-[#F97316] text-white rounded-full">Net Zero 2050</Button>
            </div>

            <div className="h-[180px] bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm">
              <div className="text-center">
                <BarChart3 className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                Scenario Comparison Table Placeholder
                <p className="text-xs mt-1">EPC C vs Net Zero 2050 metrics</p>
              </div>
            </div>

            <div className="mt-4 bg-gray-50 border-l-4 border-gray-400 rounded-lg p-3">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Comparison Insight:</span> 
                Net Zero 2050 achieves longer-term alignment and higher carbon savings but requires higher upfront CAPEX and longer payback.
              </p>
            </div>
          </section>

          {/* 6️⃣ Section: Sensitivity Insights */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Sensitivity Insights</h3>
            <p className="text-sm text-gray-600 mb-4">
              Top 3 impact drivers (auto-calculated)
            </p>
            
            <div className="h-[150px] bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm">
              <div className="text-center">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                Sensitivity Insights Placeholder
                <p className="text-xs mt-1">Top 3 impact drivers</p>
              </div>
            </div>
          </section>
        </div>

        {/* Persistent Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-between items-center">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleResetDefaults}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset to Defaults
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportExcel}>
              <Download className="w-4 h-4 mr-2" />
              Export to Excel
            </Button>
          </div>
          <Button size="sm" className="bg-[#F97316] text-white hover:bg-orange-600">
            Apply Changes
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
