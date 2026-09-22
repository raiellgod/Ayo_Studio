"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import type { Product } from "@/data/mockProducts";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      className="h-full"
    >
      <Link
        href={`/loja/${product.slug}`}
        className="
          group
          flex
          h-full
          flex-col
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-[#090909]
        "
      >
        {/* IMAGEM */}

        <div
          className="
            relative
            aspect-square
            overflow-hidden
            bg-[linear-gradient(145deg,#171717_0%,#090909_100%)]
          "
        >
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="
                object-cover
                transition-transform
                duration-300
                group-hover:scale-[1.03]
              "
            />
          ) : (
            <div
              className="
                flex
                h-full
                items-center
                justify-center
                font-sans
                text-sm
                text-white/20
              "
            >
              produto
            </div>
          )}

          {!product.available && (
            <div
              className="
                absolute
                inset-0
                flex
                items-center
                justify-center
                bg-black/65
              "
            >
              <span
                className="
                  rounded-full
                  border
                  border-[#ff4156]/40
                  bg-[#ff4156]/10
                  px-4
                  py-2
                  font-sans
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.1em]
                  text-[#ff4156]
                "
              >
                INDISPONÍVEL
              </span>
            </div>
          )}
        </div>

        {/* INFORMAÇÕES */}

        <div
          className="
            flex
            flex-1
            flex-col
            bg-black/60
            px-5
            py-5
          "
        >
          <h2
            className="
              font-title
              text-2xl
              text-white
            "
          >
            {product.name}
          </h2>

          <p
            className="
              mt-2
              font-sans
              text-xs
              font-semibold
              uppercase
              tracking-[0.08em]
              text-white/50
            "
          >
            {product.type}
          </p>

          <p
            className="
              mt-3
              min-h-[20px]
              font-sans
              text-sm
              font-semibold
              text-[#77c043]
            "
          >
            {product.price !== null
              ? product.price.toLocaleString(
                  "pt-BR",
                  {
                    style: "currency",
                    currency: "BRL",
                  },
                )
              : "\u00A0"}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}