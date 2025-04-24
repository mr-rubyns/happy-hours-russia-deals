
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { DealGrid } from '@/components/deals/deal-grid';
import { Card, CardContent } from '@/components/ui/card';
import { mockDeals, categories } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { FilterDialog } from '@/components/deals/filter-dialog';
import { Filter } from 'lucide-react';

const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, React.FC<{ className?: string }>> = {
    "Gift": () => <div className="h-5 w-5 bg-orange-200 rounded-full"></div>,
    "Home": () => <div className="h-5 w-5 bg-blue-200 rounded-sm"></div>,
    "Star": () => <div className="h-5 w-5 bg-yellow-200 rotate-45"></div>,
    "Leaf": () => <div className="h-5 w-5 bg-green-200 border-l-2 border-b-2 border-green-500"></div>,
    "Palette": () => <div className="h-5 w-5 bg-purple-200 border-2 border-purple-500"></div>,
    "Utensils": () => <div className="h-5 w-5 bg-red-200 border-l-2 border-t-2 border-red-500"></div>,
    "Mountain": () => <div className="h-5 w-5 bg-gray-200 triangle-down"></div>,
    "Camera": () => <div className="h-5 w-5 bg-indigo-200 border-2 border-indigo-500 rounded-sm"></div>,
    "GraduationCap": () => <div className="h-5 w-5 bg-teal-200 border-b-2 border-r-2 border-teal-500"></div>,
    "Wine": () => <div className="h-5 w-5 bg-pink-200 border-l-2 border-r-2 border-pink-500"></div>,
    "Heart": () => <div className="h-5 w-5 bg-red-200 transform rotate-45 border-r-2 border-b-2 border-red-500"></div>,
    "MapPin": () => <div className="h-5 w-5 bg-orange-200 rounded-full border-b-2 border-orange-500"></div>,
    "Ticket": () => <div className="h-5 w-5 bg-green-200 border-dashed border-2 border-green-500"></div>,
    "ShoppingBag": () => <div className="h-5 w-5 bg-blue-200 border-2 border-blue-500 rounded-sm"></div>,
    "Dumbbell": () => <div className="h-5 w-5 bg-gray-200 border-l-2 border-r-2 border-gray-500"></div>,
    "Car": () => <div className="h-5 w-5 bg-red-200 border-b-2 border-red-500"></div>,
    "Hotel": () => <div className="h-5 w-5 bg-indigo-200 border-2 border-indigo-500"></div>,
    "House": () => <div className="h-5 w-5 bg-green-200 border-2 border-green-500 rounded-sm"></div>,
    "Bed": () => <div className="h-5 w-5 bg-purple-200 border-b-2 border-purple-500"></div>,
    "Compass": () => <div className="h-5 w-5 bg-teal-200 rounded-full border-2 border-teal-500"></div>,
    "Trophy": () => <div className="h-5 w-5 bg-yellow-200 border-b-2 border-yellow-500"></div>,
  };

  return iconMap[iconName] || (() => <div className="h-5 w-5 bg-gray-200 border-2 border-gray-500"></div>);
};

const Index = () => {
  const [selectedMainCategory, setSelectedMainCategory] = useState("coupons");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [filteredDeals, setFilteredDeals] = useState(mockDeals);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    let filtered = mockDeals.filter(deal => deal.mainCategory === selectedMainCategory);
    
    if (selectedSubCategory) {
      filtered = filtered.filter(deal => deal.subcategory === selectedSubCategory);
    }
    
    filtered.sort((a, b) => b.soldCount - a.soldCount);
    
    setFilteredDeals(filtered);
  }, [selectedMainCategory, selectedSubCategory]);

  const handleMainCategoryChange = (categoryId: string) => {
    setSelectedMainCategory(categoryId);
    setSelectedSubCategory("");
  };

  const handleSubCategoryChange = (categoryId: string) => {
    setSelectedSubCategory(categoryId);
  };

  const currentSubcategories = categories.filter(
    cat => cat.mainCategoryId === selectedMainCategory
  );

  const getSubCategoryName = (id: string) => {
    const category = categories.find(cat => cat.id === id);
    return category ? category.name : "";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-4">
        <section className="py-8 md:py-12">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {selectedSubCategory 
                  ? `${getSubCategoryName(selectedSubCategory)}` 
                  : "Популярные предложения"}
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-orange-600">
                  {filteredDeals.length}
                </span>
                <Button 
                  variant="outline" 
                  onClick={() => setIsFilterOpen(true)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Фильтры
                </Button>
              </div>
            </div>
            <DealGrid 
              deals={filteredDeals.slice(0, 20)} 
              emptyMessage={`В категории "${getSubCategoryName(selectedSubCategory)}" пока нет предложений`} 
            />
          </div>
        </section>
        
        <section className="bg-gray-50 py-8 md:py-12">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-2xl font-bold mb-6">Категории</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {currentSubcategories.map((category) => {
                const IconComponent = getIconComponent(category.icon);
                return (
                  <div 
                    key={category.id} 
                    onClick={() => handleSubCategoryChange(category.id)}
                    className="cursor-pointer"
                  >
                    <Card className="h-full hover:shadow-md transition-shadow">
                      <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                          <IconComponent className="text-orange-600 text-xl" />
                        </div>
                        <h3 className="font-medium">{category.name}</h3>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
              <div>
                <Card className="h-full hover:shadow-md transition-shadow border-dashed">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                      <span className="text-gray-600 text-xl">+</span>
                    </div>
                    <h3 className="font-medium">Все категории</h3>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <FilterDialog 
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
      />
      
      <Footer />
    </div>
  );
};

export default Index;

