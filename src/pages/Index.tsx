import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { DealGrid } from '@/components/deals/deal-grid';
import { Card, CardContent } from '@/components/ui/card';
import { mockDeals, categories } from '@/data/mockData';
import { 
  Gift,
  Home,
  Star,
  Leaf,
  Palette,
  Utensils,
  Mountain,
  Camera,
  GraduationCap,
  Wine,
  Heart,
  MapPin,
  Ticket,
  ShoppingCart,
  Dumbbell,
  Car,
  Hotel,
  Home as House,
  Bed,
  Compass,
  Trophy
} from 'lucide-react';

const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, React.FC<{ className?: string }>> = {
    "Gift": () => <Gift className="h-5 w-5 text-orange-500" />,
    "Home": () => <Home className="h-5 w-5 text-blue-500" />,
    "Star": () => <Star className="h-5 w-5 text-yellow-500" />,
    "Leaf": () => <Leaf className="h-5 w-5 text-green-500" />,
    "Palette": () => <Palette className="h-5 w-5 text-purple-500" />,
    "Utensils": () => <Utensils className="h-5 w-5 text-red-500" />,
    "Mountain": () => <Mountain className="h-5 w-5 text-gray-500" />,
    "Camera": () => <Camera className="h-5 w-5 text-indigo-500" />,
    "GraduationCap": () => <GraduationCap className="h-5 w-5 text-teal-500" />,
    "Wine": () => <Wine className="h-5 w-5 text-pink-500" />,
    "Heart": () => <Heart className="h-5 w-5 text-red-500" />,
    "MapPin": () => <MapPin className="h-5 w-5 text-orange-500" />,
    "Ticket": () => <Ticket className="h-5 w-5 text-green-500" />,
    "ShoppingBag": () => <ShoppingCart className="h-5 w-5 text-blue-500" />,
    "Dumbbell": () => <Dumbbell className="h-5 w-5 text-gray-500" />,
    "Car": () => <Car className="h-5 w-5 text-red-500" />,
    "Hotel": () => <Hotel className="h-5 w-5 text-indigo-500" />,
    "House": () => <House className="h-5 w-5 text-green-500" />,
    "Bed": () => <Bed className="h-5 w-5 text-purple-500" />,
    "Compass": () => <Compass className="h-5 w-5 text-teal-500" />,
    "Trophy": () => <Trophy className="h-5 w-5 text-yellow-500" />,
  };

  return iconMap[iconName] || (() => <MapPin className="h-5 w-5 text-gray-500" />);
};

const Index = () => {
  const [selectedMainCategory, setSelectedMainCategory] = useState("coupons");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [filteredDeals, setFilteredDeals] = useState(mockDeals);

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
      <Navbar 
        onMainCategoryChange={handleMainCategoryChange}
        onSubCategoryChange={handleSubCategoryChange}
        selectedMainCategory={selectedMainCategory}
        selectedSubCategory={selectedSubCategory}
      />
      
      <main className="flex-grow pt-4">
        <section className="py-8 md:py-12">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {selectedSubCategory 
                  ? `${getSubCategoryName(selectedSubCategory)}` 
                  : "Популярные предложения"}
              </h2>
              <div className="text-orange-600 flex items-center">
                <span>{filteredDeals.length} предложений</span>
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
      
      <Footer />
    </div>
  );
};

export default Index;
