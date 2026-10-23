"use client";

import { motion } from "framer-motion";

import { mockArtworks } from "@/data/mockArtworks";

import { ArtworkCarousel } from "./ArtworkCarousel";

export function FeaturedArtworksSection() {
  return (
    <section
      id="artes"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(130,0,0,0.18),transparent_38%),#020202]
        px-5
        py-16
        sm:px-8
        sm:py-24
        lg:px-12
      "
    >
      {/* ATMOSFERA */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_50%_35%,rgba(130,0,0,0.10),transparent_52%)]
        "
      />

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
        className="
          relative
          mx-auto
          w-full
          max-w-7xl
        "
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
            className="
              font-accent
              text-xs
              uppercase
              tracking-[0.12em]
              text-ayo-red
              sm:text-sm
            "
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
            className="
              font-title
              mt-4
              text-5xl
              leading-[0.95]
              sm:mt-5
              sm:text-6xl
              text-white
            "
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
            className="
              mt-5
              max-w-3xl
              font-sans
              text-sm
              sm:mt-6
              sm:text-base
              leading-relaxed
              text-white/60
            "
          >
            Conheça trabalhos autorais,
            ilustrações e peças criadas
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
          <ArtworkCarousel
            artworks={mockArtworks}
          />
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
          className="
            mt-10
            h-0.5
            w-20
            origin-left
            bg-ayo-red
            sm:mt-16
          "
        />
      </motion.div>
    </section>
  );
}