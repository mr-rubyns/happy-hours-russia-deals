
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { X, Plus, Minus } from "lucide-react";
import { useState } from "react";

interface FilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FilterDialog({ open, onOpenChange }: FilterDialogProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([9000, 250000]);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    bedrooms: false,
    beds: false,
    bathrooms: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const amenities = [
    { id: 'wifi', icon: '📶', label: 'Wi-Fi' },
    { id: 'kitchen', icon: '🍳', label: 'Кухня' },
    { id: 'washer', icon: '🧺', label: 'Стиральная машина' },
    { id: 'dryer', icon: '👕', label: 'Сушильная машина' },
    { id: 'ac', icon: '❄️', label: 'Кондиционер' },
    { id: 'heating', icon: '🌡️', label: 'Отопление' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">Фильтры</DialogTitle>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Price Range */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Ценовой диапазон</h3>
            <p className="text-sm text-gray-500">Цены за ночь с учетом налогов и сборов</p>
            <div className="pt-4">
              <Slider
                defaultValue={[priceRange[0], priceRange[1]]}
                max={250000}
                min={9000}
                step={1000}
                onValueChange={(value) => setPriceRange([value[0], value[1]])}
                className="py-4"
              />
              <div className="flex justify-between mt-2">
                <div className="rounded-full border px-4 py-2 text-sm">
                  {priceRange[0].toLocaleString('ru-RU')} ₽
                </div>
                <div className="rounded-full border px-4 py-2 text-sm">
                  {priceRange[1].toLocaleString('ru-RU')}+ ₽
                </div>
              </div>
            </div>
          </div>

          {/* Rooms and Beds */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Комнаты и кровати</h3>
            <div className="space-y-4">
              {['Спальни', 'Кровати', 'Ванные'].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span>{item}</span>
                  <div className="flex items-center">
                    <Button variant="outline" size="sm" className="rounded-full">
                      Неважно
                    </Button>
                    <Button variant="outline" size="icon" className="ml-2 rounded-full h-8 w-8">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Удобства</h3>
            <div className="grid grid-cols-2 gap-3">
              {amenities.map((amenity) => (
                <button
                  key={amenity.id}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border hover:border-gray-400 transition-colors text-sm"
                >
                  <span>{amenity.icon}</span>
                  <span>{amenity.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6 pt-4 border-t">
          <Button 
            variant="ghost" 
            onClick={() => {
              setPriceRange([9000, 250000]);
            }}
          >
            Очистить всё
          </Button>
          <Button 
            className="bg-black text-white hover:bg-gray-800"
            onClick={() => onOpenChange(false)}
          >
            Показать 1000+ вариантов
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
