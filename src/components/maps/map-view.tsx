import React, { useEffect, useState, useMemo } from "react";
import { Deal } from "@/types";
import { Card } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { ZoomIn, ZoomOut, Book, Camera, Coffee, Compass, Gift, Heart, Home, ImageIcon, Map as MapIcon, Music, Package, Rocket, Star, Sun, Umbrella, Zap } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import MarkerClusterGroup from "react-leaflet-cluster";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

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

const getCoordinatesForDeal = (deal: Deal) => {
  const seed = deal.id.split('').reduce((a, b) => {
    return a + b.charCodeAt(0);
  }, 0);
  
  const baseLat = 55.7558;
  const baseLng = 37.6173;
  
  const latOffset = ((seed % 100) / 1000) * (seed % 2 ? 1 : -1);
  const lngOffset = ((seed % 100) / 1000) * (Math.floor(seed / 10) % 2 ? 1 : -1);
  
  return [baseLat + latOffset, baseLng + lngOffset] as [number, number];
};

export function MapView({ deals, onDealSelect, selectedDealId }: MapViewProps) {
  const [mapLoaded, setMapLoaded] = useState(false);
  
  useEffect(() => {
    setMapLoaded(true);
  }, []);

  const softColors = [
    "bg-[#F2FCE2]", // Soft Green
    "bg-[#FEF7CD]", // Soft Yellow
    "bg-[#FEC6A1]", // Soft Orange
    "bg-[#E5DEFF]", // Soft Purple
    "bg-[#FFDEE2]", // Soft Pink
    "bg-[#FDE1D3]", // Soft Peach
    "bg-[#D3E4FD]", // Soft Blue
    "bg-[#F1F0FB]", // Soft Gray
  ];

  const icons = [
    Book, Camera, Coffee, Compass, Gift, Heart, 
    Home, ImageIcon, MapIcon, Music, Package, Rocket, 
    Star, Sun, Umbrella, Zap
  ];

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
        center={[55.7558, 37.6173]} 
        zoom={11} 
        style={{ height: "100%", width: "100%" }} 
        zoomControl={false}
        className="z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapControls />
        
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={(cluster) => {
            const count = cluster.getChildCount();
            const size = Math.min(40 + count / 2, 60);
            
            return L.divIcon({
              html: `<div class="bg-orange-500 rounded-full flex items-center justify-center shadow-md border-2 border-white text-white font-bold" style="width: ${size}px; height: ${size}px;">${count}</div>`,
              className: 'custom-cluster-icon',
              iconSize: L.point(size, size),
              iconAnchor: L.point(size/2, size/2)
            });
          }}
        >
          {deals.map((deal) => {
            const coords = getCoordinatesForDeal(deal);
            const randomColor = softColors[Math.floor(Math.random() * softColors.length)];
            const RandomIcon = icons[Math.floor(Math.random() * icons.length)];
            
            const formattedRating = deal.rating.toFixed(2);
            
            return (
              <Marker
                key={deal.id}
                position={coords}
                icon={dealIcon}
                eventHandlers={{
                  click: () => handleMarkerClick(deal),
                }}
              >
                <Popup className="w-[280px]">
                  <div className="rounded-lg overflow-hidden">
                    <div className={`relative h-[140px] w-full flex items-center justify-center ${randomColor}`}>
                      <RandomIcon className="w-12 h-12 text-gray-700" />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm line-clamp-2">{deal.title}</h3>
                      <div className="flex items-center space-x-1 mt-2">
                        <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded flex items-center">
                          {formattedRating}
                          <Star className="h-3 w-3 ml-0.5 fill-yellow-500 text-yellow-500" />
                        </div>
                        <span className="text-xs text-gray-500">
                          ({deal.reviewCount})
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-orange-600 font-bold text-sm">
                          {deal.discountedPrice.toLocaleString('ru-RU')} ₽
                        </span>
                        <span className="text-gray-500 text-xs line-through">
                          {deal.originalPrice.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {deal.location.address}
                      </div>
                    </div>
                  </div>
                </Popup>
                
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
        </MarkerClusterGroup>
      </MapContainer>
    </Card>
  );
}
