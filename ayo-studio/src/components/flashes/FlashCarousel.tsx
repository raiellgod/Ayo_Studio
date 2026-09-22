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
};

type FlashCarouselProps = {
  flashes: FeaturedFlash[];
};

export function FlashCarousel({ flashes }: FlashCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  function scrollLeft() {
    carouselRef.current?.scrollBy({
      left: -500,
      behavior: "smooth",
    });
  }

  function scrollRight() {
    carouselRef.current?.scrollBy({
      left: 500,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative">
      {/* CONTROLES */}

      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          onClick={scrollLeft}
          aria-label="Ver flashes anteriores"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 font-sans text-lg text-white transition hover:bg-white/10"
        >
          &lt;
        </button>

        <button
          type="button"
          onClick={scrollRight}
          aria-label="Ver próximos flashes"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 font-sans text-lg text-white transition hover:bg-white/10"
        >
          &gt;
        </button>
      </div>

      {/* CARROSSEL */}

      <div
        ref={carouselRef}
        className="flex [scrollbar-width:none] gap-5 overflow-x-auto scroll-smooth pb-4 [&::-webkit-scrollbar]:hidden"
      >
        {flashes.map((flash) => (
          <FlashCard
            key={flash.id}
            name={flash.name}
            artistName={flash.artistName}
            image={flash.image}
            price={flash.price}
            href={`/flashes/${flash.slug}`}
          />
        ))}
      </div>
    </div>
  );
}
