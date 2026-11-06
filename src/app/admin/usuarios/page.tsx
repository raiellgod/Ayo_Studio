"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

type AdminUser = {
  id: number;
  name: string;
  email: string;
  role:
    | "OWNER"
    | "ADMIN"
    | "EDITOR";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function AdminUsuariosPage() {
  const [users, setUsers] =
    useState<AdminUser[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [updatingId, setUpdatingId] =
    useState<number | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  const loadUsers =
    useCallback(async () => {
      try {
        setError(null);

        const response = await fetch(
          "/api/admin/users",
          {
            cache: "no-store",
          },
        );

        const result =
          await response.json();

        if (!response.ok) {
          throw new Error(
            result.message ??
              "Não foi possível carregar os usuários.",
          );
        }

        setUsers(
          result as AdminUser[],
        );
      } catch (loadError) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Não foi possível carregar os usuários.",
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    const timeoutId =
      window.setTimeout(() => {
        void loadUsers();
      }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [loadUsers]);

  async function toggleStatus(
    user: AdminUser,
  ) {
    try {
      setUpdatingId(user.id);
      setError(null);

      const response = await fetch(
        `/api/admin/users/${user.id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            isActive:
              !user.isActive,
          }),
        },
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ??
            "Não foi possível atualizar o usuário.",
        );
      }

      await loadUsers();
    } catch (updateError) {
      setError(
        updateError instanceof Error
          ? updateError.message
          : "Não foi possível atualizar o usuário.",
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
              Usuários
            </h1>

            <p className="mt-3 max-w-2xl font-sans text-sm text-white/50">
              Contas autorizadas a acessar
              o painel administrativo.
            </p>
          </div>

          <Link
            href="/admin/usuarios/novo"
            className="rounded-full bg-ayo-red px-6 py-3 text-center font-sans text-xs font-semibold uppercase tracking-[0.08em] text-white"
          >
            Novo usuário
          </Link>
        </header>

        {loading && (
          <div className="py-16 font-sans text-sm text-white/40">
            Carregando usuários...
          </div>
        )}

        {error && (
          <div className="mt-8 rounded-2xl border border-ayo-red/30 bg-ayo-red/10 p-4 font-sans text-sm text-ayo-cream">
            {error}
          </div>
        )}

        <div className="mt-8 space-y-4">
          {users.map((user) => (
            <article
              key={user.id}
              className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-[#101010] p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.08em] text-white/55">
                    {user.role}
                  </span>

                  <span className="rounded-full border border-white/10 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.08em] text-white/55">
                    {user.isActive
                      ? "Ativo"
                      : "Inativo"}
                  </span>
                </div>

                <h2 className="mt-4 font-title text-2xl">
                  {user.name}
                </h2>

                <p className="mt-1 font-sans text-sm text-white/45">
                  {user.email}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/admin/usuarios/${user.id}`}
                  className="rounded-full border border-white/10 px-4 py-2 font-sans text-[11px] uppercase tracking-[0.08em] text-white/55"
                >
                  Editar
                </Link>

                <button
                  type="button"
                  disabled={
                    updatingId === user.id
                  }
                  onClick={() =>
                    void toggleStatus(user)
                  }
                  className="rounded-full border border-white/10 px-4 py-2 font-sans text-[11px] uppercase tracking-[0.08em] text-white/55 disabled:opacity-40"
                >
                  {user.isActive
                    ? "Desativar"
                    : "Ativar"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
