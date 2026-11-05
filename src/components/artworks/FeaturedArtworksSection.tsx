"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { getArtworks, type Artwork } from "@/lib/api/artworks";

import { ArtworkCarousel } from "./ArtworkCarousel";

export function FeaturedArtworksSection() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadArtworks() {
      try {
        const data = await getArtworks();

        if (cancelled) {
          return;
        }

        setArtworks(data);
      } catch (error) {
        console.error(
          "Erro ao carregar artworks em destaque:",
          error,
        );
      }
    }

    void loadArtworks();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="artes"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(130,0,0,0.18),transparent_38%),#020202] px-5 py-16 sm:px-8 sm:py-24 lg:px-12"
    >
      {/* ATMOSFERA */}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(130,0,0,0.10),transparent_52%)]" />

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
            className="font-accent text-ayo-red text-xs uppercase tracking-[0.12em] sm:text-sm"
          >
            ARTE PARA ALÉM DA PELE
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
            QUADROS & DESENHOS
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
            Conheça trabalhos autorais, ilustrações e peças criadas
            pelos artistas do Studio.
          </motion.p>
        </div>

        {/* CARROSSEL EDITORIAL */}

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
            amount: 0.15,
          }}
          transition={{
            duration: 0.7,
            delay: 0.4,
            ease: "easeOut",
          }}
          className="mt-8 sm:mt-10"
        >
          <ArtworkCarousel artworks={artworks} />
        </motion.div>

        {/* LINHA */}

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