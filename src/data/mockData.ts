
import { Deal, User, Review, Message, Category, MainCategory, SubCategory } from "@/types";

// Define main categories
export const mainCategories: MainCategory[] = [
  { id: "coupons", name: "Купоны", icon: "Gift" },
  { id: "housing", name: "Жилье", icon: "Home" },
  { id: "impressions", name: "Впечатления", icon: "Star" },
];

// Define subcategories with more options for each main category
export const categories: SubCategory[] = [
  // Impressions subcategories
  { id: "entertainment", name: "Развлечения", icon: "Ticket", mainCategoryId: "impressions" },
  { id: "masterclass", name: "Мастер-классы", icon: "Palette", mainCategoryId: "impressions" },
  { id: "excursions", name: "Экскурсии", icon: "MapPin", mainCategoryId: "impressions" },
  { id: "photo", name: "Фото и видео", icon: "Camera", mainCategoryId: "impressions" },
  { id: "education", name: "Обучение", icon: "GraduationCap", mainCategoryId: "impressions" },
  { id: "adventure", name: "Приключения", icon: "Compass", mainCategoryId: "impressions" },
  { id: "sport", name: "Спорт", icon: "Trophy", mainCategoryId: "impressions" },
  
  // Coupons subcategories
  { id: "beauty", name: "Красота и SPA", icon: "Heart", mainCategoryId: "coupons" },
  { id: "restaurants", name: "Рестораны", icon: "Utensils", mainCategoryId: "coupons" },
  { id: "tasting", name: "Дегустации", icon: "Wine", mainCategoryId: "coupons" },
  { id: "shopping", name: "Шоппинг", icon: "ShoppingBag", mainCategoryId: "coupons" },
  { id: "fitness", name: "Фитнес", icon: "Dumbbell", mainCategoryId: "coupons" },
  { id: "health", name: "Здоровье", icon: "Heart", mainCategoryId: "coupons" },
  { id: "auto", name: "Авто", icon: "Car", mainCategoryId: "coupons" },
  
  // Housing subcategories
  { id: "apartments", name: "Квартиры", icon: "Home", mainCategoryId: "housing" },
  { id: "houses", name: "Дома", icon: "Home", mainCategoryId: "housing" },
  { id: "hotels", name: "Отели", icon: "Hotel", mainCategoryId: "housing" },
  { id: "cottages", name: "Коттеджи", icon: "House", mainCategoryId: "housing" },
  { id: "hostels", name: "Хостелы", icon: "Bed", mainCategoryId: "housing" },
  { id: "villas", name: "Виллы", icon: "Home", mainCategoryId: "housing" },
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

// Generate more deals for each category
export const mockDeals: Deal[] = [
  // COUPONS DEALS
  ...Array.from({ length: 20 }, (_, index) => {
    const subcategories = categories.filter(c => c.mainCategoryId === "coupons");
    const subcategory = subcategories[index % subcategories.length];
    
    let title = "";
    let features = [];
    
    // Generate titles and features specific to the subcategory
    switch (subcategory.id) {
      case "beauty":
        title = [
          "SPA-день для двоих со скидкой 50%",
          "Маникюр + педикюр в салоне красоты",
          "Массаж спины и шеи со скидкой 40%",
          "Комплексный уход за лицом"
        ][index % 4];
        features = ["Скидка 30-50%", "Сертифицированные мастера", "Премиум косметика"];
        break;
      case "restaurants":
        title = [
          "Ужин на двоих в ресторане «Пушкинъ»",
          "Дегустационное меню в баре «Горький»",
          "Комплексный обед в кафе «Вареничная»",
          "Японская кухня со скидкой 30%"
        ][index % 4];
        features = ["Скидка 25-40%", "Авторская кухня", "Отличный сервис"];
        break;
      case "tasting":
        title = [
          "Дегустация вин для компании",
          "Мастер-класс по дегустации кофе",
          "Чайная церемония для двоих",
          "Дегустация редких сортов шоколада"
        ][index % 4];
        features = ["Скидка 30%", "Профессиональный сомелье", "Все включено"];
        break;
      case "shopping":
        title = [
          "Купон на 2000₽ в магазине косметики",
          "Скидка 50% на одежду в бутике",
          "Промокод на покупку техники Apple",
          "Сертификат в магазин спорттоваров"
        ][index % 4];
        features = ["Большой выбор", "Оригинальные товары", "Доставка включена"];
        break;
      default:
        title = [
          "Купон на 2000₽ в магазине косметики",
          "Скидка 50% на услуги автосервиса",
          "Абонемент в фитнес-центр на месяц",
          "Медицинская диагностика со скидкой"
        ][index % 4];
        features = ["Скидка до 50%", "Ограниченное предложение", "Гарантия качества"];
    }
    
    const discount = [30, 40, 50, 60, 70][index % 5];
    const originalPrice = Math.round((Math.random() * 5000 + 2000) / 100) * 100;
    
    const deal: Deal = {
      id: `coupon-${index + 1}`,
      title,
      slug: `coupon-${index + 1}`,
      description: "Подробное описание акции и условий использования купона...",
      shortDescription: "Выгодное предложение со скидкой, действует ограниченное время!",
      originalPrice,
      discountPercentage: discount,
      discountedPrice: Math.round(originalPrice * (1 - discount / 100)),
      images: generateDealImages(index),
      location: {
        address: [
          "ул. Тверская, 25",
          "Кутузовский пр., 48",
          "ул. Арбат, 15",
          "ул. Новый Арбат, 22"
        ][index % 4],
        city: "Москва",
        coordinates: {
          lat: 55.75 + (Math.random() - 0.5) * 0.1,
          lng: 37.62 + (Math.random() - 0.5) * 0.1
        }
      },
      category: subcategory.name,
      subcategory: subcategory.id,
      mainCategory: "coupons",
      tags: ["купон", "скидка", "акция"],
      soldCount: Math.floor(Math.random() * 500),
      rating: 3.5 + Math.random() * 1.5,
      reviewCount: Math.floor(Math.random() * 200) + 50,
      features,
      conditions: ["Срок действия 1 месяц", "Нужно предварительное бронирование", "Требуется QR-код"],
      sellerId: `seller-${index % 5 + 1}`,
      createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      expiresAt: new Date(Date.now() + Math.random() * 10000000000).toISOString()
    };
    return deal;
  }),
  
  // HOUSING DEALS
  ...Array.from({ length: 20 }, (_, index) => {
    const subcategories = categories.filter(c => c.mainCategoryId === "housing");
    const subcategory = subcategories[index % subcategories.length];
    
    let title = "";
    let features = [];
    
    // Generate titles and features specific to the subcategory
    switch (subcategory.id) {
      case "apartments":
        title = [
          "Уютная квартира-студия в центре",
          "Апартаменты с видом на реку",
          "Двухкомнатная квартира с дизайнерским ремонтом",
          "Современные апартаменты бизнес-класса"
        ][index % 4];
        features = ["Полностью оборудованная кухня", "Wi-Fi", "Кондиционер", "Стиральная машина"];
        break;
      case "houses":
        title = [
          "Загородный дом с сауной",
          "Коттедж с бассейном и террасой",
          "Деревянный дом у озера",
          "Современный дом с панорамными окнами"
        ][index % 4];
        features = ["Парковка", "Мангальная зона", "Все удобства", "Отопление"];
        break;
      case "hotels":
        title = [
          "Номер в отеле «Метрополь»",
          "Люкс в бутик-отеле",
          "Стандартный номер с завтраком",
          "Семейный номер в спа-отеле"
        ][index % 4];
        features = ["Завтрак включен", "Фитнес-центр", "СПА", "Ресторан"];
        break;
      default:
        title = [
          "Семейный номер в гостинице",
          "Комфортабельный хостел в центре",
          "Роскошная вилла с бассейном",
          "Уютный коттедж для выходных"
        ][index % 4];
        features = ["Удобное расположение", "Чистота", "Комфорт", "Приватность"];
    }
    
    const discount = [10, 15, 20, 25, 30][index % 5];
    const originalPrice = Math.round((Math.random() * 10000 + 5000) / 100) * 100;
    
    const deal: Deal = {
      id: `housing-${index + 1}`,
      title,
      slug: `housing-${index + 1}`,
      description: "Подробное описание жилья и условий аренды...",
      shortDescription: "Комфортное проживание в лучшем районе города!",
      originalPrice,
      discountPercentage: discount,
      discountedPrice: Math.round(originalPrice * (1 - discount / 100)),
      images: generateDealImages(index + 20),
      location: {
        address: [
          "ул. Ленинградская, 15",
          "пр. Мира, 112",
          "ул. Тверская, 25",
          "Кутузовский пр., 48"
        ][index % 4],
        city: "Москва",
        coordinates: {
          lat: 55.75 + (Math.random() - 0.5) * 0.1,
          lng: 37.62 + (Math.random() - 0.5) * 0.1
        }
      },
      category: subcategory.name,
      subcategory: subcategory.id,
      mainCategory: "housing",
      tags: ["жилье", "аренда", "отдых"],
      soldCount: Math.floor(Math.random() * 100),
      rating: 3.5 + Math.random() * 1.5,
      reviewCount: Math.floor(Math.random() * 50) + 10,
      features,
      conditions: ["Залог обязателен", "Отмена за 48 часов", "Без вечеринок", "Без животных"],
      sellerId: `seller-${index % 5 + 1}`,
      createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      expiresAt: new Date(Date.now() + Math.random() * 10000000000).toISOString()
    };
    return deal;
  }),
  
  // IMPRESSIONS DEALS
  ...Array.from({ length: 20 }, (_, index) => {
    const subcategories = categories.filter(c => c.mainCategoryId === "impressions");
    const subcategory = subcategories[index % subcategories.length];
    
    let title = "";
    let features = [];
    
    // Generate titles and features specific to the subcategory
    switch (subcategory.id) {
      case "entertainment":
        title = [
          "Билеты на концерт популярной группы",
          "VIP-места в театре на премьеру",
          "Посещение аквапарка для всей семьи",
          "Вход в ночной клуб с welcome drink"
        ][index % 4];
        features = ["Гарантированные места", "Без очередей", "Бронирование онлайн"];
        break;
      case "masterclass":
        title = [
          "Мастер-класс по приготовлению суши",
          "Урок живописи с художником",
          "Мастер-класс по флористике",
          "Урок игры на гитаре"
        ][index % 4];
        features = ["Все материалы включены", "Небольшие группы", "Сертификат участника"];
        break;
      case "excursions":
        title = [
          "Экскурсия по крышам Москвы",
          "Обзорная экскурсия на теплоходе",
          "Тур по историческому центру",
          "Ночная экскурсия с гидом"
        ][index % 4];
        features = ["Профессиональный гид", "Фотосессия включена", "Небольшие группы"];
        break;
      case "photo":
        title = [
          "Профессиональная фотосессия",
          "Видеосъемка мероприятия",
          "Семейная фотосессия в студии",
          "Свадебная фотосъемка"
        ][index % 4];
        features = ["Опытный фотограф", "Обработка всех фото", "Различные локации"];
        break;
      default:
        title = [
          "Полет на воздушном шаре",
          "Прыжок с парашютом",
          "Поход в горы с инструктором",
          "Урок верховой езды"
        ][index % 4];
        features = ["Опытные инструкторы", "Все необходимое оборудование", "Незабываемые впечатления"];
    }
    
    const discount = [15, 20, 25, 30, 35][index % 5];
    const originalPrice = Math.round((Math.random() * 8000 + 3000) / 100) * 100;
    
    const deal: Deal = {
      id: `impression-${index + 1}`,
      title,
      slug: `impression-${index + 1}`,
      description: "Подробное описание впечатления и всех включенных услуг...",
      shortDescription: "Незабываемое приключение, которое останется в памяти навсегда!",
      originalPrice,
      discountPercentage: discount,
      discountedPrice: Math.round(originalPrice * (1 - discount / 100)),
      images: generateDealImages(index + 40),
      location: {
        address: [
          "ул. Новый Арбат, 21",
          "Красная площадь, 3",
          "Парк Горького",
          "ВДНХ, павильон 4"
        ][index % 4],
        city: "Москва",
        coordinates: {
          lat: 55.75 + (Math.random() - 0.5) * 0.1,
          lng: 37.62 + (Math.random() - 0.5) * 0.1
        }
      },
      category: subcategory.name,
      subcategory: subcategory.id,
      mainCategory: "impressions",
      tags: ["впечатления", "подарок", "развлечения"],
      soldCount: Math.floor(Math.random() * 300),
      rating: 3.5 + Math.random() * 1.5,
      reviewCount: Math.floor(Math.random() * 100) + 30,
      features,
      conditions: ["Предварительная запись", "Действительно 3 месяца", "Ограниченное количество мест"],
      sellerId: `seller-${index % 5 + 1}`,
      createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      expiresAt: new Date(Date.now() + Math.random() * 10000000000).toISOString()
    };
    return deal;
  })
];

// Add mock users
export const mockUsers: User[] = [
  {
    id: "u1",
    email: "test@example.com",
    firstName: "Алексей",
    lastName: "Иванов",
    role: "user",
    purchasedDeals: ["coupon-1", "impression-2", "housing-5"],
    savedDeals: ["coupon-3", "coupon-4", "impression-7", "housing-9"],
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
