"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import type { Artwork } from "@/data/mockArtworks";

type ArtworkCardProps = {
  artwork: Artwork;
  featured?: boolean;
};

export function ArtworkCard({ artwork, featured = false }: ArtworkCardProps) {
  const isAvailable = artwork.available;

  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      className="h-full"
    >
      <Link
        href={`/artes/${artwork.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#090909]"
      >
        {/* =========================================
            IMAGEM
        ========================================== */}

        <div
          className={`relative overflow-hidden bg-[linear-gradient(145deg,#171717_0%,#090909_100%)] ${
            featured ? "min-h-[300px] flex-1 sm:min-h-[420px]" : "min-h-[180px] sm:min-h-[190px]"
          } `}
        >
          {artwork.image ? (
            <Image
              src={artwork.image}
              alt={artwork.name}
              fill
              unoptimized
              sizes={
                featured ? "(max-width: 1024px) 100vw, 35vw" : "(max-width: 1024px) 50vw, 20vw"
              }
              className={`object-cover transition-all duration-300 group-hover:scale-[1.03] ${
                isAvailable ? "opacity-100" : "opacity-40 grayscale-[30%]"
              } `}
            />
          ) : (
            <div className="flex h-full items-center justify-center font-sans text-sm text-white/20">
              obra
            </div>
          )}

          {!isAvailable && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20">
              <span className="rounded-full border border-ayo-red/50 bg-black/80 px-5 py-2 font-sans text-xs font-bold tracking-[0.12em] text-ayo-red uppercase">
                RESERVADO
              </span>
            </div>
          )}
        </div>

        {/* =========================================
            INFORMAÇÕES
        ========================================== */}

        <div
          className={`border-t border-white/5 bg-black/60 ${featured ? "px-5 py-4 sm:px-6 sm:py-5" : "px-4 py-4"} `}
        >
          <h3 className={`font-title text-white ${featured ? "text-xl sm:text-2xl" : "text-lg"} `}>
            {artwork.name}
          </h3>

          <p className="mt-1 font-sans text-xs text-white/55">{artwork.artistName}</p>

          <p className="font-accent text-ayo-red mt-2 text-[11px] tracking-[0.08em] uppercase">
            {artwork.type}
          </p>

          {/* =========================================
              PREÇO / STATUS
          ========================================== */}

          {isAvailable ? (
            <p className="text-ayo-cream mt-1 min-h-[20px] font-sans text-sm font-semibold">
              {artwork.price !== null
                ? artwork.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                : "\u00A0"}
            </p>
          ) : (
            <p className="mt-1 min-h-[20px] font-sans text-xs font-semibold tracking-[0.08em] text-ayo-red uppercase">
              RESERVADO
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
