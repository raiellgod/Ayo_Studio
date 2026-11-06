"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

type Video = {
  id: number;
  slug: string;
  name: string;

  artistId: number;
  artistName: string;
  artistSlug: string;

  video: string;
  thumbnail: string;
  description: string;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
};

export default function AdminVideosPage() {
  const [videos, setVideos] =
    useState<Video[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [updatingId, setUpdatingId] =
    useState<number | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  const loadVideos =
    useCallback(async () => {
      try {
        setError(null);

        const response = await fetch(
          "/api/admin/videos",
          {
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error(
            "Não foi possível carregar os vídeos.",
          );
        }

        const data =
          (await response.json()) as Video[];

        setVideos(data);
      } catch (loadError) {
        console.error(loadError);

        setError(
          "Não foi possível carregar os vídeos.",
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    const timeoutId =
      window.setTimeout(() => {
        void loadVideos();
      }, 0);

    return () =>
      window.clearTimeout(timeoutId);
  }, [loadVideos]);

  async function toggleStatus(
    video: Video,
  ) {
    try {
      setUpdatingId(video.id);
      setError(null);

      const response = await fetch(
        `/api/admin/videos/${video.id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            isActive:
              !video.isActive,
          }),
        },
      );

      if (!response.ok) {
        const result =
          (await response.json()) as {
            message?: string;
          };

        throw new Error(
          result.message ??
            "Não foi possível atualizar o vídeo.",
        );
      }

      await loadVideos();
    } catch (updateError) {
      console.error(updateError);

      setError(
        updateError instanceof Error
          ? updateError.message
          : "Não foi possível atualizar o vídeo.",
      );
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <main className="px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-7xl">
        <header className="flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-accent text-xs uppercase tracking-[0.14em] text-ayo-red">
              AYŌ STUDIO
            </p>

            <h1 className="mt-3 font-title text-4xl sm:text-5xl">
              Vídeos
            </h1>

            <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-white/50">
              Gerencie vídeos, autoria,
              thumbnail e descrição.
            </p>
          </div>

          <Link
            href="/admin/videos/novo"
            className="rounded-full bg-ayo-red px-6 py-3 text-center font-sans text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:brightness-110"
          >
            Novo vídeo
          </Link>
        </header>

        {loading && (
          <div className="py-16 font-sans text-sm text-white/40">
            Carregando vídeos...
          </div>
        )}

        {error && (
          <div className="mt-8 rounded-2xl border border-ayo-red/30 bg-ayo-red/10 p-4 font-sans text-sm text-ayo-cream">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          videos.length === 0 && (
            <div className="py-16 font-sans text-sm text-white/40">
              Nenhum vídeo encontrado.
            </div>
          )}

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {videos.map((video) => (
            <article
              key={video.id}
              className="overflow-hidden rounded-3xl border border-white/10 bg-[#101010]"
            >
              {video.thumbnail ? (
                <div
                  className="aspect-video bg-black bg-cover bg-center"
                  style={{
                    backgroundImage: `url("${video.thumbnail}")`,
                  }}
                />
              ) : (
                <video
                  src={video.video}
                  controls
                  preload="metadata"
                  className="aspect-video w-full bg-black object-contain"
                />
              )}

              <div className="p-5">
                <span
                  className={`rounded-full border px-3 py-1 font-sans text-[10px] uppercase tracking-[0.08em] ${
                    video.isActive
                      ? "border-white/10 text-white/55"
                      : "border-ayo-red/40 bg-ayo-red/10 text-ayo-cream"
                  }`}
                >
                  {video.isActive
                    ? "Ativo"
                    : "Inativo"}
                </span>

                <p className="mt-4 font-accent text-xs uppercase tracking-[0.1em] text-ayo-red">
                  {video.artistName}
                </p>

                <h2 className="mt-2 font-title text-3xl">
                  {video.name}
                </h2>

                <p className="mt-1 font-sans text-xs text-white/30">
                  /{video.slug}
                </p>

                {video.description && (
                  <p className="mt-4 line-clamp-3 font-sans text-sm leading-relaxed text-white/45">
                    {video.description}
                  </p>
                )}

                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    href={`/admin/videos/${video.id}`}
                    className="rounded-full border border-white/10 px-4 py-2 font-sans text-[11px] uppercase tracking-[0.08em] text-white/55 transition hover:border-white/30 hover:text-white"
                  >
                    Editar
                  </Link>

                  <button
                    type="button"
                    disabled={
                      updatingId === video.id
                    }
                    onClick={() =>
                      void toggleStatus(video)
                    }
                    className="rounded-full border border-white/10 px-4 py-2 font-sans text-[11px] uppercase tracking-[0.08em] text-white/55 transition hover:border-ayo-red/50 hover:text-white disabled:cursor-wait disabled:opacity-40"
                  >
                    {video.isActive
                      ? "Desativar"
                      : "Ativar"}
                  </button>

                  <a
                    href={video.video}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 px-4 py-2 font-sans text-[11px] uppercase tracking-[0.08em] text-white/55 transition hover:border-white/30 hover:text-white"
                  >
                    Abrir vídeo
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
