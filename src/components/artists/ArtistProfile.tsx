import Image from "next/image";
import Link from "next/link";

import type { Artist } from "@/data/mockArtists";

type ArtistProfileProps = {
  artist: Artist;
};

export function ArtistProfile({ artist }: ArtistProfileProps) {
  return (
    <section className="mt-10 grid gap-8 sm:mt-16 sm:gap-12 lg:grid-cols-[320px_1fr]">
      {/* =========================================
          IMAGEM
      ========================================== */}

      <div className="flex min-h-[300px] items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(145deg,#171717_0%,#090909_100%)] sm:min-h-[360px]">
        {artist.profileImage ? (
          <div className="relative h-[360px] w-full sm:h-[460px]">
            <Image
              src={artist.profileImage}
              alt={artist.name}
              fill
              unoptimized
              sizes="320px"
              className="object-contain object-bottom p-4"
            />
          </div>
        ) : (
          <span className="font-sans text-sm text-white/25">foto do artista</span>
        )}
      </div>

      {/* =========================================
          CONTEÚDO
      ========================================== */}

      <div className="flex flex-col justify-center">
        <p className="font-accent text-ayo-red text-xs tracking-[0.12em] uppercase">
          {artist.role} • AUTORAL
        </p>

        <h1 className="font-title mt-4 text-5xl leading-[0.95] text-white sm:text-6xl">
          {artist.name}
        </h1>

        {artist.description && (
          <p className="mt-5 max-w-3xl font-sans text-sm leading-relaxed text-white/60 sm:mt-6 sm:text-base">
            {artist.description}
          </p>
        )}

        {artist.specialties && (
          <p className="text-ayo-red mt-8 font-sans text-xs font-semibold tracking-[0.08em] uppercase">
            {artist.specialties}
          </p>
        )}

        <div className="mt-8">
          <p className="font-accent text-ayo-red text-xs tracking-[0.12em] uppercase">
            TEM UM PROJETO?
          </p>

          <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-white/55">
            Veja os serviços disponíveis de {artist.name} e envie seu pedido personalizado.
          </p>

          <Link
            href={`/artistas/${artist.slug}/pedido`}
            className="bg-ayo-red text-ayo-cream hover:bg-ayo-red/85 mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full px-7 font-sans text-sm font-bold transition hover:-translate-y-0.5 sm:w-fit"
          >
            FAZER UM PEDIDO
          </Link>
        </div>
      </div>
    </section>
  );
}
