import Link from "next/link";
import { notFound } from "next/navigation";

import { ArtistProfile } from "@/components/artists/ArtistProfile";
import { ArtistFlashesSection } from "@/components/artists/ArtistFlashesSection";
import { ArtistArtworksSection } from "@/components/artists/ArtistArtworksSection";
import { ArtistVideosSection } from "@/components/artists/ArtistVideosSection";

import { mockArtists } from "@/data/mockArtists";
import { mockFlashes } from "@/data/mockFlashes";
import { mockArtworks } from "@/data/mockArtworks";
import { mockVideos } from "@/data/mockVideos";

type ArtistPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArtistPage({
  params,
}: ArtistPageProps) {
  const { slug } = await params;

  const artist = mockArtists.find(
    (item) => item.slug === slug,
  );

  if (!artist) {
    notFound();
  }

  const flashes = mockFlashes.filter(
    (flash) =>
      flash.artistId === artist.id,
  );

  const artworks = mockArtworks.filter(
    (artwork) =>
      artwork.artistId === artist.id,
  );

  const videos = mockVideos.filter(
    (video) =>
      video.artistId === artist.id,
  );

  return (
    <main
      className="
        min-h-screen
        bg-[#050505]
        text-white
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-8
          py-12
          lg:px-12
        "
      >
        {/* =========================================
            CABEÇALHO
        ========================================== */}

        <header
          className="
            flex
            items-center
            justify-between
          "
        >
          <Link
            href="/"
            className="
              font-title
              text-2xl
              text-white
            "
          >
            AYŌ STUDIO
          </Link>

          <Link
            href="/#artistas"
            className="
              font-sans
              text-xs
              font-semibold
              uppercase
              tracking-[0.08em]
              text-white/60
              transition
              hover:text-white
            "
          >
            ← VOLTAR PARA ARTISTAS
          </Link>
        </header>

        <ArtistProfile
          artist={artist}
        />

        <ArtistFlashesSection
          flashes={flashes}
        />

        <ArtistArtworksSection
          artworks={artworks}
        />

        <ArtistVideosSection
          videos={videos}
        />
      </div>
    </main>
  );
}