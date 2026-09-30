import Link from "next/link";
import { notFound } from "next/navigation";

import { ReservationForm } from "@/components/reservations/ReservationForm";
import { mockFlashes } from "@/data/mockFlashes";

type ReservationFlashPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ReservationFlashPage({ params }: ReservationFlashPageProps) {
  const { slug } = await params;

  const flash = mockFlashes.find((item) => item.slug === slug);

  if (!flash) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#000000_0%,#170506_55%,#07110d_100%)] px-6 py-10 text-white lg:px-12">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href={`/flashes/${flash.slug}`}
          className="font-sans text-sm text-white/60 transition hover:text-white"
        >
          ← VOLTAR PARA O FLASH
        </Link>

        <div className="mt-10">
          <ReservationForm
            itemType="flash"
            itemName={flash.name}
            itemSlug={flash.slug}
            artistName={flash.artistName}
            price={flash.price}
            itemImage={flash.image}
          />
        </div>
      </div>
    </main>
  );
}
