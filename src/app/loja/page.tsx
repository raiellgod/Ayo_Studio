"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { ProductCard } from "@/components/products/ProductCard";
import { mockProducts } from "@/data/mockProducts";

export default function StorePage() {
  return (
    <main
      className="
        min-h-screen
        overflow-hidden
        bg-[linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.35)),linear-gradient(135deg,#000000_0%,#160607_45%,#070000_75%,#220000_100%)]
        px-5
        py-8
        sm:px-6
        sm:py-10
        text-white
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
        {/* VOLTAR */}

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

        {/* CABEÇALHO */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="
            mt-10
            max-w-4xl
            sm:mt-10 sm:mt-16
          "
        >
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
              sm:mt-5
              sm:text-6xl
              text-white
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
              sm:mt-6
              sm:text-base
              leading-relaxed
              text-white/60
            "
          >
            Peças, prints e produtos autorais criados pelos artistas
            do AYŌ Studio. Escolha sua peça favorita e envie seu
            interesse antes que ela saia do catálogo.
          </p>
        </motion.div>

        {/* GRID */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: "easeOut",
          }}
          className="
            mt-10
            grid
            grid-cols-1
            gap-6
            sm:mt-14
            sm:gap-7
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {mockProducts.map(
            (product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ),
          )}
        </motion.div>

        {/* LINHA */}

        <motion.div
          initial={{
            scaleX: 0,
          }}
          animate={{
            scaleX: 1,
          }}
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: "easeOut",
          }}
          className="
            mt-10 sm:mt-16
            h-0.5
            w-20
            origin-left
            bg-ayo-red
          "
        />
      </div>
    </main>
  );
}