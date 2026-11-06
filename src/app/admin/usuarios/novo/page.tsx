import Link from "next/link";

import { AdminUserForm } from "@/components/admin/AdminUserForm";

export default function NovoUsuarioPage() {
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
            Novo usuário
          </h1>
        </header>

        <div className="mt-8">
          <AdminUserForm mode="create" />
        </div>
      </div>
    </main>
  );
}
