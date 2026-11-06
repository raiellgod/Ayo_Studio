"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export type VideoFormData = {
  id?: number;
  slug: string;
  name: string;
  artistId: number;
  video: string;
  thumbnail: string;
  description: string;
  isActive?: boolean;
};

type ProfessionalOption = {
  id: number;
  name: string;
  slug: string;
  isActive: boolean;
};

type VideoFormProps = {
  mode: "create" | "edit";
  initialData?: VideoFormData;
};

const emptyVideo: VideoFormData = {
  slug: "",
  name: "",
  artistId: 0,
  video: "",
  thumbnail: "",
  description: "",
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

export function VideoForm({
  mode,
  initialData,
}: VideoFormProps) {
  const router = useRouter();

  const [form, setForm] =
    useState<VideoFormData>(
      initialData ?? emptyVideo,
    );

  const [professionals, setProfessionals] =
    useState<ProfessionalOption[]>([]);

  const [loadingProfessionals, setLoadingProfessionals] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [uploadingThumbnail, setUploadingThumbnail] =
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

  async function uploadThumbnail(
    file: File,
  ) {
    try {
      setUploadingThumbnail(true);
      setError(null);

      const data = new FormData();
      data.append("file", file);

      const response = await fetch(
        "/api/admin/uploads/image?category=videos",
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
            "Não foi possível enviar o thumbnail.",
        );
      }

      setForm((current) => ({
        ...current,
        thumbnail:
          result.url ?? "",
      }));
    } catch (uploadError) {
      console.error(uploadError);

      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Não foi possível enviar o thumbnail.",
      );
    } finally {
      setUploadingThumbnail(false);
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

      const endpoint =
        mode === "create"
          ? "/api/admin/videos"
          : `/api/admin/videos/${form.id}`;

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
            video: form.video.trim(),
            thumbnail:
              form.thumbnail.trim(),
            description:
              form.description.trim(),
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
            "Não foi possível salvar o vídeo.",
        );
      }

      if (mode === "create") {
        router.replace(
          "/admin/videos",
        );
        router.refresh();
        return;
      }

      setSuccess(
        "Vídeo atualizado com sucesso.",
      );

      router.refresh();
    } catch (submitError) {
      console.error(submitError);

      setError(
        submitError instanceof Error
          ? submitError.message
          : "Não foi possível salvar o vídeo.",
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
          Vídeo
        </h2>

        <p className="mt-2 font-sans text-sm text-white/45">
          Cole a URL do vídeo armazenado no
          Cloudinary.
        </p>

        <input
          type="url"
          value={form.video}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              video:
                event.target.value,
            }))
          }
          required
          placeholder="https://res.cloudinary.com/..."
          className="mt-5 w-full rounded-xl border border-white/10 bg-black px-4 py-3 font-sans text-sm text-white outline-none focus:border-ayo-red/60"
        />

        {form.video && (
          <video
            src={form.video}
            controls
            preload="metadata"
            className="mt-5 max-h-[480px] w-full rounded-2xl bg-black"
          />
        )}
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#101010] p-5 sm:p-7">
        <h2 className="font-title text-2xl">
          Thumbnail
        </h2>

        <p className="mt-2 font-sans text-sm text-white/45">
          Opcional. Pode ser enviada para o
          Cloudinary pelo painel.
        </p>

        {form.thumbnail && (
          <div
            className="mt-6 aspect-video w-full max-w-xl rounded-2xl bg-black bg-cover bg-center"
            style={{
              backgroundImage: `url("${form.thumbnail}")`,
            }}
          />
        )}

        <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
          <input
            value={form.thumbnail}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                thumbnail:
                  event.target.value,
              }))
            }
            placeholder="URL do thumbnail"
            className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 font-sans text-sm text-white outline-none focus:border-ayo-red/60"
          />

          <label className="cursor-pointer rounded-xl border border-white/10 px-4 py-3 text-center font-sans text-xs uppercase tracking-[0.08em] text-white/60 transition hover:border-white/30 hover:text-white">
            {uploadingThumbnail
              ? "Enviando..."
              : "Enviar thumbnail"}

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              disabled={
                uploadingThumbnail
              }
              onChange={(event) => {
                const file =
                  event.target.files?.[0];

                if (file) {
                  void uploadThumbnail(
                    file,
                  );
                }

                event.currentTarget.value =
                  "";
              }}
              className="hidden"
            />
          </label>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#101010] p-5 sm:p-7">
        <h2 className="font-title text-2xl">
          Descrição
        </h2>

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
          className="mt-5 w-full resize-y rounded-xl border border-white/10 bg-black px-4 py-3 font-sans text-white outline-none focus:border-ayo-red/60"
        />
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
            uploadingThumbnail ||
            loadingProfessionals
          }
          className="rounded-full bg-ayo-red px-7 py-3 font-sans text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:brightness-110 disabled:cursor-wait disabled:opacity-50"
        >
          {submitting
            ? "Salvando..."
            : mode === "create"
              ? "Criar vídeo"
              : "Salvar alterações"}
        </button>

        <button
          type="button"
          onClick={() =>
            router.push(
              "/admin/videos",
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
