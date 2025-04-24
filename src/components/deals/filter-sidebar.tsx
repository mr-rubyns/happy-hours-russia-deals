
import { useState } from "react";
import { Search, FilterX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { categories } from "@/data/mockData";
import { FilterOptions } from "@/types";

interface FilterSidebarProps {
  onFilterChange: (filters: FilterOptions) => void;
  initialFilters?: FilterOptions;
  className?: string;
}

export function FilterSidebar({ onFilterChange, initialFilters = {}, className }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [priceRange, setPriceRange] = useState<[number, number]>(
    filters.priceRange || [0, 20000]
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = (categoryId: string) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === categoryId ? undefined : categoryId,
    }));
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const handleRatingChange = (rating: number) => {
    setFilters((prev) => ({
      ...prev,
      rating: prev.rating === rating ? undefined : rating,
    }));
  };

  const handleSortChange = (sortBy: FilterOptions["sortBy"]) => {
    setFilters((prev) => ({
      ...prev,
      sortBy,
    }));
  };

  const applyFilters = () => {
    onFilterChange({
      ...filters,
      priceRange,
    });
  };

  const resetFilters = () => {
    setFilters({});
    setPriceRange([0, 20000]);
    setSearchQuery("");
    onFilterChange({});
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  return (
    <div className={className}>
      <div className="p-4 border rounded-md bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Фильтры</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetFilters} 
            className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
          >
            <FilterX className="h-4 w-4 mr-1" />
            Сбросить
          </Button>
        </div>

        <form onSubmit={handleSearch} className="mb-4">
          <div className="relative">
            <Input
              placeholder="Поиск акций"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Button 
              type="submit" 
              size="icon" 
              className="absolute right-0 top-0 h-full rounded-l-none bg-orange-500 hover:bg-orange-600"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>

        <Accordion type="multiple" defaultValue={["price", "categories", "rating", "sort"]}>
          <AccordionItem value="categories">
            <AccordionTrigger>Категории</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={filters.category === category.id}
                      onCheckedChange={() => handleCategoryChange(category.id)}
                    />
                    <Label
                      htmlFor={`category-${category.id}`}
                      className="text-sm cursor-pointer"
                    >
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="price">
            <AccordionTrigger>Цена</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <Slider
                  defaultValue={[priceRange[0], priceRange[1]]}
                  min={0}
                  max={20000}
                  step={500}
                  minStepsBetweenThumbs={1}
                  onValueChange={handlePriceChange}
                  className="py-4"
                />
                <div className="flex justify-between text-sm">
                  <span>{priceRange[0].toLocaleString('ru-RU')} ₽</span>
                  <span>{priceRange[1].toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="rating">
            <AccordionTrigger>Рейтинг</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {[5, 4, 3, 2].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox
                      id={`rating-${rating}`}
                      checked={filters.rating === rating}
                      onCheckedChange={() => handleRatingChange(rating)}
                    />
                    <Label
                      htmlFor={`rating-${rating}`}
                      className="text-sm cursor-pointer flex items-center"
                    >
                      {rating}★ и выше
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="sort">
            <AccordionTrigger>Сортировка</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sort-popular"
                    checked={filters.sortBy === "popular"}
                    onCheckedChange={() => handleSortChange("popular")}
                  />
                  <Label
                    htmlFor="sort-popular"
                    className="text-sm cursor-pointer"
                  >
                    По популярности
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sort-price-asc"
                    checked={filters.sortBy === "price-asc"}
                    onCheckedChange={() => handleSortChange("price-asc")}
                  />
                  <Label
                    htmlFor="sort-price-asc"
                    className="text-sm cursor-pointer"
                  >
                    По возрастанию цены
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sort-price-desc"
                    checked={filters.sortBy === "price-desc"}
                    onCheckedChange={() => handleSortChange("price-desc")}
                  />
                  <Label
                    htmlFor="sort-price-desc"
                    className="text-sm cursor-pointer"
                  >
                    По убыванию цены
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sort-rating"
                    checked={filters.sortBy === "rating"}
                    onCheckedChange={() => handleSortChange("rating")}
                  />
                  <Label
                    htmlFor="sort-rating"
                    className="text-sm cursor-pointer"
                  >
                    По рейтингу
                  </Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button 
          onClick={applyFilters} 
          className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white"
        >
          Применить фильтры
        </Button>
      </div>
    </div>
  );
}
