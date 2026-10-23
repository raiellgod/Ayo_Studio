"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type FlashCardProps = {
  name: string;
  artistName: string;
  image: string;
  price: number;
  href: string;
  available: boolean;
};

export function FlashCard({
  name,
  artistName,
  image,
  price,
  href,
  available,
}: FlashCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      className="
        w-[78vw]
        max-w-[220px]
        shrink-0
        sm:w-[220px]
      "
    >
      <Link
        href={href}
        className="
          group
          block
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-[#090909]
        "
      >
        {/* =========================================
            IMAGEM
        ========================================== */}

        <div
          className="
            relative
            aspect-square
            overflow-hidden
            bg-[linear-gradient(145deg,#171717_0%,#090909_100%)]
          "
        >
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              unoptimized
              sizes="220px"
              className={`
                object-contain
                p-4
                sm:p-6
                transition-all
                duration-300
                group-hover:scale-105
                ${
                  available
                    ? "opacity-100"
                    : "opacity-40 grayscale-[30%]"
                }
              `}
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
              flash
            </div>
          )}

          {!available && (
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                flex
                items-center
                justify-center
                bg-black/20
              "
            >
              <span
                className="
                  rounded-full
                  border
                  border-ayo-red/50
                  bg-black/80
                  px-5
                  py-2
                  font-sans
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-ayo-red
                "
              >
                RESERVADO
              </span>
            </div>
          )}
        </div>

        {/* =========================================
            INFORMAÇÕES
        ========================================== */}

        <div
          className="
            border-t
            border-white/5
            bg-black/60
            px-4
            py-4
            sm:px-5
            sm:py-5
          "
        >
          <h3
            className="
              font-title
              text-lg
              text-white
              sm:text-xl
            "
          >
            {name}
          </h3>

          <p
            className="
              mt-2
              font-sans
              text-xs
              text-white/55
            "
          >
            por {artistName}
          </p>

          {available ? (
            <p
              className="
                mt-3
                font-sans
                text-sm
                font-semibold
                tracking-[0.04em]
                text-ayo-cream
              "
            >
              {price.toLocaleString(
                "pt-BR",
                {
                  style: "currency",
                  currency: "BRL",
                },
              )}
            </p>
          ) : (
            <p
              className="
                mt-3
                font-sans
                text-xs
                font-semibold
                uppercase
                tracking-[0.08em]
                text-ayo-red
              "
            >
              RESERVADO
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}