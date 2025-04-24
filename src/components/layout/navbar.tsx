
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

export function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const location = useLocation();

  // Mock user for demo purposes
  const mockUser = {
    name: "Алексей И.",
    notifications: 3,
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search submission
    if (searchTerm.trim()) {
      window.location.href = `/search?query=${encodeURIComponent(searchTerm)}`;
    }
  };

  // For demo, toggle login state
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      {/* Top bar with language and app download */}
      <div className="bg-gray-100 py-1 px-4 text-xs md:text-sm flex justify-between items-center">
        <div>
          <Button variant="link" size="sm" className="p-0 h-auto text-xs md:text-sm">
            Скачайте наше приложение для эксклюзивных акций
          </Button>
        </div>
        <Button variant="link" size="sm" className="p-0 h-auto text-xs md:text-sm">
          Русский
        </Button>
      </div>

      {/* Main navbar */}
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-orange-600">
                Happy Hours
              </span>
            </Link>
          </div>

          {/* Search - Desktop */}
          <div className="hidden md:flex flex-1 px-6">
            <form
              onSubmit={handleSearchSubmit}
              className="w-full max-w-lg relative flex items-center"
            >
              <Input
                type="text"
                placeholder="Поиск акций"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 w-full"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-0 rounded-l-none bg-orange-500 hover:bg-orange-600"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search button - Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Map Search */}
            <Link to="/map-search">
              <Button variant="ghost" size="icon">
                <MapPin className="h-5 w-5" />
              </Button>
            </Link>

            {/* Saved Deals */}
            <Link to="/saved">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>

            {/* Cart - Placeholder */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  2
                </span>
              </Button>
            </Link>

            {/* User Menu */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative">
                    <User className="h-5 w-5 mr-1" />
                    <span className="hidden sm:inline-block">
                      {mockUser.name}
                    </span>
                    {mockUser.notifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                        {mockUser.notifications}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full cursor-pointer">
                      Мой профиль
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/purchased" className="w-full cursor-pointer">
                      Мои покупки
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/saved" className="w-full cursor-pointer">
                      Избранное
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/messages" className="w-full cursor-pointer">
                      Сообщения
                      {mockUser.notifications > 0 && (
                        <span className="ml-auto bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                          {mockUser.notifications}
                        </span>
                      )}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={toggleLogin}
                    className="cursor-pointer"
                  >
                    Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost">
                    <LogIn className="h-5 w-5 mr-1" />
                    <span className="hidden sm:inline">Войти</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Для использования сервиса необходимо войти</DialogTitle>
                    <DialogDescription>
                      Выберите один из способов входа или зарегистрируйтесь, если у вас еще нет аккаунта.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-4 py-4">
                    <Link to="/login">
                      <Button className="w-full">Войти</Button>
                    </Link>
                    <Link to="/register">
                      <Button variant="outline" className="w-full">
                        Зарегистрироваться
                      </Button>
                    </Link>
                    <Button
                      onClick={toggleLogin}
                      variant="ghost"
                      className="w-full"
                    >
                      Демо-режим (без регистрации)
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        {/* Mobile Search - Conditional */}
        {showMobileSearch && (
          <div className="py-2 pb-3 md:hidden">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center"
            >
              <Input
                type="text"
                placeholder="Поиск акций"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 w-full"
                autoFocus
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-0 rounded-l-none bg-orange-500 hover:bg-orange-600"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}

        {/* Categories */}
        <div className="overflow-x-auto pb-2">
          <nav className="flex space-x-4 min-w-max">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className={`whitespace-nowrap px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-muted ${
                  location.pathname === `/category/${category.id}`
                    ? "bg-muted"
                    : ""
                }`}
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
