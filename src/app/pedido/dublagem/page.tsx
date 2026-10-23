import Link from "next/link";

import { mockArtists } from "@/data/mockArtists";

export default function VoiceOrderArtistPage() {
  const voiceArtists = mockArtists.filter(
    (artist) => artist.services.includes("voice"),
  );

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
          <p className="font-accent text-xs tracking-[0.14em] text-ayo-red uppercase sm:text-sm">
            DUBLAGEM PERSONALIZADA
          </p>

          <h1 className="font-title mt-4 text-5xl leading-[0.9] text-ayo-cream sm:text-6xl">
            ESCOLHA O DUBLADOR
          </h1>

          <p className="mt-5 font-sans text-sm leading-relaxed text-white/55 sm:text-base">
            Escolha com quem você quer desenvolver seu projeto de voz, personagem ou locução.
          </p>
        </header>

        {voiceArtists.length > 0 ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {voiceArtists.map((artist) => (
              <Link
                key={artist.id}
                href={`/pedido/dublagem/${artist.slug}`}
                className="rounded-3xl border border-white/10 bg-black/25 p-5 transition hover:border-ayo-red/40 hover:bg-black/35 sm:p-6"
              >
                <h2 className="font-title text-3xl leading-none text-ayo-cream">
                  {artist.name}
                </h2>

                {artist.specialties && (
                  <p className="mt-3 font-sans text-xs font-semibold tracking-[0.08em] text-ayo-red uppercase">
                    {artist.specialties}
                  </p>
                )}

                <span className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-ayo-red px-6 font-sans text-xs font-bold text-ayo-cream">
                  PEDIR DUBLAGEM
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-8">
            <p className="font-sans text-sm leading-relaxed text-white/55">
              Nenhum dublador está disponível para pedidos personalizados no momento.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
