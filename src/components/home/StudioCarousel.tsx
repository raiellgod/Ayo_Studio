"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";
import Image from "next/image";
import {
  useEffect,
  useState,
} from "react";

import type { StudioImage } from "@/data/studioImages";

const AUTOPLAY_MS = 5000;

type StudioCarouselProps = {
  images: StudioImage[];
};

export function StudioCarousel({
  images,
}: StudioCarouselProps) {
  const [currentIndex, setCurrentIndex] =
    useState(0);

  useEffect(() => {
    if (images.length <= 1) {
      return;
    }

    const interval =
      window.setInterval(() => {
        setCurrentIndex(
          (current) =>
            (current + 1) %
            images.length,
        );
      }, AUTOPLAY_MS);

    return () => {
      window.clearInterval(interval);
    };
  }, [images.length]);

  if (images.length === 0) {
    return null;
  }

  const currentImage =
    images[currentIndex];

  function goPrevious() {
    setCurrentIndex(
      (current) =>
        (
          current -
          1 +
          images.length
        ) % images.length,
    );
  }

  function goNext() {
    setCurrentIndex(
      (current) =>
        (current + 1) %
        images.length,
    );
  }

  return (
    <div className="relative h-full min-h-[300px] overflow-hidden sm:min-h-[420px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage.src}
          initial={{
            opacity: 0,
            scale: 1.025,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="absolute inset-0"
        >
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
            priority={
              currentIndex === 0
            }
          />
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5" />

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrevious}
            aria-label="Foto anterior do Studio"
            className="absolute top-1/2 left-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/45 font-sans text-xl text-white/80 backdrop-blur-sm transition hover:bg-black/70 hover:text-white"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={goNext}
            aria-label="Próxima foto do Studio"
            className="absolute top-1/2 right-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/45 font-sans text-xl text-white/80 backdrop-blur-sm transition hover:bg-black/70 hover:text-white"
          >
            ›
          </button>

          <div className="absolute right-0 bottom-4 left-0 flex justify-center gap-2">
            {images.map(
              (image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() =>
                    setCurrentIndex(
                      index,
                    )
                  }
                  aria-label={`Mostrar foto ${index + 1} do Studio`}
                  className={`h-2 rounded-full transition-all ${
                    index ===
                    currentIndex
                      ? "w-7 bg-ayo-red"
                      : "w-2 bg-white/35 hover:bg-white/60"
                  }`}
                />
              ),
            )}
          </div>
        </>
      )}
    </div>
  );
}
