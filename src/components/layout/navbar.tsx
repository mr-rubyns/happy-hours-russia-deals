
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
  Sparkles,
  Leaf,
  Palette,
  Utensils,
  Mountain,
  Camera,
  GraduationCap,
  Wine
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { categories } from "@/data/mockData";

// Helper function to get the correct icon component
const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, React.FC<{ className?: string }>> = {
    "Sparkles": Sparkles,
    "Leaf": Leaf,
    "Palette": Palette,
    "Utensils": Utensils,
    "Mountain": Mountain,
    "Camera": Camera,
    "GraduationCap": GraduationCap,
    "Wine": Wine,
    "MapPin": MapPin // Default fallback
  };

  return iconMap[iconName] || MapPin;
};

export function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/search?query=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b">
      <div className="container px-4 mx-auto">
        {/* Main navbar */}
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <span className="text-xl font-bold text-orange-600">
              Happy Hours
            </span>
          </Link>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-grow max-w-3xl"
          >
            <div className="relative w-full">
              <div className="flex items-center w-full rounded-full border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-grow divide-x">
                  <Input
                    type="text"
                    placeholder="Поиск направлений"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-0 rounded-l-full px-6 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <div className="hidden sm:flex items-center px-6 py-2">
                    <span className="text-sm">Когда?</span>
                  </div>
                  <div className="hidden sm:flex items-center px-6 py-2">
                    <span className="text-sm">Кто едет?</span>
                  </div>
                </div>
                <Button
                  type="submit"
                  size="icon"
                  className="rounded-full bg-orange-500 hover:bg-orange-600 mr-1"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>

          {/* Right Side Nav */}
          <div className="flex items-center gap-2 md:gap-4">
            <Link to="/map-search">
              <Button variant="ghost" className="text-sm font-medium">
                Поиск по карте
              </Button>
            </Link>

            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full border p-3 flex gap-2">
                  <Menu className="h-4 w-4" />
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem asChild>
                  <Link to="/" className="w-full cursor-pointer">
                    Главная
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/map-search" className="w-full cursor-pointer">
                    Поиск по карте
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="w-full cursor-pointer">
                    Личный кабинет
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/purchased" className="w-full cursor-pointer">
                    Мои покупки
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/seller" className="w-full cursor-pointer">
                    Кабинет продавца
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/login" className="w-full cursor-pointer">
                    Вход
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/register" className="w-full cursor-pointer">
                    Регистрация
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/forgot-password" className="w-full cursor-pointer">
                    Восстановление пароля
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Categories */}
        <div className="overflow-x-auto -mx-4 px-4 pb-4">
          <nav className="flex space-x-8 min-w-max">
            {categories.map((category) => {
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
