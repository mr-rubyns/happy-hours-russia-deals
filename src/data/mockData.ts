
import { Deal, Review, User, Message } from "../types";

export const categories = [
  { name: "Красота и СПА", id: "beauty-spa" },
  { name: "Развлечения", id: "entertainment" },
  { name: "Авто и Дом", id: "auto-home" },
  { name: "Еда и Напитки", id: "food-drink" },
  { name: "Подарки", id: "gifts" },
  { name: "Местные", id: "local" },
  { name: "Путешествия", id: "travel" },
  { name: "Товары", id: "goods" },
  { name: "Купоны", id: "coupons" },
];

export const mockDeals: Deal[] = [
  {
    id: "1",
    title: "СПА-день в luxury отеле с бассейном и сауной",
    slug: "spa-day-luxury-hotel",
    description: "Насладитесь полноценным СПА-днем в роскошном отеле. В программу входит посещение бассейна, сауны, турецкого хаммама, а также часовой массаж на выбор. В стоимость также включен легкий обед в ресторане отеля. Идеальный подарок для себя или близкого человека.",
    shortDescription: "Полный день релаксации с массажем и посещением СПА-зоны",
    originalPrice: 8000,
    discountedPrice: 3600,
    discountPercentage: 55,
    images: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1740&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?q=80&w=1740&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1740&auto=format&fit=crop"
    ],
    location: {
      address: "ул. Тверская, 22",
      city: "Москва",
      coordinates: {
        lat: 55.762,
        lng: 37.601,
      },
    },
    category: "Красота и СПА",
    subcategory: "СПА и массаж",
    tags: ["спа", "массаж", "бассейн", "релаксация"],
    soldCount: 482,
    rating: 4.8,
    reviewCount: 215,
    features: [
      "Доступ к бассейну и сауне",
      "60-минутный массаж на выбор",
      "Легкий обед включен",
      "VIP-зона отдыха"
    ],
    conditions: [
      "Необходима предварительная запись",
      "Действует в будние и выходные дни",
      "Срок действия купона - 3 месяца",
      "При отмене менее чем за 24 часа взимается полная стоимость"
    ],
    sellerId: "s1",
    createdAt: "2025-03-15",
    expiresAt: "2025-06-15",
  },
  {
    id: "2",
    title: "Ужин для двоих в ресторане высокой кухни",
    slug: "dinner-for-two-high-cuisine",
    description: "Романтический ужин для двоих в изысканном ресторане, отмеченном гидом Мишлен. В меню входит приветственный бокал шампанского, закуски, основное блюдо на выбор, десерт и чай/кофе. Идеальное предложение для особого случая или свидания.",
    shortDescription: "Изысканный ужин для двоих с приветственным шампанским",
    originalPrice: 12000,
    discountedPrice: 6000,
    discountPercentage: 50,
    images: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1740&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1740&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=1740&auto=format&fit=crop"
    ],
    location: {
      address: "ул. Никольская, 10",
      city: "Москва",
      coordinates: {
        lat: 55.756,
        lng: 37.622,
      },
    },
    category: "Еда и Напитки",
    subcategory: "Рестораны",
    tags: ["ужин", "ресторан", "романтика", "высокая кухня"],
    soldCount: 327,
    rating: 4.9,
    reviewCount: 186,
    features: [
      "Меню из 4 блюд",
      "Бокал шампанского в подарок",
      "Романтическая атмосфера",
      "Отмеченный наградами шеф-повар"
    ],
    conditions: [
      "Бронирование обязательно, минимум за 48 часов",
      "Действительно с воскресенья по четверг",
      "Срок действия купона - 2 месяца",
      "Дополнительные напитки оплачиваются отдельно"
    ],
    sellerId: "s2",
    createdAt: "2025-03-18",
    expiresAt: "2025-05-18",
  },
  {
    id: "3",
    title: "Семейный абонемент в аквапарк на 5 посещений",
    slug: "family-aquapark-pass",
    description: "Абонемент на 5 посещений крупнейшего аквапарка города для всей семьи (2 взрослых и до 3 детей). В парке более 20 различных горок, волновой бассейн, ленивая река и специальная зона для малышей. Каждое посещение до 4 часов в любой день недели.",
    shortDescription: "Пять посещений аквапарка для всей семьи",
    originalPrice: 15000,
    discountedPrice: 7500,
    discountPercentage: 50,
    images: [
      "https://images.unsplash.com/photo-1582553391226-a74f0bd89d49?q=80&w=1742&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?q=80&w=1635&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1887&auto=format&fit=crop"
    ],
    location: {
      address: "Проспект Мира, 211к2",
      city: "Москва",
      coordinates: {
        lat: 55.832,
        lng: 37.639,
      },
    },
    category: "Развлечения",
    subcategory: "Аквапарки",
    tags: ["аквапарк", "семейный отдых", "развлечения", "дети"],
    soldCount: 643,
    rating: 4.6,
    reviewCount: 320,
    features: [
      "5 посещений по 4 часа каждое",
      "Доступ ко всем аттракционам",
      "Специальная детская зона",
      "Шкафчик для вещей включен"
    ],
    conditions: [
      "Действителен в любой день недели",
      "Срок действия абонемента - 6 месяцев",
      "Дети до 3 лет бесплатно",
      "Необходимо иметь с собой купальные принадлежности"
    ],
    sellerId: "s3",
    createdAt: "2025-03-10",
    expiresAt: "2025-09-10",
  },
  {
    id: "4",
    title: "Полет в аэротрубе для двоих",
    slug: "wind-tunnel-flight-for-two",
    description: "Испытайте невероятные ощущения полета в вертикальной аэротрубе. Предложение включает инструктаж, экипировку и два полета по 2 минуты для каждого участника под руководством профессионального инструктора. Незабываемые впечатления и адреналин гарантированы!",
    shortDescription: "Два полета в аэротрубе с инструктором",
    originalPrice: 7000,
    discountedPrice: 3850,
    discountPercentage: 45,
    images: [
      "https://images.unsplash.com/photo-1558114397-02987e377a2c?q=80&w=1632&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=1587&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534323123536-410546261297?q=80&w=1696&auto=format&fit=crop"
    ],
    location: {
      address: "ул. Авиаторов, 38",
      city: "Санкт-Петербург",
      coordinates: {
        lat: 59.939,
        lng: 30.315,
      },
    },
    category: "Развлечения",
    subcategory: "Активный отдых",
    tags: ["аэротруба", "полет", "экстрим", "адреналин"],
    soldCount: 275,
    rating: 4.7,
    reviewCount: 142,
    features: [
      "2 полета по 2 минуты для каждого",
      "Профессиональное оборудование",
      "Персональный инструктор",
      "Фото и видеосъемка (оплачивается отдельно)"
    ],
    conditions: [
      "Минимальный возраст - 5 лет",
      "Максимальный вес - 110 кг",
      "Запись минимум за 24 часа",
      "Срок действия купона - 3 месяца"
    ],
    sellerId: "s4",
    createdAt: "2025-03-20",
    expiresAt: "2025-06-20",
  },
  {
    id: "5",
    title: "2 билета на иммерсивное шоу",
    slug: "immersive-show-tickets",
    description: "Станьте частью захватывающего театрального действия, где зрители перемещаются по различным помещениям и взаимодействуют с актерами. Иммерсивный формат позволяет каждому гостю получить уникальный опыт. В стоимость входят 2 билета на вечернее представление в будние дни.",
    shortDescription: "Билеты на интерактивное театральное представление",
    originalPrice: 6000,
    discountedPrice: 3600,
    discountPercentage: 40,
    images: [
      "https://images.unsplash.com/photo-1560177112-fbfd5fde9566?q=80&w=1740&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1740&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=1742&auto=format&fit=crop"
    ],
    location: {
      address: "Театральный проезд, 5",
      city: "Москва",
      coordinates: {
        lat: 55.758,
        lng: 37.621,
      },
    },
    category: "Развлечения",
    subcategory: "Театр",
    tags: ["театр", "иммерсивное шоу", "развлечения", "культура"],
    soldCount: 189,
    rating: 4.9,
    reviewCount: 97,
    features: [
      "2 билета на вечернее представление",
      "Продолжительность шоу - 2 часа",
      "Интерактивное участие",
      "Уникальный сюжет"
    ],
    conditions: [
      "Действительно на представления с понедельника по четверг",
      "Бронирование обязательно",
      "Срок действия купона - 2 месяца",
      "Рекомендуемый возраст 16+"
    ],
    sellerId: "s2",
    createdAt: "2025-03-12",
    expiresAt: "2025-05-12",
  },
  {
    id: "6",
    title: "Мойка автомобиля премиум-класса",
    slug: "premium-car-wash",
    description: "Комплексная мойка автомобиля с использованием премиальной косметики. В услугу входит наружная мойка кузова, чистка колесных дисков, влажная уборка салона, полировка пластиковых поверхностей, мойка ковриков и чернение шин. Подходит для любых типов автомобилей.",
    shortDescription: "Полная мойка авто внутри и снаружи",
    originalPrice: 3500,
    discountedPrice: 1750,
    discountPercentage: 50,
    images: [
      "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=1631&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605164599901-7e001fc5ddd6?q=80&w=1740&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1738&auto=format&fit=crop"
    ],
    location: {
      address: "Кутузовский проспект, 88",
      city: "Москва",
      coordinates: {
        lat: 55.741,
        lng: 37.516,
      },
    },
    category: "Авто и Дом",
    subcategory: "Автоуслуги",
    tags: ["автомобиль", "мойка", "чистка", "премиум"],
    soldCount: 532,
    rating: 4.5,
    reviewCount: 317,
    features: [
      "Комплексная мойка кузова",
      "Влажная уборка салона",
      "Чистка колесных дисков",
      "Полировка пластиковых поверхностей"
    ],
    conditions: [
      "Действует ежедневно",
      "Без предварительной записи",
      "Срок действия купона - 3 месяца",
      "Доплата за внедорожники и минивэны"
    ],
    sellerId: "s5",
    createdAt: "2025-03-25",
    expiresAt: "2025-06-25",
  },
];

