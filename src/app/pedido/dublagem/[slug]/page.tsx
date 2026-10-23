import Link from "next/link";
import { notFound } from "next/navigation";

import { VoiceRequestForm } from "@/components/reservations/VoiceRequestForm";
import { mockArtists } from "@/data/mockArtists";

type VoiceOrderPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function VoiceOrderPage({
  params,
}: VoiceOrderPageProps) {
  const { slug } = await params;

  const artist = mockArtists.find(
    (item) =>
      item.slug === slug &&
      item.services.includes("voice"),
  );

  if (!artist) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#000000_0%,#120303_55%,#220000_100%)] px-5 py-8 text-white sm:px-6 sm:py-10 lg:px-12">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href="/pedido/dublagem"
          className="font-sans text-sm text-white/60 transition hover:text-white"
        >
          ← TROCAR DUBLADOR
        </Link>

        <div className="mt-10">
          <VoiceRequestForm
            artistName={artist.name}
            artistSlug={artist.slug}
          />
        </div>
      </div>
    </main>
  );
}
