import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Search,
  UserRound,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mainCategories, categories, mockDeals } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

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

interface NavbarProps {
  onMainCategoryChange?: (categoryId: string) => void;
  onSubCategoryChange?: (categoryId: string) => void;
  selectedMainCategory?: string;
  selectedSubCategory?: string;
}

export function Navbar({ 
  onMainCategoryChange,
  onSubCategoryChange,
  selectedMainCategory = "coupons",
  selectedSubCategory
}: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const storedMainCategory = localStorage.getItem('selectedMainCategory') || "coupons";
  const storedSubCategory = localStorage.getItem('selectedSubCategory') || "";

  const [localMainCategory, setLocalMainCategory] = useState(selectedMainCategory || storedMainCategory);
  const [localSubCategory, setLocalSubCategory] = useState(selectedSubCategory || storedSubCategory);

  const currentMainCategory = selectedMainCategory || localMainCategory;
  const currentSubCategory = selectedSubCategory || localSubCategory;

  useEffect(() => {
    localStorage.setItem('selectedMainCategory', currentMainCategory);
    localStorage.setItem('selectedSubCategory', currentSubCategory);
  }, [currentMainCategory, currentSubCategory]);

  const handleLocalMainCategoryChange = (categoryId: string) => {
    if (onMainCategoryChange) {
      onMainCategoryChange(categoryId);
    } else {
      setLocalMainCategory(categoryId);
      setLocalSubCategory("");
      
      if (location.pathname !== "/") {
        navigate("/");
        toast({
          title: "Категория изменена",
          description: `Выбрана категория: ${mainCategories.find(cat => cat.id === categoryId)?.name}`,
        });
      }
    }
  };

  const handleLocalSubCategoryChange = (categoryId: string) => {
    if (onSubCategoryChange) {
      onSubCategoryChange(categoryId);
    } else {
      setLocalSubCategory(categoryId);
      
      if (location.pathname !== "/") {
        navigate("/");
        if (categoryId) {
          const subCategoryName = categories.find(cat => cat.id === categoryId)?.name;
          toast({
            title: "Подкатегория изменена",
            description: `Выбрана подкатегория: ${subCategoryName}`,
          });
        }
      }
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchFocused(false);
    
    if (searchQuery.trim() && location.pathname !== "/") {
      navigate("/");
      toast({
        title: "Поиск",
        description: `Результаты поиска для: ${searchQuery}`,
      });
    }
  };

  const getSearchPlaceholder = () => {
    const mainCategory = mainCategories.find(cat => cat.id === currentMainCategory);
    const subCategory = categories.find(cat => cat.id === currentSubCategory);
    
    if (subCategory) {
      return `Поиск по ${mainCategory?.name.toLowerCase()} ${subCategory.name.toLowerCase()}`;
    }
    
    return `Поиск по ${mainCategory?.name.toLowerCase() || 'купонам'}`;
  };

  const getFilteredDeals = () => {
    let filtered = mockDeals;
    
    if (currentMainCategory) {
      filtered = filtered.filter(deal => deal.mainCategory === currentMainCategory);
    }
    
    if (currentSubCategory) {
      filtered = filtered.filter(deal => deal.subcategory === currentSubCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(deal => 
        deal.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered.slice(0, 3);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white border-b">
      <div className="container px-4 mx-auto">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <span className="text-xl font-bold text-orange-600">
              Happy Hours
            </span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            {mainCategories.map((category) => {
              const IconComponent = getIconComponent(category.icon);
              return (
                <button
                  key={category.id}
                  onClick={() => handleLocalMainCategoryChange(category.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                    currentMainCategory === category.id
                      ? "text-orange-600"
                      : "text-gray-600 hover:text-orange-500"
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <UserRound className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/login" className="w-full">
                    Вход
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/register" className="w-full">
                    Регистрация
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="w-full">
                    Личный кабинет
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/seller" className="w-full">
                    Кабинет продавца
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/map-search" className="w-full">
                    Поиск по карте
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="py-4">
          <div className="relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="flex items-center space-x-4 max-w-4xl mx-auto">
              <div className="flex-1 flex items-center space-x-4 bg-white rounded-full border shadow-sm hover:shadow-md transition-shadow p-2">
                <div className="flex-1 px-4">
                  <Input
                    type="text"
                    placeholder={getSearchPlaceholder()}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <Button type="submit" className="rounded-full bg-orange-500 hover:bg-orange-600">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>

            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 max-w-4xl mx-auto bg-white rounded-lg shadow-lg border p-4 z-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-700">
                    {searchQuery ? 'Результаты поиска' : 'Последние просмотренные'}
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setIsSearchFocused(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  {getFilteredDeals().map((deal) => (
                    <Link 
                      key={deal.id} 
                      to={`/deal/${deal.slug}`}
                      onClick={() => setIsSearchFocused(false)}
                    >
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                              <img 
                                src={deal.images[0]} 
                                alt={deal.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium mb-1">{deal.title}</h4>
                              <div className="text-sm text-gray-500">{deal.location.address}</div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-orange-600 font-semibold">
                                  {deal.discountedPrice.toLocaleString('ru-RU')} ₽
                                </span>
                                <span className="text-sm text-gray-500 line-through">
                                  {deal.originalPrice.toLocaleString('ru-RU')} ₽
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 px-4 pb-4">
          <nav className="flex space-x-8 min-w-max">
            <button
              onClick={() => handleLocalSubCategoryChange("")}
              className={`flex flex-col items-center gap-2 py-2 transition-colors hover:text-orange-500 ${
                !currentSubCategory
                  ? "text-orange-500"
                  : "text-gray-500"
              }`}
            >
              <div className="h-6 w-6 flex items-center justify-center">🔍</div>
              <span className="text-xs font-medium whitespace-nowrap">
                Все категории
              </span>
            </button>
            
            {categories.filter(
              category => category.mainCategoryId === currentMainCategory
            ).map((category) => {
              const IconComponent = getIconComponent(category.icon);
              return (
                <button
                  key={category.id}
                  onClick={() => handleLocalSubCategoryChange(category.id)}
                  className={`flex flex-col items-center gap-2 py-2 transition-colors hover:text-orange-500 ${
                    currentSubCategory === category.id
                      ? "text-orange-500"
                      : "text-gray-500"
                  }`}
                >
                  <IconComponent className="h-6 w-6" />
                  <span className="text-xs font-medium whitespace-nowrap">
                    {category.name}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
