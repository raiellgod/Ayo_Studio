"use client";

import { ProtectedArtworkImage } from "@/components/media/ProtectedArtworkImage";
import Link from "next/link";
import { motion } from "framer-motion";

import type { Product } from "@/lib/api/products";

type ProductDetailProps = {
  product: Product;
};

export function ProductDetail({ product }: ProductDetailProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-[linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.35)),linear-gradient(135deg,#000000_0%,#160607_45%,#070000_75%,#220000_100%)] px-5 py-8 text-white sm:px-6 sm:py-10 lg:px-12">
      <div className="mx-auto w-full max-w-7xl">
        {/* VOLTAR */}

        <Link
          href="/loja"
          className="inline-flex items-center gap-2 font-sans text-sm text-white/60 transition hover:text-white"
        >
          ← VOLTAR PARA A LOJA
        </Link>

        {/* CONTEÚDO */}

        <div className="mt-8 grid items-center gap-8 sm:mt-12 sm:gap-12 lg:grid-cols-[1fr_1fr]">
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
            className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(145deg,#171717_0%,#090909_100%)]"
          >
            {product.image ? (
              <ProtectedArtworkImage
                src={product.image}
                alt={product.name}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                imageClassName="
      object-contain
      p-8
    "
              />
            ) : (
              <div className="flex h-full items-center justify-center font-sans text-white/20">
                imagem do produto
              </div>
            )}

            {!product.available && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/65">
                <span className="border-ayo-red/40 bg-ayo-red/10 text-ayo-red rounded-full border px-4 py-2 font-sans text-xs font-semibold tracking-[0.1em] uppercase">
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
            <p className="text-ayo-red font-sans text-sm font-semibold tracking-[0.12em] uppercase">
              PRODUTO AUTORAL
            </p>

            <h1 className="font-title mt-4 text-5xl leading-[0.95] text-white sm:text-6xl">
              {product.name}
            </h1>

            <p className="mt-4 font-sans text-sm font-semibold tracking-[0.08em] text-white/50 uppercase">
              {product.type}
            </p>

            {/* DESCRIÇÃO PROVISÓRIA */}

            <p className="mt-6 max-w-xl font-sans text-sm leading-relaxed text-white/65 sm:mt-8 sm:text-base">
              Produto autoral do AYŌ Studio. Esta página poderá receber posteriormente descrição
              completa, materiais, dimensões e outras informações específicas da peça.
            </p>

            {/* PREÇO */}

            {product.price !== null && (
              <div className="mt-8">
                <p className="font-sans text-xs tracking-[0.1em] text-white/40 uppercase">VALOR</p>

                <p className="text-ayo-cream mt-1 font-sans text-3xl font-semibold">
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>
            )}

            {/* AÇÕES */}

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
              {product.available ? (
                <Link
                  href={`/reservar/produto/${product.slug}`}
                  className="bg-ayo-red text-ayo-cream hover:bg-ayo-red/85 inline-flex min-h-12 w-full items-center justify-center rounded-full px-8 font-sans text-sm font-bold transition hover:-translate-y-0.5 sm:w-auto"
                >
                  TENHO INTERESSE
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className="border-ayo-red/25 bg-ayo-red/10 text-ayo-red/70 inline-flex min-h-12 w-full cursor-not-allowed items-center justify-center rounded-full border px-8 font-sans text-sm font-bold sm:w-auto"
                >
                  INDISPONÍVEL
                </span>
              )}

              <Link
                href="/loja"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/15 px-8 font-sans text-sm font-semibold text-white/70 transition hover:border-white/30 hover:text-white sm:w-auto"
              >
                VER OUTROS PRODUTOS
              </Link>
            </div>

            <p className="mt-5 max-w-lg font-sans text-xs leading-relaxed text-white/35">
              O envio de interesse não representa compra ou confirmação automática de reserva.
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
