import { notFound } from "next/navigation";

import { FlashDetail } from "@/components/flashes/FlashDetail";
import { getFlashBySlug } from "@/lib/api/flashes";
import { getProfessionals } from "@/lib/api/professionals";

type FlashPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function FlashPage({
  params,
}: FlashPageProps) {
  const { slug } = await params;

  const flash = await getFlashBySlug(slug);

  if (!flash) {
    notFound();
  }

  const professionals = await getProfessionals();

  const artist =
    professionals.find(
      (professional) =>
        professional.id === flash.artistId,
    ) ?? null;

  return (
    <FlashDetail
      flash={flash}
      artist={artist}
    />
  );
}