import { notFound } from "next/navigation";

import { ArtworkDetail } from "@/components/artworks/ArtworkDetail";
import { mockArtworks } from "@/data/mockArtworks";

type ArtworkPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArtworkPage({
  params,
}: ArtworkPageProps) {
  const { slug } = await params;

  const artwork = mockArtworks.find(
    (item) => item.slug === slug,
  );

  if (!artwork) {
    notFound();
  }

  return <ArtworkDetail artwork={artwork} />;
}