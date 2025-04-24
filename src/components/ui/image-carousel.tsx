
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

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

  const goToPrevious = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const openModal = () => {
    if (enableModal) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[16/9]",
    auto: "aspect-auto",
  };

  return (
    <div className={cn("relative group", className, fullWidth ? "w-full" : "")}>
      <div
        className={cn(
          "overflow-hidden rounded-md",
          aspectRatioClass[aspectRatio]
        )}
        onClick={openModal}
      >
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className={cn(
            "object-cover w-full h-full transition-all duration-300",
            enableModal ? "cursor-pointer" : ""
          )}
        />
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
        <div className="flex justify-center gap-1 mt-2">
          {images.map((_, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
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
          <div className="relative max-w-[90%] max-h-[90%]">
            <button
              className="absolute top-2 right-2 bg-white/10 text-white p-2 rounded-full backdrop-blur-sm"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={images[currentIndex]}
              alt="Enlarged view"
              className="max-h-[90vh] max-w-full"
            />
            {images.length > 1 && (
              <>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  size="icon"
                  variant="ghost"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white rounded-full"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  size="icon"
                  variant="ghost"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white rounded-full"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center gap-1">
                  {images.map((_, slideIndex) => (
                    <div
                      key={slideIndex}
                      onClick={(e) => {
                        e.stopPropagation();
                        goToSlide(slideIndex);
                      }}
                      className={`h-1.5 rounded-full cursor-pointer transition-all ${
                        slideIndex === currentIndex
                          ? "w-6 bg-white"
                          : "w-1.5 bg-white/50"
                      }`}
                    ></div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
