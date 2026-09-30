"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";

import type { Artist } from "@/data/mockArtists";
import { mockFlashes } from "@/data/mockFlashes";

type ArtistModalProps = {
  isOpen: boolean;
  onClose: () => void;
  artist: Artist | null;
};

export function ArtistModal({ isOpen, onClose, artist }: ArtistModalProps) {
  const [previewFlashes, setPreviewFlashes] = useState<typeof mockFlashes>([]);

  function selectPreviewFlashes() {
    if (!artist) {
      return;
    }

    const availableFlashes = mockFlashes.filter(
      (flash) => flash.artistId === artist.id && flash.available,
    );

    const shuffled = [...availableFlashes];

    for (let index = shuffled.length - 1; index > 0; index--) {
      const randomIndex = Math.floor(Math.random() * (index + 1));

      [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
    }

    setPreviewFlashes(shuffled.slice(0, 3));
  }

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
          onAnimationStart={
            selectPreviewFlashes
          }
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 px-6 py-10 backdrop-blur-sm"
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
            className="relative grid w-full max-w-5xl gap-8 overflow-hidden rounded-3xl border border-white/10 bg-[#090909] p-6 md:grid-cols-[0.9fr_1.4fr] md:p-8"
          >
            {/* =========================================
                FECHAR
            ========================================== */}

            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar modal"
              className="absolute top-4 right-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/50 font-sans text-xl text-white transition hover:bg-white/10"
            >
              ×
            </button>

            {/* =========================================
                IMAGEM DO ARTISTA
            ========================================== */}

            <div className="relative min-h-[420px] overflow-hidden rounded-2xl bg-[linear-gradient(145deg,#160607_0%,#071611_100%)]">
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
                <Image
                  src={artist.fullImage}
                  alt={artist.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-contain object-bottom p-4"
                />
              </motion.div>
            </div>

            {/* =========================================
                CONTEÚDO
            ========================================== */}

            <div className="flex flex-col justify-center">
              <p className="font-sans text-xs font-semibold tracking-[0.12em] text-[#ff4156] uppercase">
                {artist.specialties}
              </p>

              <h2 className="font-title mt-2 text-5xl text-white">{artist.name}</h2>

              <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/60">
                {artist.description}
              </p>

              {/* =========================================
                  FLASHES DISPONÍVEIS
              ========================================== */}

              <div className="mt-8">
                <p className="font-sans text-xs font-semibold tracking-[0.12em] text-[#77c043] uppercase">
                  FLASHES DISPONÍVEIS
                </p>

                {previewFlashes.length > 0 ? (
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {previewFlashes.map((flash) => (
                      <Link
                        key={flash.id}
                        href={`/flashes/${flash.slug}`}
                        onClick={onClose}
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

              <Link
                href={`/artistas/${artist.slug}`}
                onClick={onClose}
                className="mt-8 inline-flex min-h-12 w-fit items-center justify-center rounded-full bg-[#ff4156] px-7 font-sans text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-[#ff5b6d]"
              >
                VEJA MAIS
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
