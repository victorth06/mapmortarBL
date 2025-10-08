import React, { useState } from 'react';
import { Building2, Users, Calendar, Clock, Edit2, FileText, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

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

export function AssetInformation() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDocumentsOpen, setIsDocumentsOpen] = useState(false);
  const [isAskAIOpen, setIsAskAIOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const [chatInput, setChatInput] = useState('');

  // Mock documents data
  const documents = [
    { id: 1, name: 'EPC Certificate - Ground Floor.pdf', date: '15 Sep 2024', type: 'EPC' },
    { id: 2, name: 'Lease Agreement - TP ICAP.pdf', date: '10 Aug 2024', type: 'Lease' },
    { id: 3, name: 'Energy Bills 2024 Q1-Q3.xlsx', date: '30 Sep 2024', type: 'Energy' },
    { id: 4, name: 'Building Survey 2023.pdf', date: '20 Jan 2024', type: 'Survey' },
    { id: 5, name: 'CRREM Assessment Report.pdf', date: '5 Oct 2024', type: 'CRREM' },
  ];

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    // Add user message
    const newMessages = [...chatMessages, { role: 'user' as const, content: chatInput }];
    setChatMessages(newMessages);

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        'epc': 'The current EPC distribution shows 2 units at EPC C, 1 unit at EPC D, and 1 unit at EPC E. The average rating is D (62 points). This data is sourced from the EPC Certificate documents uploaded on 15 Sep 2024.',
        'lease': 'TP ICAP has a lease expiring in 2028, representing the most significant upcoming lease event. The portfolio has a WAULT (Weighted Average Unexpired Lease Term) of 3.2 years, calculated across all 7 units based on the lease agreements in the document library.',
        'wault': 'The WAULT of 3.2 years is calculated by weighting each unit\'s remaining lease term by its rental value. This is based on 6 occupied units out of 7 total. Major contributors include TP ICAP (expires 2028) and other office tenants. This metric helps assess lease risk and refinancing timing.',
        'energy': 'Current energy use is 2,450 MWh/year (122 kWh/m²/yr), which is 12% above the REEB benchmark. The building uses 62% electricity and 38% gas. This data is derived from Energy Bills 2024 Q1-Q3 and the Building Survey 2023.',
        'crrem': 'The building will be CRREM-stranded in 2029 (4 years from now) if no action is taken. Current carbon intensity is 58 kgCO₂/m²/yr, which exceeds the 2025 CRREM pathway limit of 62 kgCO₂/m²/yr. This analysis is based on the CRREM Assessment Report dated 5 Oct 2024.',
      };

      let response = 'I can help you understand the building data and assumptions. Try asking about EPC distribution, lease profiles, WAULT calculations, energy use, or CRREM alignment.';
      
      const lowerInput = chatInput.toLowerCase();
      for (const [key, value] of Object.entries(responses)) {
        if (lowerInput.includes(key)) {
          response = value;
          break;
        }
      }

      setChatMessages([...newMessages, { role: 'assistant', content: response }]);
    }, 800);

    setChatInput('');
  };

  const suggestedQuestions = [
    'What is the current EPC distribution?',
    'Which tenants have leases expiring before 2028?',
    'What assumptions drive the WAULT value?',
    'How is the energy intensity calculated?',
  ];

  return (
    <div className="mb-8 bg-gray-50 rounded-lg border border-gray-200 p-6">
      {/* Header with Actions */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="mb-1 text-[#F97316]">Asset Information</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditOpen(true)}
            className="text-[#6B7280] hover:text-[#1A1A1A]"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDocumentsOpen(true)}
            className="text-[#6B7280] hover:text-[#1A1A1A] relative"
          >
            <FileText className="w-4 h-4" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-[#F97316]">
              {documents.length}
            </Badge>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAskAIOpen(true)}
            className="gap-1.5 border-orange-200 bg-orange-50 hover:bg-orange-100 text-[#F97316]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Ask
          </Button>
        </div>
      </div>

      {/* 4-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <InfoCard
          icon={Building2}
          label="Size"
          value="43,930 m² GIA"
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
        />
        <InfoCard
          icon={Users}
          label="Occupancy"
          value="6 of 7 units (86%)"
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
        />
        <InfoCard
          icon={Calendar}
          label="Lease Profile"
          value="3.2 yr WAULT"
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
        />
        <InfoCard
          icon={Clock}
          label="Key Timing"
          value="TP ICAP 2028"
          iconColor="text-amber-600"
          iconBgColor="bg-amber-100"
        />
      </div>

      {/* Notes and Confidence Score */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-3 border-t border-gray-200">
        <p className="text-xs text-[#6B7280]">
          Multi-let office building · Mixed EPC ratings (B to E) · Built 1992, refurbished 2015
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#6B7280]">Confidence:</span>
          <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
            92%
          </Badge>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Building Information</DialogTitle>
            <DialogDescription>
              Update the building details and specifications for this asset.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="size">Size (m² GIA)</Label>
                <Input id="size" type="number" defaultValue="43930" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="occupancy">Occupied Units</Label>
                <Input id="occupancy" placeholder="6 of 7" defaultValue="6 of 7" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="wault">WAULT (years)</Label>
                <Input id="wault" type="number" step="0.1" defaultValue="3.2" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keyTiming">Key Timing</Label>
                <Input id="keyTiming" placeholder="e.g., TP ICAP 2028" defaultValue="TP ICAP 2028" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="buildingType">Building Type</Label>
              <Input id="buildingType" defaultValue="Multi-let office building" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea 
                id="notes" 
                rows={3}
                defaultValue="Mixed EPC ratings (B to E) · Built 1992, refurbished 2015"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsEditOpen(false)}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Documents Sheet */}
      <Sheet open={isDocumentsOpen} onOpenChange={setIsDocumentsOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Documents & Data Sources</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <p className="text-sm text-[#6B7280]">
              These documents are used in the building analysis and modelling:
            </p>
            <div className="space-y-2">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <FileText className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm truncate" style={{ fontWeight: 600 }}>{doc.name}</p>
                      <p className="text-xs text-[#6B7280]">{doc.date}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="ml-2 flex-shrink-0">
                    {doc.type}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-gray-200">
              <Button variant="outline" className="w-full">
                Upload New Document
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Ask AI Sheet */}
      <Sheet open={isAskAIOpen} onOpenChange={setIsAskAIOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg flex flex-col">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#F97316]" />
              Ask about 135 Bishopsgate
            </SheetTitle>
          </SheetHeader>
          
          <div className="flex-1 flex flex-col mt-6 overflow-hidden">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {chatMessages.length === 0 ? (
                <div className="space-y-4">
                  <p className="text-sm text-[#6B7280]">
                    Ask me anything about this building's data, assumptions, or analysis:
                  </p>
                  <div className="space-y-2">
                    {suggestedQuestions.map((question, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setChatInput(question);
                          setTimeout(() => handleSendMessage(), 100);
                        }}
                        className="w-full text-left p-3 text-sm bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200 text-[#F97316] transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {chatMessages.map((message, idx) => (
                    <div
                      key={idx}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg p-3 text-sm ${
                          message.role === 'user'
                            ? 'bg-[#F97316] text-white'
                            : 'bg-gray-100 text-[#1A1A1A]'
                        }`}
                      >
                        {message.role === 'assistant' && (
                          <div className="flex items-center gap-1.5 mb-1">
                            <Sparkles className="w-3 h-3 text-[#F97316]" />
                            <span className="text-xs text-[#6B7280]">AI Assistant</span>
                          </div>
                        )}
                        {message.content}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask a question..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!chatInput.trim()}>
                  Send
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}