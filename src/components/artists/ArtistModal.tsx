"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import type { Artist } from "@/types/artist";
import { getFlashes, type Flash } from "@/lib/api/flashes";

type ArtistModalProps = {
  isOpen: boolean;
  onClose: () => void;
  artist: Artist | null;
};

export function ArtistModal({ isOpen, onClose, artist }: ArtistModalProps) {
  const [previewFlashes, setPreviewFlashes] = useState<Flash[]>([]);

  useEffect(() => {
    if (!isOpen || !artist) {
      return;
    }

    let cancelled = false;

    async function loadFlashes() {
      if (!artist) {
        return;
      }

      try {
        const flashes = await getFlashes(artist.id);

        if (cancelled) {
          return;
        }

        const availableFlashes = flashes.filter((flash) => flash.available);

        const shuffled = [...availableFlashes];

        for (let index = shuffled.length - 1; index > 0; index--) {
          const randomIndex = Math.floor(Math.random() * (index + 1));

          [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
        }

        setPreviewFlashes(shuffled.slice(0, 3));
      } catch (error) {
        console.error("Erro ao carregar flashes do artista:", error);

        if (!cancelled) {
          setPreviewFlashes([]);
        }
      }
    }

    void loadFlashes();

    return () => {
      cancelled = true;
    };
  }, [isOpen, artist]);

  return (
    <AnimatePresence>
      {isOpen && artist && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.2,
          }}
          onClick={() => {
            setPreviewFlashes([]);
            onClose();
          }}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 px-4 py-6 backdrop-blur-sm sm:items-center sm:px-6 sm:py-10"
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 24,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 24,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            onClick={(event) => event.stopPropagation()}
            className="relative grid w-full max-w-5xl gap-6 overflow-hidden rounded-3xl border border-white/10 bg-[#090909] p-4 sm:p-6 md:grid-cols-[0.9fr_1.4fr] md:gap-8 md:p-8"
          >
            {/* =========================================
                FECHAR
            ========================================== */}

            <button
              type="button"
              onClick={() => {
                setPreviewFlashes([]);
                onClose();
              }}
              aria-label="Fechar modal"
              className="absolute top-4 right-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/50 font-sans text-xl text-white transition hover:bg-white/10"
            >
              ×
            </button>

            {/* =========================================
                IMAGEM DO ARTISTA
            ========================================== */}

            <div className="relative min-h-[300px] overflow-hidden rounded-2xl bg-[linear-gradient(145deg,#160607_0%,#090909_100%)] sm:min-h-[420px]">
              <motion.div
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.1,
                  duration: 0.4,
                }}
                className="absolute inset-0"
              >
                {artist.fullImage && (
                  <Image
                    src={artist.fullImage}
                    alt={artist.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover object-top"
                  />
                )}
              </motion.div>
            </div>

            {/* =========================================
                CONTEÚDO
            ========================================== */}

            <div className="flex flex-col justify-center">
              <p className="text-ayo-red font-sans text-xs font-semibold tracking-[0.12em] uppercase">
                {artist.specialties}
              </p>

              <h2 className="font-title mt-2 text-4xl leading-[0.95] text-white sm:text-5xl">
                {artist.name}
              </h2>

              <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-white/60 sm:mt-5 sm:text-base">
                {artist.description}
              </p>

              {/* =========================================
                  FLASHES DISPONÍVEIS
              ========================================== */}

              <div className="mt-8">
                <p className="text-ayo-red font-sans text-xs font-semibold tracking-[0.12em] uppercase">
                  FLASHES DISPONÍVEIS
                </p>

                {previewFlashes.length > 0 ? (
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                    {previewFlashes.map((flash) => (
                      <Link
                        key={flash.id}
                        href={`/flashes/${flash.slug}`}
                        onClick={() => {
                          setPreviewFlashes([]);
                          onClose();
                        }}
                        className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111111] transition hover:-translate-y-1 hover:border-white/20"
                      >
                        <div className="relative aspect-square">
                          {flash.image ? (
                            <Image
                              src={flash.image}
                              alt={flash.name}
                              fill
                              unoptimized
                              sizes="160px"
                              className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center font-sans text-xs text-white/25">
                              flash
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 font-sans text-sm text-white/40">
                    Nenhum flash disponível no momento.
                  </p>
                )}
              </div>

              {/* =========================================
                  VEJA MAIS
              ========================================== */}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={`/artistas/${artist.slug}/pedido`}
                  onClick={() => {
                    setPreviewFlashes([]);
                    onClose();
                  }}
                  className="bg-ayo-red text-ayo-cream hover:bg-ayo-red/85 mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full px-7 font-sans text-sm font-bold transition hover:-translate-y-0.5 sm:w-fit"
                >
                  FAZER UM PEDIDO
                </Link>

                <Link
                  href={`/artistas/${artist.slug}`}
                  onClick={() => {
                    setPreviewFlashes([]);
                    onClose();
                  }}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/15 px-7 font-sans text-sm font-semibold text-white/70 transition hover:border-white/30 hover:text-white sm:w-fit"
                >
                  VER PERFIL
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
