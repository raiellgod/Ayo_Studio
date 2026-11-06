"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type ArtistService =
  | "tattoo"
  | "art"
  | "voice";

export type ProfessionalFormData = {
  id?: number;
  slug: string;
  name: string;
  role: string;
  specialties: string;
  description: string;
  image: string;
  fullImage: string;
  profileImage: string;
  services: ArtistService[];
  isActive?: boolean;
};

type ProfessionalFormProps = {
  mode: "create" | "edit";
  initialData?: ProfessionalFormData;
};

const emptyProfessional: ProfessionalFormData = {
  slug: "",
  name: "",
  role: "",
  specialties: "",
  description: "",
  image: "",
  fullImage: "",
  profileImage: "",
  services: [],
};

const SERVICE_OPTIONS: Array<{
  value: ArtistService;
  label: string;
}> = [
  {
    value: "tattoo",
    label: "Tatuagem",
  },
  {
    value: "art",
    label: "Arte",
  },
  {
    value: "voice",
    label: "Dublagem / Voz",
  },
];

type ImageField =
  | "image"
  | "profileImage"
  | "fullImage";

function normalizeSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function ProfessionalForm({
  mode,
  initialData,
}: ProfessionalFormProps) {
  const router = useRouter();

  const [form, setForm] =
    useState<ProfessionalFormData>(
      initialData ?? emptyProfessional,
    );

  const [submitting, setSubmitting] =
    useState(false);

  const [uploadingField, setUploadingField] =
    useState<ImageField | null>(null);

  const [error, setError] = useState<
    string | null
  >(null);

  const [success, setSuccess] = useState<
    string | null
  >(null);

  function updateField(
    field: keyof ProfessionalFormData,
    value:
      | string
      | ArtistService[],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function toggleService(
    service: ArtistService,
  ) {
    setForm((current) => {
      const exists =
        current.services.includes(service);

      return {
        ...current,
        services: exists
          ? current.services.filter(
              (item) => item !== service,
            )
          : [
              ...current.services,
              service,
            ],
      };
    });
  }

  async function uploadImage(
    field: ImageField,
    file: File,
  ) {
    try {
      setUploadingField(field);
      setError(null);

      const data = new FormData();
      data.append("file", file);

      const response = await fetch(
        "/api/admin/uploads/image?category=artists",
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

      updateField(field, result.url);
    } catch (uploadError) {
      console.error(uploadError);

      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Não foi possível enviar a imagem.",
      );
    } finally {
      setUploadingField(null);
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

      if (form.services.length === 0) {
        throw new Error(
          "Selecione pelo menos um serviço.",
        );
      }

      const endpoint =
        mode === "create"
          ? "/api/admin/professionals"
          : `/api/admin/professionals/${form.id}`;

      const response = await fetch(endpoint, {
        method:
          mode === "create"
            ? "POST"
            : "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: form.slug.trim(),
          name: form.name.trim(),
          role: form.role.trim(),
          specialties:
            form.specialties.trim(),
          description:
            form.description.trim(),
          image: form.image.trim(),
          fullImage:
            form.fullImage.trim(),
          profileImage:
            form.profileImage.trim(),

          services: form.services.map(
            (service) =>
              service.toUpperCase(),
          ),
        }),
      });

      const result =
        (await response.json()) as {
          id?: number;
          message?: string;
        };

      if (!response.ok) {
        throw new Error(
          result.message ??
            "Não foi possível salvar o profissional.",
        );
      }

      setSuccess(
        mode === "create"
          ? "Profissional criado com sucesso."
          : "Profissional atualizado com sucesso.",
      );

      if (mode === "create") {
        router.replace(
          "/admin/profissionais",
        );
        router.refresh();
        return;
      }

      router.refresh();
    } catch (submitError) {
      console.error(submitError);

      setError(
        submitError instanceof Error
          ? submitError.message
          : "Não foi possível salvar o profissional.",
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
          Identidade
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
                updateField(
                  "slug",
                  normalizeSlug(
                    event.target.value,
                  ),
                )
              }
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 font-sans text-white outline-none focus:border-ayo-red/60"
            />
          </label>

          <label className="block md:col-span-2">
            <span className="font-sans text-xs uppercase tracking-[0.08em] text-white/40">
              Função / título
            </span>

            <input
              value={form.role}
              onChange={(event) =>
                updateField(
                  "role",
                  event.target.value,
                )
              }
              required
              placeholder="Ex.: TATUADOR, ARTISTA / TATUADORA, DUBLADOR"
              className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 font-sans text-white outline-none focus:border-ayo-red/60"
            />
          </label>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#101010] p-5 sm:p-7">
        <h2 className="font-title text-2xl">
          Serviços
        </h2>

        <p className="mt-2 font-sans text-sm text-white/45">
          O título é apenas descritivo. São
          estes serviços que definem quais
          fluxos o profissional oferece.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          {SERVICE_OPTIONS.map((option) => {
            const selected =
              form.services.includes(
                option.value,
              );

            return (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  toggleService(option.value)
                }
                className={`rounded-full border px-5 py-2.5 font-sans text-xs uppercase tracking-[0.08em] transition ${
                  selected
                    ? "border-ayo-red bg-ayo-red text-white"
                    : "border-white/10 text-white/50 hover:border-white/30 hover:text-white"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#101010] p-5 sm:p-7">
        <h2 className="font-title text-2xl">
          Perfil
        </h2>

        <div className="mt-6 space-y-5">
          <label className="block">
            <span className="font-sans text-xs uppercase tracking-[0.08em] text-white/40">
              Especialidades
            </span>

            <input
              value={form.specialties}
              onChange={(event) =>
                updateField(
                  "specialties",
                  event.target.value,
                )
              }
              placeholder="Ex.: BLACKWORK • FINE LINE • AUTORAL"
              className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 font-sans text-white outline-none focus:border-ayo-red/60"
            />
          </label>

          <label className="block">
            <span className="font-sans text-xs uppercase tracking-[0.08em] text-white/40">
              Descrição
            </span>

            <textarea
              value={form.description}
              onChange={(event) =>
                updateField(
                  "description",
                  event.target.value,
                )
              }
              rows={7}
              className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-black px-4 py-3 font-sans text-white outline-none focus:border-ayo-red/60"
            />
          </label>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#101010] p-5 sm:p-7">
        <h2 className="font-title text-2xl">
          Imagens
        </h2>

        <p className="mt-2 font-sans text-sm text-white/45">
          Envie as imagens para o Cloudinary.
          A URL retornada fica salva no banco.
        </p>

        <div className="mt-6 space-y-6">
          {(
            [
              [
                "image",
                "Imagem do card",
              ],
              [
                "profileImage",
                "Imagem de perfil",
              ],
              [
                "fullImage",
                "Imagem completa",
              ],
            ] as const
          ).map(([field, label]) => (
            <div
              key={field}
              className="rounded-2xl border border-white/5 bg-black/25 p-4"
            >
              <p className="font-sans text-xs uppercase tracking-[0.08em] text-white/40">
                {label}
              </p>

              {form[field] && (
                <div
                  className="mt-4 h-48 w-full max-w-sm rounded-2xl bg-cover bg-center"
                  style={{
                    backgroundImage: `url("${form[field]}")`,
                  }}
                />
              )}

              <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
                <input
                  value={form[field]}
                  onChange={(event) =>
                    updateField(
                      field,
                      event.target.value,
                    )
                  }
                  placeholder="URL da imagem"
                  className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 font-sans text-sm text-white outline-none focus:border-ayo-red/60"
                />

                <label className="cursor-pointer rounded-xl border border-white/10 px-4 py-3 text-center font-sans text-xs uppercase tracking-[0.08em] text-white/60 transition hover:border-white/30 hover:text-white">
                  {uploadingField === field
                    ? "Enviando..."
                    : "Enviar imagem"}

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    disabled={
                      uploadingField !== null
                    }
                    onChange={(event) => {
                      const file =
                        event.target.files?.[0];

                      if (file) {
                        void uploadImage(
                          field,
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
            </div>
          ))}
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
            uploadingField !== null
          }
          className="rounded-full bg-ayo-red px-7 py-3 font-sans text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:brightness-110 disabled:cursor-wait disabled:opacity-50"
        >
          {submitting
            ? "Salvando..."
            : mode === "create"
              ? "Criar profissional"
              : "Salvar alterações"}
        </button>

        <button
          type="button"
          onClick={() =>
            router.push(
              "/admin/profissionais",
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
