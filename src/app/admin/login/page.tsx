"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);
      setError(null);

      await signIn("credentials", {
        email,
        password,
        redirectTo: "/admin/solicitacoes",
      });
    } catch (submitError) {
      console.error(submitError);

      setError("Não foi possível realizar o login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080808] px-5 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#101010] p-6 sm:p-8">
        <p className="font-accent text-ayo-red text-xs tracking-[0.14em] uppercase">AYŌ STUDIO</p>

        <h1 className="font-title mt-3 text-4xl">Administração</h1>

        <p className="mt-3 font-sans text-sm leading-relaxed text-white/45">
          Entre com as credenciais do administrador para acessar o painel.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="font-sans text-xs tracking-[0.1em] text-white/35 uppercase"
            >
              E-mail
            </label>

            <input
              id="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="focus:border-ayo-red/60 mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 font-sans text-sm text-white transition outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="font-sans text-xs tracking-[0.1em] text-white/35 uppercase"
            >
              Senha
            </label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="focus:border-ayo-red/60 mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 font-sans text-sm text-white transition outline-none"
            />
          </div>

          {error && (
            <div className="border-ayo-red/30 bg-ayo-red/10 text-ayo-cream rounded-xl border p-3 font-sans text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-ayo-red w-full rounded-full px-5 py-3 font-sans text-xs font-semibold tracking-[0.08em] text-white uppercase transition hover:brightness-110 disabled:cursor-wait disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}
