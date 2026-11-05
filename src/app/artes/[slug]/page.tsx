import { notFound } from "next/navigation";

import { ArtworkDetail } from "@/components/artworks/ArtworkDetail";
import { getArtworkBySlug } from "@/lib/api/artworks";
import { getProfessionalBySlug } from "@/lib/api/professionals";

type ArtworkPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArtworkPage({
  params,
}: ArtworkPageProps) {
  const { slug } = await params;

  const artwork = await getArtworkBySlug(slug);

  if (!artwork) {
    notFound();
  }

  const artist = await getProfessionalBySlug(
    artwork.artistSlug,
  );

  return (
    <ArtworkDetail
      artwork={artwork}
      artist={artist}
    />
  );
}