import Link from "next/link";
import { notFound } from "next/navigation";

import { ReservationForm } from "@/components/reservations/ReservationForm";
import { mockArtworks } from "@/data/mockArtworks";

type ReservationArtworkPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ReservationArtworkPage({ params }: ReservationArtworkPageProps) {
  const { slug } = await params;

  const artwork = mockArtworks.find((item) => item.slug === slug);

  if (!artwork) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#000000_0%,#041008_55%,#00160b_100%)] px-6 py-10 text-white lg:px-12">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href={`/artes/${artwork.slug}`}
          className="font-sans text-sm text-white/60 transition hover:text-white"
        >
          ← VOLTAR PARA A ARTE
        </Link>

        <div className="mt-10">
          <ReservationForm
            itemType="arte"
            itemName={artwork.name}
            itemSlug={artwork.slug}
            artistName={artwork.artistName}
            price={artwork.price}
            itemImage={artwork.image}
          />
        </div>
      </div>
    </main>
  );
}
