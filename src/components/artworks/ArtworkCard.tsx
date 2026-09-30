"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import type { Artwork } from "@/data/mockArtworks";

type ArtworkCardProps = {
  artwork: Artwork;
  featured?: boolean;
};

export function ArtworkCard({
  artwork,
  featured = false,
}: ArtworkCardProps) {
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
        className="
          group
          flex
          h-full
          flex-col
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-[#090909]
        "
      >
        {/* =========================================
            IMAGEM
        ========================================== */}

        <div
          className={`
            relative
            overflow-hidden
            bg-[linear-gradient(145deg,#171717_0%,#090909_100%)]
            ${
              featured
                ? "min-h-[420px] flex-1"
                : "min-h-[190px]"
            }
          `}
        >
          {artwork.image ? (
            <Image
              src={artwork.image}
              alt={artwork.name}
              fill
              unoptimized
              sizes={
                featured
                  ? "(max-width: 1024px) 100vw, 35vw"
                  : "(max-width: 1024px) 50vw, 20vw"
              }
              className={`
                object-cover
                transition-all
                duration-300
                group-hover:scale-[1.03]
                ${
                  isAvailable
                    ? "opacity-100"
                    : "opacity-40 grayscale-[30%]"
                }
              `}
            />
          ) : (
            <div className="flex h-full items-center justify-center font-sans text-sm text-white/20">
              obra
            </div>
          )}

          {!isAvailable && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20">
              <span className="rounded-full border border-[#ff4156]/50 bg-black/80 px-5 py-2 font-sans text-xs font-bold uppercase tracking-[0.12em] text-[#ff4156]">
                RESERVADO
              </span>
            </div>
          )}
        </div>

        {/* =========================================
            INFORMAÇÕES
        ========================================== */}

        <div
          className={`
            border-t
            border-white/5
            bg-black/60
            ${
              featured
                ? "px-6 py-5"
                : "px-4 py-4"
            }
          `}
        >
          <h3
            className={`
              font-title
              text-white
              ${
                featured
                  ? "text-2xl"
                  : "text-lg"
              }
            `}
          >
            {artwork.name}
          </h3>

          <p className="mt-1 font-sans text-xs text-white/55">
            {artwork.artistName}
          </p>

          <p className="mt-2 font-sans text-[11px] font-semibold uppercase tracking-[0.08em] text-[#77c043]">
            {artwork.type}
          </p>

          {/* =========================================
              PREÇO / STATUS
          ========================================== */}

          {isAvailable ? (
            <p className="mt-1 min-h-[20px] font-sans text-sm font-semibold text-[#77c043]">
              {artwork.price !== null
                ? artwork.price.toLocaleString(
                    "pt-BR",
                    {
                      style: "currency",
                      currency: "BRL",
                    },
                  )
                : "\u00A0"}
            </p>
          ) : (
            <p className="mt-1 min-h-[20px] font-sans text-xs font-semibold uppercase tracking-[0.08em] text-[#ff4156]">
              RESERVADO
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}