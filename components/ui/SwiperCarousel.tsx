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
    <>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-full rounded-lg mb-4 h-full"
      >
        {dog?.media?.map((mediaItem, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            <Image
              src={mediaItem.url || "/placeholder-dog.png"}
              alt={`${dog?.name} - Image ${index + 1}`}
              width={500}
              height={500}
              className="w-auto h-auto object-contain rounded-lg bg-green-800 mx-auto"
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={8}
        slidesPerView={3}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        breakpoints={{
          640: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
        className="w-full h-40 md:h-52"
      >
        {dog?.media?.map((mediaItem, index) => (
          <SwiperSlide key={index} className="cursor-pointer">
            <div className="relative w-full aspect-square">
              <Image
                src={mediaItem.url || "/placeholder-dog.png"}
                alt={`${dog?.name} - Thumbnail ${index + 1}`}
                fill
                sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 20vw"
                className="object-cover rounded-lg hover:opacity-75 transition-opacity border-2 border-transparent hover:border-emerald-500"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
