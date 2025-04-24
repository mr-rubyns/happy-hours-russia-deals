
import { useEffect, useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterX, Check } from "lucide-react";

interface FilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FilterDialog({ open, onOpenChange }: FilterDialogProps) {
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      }
      return [...prev, category];
    });
  };

  const handleReset = () => {
    setPriceRange([0, 20000]);
    setSelectedCategories([]);
  };

  const handleApply = () => {
    // Here you would typically apply the filters to your data
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Фильтры</DialogTitle>
            <Button variant="ghost" size="sm" onClick={handleReset} className="text-orange-600">
              <FilterX className="h-4 w-4 mr-1" />
              Сбросить
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <Label>Цена</Label>
            <Slider
              defaultValue={priceRange}
              min={0}
              max={20000}
              step={500}
              value={priceRange}
              onValueChange={handlePriceChange}
              className="py-4"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{priceRange[0].toLocaleString('ru-RU')} ₽</span>
              <span>{priceRange[1].toLocaleString('ru-RU')} ₽</span>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Категории</Label>
            <div className="grid grid-cols-2 gap-4">
              {["Рестораны", "Красота", "Развлечения", "Здоровье"].map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                  />
                  <Label htmlFor={category}>{category}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button onClick={handleApply} className="bg-orange-500 hover:bg-orange-600">
            <Check className="h-4 w-4 mr-2" />
            Применить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
