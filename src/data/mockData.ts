
import { Deal, User, Review, Message } from "@/types";

// Define categories
export const categories = [
  { id: "entertainment", name: "Развлечения" },
  { id: "beauty", name: "Красота и SPA" },
  { id: "masterclass", name: "Мастер-классы" },
  { id: "restaurants", name: "Рестораны" },
  { id: "excursions", name: "Экскурсии" },
  { id: "photo", name: "Фото и видео" },
  { id: "education", name: "Обучение" },
  { id: "tasting", name: "Дегустации" }
];

const generateDealImages = (id: number) => {
  // Correct image paths - include only images that actually exist in the public folder
  const images = [
    '/deal-images/deal1.jpg',
    '/deal-images/deal2.jpg',
    '/deal-images/deal3.jpg',
    '/deal-images/deal4.jpg',
    '/deal-images/deal5.jpg',
    '/deal-images/deal6.jpg',
    '/deal-images/deal7.jpg',
    '/deal-images/deal8.jpg',
  ];
  
  // Use modulo to ensure we always have a valid index even if id is large
  const primaryIndex = id % images.length;
  const secondaryIndex = (id + 1) % images.length;
  
  return [images[primaryIndex], images[secondaryIndex]];
};

export const mockDeals: Deal[] = Array.from({ length: 20 }, (_, index) => {
  const deal: Deal = {
    id: `deal-${index + 1}`,
    title: [
      "Полет в аэротрубе для двоих",
      "Spa-день в премиум салоне",
      "Мастер-класс по керамике",
      "Ужин в темноте для пары",
      "Экскурсия по крышам Москвы",
      "Фотосессия с профессионалом",
      "Урок игры на гитаре",
      "Дегустация вин для двоих"
    ][index % 8],
    slug: `deal-${index + 1}`,
    description: "Подробное описание акции и условий...",
    shortDescription: "Краткое описание предложения...",
    originalPrice: Math.round((Math.random() * 5000 + 3000) / 100) * 100,
    discountedPrice: 0, // This will be calculated below
    discountPercentage: [15, 20, 25, 30, 35, 40, 45, 50][index % 8],
    images: generateDealImages(index),
    location: {
      address: [
        "ул. Авиаторов, 38",
        "пр. Мира, 112",
        "ул. Тверская, 25",
        "Кутузовский пр., 48",
        "ул. Арбат, 15",
        "Ленинградский пр., 72",
        "ул. Пятницкая, 41",
        "Комсомольский пр., 28"
      ][index % 8],
      city: "Москва",
      coordinates: {
        lat: 55.75 + (Math.random() - 0.5) * 0.1,
        lng: 37.62 + (Math.random() - 0.5) * 0.1
      }
    },
    category: [
      "Развлечения",
      "Красота и SPA",
      "Мастер-классы",
      "Рестораны",
      "Экскурсии",
      "Фото и видео",
      "Обучение",
      "Дегустации"
    ][index % 8],
    subcategory: "Подкатегория",
    tags: ["популярное", "акция", "выгодно"],
    soldCount: Math.floor(Math.random() * 500),
    rating: 3.5 + Math.random() * 1.5,
    reviewCount: Math.floor(Math.random() * 200) + 50,
    features: ["Особенность 1", "Особенность 2"],
    conditions: ["Условие 1", "Условие 2"],
    sellerId: `seller-${index % 5 + 1}`,
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    expiresAt: new Date(Date.now() + Math.random() * 10000000000).toISOString()
  };
  return deal;
});

// Calculate discounted price after setting original price and discount percentage
mockDeals.forEach(deal => {
  deal.discountedPrice = Math.round(deal.originalPrice * (1 - deal.discountPercentage / 100));
});

// Add mock users
export const mockUsers: User[] = [
  {
    id: "u1",
    email: "test@example.com",
    firstName: "Алексей",
    lastName: "Иванов",
    role: "user",
    purchasedDeals: ["deal-1", "deal-2", "deal-5"],
    savedDeals: ["deal-3", "deal-4", "deal-7", "deal-9"],
    telegramNotifications: true
  },
  {
    id: "u2",
    email: "seller@example.com",
    firstName: "Мария",
    lastName: "Петрова",
    role: "seller",
    telegramNotifications: false
  },
  {
    id: "u3",
    email: "admin@example.com",
    firstName: "Дмитрий",
    lastName: "Сидоров",
    role: "admin",
    telegramNotifications: true
  }
];

// Add mock reviews
export const mockReviews: Review[] = [
  {
    id: "r1",
    dealId: "deal-1",
    userId: "u1",
    userName: "Алексей И.",
    rating: 4.5,
    comment: "Отличное предложение! Все понравилось.",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "r2",
    dealId: "deal-2",
    userId: "u3",
    userName: "Дмитрий С.",
    rating: 5,
    comment: "Превосходный сервис, обязательно приду снова.",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "r3",
    dealId: "deal-1",
    userId: "u2",
    userName: "Мария П.",
    rating: 3.5,
    comment: "В целом неплохо, но есть моменты, которые можно улучшить.",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Add mock messages
export const mockMessages: Message[] = [
  {
    id: "m1",
    senderId: "u1",
    receiverId: "u2",
    content: "Здравствуйте! Хотел бы уточнить детали акции.",
    read: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "m2",
    senderId: "u2",
    receiverId: "u1",
    content: "Добрый день! Конечно, что именно вас интересует?",
    read: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "m3",
    senderId: "u1",
    receiverId: "u2",
    content: "Можно ли перенести дату бронирования?",
    read: false,
    createdAt: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "m4",
    senderId: "u3",
    receiverId: "u1",
    content: "Здравствуйте, ваш заказ подтвержден!",
    read: false,
    createdAt: new Date(Date.now() - 0.2 * 24 * 60 * 60 * 1000).toISOString()
  }
];
