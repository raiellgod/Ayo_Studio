import Link from "next/link";

import { mockArtists } from "@/data/mockArtists";

export default function TattooOrderArtistPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#000000_0%,#120303_55%,#220000_100%)] px-5 py-8 text-white sm:px-6 sm:py-10 lg:px-12">
      <div className="mx-auto w-full max-w-5xl">
        <Link
          href="/pedido"
          className="inline-flex items-center gap-2 font-sans text-sm text-white/60 transition hover:text-white"
        >
          ← VOLTAR PARA O PEDIDO
        </Link>

        <header className="mt-10 max-w-3xl">
          <p className="font-accent text-ayo-red text-xs tracking-[0.14em] uppercase sm:text-sm">
            TATUAGEM PERSONALIZADA
          </p>

          <h1 className="font-title text-ayo-cream mt-4 text-5xl leading-[0.9] sm:text-6xl">
            COM QUEM VOCÊ QUER CRIAR?
          </h1>

          <p className="mt-5 font-sans text-sm leading-relaxed text-white/55 sm:text-base">
            Escolha um artista para contar sua ideia e iniciar a conversa.
          </p>
        </header>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {mockArtists
            .filter((artist) => artist.services.includes("tattoo"))
            .map((artist) => (
              <Link
                key={artist.id}
                href={`/artistas/${artist.slug}/ideia`}
                className="hover:border-ayo-red/40 rounded-3xl border border-white/10 bg-black/25 p-5 transition hover:bg-black/35 sm:p-6"
              >
                <h2 className="font-title text-ayo-cream text-3xl leading-none">{artist.name}</h2>

                {artist.specialties && (
                  <p className="text-ayo-red mt-3 font-sans text-xs font-semibold tracking-[0.08em] uppercase">
                    {artist.specialties}
                  </p>
                )}

                <span className="bg-ayo-red text-ayo-cream mt-6 inline-flex min-h-11 items-center justify-center rounded-full px-6 font-sans text-xs font-bold">
                  CRIAR COM {artist.name.toUpperCase()}
                </span>
              </Link>
            ))}
        </div>
      </div>
    </main>
  );
}
