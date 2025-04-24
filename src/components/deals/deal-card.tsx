
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { Deal } from "@/types";
import { useState } from "react";

interface DealCardProps {
  deal: Deal;
  className?: string;
  favoriteMode?: boolean;
}

export function DealCard({ deal, className, favoriteMode = false }: DealCardProps) {
  const [isFavorite, setIsFavorite] = useState(favoriteMode);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const formattedRating = deal.rating.toFixed(1);

  return (
    <Link to={`/deal/${deal.slug}`}>
      <Card className={cn("h-full overflow-hidden transition-shadow hover:shadow-md", className)}>
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <ImageCarousel 
            images={deal.images}
            aspectRatio="video" 
            fullWidth 
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 text-gray-600 hover:bg-white hover:text-orange-500 backdrop-blur-sm"
            onClick={toggleFavorite}
          >
            <Heart
              className={cn("h-4 w-4", isFavorite ? "fill-orange-500 text-orange-500" : "")}
            />
          </Button>
          <div className="absolute bottom-2 right-2 bg-orange-500 text-white text-xs font-semibold py-1 px-2 rounded">
            -{deal.discountPercentage}%
          </div>
        </div>
        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold line-clamp-2 text-base">{deal.title}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <span>{deal.location.address}, {deal.location.city}</span>
            </div>
            <div className="flex items-center space-x-1 mb-1">
              <div className="text-sm bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded flex items-center">
                {formattedRating}
                <Star className="h-4 w-4 ml-0.5 fill-yellow-500 text-yellow-500" />
              </div>
              <span className="text-sm text-gray-500">
                ({deal.reviewCount} отзывов)
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-orange-600 font-bold">
                {deal.discountedPrice.toLocaleString('ru-RU')} ₽
              </span>
              <span className="text-gray-500 text-sm line-through">
                {deal.originalPrice.toLocaleString('ru-RU')} ₽
              </span>
            </div>
            <div className="text-sm text-gray-600">
              Купили более {deal.soldCount} раз
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
