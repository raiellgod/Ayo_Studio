"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import { useState } from "react";

import type { SelectableFlash } from "@/lib/flashes/selectFeaturedFlashes";

type ArtistFlashesSectionProps = {
  flashes: SelectableFlash[];
};

export function ArtistFlashesSection({
  flashes,
}: ArtistFlashesSectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (flashes.length === 0) {
    return null;
  }

  return (
    <section className="mt-24">
      {/* =========================================
          CABEÇALHO
      ========================================== */}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="
          group
          flex
          w-full
          cursor-pointer
          items-end
          justify-between
          gap-8
          border-b
          border-white/10
          pb-5
          text-left
        "
      >
        <div>
          <p
            className="
              font-sans
              text-xs
              font-semibold
              uppercase
              tracking-[0.12em]
              text-[#ff4156]
            "
          >
            FLASHES DISPONÍVEIS
          </p>

          <h2
            className="
              font-title
              mt-3
              text-5xl
              leading-none
              text-white
            "
          >
            ESCOLHA SUA ARTE
          </h2>
        </div>

        <div
          className="
            flex
            shrink-0
            items-center
            gap-4
          "
        >
          <span
            className="
              font-sans
              text-sm
              text-white/40
            "
          >
            {flashes.length}
          </span>

          <span
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/5
              font-sans
              text-lg
              text-white
              transition
              group-hover:bg-white/10
            "
          >
            {isOpen ? "−" : "+"}
          </span>
        </div>
      </button>

      {/* =========================================
          CONTEÚDO
      ========================================== */}

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.35,
              ease: "easeInOut",
            }}
            className="overflow-hidden"
          >
            <div className="pt-7">
              <p
                className="
                  max-w-2xl
                  font-sans
                  text-sm
                  leading-relaxed
                  text-white/55
                "
              >
                Clique em uma arte para ver os detalhes e
                solicitar a reserva.
              </p>

              {/* =========================================
                  GRID
              ========================================== */}

              <div
                className="
                  mt-8
                  grid
                  gap-5
                  sm:grid-cols-2
                  lg:grid-cols-3
                  xl:grid-cols-4
                "
              >
                {flashes.map((flash) => (
                  <Link
                    key={flash.id}
                    href={`/flashes/${flash.slug}`}
                    className="
                      group/card
                      overflow-hidden
                      rounded-2xl
                      border
                      border-white/10
                      bg-[#090909]
                      transition
                      duration-200
                      hover:-translate-y-1
                    "
                  >
                    {/* IMAGEM */}

                    <div
                      className="
                        relative
                        aspect-[4/3]
                        overflow-hidden
                        bg-[linear-gradient(145deg,#171717_0%,#090909_100%)]
                      "
                    >
                      {flash.image ? (
                        <img
                          src={flash.image}
                          alt={flash.name}
                          className="
                            h-full
                            w-full
                            object-contain
                            p-3
                            transition-transform
                            duration-300
                            group-hover/card:scale-[1.03]
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
                            text-xs
                            text-white/20
                          "
                        >
                          flash
                        </div>
                      )}
                    </div>

                    {/* INFORMAÇÕES */}

                    <div
                      className="
                        border-t
                        border-white/5
                        bg-black/60
                        px-4
                        py-4
                      "
                    >
                      <h3
                        className="
                          font-title
                          text-xl
                          text-white
                        "
                      >
                        {flash.name}
                      </h3>

                      <p
                        className="
                          mt-2
                          font-sans
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-[0.08em]
                          text-[#77c043]
                        "
                      >
                        VER DETALHES • RESERVAR
                      </p>

                      <p
                        className="
                          mt-2
                          font-sans
                          text-sm
                          font-semibold
                          text-[#77c043]
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
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}