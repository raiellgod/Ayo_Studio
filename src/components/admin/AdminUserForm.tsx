"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type AdminRole =
  | "OWNER"
  | "ADMIN"
  | "EDITOR";

export type AdminUserFormData = {
  id?: number;
  name: string;
  email: string;
  role: AdminRole;
  isActive?: boolean;
};

type Props = {
  mode: "create" | "edit";
  initialData?: AdminUserFormData;
};

export function AdminUserForm({
  mode,
  initialData,
}: Props) {
  const router = useRouter();

  const [name, setName] =
    useState(initialData?.name ?? "");

  const [email, setEmail] =
    useState(initialData?.email ?? "");

  const [role, setRole] =
    useState<AdminRole>(
      initialData?.role ?? "EDITOR",
    );

  const [password, setPassword] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [success, setSuccess] =
    useState<string | null>(null);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError(null);
      setSuccess(null);

      if (
        mode === "create" &&
        password.length < 8
      ) {
        throw new Error(
          "A senha precisa ter pelo menos 8 caracteres.",
        );
      }

      if (
        mode === "edit" &&
        password.length > 0 &&
        password.length < 8
      ) {
        throw new Error(
          "A nova senha precisa ter pelo menos 8 caracteres.",
        );
      }

      const response = await fetch(
        mode === "create"
          ? "/api/admin/users"
          : `/api/admin/users/${initialData?.id}`,
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
            name: name.trim(),
            email:
              email.trim().toLowerCase(),
            role,
            ...(password
              ? { password }
              : {}),
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
            "Não foi possível salvar o usuário.",
        );
      }

      if (mode === "create") {
        router.replace(
          "/admin/usuarios",
        );
        router.refresh();
        return;
      }

      setPassword("");
      setSuccess(
        "Usuário atualizado com sucesso.",
      );
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Não foi possível salvar o usuário.",
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
          Conta administrativa
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="font-sans text-xs uppercase tracking-[0.08em] text-white/40">
              Nome
            </span>

            <input
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 font-sans text-white outline-none focus:border-ayo-red/60"
            />
          </label>

          <label className="block">
            <span className="font-sans text-xs uppercase tracking-[0.08em] text-white/40">
              E-mail
            </span>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 font-sans text-white outline-none focus:border-ayo-red/60"
            />
          </label>

          <label className="block">
            <span className="font-sans text-xs uppercase tracking-[0.08em] text-white/40">
              Papel
            </span>

            <select
              value={role}
              onChange={(event) =>
                setRole(
                  event.target
                    .value as AdminRole,
                )
              }
              className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 font-sans text-white outline-none focus:border-ayo-red/60"
            >
              <option value="OWNER">
                OWNER
              </option>
              <option value="ADMIN">
                ADMIN
              </option>
              <option value="EDITOR">
                EDITOR
              </option>
            </select>
          </label>

          <label className="block">
            <span className="font-sans text-xs uppercase tracking-[0.08em] text-white/40">
              {mode === "create"
                ? "Senha"
                : "Nova senha"}
            </span>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value,
                )
              }
              required={mode === "create"}
              placeholder={
                mode === "edit"
                  ? "Deixe vazio para manter"
                  : "Mínimo de 8 caracteres"
              }
              className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 font-sans text-white outline-none focus:border-ayo-red/60"
            />
          </label>
        </div>

        <div className="mt-6 rounded-2xl border border-white/5 bg-black/30 p-4 font-sans text-xs leading-relaxed text-white/40">
          OWNER gerencia usuários e todo o
          painel. ADMIN acessa o painel sem
          gerenciar usuários. EDITOR será
          usado para acesso restrito a
          conteúdo na próxima etapa de
          permissões finas.
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
          disabled={submitting}
          className="rounded-full bg-ayo-red px-7 py-3 font-sans text-xs font-semibold uppercase tracking-[0.08em] text-white disabled:opacity-50"
        >
          {submitting
            ? "Salvando..."
            : mode === "create"
              ? "Criar usuário"
              : "Salvar alterações"}
        </button>

        <button
          type="button"
          onClick={() =>
            router.push(
              "/admin/usuarios",
            )
          }
          className="rounded-full border border-white/10 px-7 py-3 font-sans text-xs uppercase tracking-[0.08em] text-white/55"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
