
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { ImageCarousel } from "@/components/ui/image-carousel";
import {
  MessageCircle,
  Clock,
  Calendar as CalendarIcon,
  Settings,
  Heart,
  Book,
  Star,
  Bell,
} from "lucide-react";

import { mockDeals, mockUsers, mockMessages } from "@/data/mockData";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("purchases");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Get mock user data
  const currentUser = mockUsers.find((user) => user.id === "u1");
  
  // Get purchased deals
  const purchasedDeals = currentUser?.purchasedDeals
    ? mockDeals.filter((deal) => currentUser.purchasedDeals?.includes(deal.id))
    : [];
  
  // Get saved deals
  const savedDeals = currentUser?.savedDeals
    ? mockDeals.filter((deal) => currentUser.savedDeals?.includes(deal.id))
    : [];
  
  // Get messages for this user
  const userMessages = mockMessages.filter(
    (msg) => msg.senderId === currentUser?.id || msg.receiverId === currentUser?.id
  );
  
  // Group messages by conversation
  const conversations = userMessages.reduce((acc, message) => {
    const otherUserId = message.senderId === currentUser?.id ? message.receiverId : message.senderId;
    if (!acc[otherUserId]) {
      acc[otherUserId] = [];
    }
    acc[otherUserId].push(message);
    return acc;
  }, {} as Record<string, typeof mockMessages>);
  
  // Sort conversations by latest message
  const sortedConversations = Object.entries(conversations).map(([userId, messages]) => {
    const otherUser = mockUsers.find((user) => user.id === userId);
    const latestMessage = messages.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0];
    
    return {
      userId,
      otherUser,
      latestMessage,
      unreadCount: messages.filter((msg) => !msg.read && msg.senderId === userId).length,
    };
  }).sort(
    (a, b) => new Date(b.latestMessage.createdAt).getTime() - new Date(a.latestMessage.createdAt).getTime()
  );

  useEffect(() => {
    // Check if user is logged in (in a real app)
    // If not, redirect to login page
    const isLoggedIn = true; // Mock login state
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  if (!currentUser) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Пользователь не найден</h1>
            <Link to="/login">
              <Button>Войти</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <div className="container px-4 md:px-6 py-8">
          {/* User Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div className="flex items-center">
              <div className="w-16 h-16 mr-4 rounded-full bg-gray-300 overflow-hidden">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={`${currentUser.firstName} ${currentUser.lastName}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-orange-200 text-orange-800 text-2xl font-semibold">
                    {currentUser.firstName.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  {currentUser.firstName} {currentUser.lastName}
                </h1>
                <p className="text-gray-500">{currentUser.email}</p>
              </div>
            </div>
            <Button className="w-full md:w-auto">
              Редактировать профиль
            </Button>
          </div>

          {/* Dashboard Tabs */}
          <Tabs
            defaultValue={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="w-full justify-start overflow-auto">
              <TabsTrigger value="purchases" className="flex items-center">
                <Book className="mr-2 h-4 w-4" />
                Мои покупки
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center">
                <Heart className="mr-2 h-4 w-4" />
                Избранное
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center">
                <MessageCircle className="mr-2 h-4 w-4" />
                Сообщения
                {sortedConversations.some((conv) => conv.unreadCount > 0) && (
                  <span className="ml-1 bg-orange-500 text-white text-xs px-1.5 rounded-full">
                    {sortedConversations.reduce((acc, conv) => acc + conv.unreadCount, 0)}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex items-center">
                <Star className="mr-2 h-4 w-4" />
                Отзывы
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Календарь
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Настройки
              </TabsTrigger>
            </TabsList>

            {/* Purchased Deals */}
            <TabsContent value="purchases">
              <div className="grid gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Мои покупки</h2>
                  {purchasedDeals.length > 0 ? (
                    <div className="space-y-6">
                      {purchasedDeals.map((deal) => (
                        <Card key={deal.id}>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="md:col-span-1">
                              <ImageCarousel
                                images={deal.images.slice(0, 1)}
                                aspectRatio="video"
                              />
                            </div>
                            <div className="md:col-span-2 p-4">
                              <div className="flex justify-between">
                                <Link to={`/deal/${deal.slug}`}>
                                  <h3 className="text-lg font-semibold hover:text-orange-600">
                                    {deal.title}
                                  </h3>
                                </Link>
                                <span className="text-green-600 font-semibold">
                                  Активно
                                </span>
                              </div>
                              <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                                <Clock className="h-4 w-4" />
                                <span>Действительно до: 15 июля 2025</span>
                              </div>
                              <p className="mt-2 text-gray-600">
                                {deal.shortDescription}
                              </p>
                              <div className="mt-4 flex flex-wrap gap-2">
                                <Button variant="outline" size="sm">
                                  Показать код
                                </Button>
                                <Button variant="outline" size="sm">
                                  Скачать PDF
                                </Button>
                                <Link to={`/reviews/add/${deal.id}`}>
                                  <Button variant="outline" size="sm">
                                    Оставить отзыв
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 mb-4">
                        У вас пока нет купленных акций
                      </p>
                      <Link to="/">
                        <Button>Найти акции</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Saved Deals */}
            <TabsContent value="saved">
              <div className="grid gap-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Избранное</h2>
                  {savedDeals.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {savedDeals.map((deal) => (
                        <Card key={deal.id} className="overflow-hidden">
                          <ImageCarousel
                            images={deal.images}
                            aspectRatio="video"
                          />
                          <CardContent className="p-4">
                            <Link to={`/deal/${deal.slug}`}>
                              <h3 className="font-semibold mb-1 hover:text-orange-600">
                                {deal.title}
                              </h3>
                            </Link>
                            <p className="text-sm text-gray-500 mb-2">
                              {deal.location.address}, {deal.location.city}
                            </p>
                            <div className="flex items-baseline gap-2">
                              <span className="text-orange-600 font-bold">
                                {deal.discountedPrice.toLocaleString('ru-RU')} ₽
                              </span>
                              <span className="text-gray-500 text-sm line-through">
                                {deal.originalPrice.toLocaleString('ru-RU')} ₽
                              </span>
                            </div>
                          </CardContent>
                          <CardFooter className="bg-gray-50 p-4 flex justify-between">
                            <Button variant="outline" size="sm">
                              Удалить
                            </Button>
                            <Link to={`/deal/${deal.slug}`}>
                              <Button size="sm">Купить</Button>
                            </Link>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 mb-4">
                        У вас пока нет избранных акций
                      </p>
                      <Link to="/">
                        <Button>Найти акции</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Messages */}
            <TabsContent value="messages">
              <div className="grid gap-6 md:grid-cols-3">
                {/* Conversations List */}
                <Card className="md:col-span-1 overflow-hidden">
                  <CardHeader className="bg-gray-50 py-3">
                    <CardTitle className="text-lg">Сообщения</CardTitle>
                  </CardHeader>
                  <div className="overflow-y-auto max-h-[600px]">
                    {sortedConversations.map((conversation) => (
                      <div
                        key={conversation.userId}
                        className={`p-3 border-b cursor-pointer hover:bg-gray-50 flex items-center ${
                          conversation.unreadCount > 0 ? "bg-orange-50" : ""
                        }`}
                      >
                        <div className="w-10 h-10 mr-3 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
                          {conversation.otherUser?.avatar ? (
                            <img
                              src={conversation.otherUser.avatar}
                              alt={conversation.otherUser.firstName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-orange-200 text-orange-800">
                              {conversation.otherUser?.firstName.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-baseline">
                            <h3 className="font-medium">
                              {conversation.otherUser?.firstName}{" "}
                              {conversation.otherUser?.lastName}
                            </h3>
                            <span className="text-xs text-gray-500">
                              {new Date(conversation.latestMessage.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {conversation.latestMessage.content}
                          </p>
                        </div>
                        {conversation.unreadCount > 0 && (
                          <div className="ml-2 w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs">
                            {conversation.unreadCount}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {sortedConversations.length === 0 && (
                      <div className="p-6 text-center text-gray-500">
                        <p>У вас пока нет сообщений</p>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Selected Conversation */}
                <Card className="md:col-span-2 overflow-hidden">
                  <CardHeader className="bg-gray-50 py-3 border-b">
                    <div className="flex items-center">
                      <div className="w-8 h-8 mr-2 rounded-full bg-gray-300 overflow-hidden">
                        <img
                          src={mockUsers[1]?.avatar || "https://via.placeholder.com/40"}
                          alt={mockUsers[1]?.firstName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-lg">
                        {mockUsers[1]?.firstName} {mockUsers[1]?.lastName}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  
                  <div className="p-4 h-[400px] overflow-y-auto flex flex-col gap-3">
                    {userMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`max-w-[75%] p-3 rounded-lg ${
                          message.senderId === currentUser.id
                            ? "bg-orange-100 ml-auto"
                            : "bg-gray-100"
                        }`}
                      >
                        <p>{message.content}</p>
                        <div className="text-xs text-gray-500 mt-1 text-right">
                          {new Date(message.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <CardFooter className="border-t p-3">
                    <div className="flex w-full gap-2">
                      <Textarea
                        placeholder="Введите сообщение..."
                        className="flex-grow"
                        rows={1}
                      />
                      <Button>Отправить</Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* Reviews */}
            <TabsContent value="reviews">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Мои отзывы</h2>
                <div className="text-center py-10">
                  <p className="text-gray-500 mb-4">
                    У вас пока нет отзывов
                  </p>
                  {purchasedDeals.length > 0 ? (
                    <div className="space-y-2">
                      <p className="mb-2">Оставьте отзыв о купленных акциях:</p>
                      {purchasedDeals.map((deal) => (
                        <div key={deal.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                          <span className="font-medium">{deal.title}</span>
                          <Link to={`/reviews/add/${deal.id}`}>
                            <Button size="sm">Оставить отзыв</Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Link to="/">
                      <Button>Найти акции</Button>
                    </Link>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Calendar */}
            <TabsContent value="calendar">
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle>Календарь</CardTitle>
                    <CardDescription>
                      Выберите дату для просмотра запланированных акций
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="w-full"
                    />
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>
                      События на{" "}
                      {selectedDate?.toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {purchasedDeals.length > 0 ? (
                      <div className="space-y-4">
                        {purchasedDeals.map((deal) => (
                          <div
                            key={deal.id}
                            className="p-3 border rounded-md flex items-center"
                          >
                            <div className="mr-3 w-12 text-center">
                              <div className="text-xl font-bold">15:00</div>
                            </div>
                            <div>
                              <h3 className="font-medium">{deal.title}</h3>
                              <p className="text-sm text-gray-600">
                                {deal.location.address}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">
                          На эту дату нет запланированных событий
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Settings */}
            <TabsContent value="settings">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Настройки профиля</CardTitle>
                    <CardDescription>
                      Обновите персональную информацию и предпочтения
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Имя</Label>
                        <Input
                          id="firstName"
                          defaultValue={currentUser.firstName}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Фамилия</Label>
                        <Input
                          id="lastName"
                          defaultValue={currentUser.lastName}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={currentUser.email}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>
                    
                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-2">Уведомления</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="emailNotifications" className="font-medium">
                              Email уведомления
                            </Label>
                            <p className="text-sm text-gray-500">
                              Получать уведомления о новых акциях и предложениях
                            </p>
                          </div>
                          <Switch id="emailNotifications" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="telegramNotifications" className="font-medium">
                              Telegram уведомления
                            </Label>
                            <p className="text-sm text-gray-500">
                              Получать уведомления в Telegram
                            </p>
                          </div>
                          <Switch
                            id="telegramNotifications"
                            defaultChecked={currentUser.telegramNotifications}
                          />
                        </div>
                        
                        <div className="pt-2">
                          <Label htmlFor="telegramUsername">Ваш Telegram username</Label>
                          <div className="flex mt-1 gap-2">
                            <Input
                              id="telegramUsername"
                              placeholder="@username"
                            />
                            <Button variant="outline">Подключить</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Отмена</Button>
                    <Button>Сохранить изменения</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Безопасность</CardTitle>
                    <CardDescription>
                      Управляйте безопасностью вашей учетной записи
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Текущий пароль</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Новый пароль</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Подтвердите новый пароль</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Изменить пароль</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserDashboard;
