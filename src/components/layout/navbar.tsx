
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Search,
  MapPin, 
  User,
  LogIn,
  Heart,
  Bell,
  ShoppingCart,
  Globe,
  Menu,
  Home,
  Star,
  Gift,
  Leaf, 
  Palette, 
  Utensils, 
  Mountain, 
  Camera, 
  GraduationCap,
  Wine,
  Calendar,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mainCategories, categories } from "@/data/mockData";

// Helper function to get the correct icon component
const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, React.FC<{ className?: string }>> = {
    "Gift": Gift,
    "Home": Home,
    "Star": Star,
    "Leaf": Leaf,
    "Palette": Palette,
    "Utensils": Utensils,
    "Mountain": Mountain,
    "Camera": Camera,
    "GraduationCap": GraduationCap,
    "Wine": Wine,
  };

  return iconMap[iconName] || MapPin;
};

export function Navbar() {
  const [selectedMainCategory, setSelectedMainCategory] = useState("coupons");
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search submission
  };

  const filteredCategories = categories.filter(
    category => category.mainCategoryId === selectedMainCategory
  );

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b">
      <div className="container px-4 mx-auto">
        {/* Main categories */}
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
                  onClick={() => setSelectedMainCategory(category.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                    selectedMainCategory === category.id
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

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Search bar */}
        <div className="py-4">
          <form onSubmit={handleSearchSubmit} className="flex items-center space-x-4 max-w-4xl mx-auto">
            <div className="flex-1 flex items-center space-x-4 bg-white rounded-full border shadow-sm hover:shadow-md transition-shadow p-2">
              <div className="flex-1 px-4">
                <Input
                  type="text"
                  placeholder="Где"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div className="px-4">
                <Button variant="ghost" className="text-sm space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Когда?</span>
                </Button>
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div className="px-4">
                <Button variant="ghost" className="text-sm space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Кто едет?</span>
                </Button>
              </div>
              <Button type="submit" className="rounded-full bg-orange-500 hover:bg-orange-600">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>

        {/* Subcategories */}
        <div className="overflow-x-auto -mx-4 px-4 pb-4">
          <nav className="flex space-x-8 min-w-max">
            {filteredCategories.map((category) => {
              const IconComponent = getIconComponent(category.icon);
              return (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className={`flex flex-col items-center gap-2 py-2 transition-colors hover:text-orange-500 ${
                    location.pathname === `/category/${category.id}`
                      ? "text-orange-500 border-b-2 border-orange-500"
                      : "text-gray-500"
                  }`}
                >
                  <IconComponent className="h-6 w-6" />
                  <span className="text-xs font-medium whitespace-nowrap">
                    {category.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
