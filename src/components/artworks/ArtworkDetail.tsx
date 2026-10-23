"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import type { Artwork } from "@/data/mockArtworks";
import { mockArtists } from "@/data/mockArtists";

type ArtworkDetailProps = {
  artwork: Artwork;
};

export function ArtworkDetail({
  artwork,
}: ArtworkDetailProps) {
  const artist = mockArtists.find(
    (item) => item.id === artwork.artistId,
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(rgba(0,0,0,0.20),rgba(0,0,0,0.35)),linear-gradient(135deg,#000000_0%,#090000_45%,#220000_100%)] px-6 py-10 text-white lg:px-12">
      <div className="mx-auto w-full max-w-7xl">
        {/* =========================================
            VOLTAR
        ========================================== */}

        <Link
          href="/#artes"
          className="inline-flex items-center gap-2 font-sans text-sm text-white/60 transition hover:text-white"
        >
          ← VOLTAR PARA AS ARTES
        </Link>

        {/* =========================================
            CONTEÚDO
        ========================================== */}

        <div className="mt-8 grid items-center gap-8 sm:mt-12 sm:gap-12 lg:grid-cols-[1.2fr_0.8fr]">
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
            className="relative min-h-[360px] sm:min-h-[520px] lg:min-h-[620px] overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(145deg,#171717_0%,#080808_100%)]"
          >
            {artwork.image ? (
              <Image
                src={artwork.image}
                alt={artwork.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className={`
                  object-contain
                  p-8
                  transition
                  ${
                    artwork.available
                      ? "opacity-100"
                      : "opacity-40 grayscale-[30%]"
                  }
                `}
              />
            ) : (
              <div className="flex h-full min-h-[360px] sm:min-h-[520px] lg:min-h-[620px] items-center justify-center font-sans text-white/20">
                imagem da obra
              </div>
            )}

            {!artwork.available && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20">
                <span className="rounded-full border border-ayo-red/50 bg-black/80 px-6 py-3 font-sans text-sm font-bold uppercase tracking-[0.12em] text-ayo-red">
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
            <p className="font-sans text-sm font-semibold tracking-[0.12em] text-ayo-red uppercase">
              ARTE AUTORAL
            </p>

            <h1 className="font-title mt-4 text-5xl leading-[0.95] text-white sm:text-6xl">
              {artwork.name}
            </h1>

            <p className="mt-4 font-sans text-sm text-white/50">
              por {artwork.artistName}
            </p>

            {/* =========================================
                STATUS
            ========================================== */}

            {!artwork.available && (
              <div className="mt-6">
                <span className="inline-flex rounded-full border border-ayo-red/40 bg-ayo-red/10 px-4 py-2 font-sans text-xs font-bold uppercase tracking-[0.1em] text-ayo-red">
                  RESERVADO
                </span>
              </div>
            )}

            {/* =========================================
                TIPO
            ========================================== */}

            <div className="mt-6">
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-sans text-xs font-semibold tracking-[0.08em] text-ayo-red uppercase">
                {artwork.type}
              </span>
            </div>

            {/* =========================================
                DESCRIÇÃO
            ========================================== */}

            <p className="mt-8 max-w-lg font-sans text-base leading-relaxed text-white/65">
              Trabalho autoral criado por{" "}
              {artwork.artistName}. Esta
              página poderá receber
              posteriormente descrição,
              técnica, dimensões e outras
              informações da obra.
            </p>

            {/* =========================================
                PREÇO
            ========================================== */}

            {artwork.price !== null && (
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
                      artwork.available
                        ? "text-ayo-cream"
                        : "text-white/35"
                    }
                  `}
                >
                  {artwork.price.toLocaleString(
                    "pt-BR",
                    {
                      style: "currency",
                      currency: "BRL",
                    },
                  )}
                </p>
              </div>
            )}

            {/* =========================================
                AÇÕES
            ========================================== */}

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
              {artwork.available ? (
                <Link
                  href={`/reservar/arte/${artwork.slug}`}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ayo-red px-8 font-sans text-sm font-bold text-ayo-cream transition hover:-translate-y-0.5 hover:bg-ayo-red/85 sm:w-auto"
                >
                  SOLICITAR RESERVA
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className="inline-flex min-h-12 cursor-not-allowed items-center justify-center rounded-full border border-ayo-red/25 bg-ayo-red/10 px-8 font-sans text-sm font-bold text-ayo-red/70"
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
              {artwork.available
                ? "O envio de interesse não representa confirmação automática de reserva ou venda."
                : "Esta obra já foi reservada e não aceita novas solicitações."}
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}