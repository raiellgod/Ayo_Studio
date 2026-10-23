"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { mockArtists } from "@/data/mockArtists";
import type { SelectableFlash } from "@/lib/flashes/selectFeaturedFlashes";

type FlashDetailProps = {
  flash: SelectableFlash;
};

export function FlashDetail({
  flash,
}: FlashDetailProps) {
  const artist = mockArtists.find(
    (item) => item.id === flash.artistId,
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.35)),linear-gradient(135deg,#000000_0%,#160607_45%,#070000_75%,#220000_100%)] px-5 py-8 text-white sm:px-6 sm:py-10 lg:px-12">
      <div className="mx-auto w-full max-w-7xl">
        <Link
          href="/#flashes"
          className="inline-flex items-center gap-2 font-sans text-sm text-white/60 transition hover:text-white"
        >
          ← VOLTAR PARA OS FLASHES
        </Link>

        <div className="mt-8 grid items-center gap-8 sm:mt-12 sm:gap-12 lg:grid-cols-[1fr_1fr]">
          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(145deg,#171717_0%,#090909_100%)]"
          >
            {flash.image ? (
              <Image
                src={flash.image}
                alt={flash.name}
                fill
                priority
                unoptimized
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={`
                  object-contain
                  p-6
                  transition
                  sm:p-10
                  ${
                    flash.available
                      ? "opacity-100"
                      : "opacity-40 grayscale-[30%]"
                  }
                `}
              />
            ) : (
              <div className="flex h-full items-center justify-center font-sans text-white/20">
                imagem do flash
              </div>
            )}

            {!flash.available && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20">
                <span className="border-ayo-red/50 text-ayo-red rounded-full border bg-black/80 px-6 py-3 font-sans text-sm font-bold tracking-[0.12em] uppercase">
                  RESERVADO
                </span>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: "easeOut",
            }}
          >
            <p className="font-accent text-ayo-red text-xs tracking-[0.12em] uppercase sm:text-sm">
              FLASH AUTORAL
            </p>

            <h1 className="font-title mt-4 text-5xl leading-[0.95] text-white sm:text-6xl">
              {flash.name}
            </h1>

            <p className="mt-4 font-sans text-sm text-white/50">
              por {flash.artistName}
            </p>

            {!flash.available && (
              <div className="mt-6">
                <span className="border-ayo-red/40 bg-ayo-red/10 text-ayo-red inline-flex rounded-full border px-4 py-2 font-sans text-xs font-bold tracking-[0.1em] uppercase">
                  RESERVADO
                </span>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              {flash.categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-sans text-xs text-white/60"
                >
                  {category}
                </span>
              ))}
            </div>

            <p className="mt-6 max-w-xl font-sans text-sm leading-relaxed text-white/65 sm:mt-8 sm:text-base">
              {flash.description}
            </p>

            <div className="mt-8">
              <p className="font-sans text-xs tracking-[0.1em] text-white/40 uppercase">
                VALOR
              </p>

              <p
                className={`
                  mt-1
                  font-sans
                  text-3xl
                  font-semibold
                  ${
                    flash.available
                      ? "text-ayo-cream"
                      : "text-white/35"
                  }
                `}
              >
                {flash.price.toLocaleString(
                  "pt-BR",
                  {
                    style: "currency",
                    currency: "BRL",
                  },
                )}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
              {flash.available ? (
                <Link
                  href={`/reservar/flash/${flash.slug}`}
                  className="bg-ayo-red text-ayo-cream hover:bg-ayo-red/85 inline-flex min-h-12 w-full items-center justify-center rounded-full px-8 font-sans text-sm font-bold transition hover:-translate-y-0.5 sm:w-auto"
                >
                  SOLICITAR RESERVA
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className="border-ayo-red/25 bg-ayo-red/10 text-ayo-red/70 inline-flex min-h-12 w-full cursor-not-allowed items-center justify-center rounded-full border px-8 font-sans text-sm font-bold sm:w-auto"
                >
                  RESERVADO
                </span>
              )}

              <Link
                href={
                  artist
                    ? `/artistas/${artist.slug}`
                    : "/#artistas"
                }
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/15 px-8 font-sans text-sm font-semibold text-white/70 transition hover:border-white/30 hover:text-white sm:w-auto"
              >
                VER ARTISTA
              </Link>
            </div>

            <p className="mt-5 max-w-lg font-sans text-xs leading-relaxed text-white/35">
              {flash.available
                ? "A solicitação de reserva não confirma automaticamente o flash. A confirmação será feita pelo Studio."
                : "Este flash já foi reservado e não aceita novas solicitações."}
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
