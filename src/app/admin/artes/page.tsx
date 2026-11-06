"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

type Artwork = {
  id: number;
  slug: string;
  name: string;

  artistId: number;
  artistName: string;
  artistSlug: string;

  image: string;
  type: string;
  price: number | null;

  available: boolean;
  isActive: boolean;

  createdAt: string;
  updatedAt: string;
};

function formatPrice(
  price: number | null,
) {
  if (price === null) {
    return "Preço sob consulta";
  }

  return new Intl.NumberFormat(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    },
  ).format(price);
}

export default function AdminArtesPage() {
  const [artworks, setArtworks] =
    useState<Artwork[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [updatingKey, setUpdatingKey] =
    useState<string | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  const loadArtworks =
    useCallback(async () => {
      try {
        setError(null);

        const response = await fetch(
          "/api/admin/artworks",
          {
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error(
            "Não foi possível carregar as artes.",
          );
        }

        const data =
          (await response.json()) as Artwork[];

        setArtworks(data);
      } catch (loadError) {
        console.error(loadError);

        setError(
          "Não foi possível carregar as artes.",
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    const timeoutId =
      window.setTimeout(() => {
        void loadArtworks();
      }, 0);

    return () =>
      window.clearTimeout(timeoutId);
  }, [loadArtworks]);

  async function patchBoolean(
    artwork: Artwork,
    kind:
      | "status"
      | "availability",
  ) {
    const key =
      `${artwork.id}-${kind}`;

    try {
      setUpdatingKey(key);
      setError(null);

      const payload =
        kind === "status"
          ? {
              isActive:
                !artwork.isActive,
            }
          : {
              available:
                !artwork.available,
            };

      const response = await fetch(
        `/api/admin/artworks/${artwork.id}/${kind}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        const result =
          (await response.json()) as {
            message?: string;
          };

        throw new Error(
          result.message ??
            "Não foi possível atualizar a arte.",
        );
      }

      await loadArtworks();
    } catch (updateError) {
      console.error(updateError);

      setError(
        updateError instanceof Error
          ? updateError.message
          : "Não foi possível atualizar a arte.",
      );
    } finally {
      setUpdatingKey(null);
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
              Artes
            </h1>

            <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-white/50">
              Gerencie obras, autoria,
              tipo, preço e disponibilidade.
            </p>
          </div>

          <Link
            href="/admin/artes/novo"
            className="rounded-full bg-ayo-red px-6 py-3 text-center font-sans text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:brightness-110"
          >
            Nova arte
          </Link>
        </header>

        {loading && (
          <div className="py-16 font-sans text-sm text-white/40">
            Carregando artes...
          </div>
        )}

        {error && (
          <div className="mt-8 rounded-2xl border border-ayo-red/30 bg-ayo-red/10 p-4 font-sans text-sm text-ayo-cream">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          artworks.length === 0 && (
            <div className="py-16 font-sans text-sm text-white/40">
              Nenhuma arte encontrada.
            </div>
          )}

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {artworks.map((artwork) => (
            <article
              key={artwork.id}
              className="overflow-hidden rounded-3xl border border-white/10 bg-[#101010]"
            >
              <div
                className="aspect-square bg-black bg-contain bg-center bg-no-repeat"
                style={
                  artwork.image
                    ? {
                        backgroundImage: `url("${artwork.image}")`,
                      }
                    : undefined
                }
              />

              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`rounded-full border px-3 py-1 font-sans text-[10px] uppercase tracking-[0.08em] ${
                      artwork.isActive
                        ? "border-white/10 text-white/55"
                        : "border-ayo-red/40 bg-ayo-red/10 text-ayo-cream"
                    }`}
                  >
                    {artwork.isActive
                      ? "Ativa"
                      : "Inativa"}
                  </span>

                  <span
                    className={`rounded-full border px-3 py-1 font-sans text-[10px] uppercase tracking-[0.08em] ${
                      artwork.available
                        ? "border-white/10 text-white/55"
                        : "border-ayo-red/40 bg-ayo-red/10 text-ayo-cream"
                    }`}
                  >
                    {artwork.available
                      ? "Disponível"
                      : "Indisponível"}
                  </span>
                </div>

                <p className="mt-4 font-accent text-xs uppercase tracking-[0.1em] text-ayo-red">
                  {artwork.artistName}
                </p>

                <h2 className="mt-2 font-title text-3xl">
                  {artwork.name}
                </h2>

                <p className="mt-1 font-sans text-xs uppercase tracking-[0.08em] text-white/35">
                  {artwork.type}
                </p>

                <p className="mt-3 font-sans text-sm text-white/65">
                  {formatPrice(
                    artwork.price,
                  )}
                </p>

                <p className="mt-1 font-sans text-xs text-white/30">
                  /{artwork.slug}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    href={`/admin/artes/${artwork.id}`}
                    className="rounded-full border border-white/10 px-4 py-2 font-sans text-[11px] uppercase tracking-[0.08em] text-white/55 transition hover:border-white/30 hover:text-white"
                  >
                    Editar
                  </Link>

                  <button
                    type="button"
                    disabled={
                      updatingKey ===
                      `${artwork.id}-availability`
                    }
                    onClick={() =>
                      void patchBoolean(
                        artwork,
                        "availability",
                      )
                    }
                    className="rounded-full border border-white/10 px-4 py-2 font-sans text-[11px] uppercase tracking-[0.08em] text-white/55 transition hover:border-ayo-red/50 hover:text-white disabled:cursor-wait disabled:opacity-40"
                  >
                    {artwork.available
                      ? "Indisponibilizar"
                      : "Disponibilizar"}
                  </button>

                  <button
                    type="button"
                    disabled={
                      updatingKey ===
                      `${artwork.id}-status`
                    }
                    onClick={() =>
                      void patchBoolean(
                        artwork,
                        "status",
                      )
                    }
                    className="rounded-full border border-white/10 px-4 py-2 font-sans text-[11px] uppercase tracking-[0.08em] text-white/55 transition hover:border-ayo-red/50 hover:text-white disabled:cursor-wait disabled:opacity-40"
                  >
                    {artwork.isActive
                      ? "Desativar"
                      : "Ativar"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
