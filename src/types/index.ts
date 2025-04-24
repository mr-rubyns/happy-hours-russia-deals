export interface Deal {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  images: string[];
  location: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  category: string;
  subcategory: string;
  tags: string[];
  soldCount: number;
  rating: number;
  reviewCount: number;
  features: string[];
  conditions: string[];
  sellerId: string;
  createdAt: string;
  expiresAt: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: 'user' | 'seller' | 'admin';
  purchasedDeals?: string[];
  savedDeals?: string[];
  telegramNotifications: boolean;
}

export interface Review {
  id: string;
  dealId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: string;
}

export interface FilterOptions {
  category?: string;
  priceRange?: [number, number];
  rating?: number;
  sortBy?: 'popular' | 'price-asc' | 'price-desc' | 'rating';
}

// Add a Category interface
export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface MainCategory {
  id: string;
  name: string;
  icon: string;
}

export interface SubCategory {
  id: string;
  name: string;
  icon: string;
  mainCategoryId: string;
}
