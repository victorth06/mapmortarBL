import { MapPin, Download, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PropertyHeroProps {
  buildingName: string;
  address: string;
  reportId: string;
  reportDate: string;
  buildingImage: string;
  mapImage: string;
}

export function PropertyHero({
  buildingName,
  address,
  reportId,
  reportDate,
  buildingImage,
  mapImage,
}: PropertyHeroProps) {
  const handleExport = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Map View */}
        <div className="relative h-64 rounded-lg overflow-hidden bg-gray-100">
          <ImageWithFallback
            src={mapImage}
            alt="Building location map"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#EF4444]" />
            <span className="text-sm">135 Bishopsgate</span>
          </div>
        </div>

        {/* Building Photo */}
        <div className="relative h-64 rounded-lg overflow-hidden bg-gray-100">
          <ImageWithFallback
            src={buildingImage}
            alt={buildingName}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Property Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-[#FAFAFA] rounded-lg">
        <div>
          <h1 className="mb-2">{buildingName}</h1>
          <p className="text-[#6B7280] mb-1">{address}</p>
          <div className="flex gap-4 text-sm text-[#6B7280] mb-2">
            <span>Report ID: {reportId}</span>
            <span>•</span>
            <span>{reportDate}</span>
          </div>
          <p className="text-sm text-[#6B7280]">
            <strong>Sustainability Risk Analysis</strong> • Energy • Carbon • Compliance • CRREM Alignment
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="rounded-full px-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>
          <Button
            onClick={handleExport}
            className="bg-[#F97316] hover:bg-orange-600 text-white rounded-full px-6"
          >
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>
    </div>
  );
}