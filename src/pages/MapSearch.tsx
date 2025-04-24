import { useState } from "react";
import { Search, X, ArrowLeft, Filter, Map } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FilterSidebar } from "@/components/deals/filter-sidebar";
import { MapView } from "@/components/maps/map-view";
import { DealCard } from "@/components/deals/deal-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { mockDeals } from "@/data/mockData";
import { Deal, FilterOptions } from "@/types";

const MapSearch = () => {
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({});
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    // In a real app, this would trigger an API call with the filters
    // For demo, we'll just simulate filtering the deals
    filterDeals(newFilters, searchTerm);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    filterDeals(filters, searchTerm);
  };

  const filterDeals = (currentFilters: FilterOptions, term: string) => {
    let filteredDeals = [...mockDeals];

    // Filter by search term
    if (term) {
      const lowerTerm = term.toLowerCase();
      filteredDeals = filteredDeals.filter(
        (deal) =>
          deal.title.toLowerCase().includes(lowerTerm) ||
          deal.description.toLowerCase().includes(lowerTerm) ||
          deal.category.toLowerCase().includes(lowerTerm) ||
          deal.location.city.toLowerCase().includes(lowerTerm)
      );
    }

    // Filter by category
    if (currentFilters.category) {
      filteredDeals = filteredDeals.filter(
        (deal) => deal.category === currentFilters.category
      );
    }

    // Filter by price range
    if (currentFilters.priceRange) {
      filteredDeals = filteredDeals.filter(
        (deal) =>
          deal.discountedPrice >= currentFilters.priceRange![0] &&
          deal.discountedPrice <= currentFilters.priceRange![1]
      );
    }

    // Filter by rating
    if (currentFilters.rating) {
      filteredDeals = filteredDeals.filter(
        (deal) => deal.rating >= currentFilters.rating!
      );
    }

    // Sort deals
    if (currentFilters.sortBy) {
      switch (currentFilters.sortBy) {
        case "popular":
          filteredDeals.sort((a, b) => b.soldCount - a.soldCount);
          break;
        case "price-asc":
          filteredDeals.sort((a, b) => a.discountedPrice - b.discountedPrice);
          break;
        case "price-desc":
          filteredDeals.sort((a, b) => b.discountedPrice - a.discountedPrice);
          break;
        case "rating":
          filteredDeals.sort((a, b) => b.rating - a.rating);
          break;
      }
    }

    setDeals(filteredDeals);
  };

  const handleDealSelect = (deal: Deal) => {
    setSelectedDeal(deal);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    filterDeals(filters, "");
  };

  const toggleView = () => {
    setMobileView(mobileView === 'list' ? 'map' : 'list');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="lg:hidden bg-white border-b p-4 sticky top-16 z-30">
          <div className="flex justify-between items-center">
            <form onSubmit={handleSearchSubmit} className="relative flex-grow">
              <Input
                type="text"
                placeholder="Поиск акций"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
              {searchTerm && (
                <button
                  type="button"
                  className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={handleClearSearch}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <Button
                type="submit"
                size="icon"
                className="absolute right-0 top-0 h-full rounded-l-none bg-orange-500 hover:bg-orange-600"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
          
          <div className="flex justify-between mt-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex-1 mr-2">
                  <Filter className="h-4 w-4 mr-2" />
                  Фильтры
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:w-96 p-0">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold">Фильтры</h2>
                </div>
                <div className="p-4 overflow-auto h-[calc(100%-60px)]">
                  <FilterSidebar
                    onFilterChange={handleFilterChange}
                    initialFilters={filters}
                  />
                </div>
              </SheetContent>
            </Sheet>
            
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={toggleView}
            >
              {mobileView === 'list' ? (
                <>
                  <Map className="h-4 w-4 mr-2" />
                  Карта
                </>
              ) : (
                <>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Список
                </>
              )}
            </Button>
          </div>
        </div>
        
        <div className="container px-4 md:px-6 mx-auto py-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-28">
                <form onSubmit={handleSearchSubmit} className="relative mb-4">
                  <Input
                    type="text"
                    placeholder="Поиск акций"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400"
                      onClick={handleClearSearch}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                  <Button
                    type="submit"
                    size="icon"
                    className="absolute right-0 top-0 h-full rounded-l-none bg-orange-500 hover:bg-orange-600"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
                <FilterSidebar onFilterChange={handleFilterChange} initialFilters={filters} />
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Desktop view - Map on top, list below */}
              <div className="hidden lg:block">
                {/* Map - Takes significantly less space */}
                <div className="h-[400px] mb-4">
                  <MapView 
                    deals={deals} 
                    onDealSelect={handleDealSelect}
                    selectedDealId={selectedDeal?.id}
                  />
                </div>
                
                {/* Deal List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {deals.length > 0 ? (
                    deals.map((deal) => (
                      <DealCard
                        key={deal.id}
                        deal={deal}
                        className={selectedDeal?.id === deal.id ? "ring-2 ring-orange-500" : ""}
                      />
                    ))
                  ) : (
                    <div className="text-center py-10 col-span-2">
                      <p className="text-gray-500">Акций не найдено</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile view - toggles between map and list */}
              <div className="lg:hidden">
                {mobileView === 'list' ? (
                  <div className="space-y-4">
                    {deals.length > 0 ? (
                      deals.map((deal) => (
                        <DealCard
                          key={deal.id}
                          deal={deal}
                        />
                      ))
                    ) : (
                      <div className="text-center py-10">
                        <p className="text-gray-500">Акций не найдено</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-[calc(100vh-220px)]">
                    <MapView 
                      deals={deals}
                      onDealSelect={(deal) => {
                        setSelectedDeal(deal);
                        setMobileView('list');
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MapSearch;
