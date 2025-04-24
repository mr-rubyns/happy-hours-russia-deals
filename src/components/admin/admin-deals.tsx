
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockDeals } from "@/data/mockData";
import { MoreHorizontal, Eye, CheckCircle, XCircle, Search } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDeals = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDeal, setSelectedDeal] = useState<any | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [deals, setDeals] = useState(mockDeals.map(deal => ({
    ...deal,
    status: ["approved", "pending", "rejected"][Math.floor(Math.random() * 3)]
  })));

  const filteredDeals = deals.filter(deal => {
    const matchesFilter = filter === "all" || deal.status === filter;
    const matchesSearch = deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          deal.merchant.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleStatusChange = (dealId: string, status: string) => {
    setDeals(deals.map(deal => 
      deal.id === dealId ? { ...deal, status } : deal
    ));
    setIsDetailsModalOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "approved":
        return <Badge className="bg-green-500">Одобрено</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">На проверке</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">Отклонено</Badge>;
      default:
        return <Badge>Неизвестно</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Управление акциями</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Поиск акций..."
                  className="pl-9 w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Tabs defaultValue="all" value={filter} onValueChange={setFilter}>
                <TabsList>
                  <TabsTrigger value="all">Все</TabsTrigger>
                  <TabsTrigger value="pending">На проверке</TabsTrigger>
                  <TabsTrigger value="approved">Одобренные</TabsTrigger>
                  <TabsTrigger value="rejected">Отклоненные</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Продавец</TableHead>
                <TableHead>Скидка</TableHead>
                <TableHead>Цена</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDeals.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell className="font-medium">{deal.title}</TableCell>
                  <TableCell>{deal.merchant.name}</TableCell>
                  <TableCell>{deal.discountPercent}%</TableCell>
                  <TableCell>{deal.discountedPrice} ₽</TableCell>
                  <TableCell>{deal.subcategory}</TableCell>
                  <TableCell>{getStatusBadge(deal.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Открыть меню</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          onClick={() => {
                            setSelectedDeal(deal);
                            setIsDetailsModalOpen(true);
                          }}
                          className="flex items-center gap-2"
                        >
                          <Eye className="h-4 w-4" /> Посмотреть детали
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleStatusChange(deal.id, "approved")}
                          className="flex items-center gap-2 text-green-600"
                          disabled={deal.status === "approved"}
                        >
                          <CheckCircle className="h-4 w-4" /> Одобрить
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleStatusChange(deal.id, "rejected")}
                          className="flex items-center gap-2 text-red-600"
                          disabled={deal.status === "rejected"}
                        >
                          <XCircle className="h-4 w-4" /> Отклонить
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/deal/${deal.slug}`} className="flex items-center gap-2">
                            <Eye className="h-4 w-4" /> Просмотр на сайте
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedDeal && (
        <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Детали акции</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-1">
                <div className="aspect-square bg-gray-200 rounded-md overflow-hidden">
                  <img 
                    src={selectedDeal.images[0]} 
                    alt={selectedDeal.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {selectedDeal.images.slice(1, 4).map((img: string, i: number) => (
                    <div key={i} className="aspect-square bg-gray-200 rounded-md overflow-hidden">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  <p className="font-semibold">Статус: {getStatusBadge(selectedDeal.status)}</p>
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => handleStatusChange(selectedDeal.id, "approved")} 
                      variant="outline"
                      className="flex-1 bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                      disabled={selectedDeal.status === "approved"}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" /> Одобрить
                    </Button>
                    <Button 
                      onClick={() => handleStatusChange(selectedDeal.id, "rejected")} 
                      variant="outline"
                      className="flex-1 bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                      disabled={selectedDeal.status === "rejected"}
                    >
                      <XCircle className="h-4 w-4 mr-2" /> Отклонить
                    </Button>
                  </div>
                </div>
              </div>
              <div className="col-span-2 space-y-4">
                <h2 className="text-xl font-bold">{selectedDeal.title}</h2>
                <div className="flex items-center space-x-2">
                  <Badge>{selectedDeal.mainCategory}</Badge>
                  <Badge variant="outline">{selectedDeal.subcategory}</Badge>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Продавец</p>
                  <p className="font-medium">{selectedDeal.merchant.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Цена со скидкой</p>
                    <p className="text-xl font-bold">{selectedDeal.discountedPrice} ₽</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Обычная цена</p>
                    <p className="text-lg line-through text-gray-500">{selectedDeal.originalPrice} ₽</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Описание</p>
                  <p>{selectedDeal.description}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Условия</p>
                  <p>{selectedDeal.terms || "Нет особых условий"}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Адрес</p>
                  <p>{selectedDeal.location.address}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminDeals;
