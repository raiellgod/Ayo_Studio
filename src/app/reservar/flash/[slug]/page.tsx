import Link from "next/link";
import { notFound } from "next/navigation";

import { ReservationForm } from "@/components/reservations/ReservationForm";
import { mockFlashes } from "@/data/mockFlashes";

type ReservationFlashPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ReservationFlashPage({
  params,
}: ReservationFlashPageProps) {
  const { slug } = await params;

  const flash = mockFlashes.find(
    (item) => item.slug === slug,
  );

  if (!flash) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#000000_0%,#120303_55%,#220000_100%)] px-5 py-8 sm:px-6 sm:py-10 text-white lg:px-12">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href={`/flashes/${flash.slug}`}
          className="font-sans text-sm text-white/60 transition hover:text-white"
        >
          ← VOLTAR PARA O FLASH
        </Link>

        <div className="mt-10">
          {flash.available ? (
            <ReservationForm
              itemType="flash"
              itemName={flash.name}
              itemSlug={flash.slug}
              artistName={flash.artistName}
              price={flash.price}
              itemImage={flash.image}
            />
          ) : (
            <div className="rounded-3xl border border-ayo-red/20 bg-[#090909] p-8 md:p-10">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-ayo-red">
                FLASH INDISPONÍVEL
              </p>

              <h1 className="font-title mt-4 text-3xl leading-[0.95] text-white sm:text-4xl">
                ESTE FLASH JÁ ESTÁ RESERVADO
              </h1>

              <p className="mt-5 max-w-xl font-sans text-sm leading-relaxed text-white/55 sm:text-base">
                O flash{" "}
                <strong className="text-white">
                  {flash.name}
                </strong>{" "}
                não está mais disponível para novas solicitações.
              </p>

              <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-white/40">
                Você ainda pode visualizar a arte como parte do
                portfólio do artista.
              </p>

              <Link
                href={`/flashes/${flash.slug}`}
                className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 font-sans text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/10 sm:w-auto"
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