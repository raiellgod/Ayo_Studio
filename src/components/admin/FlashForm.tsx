"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export type FlashFormData = {
  id?: number;
  slug: string;
  name: string;
  artistId: number;
  image: string;
  price: number;
  description: string;
  categories: string[];
  available: boolean;
  isActive?: boolean;
};

type ProfessionalOption = {
  id: number;
  name: string;
  slug: string;
  isActive: boolean;
};

type FlashFormProps = {
  mode: "create" | "edit";
  initialData?: FlashFormData;
};

const emptyFlash: FlashFormData = {
  slug: "",
  name: "",
  artistId: 0,
  image: "",
  price: 0,
  description: "",
  categories: [],
  available: true,
};

function normalizeSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function categoriesToText(
  categories: string[],
) {
  return categories.join(", ");
}

function textToCategories(value: string) {
  return Array.from(
    new Set(
      value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  );
}

export function FlashForm({
  mode,
  initialData,
}: FlashFormProps) {
  const router = useRouter();

  const [form, setForm] =
    useState<FlashFormData>(
      initialData ?? emptyFlash,
    );

  const [categoriesText, setCategoriesText] =
    useState(
      categoriesToText(
        initialData?.categories ?? [],
      ),
    );

  const [professionals, setProfessionals] =
    useState<ProfessionalOption[]>([]);

  const [loadingProfessionals, setLoadingProfessionals] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [success, setSuccess] =
    useState<string | null>(null);

  useEffect(() => {
    const controller =
      new AbortController();

    async function loadProfessionals() {
      try {
        const response = await fetch(
          "/api/admin/professionals",
          {
            cache: "no-store",
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(
            "Não foi possível carregar os profissionais.",
          );
        }

        const data =
          (await response.json()) as ProfessionalOption[];

        setProfessionals(data);

        if (
          mode === "create" &&
          form.artistId === 0
        ) {
          const firstActive =
            data.find(
              (professional) =>
                professional.isActive,
            ) ?? data[0];

          if (firstActive) {
            setForm((current) => ({
              ...current,
              artistId:
                firstActive.id,
            }));
          }
        }
      } catch (loadError) {
        if (
          loadError instanceof DOMException &&
          loadError.name === "AbortError"
        ) {
          return;
        }

        console.error(loadError);

        setError(
          "Não foi possível carregar os profissionais.",
        );
      } finally {
        setLoadingProfessionals(false);
      }
    }

    void loadProfessionals();

    return () => {
      controller.abort();
    };
  }, [mode, form.artistId]);

  async function uploadImage(
    file: File,
  ) {
    try {
      setUploading(true);
      setError(null);

      const data = new FormData();
      data.append("file", file);

      const response = await fetch(
        "/api/admin/uploads/image?category=flashes",
        {
          method: "POST",
          body: data,
        },
      );

      const result =
        (await response.json()) as {
          url?: string;
          message?: string;
        };

      if (!response.ok || !result.url) {
        throw new Error(
          result.message ??
            "Não foi possível enviar a imagem.",
        );
      }

      setForm((current) => ({
        ...current,
        image: result.url ?? "",
      }));
    } catch (uploadError) {
      console.error(uploadError);

      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Não foi possível enviar a imagem.",
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError(null);
      setSuccess(null);

      if (
        !Number.isInteger(form.artistId) ||
        form.artistId <= 0
      ) {
        throw new Error(
          "Selecione um profissional.",
        );
      }

      const categories =
        textToCategories(
          categoriesText,
        );

      const endpoint =
        mode === "create"
          ? "/api/admin/flashes"
          : `/api/admin/flashes/${form.id}`;

      const response = await fetch(
        endpoint,
        {
          method:
            mode === "create"
              ? "POST"
              : "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            slug: form.slug.trim(),
            name: form.name.trim(),
            artistId: form.artistId,
            image: form.image.trim(),
            price: Number(form.price),
            description:
              form.description.trim(),
            categories,
            available:
              form.available,
          }),
        },
      );

      const result =
        (await response.json()) as {
          message?: string;
        };

      if (!response.ok) {
        throw new Error(
          result.message ??
            "Não foi possível salvar o flash.",
        );
      }

      if (mode === "create") {
        router.replace(
          "/admin/flashes",
        );
        router.refresh();
        return;
      }

      setSuccess(
        "Flash atualizado com sucesso.",
      );
      router.refresh();
    } catch (submitError) {
      console.error(submitError);

      setError(
        submitError instanceof Error
          ? submitError.message
          : "Não foi possível salvar o flash.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <section className="rounded-3xl border border-white/10 bg-[#101010] p-5 sm:p-7">
        <h2 className="font-title text-2xl">
          Identificação
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="font-sans text-xs uppercase tracking-[0.08em] text-white/40">
              Nome
            </span>

            <input
              value={form.name}
              onChange={(event) => {
                const name =
                  event.target.value;

                setForm((current) => ({
                  ...current,
                  name,
                  slug:
                    mode === "create" &&
                    current.slug.length === 0
                      ? normalizeSlug(name)
                      : current.slug,
                }));
              }}
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 font-sans text-white outline-none focus:border-ayo-red/60"
            />
          </label>

          <label className="block">
            <span className="font-sans text-xs uppercase tracking-[0.08em] text-white/40">
              Slug
            </span>

            <input
              value={form.slug}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  slug: normalizeSlug(
                    event.target.value,
                  ),
                }))
              }
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 font-sans text-white outline-none focus:border-ayo-red/60"
            />
          </label>

          <label className="block md:col-span-2">
            <span className="font-sans text-xs uppercase tracking-[0.08em] text-white/40">
              Profissional
            </span>

            <select
              value={form.artistId || ""}
              disabled={
                loadingProfessionals
              }
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  artistId: Number(
                    event.target.value,
                  ),
                }))
              }
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 font-sans text-white outline-none focus:border-ayo-red/60 disabled:opacity-50"
            >
              <option value="">
                Selecione...
              </option>

              {professionals.map(
                (professional) => (
                  <option
                    key={
                      professional.id
                    }
                    value={
                      professional.id
                    }
                  >
                    {professional.name}
                    {professional.isActive
                      ? ""
                      : " (inativo)"}
                  </option>
                ),
              )}
            </select>
          </label>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#101010] p-5 sm:p-7">
        <h2 className="font-title text-2xl">
          Conteúdo
        </h2>

        <div className="mt-6 space-y-5">
          <label className="block">
            <span className="font-sans text-xs uppercase tracking-[0.08em] text-white/40">
              Preço
            </span>

            <input
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  price: Number(
                    event.target.value,
                  ),
                }))
              }
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 font-sans text-white outline-none focus:border-ayo-red/60"
            />
          </label>

          <label className="block">
            <span className="font-sans text-xs uppercase tracking-[0.08em] text-white/40">
              Categorias
            </span>

            <input
              value={categoriesText}
              onChange={(event) =>
                setCategoriesText(
                  event.target.value,
                )
              }
              placeholder="Geek, Preto e Branco, Autoral"
              className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 font-sans text-white outline-none focus:border-ayo-red/60"
            />

            <span className="mt-2 block font-sans text-xs text-white/30">
              Separe as categorias por vírgula.
            </span>
          </label>

          <label className="block">
            <span className="font-sans text-xs uppercase tracking-[0.08em] text-white/40">
              Descrição
            </span>

            <textarea
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  description:
                    event.target.value,
                }))
              }
              rows={7}
              className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-black px-4 py-3 font-sans text-white outline-none focus:border-ayo-red/60"
            />
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/5 bg-black/25 p-4">
            <input
              type="checkbox"
              checked={form.available}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  available:
                    event.target.checked,
                }))
              }
              className="h-4 w-4"
            />

            <div>
              <p className="font-sans text-sm text-white/75">
                Disponível para reserva
              </p>

              <p className="mt-1 font-sans text-xs text-white/35">
                Desmarque quando o flash estiver reservado ou indisponível.
              </p>
            </div>
          </label>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#101010] p-5 sm:p-7">
        <h2 className="font-title text-2xl">
          Imagem
        </h2>

        <p className="mt-2 font-sans text-sm text-white/45">
          A imagem é enviada para o
          Cloudinary. A marca d’água continua
          sendo aplicada apenas na exibição
          pública.
        </p>

        {form.image && (
          <div
            className="mt-6 aspect-square w-full max-w-sm rounded-2xl bg-black bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url("${form.image}")`,
            }}
          />
        )}

        <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
          <input
            value={form.image}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                image:
                  event.target.value,
              }))
            }
            placeholder="URL da imagem"
            className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 font-sans text-sm text-white outline-none focus:border-ayo-red/60"
          />

          <label className="cursor-pointer rounded-xl border border-white/10 px-4 py-3 text-center font-sans text-xs uppercase tracking-[0.08em] text-white/60 transition hover:border-white/30 hover:text-white">
            {uploading
              ? "Enviando..."
              : "Enviar imagem"}

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              disabled={uploading}
              onChange={(event) => {
                const file =
                  event.target.files?.[0];

                if (file) {
                  void uploadImage(file);
                }

                event.currentTarget.value =
                  "";
              }}
              className="hidden"
            />
          </label>
        </div>
      </section>

      {error && (
        <div className="rounded-2xl border border-ayo-red/30 bg-ayo-red/10 p-4 font-sans text-sm text-ayo-cream">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 font-sans text-sm text-white/70">
          {success}
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={
            submitting ||
            uploading ||
            loadingProfessionals
          }
          className="rounded-full bg-ayo-red px-7 py-3 font-sans text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:brightness-110 disabled:cursor-wait disabled:opacity-50"
        >
          {submitting
            ? "Salvando..."
            : mode === "create"
              ? "Criar flash"
              : "Salvar alterações"}
        </button>

        <button
          type="button"
          onClick={() =>
            router.push(
              "/admin/flashes",
            )
          }
          className="rounded-full border border-white/10 px-7 py-3 font-sans text-xs uppercase tracking-[0.08em] text-white/55 transition hover:border-white/30 hover:text-white"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
