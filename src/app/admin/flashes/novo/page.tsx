import Link from "next/link";

import { FlashForm } from "@/components/admin/FlashForm";

export default function NovoFlashPage() {
  return (
    <main className="px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-5xl">
        <Link
          href="/admin/flashes"
          className="font-sans text-xs uppercase tracking-[0.08em] text-white/45 transition hover:text-white"
        >
          ← Voltar para flashes
        </Link>

        <header className="mt-8 border-b border-white/10 pb-8">
          <p className="font-accent text-xs uppercase tracking-[0.14em] text-ayo-red">
            AYŌ STUDIO
          </p>

          <h1 className="mt-3 font-title text-4xl sm:text-5xl">
            Novo flash
          </h1>

          <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-white/50">
            Cadastre o flash, autoria,
            imagem, preço e disponibilidade.
          </p>
        </header>

        <div className="mt-8">
          <FlashForm mode="create" />
        </div>
      </div>
    </main>
  );
}
