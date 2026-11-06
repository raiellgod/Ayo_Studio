"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

type ArtistService =
  | "tattoo"
  | "art"
  | "voice";

type Professional = {
  id: number;
  slug: string;
  name: string;
  role: string;

  image: string;
  profileImage: string;
  fullImage: string;

  specialties: string;
  description: string;

  services: ArtistService[];

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
};

function getServiceLabel(
  service: ArtistService,
) {
  const labels: Record<
    ArtistService,
    string
  > = {
    tattoo: "Tatuagem",
    art: "Arte",
    voice: "Dublagem / Voz",
  };

  return labels[service];
}

export default function AdminProfissionaisPage() {
  const [professionals, setProfessionals] =
    useState<Professional[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [updatingId, setUpdatingId] =
    useState<number | null>(null);

  const [error, setError] = useState<
    string | null
  >(null);

  const loadProfessionals =
    useCallback(async () => {
      try {
        setError(null);

        const response = await fetch(
          "/api/admin/professionals",
          {
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error(
            "Não foi possível carregar os profissionais.",
          );
        }

        const data =
          (await response.json()) as Professional[];

        setProfessionals(data);
      } catch (loadError) {
        console.error(loadError);

        setError(
          "Não foi possível carregar os profissionais.",
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(
      () => {
        void loadProfessionals();
      },
      0,
    );

    return () =>
      window.clearTimeout(timeoutId);
  }, [loadProfessionals]);

  async function toggleStatus(
    professional: Professional,
  ) {
    try {
      setUpdatingId(professional.id);
      setError(null);

      const response = await fetch(
        `/api/admin/professionals/${professional.id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            isActive:
              !professional.isActive,
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
            "Não foi possível atualizar o status.",
        );
      }

      await loadProfessionals();
    } catch (statusError) {
      console.error(statusError);

      setError(
        statusError instanceof Error
          ? statusError.message
          : "Não foi possível atualizar o status.",
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
              Profissionais
            </h1>

            <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-white/50">
              Gerencie os profissionais,
              serviços e informações exibidas
              no site.
            </p>
          </div>

          <Link
            href="/admin/profissionais/novo"
            className="rounded-full bg-ayo-red px-6 py-3 text-center font-sans text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:brightness-110"
          >
            Novo profissional
          </Link>
        </header>

        {loading && (
          <div className="py-16 font-sans text-sm text-white/40">
            Carregando profissionais...
          </div>
        )}

        {error && (
          <div className="mt-8 rounded-2xl border border-ayo-red/30 bg-ayo-red/10 p-4 font-sans text-sm text-ayo-cream">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          professionals.length === 0 && (
            <div className="py-16 font-sans text-sm text-white/40">
              Nenhum profissional encontrado.
            </div>
          )}

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {professionals.map(
            (professional) => {
              const image =
                professional.profileImage ||
                professional.image ||
                professional.fullImage;

              return (
                <article
                  key={professional.id}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-[#101010]"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div
                      className="relative aspect-square w-full shrink-0 bg-black bg-cover bg-center sm:w-44"
                      style={
                        image
                          ? {
                              backgroundImage: `url("${image}")`,
                            }
                          : undefined
                      }
                    >
                      {!image && (
                        <div className="flex h-full items-center justify-center font-sans text-xs uppercase tracking-[0.1em] text-white/20">
                          Sem imagem
                        </div>
                      )}

                      <div className="absolute left-3 top-3">
                        <span
                          className={`rounded-full border px-3 py-1 font-sans text-[10px] uppercase tracking-[0.08em] ${
                            professional.isActive
                              ? "border-white/15 bg-black/70 text-white/70"
                              : "border-ayo-red/40 bg-ayo-red/20 text-ayo-cream"
                          }`}
                        >
                          {professional.isActive
                            ? "Ativo"
                            : "Inativo"}
                        </span>
                      </div>
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col p-5">
                      <p className="font-accent text-xs uppercase tracking-[0.1em] text-ayo-red">
                        {professional.role}
                      </p>

                      <h2 className="mt-2 font-title text-3xl">
                        {professional.name}
                      </h2>

                      <p className="mt-1 font-sans text-xs text-white/30">
                        /{professional.slug}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {professional.services.map(
                          (service) => (
                            <span
                              key={service}
                              className="rounded-full border border-white/10 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.08em] text-white/50"
                            >
                              {getServiceLabel(
                                service,
                              )}
                            </span>
                          ),
                        )}
                      </div>

                      {professional.specialties && (
                        <p className="mt-4 line-clamp-2 font-sans text-sm leading-relaxed text-white/45">
                          {
                            professional.specialties
                          }
                        </p>
                      )}

                      <div className="mt-auto flex flex-wrap gap-3 pt-5">
                        <Link
                          href={`/admin/profissionais/${professional.id}`}
                          className="rounded-full border border-white/10 px-4 py-2 font-sans text-[11px] uppercase tracking-[0.08em] text-white/55 transition hover:border-white/30 hover:text-white"
                        >
                          Editar
                        </Link>

                        <button
                          type="button"
                          disabled={
                            updatingId ===
                            professional.id
                          }
                          onClick={() =>
                            void toggleStatus(
                              professional,
                            )
                          }
                          className="rounded-full border border-white/10 px-4 py-2 font-sans text-[11px] uppercase tracking-[0.08em] text-white/55 transition hover:border-ayo-red/50 hover:text-white disabled:cursor-wait disabled:opacity-40"
                        >
                          {updatingId ===
                          professional.id
                            ? "Salvando..."
                            : professional.isActive
                              ? "Desativar"
                              : "Ativar"}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            },
          )}
        </div>
      </div>
    </main>
  );
}
