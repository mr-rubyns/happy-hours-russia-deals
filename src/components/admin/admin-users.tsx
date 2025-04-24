
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
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  MoreHorizontal, 
  Search, 
  UserCheck, 
  UserX, 
  ShieldCheck, 
  Shield, 
  Users 
} from "lucide-react";

const AdminUsers = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock user data
  const mockUsers = [
    {
      id: 1,
      name: "Александр Иванов",
      email: "alex@example.com",
      phone: "+7 (999) 123-45-67",
      role: "user",
      status: "active",
      registeredDate: "2025-01-15",
      purchases: 12
    },
    {
      id: 2,
      name: "Мария Петрова",
      email: "maria@example.com",
      phone: "+7 (999) 234-56-78",
      role: "seller",
      status: "active",
      registeredDate: "2025-02-03",
      purchases: 0
    },
    {
      id: 3,
      name: "Дмитрий Сидоров",
      email: "dmitry@example.com",
      phone: "+7 (999) 345-67-89",
      role: "admin",
      status: "active",
      registeredDate: "2025-01-05",
      purchases: 3
    },
    {
      id: 4,
      name: "Елена Смирнова",
      email: "elena@example.com",
      phone: "+7 (999) 456-78-90",
      role: "user",
      status: "inactive",
      registeredDate: "2025-03-12",
      purchases: 2
    },
    {
      id: 5,
      name: "Павел Козлов",
      email: "pavel@example.com",
      phone: "+7 (999) 567-89-01",
      role: "seller",
      status: "blocked",
      registeredDate: "2025-02-18",
      purchases: 0
    },
    {
      id: 6,
      name: "Татьяна Николаева",
      email: "tatiana@example.com",
      phone: "+7 (999) 678-90-12",
      role: "user",
      status: "active",
      registeredDate: "2025-03-25",
      purchases: 5
    }
  ];

  const [users, setUsers] = useState(mockUsers);

  // Filter users based on role and search query
  const filteredUsers = users.filter(user => {
    const matchesFilter = filter === "all" || user.role === filter;
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Change user status
  const handleStatusChange = (userId: number, newStatus: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  // Change user role
  const handleRoleChange = (userId: number, newRole: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const getRoleBadge = (role: string) => {
    switch(role) {
      case "admin":
        return <Badge className="bg-purple-500">Администратор</Badge>;
      case "seller":
        return <Badge className="bg-blue-500">Продавец</Badge>;
      case "user":
        return <Badge className="bg-gray-500">Пользователь</Badge>;
      default:
        return <Badge>Неизвестно</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "active":
        return <Badge className="bg-green-500">Активен</Badge>;
      case "inactive":
        return <Badge variant="outline">Неактивен</Badge>;
      case "blocked":
        return <Badge className="bg-red-500">Заблокирован</Badge>;
      default:
        return <Badge>Неизвестно</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Всего пользователей</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">+12% за месяц</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Активные продавцы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(user => user.role === "seller" && user.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">+5% за месяц</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Новые регистрации</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Последние 7 дней</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Пользователи</CardTitle>
              <CardDescription>Управление пользователями платформы</CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Поиск пользователей..."
                  className="pl-9 w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Tabs defaultValue="all" value={filter} onValueChange={setFilter}>
                <TabsList>
                  <TabsTrigger value="all" className="flex items-center gap-1">
                    <Users className="h-3 w-3" /> Все
                  </TabsTrigger>
                  <TabsTrigger value="user" className="flex items-center gap-1">
                    <UserCheck className="h-3 w-3" /> Пользователи
                  </TabsTrigger>
                  <TabsTrigger value="seller" className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> Продавцы
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="flex items-center gap-1">
                    <Shield className="h-3 w-3" /> Админы
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Имя</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Телефон</TableHead>
                <TableHead>Роль</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дата регистрации</TableHead>
                <TableHead>Покупки</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.registeredDate}</TableCell>
                  <TableCell>{user.purchases}</TableCell>
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
                          onClick={() => handleStatusChange(user.id, "active")}
                          disabled={user.status === "active"}
                          className="flex items-center gap-2"
                        >
                          <UserCheck className="h-4 w-4" /> Активировать
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleStatusChange(user.id, "blocked")}
                          disabled={user.status === "blocked"}
                          className="flex items-center gap-2 text-red-600"
                        >
                          <UserX className="h-4 w-4" /> Заблокировать
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleRoleChange(user.id, "user")}
                          disabled={user.role === "user"}
                          className="flex items-center gap-2"
                        >
                          <Users className="h-4 w-4" /> Сделать пользователем
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleRoleChange(user.id, "seller")}
                          disabled={user.role === "seller"}
                          className="flex items-center gap-2"
                        >
                          <ShieldCheck className="h-4 w-4" /> Сделать продавцом
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleRoleChange(user.id, "admin")}
                          disabled={user.role === "admin"}
                          className="flex items-center gap-2"
                        >
                          <Shield className="h-4 w-4" /> Сделать администратором
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
    </div>
  );
};

export default AdminUsers;
