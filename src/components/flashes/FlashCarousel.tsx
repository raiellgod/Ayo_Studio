"use client";

import { useRef } from "react";

import { FlashCard } from "./FlashCard";

export type FeaturedFlash = {
  id: number;
  slug: string;
  name: string;
  artistId: number;
  artistName: string;
  image: string;
  price: number;
  available: boolean;
};

type FlashCarouselProps = {
  flashes: FeaturedFlash[];
};

export function FlashCarousel({
  flashes,
}: FlashCarouselProps) {
  const carouselRef =
    useRef<HTMLDivElement>(null);

  function scrollLeft() {
    carouselRef.current?.scrollBy({
      left: -240,
      behavior: "smooth",
    });
  }

  function scrollRight() {
    carouselRef.current?.scrollBy({
      left: 240,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative">
      {/* =========================================
          CONTROLES
      ========================================== */}

      <div className="mb-4 flex items-center justify-between sm:mb-5">
        <button
          type="button"
          onClick={scrollLeft}
          aria-label="Ver flashes anteriores"
          className="
            flex
            h-9
            w-9
            sm:h-10
            sm:w-10
            cursor-pointer
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-white/5
            font-sans
            text-lg
            text-white
            transition
            hover:bg-white/10
          "
        >
          &lt;
        </button>

        <button
          type="button"
          onClick={scrollRight}
          aria-label="Ver próximos flashes"
          className="
            flex
            h-9
            w-9
            sm:h-10
            sm:w-10
            cursor-pointer
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-white/5
            font-sans
            text-lg
            text-white
            transition
            hover:bg-white/10
          "
        >
          &gt;
        </button>
      </div>

      {/* =========================================
          CARROSSEL
      ========================================== */}

      <div
        ref={carouselRef}
        className="
          flex
          snap-x
          snap-mandatory
          gap-4
          overflow-x-auto
          scroll-smooth
          pb-4
          pr-5
          sm:gap-5
          sm:pr-0
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {flashes.map((flash) => (
          <div key={flash.id} className="snap-start">
            <FlashCard
              name={flash.name}
            artistName={flash.artistName}
            image={flash.image}
            price={flash.price}
            href={`/flashes/${flash.slug}`}
              available={flash.available}
            />
          </div>
        ))}
      </div>
    </div>
  );
}