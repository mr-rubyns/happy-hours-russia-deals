
import { Deal } from "@/types";

const generateDealImages = (id: number) => {
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

export const mockDeals: Deal[] = Array.from({ length: 20 }, (_, index) => ({
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
}));

// Calculate discounted price after setting original price and discount percentage
mockDeals.forEach(deal => {
  deal.discountedPrice = Math.round(deal.originalPrice * (1 - deal.discountPercentage / 100));
});

