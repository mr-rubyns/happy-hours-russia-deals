
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle 
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, AlertCircle, MessageSquare, Flag, ThumbsUp, ThumbsDown } from "lucide-react";
import { mockDeals } from "@/data/mockData";
import { Deal } from "@/types";

interface ExtendedDeal extends Deal {
  status: string;
  submittedDate: string;
  merchant?: {
    name: string;
  };
}

const AdminModeration = () => {
  const [activeTab, setActiveTab] = useState("pending-deals");
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Mock data for pending moderation
  const pendingDeals: ExtendedDeal[] = mockDeals.slice(0, 5).map(deal => ({
    ...deal,
    submittedDate: "2025-04-23",
    status: "pending",
    merchant: { name: `Продавец ${deal.sellerId.slice(0, 4)}` }
  }));

  // Mock data for reported content
  const reportedContent = [
    {
      id: "REP001",
      type: "review",
      content: "Ужасное обслуживание, не рекомендую этот ресторан никому!",
      dealTitle: "Скидка 50% на все меню в ресторане 'У Михалыча'",
      reportedBy: "Александр Иванов",
      reportReason: "Оскорбительный контент",
      reportDate: "2025-04-23",
      status: "pending"
    },
    {
      id: "REP002",
      type: "comment",
      content: "Полный развод, купоны не принимают в этом заведении!",
      dealTitle: "СПА-день для двоих со скидкой 30%",
      reportedBy: "Мария Петрова",
      reportReason: "Недостоверная информация",
      reportDate: "2025-04-22",
      status: "pending"
    },
    {
      id: "REP003",
      type: "review",
      content: "Крайне непрофессиональный персонал, товар бракованный.",
      dealTitle: "Скидка 70% на модную одежду",
      reportedBy: "Дмитрий Сидоров",
      reportReason: "Спам",
      reportDate: "2025-04-21",
      status: "pending"
    }
  ];

  // Mock support tickets
  const supportTickets = [
    {
      id: "TICKET001",
      subject: "Проблема с активацией купона",
      user: "Елена Смирнова",
      userType: "customer",
      priority: "high",
      createdDate: "2025-04-23",
      status: "open",
      lastUpdate: "2025-04-23"
    },
    {
      id: "TICKET002",
      subject: "Не могу опубликовать акцию",
      user: "Павел Козлов",
      userType: "seller",
      priority: "medium",
      createdDate: "2025-04-22",
      status: "open",
      lastUpdate: "2025-04-22"
    },
    {
      id: "TICKET003",
      subject: "Вопрос по комиссии платформы",
      user: "Татьяна Николаева",
      userType: "seller",
      priority: "low",
      createdDate: "2025-04-21",
      status: "open",
      lastUpdate: "2025-04-23"
    }
  ];

  const handleApprove = (itemId: string) => {
    console.log("Approved item:", itemId);
    setIsDialogOpen(false);
  };

  const handleReject = (itemId: string) => {
    console.log("Rejected item:", itemId);
    setIsDialogOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "pending-deals":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Акции на модерации</CardTitle>
              <CardDescription>
                Проверка и подтверждение акций перед публикацией
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Название</TableHead>
                    <TableHead>Продавец</TableHead>
                    <TableHead>Категория</TableHead>
                    <TableHead>Скидка</TableHead>
                    <TableHead>Дата подачи</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingDeals.map((deal) => (
                    <TableRow key={deal.id}>
                      <TableCell className="font-medium">{deal.title}</TableCell>
                      <TableCell>{deal.merchant?.name || `Продавец ${deal.sellerId.slice(0, 4)}`}</TableCell>
                      <TableCell>{deal.subcategory}</TableCell>
                      <TableCell>{deal.discountPercentage}%</TableCell>
                      <TableCell>{deal.submittedDate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex items-center gap-1 text-xs"
                            onClick={() => {
                              setSelectedItem(deal);
                              setIsDialogOpen(true);
                            }}
                          >
                            <AlertCircle className="h-3 w-3" /> Детали
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex items-center gap-1 bg-green-50 border-green-200 text-green-700 hover:bg-green-100 text-xs"
                            onClick={() => handleApprove(deal.id)}
                          >
                            <CheckCircle className="h-3 w-3" /> Одобрить
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex items-center gap-1 bg-red-50 border-red-200 text-red-700 hover:bg-red-100 text-xs"
                            onClick={() => handleReject(deal.id)}
                          >
                            <XCircle className="h-3 w-3" /> Отклонить
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );

      case "reported-content":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Жалобы на контент</CardTitle>
              <CardDescription>
                Обработка жалоб пользователей на отзывы и комментарии
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Тип</TableHead>
                    <TableHead>Контент</TableHead>
                    <TableHead>Акция</TableHead>
                    <TableHead>Причина жалобы</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportedContent.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono text-xs">{item.id}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {item.type === "review" ? "Отзыв" : "Комментарий"}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{item.content}</TableCell>
                      <TableCell className="max-w-xs truncate">{item.dealTitle}</TableCell>
                      <TableCell>{item.reportReason}</TableCell>
                      <TableCell>{item.reportDate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 text-xs"
                            onClick={() => {
                              setSelectedItem(item);
                              setIsDialogOpen(true);
                            }}
                          >
                            <AlertCircle className="h-3 w-3" /> Детали
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex items-center gap-1 bg-green-50 border-green-200 text-green-700 hover:bg-green-100 text-xs"
                            onClick={() => handleApprove(item.id)}
                          >
                            <ThumbsUp className="h-3 w-3" /> Оставить
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex items-center gap-1 bg-red-50 border-red-200 text-red-700 hover:bg-red-100 text-xs"
                            onClick={() => handleReject(item.id)}
                          >
                            <ThumbsDown className="h-3 w-3" /> Удалить
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );

      case "support-tickets":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Запросы в поддержку</CardTitle>
              <CardDescription>
                Обработка запросов пользователей и продавцов
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Тема</TableHead>
                    <TableHead>Пользователь</TableHead>
                    <TableHead>Тип</TableHead>
                    <TableHead>Приоритет</TableHead>
                    <TableHead>Создан</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {supportTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-mono text-xs">{ticket.id}</TableCell>
                      <TableCell className="max-w-xs truncate">{ticket.subject}</TableCell>
                      <TableCell>{ticket.user}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {ticket.userType === "seller" ? "Продавец" : "Покупатель"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            ticket.priority === "high" ? "bg-red-500" :
                            ticket.priority === "medium" ? "bg-yellow-500" :
                            "bg-green-500"
                          }
                        >
                          {ticket.priority === "high" ? "Высокий" :
                           ticket.priority === "medium" ? "Средний" :
                           "Низкий"}
                        </Badge>
                      </TableCell>
                      <TableCell>{ticket.createdDate}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                          {ticket.status === "open" ? "Открыт" : "Закрыт"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex items-center gap-1 text-xs"
                          onClick={() => {
                            setSelectedItem(ticket);
                            setIsDialogOpen(true);
                          }}
                        >
                          <MessageSquare className="h-3 w-3" /> Ответить
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Акции на проверке</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingDeals.length}</div>
            <p className="text-xs text-muted-foreground">Требуют модерации</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Жалобы на контент</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportedContent.length}</div>
            <p className="text-xs text-muted-foreground">Ожидают рассмотрения</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Запросы в поддержку</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{supportTickets.length}</div>
            <p className="text-xs text-muted-foreground">Требуют ответа</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Tabs defaultValue="pending-deals" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="pending-deals" className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" /> Акции на модерации
            </TabsTrigger>
            <TabsTrigger value="reported-content" className="flex items-center gap-2">
              <Flag className="h-4 w-4" /> Жалобы
            </TabsTrigger>
            <TabsTrigger value="support-tickets" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" /> Поддержка
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {renderContent()}

      {selectedItem && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {activeTab === "pending-deals" ? "Детали акции" : 
                 activeTab === "reported-content" ? "Детали жалобы" : 
                 "Детали запроса в поддержку"}
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              {activeTab === "pending-deals" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-1">
                      <div className="aspect-square bg-gray-200 rounded-md overflow-hidden">
                        <img 
                          src={selectedItem.images?.[0] || ''} 
                          alt={selectedItem.title} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    </div>
                    <div className="col-span-2 space-y-4">
                      <h2 className="text-xl font-bold">{selectedItem.title}</h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Продавец</p>
                          <p className="font-medium">{selectedItem.merchant?.name || `Продавец ${selectedItem.sellerId?.slice(0, 4) || 'Неизвестно'}`}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Категория</p>
                          <p className="font-medium">{selectedItem.subcategory}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Цена со скидкой</p>
                          <p className="text-xl font-bold">{selectedItem.discountedPrice} ₽</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Обычная цена</p>
                          <p className="text-lg line-through text-gray-500">{selectedItem.originalPrice} ₽</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Описание</p>
                        <p>{selectedItem.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button 
                      variant="outline" 
                      className="bg-red-50 text-red-700 border-red-200"
                      onClick={() => handleReject(selectedItem.id)}
                    >
                      <XCircle className="h-4 w-4 mr-2" /> Отклонить
                    </Button>
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApprove(selectedItem.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" /> Одобрить
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === "reported-content" && (
                <div className="space-y-4">
                  <div className="border rounded-md p-4 bg-gray-50">
                    <p className="text-sm text-gray-500 mb-1">Контент:</p>
                    <p className="font-medium">{selectedItem.content}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Тип контента</p>
                      <p className="font-medium">{selectedItem.type === "review" ? "Отзыв" : "Комментарий"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Относится к акции</p>
                      <p className="font-medium truncate max-w-xs">{selectedItem.dealTitle}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Кто пожаловался</p>
                      <p className="font-medium">{selectedItem.reportedBy}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Причина жалобы</p>
                      <p className="font-medium">{selectedItem.reportReason}</p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button 
                      variant="outline" 
                      className="bg-red-50 text-red-700 border-red-200"
                      onClick={() => handleReject(selectedItem.id)}
                    >
                      <ThumbsDown className="h-4 w-4 mr-2" /> Удалить контент
                    </Button>
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApprove(selectedItem.id)}
                    >
                      <ThumbsUp className="h-4 w-4 mr-2" /> Оставить контент
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === "support-tickets" && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-lg">{selectedItem.subject}</h3>
                    <p className="text-sm text-gray-500">
                      {selectedItem.user} ({selectedItem.userType === "seller" ? "продавец" : "покупатель"}) • 
                      {selectedItem.createdDate}
                    </p>
                  </div>
                  <div className="border rounded-md p-4 bg-gray-50 min-h-[100px]">
                    <p className="text-sm">Содержимое запроса в поддержку будет отображаться здесь...</p>
                  </div>
                  <div>
                    <label htmlFor="reply" className="block text-sm font-medium mb-1">
                      Ваш ответ
                    </label>
                    <textarea 
                      id="reply" 
                      className="w-full min-h-[150px] p-3 border rounded-md"
                      placeholder="Введите ответ на запрос..."
                    ></textarea>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button 
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Отмена
                    </Button>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" /> Отправить ответ
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminModeration;
