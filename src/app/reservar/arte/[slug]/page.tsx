import Link from "next/link";
import { notFound } from "next/navigation";

import { ReservationForm } from "@/components/reservations/ReservationForm";
import { mockArtworks } from "@/data/mockArtworks";

type ReservationArtworkPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ReservationArtworkPage({
  params,
}: ReservationArtworkPageProps) {
  const { slug } = await params;

  const artwork = mockArtworks.find(
    (item) => item.slug === slug,
  );

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
          {artwork.available ? (
            <ReservationForm
              itemType="arte"
              itemName={artwork.name}
              itemSlug={artwork.slug}
              artistName={artwork.artistName}
              price={artwork.price}
              itemImage={artwork.image}
            />
          ) : (
            <div className="rounded-3xl border border-[#ff4156]/20 bg-[#090909] p-8 md:p-10">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-[#ff4156]">
                ARTE INDISPONÍVEL
              </p>

              <h1 className="font-title mt-4 text-4xl text-white">
                ESTA ARTE JÁ ESTÁ RESERVADA
              </h1>

              <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-white/55">
                A obra{" "}
                <strong className="text-white">
                  {artwork.name}
                </strong>{" "}
                não está mais disponível para novas solicitações.
              </p>

              <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-white/40">
                Ela continua disponível para visualização como parte
                do portfólio do artista.
              </p>

              <Link
                href={`/artes/${artwork.slug}`}
                className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 font-sans text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                VER DETALHES
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}