
import React, { useState, useEffect } from 'react';
import { ChevronRight } from "lucide-react";
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { DealGrid } from '@/components/deals/deal-grid';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { mockDeals, categories } from '@/data/mockData';
import { FilterOptions } from '@/types';

// Import the getIconComponent utility from navbar for consistency
const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, React.FC<{ className?: string }>> = {
    "Gift": () => <div className="h-5 w-5 flex items-center justify-center">🎁</div>,
    "Home": () => <div className="h-5 w-5 flex items-center justify-center">🏠</div>,
    "Star": () => <div className="h-5 w-5 flex items-center justify-center">⭐</div>,
    "Leaf": () => <div className="h-5 w-5 flex items-center justify-center">🍃</div>,
    "Palette": () => <div className="h-5 w-5 flex items-center justify-center">🎨</div>,
    "Utensils": () => <div className="h-5 w-5 flex items-center justify-center">🍽️</div>,
    "Mountain": () => <div className="h-5 w-5 flex items-center justify-center">⛰️</div>,
    "Camera": () => <div className="h-5 w-5 flex items-center justify-center">📷</div>,
    "GraduationCap": () => <div className="h-5 w-5 flex items-center justify-center">🎓</div>,
    "Wine": () => <div className="h-5 w-5 flex items-center justify-center">🍷</div>,
    "Heart": () => <div className="h-5 w-5 flex items-center justify-center">❤️</div>,
    "MapPin": () => <div className="h-5 w-5 flex items-center justify-center">📍</div>,
    "Ticket": () => <div className="h-5 w-5 flex items-center justify-center">🎟️</div>,
    "ShoppingBag": () => <div className="h-5 w-5 flex items-center justify-center">🛍️</div>,
    "Dumbbell": () => <div className="h-5 w-5 flex items-center justify-center">🏋️</div>,
    "Car": () => <div className="h-5 w-5 flex items-center justify-center">🚗</div>,
    "Hotel": () => <div className="h-5 w-5 flex items-center justify-center">🏨</div>,
    "House": () => <div className="h-5 w-5 flex items-center justify-center">🏡</div>,
    "Bed": () => <div className="h-5 w-5 flex items-center justify-center">🛏️</div>,
    "Compass": () => <div className="h-5 w-5 flex items-center justify-center">🧭</div>,
    "Trophy": () => <div className="h-5 w-5 flex items-center justify-center">🏆</div>,
  };

  return iconMap[iconName] || (() => <div className="h-5 w-5 flex items-center justify-center">📌</div>);
};

const Index = () => {
  const [selectedMainCategory, setSelectedMainCategory] = useState("coupons");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [filteredDeals, setFilteredDeals] = useState(mockDeals);
  const [showBanner, setShowBanner] = useState(true);

  // Filter deals when main category or subcategory changes
  useEffect(() => {
    let filtered = mockDeals.filter(deal => deal.mainCategory === selectedMainCategory);
    
    if (selectedSubCategory) {
      filtered = filtered.filter(deal => deal.subcategory === selectedSubCategory);
    }
    
    // Sort by popularity
    filtered.sort((a, b) => b.soldCount - a.soldCount);
    
    setFilteredDeals(filtered);
    
    // Hide banner when a subcategory is selected
    setShowBanner(!selectedSubCategory);
  }, [selectedMainCategory, selectedSubCategory]);

  // Handle main category change
  const handleMainCategoryChange = (categoryId: string) => {
    setSelectedMainCategory(categoryId);
    setSelectedSubCategory(""); // Reset subcategory when main category changes
  };

  // Handle subcategory change - Important: This now stays on the current page and just filters
  const handleSubCategoryChange = (categoryId: string) => {
    setSelectedSubCategory(categoryId);
    // No navigation - just filter in-place
  };

  const promotions = [
    {
      id: 'promo-1',
      title: 'Скидки до 70% на все СПА процедуры',
      description: 'Специальное предложение только в этом месяце - успей забронировать!',
      image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1740&auto=format&fit=crop',
      color: 'orange',
    },
    {
      id: 'promo-2',
      title: 'Семейные развлечения по выгодным ценам',
      description: 'Проведите время с семьей и сэкономьте до 50%',
      image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=1738&auto=format&fit=crop',
      color: 'blue',
    },
    {
      id: 'promo-3',
      title: 'Рестораны и кафе: второе блюдо в подарок',
      description: 'Попробуйте лучшие рестораны города с эксклюзивными предложениями',
      image: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=1740&auto=format&fit=crop',
      color: 'green',
    },
  ];

  // Get subcategories for the selected main category
  const currentSubcategories = categories.filter(
    cat => cat.mainCategoryId === selectedMainCategory
  );

  // Get category name based on its ID
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
      
      <main className="flex-grow">
        {/* Hero Banner - only show if no subcategory is selected */}
        {showBanner && (
          <section className="bg-gray-100 py-8 md:py-12">
            <div className="container px-4 md:px-6 mx-auto">
              <Carousel className="w-full">
                <CarouselContent>
                  {promotions.map((promo) => (
                    <CarouselItem key={promo.id}>
                      <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
                        <img 
                          src={promo.image}
                          alt={promo.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center p-6 md:p-12">
                          <h2 className="text-xl md:text-3xl font-bold text-white mb-2 md:mb-4">
                            {promo.title}
                          </h2>
                          <p className="text-sm md:text-base text-white/90 mb-4 md:mb-6 max-w-md">
                            {promo.description}
                          </p>
                          <Button className="w-fit" size="lg">
                            Посмотреть предложения
                          </Button>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </div>
          </section>
        )}

        {/* Display category heading when subcategory is selected */}
        {selectedSubCategory && (
          <section className="bg-gray-100 py-8">
            <div className="container px-4 md:px-6 mx-auto">
              <h1 className="text-3xl font-bold mb-2">{getSubCategoryName(selectedSubCategory)}</h1>
              <p className="text-gray-600">Найдено {filteredDeals.length} предложений</p>
            </div>
          </section>
        )}

        {/* Special Offers */}
        <section className="py-8 md:py-12">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {selectedSubCategory 
                  ? `${getSubCategoryName(selectedSubCategory)}` 
                  : "Популярные предложения"}
              </h2>
              <Link to="/deals" className="text-orange-600 hover:text-orange-700 flex items-center">
                <span>Смотреть все</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <DealGrid 
              deals={filteredDeals.slice(0, 20)} 
              emptyMessage={`В категории "${getSubCategoryName(selectedSubCategory)}" пока нет предложений`} 
            />
          </div>
        </section>
        
        {/* Featured Categories - only show if no subcategory is selected */}
        {showBanner && (
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
                {/* Using a button instead of Link to avoid navigation to a 404 page */}
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
        )}
        
        {/* Download App Banner - only show if no subcategory is selected */}
        {showBanner && (
          <section className="bg-orange-600 text-white py-8 md:py-12">
            <div className="container px-4 md:px-6 mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/2 mb-6 md:mb-0">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">Скачайте наше приложение</h2>
                  <p className="text-white/90 mb-4">Получите дополнительные скидки и эксклюзивные предложения, доступные только в мобильном приложении.</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="secondary" size="lg">
                      App Store
                    </Button>
                    <Button variant="secondary" size="lg">
                      Google Play
                    </Button>
                  </div>
                </div>
                <div className="md:w-1/3">
                  <img 
                    src="https://via.placeholder.com/300x600" 
                    alt="Mobile App" 
                    className="max-h-80 mx-auto" 
                  />
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
