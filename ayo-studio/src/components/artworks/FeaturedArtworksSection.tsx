"use client";

import { motion } from "framer-motion";

import { mockArtworks } from "@/data/mockArtworks";

import { ArtworkCarousel } from "./ArtworkCarousel";

export function FeaturedArtworksSection() {
  return (
    <section
      id="artes"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#001006]
        px-8
        py-24
        lg:px-12
      "
    >
      {/* ATMOSFERA */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_50%_35%,rgba(0,70,30,0.12),transparent_52%)]
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
              font-sans
              text-sm
              font-semibold
              uppercase
              tracking-[0.12em]
              text-[#ff4156]
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
              mt-5
              text-6xl
              leading-none
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
              mt-6
              max-w-3xl
              font-sans
              text-base
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
          className="mt-10"
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
            mt-16
            h-0.5
            w-20
            origin-left
            bg-[#ff4156]
          "
        />
      </motion.div>
    </section>
  );
}