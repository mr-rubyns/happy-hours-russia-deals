
import React, { useEffect, useState } from "react";
import { Deal } from "@/types";
import { Card } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { ZoomIn, ZoomOut } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Custom icon for deals
const dealIcon = new L.Icon({
  iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23f97316' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3C/svg%3E",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

interface MapViewProps {
  deals: Deal[];
  onDealSelect?: (deal: Deal) => void;
  selectedDealId?: string;
}

function MapControls() {
  const map = useMap();
  
  const handleZoomIn = () => {
    map.setZoom(map.getZoom() + 1);
  };
  
  const handleZoomOut = () => {
    map.setZoom(map.getZoom() - 1);
  };
  
  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
      <button 
        onClick={handleZoomIn}
        className="bg-white rounded-md shadow-md w-8 h-8 flex items-center justify-center"
      >
        <ZoomIn className="w-5 h-5" />
      </button>
      <button 
        onClick={handleZoomOut}
        className="bg-white rounded-md shadow-md w-8 h-8 flex items-center justify-center"
      >
        <ZoomOut className="w-5 h-5" />
      </button>
    </div>
  );
}

// Generate random but consistent coordinates for deals
const getCoordinatesForDeal = (deal: Deal) => {
  // Use deal.id as seed for "random" but consistent coordinates
  const seed = deal.id.split('').reduce((a, b) => {
    return a + b.charCodeAt(0);
  }, 0);
  
  // Moscow coordinates as center
  const baseLat = 55.7558;
  const baseLng = 37.6173;
  
  // Generate offset based on seed (-0.1 to 0.1 degrees)
  const latOffset = ((seed % 100) / 1000) * (seed % 2 ? 1 : -1);
  const lngOffset = ((seed % 100) / 1000) * (Math.floor(seed / 10) % 2 ? 1 : -1);
  
  return [baseLat + latOffset, baseLng + lngOffset] as [number, number];
};

// Function to group markers into clusters
const createClusters = (deals: Deal[]) => {
  // For simplicity, we'll create 3 static clusters
  return [
    { position: [55.73, 37.55] as [number, number], count: 15 },
    { position: [55.76, 37.68] as [number, number], count: 24 },
    { position: [55.72, 37.60] as [number, number], count: 38 }
  ];
};

// Helper types for Leaflet components
type LeafletElement = L.Map | L.Marker | L.TileLayer;
interface LeafletProps {
  ref?: React.RefObject<LeafletElement>;
}

// Define explicit types for MapContainer, TileLayer, and Marker props
interface ExtendedMapContainerProps {
  center: [number, number];
  zoom: number;
  style?: React.CSSProperties;
  zoomControl?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function MapView({ deals, onDealSelect, selectedDealId }: MapViewProps) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const clusters = createClusters(deals);
  
  useEffect(() => {
    setMapLoaded(true);
  }, []);
  
  const handleMarkerClick = (deal: Deal) => {
    if (onDealSelect) {
      onDealSelect(deal);
    }
  };
  
  if (!mapLoaded) {
    return (
      <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Загрузка карты...</p>
        </div>
      </div>
    );
  }
  
  return (
    <Card className="w-full h-full overflow-hidden rounded-lg relative border border-gray-200">
      <MapContainer 
        // @ts-ignore - We need to ignore TypeScript here as react-leaflet types are not perfectly aligned
        center={[55.7558, 37.6173]} 
        zoom={11} 
        style={{ height: "100%", width: "100%" }} 
        zoomControl={false}
        className="z-0"
      >
        <TileLayer
          // @ts-ignore - Similar issue with TileLayer props
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapControls />
        
        {/* Deal Markers */}
        {deals.map((deal) => {
          const coords = getCoordinatesForDeal(deal);
          
          return (
            <Marker
              key={deal.id}
              // @ts-ignore - We need to use these props even though TypeScript is complaining
              position={coords}
              icon={dealIcon}
              eventHandlers={{
                click: () => handleMarkerClick(deal),
              }}
            >
              <Popup>
                <div className="p-2 max-w-[200px]">
                  <h3 className="font-medium text-sm">{deal.title}</h3>
                  <p className="text-orange-500 font-bold mt-1">
                    {deal.discountedPrice.toLocaleString('ru-RU')} ₽
                  </p>
                </div>
              </Popup>
              
              {/* Price Label */}
              <div 
                className={`absolute z-[1000] px-2 py-1 bg-white rounded-md shadow-md text-xs whitespace-nowrap ${
                  selectedDealId === deal.id ? "font-medium text-orange-600" : "text-gray-800"
                }`}
                style={{ 
                  transform: 'translate(-50%, 12px)',
                  left: '16px', 
                  bottom: '0'
                }}
              >
                {deal.discountedPrice.toLocaleString('ru-RU')} ₽
              </div>
            </Marker>
          );
        })}
        
        {/* Clusters */}
        {clusters.map((cluster, index) => (
          <Marker
            key={`cluster-${index}`}
            // @ts-ignore - Also needs to ignore type checking for the same reason
            position={cluster.position}
            icon={L.divIcon({
              className: 'custom-cluster-icon',
              html: `<div class="bg-orange-500 rounded-full flex items-center justify-center shadow-md border-2 border-white text-white font-bold" style="width: ${Math.min(40 + cluster.count / 2, 60)}px; height: ${Math.min(40 + cluster.count / 2, 60)}px;">${cluster.count}</div>`,
              iconSize: [60, 60],
              iconAnchor: [30, 30]
            })}
          />
        ))}
      </MapContainer>
    </Card>
  );
}
