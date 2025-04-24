
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

// List of available icons from lucide-react
const icons = [
  "Book", "Camera", "Coffee", "Compass", "Gift", "Heart", 
  "Home", "Image", "Map", "Music", "Package", "Rocket", 
  "Star", "Sun", "Umbrella", "Zap"
] as const;

// List of soft colors
const softColors = [
  "bg-[#F2FCE2]", // Soft Green
  "bg-[#FEF7CD]", // Soft Yellow
  "bg-[#FEC6A1]", // Soft Orange
  "bg-[#E5DEFF]", // Soft Purple
  "bg-[#FFDEE2]", // Soft Pink
  "bg-[#FDE1D3]", // Soft Peach
  "bg-[#D3E4FD]", // Soft Blue
  "bg-[#F1F0FB]", // Soft Gray
];

interface ImageCarouselProps {
  images: string[];
  className?: string;
  aspectRatio?: "square" | "video" | "wide" | "auto";
  fullWidth?: boolean;
  showArrows?: boolean;
  enableModal?: boolean;
}

export function ImageCarousel({
  images,
  className,
  aspectRatio = "square",
  fullWidth = false,
  showArrows = true,
  enableModal = false,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Generate random colors and icons for each image slot
  const [placeholders] = useState(() =>
    images.map(() => ({
      color: softColors[Math.floor(Math.random() * softColors.length)],
      icon: icons[Math.floor(Math.random() * icons.length)]
    }))
  );

  const goToPrevious = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    setCurrentIndex(slideIndex);
  };

  const openModal = (e?: React.MouseEvent) => {
    if (enableModal && e) {
      e.stopPropagation();
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  const closeModal = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    setIsModalOpen(false);
  };

  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[16/9]",
    auto: "aspect-auto",
  };

  // Dynamically import the current icon
  const IconComponent = React.useMemo(() => {
    const iconName = placeholders[currentIndex].icon;
    return React.lazy(() => import('lucide-react').then(module => ({ 
      default: module[iconName] 
    })));
  }, [currentIndex, placeholders]);

  // Handle carousel interaction without navigation
  const handleCarouselClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (enableModal) {
      openModal(e);
    }
  };

  return (
    <div 
      className={cn("relative group", className, fullWidth ? "w-full" : "")}
      onClick={handleCarouselClick}
    >
      <div
        className={cn(
          "overflow-hidden rounded-md",
          aspectRatioClass[aspectRatio]
        )}
      >
        <div className={cn(
          "w-full h-full flex items-center justify-center transition-all duration-300",
          placeholders[currentIndex].color
        )}>
          <React.Suspense fallback={<div className="w-12 h-12" />}>
            <IconComponent className="w-12 h-12 text-gray-600" />
          </React.Suspense>
        </div>
      </div>

      {showArrows && images.length > 1 && (
        <>
          <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              onClick={goToPrevious}
              size="icon"
              variant="ghost"
              className="bg-white/30 backdrop-blur-sm hover:bg-white/50 text-gray-800 rounded-full h-8 w-8"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              onClick={goToNext}
              size="icon"
              variant="ghost"
              className="bg-white/30 backdrop-blur-sm hover:bg-white/50 text-gray-800 rounded-full h-8 w-8"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </>
      )}

      {images.length > 1 && (
        <div className="flex justify-center gap-1 mt-2" onClick={(e) => e.preventDefault()}>
          {images.map((_, slideIndex) => (
            <div
              key={slideIndex}
              onClick={(e) => goToSlide(slideIndex, e)}
              className={cn(
                "h-1.5 rounded-full cursor-pointer transition-all",
                slideIndex === currentIndex
                  ? "w-6 bg-orange-500"
                  : "w-1.5 bg-orange-200"
              )}
            ></div>
          ))}
        </div>
      )}

      {isModalOpen && enableModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={closeModal}
        >
          <button
            className="absolute top-4 right-4 bg-white/80 text-black p-2 rounded-full backdrop-blur-sm z-50 hover:bg-white"
            onClick={closeModal}
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          <div className={cn(
            "w-[80vw] h-[80vh] flex items-center justify-center",
            placeholders[currentIndex].color
          )}>
            <React.Suspense fallback={<div className="w-48 h-48" />}>
              <IconComponent className="w-48 h-48 text-gray-600" />
            </React.Suspense>
          </div>

          {images.length > 1 && (
            <>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious(e);
                }}
                size="icon"
                variant="ghost"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 text-black rounded-full"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext(e);
                }}
                size="icon"
                variant="ghost"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 text-black rounded-full"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex justify-center gap-2">
                {images.map((_, slideIndex) => (
                  <div
                    key={slideIndex}
                    onClick={(e) => {
                      e.stopPropagation();
                      goToSlide(slideIndex, e);
                    }}
                    className={`h-2.5 rounded-full cursor-pointer transition-all ${
                      slideIndex === currentIndex
                        ? "w-8 bg-white"
                        : "w-2.5 bg-white/50"
                    }`}
                  ></div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
