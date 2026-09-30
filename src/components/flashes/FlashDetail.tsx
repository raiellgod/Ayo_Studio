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
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(rgba(0,0,0,0.35),rgba(0,0,0,0.35)),linear-gradient(135deg,#000000_0%,#090000_20%,#260000_48%,#120000_68%,#00100c_88%,#001d16_100%)] px-6 py-10 text-white lg:px-12">
      <div className="mx-auto w-full max-w-7xl">
        {/* =========================================
            VOLTAR
        ========================================== */}

        <Link
          href="/#flashes"
          className="inline-flex items-center gap-2 font-sans text-sm text-white/60 transition hover:text-white"
        >
          ← VOLTAR PARA OS FLASHES
        </Link>

        {/* =========================================
            CONTEÚDO
        ========================================== */}

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          {/* =========================================
              IMAGEM
          ========================================== */}

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
                  p-10
                  transition
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
                <span className="rounded-full border border-[#ff4156]/50 bg-black/80 px-6 py-3 font-sans text-sm font-bold uppercase tracking-[0.12em] text-[#ff4156]">
                  RESERVADO
                </span>
              </div>
            )}
          </motion.div>

          {/* =========================================
              INFORMAÇÕES
          ========================================== */}

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
            <p className="font-sans text-sm font-semibold tracking-[0.12em] text-[#ff4156] uppercase">
              FLASH AUTORAL
            </p>

            <h1 className="font-title mt-4 text-6xl leading-none text-white">
              {flash.name}
            </h1>

            <p className="mt-4 font-sans text-sm text-white/50">
              por {flash.artistName}
            </p>

            {/* =========================================
                STATUS
            ========================================== */}

            {!flash.available && (
              <div className="mt-6">
                <span className="inline-flex rounded-full border border-[#ff4156]/40 bg-[#ff4156]/10 px-4 py-2 font-sans text-xs font-bold uppercase tracking-[0.1em] text-[#ff4156]">
                  RESERVADO
                </span>
              </div>
            )}

            {/* =========================================
                CATEGORIAS
            ========================================== */}

            <div className="mt-6 flex flex-wrap gap-2">
              {flash.categories.map(
                (category) => (
                  <span
                    key={category}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-sans text-xs text-white/60"
                  >
                    {category}
                  </span>
                ),
              )}
            </div>

            {/* =========================================
                DESCRIÇÃO
            ========================================== */}

            <p className="mt-8 max-w-xl font-sans text-base leading-relaxed text-white/65">
              {flash.description}
            </p>

            {/* =========================================
                PREÇO
            ========================================== */}

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
                      ? "text-white"
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

            {/* =========================================
                AÇÕES
            ========================================== */}

            <div className="mt-10 flex flex-wrap gap-4">
              {flash.available ? (
                <Link
                  href={`/reservar/flash/${flash.slug}`}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#ff4156] px-8 font-sans text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-[#ff5b6d]"
                >
                  SOLICITAR RESERVA
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className="inline-flex min-h-12 cursor-not-allowed items-center justify-center rounded-full border border-[#ff4156]/25 bg-[#ff4156]/10 px-8 font-sans text-sm font-bold text-[#ff4156]/70"
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
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-8 font-sans text-sm font-semibold text-white/70 transition hover:border-white/30 hover:text-white"
              >
                VER ARTISTA
              </Link>
            </div>

            {/* =========================================
                AVISO
            ========================================== */}

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