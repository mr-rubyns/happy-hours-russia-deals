
import React, { useEffect, useRef, useState } from "react";
import { Deal } from "@/types";
import { Card } from "@/components/ui/card";

// This is a placeholder component that will be replaced with Leaflet map
// We're not using real Leaflet here since we don't have the ability to install external packages

interface MapViewProps {
  deals: Deal[];
  onDealSelect?: (deal: Deal) => void;
  selectedDealId?: string;
}

export function MapView({ deals, onDealSelect, selectedDealId }: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);
  
  const handleMarkerClick = (deal: Deal) => {
    if (onDealSelect) {
      onDealSelect(deal);
    }
  };
  
  if (!mapLoaded) {
    return (
      <div 
        ref={mapContainerRef}
        className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Загрузка карты...</p>
        </div>
      </div>
    );
  }
  
  return (
    <Card className="w-full h-full overflow-hidden border rounded-lg relative">
      <div className="absolute inset-0 bg-gray-200">
        {/* Mock Map Background */}
        <div 
          className="w-full h-full bg-gray-200"
          style={{
            backgroundImage: "url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/37.6173,55.7558,9,0/1200x800?access_token=pk.placeholder')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {/* Mock Deal Markers */}
          {deals.map((deal) => (
            <div 
              key={deal.id}
              className={`absolute cursor-pointer transition-all duration-300 ${
                selectedDealId === deal.id 
                  ? "z-10 transform scale-125" 
                  : "z-0"
              }`}
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`,
              }}
              onClick={() => handleMarkerClick(deal)}
            >
              <div className={`
                w-8 h-8 bg-white rounded-full border-2
                ${selectedDealId === deal.id ? "border-orange-600" : "border-orange-500"}
                shadow-md flex items-center justify-center
                hover:border-orange-600 transition-colors
              `}>
                <div className={`
                  w-4 h-4 rounded-full
                  ${selectedDealId === deal.id ? "bg-orange-600" : "bg-orange-500"}
                `}></div>
              </div>
              
              {/* Price label */}
              <div className={`
                absolute -bottom-8 left-1/2 transform -translate-x-1/2
                bg-white rounded-md shadow-md px-2 py-1
                ${selectedDealId === deal.id ? "font-medium text-orange-600" : "text-gray-800"}
                text-xs whitespace-nowrap
              `}>
                {deal.discountedPrice.toLocaleString('ru-RU')} ₽
              </div>
            </div>
          ))}
          
          {/* Mock Clusters */}
          <div 
            className="absolute cursor-pointer bg-orange-500 rounded-full w-10 h-10 flex items-center justify-center shadow-md border-2 border-white text-white font-bold"
            style={{ left: '25%', top: '25%' }}
          >
            15
          </div>
          
          <div 
            className="absolute cursor-pointer bg-orange-500 rounded-full w-12 h-12 flex items-center justify-center shadow-md border-2 border-white text-white font-bold"
            style={{ right: '20%', top: '30%' }}
          >
            24
          </div>
          
          <div 
            className="absolute cursor-pointer bg-orange-500 rounded-full w-14 h-14 flex items-center justify-center shadow-md border-2 border-white text-white font-bold"
            style={{ bottom: '20%', left: '40%' }}
          >
            38
          </div>
        </div>
        
        {/* Mock Map UI Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="bg-white rounded-md shadow-md w-8 h-8 flex items-center justify-center">
            <span className="text-xl font-bold">+</span>
          </button>
          <button className="bg-white rounded-md shadow-md w-8 h-8 flex items-center justify-center">
            <span className="text-xl font-bold">-</span>
          </button>
        </div>
      </div>
    </Card>
  );
}
