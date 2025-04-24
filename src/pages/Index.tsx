
import { useState, useEffect } from "react";
import { DealCard } from "@/components/deals/deal-card";
import { DealGrid } from "@/components/deals/deal-grid";
import { FilterSidebar } from "@/components/deals/filter-sidebar";
import { FilterOptions } from "@/types";
import { deals, categories } from "@/data/mockData";

export default function Index() {
  const [filteredDeals, setFilteredDeals] = useState(deals);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Apply filters
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      let newFilteredDeals = deals;
      
      // Filter by category
      if (filters.category) {
        newFilteredDeals = newFilteredDeals.filter(deal => 
          deal.category === filters.category
        );
      }
      
      // Filter by price range
      if (filters.priceRange) {
        newFilteredDeals = newFilteredDeals.filter(deal => 
          deal.price >= filters.priceRange![0] && 
          deal.price <= filters.priceRange![1]
        );
      }
      
      // Filter by rating
      if (filters.rating) {
        newFilteredDeals = newFilteredDeals.filter(deal => 
          deal.rating >= filters.rating!
        );
      }
      
      // Sort
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case "price-asc":
            newFilteredDeals.sort((a, b) => a.price - b.price);
            break;
          case "price-desc":
            newFilteredDeals.sort((a, b) => b.price - a.price);
            break;
          case "rating":
            newFilteredDeals.sort((a, b) => b.rating - a.rating);
            break;
          case "popular":
            // Assuming each deal has a views property
            newFilteredDeals.sort((a, b) => (b.views || 0) - (a.views || 0));
            break;
        }
      }
      
      setFilteredDeals(newFilteredDeals);
      setLoading(false);
    }, 500);
  }, [filters]);

  // Handle main category selection
  const handleMainCategoryChange = (categoryId: string) => {
    setSelectedMainCategory(categoryId);
    setFilters(prev => ({
      ...prev,
      category: categoryId
    }));
  };
  
  // Handle sub-category selection
  const handleSubCategoryChange = (categoryId: string) => {
    setSelectedSubCategory(categoryId);
    // Additional filtering logic could be added here
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="hidden md:block w-64">
          <FilterSidebar
            onFilterChange={setFilters}
            initialFilters={filters}
            className="sticky top-24"
          />
        </div>
        <div className="flex-1">
          <DealGrid 
            deals={filteredDeals} 
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
