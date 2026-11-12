"use client";

import { motion } from "framer-motion";

import { StudioCarousel } from "@/components/home/StudioCarousel";
import { studioImages } from "@/data/studioImages";

export function AboutSection() {
  return (
    <section
      id="sobre"
      className="relative overflow-hidden bg-[#0c0808] px-5 py-16 sm:px-8 sm:py-24 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(70,0,0,0.12),transparent_55%)]" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 sm:gap-12 lg:grid-cols-[1fr_0.9fr]">
        <motion.div
          initial={{
            opacity: 0,
            x: -40,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: false,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
        >
          <h2 className="font-title text-5xl leading-[0.95] text-white sm:text-6xl">
            SOBRE O STUDIO
          </h2>

          <div className="mt-6 max-w-2xl space-y-5 font-sans text-sm leading-relaxed text-white/60 sm:mt-8 sm:space-y-6 sm:text-base">
            <p>
              O AYŌ Studio nasceu da
              vontade de transformar arte
              em experiência. Um espaço
              criado para reunir diferentes
              estilos, ideias e artistas,
              onde cada trabalho é pensado
              de forma autoral e cada pessoa
              participa do processo
              criativo.
            </p>

            <p>
              Aqui, tatuagem e arte
              caminham juntas: do primeiro
              rascunho à peça final,
              valorizamos identidade,
              cuidado e liberdade para
              criar.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: false,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            ease: "easeOut",
          }}
          className="relative min-h-[300px] overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(145deg,#171717_0%,#090909_100%)] sm:min-h-[420px]"
        >
          <StudioCarousel
            images={studioImages}
          />
        </motion.div>
      </div>

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
          delay: 0.25,
          ease: "easeOut",
        }}
        className="mx-auto mt-10 h-0.5 w-full max-w-7xl origin-left sm:mt-16"
      >
        <div className="h-full w-20 bg-ayo-red" />
      </motion.div>
    </section>
  );
}
