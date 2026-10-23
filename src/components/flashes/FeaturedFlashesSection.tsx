"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { FlashCarousel, type FeaturedFlash } from "./FlashCarousel";

import { mockFlashes } from "@/data/mockFlashes";

import { selectFeaturedFlashes } from "@/lib/flashes/selectFeaturedFlashes";

export function FeaturedFlashesSection() {
  const [featuredFlashes, setFeaturedFlashes] = useState<FeaturedFlash[]>([]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const selected = selectFeaturedFlashes(mockFlashes, 10);

      setFeaturedFlashes(selected);
    }, 0);

    return () => {
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <section
      id="flashes"
      className="relative min-h-screen overflow-hidden bg-[#0c0909] px-5 py-16 sm:px-8 sm:py-24 lg:px-12"
    >
      {/* GLOW */}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_48%_40%,rgba(90,0,0,0.16),transparent_48%)]" />

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: false,
          amount: 0.12,
        }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
        className="relative mx-auto w-full max-w-7xl"
      >
        {/* CABEÇALHO */}

        <div className="max-w-4xl">
          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: false,
              amount: 0.5,
            }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: "easeOut",
            }}
            className="font-accent text-ayo-red text-xs tracking-[0.12em] uppercase sm:text-sm"
          >
            ARTE PRONTA PARA GANHAR PELE
          </motion.p>

          <motion.h2
            initial={{
              opacity: 0,
              y: 28,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: false,
              amount: 0.5,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="font-title mt-4 text-5xl leading-[0.95] text-white sm:mt-5 sm:text-6xl"
          >
            FLASHES EM DESTAQUE
          </motion.h2>

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: false,
              amount: 0.5,
            }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: "easeOut",
            }}
            className="mt-5 max-w-3xl font-sans text-sm leading-relaxed text-white/60 sm:mt-6 sm:text-base"
          >
            Escolha uma arte autoral e reserve antes que outra pessoa escolha o mesmo desenho.
          </motion.p>
        </div>

        {/* CARROSSEL */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
            delay: 0.4,
            ease: "easeOut",
          }}
          className="mt-8 sm:mt-10"
        >
          <FlashCarousel flashes={featuredFlashes} />
        </motion.div>

        {/* DETALHE */}

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
            delay: 0.5,
            ease: "easeOut",
          }}
          className="bg-ayo-red mt-10 h-0.5 w-20 origin-left sm:mt-16"
        />
      </motion.div>
    </section>
  );
}
