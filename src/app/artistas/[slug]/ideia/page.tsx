import Link from "next/link";
import { notFound } from "next/navigation";

import { TattooIdeaForm } from "@/components/reservations/TattooIdeaForm";
import { mockArtists } from "@/data/mockArtists";

type ArtistIdeaPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArtistIdeaPage({
  params,
}: ArtistIdeaPageProps) {
  const { slug } = await params;

  const artist = mockArtists.find(
    (item) => item.slug === slug,
  );

  if (!artist) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#000000_0%,#120303_55%,#220000_100%)] px-5 py-8 text-white sm:px-6 sm:py-10 lg:px-12">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href={`/artistas/${artist.slug}`}
          className="font-sans text-sm text-white/60 transition hover:text-white"
        >
          ← VOLTAR PARA O ARTISTA
        </Link>

        <div className="mt-10">
          <TattooIdeaForm
            artistName={artist.name}
            artistSlug={artist.slug}
          />
        </div>
      </div>
    </main>
  );
}
