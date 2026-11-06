"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  ProfessionalForm,
  type ProfessionalFormData,
} from "@/components/admin/ProfessionalForm";

export default function EditarProfissionalPage() {
  const params = useParams<{
    id: string;
  }>();

  const id = Number(params.id);

  const [professional, setProfessional] =
    useState<ProfessionalFormData | null>(
      null,
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState<
    string | null
  >(null);

  const loadProfessional =
    useCallback(async () => {
      if (!Number.isInteger(id) || id <= 0) {
        setError(
          "ID de profissional inválido.",
        );
        setLoading(false);
        return;
      }

      try {
        setError(null);

        const response = await fetch(
          `/api/admin/professionals/${id}`,
          {
            cache: "no-store",
          },
        );

        const result =
          (await response.json()) as
            | ProfessionalFormData
            | {
                message?: string;
              };

        if (!response.ok) {
          throw new Error(
            "message" in result
              ? result.message ??
                  "Não foi possível carregar o profissional."
              : "Não foi possível carregar o profissional.",
          );
        }

        setProfessional(
          result as ProfessionalFormData,
        );
      } catch (loadError) {
        console.error(loadError);

        setError(
          loadError instanceof Error
            ? loadError.message
            : "Não foi possível carregar o profissional.",
        );
      } finally {
        setLoading(false);
      }
    }, [id]);

  useEffect(() => {
    const timeoutId = window.setTimeout(
      () => {
        void loadProfessional();
      },
      0,
    );

    return () =>
      window.clearTimeout(timeoutId);
  }, [loadProfessional]);

  return (
    <main className="px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-5xl">
        <Link
          href="/admin/profissionais"
          className="font-sans text-xs uppercase tracking-[0.08em] text-white/45 transition hover:text-white"
        >
          ← Voltar para profissionais
        </Link>

        <header className="mt-8 border-b border-white/10 pb-8">
          <p className="font-accent text-xs uppercase tracking-[0.14em] text-ayo-red">
            AYŌ STUDIO
          </p>

          <h1 className="mt-3 font-title text-4xl sm:text-5xl">
            Editar profissional
          </h1>
        </header>

        {loading && (
          <div className="py-16 font-sans text-sm text-white/40">
            Carregando profissional...
          </div>
        )}

        {error && (
          <div className="mt-8 rounded-2xl border border-ayo-red/30 bg-ayo-red/10 p-4 font-sans text-sm text-ayo-cream">
            {error}
          </div>
        )}

        {!loading && professional && (
          <div className="mt-8">
            <ProfessionalForm
              mode="edit"
              initialData={professional}
            />
          </div>
        )}
      </div>
    </main>
  );
}
