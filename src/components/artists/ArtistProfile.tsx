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
        mt-10
        grid
        gap-8
        sm:mt-16
        sm:gap-12
        lg:grid-cols-[320px_1fr]
      "
    >
      {/* =========================================
          IMAGEM
      ========================================== */}

      <div
        className="
          flex
          min-h-[300px]
          sm:min-h-[360px]
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
          <div className="relative h-[360px] w-full sm:h-[460px]">
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
            font-accent
            text-xs
            uppercase
            tracking-[0.12em]
            text-ayo-red
          "
        >
          {artist.role} • AUTORAL
        </p>

        <h1
          className="
            font-title
            mt-4
            text-5xl
            leading-[0.95]
            sm:text-6xl
            text-white
          "
        >
          {artist.name}
        </h1>

        {artist.description && (
          <p
            className="
              mt-5
              max-w-3xl
              font-sans
              text-sm
              sm:mt-6
              sm:text-base
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
              text-ayo-red
            "
          >
            {artist.specialties}
          </p>
        )}
      </div>
    </section>
  );
}