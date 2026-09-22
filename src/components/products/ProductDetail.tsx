"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import type { Product } from "@/data/mockProducts";

type ProductDetailProps = {
  product: Product;
};

export function ProductDetail({
  product,
}: ProductDetailProps) {
  return (
    <main
      className="
        min-h-screen
        overflow-hidden
        bg-[linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)),linear-gradient(135deg,#000000_0%,#160607_45%,#070000_75%,#00100c_100%)]
        px-6
        py-10
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
          href="/loja"
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
          ← VOLTAR PARA A LOJA
        </Link>

        {/* CONTEÚDO */}

        <div
          className="
            mt-12
            grid
            items-center
            gap-12
            lg:grid-cols-[1fr_1fr]
          "
        >
          {/* IMAGEM */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="
              relative
              aspect-square
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-[linear-gradient(145deg,#171717_0%,#090909_100%)]
            "
          >
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="
                  object-contain
                  p-8
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
                  text-white/20
                "
              >
                imagem do produto
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
          </motion.div>

          {/* INFORMAÇÕES */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: "easeOut",
            }}
          >
            <p
              className="
                font-sans
                text-sm
                font-semibold
                uppercase
                tracking-[0.12em]
                text-[#ff4156]
              "
            >
              PRODUTO AUTORAL
            </p>

            <h1
              className="
                mt-4
                font-title
                text-6xl
                leading-none
                text-white
              "
            >
              {product.name}
            </h1>

            <p
              className="
                mt-4
                font-sans
                text-sm
                font-semibold
                uppercase
                tracking-[0.08em]
                text-white/50
              "
            >
              {product.type}
            </p>

            {/* DESCRIÇÃO PROVISÓRIA */}

            <p
              className="
                mt-8
                max-w-xl
                font-sans
                text-base
                leading-relaxed
                text-white/65
              "
            >
              Produto autoral do AYŌ Studio. Esta página poderá
              receber posteriormente descrição completa, materiais,
              dimensões e outras informações específicas da peça.
            </p>

            {/* PREÇO */}

            {product.price !== null && (
              <div className="mt-8">
                <p
                  className="
                    font-sans
                    text-xs
                    uppercase
                    tracking-[0.1em]
                    text-white/40
                  "
                >
                  VALOR
                </p>

                <p
                  className="
                    mt-1
                    font-sans
                    text-3xl
                    font-semibold
                    text-[#77c043]
                  "
                >
                  {product.price.toLocaleString(
                    "pt-BR",
                    {
                      style: "currency",
                      currency: "BRL",
                    },
                  )}
                </p>
              </div>
            )}

            {/* AÇÕES */}

            <div
              className="
                mt-10
                flex
                flex-wrap
                gap-4
              "
            >
              <button
                type="button"
                disabled={!product.available}
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
                  enabled:cursor-pointer
                  enabled:hover:-translate-y-0.5
                  enabled:hover:bg-[#ff5b6d]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                {product.available
                  ? "TENHO INTERESSE"
                  : "INDISPONÍVEL"}
              </button>

              <Link
                href="/loja"
                className="
                  inline-flex
                  min-h-12
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/15
                  px-8
                  font-sans
                  text-sm
                  font-semibold
                  text-white/70
                  transition
                  hover:border-white/30
                  hover:text-white
                "
              >
                VER OUTROS PRODUTOS
              </Link>
            </div>

            <p
              className="
                mt-5
                max-w-lg
                font-sans
                text-xs
                leading-relaxed
                text-white/35
              "
            >
              O envio de interesse não representa compra ou
              confirmação automática de reserva.
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}