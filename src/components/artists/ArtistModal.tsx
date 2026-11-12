"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  useEffect,
  useState,
} from "react";

import type { Artist } from "@/types/artist";

import {
  getFlashes,
  type Flash,
} from "@/lib/api/flashes";

import {
  getArtworks,
  type Artwork,
} from "@/lib/api/artworks";

import {
  getVideos,
  type Video,
} from "@/lib/api/videos";

type ArtistModalProps = {
  isOpen: boolean;
  onClose: () => void;
  artist: Artist | null;
};

type PreviewType =
  | "flashes"
  | "artworks"
  | "videos"
  | null;

function shuffleAndTake<T>(
  items: T[],
  amount: number,
) {
  const shuffled = [...items];

  for (
    let index = shuffled.length - 1;
    index > 0;
    index--
  ) {
    const randomIndex =
      Math.floor(
        Math.random() * (index + 1),
      );

    [
      shuffled[index],
      shuffled[randomIndex],
    ] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled.slice(0, amount);
}

export function ArtistModal({
  isOpen,
  onClose,
  artist,
}: ArtistModalProps) {
  const [previewType, setPreviewType] =
    useState<PreviewType>(null);

  const [
    previewFlashes,
    setPreviewFlashes,
  ] = useState<Flash[]>([]);

  const [
    previewArtworks,
    setPreviewArtworks,
  ] = useState<Artwork[]>([]);

  const [
    previewVideos,
    setPreviewVideos,
  ] = useState<Video[]>([]);

  const [loadingPreview, setLoadingPreview] =
    useState(false);

  function clearPreview() {
    setPreviewType(null);
    setPreviewFlashes([]);
    setPreviewArtworks([]);
    setPreviewVideos([]);
    setLoadingPreview(false);
  }

  function closeModal() {
    clearPreview();
    onClose();
  }

  useEffect(() => {
    if (!isOpen || !artist) {
      return;
    }

    let cancelled = false;

    async function loadPreview() {
      if (!artist) {
        return;
      }

      try {
        setLoadingPreview(true);

        setPreviewFlashes([]);
        setPreviewArtworks([]);
        setPreviewVideos([]);

        /*
         * PRIORIDADE:
         *
         * 1. tattoo -> flashes
         * 2. art    -> quadros / desenhos
         * 3. voice  -> vídeos
         *
         * Assim um profissional com:
         *
         * ["tattoo", "art"]
         *
         * continua mostrando flashes.
         */

        if (
          artist.services.includes(
            "tattoo",
          )
        ) {
          setPreviewType("flashes");

          const flashes =
            await getFlashes(artist.id);

          if (cancelled) {
            return;
          }

          const availableFlashes =
            flashes.filter(
              (flash) =>
                flash.available,
            );

          setPreviewFlashes(
            shuffleAndTake(
              availableFlashes,
              3,
            ),
          );

          return;
        }

        if (
          artist.services.includes(
            "art",
          )
        ) {
          setPreviewType("artworks");

          const artworks =
            await getArtworks(artist.id);

          if (cancelled) {
            return;
          }

          const availableArtworks =
            artworks.filter(
              (artwork) =>
                artwork.available,
            );

          setPreviewArtworks(
            shuffleAndTake(
              availableArtworks,
              3,
            ),
          );

          return;
        }

        if (
          artist.services.includes(
            "voice",
          )
        ) {
          setPreviewType("videos");

          const videos =
            await getVideos(artist.id);

          if (cancelled) {
            return;
          }

          setPreviewVideos(
            shuffleAndTake(
              videos,
              2,
            ),
          );

          return;
        }

        setPreviewType(null);
      } catch (error) {
        console.error(
          "Erro ao carregar conteúdo do profissional:",
          error,
        );

        if (!cancelled) {
          clearPreview();
        }
      } finally {
        if (!cancelled) {
          setLoadingPreview(false);
        }
      }
    }

    void loadPreview();

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
          onClick={closeModal}
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
            onClick={(event) =>
              event.stopPropagation()
            }
            className="relative grid w-full max-w-5xl gap-6 overflow-hidden rounded-3xl border border-white/10 bg-[#090909] p-4 sm:p-6 md:grid-cols-[0.9fr_1.4fr] md:gap-8 md:p-8"
          >
            {/* FECHAR */}

            <button
              type="button"
              onClick={closeModal}
              aria-label="Fechar modal"
              className="absolute top-4 right-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-black/50 font-sans text-xl text-white transition hover:bg-white/10"
            >
              ×
            </button>

            {/* IMAGEM */}

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
                    src={
                      artist.fullImage
                    }
                    alt={artist.name}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover object-top"
                  />
                )}
              </motion.div>
            </div>

            {/* CONTEÚDO */}

            <div className="flex flex-col justify-center">
              {artist.specialties && (
                <p className="text-ayo-red font-sans text-xs font-semibold tracking-[0.12em] uppercase">
                  {
                    artist.specialties
                  }
                </p>
              )}

              <h2 className="font-title mt-2 text-4xl leading-[0.95] text-white sm:text-5xl">
                {artist.name}
              </h2>

              {artist.description && (
                <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-white/60 sm:mt-5 sm:text-base">
                  {
                    artist.description
                  }
                </p>
              )}

              {/* PREVIEW DINÂMICO */}

              <div className="mt-8">
                {previewType ===
                  "flashes" && (
                  <>
                    <p className="text-ayo-red font-sans text-xs font-semibold tracking-[0.12em] uppercase">
                      FLASHES DISPONÍVEIS
                    </p>

                    {loadingPreview ? (
                      <p className="mt-4 font-sans text-sm text-white/40">
                        Carregando...
                      </p>
                    ) : previewFlashes.length >
                      0 ? (
                      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                        {previewFlashes.map(
                          (flash) => (
                            <Link
                              key={
                                flash.id
                              }
                              href={`/flashes/${flash.slug}`}
                              onClick={
                                closeModal
                              }
                              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111111] transition hover:-translate-y-1 hover:border-white/20"
                            >
                              <div className="relative aspect-square">
                                {flash.image ? (
                                  <Image
                                    src={
                                      flash.image
                                    }
                                    alt={
                                      flash.name
                                    }
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
                          ),
                        )}
                      </div>
                    ) : (
                      <p className="mt-4 font-sans text-sm text-white/40">
                        Nenhum flash
                        disponível no
                        momento.
                      </p>
                    )}
                  </>
                )}

                {previewType ===
                  "artworks" && (
                  <>
                    <p className="text-ayo-red font-sans text-xs font-semibold tracking-[0.12em] uppercase">
                      QUADROS & DESENHOS
                    </p>

                    {loadingPreview ? (
                      <p className="mt-4 font-sans text-sm text-white/40">
                        Carregando...
                      </p>
                    ) : previewArtworks.length >
                      0 ? (
                      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                        {previewArtworks.map(
                          (artwork) => (
                            <Link
                              key={
                                artwork.id
                              }
                              href={`/artes/${artwork.slug}`}
                              onClick={
                                closeModal
                              }
                              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#111111] transition hover:-translate-y-1 hover:border-white/20"
                            >
                              <div className="relative aspect-square">
                                {artwork.image ? (
                                  <Image
                                    src={
                                      artwork.image
                                    }
                                    alt={
                                      artwork.name
                                    }
                                    fill
                                    unoptimized
                                    sizes="160px"
                                    className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                                  />
                                ) : (
                                  <div className="flex h-full items-center justify-center font-sans text-xs text-white/25">
                                    arte
                                  </div>
                                )}
                              </div>
                            </Link>
                          ),
                        )}
                      </div>
                    ) : (
                      <p className="mt-4 font-sans text-sm text-white/40">
                        Nenhuma obra
                        disponível no
                        momento.
                      </p>
                    )}
                  </>
                )}

                {previewType ===
                  "videos" && (
                  <>
                    <p className="text-ayo-red font-sans text-xs font-semibold tracking-[0.12em] uppercase">
                      TRABALHOS EM
                      VÍDEO
                    </p>

                    {loadingPreview ? (
                      <p className="mt-4 font-sans text-sm text-white/40">
                        Carregando...
                      </p>
                    ) : previewVideos.length >
                      0 ? (
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        {previewVideos.map(
                          (video) => (
                            <article
                              key={
                                video.id
                              }
                              className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111]"
                            >
                              <video
                                controls
                                preload="metadata"
                                poster={
                                  video.thumbnail ??
                                  undefined
                                }
                                className="aspect-video w-full bg-black object-cover"
                              >
                                <source
                                  src={
                                    video.video
                                  }
                                  type="video/mp4"
                                />

                                Seu navegador não
                                suporta reprodução
                                de vídeo.
                              </video>

                              <div className="border-t border-white/5 px-4 py-3">
                                <p className="font-title text-lg text-white">
                                  {
                                    video.name
                                  }
                                </p>
                              </div>
                            </article>
                          ),
                        )}
                      </div>
                    ) : (
                      <p className="mt-4 font-sans text-sm text-white/40">
                        Nenhum vídeo
                        disponível no
                        momento.
                      </p>
                    )}
                  </>
                )}
              </div>

              {/* AÇÕES */}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={`/artistas/${artist.slug}/pedido`}
                  onClick={closeModal}
                  className="bg-ayo-red text-ayo-cream hover:bg-ayo-red/85 mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full px-7 font-sans text-sm font-bold transition hover:-translate-y-0.5 sm:w-fit"
                >
                  FAZER UM PEDIDO
                </Link>

                <Link
                  href={`/artistas/${artist.slug}`}
                  onClick={closeModal}
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