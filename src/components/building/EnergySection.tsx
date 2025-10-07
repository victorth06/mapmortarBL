import React from 'react';
import { KPICard } from './KPICard';
import { Zap, Fuel, TrendingDown } from 'lucide-react';
import { Button } from '../ui/button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export function EnergySection() {
  const monthlyData = [
    { month: 'Jan', electricity: 185, gas: 320 },
    { month: 'Feb', electricity: 175, gas: 295 },
    { month: 'Mar', electricity: 165, gas: 250 },
    { month: 'Apr', electricity: 155, gas: 180 },
    { month: 'May', electricity: 145, gas: 120 },
    { month: 'Jun', electricity: 150, gas: 80 },
    { month: 'Jul', electricity: 160, gas: 60 },
    { month: 'Aug', electricity: 155, gas: 65 },
    { month: 'Sep', electricity: 150, gas: 95 },
    { month: 'Oct', electricity: 160, gas: 155 },
    { month: 'Nov', electricity: 170, gas: 235 },
    { month: 'Dec', electricity: 180, gas: 295 },
  ];

  const endUseData = [
    { name: 'HVAC', value: 45, color: '#3B82F6' },
    { name: 'Lighting', value: 25, color: '#22C55E' },
    { name: 'Equipment', value: 20, color: '#F59E0B' },
    { name: 'Hot Water', value: 10, color: '#EF4444' },
  ];

  return (
    <section id="energy" className="mb-8 pt-8 border-t border-gray-300">
      <div className="mb-6">
        <div className="inline-block px-4 py-2 bg-gray-100 rounded-full mb-3">
          <p className="text-sm text-gray-700">Supporting Details</p>
        </div>
        <h2 className="mb-2">Detailed Energy Analysis</h2>
        <p className="text-[#6B7280]">Technical breakdown of energy consumption patterns and reduction opportunities by fuel type and end-use</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <KPICard
          title="Electricity Use"
          value="1,950"
          subtitle="MWh per year"
          icon={Zap}
          trend={{ value: '5%', direction: 'down' }}
        />
        <KPICard
          title="Gas Use"
          value="2,145"
          subtitle="MWh per year"
          icon={Fuel}
          trend={{ value: '15%', direction: 'down' }}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="mb-4">Monthly Energy Consumption</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" label={{ value: 'MWh', angle: -90, position: 'insideLeft' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="electricity" fill="#3B82F6" name="Electricity" stackId="a" />
              <Bar dataKey="gas" fill="#F59E0B" name="Gas" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="mb-4">End-Use Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={endUseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  dataKey="value"
                >
                  {endUseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <KPICard
            title="Total Energy Intensity"
            value="125"
            subtitle="kWh/m² per year"
            icon={TrendingDown}
            trend={{ value: '18%', direction: 'down' }}
          />
          <KPICard
            title="Carbon Intensity"
            value="24.8"
            subtitle="kgCO2e/m² per year"
            badge={{ text: 'Above CRREM', color: 'warning' }}
          />
          <KPICard
            title="Annual Energy Spend"
            value="£342,500"
            subtitle="Total operating cost"
            trend={{ value: '8%', direction: 'up' }}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" className="rounded-full">
          See monthly breakdown
        </Button>
        <Button variant="outline" className="rounded-full">
          See per-unit EPC
        </Button>
      </div>
    </section>
  );
}