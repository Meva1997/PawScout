"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";
import { DogsDataType } from "@/db/dogs";

type SwiperCarouselProps = {
  dog?: DogsDataType;
};

export default function SwiperCarousel({ dog }: SwiperCarouselProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="relative rounded-3xl overflow-hidden bg-stone-100 shadow-xl shadow-stone-200/60 ring-1 ring-stone-200">
        <Swiper
          spaceBetween={0}
          navigation={true}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="w-full aspect-4/3"
        >
          {dog?.media?.map((mediaItem, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center bg-stone-100"
            >
              <Image
                src={mediaItem.url || "/placeholder-dog.png"}
                alt={`${dog?.name} - Image ${index + 1}`}
                width={600}
                height={450}
                className="w-full h-full object-cover"
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={8}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        breakpoints={{
          640: { slidesPerView: 4, spaceBetween: 10 },
          768: { slidesPerView: 5, spaceBetween: 10 },
        }}
        className="w-full"
      >
        {dog?.media?.map((mediaItem, index) => (
          <SwiperSlide key={index} className="cursor-pointer group">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden ring-2 ring-transparent group-hover:ring-emerald-400 transition-all duration-200 shadow-sm">
              <Image
                src={mediaItem.url || "/placeholder-dog.png"}
                alt={`${dog?.name} - Thumbnail ${index + 1}`}
                fill
                sizes="(max-width: 640px) 25vw, (max-width: 768px) 20vw, 18vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
