"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { ProductCard } from "@/components/products/ProductCard";
import { mockProducts } from "@/data/mockProducts";

export function FeaturedProductsSection() {
    const [featuredProducts, setFeaturedProducts] = useState(
  mockProducts
    .filter((product) => product.available)
    .slice(0, 3),
);

useEffect(() => {
  const timeout = window.setTimeout(() => {
    const availableProducts = mockProducts.filter(
      (product) => product.available,
    );

    const shuffled = [...availableProducts];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(
        Math.random() * (i + 1),
      );

      [shuffled[i], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[i],
      ];
    }

    setFeaturedProducts(shuffled.slice(0, 3));
  }, 0);

  return () => {
    window.clearTimeout(timeout);
  };
}, []);

  return (
    <section
      id="loja"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#120505]
        px-8
        py-24
        lg:px-12
      "
    >
      {/* ATMOSFERA */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_50%_45%,rgba(90,0,0,0.16),transparent_55%)]
        "
      />

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: false,
          amount: 0.12,
        }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
        className="
          relative
          mx-auto
          w-full
          max-w-7xl
        "
      >
        {/* CABEÇALHO */}

        <div className="max-w-4xl">
          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: false,
              amount: 0.5,
            }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: "easeOut",
            }}
            className="
              font-sans
              text-sm
              font-semibold
              uppercase
              tracking-[0.12em]
              text-[#ff4156]
            "
          >
            ARTE PARA LEVAR COM VOCÊ
          </motion.p>

          <motion.h2
            initial={{
              opacity: 0,
              y: 28,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: false,
              amount: 0.5,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="
              mt-5
              font-title
              text-6xl
              leading-none
              text-white
            "
          >
            LOJA DO AYŌ
          </motion.h2>

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: false,
              amount: 0.5,
            }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: "easeOut",
            }}
            className="
              mt-6
              max-w-3xl
              font-sans
              text-base
              leading-relaxed
              text-white/60
            "
          >
            Peças, prints e produtos autorais criados pelos artistas
            do AYŌ Studio. Escolha sua peça favorita e reserve antes
            que ela saia do catálogo.
          </motion.p>
        </div>

        {/* PRODUTOS */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
            amount: 0.15,
          }}
          transition={{
            duration: 0.7,
            delay: 0.4,
            ease: "easeOut",
          }}
          className="
            mt-12
            grid
            grid-cols-1
            gap-8
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </motion.div>

        {/* CTA */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
            amount: 0.5,
          }}
          transition={{
            duration: 0.6,
            delay: 0.5,
            ease: "easeOut",
          }}
          className="
            mt-12
            flex
            justify-center
          "
        >
          <Link
            href="/loja"
            className="
              inline-flex
              min-h-12
              items-center
              justify-center
              rounded-full
              bg-[#ff4156]
              px-8
              font-sans
              text-sm
              font-bold
              text-black
              transition
              duration-200
              hover:-translate-y-0.5
              hover:bg-[#ff5b6d]
            "
          >
            VER A LOJA
          </Link>
        </motion.div>

        {/* LINHA */}

        <motion.div
          initial={{
            scaleX: 0,
          }}
          whileInView={{
            scaleX: 1,
          }}
          viewport={{
            once: false,
            amount: 0.5,
          }}
          transition={{
            duration: 0.7,
            delay: 0.6,
            ease: "easeOut",
          }}
          className="
            mt-16
            h-0.5
            w-20
            origin-left
            bg-[#ff4156]
          "
        />
      </motion.div>
    </section>
  );
}