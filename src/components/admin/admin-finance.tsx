
import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, DollarSign, CreditCard, TrendingUp, TrendingDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminFinance = () => {
  // Mock data for financial statistics
  const financialStats = [
    {
      title: "Общий доход",
      value: "₽4,385,000",
      change: "+15.3%",
      trend: "up",
      icon: DollarSign
    },
    {
      title: "Комиссии",
      value: "₽897,650",
      change: "+10.6%",
      trend: "up",
      icon: CreditCard
    },
    {
      title: "Возвраты",
      value: "₽15,832",
      change: "-2.3%",
      trend: "down",
      icon: TrendingDown
    },
    {
      title: "Чистая прибыль",
      value: "₽862,818",
      change: "+12.5%",
      trend: "up",
      icon: TrendingUp
    }
  ];

  // Mock data for transactions
  const transactions = [
    {
      id: "TRX-001",
      date: "2025-04-23",
      merchant: "Ресторан 'У Михалыча'",
      amount: 12500,
      fee: 625,
      netAmount: 11875,
      status: "completed"
    },
    {
      id: "TRX-002",
      date: "2025-04-23",
      merchant: "СПА-салон 'Релакс'",
      amount: 8900,
      fee: 445,
      netAmount: 8455,
      status: "completed"
    },
    {
      id: "TRX-003",
      date: "2025-04-22",
      merchant: "Фитнес-клуб 'Атлет'",
      amount: 15000,
      fee: 750,
      netAmount: 14250,
      status: "completed"
    },
    {
      id: "TRX-004",
      date: "2025-04-22",
      merchant: "Школа танцев 'Ритм'",
      amount: 5600,
      fee: 280,
      netAmount: 5320,
      status: "pending"
    },
    {
      id: "TRX-005",
      date: "2025-04-21",
      merchant: "Автомойка 'Блеск'",
      amount: 2000,
      fee: 100,
      netAmount: 1900,
      status: "completed"
    }
  ];

  // Mock data for withdrawals
  const withdrawals = [
    {
      id: "WD-001",
      date: "2025-04-20",
      merchant: "Ресторан 'У Михалыча'",
      amount: 45000,
      status: "completed"
    },
    {
      id: "WD-002",
      date: "2025-04-19",
      merchant: "СПА-салон 'Релакс'",
      amount: 32000,
      status: "processing"
    },
    {
      id: "WD-003",
      date: "2025-04-18",
      merchant: "Фитнес-клуб 'Атлет'",
      amount: 68700,
      status: "completed"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "completed":
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Выполнено</span>;
      case "pending":
        return <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">В обработке</span>;
      case "processing":
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">Обрабатывается</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">Неизвестно</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {financialStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'} flex items-center mt-1`}>
                  {stat.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {stat.change} за месяц
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Финансовая аналитика</CardTitle>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" /> Скачать отчёт
            </Button>
          </div>
          <CardDescription>
            Данные о доходах и транзакциях за последние 30 дней
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center border rounded-md">
            <div className="flex flex-col items-center text-center">
              <BarChart className="h-10 w-10 mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">Здесь будет отображаться график финансовой аналитики</p>
              <p className="text-xs text-gray-400">Данные за апрель 2025</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>История финансовых операций</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="transactions">
            <TabsList className="mb-4">
              <TabsTrigger value="transactions">Транзакции</TabsTrigger>
              <TabsTrigger value="withdrawals">Выводы средств</TabsTrigger>
            </TabsList>
            
            <TabsContent value="transactions">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead>Продавец</TableHead>
                    <TableHead>Сумма</TableHead>
                    <TableHead>Комиссия</TableHead>
                    <TableHead>К выплате</TableHead>
                    <TableHead>Статус</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.merchant}</TableCell>
                      <TableCell>₽{transaction.amount.toLocaleString()}</TableCell>
                      <TableCell>₽{transaction.fee.toLocaleString()}</TableCell>
                      <TableCell>₽{transaction.netAmount.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="withdrawals">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Дата</TableHead>
                    <TableHead>Продавец</TableHead>
                    <TableHead>Сумма</TableHead>
                    <TableHead>Статус</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {withdrawals.map((withdrawal) => (
                    <TableRow key={withdrawal.id}>
                      <TableCell className="font-mono text-sm">{withdrawal.id}</TableCell>
                      <TableCell>{withdrawal.date}</TableCell>
                      <TableCell>{withdrawal.merchant}</TableCell>
                      <TableCell>₽{withdrawal.amount.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(withdrawal.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminFinance;
