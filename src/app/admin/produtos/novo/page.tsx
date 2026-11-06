import Link from "next/link";

import { ProductForm } from "@/components/admin/ProductForm";

export default function NovoProdutoPage() {
  return (
    <main className="px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-5xl">
        <Link
          href="/admin/produtos"
          className="font-sans text-xs uppercase tracking-[0.08em] text-white/45 transition hover:text-white"
        >
          ← Voltar para produtos
        </Link>

        <header className="mt-8 border-b border-white/10 pb-8">
          <p className="font-accent text-xs uppercase tracking-[0.14em] text-ayo-red">
            AYŌ STUDIO
          </p>

          <h1 className="mt-3 font-title text-4xl sm:text-5xl">
            Novo produto
          </h1>

          <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-white/50">
            Cadastre produto, tipo,
            autoria, imagem, preço e
            disponibilidade.
          </p>
        </header>

        <div className="mt-8">
          <ProductForm mode="create" />
        </div>
      </div>
    </main>
  );
}
