import Link from "next/link";

import { ProfessionalForm } from "@/components/admin/ProfessionalForm";

export default function NovoProfissionalPage() {
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
            Novo profissional
          </h1>

          <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-white/50">
            Cadastre os dados, serviços e
            imagens do novo profissional.
          </p>
        </header>

        <div className="mt-8">
          <ProfessionalForm mode="create" />
        </div>
      </div>
    </main>
  );
}
