
import React, { useState } from "react";
import { 
  LayoutDashboard, 
  Category, 
  DollarSign, 
  FileText, 
  Settings, 
  Users, 
  ShieldCheck 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import AdminCategories from "@/components/admin/admin-categories";
import AdminDeals from "@/components/admin/admin-deals";
import AdminFinance from "@/components/admin/admin-finance";
import AdminUsers from "@/components/admin/admin-users";
import AdminSettings from "@/components/admin/admin-settings";
import AdminModeration from "@/components/admin/admin-moderation";

const AdminPanel = () => {
  const [selectedTab, setSelectedTab] = useState("dashboard");

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Панель администратора</h1>
        </div>

        <Tabs 
          value={selectedTab} 
          onValueChange={setSelectedTab} 
          className="w-full"
        >
          <TabsList className="grid grid-cols-7 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Обзор
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center">
              <Category className="mr-2 h-4 w-4" />
              Категории
            </TabsTrigger>
            <TabsTrigger value="deals" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Акции
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Пользователи
            </TabsTrigger>
            <TabsTrigger value="finance" className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4" />
              Финансы
            </TabsTrigger>
            <TabsTrigger value="moderation" className="flex items-center">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Модерация
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Настройки
            </TabsTrigger>
          </TabsList>
          
          <ScrollArea className="h-[calc(100vh-220px)]">
            <TabsContent value="dashboard">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Активные акции</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">348</p>
                    <p className="text-sm text-muted-foreground">+2.5% с прошлой недели</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Новые пользователи</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">573</p>
                    <p className="text-sm text-muted-foreground">+5.2% с прошлого месяца</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Доход платформы</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">₽2,456,789</p>
                    <p className="text-sm text-muted-foreground">+15.2% с прошлого месяца</p>
                  </CardContent>
                </Card>
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Акции на модерации</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">24</p>
                    <p className="text-sm text-muted-foreground">Требуют проверки</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Запросы в поддержку</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">12</p>
                    <p className="text-sm text-muted-foreground">3 требуют срочного ответа</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="categories">
              <AdminCategories />
            </TabsContent>
            
            <TabsContent value="deals">
              <AdminDeals />
            </TabsContent>
            
            <TabsContent value="users">
              <AdminUsers />
            </TabsContent>
            
            <TabsContent value="finance">
              <AdminFinance />
            </TabsContent>
            
            <TabsContent value="moderation">
              <AdminModeration />
            </TabsContent>
            
            <TabsContent value="settings">
              <AdminSettings />
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
