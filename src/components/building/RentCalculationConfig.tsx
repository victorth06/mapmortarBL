import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Settings, Info } from 'lucide-react';

interface RentCalculationConfigProps {
  epcAUpliftPercent: number;
  epcBUpliftPercent: number;
  onUpdate: (params: { epcAUpliftPercent: number; epcBUpliftPercent: number }) => void;
}

export function RentCalculationConfig({ 
  epcAUpliftPercent, 
  epcBUpliftPercent, 
  onUpdate 
}: RentCalculationConfigProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempEpcA, setTempEpcA] = useState(epcAUpliftPercent);
  const [tempEpcB, setTempEpcB] = useState(epcBUpliftPercent);

  const handleSave = () => {
    onUpdate({
      epcAUpliftPercent: tempEpcA,
      epcBUpliftPercent: tempEpcB,
    });
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempEpcA(epcAUpliftPercent);
    setTempEpcB(epcBUpliftPercent);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <Settings className="w-4 h-4" />
        Rent Uplift Settings
      </Button>

      {isOpen && (
        <Card className="absolute top-10 right-0 z-50 w-80 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Rent Uplift Parameters
            </CardTitle>
            <CardDescription>
              Configure rental uplift percentages for high-performing EPC ratings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="epc-a-uplift">EPC A Uplift (%)</Label>
              <Input
                id="epc-a-uplift"
                type="number"
                min="0"
                max="20"
                step="0.5"
                value={tempEpcA}
                onChange={(e) => setTempEpcA(parseFloat(e.target.value) || 0)}
              />
              <p className="text-xs text-gray-600">
                Premium rent for units achieving EPC A rating
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="epc-b-uplift">EPC B Uplift (%)</Label>
              <Input
                id="epc-b-uplift"
                type="number"
                min="0"
                max="15"
                step="0.5"
                value={tempEpcB}
                onChange={(e) => setTempEpcB(parseFloat(e.target.value) || 0)}
              />
              <p className="text-xs text-gray-600">
                Premium rent for units achieving EPC B rating
              </p>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-blue-800">
                  <p className="font-medium mb-1">How it works:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Units upgraded to EPC A get {tempEpcA}% rent uplift</li>
                    <li>• Units upgraded to EPC B get {tempEpcB}% rent uplift</li>
                    <li>• Rent protected = rent that would be at risk without retrofit</li>
                    <li>• Total benefit = rent protected + rent uplift</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button onClick={handleSave} size="sm" className="flex-1">
                Apply
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm" className="flex-1">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
