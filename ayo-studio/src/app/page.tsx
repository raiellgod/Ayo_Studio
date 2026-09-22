"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

import { ArtistModal, type ModalArtist } from "@/components/artists/ArtistModal";

import { ArtistCard } from "@/components/artists/ArtistCard";

import { FeaturedFlashesSection } from "@/components/flashes/FeaturedFlashesSection";

import { FeaturedArtworksSection } from "@/components/artworks/FeaturedArtworksSection";

import { FeaturedProductsSection } from "@/components/products/FeaturedProductsSection";

import { AboutSection } from "@/components/home/AboutSection";
import { ContactSection } from "@/components/home/ContactSection";
import { Footer } from "@/components/home/Footer";

type Artist = ModalArtist & {
  image: string;
};

const artists: Artist[] = [
  {
    id: 1,
    name: "ARTISTA 01",

    image: "/artists/artist-01/card.png",

    fullImage: "/artists/artist-01/full.png",

    specialties: "BLACKWORK • FINE LINE • AUTORAL",

    description:
      "Artista focado em trabalhos autorais, desenho e tatuagem. Este espaço recebe um texto curto sobre trajetória, referências, estilo e relação do artista com o estúdio.",

    flashes: [
      {
        id: 1,
        name: "Flash 01",
        image: "",
      },
      {
        id: 2,
        name: "Flash 02",
        image: "",
      },
      {
        id: 3,
        name: "Flash 03",
        image: "",
      },
    ],
  },

  {
    id: 2,
    name: "ARTISTA 02",
    image: "",
    fullImage: "",
    specialties: "",
    description: "",
    flashes: [],
  },

  {
    id: 3,
    name: "ARTISTA 03",
    image: "",
    fullImage: "",
    specialties: "",
    description: "",
    flashes: [],
  },

  {
    id: 4,
    name: "ARTISTA 04",
    image: "",
    fullImage: "",
    specialties: "",
    description: "",
    flashes: [],
  },
];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);

  const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,

    offset: ["start start", "end end"],
  });

  // =========================================================
  // ANIMAÇÃO DA ABERTURA
  // =========================================================

  const imageOpacity = useTransform(scrollYProgress, [0, 0.35, 0.65], [1, 1, 0]);

  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.58], [1, 1, 0]);

  const titleScale = useTransform(scrollYProgress, [0, 0.75], [1, 3]);

  const titleY = useTransform(scrollYProgress, [0, 0.75], [0, -40]);

  const selectedArtist = artists.find((artist) => artist.id === selectedArtistId) ?? null;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* =====================================================
          ABERTURA
      ====================================================== */}

      <section ref={heroRef} className="relative h-[220vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-[linear-gradient(rgba(0,0,0,0.35),rgba(0,0,0,0.35)),linear-gradient(135deg,#000000_0%,#090000_20%,#260000_48%,#120000_68%,#00100c_88%,#001d16_100%)] bg-cover bg-center px-6">
          <div className="flex w-full max-w-2xl flex-col items-center text-center">
            {/* IMAGEM / CANVAS */}

            <motion.div
              style={{
                opacity: imageOpacity,
              }}
              className="flex aspect-square w-full max-w-[280px] items-center justify-center border border-white/10 bg-black/20 text-base text-white/40 backdrop-blur-sm"
            >
              canvas
            </motion.div>

            {/* TÍTULO */}

            <motion.h1
              style={{
                scale: titleScale,

                y: titleY,
              }}
              className="font-title mt-10 origin-center text-8xl leading-none whitespace-nowrap text-white"
            >
              AYŌ STUDIO
            </motion.h1>

            {/* SUBTÍTULO */}

            <motion.p
              style={{
                opacity: subtitleOpacity,
              }}
              className="mt-4 font-sans text-base tracking-[0.25em] text-white/60"
            >
              TATTOO • ART • DESIGN
            </motion.p>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRIMEIRA SECTION
      ====================================================== */}

      <section className="relative min-h-screen overflow-hidden bg-[linear-gradient(rgba(0,0,0,0.35),rgba(0,0,0,0.35)),linear-gradient(135deg,#000000_0%,#090000_20%,#260000_48%,#120000_68%,#00100c_88%,#001d16_100%)] bg-cover bg-fixed bg-center">
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-8 lg:px-12">
          {/* NAVBAR */}

          <motion.header
            initial={{
              opacity: 0,
              y: -24,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: false,
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="flex items-center justify-between py-8"
          >
            <a href="#" className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/40 font-sans text-xs text-white/40">
                logo
              </div>

              <span className="font-title text-2xl text-white">AYŌ STUDIO</span>
            </a>

            <nav className="hidden items-center gap-8 font-sans text-sm font-semibold tracking-[0.08em] text-white/70 lg:flex">
              <a href="#artistas" className="transition-colors duration-200 hover:text-white">
                ARTISTAS
              </a>

              <a href="#flashes" className="transition-colors duration-200 hover:text-white">
                FLASHES
              </a>

              <a href="#artes" className="transition-colors duration-200 hover:text-white">
                ARTES
              </a>

              <a href="#loja" className="transition-colors duration-200 hover:text-white">
                LOJA
              </a>

              <a href="#sobre" className="transition-colors duration-200 hover:text-white">
                SOBRE
              </a>

              <a href="#contato" className="transition-colors duration-200 hover:text-white">
                CONTATO
              </a>
            </nav>
          </motion.header>

          {/* HERO */}

          <div className="flex flex-1 items-center pb-24">
            <div className="max-w-2xl">
              <motion.p
                initial={{
                  opacity: 0,
                  y: 24,
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
                  delay: 0.1,
                  ease: "easeOut",
                }}
                className="font-sans text-sm font-semibold tracking-[0.12em] text-[#ff4156] uppercase"
              >
                TATTOO • ARTE • AUTORAL
              </motion.p>

              <motion.h2
                initial={{
                  opacity: 0,
                  y: 32,
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
                  duration: 0.7,
                  delay: 0.2,
                  ease: "easeOut",
                }}
                className="font-title mt-5 text-6xl leading-[0.95] text-white"
              >
                ARTE QUE
                <br />
                MARCA.
              </motion.h2>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 24,
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
                className="mt-8 max-w-lg font-sans text-xl leading-relaxed text-white/65"
              >
                Tattoo, ilustração e criação feita por artistas independentes. Descubra flashes,
                estilos e trabalhos que carregam identidade.
              </motion.p>

              <motion.a
                href="#artistas"
                initial={{
                  opacity: 0,
                  y: 24,
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
                  delay: 0.4,
                  ease: "easeOut",
                }}
                className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#ff4156] px-7 font-sans text-sm font-bold text-black transition duration-200 hover:-translate-y-0.5 hover:bg-[#ff5b6d]"
              >
                CONHEÇA OS ARTISTAS
              </motion.a>

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
                className="mt-3 h-[2px] w-28 origin-left bg-[#77c043]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ARTISTAS
      ====================================================== */}

      <section
        id="artistas"
        className="relative min-h-screen overflow-hidden bg-[#050505] px-8 py-24 lg:px-12"
      >
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
            amount: 0.15,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="mx-auto w-full max-w-7xl"
        >
          {/* CABEÇALHO */}

          <div className="max-w-3xl">
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
              className="font-sans text-sm font-semibold tracking-[0.12em] text-[#ff4156] uppercase"
            >
              CONHEÇA O ESTÚDIO
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
              className="font-title mt-5 text-6xl leading-none text-white"
            >
              QUEM FAZ A ARTE
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
              className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60"
            >
              Cada artista tem um traço, uma história e uma forma diferente de transformar ideia em
              pele.
            </motion.p>
          </div>

          {/* GRID */}

          <div className="mt-12 grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {artists.map((artist, index) => (
              <motion.div
                key={artist.id}
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
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.6,

                  delay: 0.15 + index * 0.12,

                  ease: "easeOut",
                }}
              >
                {artist.image ? (
                  <ArtistCard
                    name={artist.name}
                    image={artist.image}
                    onClick={() => setSelectedArtistId(artist.id)}
                  />
                ) : (
                  <div className="w-full max-w-[280px] overflow-hidden rounded-3xl border border-white/10 bg-[#090909]">
                    <div className="flex aspect-4/5 items-center justify-center bg-[linear-gradient(145deg,#191919_0%,#090909_100%)] font-sans text-sm text-white/25">
                      imagem
                    </div>

                    <div className="border-t border-white/5 bg-black/60 px-5 py-5">
                      <h3 className="font-title text-2xl text-white">{artist.name}</h3>

                      <p className="mt-2 font-sans text-xs font-semibold tracking-[0.08em] text-[#77c043] uppercase">
                        CLIQUE PARA CONHECER
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
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
              delay: 0.4,
              ease: "easeOut",
            }}
            className="mt-4 h-[2px] w-20 origin-left bg-[#ff4156]"
          />
        </motion.div>
      </section>

      {/* =====================================================
    FLASHES EM DESTAQUE
====================================================== */}

      <FeaturedFlashesSection />

      {/* =====================================================
    quadros e desenhos
====================================================== */}

      <FeaturedArtworksSection />

      {/* =====================================================
    loja
====================================================== */}

      <FeaturedProductsSection />

      <AboutSection />
      <ContactSection />
      <Footer />

      {/* =====================================================
          MODAL DO ARTISTA
      ====================================================== */}

      <ArtistModal
        isOpen={selectedArtist !== null}
        artist={selectedArtist}
        onClose={() => setSelectedArtistId(null)}
      />
    </main>
  );
}
