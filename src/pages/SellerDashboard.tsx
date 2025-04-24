import { useState } from "react";
import { Link } from "react-router-dom";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ImageCarousel } from "@/components/ui/image-carousel";
import {
  BadgePlus,
  Package,
  MessageCircle,
  BarChart,
  Settings,
  MoreVertical,
  Edit,
  Eye,
  Copy,
  Trash,
  Plus,
} from "lucide-react";
import { mockDeals, mockUsers, mockMessages } from "@/data/mockData";
import { useToast } from "@/components/ui/use-toast";

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState("deals");
  const { toast } = useToast();
  
  // Get seller data
  const seller = mockUsers.find(user => user.role === "seller" && user.id === "s1");
  
  // Filter deals to only include this seller's deals
  const sellerDeals = mockDeals.filter(deal => deal.sellerId === seller?.id);
  
  // Simulate orders data
  const orders = [
    {
      id: "ORD123456",
      dealId: sellerDeals[0]?.id || "1",
      dealTitle: sellerDeals[0]?.title || "СПА-день в luxury отеле",
      customerName: "Алексей Иванов",
      date: "2025-04-10",
      price: sellerDeals[0]?.discountedPrice || 3600,
      status: "completed",
    },
    {
      id: "ORD123457",
      dealId: sellerDeals[0]?.id || "1",
      dealTitle: sellerDeals[0]?.title || "СПА-день в luxury отеле",
      customerName: "Мария Петрова",
      date: "2025-04-11",
      price: sellerDeals[0]?.discountedPrice || 3600,
      status: "pending",
    },
  ];

  const handleNewDeal = () => {
    toast({
      title: "Черновик создан",
      description: "Новый черновик акции был успешно создан.",
    });
  };

  const handleDeleteDeal = () => {
    toast({
      title: "Акция удалена",
      description: "Акция была успешно удалена.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <div className="container px-4 md:px-6 py-8">
          {/* Seller Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div className="flex items-center">
              <div className="w-16 h-16 mr-4 rounded-full bg-gray-300 overflow-hidden">
                {seller?.avatar ? (
                  <img
                    src={seller.avatar}
                    alt={`${seller.firstName} ${seller.lastName}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-orange-200 text-orange-800 text-2xl font-semibold">
                    {seller?.firstName.charAt(0) || "S"}
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  {seller?.firstName} {seller?.lastName || "Петрова"}
                </h1>
                <p className="text-gray-500">Кабинет продавца</p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full md:w-auto">
                  <BadgePlus className="mr-2 h-4 w-4" />
                  Создать акцию
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Создать новую акцию</DialogTitle>
                  <DialogDescription>
                    Создайте новую акцию, заполнив необходимые поля
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                  <div>
                    <Label htmlFor="deal-name">Название акции</Label>
                    <Input id="deal-name" placeholder="Введите название акции" />
                  </div>
                  <div>
                    <Label htmlFor="deal-category">Категория</Label>
                    <Input id="deal-category" placeholder="Выберите категорию" />
                  </div>
                  <div>
                    <Label htmlFor="deal-price">Обычная цена (₽)</Label>
                    <Input id="deal-price" type="number" placeholder="0" />
                  </div>
                  <div>
                    <Label htmlFor="deal-discount">Цена со скидкой (₽)</Label>
                    <Input id="deal-discount" type="number" placeholder="0" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">Отмена</Button>
                  <Button onClick={handleNewDeal}>Создать черновик</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Акции</p>
                    <p className="text-2xl font-bold">{sellerDeals.length}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <Package className="h-5 w-5 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Заказов</p>
                    <p className="text-2xl font-bold">{orders.length}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <BarChart className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Выручка</p>
                    <p className="text-2xl font-bold">{(orders.reduce((acc, order) => acc + order.price, 0)).toLocaleString('ru-RU')} ₽</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Новые сообщения</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dashboard Tabs */}
          <Tabs
            defaultValue={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="w-full justify-start bg-gray-100/80 p-1">
              <TabsTrigger value="deals" className="flex items-center">
                <Package className="mr-2 h-4 w-4" />
                Мои акции
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center">
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
                Заказы
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center">
                <MessageCircle className="mr-2 h-4 w-4" />
                Сообщения
                <span className="ml-1 bg-orange-500 text-white text-xs px-1.5 rounded-full">
                  3
                </span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center">
                <BarChart className="mr-2 h-4 w-4" />
                Аналитика
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Настройки
              </TabsTrigger>
            </TabsList>

            {/* My Deals */}
            <TabsContent value="deals">
              <div className="grid gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Мои акции</CardTitle>
                    <CardDescription>
                      Управляйте существующими и создавайте новые акции
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row justify-between gap-2">
                        <Input
                          placeholder="Поиск акций..."
                          className="max-w-md"
                        />
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button>
                              <Plus className="mr-2 h-4 w-4" />
                              Новая акция
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-lg">
                            <DialogHeader>
                              <DialogTitle>Создать акцию</DialogTitle>
                              <DialogDescription>
                                Заполните форму для создания новой акции
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="title">Название</Label>
                                  <Input id="title" placeholder="Название акции" />
                                </div>
                                <div>
                                  <Label htmlFor="category">Категория</Label>
                                  <Input id="category" placeholder="Выберите категорию" />
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor="original-price">Обычная цена (₽)</Label>
                                  <Input id="original-price" type="number" placeholder="0" />
                                </div>
                                <div>
                                  <Label htmlFor="discount-price">Цена со скидкой (₽)</Label>
                                  <Input id="discount-price" type="number" placeholder="0" />
                                </div>
                              </div>
                              <div>
                                <Label htmlFor="description">Описание</Label>
                                <Textarea
                                  id="description"
                                  placeholder="Подробное описание акции"
                                  rows={4}
                                />
                              </div>
                              <div>
                                <Label>Загрузить изображения</Label>
                                <div className="mt-2 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
                                  <div className="space-y-1 text-center">
                                    <svg
                                      className="mx-auto h-12 w-12 text-gray-400"
                                      stroke="currentColor"
                                      fill="none"
                                      viewBox="0 0 48 48"
                                    >
                                      <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                    <p className="text-sm text-gray-500">
                                      Перетащите изображения сюда или{" "}
                                      <span className="text-orange-600 font-medium">выберите файлы</span>
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      PNG, JPG, GIF до 10MB
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Отмена</Button>
                              <Button onClick={handleNewDeal}>Создать</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>

                      <div className="border rounded-md">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[250px]">Название акции</TableHead>
                              <TableHead>Категория</TableHead>
                              <TableHead>Цена</TableHead>
                              <TableHead>Скидка</TableHead>
                              <TableHead>Статус</TableHead>
                              <TableHead className="text-right">Действия</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {sellerDeals.length > 0 ? (
                              sellerDeals.map((deal) => (
                                <TableRow key={deal.id}>
                                  <TableCell>
                                    <div className="font-medium">{deal.title}</div>
                                  </TableCell>
                                  <TableCell>{deal.category}</TableCell>
                                  <TableCell>
                                    <div className="flex flex-col">
                                      <span className="text-gray-500 line-through text-xs">
                                        {deal.originalPrice.toLocaleString('ru-RU')} ₽
                                      </span>
                                      <span className="font-medium">
                                        {deal.discountedPrice.toLocaleString('ru-RU')} ₽
                                      </span>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 inline-block">
                                      -{deal.discountPercentage}%
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 inline-block">
                                      Активно
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                          <MoreVertical className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                          <Edit className="mr-2 h-4 w-4" />
                                          <span>Редактировать</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Eye className="mr-2 h-4 w-4" />
                                          <span>Просмотр</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                          <Copy className="mr-2 h-4 w-4" />
                                          <span>Дублировать</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          className="text-red-600 focus:text-red-700"
                                          onClick={handleDeleteDeal}
                                        >
                                          <Trash className="mr-2 h-4 w-4" />
                                          <span>Удалить</span>
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={6} className="text-center">
                                  <div className="py-6">
                                    <p className="text-gray-500 mb-2">У вас пока нет акций</p>
                                    <Button>
                                      <Plus className="mr-2 h-4 w-4" />
                                      Создать акцию
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Orders */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Заказы</CardTitle>
                  <CardDescription>
                    Просматривайте и управляйте заказами ваших клиентов
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-2 justify-between">
                      <Input
                        placeholder="Поиск заказов..."
                        className="max-w-md"
                      />
                      <div className="flex gap-2">
                        <Button variant="outline">Экспорт</Button>
                        <Button variant="outline">Фильтры</Button>
                      </div>
                    </div>

                    <div className="border rounded-md">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>№ Заказа</TableHead>
                            <TableHead>Название акции</TableHead>
                            <TableHead>Клиент</TableHead>
                            <TableHead>Дата</TableHead>
                            <TableHead>Сумма</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead className="text-right">Действия</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell>
                                <div className="font-medium">{order.id}</div>
                              </TableCell>
                              <TableCell>{order.dealTitle}</TableCell>
                              <TableCell>{order.customerName}</TableCell>
                              <TableCell>
                                {new Date(order.date).toLocaleDateString("ru-RU")}
                              </TableCell>
                              <TableCell>
                                {order.price.toLocaleString("ru-RU")} ₽
                              </TableCell>
                              <TableCell>
                                <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                                  order.status === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}>
                                  {order.status === "completed" ? "Выполнен" : "Ожидает"}
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Eye className="mr-2 h-4 w-4" />
                                      <span>Просмотр деталей</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                                      </svg>
                                      <span>Скачать чек</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <MessageCircle className="mr-2 h-4 w-4" />
                                      <span>Написать клиенту</span>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Messages */}
            <TabsContent value="messages">
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-1 overflow-hidden">
                  <CardHeader className="bg-gray-50 py-3">
                    <CardTitle className="text-lg">Чаты</CardTitle>
                  </CardHeader>
                  <div className="overflow-y-auto max-h-[600px]">
                    <div className="bg-orange-50 p-3 border-b cursor-pointer hover:bg-orange-100 flex items-center">
                      <div className="w-10 h-10 mr-3 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
                        <img
                          src="https://randomuser.me/api/portraits/men/44.jpg"
                          alt="Алексей Иванов"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-medium">Алексей Иванов</h3>
                          <span className="text-xs text-gray-500">11:23</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          Спасибо за быстрый ответ! Хотел бы перенести на следующую субботу...
                        </p>
                      </div>
                      <div className="ml-2 w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs">
                        1
                      </div>
                    </div>
                    
                    <div className="p-3 border-b cursor-pointer hover:bg-gray-50 flex items-center">
                      <div className="w-10 h-10 mr-3 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
                        <img
                          src="https://randomuser.me/api/portraits/women/33.jpg"
                          alt="Мария Смирнова"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-medium">Мария Смирнова</h3>
                          <span className="text-xs text-gray-500">Вчера</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          Добрый день! Можно ли получить дополнительную скидку при бронировании для группы?
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-orange-50 p-3 border-b cursor-pointer hover:bg-orange-100 flex items-center">
                      <div className="w-10 h-10 mr-3 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
                        <div className="w-full h-full flex items-center justify-center bg-orange-200 text-orange-800">
                          Д
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-medium">Дмитрий Козлов</h3>
                          <span className="text-xs text-gray-500">15.04</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">
                          Здравствуйте! Интересует ваша акция. Есть вопрос по доступным датам...
                        </p>
                      </div>
                      <div className="ml-2 w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs">
                        2
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="md:col-span-2 overflow-hidden">
                  <CardHeader className="bg-gray-50 py-3 border-b">
                    <div className="flex items-center">
                      <div className="w-8 h-8 mr-2 rounded-full bg-gray-300 overflow-hidden">
                        <img
                          src="https://randomuser.me/api/portraits/men/44.jpg"
                          alt="Алексей Иванов"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-lg">
                        Алексей Иванов
                      </CardTitle>
                    </div>
                  </CardHeader>
                  
                  <div className="p-4 h-[400px] overflow-y-auto flex flex-col gap-3">
                    <div className="max-w-[75%] p-3 rounded-lg bg-gray-100">
                      <p>Здравствуйте! Хотел уточнить, можно ли перенести забронированное время посещения СПА?</p>
                      <div className="text-xs text-gray-500 mt-1 text-right">
                        10:30
                      </div>
                    </div>
                    
                    <div className="max-w-[75%] p-3 rounded-lg bg-orange-100 ml-auto">
                      <p>Добрый день! Да, конечно, вы можете перенести время. Напишите, пожалуйста, на какую дату и время вы хотели бы перенести визит.</p>
                      <div className="text-xs text-gray-500 mt-1 text-right">
                        11:15
                      </div>
                    </div>
                    
                    <div className="max-w-[75%] p-3 rounded-lg bg-gray-100">
                      <p>Спасибо за быстрый ответ! Хотел бы перенести на следующую субботу, примерно на 14:00.</p>
                      <div className="text-xs text-gray-500 mt-1 text-right">
                        11:30
                      </div>
                    </div>
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

            {/* Analytics */}
            <TabsContent value="analytics">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Продажи по месяцам</CardTitle>
                    <CardDescription>
                      Сравнение продаж за последние 6 мес��цев
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center">
                    <div className="text-center p-6 border border-dashed rounded-lg w-full">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        ></path>
                      </svg>
                      <p className="mt-2 text-gray-500">
                        В этом демо режиме данные аналитики не доступны
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Популярные акции</CardTitle>
                    <CardDescription>
                      Наиболее часто покупаемые акции
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center">
                    <div className="text-center p-6 border border-dashed rounded-lg w-full">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                        ></path>
                      </svg>
                      <p className="mt-2 text-gray-500">
                        В этом демо режиме данные аналитики не доступны
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Отчет по посещаемости</CardTitle>
                    <CardDescription>
                      Статистика посещений страниц с вашими акциями
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center">
                    <div className="text-center p-6 border border-dashed rounded-lg w-full">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <p className="mt-2 text-gray-500">
                        В этом демо режиме данные аналитики не доступны
                      </p>
                      <Button variant="outline" className="mt-4">
                        Экспорт данных
                      </Button>
                    </div>
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
                      Обновите информацию о вашей компании
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Название компании</Label>
                        <Input
                          id="companyName"
                          defaultValue="СПА-центр Релакс"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactPerson">Контактное лицо</Label>
                        <Input
                          id="contactPerson"
                          defaultValue={`${seller?.firstName || 'Елена'} ${seller?.lastName || 'Петрова'}`}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="businessEmail">Email</Label>
                      <Input
                        id="businessEmail"
                        type="email"
                        defaultValue={seller?.email || 'spa@example.com'}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input
                        id="phone"
                        type="tel"
                        defaultValue="+7 (495) 123-45-67"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Адрес</Label>
                      <Input
                        id="address"
                        defaultValue="ул. Тверская, 22, Москва"
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
                              Получать уведомления о новых заказах
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
                            defaultChecked={seller?.telegramNotifications}
                          />
                        </div>
                        
                        <div className="pt-2">
                          <Label htmlFor="telegramUsername">Ваш Telegram username</Label>
                          <div className="flex mt-1 gap-2">
                            <Input
                              id="telegramUsername"
                              placeholder="@username"
                              defaultValue="@spa_center"
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
                    <CardTitle>Настройки акций</CardTitle>
                    <CardDescription>
                      Базовые настройки для ваших акций
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="defaultValidPeriod">Срок действия купонов по умолчанию (дни)</Label>
                      <Input
                        id="defaultValidPeriod"
                        type="number"
                        defaultValue="90"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="allowRescheduling" className="font-medium">
                          Разрешить перенос брони
                        </Label>
                        <p className="text-sm text-gray-500">
                          Клиенты смогут переносить забронированное время
                        </p>
                      </div>
                      <Switch id="allowRescheduling" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="showRemainingAmount" className="font-medium">
                          Показывать остаток купонов
                        </Label>
                        <p className="text-sm text-gray-500">
                          Отображать на странице акции количество оставшихся купонов
                        </p>
                      </div>
                      <Switch id="showRemainingAmount" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Сохранить настройки</Button>
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

export default SellerDashboard;
