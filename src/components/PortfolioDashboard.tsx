import React from 'react';
import { Building2, MapPin, PoundSterling, Zap, CheckCircle, Plus, Sparkles, ArrowRight, TrendingUp, AlertTriangle, Shield, Target, Clock, Users, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface PortfolioDashboardProps {
  onViewBuilding: (id: string) => void;
}

interface InfoCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  iconColor: string;
  iconBgColor: string;
}

function InfoCard({ icon: Icon, label, value, iconColor, iconBgColor }: InfoCardProps) {
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

interface KPICardProps {
  title: string;
  icon: React.ElementType;
  iconColor: string;
  iconBgColor: string;
  children: React.ReactNode;
}

function KPICard({ title, icon: Icon, iconColor, iconBgColor, children }: KPICardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col h-full">
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


export default function PortfolioDashboard({ onViewBuilding }: PortfolioDashboardProps) {
  return (
    <main className="max-w-7xl mx-auto px-6 py-8 bg-[#FAFAFA]">
      {/* 1️⃣ Portfolio Status Overview */}
      <div className="mb-8 bg-gray-50 rounded-lg border border-gray-200 p-6">
        {/* Header with Actions */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="mb-1 text-[#F97316]">Portfolio Information</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-[#6B7280] hover:text-[#1A1A1A]"
            >
              <Sparkles className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 border-orange-200 bg-orange-50 hover:bg-orange-100 text-[#F97316]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Ask
            </Button>
          </div>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
          <InfoCard
            icon={Building2}
            label="Total Buildings"
            value="12"
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          <InfoCard
            icon={MapPin}
            label="Total GIA"
            value="245,670 m²"
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
          <InfoCard
            icon={PoundSterling}
            label="Total Rent Roll"
            value="£8.2M"
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
          <InfoCard
            icon={Zap}
            label="Avg EPC Rating"
            value="C (65)"
            iconColor="text-amber-600"
            iconBgColor="bg-amber-100"
          />
          <InfoCard
            icon={CheckCircle}
            label="Data Confidence"
            value="89%"
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          />
        </div>

        {/* Notes and Confidence Score */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-3 border-t border-gray-200">
          <p className="text-xs text-[#6B7280]">
            Multi-let office portfolio · Mixed EPC ratings (B to E) · Built 1992-2015, various refurbishments
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6B7280]">Confidence:</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
              89%
            </Badge>
          </div>
        </div>

        {/* Full Width CTA Button */}
        <div className="mt-6">
          <Button className="w-full bg-[#F97316] hover:bg-orange-600 text-white rounded-full px-6">
            <Plus className="w-4 h-4 mr-2" />
            Add Property
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
          <span className="text-sm text-[#6B7280] mr-2">Filter by:</span>
          <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer">
            All Locations
          </Badge>
          <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer">
            Office
          </Badge>
          <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer">
            Active
          </Badge>
          <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer">
            EPC C+
          </Badge>
        </div>
      </div>

      {/* 2️⃣ Opportunities Summary */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-6">Portfolio Opportunities</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <KPICard
            title="CAPEX & Payback"
            icon={TrendingUp}
            iconColor="text-green-600"
            iconBgColor="bg-green-100"
          >
            <div className="space-y-4">
              <div>
                <p className="text-3xl font-bold text-[#1A1A1A]">£12.4M</p>
                <p className="text-sm text-[#6B7280]">CAPEX required</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-[#1A1A1A]">4.2 years</p>
                <p className="text-sm text-[#6B7280]">Average payback</p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#6B7280]">Energy reduction</span>
                  <span className="text-sm font-medium text-[#1A1A1A]">34%</span>
                </div>
                <Progress value={34} className="h-2" />
              </div>
            </div>
          </KPICard>

          <KPICard
            title="Carbon & Energy Impact"
            icon={Target}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          >
            <div className="space-y-4">
              <div>
                <p className="text-3xl font-bold text-[#1A1A1A]">2,870</p>
                <p className="text-sm text-[#6B7280]">tCO₂e reduction</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-[#1A1A1A]">34%</p>
                <p className="text-sm text-[#6B7280]">Energy reduction</p>
              </div>
              <div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  Aligned until 2035
                </Badge>
                <p className="text-xs text-[#6B7280] mt-1">CRREM alignment</p>
              </div>
            </div>
          </KPICard>

          <KPICard
            title="Portfolio Opportunity Summary"
            icon={BarChart3}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          >
            <div className="space-y-4">
              <div>
                <p className="text-3xl font-bold text-[#1A1A1A]">£6.2M</p>
                <p className="text-sm text-[#6B7280]">Rent protected after retrofit</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-[#1A1A1A]">£5.6M</p>
                <p className="text-sm text-[#6B7280]">Rent at risk by 2030</p>
              </div>
              <Button
                variant="outline"
                className="w-full border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-700"
              >
                Explore Retrofit Potential →
              </Button>
            </div>
          </KPICard>
        </div>
      </div>

      {/* 3️⃣ Performance & Risk Overview */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-6">Performance & Risk Analysis</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <KPICard
            title="Energy & Carbon Performance"
            icon={Zap}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          >
            <div className="space-y-4">
              <div>
                <p className="text-3xl font-bold text-[#1A1A1A]">67%</p>
                <p className="text-sm text-[#6B7280]">below benchmark</p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#6B7280]">Progress to 100%</span>
                  <span className="text-sm font-medium text-[#1A1A1A]">67%</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
              <div>
                <p className="text-lg font-semibold text-[#1A1A1A]">121 kWh/m²</p>
                <p className="text-sm text-[#6B7280]">Average intensity</p>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <p className="text-xs text-[#6B7280]">Top 3 highest intensity buildings</p>
                <p className="text-sm text-[#1A1A1A]">135 Bishopsgate, 25 Old Broad St, 40 Leadenhall</p>
              </div>
            </div>
          </KPICard>

          <KPICard
            title="Transition Risk"
            icon={AlertTriangle}
            iconColor="text-amber-600"
            iconBgColor="bg-amber-100"
          >
            <div className="space-y-4">
              <div>
                <p className="text-3xl font-bold text-[#1A1A1A]">42%</p>
                <p className="text-sm text-[#6B7280]">below EPC C (MEES 2027)</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-[#1A1A1A]">33%</p>
                <p className="text-sm text-[#6B7280]">stranded before 2030</p>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs text-[#6B7280] mb-2">
                  <span>Today</span>
                  <span>2027</span>
                  <span>2030</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '33%' }}></div>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <p className="text-xs text-[#6B7280]">Top 3 at risk</p>
                <p className="text-sm text-[#1A1A1A]">135 Bishopsgate, 25 Old Broad St, 40 Leadenhall</p>
              </div>
            </div>
          </KPICard>

          <KPICard
            title="Physical Risk"
            icon={Shield}
            iconColor="text-teal-600"
            iconBgColor="bg-teal-100"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-[#1A1A1A]">3</p>
                  <p className="text-sm text-[#6B7280]">Flood risk</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1A1A1A]">2</p>
                  <p className="text-sm text-[#6B7280]">Overheating risk</p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#6B7280]">Risk distribution</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Low</span>
                    <span className="text-[#1A1A1A]">7 buildings</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Medium</span>
                    <span className="text-[#1A1A1A]">3 buildings</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>High</span>
                    <span className="text-[#1A1A1A]">2 buildings</span>
                  </div>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <Button variant="ghost" size="sm" className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 p-0 h-auto">
                  View assumptions →
                </Button>
              </div>
            </div>
          </KPICard>
        </div>
      </div>

      {/* 4️⃣ Building Priority Table */}
      <div className="mb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#6B7280]" />
            <h2 className="text-2xl font-semibold text-[#1A1A1A]">
              Building Priority Table
            </h2>
          </div>
          <Button
            variant="outline"
            className="text-[#6B7280] hover:text-[#1A1A1A]"
          >
            Export Data
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-hidden border border-gray-200 rounded-xl bg-white shadow-sm">
          <table className="w-full border-collapse text-sm">
            {/* Table Head */}
            <thead className="bg-gray-50 text-left text-[#1A1A1A]">
              <tr>
                <th className="px-6 py-3 font-medium">Building</th>
                <th className="px-4 py-3 font-medium text-center">EPC</th>
                <th className="px-4 py-3 font-medium text-center">GIA</th>
                <th className="px-4 py-3 font-medium text-center">Pathway</th>
                <th className="px-4 py-3 font-medium text-center">Payback</th>
                <th className="px-4 py-3 font-medium text-center">Rent at Risk</th>
                <th className="px-4 py-3 font-medium text-center">Carbon</th>
                <th className="px-4 py-3 font-medium text-center">Priority</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">
              {[
                {
                  name: "135 Bishopsgate",
                  location: "London EC2M 3YD",
                  epc: "D",
                  gia: "43,390 sqm",
                  pathway: "EPC C 2027",
                  payback: "8y",
                  rentAtRisk: "£1.2M",
                  carbon: "-36%",
                  priority: "high",
                },
                {
                  name: "Broadgate Tower",
                  location: "London EC2A 2EW",
                  epc: "C",
                  gia: "52,000 sqm",
                  pathway: "Net Zero 2050",
                  payback: "11y",
                  rentAtRisk: "£950k",
                  carbon: "-58%",
                  priority: "medium",
                },
                {
                  name: "Canary Wharf 3",
                  location: "London E14 5AB",
                  epc: "C",
                  gia: "25,000 sqm",
                  pathway: "Net Zero 2050",
                  payback: "13y",
                  rentAtRisk: "£500k",
                  carbon: "-62%",
                  priority: "medium",
                },
                {
                  name: "Victoria House",
                  location: "London SW1E 5NA",
                  epc: "D",
                  gia: "8,000 sqm",
                  pathway: "EPC C 2027",
                  payback: "7y",
                  rentAtRisk: "£720k",
                  carbon: "-40%",
                  priority: "high",
                },
                {
                  name: "Paddington Central",
                  location: "London W2 1AS",
                  epc: "B",
                  gia: "12,000 sqm",
                  pathway: "BAU",
                  payback: "N/A",
                  rentAtRisk: "£0",
                  carbon: "-5%",
                  priority: "low",
                },
              ].map((b) => (
                <tr
                  key={b.name}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => onViewBuilding(b.name)}
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-[#1A1A1A]">{b.name}</div>
                    <div className="text-[#6B7280] text-xs">{b.location}</div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span
                      className={`inline-flex items-center justify-center px-2 py-1 text-xs font-semibold rounded-full ${
                        b.epc === "A"
                          ? "bg-green-100 text-green-700"
                          : b.epc === "B"
                          ? "bg-emerald-100 text-emerald-700"
                          : b.epc === "C"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {b.epc}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center text-[#1A1A1A]">{b.gia}</td>
                  <td className="px-4 py-4 text-center text-[#6B7280]">
                    {b.pathway}
                  </td>
                  <td className="px-4 py-4 text-center text-[#1A1A1A]">{b.payback}</td>
                  <td className="px-4 py-4 text-center font-medium text-red-500">
                    {b.rentAtRisk}
                  </td>
                  <td className="px-4 py-4 text-center font-medium text-green-600">
                    {b.carbon}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span
                      className={`inline-flex items-center justify-center px-3 py-1 text-xs font-semibold rounded-full ${
                        b.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : b.priority === "medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {b.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-[#6B7280] mt-2">
          Ranked by risk and opportunity
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <div className="text-center">
          <p className="text-lg text-[#1A1A1A] mb-2">
            <strong>£4.37M rental income at risk by 2030</strong> — Retrofitting 4 buildings could protect £4.37M and cut 201% carbon emissions annually.
          </p>
          <p className="text-sm text-[#6B7280]">
            Focus on high-risk buildings (135 Bishopsgate, Victoria House) with strong retrofit potential for maximum impact.
          </p>
        </div>
      </div>
    </main>
  );
}