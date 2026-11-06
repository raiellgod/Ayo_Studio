"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  AdminUserForm,
  type AdminUserFormData,
} from "@/components/admin/AdminUserForm";

export default function EditarUsuarioPage() {
  const params =
    useParams<{ id: string }>();

  const id = Number(params.id);

  const [user, setUser] =
    useState<AdminUserFormData | null>(
      null,
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadUser =
    useCallback(async () => {
      try {
        const response = await fetch(
          `/api/admin/users/${id}`,
          {
            cache: "no-store",
          },
        );

        const result =
          await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ??
              "Não foi possível carregar o usuário.",
          );
        }

        setUser(
          result as AdminUserFormData,
        );
      } catch (loadError) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Não foi possível carregar o usuário.",
        );
      } finally {
        setLoading(false);
      }
    }, [id]);

  useEffect(() => {
    const timeoutId =
      window.setTimeout(() => {
        void loadUser();
      }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [loadUser]);

  return (
    <main className="px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-5xl">
        <Link
          href="/admin/usuarios"
          className="font-sans text-xs uppercase tracking-[0.08em] text-white/45"
        >
          ← Voltar para usuários
        </Link>

        <header className="mt-8 border-b border-white/10 pb-8">
          <p className="font-accent text-xs uppercase tracking-[0.14em] text-ayo-red">
            AYŌ STUDIO
          </p>

          <h1 className="mt-3 font-title text-4xl sm:text-5xl">
            Editar usuário
          </h1>
        </header>

        {loading && (
          <div className="py-16 font-sans text-sm text-white/40">
            Carregando usuário...
          </div>
        )}

        {error && (
          <div className="mt-8 rounded-2xl border border-ayo-red/30 bg-ayo-red/10 p-4 font-sans text-sm text-ayo-cream">
            {error}
          </div>
        )}

        {!loading && user && (
          <div className="mt-8">
            <AdminUserForm
              mode="edit"
              initialData={user}
            />
          </div>
        )}
      </div>
    </main>
  );
}
