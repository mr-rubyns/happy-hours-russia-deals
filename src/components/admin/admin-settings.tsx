
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const AdminSettings = () => {
  const [platformSettings, setPlatformSettings] = useState({
    siteName: "Happy Hours",
    contactEmail: "admin@happyhours.ru",
    platformFee: 5,
    requireApproval: true,
    enableUserRegistration: true,
    enableSellerRegistration: true,
    enableReviews: true,
    minimalDiscountPercent: 15,
    dealDurationDays: 30,
    maintenanceMode: false
  });

  const [notificationSettings, setNotificationSettings] = useState({
    adminEmails: "admin@happyhours.ru",
    newDealNotification: true,
    newUserNotification: false,
    reportNotification: true,
    supportTicketNotification: true,
    salesReportFrequency: "daily",
    systemAlertsEnabled: true
  });

  const handlePlatformSettingChange = (key: string, value: any) => {
    setPlatformSettings({
      ...platformSettings,
      [key]: value
    });
  };

  const handleNotificationSettingChange = (key: string, value: any) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: value
    });
  };

  const handleSaveSettings = () => {
    console.log("Saving settings:", { platformSettings, notificationSettings });
    // Here you would save settings to backend
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">Общие настройки</TabsTrigger>
          <TabsTrigger value="notifications">Уведомления</TabsTrigger>
          <TabsTrigger value="payment">Платежи и комиссии</TabsTrigger>
          <TabsTrigger value="security">Безопасность</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Основные настройки платформы</CardTitle>
              <CardDescription>
                Настройте основные параметры работы платформы
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Название сайта</Label>
                  <Input 
                    id="site-name" 
                    value={platformSettings.siteName}
                    onChange={(e) => handlePlatformSettingChange("siteName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Контактный email</Label>
                  <Input 
                    id="contact-email" 
                    type="email" 
                    value={platformSettings.contactEmail}
                    onChange={(e) => handlePlatformSettingChange("contactEmail", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Настройки акций</h3>
                <div className="space-y-2">
                  <Label htmlFor="min-discount">
                    Минимальный процент скидки: {platformSettings.minimalDiscountPercent}%
                  </Label>
                  <Slider
                    id="min-discount"
                    min={0}
                    max={100}
                    step={1}
                    value={[platformSettings.minimalDiscountPercent]}
                    onValueChange={(value) => handlePlatformSettingChange("minimalDiscountPercent", value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="deal-duration">
                    Стандартная длительность акции: {platformSettings.dealDurationDays} дней
                  </Label>
                  <Slider
                    id="deal-duration"
                    min={1}
                    max={90}
                    step={1}
                    value={[platformSettings.dealDurationDays]}
                    onValueChange={(value) => handlePlatformSettingChange("dealDurationDays", value[0])}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="require-approval" className="flex items-center space-x-2">
                    <span>Требовать модерацию перед публикацией</span>
                  </Label>
                  <Switch
                    id="require-approval"
                    checked={platformSettings.requireApproval}
                    onCheckedChange={(checked) => handlePlatformSettingChange("requireApproval", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="user-registration" className="flex items-center space-x-2">
                    <span>Разрешить регистрацию пользователей</span>
                  </Label>
                  <Switch
                    id="user-registration"
                    checked={platformSettings.enableUserRegistration}
                    onCheckedChange={(checked) => handlePlatformSettingChange("enableUserRegistration", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="seller-registration" className="flex items-center space-x-2">
                    <span>Разрешить регистрацию продавцов</span>
                  </Label>
                  <Switch
                    id="seller-registration"
                    checked={platformSettings.enableSellerRegistration}
                    onCheckedChange={(checked) => handlePlatformSettingChange("enableSellerRegistration", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="enable-reviews" className="flex items-center space-x-2">
                    <span>Разрешить отзывы</span>
                  </Label>
                  <Switch
                    id="enable-reviews"
                    checked={platformSettings.enableReviews}
                    onCheckedChange={(checked) => handlePlatformSettingChange("enableReviews", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="maintenance-mode" className="flex items-center space-x-2">
                    <span className="font-semibold text-red-600">Режим обслуживания</span>
                  </Label>
                  <Switch
                    id="maintenance-mode"
                    checked={platformSettings.maintenanceMode}
                    onCheckedChange={(checked) => handlePlatformSettingChange("maintenanceMode", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Настройки уведомлений</CardTitle>
              <CardDescription>
                Настройте, какие уведомления будут отправляться
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="admin-emails">Email для уведомлений администраторов</Label>
                <Input 
                  id="admin-emails" 
                  value={notificationSettings.adminEmails}
                  placeholder="example@email.com, another@email.com"
                  onChange={(e) => handleNotificationSettingChange("adminEmails", e.target.value)}
                />
                <p className="text-xs text-gray-500">Разделяйте несколько адресов запятыми</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="new-deal-notification" className="flex items-center space-x-2">
                    <span>Уведомлять о новых акциях</span>
                  </Label>
                  <Switch
                    id="new-deal-notification"
                    checked={notificationSettings.newDealNotification}
                    onCheckedChange={(checked) => handleNotificationSettingChange("newDealNotification", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="new-user-notification" className="flex items-center space-x-2">
                    <span>Уведомлять о новых пользователях</span>
                  </Label>
                  <Switch
                    id="new-user-notification"
                    checked={notificationSettings.newUserNotification}
                    onCheckedChange={(checked) => handleNotificationSettingChange("newUserNotification", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="report-notification" className="flex items-center space-x-2">
                    <span>Уведомлять о жалобах</span>
                  </Label>
                  <Switch
                    id="report-notification"
                    checked={notificationSettings.reportNotification}
                    onCheckedChange={(checked) => handleNotificationSettingChange("reportNotification", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="ticket-notification" className="flex items-center space-x-2">
                    <span>Уведомлять о тикетах в поддержку</span>
                  </Label>
                  <Switch
                    id="ticket-notification"
                    checked={notificationSettings.supportTicketNotification}
                    onCheckedChange={(checked) => handleNotificationSettingChange("supportTicketNotification", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="system-alerts" className="flex items-center space-x-2">
                    <span>Системные уведомления</span>
                  </Label>
                  <Switch
                    id="system-alerts"
                    checked={notificationSettings.systemAlertsEnabled}
                    onCheckedChange={(checked) => handleNotificationSettingChange("systemAlertsEnabled", checked)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sales-report-frequency">Частота отчётов о продажах</Label>
                <select
                  id="sales-report-frequency"
                  className="w-full border rounded-md px-3 py-2"
                  value={notificationSettings.salesReportFrequency}
                  onChange={(e) => handleNotificationSettingChange("salesReportFrequency", e.target.value)}
                >
                  <option value="daily">Ежедневно</option>
                  <option value="weekly">Еженедельно</option>
                  <option value="monthly">Ежемесячно</option>
                  <option value="never">Никогда</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Настройки платежей и комиссий</CardTitle>
              <CardDescription>
                Управление платежными системами и комиссиями платформы
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="platform-fee">
                  Комиссия платформы: {platformSettings.platformFee}%
                </Label>
                <Slider
                  id="platform-fee"
                  min={0}
                  max={30}
                  step={0.5}
                  value={[platformSettings.platformFee]}
                  onValueChange={(value) => handlePlatformSettingChange("platformFee", value[0])}
                />
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-4">Платежные системы</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                        <span>💳</span>
                      </div>
                      <div>
                        <p className="font-medium">Банковские карты</p>
                        <p className="text-xs text-gray-500">Visa, Mastercard, МИР</p>
                      </div>
                    </div>
                    <Switch checked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                        <span>📱</span>
                      </div>
                      <div>
                        <p className="font-medium">СБП (Система быстрых платежей)</p>
                        <p className="text-xs text-gray-500">Оплата по QR-коду</p>
                      </div>
                    </div>
                    <Switch checked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                        <span>👛</span>
                      </div>
                      <div>
                        <p className="font-medium">Электронные кошельки</p>
                        <p className="text-xs text-gray-500">ЮMoney, QIWI, WebMoney</p>
                      </div>
                    </div>
                    <Switch checked={false} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Настройки безопасности</CardTitle>
              <CardDescription>
                Управление параметрами безопасности платформы
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password-policy">Политика паролей</Label>
                  <select
                    id="password-policy"
                    className="w-full border rounded-md px-3 py-2"
                    defaultValue="medium"
                  >
                    <option value="low">Слабая (минимум 6 символов)</option>
                    <option value="medium">Средняя (8+ символов, цифры и буквы)</option>
                    <option value="high">Высокая (10+ символов, цифры, спец. символы)</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Тайм-аут сессии (в минутах)</Label>
                  <Input 
                    id="session-timeout" 
                    type="number" 
                    defaultValue="60" 
                    min="5" 
                    max="1440"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="two-factor-auth" className="flex items-center space-x-2">
                    <span>Двухфакторная аутентификация для администраторов</span>
                  </Label>
                  <Switch
                    id="two-factor-auth"
                    defaultChecked={true}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="login-attempts" className="flex items-center space-x-2">
                    <span>Ограничение попыток входа</span>
                  </Label>
                  <Switch
                    id="login-attempts"
                    defaultChecked={true}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="ip-blocking" className="flex items-center space-x-2">
                    <span>Блокировка подозрительных IP</span>
                  </Label>
                  <Switch
                    id="ip-blocking"
                    defaultChecked={true}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="backup-frequency">Частота резервного копирования</Label>
                  <select
                    id="backup-frequency"
                    className="w-full border rounded-md px-3 py-2"
                    defaultValue="daily"
                  >
                    <option value="hourly">Каждый час</option>
                    <option value="daily">Ежедневно</option>
                    <option value="weekly">Еженедельно</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button 
          className="bg-orange-600 hover:bg-orange-700"
          onClick={handleSaveSettings}
        >
          Сохранить все настройки
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
