"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import type { Artwork } from "@/data/mockArtworks";

type ArtworkDetailProps = {
  artwork: Artwork;
};

export function ArtworkDetail({
  artwork,
}: ArtworkDetailProps) {
  return (
    <main
      className="
        min-h-screen
        overflow-hidden
        bg-[linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.25)),linear-gradient(135deg,#000000_0%,#041008_45%,#00160b_100%)]
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
          href="/#artes"
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
          ← VOLTAR PARA AS ARTES
        </Link>

        {/* CONTEÚDO */}

        <div
          className="
            mt-12
            grid
            items-center
            gap-12
            lg:grid-cols-[1.2fr_0.8fr]
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
              min-h-[620px]
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-[linear-gradient(145deg,#171717_0%,#080808_100%)]
            "
          >
            {artwork.image ? (
              <Image
                src={artwork.image}
                alt={artwork.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
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
                  min-h-[620px]
                  items-center
                  justify-center
                  font-sans
                  text-white/20
                "
              >
                imagem da obra
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
              ARTE AUTORAL
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
              {artwork.name}
            </h1>

            <p
              className="
                mt-4
                font-sans
                text-sm
                text-white/50
              "
            >
              por {artwork.artistName}
            </p>

            {/* TIPO */}

            <div className="mt-6">
              <span
                className="
                  inline-flex
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  px-3
                  py-1.5
                  font-sans
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.08em]
                  text-[#77c043]
                "
              >
                {artwork.type}
              </span>
            </div>

            {/* DESCRIÇÃO PROVISÓRIA */}

            <p
              className="
                mt-8
                max-w-lg
                font-sans
                text-base
                leading-relaxed
                text-white/65
              "
            >
              Trabalho autoral criado por {artwork.artistName}.
              Esta página poderá receber posteriormente descrição,
              técnica, dimensões e outras informações da obra.
            </p>

            {/* PREÇO */}

            {artwork.price !== null && (
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
                  {artwork.price.toLocaleString(
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
                className="
                  inline-flex
                  min-h-12
                  cursor-pointer
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
                  hover:-translate-y-0.5
                  hover:bg-[#ff5b6d]
                "
              >
                TENHO INTERESSE
              </button>

              <Link
                href="/#artistas"
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
                VER ARTISTAS
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
              O envio de interesse não representa confirmação
              automática de reserva ou venda.
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}