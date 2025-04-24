
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ChevronLeft,
  MapPin,
  Clock,
  Calendar,
  Star,
  Share,
  Heart,
  FileText,
  AlertCircle,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { MapView } from "@/components/maps/map-view";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { mockDeals, mockReviews } from "@/data/mockData";
import { DealGrid } from "@/components/deals/deal-grid";
import { useToast } from "@/components/ui/use-toast";

const DealDetails = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [isBooked, setIsBooked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Find the current deal
  const deal = mockDeals.find((d) => d.slug === slug);
  
  // Get related deals
  const relatedDeals = mockDeals
    .filter((d) => d.id !== deal?.id && d.category === deal?.category)
    .slice(0, 4);
  
  // Get reviews for this deal
  const dealReviews = mockReviews.filter((r) => r.dealId === deal?.id);

  // Format the rating to show only 1 decimal place
  const formattedRating = deal?.rating.toFixed(1);

  const handleBookNow = () => {
    setIsBooked(true);
    toast({
      title: "Акция забронирована!",
      description: "Детали бронирования отправлены на вашу электронную почту.",
    });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Удалено из избранного" : "Добавлено в избранное",
      duration: 2000,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Ссылка скопирована!",
      description: "Теперь вы можете поделиться этой акцией.",
      duration: 2000,
    });
  };

  if (!deal) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Акция не найдена</h1>
            <Link to="/">
              <Button>Вернуться на главную</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container px-4 md:px-6 mx-auto py-6">
          {/* Breadcrumbs */}
          <div className="mb-4 flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-orange-600">Главная</Link>
            <span className="mx-2">/</span>
            <Link to={`/category/${deal.category}`} className="hover:text-orange-600">
              {deal.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{deal.title}</span>
          </div>

          {/* Back button - Mobile */}
          <Link to="/" className="lg:hidden mb-4 inline-flex items-center text-orange-600">
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>Назад</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Image Gallery */}
            <div className="lg:col-span-2">
              <ImageCarousel 
                images={deal.images} 
                aspectRatio="wide"
                showArrows={true}
                enableModal={true}
              />
            </div>

            {/* Deal Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-4 border rounded-lg shadow-sm">
                <h1 className="text-2xl font-bold mb-2">{deal.title}</h1>
                
                {/* Rating & Reviews */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center bg-yellow-100 text-yellow-800 rounded px-2 py-0.5 mr-2">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                    <span className="font-medium">{formattedRating}</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {deal.reviewCount} отзывов
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-start mb-3 text-gray-600">
                  <MapPin className="h-5 w-5 mr-2 flex-shrink-0 text-gray-400" />
                  <span>{deal.location.address}, {deal.location.city}</span>
                </div>

                {/* Pricing */}
                <div className="my-4 p-3 bg-gray-50 rounded-md">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-orange-600 mr-3">
                      {deal.discountedPrice.toLocaleString('ru-RU')} ₽
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      {deal.originalPrice.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                  <div className="mt-1 inline-block bg-orange-100 text-orange-800 px-2 py-0.5 rounded text-sm font-medium">
                    Экономия {Math.round((deal.originalPrice - deal.discountedPrice) * 100 / deal.originalPrice)}%
                  </div>
                </div>

                {/* Buy Button */}
                <div className="mb-4">
                  <Button 
                    onClick={handleBookNow}
                    disabled={isBooked}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12 text-lg"
                  >
                    {isBooked ? "Забронировано!" : "Купить сейчас"}
                  </Button>
                </div>

                {/* Actions */}
                <div className="flex justify-between border-t pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleFavorite}
                    className={isFavorite ? "text-orange-600 border-orange-600" : ""}
                  >
                    <Heart
                      className={`h-4 w-4 mr-1 ${
                        isFavorite ? "fill-orange-500 text-orange-500" : ""
                      }`}
                    />
                    {isFavorite ? "В избранном" : "В избранное"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share className="h-4 w-4 mr-1" />
                    Поделиться
                  </Button>
                </div>

                {/* Quick Facts */}
                <div className="mt-4 space-y-3">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Срок действия купона: 3 месяца</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Купили более {deal.soldCount} раз</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Tabs */}
          <div className="mt-8">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="w-full border-b justify-start rounded-none bg-transparent space-x-8">
                <TabsTrigger 
                  value="details" 
                  className="flex items-center gap-2 px-1 py-4 -mb-px data-[state=active]:text-orange-500 data-[state=active]:border-b-2 data-[state=active]:border-orange-500"
                >
                  <FileText className="h-4 w-4" />
                  <span>Описание</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="conditions"
                  className="flex items-center gap-2 px-1 py-4 -mb-px data-[state=active]:text-orange-500 data-[state=active]:border-b-2 data-[state=active]:border-orange-500"
                >
                  <AlertCircle className="h-4 w-4" />
                  <span>Условия</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews"
                  className="flex items-center gap-2 px-1 py-4 -mb-px data-[state=active]:text-orange-500 data-[state=active]:border-b-2 data-[state=active]:border-orange-500"
                >
                  <Users className="h-4 w-4" />
                  <span>Отзывы</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="location"
                  className="flex items-center gap-2 px-1 py-4 -mb-px data-[state=active]:text-orange-500 data-[state=active]:border-b-2 data-[state=active]:border-orange-500"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Расположение</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="py-6">
                <div className="max-w-3xl space-y-6">
                  <h2 className="text-2xl font-semibold">Описание</h2>
                  <div className="prose max-w-none text-gray-700">
                    <p className="text-lg leading-relaxed">{deal.description}</p>
                    <div className="mt-8">
                      <h3 className="text-xl font-medium mb-4">Особенности:</h3>
                      <ul className="space-y-3 list-none">
                        {deal.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                              <span className="text-orange-600">•</span>
                            </div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="conditions" className="py-6">
                <div className="max-w-3xl space-y-6">
                  <h2 className="text-2xl font-semibold">Условия</h2>
                  <div className="bg-orange-50 rounded-lg p-6">
                    <ul className="space-y-4">
                      {deal.conditions.map((condition, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                            <AlertCircle className="h-4 w-4 text-orange-600" />
                          </div>
                          <span className="text-gray-700">{condition}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-medium mb-4">Дополнительная информация</h3>
                    <p className="text-gray-600 leading-relaxed">
                      После оплаты вы получите уникальный код купона на email. 
                      Предъявите его при посещении или используйте для бронирования.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="py-6">
                <div className="max-w-3xl">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-semibold">Отзывы</h2>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-orange-500 hover:bg-orange-600">
                          Оставить отзыв
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Оставить отзыв</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <p className="text-gray-600">Функционал добавления отзывов в демо-режиме недоступен.</p>
                          <Button className="w-full">Закрыть</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  
                  {dealReviews.length > 0 ? (
                    <div className="space-y-6">
                      {dealReviews.map((review) => (
                        <div key={review.id} className="border rounded-lg p-6 bg-white">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden">
                              {review.userAvatar ? (
                                <img
                                  src={review.userAvatar}
                                  alt={review.userName}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-orange-100 text-orange-600 font-medium">
                                  {review.userName.charAt(0)}
                                </div>
                              )}
                            </div>
                            <div className="flex-grow">
                              <p className="font-medium text-lg">{review.userName}</p>
                              <div className="flex items-center gap-2 mt-1 mb-3">
                                <div className="flex gap-0.5">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating
                                          ? "fill-orange-400 text-orange-400"
                                          : "fill-gray-200 text-gray-200"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">
                                  {new Date(review.createdAt).toLocaleDateString('ru-RU')}
                                </span>
                              </div>
                              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-500 text-lg">Пока нет отзывов. Будьте первым!</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="location" className="py-6">
                <div className="max-w-3xl space-y-6">
                  <h2 className="text-2xl font-semibold">Расположение</h2>
                  <div className="flex items-center gap-2 text-gray-600 mb-6">
                    <MapPin className="h-5 w-5 text-orange-500" />
                    <p className="text-lg">{deal.location.address}, {deal.location.city}</p>
                  </div>
                  
                  <div className="h-[400px] rounded-lg overflow-hidden border">
                    <MapView deals={[deal]} selectedDealId={deal.id} />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Deals */}
          {relatedDeals.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-6">Похожие предложения</h2>
              <DealGrid deals={relatedDeals} />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DealDetails;