export const mockUsers: User[] = [
  {
    id: "u1",
    email: "user@example.com",
    firstName: "Алексей",
    lastName: "Иванов",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    role: "user",
    purchasedDeals: ["1", "3"],
    savedDeals: ["2", "4"],
    telegramNotifications: true,
  },
  {
    id: "s1",
    email: "spa@example.com",
    firstName: "Елена",
    lastName: "Петрова",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    role: "seller",
    telegramNotifications: true,
  },
  {
    id: "s2",
    email: "restaurant@example.com",
    firstName: "Михаил",
    lastName: "Сидоров",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "seller",
    telegramNotifications: false,
  },
  {
    id: "s3",
    email: "aquapark@example.com",
    firstName: "Ольга",
    lastName: "Кузнецова",
    role: "seller",
    telegramNotifications: true,
  },
  {
    id: "s4",
    email: "tunnel@example.com",
    firstName: "Игорь",
    lastName: "Смирнов",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    role: "seller",
    telegramNotifications: false,
  },
  {
    id: "s5",
    email: "carwash@example.com",
    firstName: "Андрей",
    lastName: "Васильев",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    role: "seller",
    telegramNotifications: true,
  },
];

export const mockReviews: Review[] = [
  {
    id: "r1",
    dealId: "1",
    userId: "u1",
    userName: "Алексей И.",
    userAvatar: "https://randomuser.me/api/portraits/men/44.jpg",
    rating: 5,
    comment: "Отличный СПА-день! Персонал внимательный, массаж на высшем уровне. Обязательно вернусь снова!",
    createdAt: "2025-04-05",
  },
  {
    id: "r2",
    dealId: "1",
    userId: "u2",
    userName: "Мария К.",
    rating: 4,
    comment: "Очень понравилось. Единственное - в выходные много людей, лучше приходить в будни.",
    createdAt: "2025-04-03",
  },
  {
    id: "r3",
    dealId: "2",
    userId: "u3",
    userName: "Дмитрий С.",
    userAvatar: "https://randomuser.me/api/portraits/men/33.jpg",
    rating: 5,
    comment: "Замечательный ужин! Атмосфера романтичная, еда превосходная. Отличное соотношение цена-качество по акции.",
    createdAt: "2025-04-01",
  }
];

export const mockMessages: Message[] = [
  {
    id: "m1",
    senderId: "u1",
    receiverId: "s1",
    content: "Здравствуйте! Хотел уточнить, можно ли перенести забронированное время посещения СПА?",
    read: true,
    createdAt: "2025-04-10T10:30:00",
  },
  {
    id: "m2",
    senderId: "s1",
    receiverId: "u1",
    content: "Добрый день! Да, конечно, вы можете перенести время. Напишите, пожалуйста, на какую дату и время вы хотели бы перенести визит.",
    read: true,
    createdAt: "2025-04-10T11:15:00",
  },
  {
    id: "m3",
    senderId: "u1",
    receiverId: "s1",
    content: "Спасибо за быстрый ответ! Хотел бы перенести на следующую субботу, примерно на 14:00.",
    read: false,
    createdAt: "2025-04-10T11:30:00",
  },
];
