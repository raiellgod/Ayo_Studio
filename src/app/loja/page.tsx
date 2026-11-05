import Link from "next/link";

import { ProductCard } from "@/components/products/ProductCard";
import { getProducts } from "@/lib/api/products";

export default async function StorePage() {
  const products = await getProducts();

  return (
    <main
      className="
        min-h-screen
        overflow-hidden
        bg-[linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.35)),linear-gradient(135deg,#000000_0%,#160607_45%,#070000_75%,#220000_100%)]
        px-5
        py-8
        text-white
        sm:px-6
        sm:py-10
        lg:px-12
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
        "
      >
        <Link
          href="/#loja"
          className="
            inline-flex
            items-center
            gap-2
            font-sans
            text-sm
            text-white/60
            transition
            hover:text-white
          "
        >
          ← VOLTAR PARA O AYŌ
        </Link>

        <div className="mt-10 max-w-4xl sm:mt-16">
          <p
            className="
              font-sans
              text-sm
              font-semibold
              uppercase
              tracking-[0.12em]
              text-ayo-red
            "
          >
            ARTE PARA LEVAR COM VOCÊ
          </p>

          <h1
            className="
              mt-4
              font-title
              text-5xl
              leading-[0.95]
              text-white
              sm:mt-5
              sm:text-6xl
            "
          >
            LOJA DO AYŌ
          </h1>

          <p
            className="
              mt-5
              max-w-3xl
              font-sans
              text-sm
              leading-relaxed
              text-white/60
              sm:mt-6
              sm:text-base
            "
          >
            Peças, prints e produtos autorais criados pelos artistas
            do AYŌ Studio. Escolha sua peça favorita e envie seu
            interesse antes que ela saia do catálogo.
          </p>
        </div>

        <div
          className="
            mt-10
            grid
            grid-cols-1
            gap-6
            sm:mt-14
            sm:grid-cols-2
            sm:gap-7
            lg:grid-cols-3
          "
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        <div
          className="
            mt-10
            h-0.5
            w-20
            origin-left
            bg-ayo-red
            sm:mt-16
          "
        />
      </div>
    </main>
  );
}