"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MouseEvent } from "react";

type ArtistCardProps = {
  name: string;
  image: string;
  onClick: () => void;
};

export function ArtistCard({ name, image, onClick }: ArtistCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);

  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);

  const smoothRotateX = useSpring(rotateX, {
    stiffness: 180,
    damping: 20,
  });

  const smoothRotateY = useSpring(rotateY, {
    stiffness: 180,
    damping: 20,
  });

  function handleMouseMove(event: MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const normalizedX = x / rect.width - 0.5;

    const normalizedY = y / rect.height - 0.5;

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative block w-full max-w-[280px] cursor-pointer bg-transparent text-left [perspective:1000px]"
    >
      <motion.div
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          scale: 1.025,
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
        className="overflow-hidden rounded-3xl border border-white/10 bg-[#090909]"
      >
        {/* =========================================
            IMAGEM
        ========================================== */}

        <div className="relative aspect-4/5 overflow-hidden bg-[linear-gradient(145deg,#191919_0%,#090909_100%)]">
          <motion.div
            style={{
              transform: "translateZ(35px) translateX(32px) translateY(-36px) scale(2)",
            }}
            className="absolute inset-0"
          >
            <img
              src={image}
              alt={name}
              className="absolute inset-0 h-full w-full object-contain object-center p-6 transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </motion.div>

          {/* SOMBRA */}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* =========================================
            INFORMAÇÕES
        ========================================== */}

        <div className="border-t border-white/5 bg-black/60 px-5 py-5">
          <h3 className="font-title text-2xl text-white">{name}</h3>

          <p className="mt-2 font-sans text-xs font-semibold tracking-[0.08em] text-[#77c043] uppercase">
            CLIQUE PARA CONHECER
          </p>
        </div>
      </motion.div>
    </button>
  );
}
