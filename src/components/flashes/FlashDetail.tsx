"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import type { SelectableFlash } from "@/lib/flashes/selectFeaturedFlashes";

type FlashDetailProps = {
  flash: SelectableFlash;
};

export function FlashDetail({
  flash,
}: FlashDetailProps) {
  return (
    <main
      className="
        min-h-screen
        overflow-hidden
        bg-[linear-gradient(rgba(0,0,0,0.35),rgba(0,0,0,0.35)),linear-gradient(135deg,#000000_0%,#090000_20%,#260000_48%,#120000_68%,#00100c_88%,#001d16_100%)]
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
          href="/#flashes"
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
          ← VOLTAR PARA OS FLASHES
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
            {flash.image ? (
              <Image
                src={flash.image}
                alt={flash.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="
                  object-contain
                  p-10
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
                imagem do flash
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
              FLASH AUTORAL
            </p>

            <h1
              className="
                font-title
                mt-4
                text-6xl
                leading-none
                text-white
              "
            >
              {flash.name}
            </h1>

            <p
              className="
                mt-4
                font-sans
                text-sm
                text-white/50
              "
            >
              por {flash.artistName}
            </p>

            {/* CATEGORIAS */}

            <div
              className="
                mt-6
                flex
                flex-wrap
                gap-2
              "
            >
              {flash.categories.map(
                (category) => (
                  <span
                    key={category}
                    className="
                      rounded-full
                      border
                      border-white/10
                      bg-white/5
                      px-3
                      py-1.5
                      font-sans
                      text-xs
                      text-white/60
                    "
                  >
                    {category}
                  </span>
                ),
              )}
            </div>

            {/* DESCRIÇÃO */}

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
              {flash.description}
            </p>

            {/* PREÇO */}

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
                  text-white
                "
              >
                {flash.price.toLocaleString(
                  "pt-BR",
                  {
                    style: "currency",
                    currency: "BRL",
                  },
                )}
              </p>
            </div>

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
                RESERVAR FLASH
              </button>

              <Link
                href={`/artistas/${flash.artistId}`}
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
                VER ARTISTA
              </Link>
            </div>

            {/* AVISO */}

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
              A solicitação de reserva não confirma
              automaticamente o flash. A confirmação será feita
              pelo Studio.
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}