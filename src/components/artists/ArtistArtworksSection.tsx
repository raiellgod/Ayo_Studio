"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";
import { useState } from "react";

import type { Artwork } from "@/data/mockArtworks";
import { ArtworkCard } from "@/components/artworks/ArtworkCard";

type ArtistArtworksSectionProps = {
  artworks: Artwork[];
};

export function ArtistArtworksSection({
  artworks,
}: ArtistArtworksSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (artworks.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      {/* CABEÇALHO */}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="
          group
          flex
          w-full
          cursor-pointer
          items-end
          justify-between
          gap-8
          border-b
          border-white/10
          pb-5
          text-left
        "
      >
        <div>
          <p
            className="
              font-sans
              text-xs
              font-semibold
              uppercase
              tracking-[0.12em]
              text-[#ff4156]
            "
          >
            ARTE PARA ALÉM DA PELE
          </p>

          <h2
            className="
              font-title
              mt-3
              text-5xl
              leading-none
              text-white
            "
          >
            QUADROS & DESENHOS
          </h2>
        </div>

        <div
          className="
            flex
            shrink-0
            items-center
            gap-4
          "
        >
          <span
            className="
              font-sans
              text-sm
              text-white/40
            "
          >
            {artworks.length}
          </span>

          <span
            className="
              flex
              h-10
              w-10
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
              group-hover:bg-white/10
            "
          >
            {isOpen ? "−" : "+"}
          </span>
        </div>
      </button>

      {/* CONTEÚDO */}

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.35,
              ease: "easeInOut",
            }}
            className="overflow-hidden"
          >
            <div className="pt-7">
              <p
                className="
                  max-w-2xl
                  font-sans
                  text-sm
                  leading-relaxed
                  text-white/55
                "
              >
                Conheça os quadros, desenhos e ilustrações
                disponíveis deste artista.
              </p>

              <div
                className="
                  mt-8
                  grid
                  gap-5
                  sm:grid-cols-2
                  lg:grid-cols-3
                  xl:grid-cols-4
                "
              >
                {artworks.map((artwork) => (
                  <ArtworkCard
                    key={artwork.id}
                    artwork={artwork}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}