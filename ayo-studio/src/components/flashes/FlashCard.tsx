"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type FlashCardProps = {
  name: string;
  artistName: string;
  image: string;
  price: number;
  href: string;
};

export function FlashCard({ name, artistName, image, price, href }: FlashCardProps) {
  return (
    <motion.a
      href={href}
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      className="group block w-[220px] shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-[#090909]"
    >
      {/* IMAGEM */}

      <div className="relative aspect-square overflow-hidden bg-[linear-gradient(145deg,#171717_0%,#090909_100%)]">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="220px"
            className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-sans text-sm text-white/20">
            flash
          </div>
        )}
      </div>

      {/* INFORMAÇÕES */}

      <div className="border-t border-white/5 bg-black/60 px-5 py-5">
        <h3 className="font-title text-xl text-white">{name}</h3>

        <p className="mt-2 font-sans text-xs text-white/55">por {artistName}</p>

        <p className="mt-3 font-sans text-sm font-semibold tracking-[0.04em] text-[#77c043]">
          {price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>
    </motion.a>
  );
}
