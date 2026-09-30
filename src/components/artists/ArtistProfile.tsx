import Image from "next/image";

import type { Artist } from "@/data/mockArtists";

type ArtistProfileProps = {
  artist: Artist;
};

export function ArtistProfile({
  artist,
}: ArtistProfileProps) {
  return (
    <section
      className="
        mt-16
        grid
        gap-12
        lg:grid-cols-[320px_1fr]
      "
    >
      {/* =========================================
          IMAGEM
      ========================================== */}

      <div
        className="
          flex
          min-h-[360px]
          items-center
          justify-center
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-[linear-gradient(145deg,#171717_0%,#090909_100%)]
        "
      >
        {artist.profileImage ? (
          <div className="relative h-[460px] w-full">
            <Image
              src={artist.profileImage}
              alt={artist.name}
              fill
              unoptimized
              sizes="320px"
              className="
                object-contain
                object-bottom
                p-4
              "
            />
          </div>
        ) : (
          <span
            className="
              font-sans
              text-sm
              text-white/25
            "
          >
            foto do artista
          </span>
        )}
      </div>

      {/* =========================================
          CONTEÚDO
      ========================================== */}

      <div
        className="
          flex
          flex-col
          justify-center
        "
      >
        <p
          className="
            font-sans
            text-xs
            font-semibold
            uppercase
            tracking-[0.12em]
            text-[#ff4156]
          "
        >
          {artist.role} • AUTORAL
        </p>

        <h1
          className="
            font-title
            mt-4
            text-6xl
            leading-none
            text-white
          "
        >
          {artist.name}
        </h1>

        {artist.description && (
          <p
            className="
              mt-6
              max-w-3xl
              font-sans
              text-base
              leading-relaxed
              text-white/60
            "
          >
            {artist.description}
          </p>
        )}

        {artist.specialties && (
          <p
            className="
              mt-8
              font-sans
              text-xs
              font-semibold
              uppercase
              tracking-[0.08em]
              text-[#77c043]
            "
          >
            {artist.specialties}
          </p>
        )}
      </div>
    </section>
  );
}