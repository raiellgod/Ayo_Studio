import Link from "next/link";
import { notFound } from "next/navigation";

import { ReservationForm } from "@/components/reservations/ReservationForm";
import { mockProducts } from "@/data/mockProducts";

type ReservationProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ReservationProductPage({
  params,
}: ReservationProductPageProps) {
  const { slug } = await params;

  const product = mockProducts.find(
    (item) => item.slug === slug,
  );

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#000000_0%,#120303_55%,#220000_100%)] px-5 py-8 text-white sm:px-6 sm:py-10 lg:px-12">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href={`/loja/${product.slug}`}
          className="font-sans text-sm text-white/60 transition hover:text-white"
        >
          ← VOLTAR PARA O PRODUTO
        </Link>

        <div className="mt-10">
          {product.available ? (
            <ReservationForm
              itemType="produto"
              itemName={product.name}
              itemSlug={product.slug}
              artistName="AYŌ Studio"
              price={product.price}
              itemImage={product.image}
            />
          ) : (
            <div className="rounded-3xl border border-ayo-red/20 bg-[#090909] p-5 sm:p-8 md:p-10">
              <p className="font-accent text-xs tracking-[0.12em] text-ayo-red uppercase">
                PRODUTO INDISPONÍVEL
              </p>

              <h1 className="font-title mt-4 text-3xl leading-[0.95] text-white sm:text-4xl">
                ESTE PRODUTO NÃO ESTÁ MAIS DISPONÍVEL
              </h1>

              <p className="mt-5 max-w-xl font-sans text-sm leading-relaxed text-white/55 sm:text-base">
                O produto{" "}
                <strong className="text-white">
                  {product.name}
                </strong>{" "}
                não aceita novas solicitações no momento.
              </p>

              <Link
                href={`/loja/${product.slug}`}
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
