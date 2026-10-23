"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

import { ArtistModal } from "@/components/artists/ArtistModal";
import { ArtistCard } from "@/components/artists/ArtistCard";

import { mockArtists } from "@/data/mockArtists";

import { FeaturedFlashesSection } from "@/components/flashes/FeaturedFlashesSection";

import { FeaturedArtworksSection } from "@/components/artworks/FeaturedArtworksSection";

import { FeaturedProductsSection } from "@/components/products/FeaturedProductsSection";

import { AboutSection } from "@/components/home/AboutSection";
import { ContactSection } from "@/components/home/ContactSection";
import { Footer } from "@/components/home/Footer";

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);

  const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,

    offset: ["start start", "end end"],
  });

  // =========================================================
  // ANIMAÇÃO DA ABERTURA
  // =========================================================

  const openingBackground = useTransform(
    scrollYProgress,
    [0, 0.42, 0.78, 1],
    ["#000000", "#FAF4EF", "#820000", "#820000"],
  );

  const titleOpacity = useTransform(scrollYProgress, [0, 0.22, 0.42, 0.58], [1, 0.7, 0.15, 0]);

  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.52], [1, 1, 0]);

  const titleScaleDesktop = useTransform(scrollYProgress, [0, 0.58, 0.86], [1, 1.55, 2.8]);

  const titleYDesktop = useTransform(scrollYProgress, [0, 0.58, 0.86], [0, -16, -72]);

  const roosterOpacity = useTransform(scrollYProgress, [0.18, 0.34, 0.96], [0, 1, 1]);

  const roosterScaleDesktop = useTransform(scrollYProgress, [0.18, 0.55, 1], [0.5, 1.3, 1.5]);

  const roosterYDesktop = useTransform(scrollYProgress, [0.18, 0.55, 1], [90, 18, -20]);

  const titleScaleMobile = useTransform(scrollYProgress, [0, 0.55, 0.86], [1, 1.2, 1.72]);

  const titleYMobile = useTransform(scrollYProgress, [0, 0.55, 0.86], [0, -8, -30]);

  const roosterScaleMobile = useTransform(scrollYProgress, [0.18, 0.55, 1], [0.65, 1.15, 1.8]);

  const roosterYMobile = useTransform(scrollYProgress, [0.18, 0.55, 1], [70, 12, 0]);

  const selectedArtist = mockArtists.find((artist) => artist.id === selectedArtistId) ?? null;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* =====================================================
          ABERTURA
      ====================================================== */}

      <section ref={heroRef} className="relative h-[185svh] md:h-[220vh]">
        <motion.div
          style={{
            backgroundColor: openingBackground,
          }}
          className="sticky top-0 h-svh overflow-hidden"
        >
          {/* =================================================
              DESKTOP / TABLET
          ================================================== */}

          <div className="hidden h-full w-full items-center justify-center px-8 md:flex">
            <motion.div
              style={{
                opacity: roosterOpacity,
                scale: roosterScaleDesktop,
                y: roosterYDesktop,
              }}
              className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
            >
              <div className="relative h-[62vh] w-[48vh] max-w-[620px]">
                <Image
                  src="/brand/logo-galo.png"
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 1024px) 48vh, 620px"
                  className="object-contain"
                />
              </div>
            </motion.div>

            <div className="relative z-10 flex w-full max-w-5xl flex-col items-center text-center">
              <motion.h1
                style={{
                  opacity: titleOpacity,
                  scale: titleScaleDesktop,
                  y: titleYDesktop,
                }}
                className="font-title origin-center text-[clamp(5rem,10vw,9rem)] leading-[0.82] whitespace-nowrap text-[#FAF4EF]"
              >
                AYÔ
              </motion.h1>

              <motion.p
                style={{
                  opacity: subtitleOpacity,
                }}
                className="mt-6 font-sans text-sm font-semibold tracking-[0.32em] text-[#FAF4EF]/65 uppercase"
              >
                STUDIO DE ARTE
              </motion.p>
            </div>
          </div>

          {/* =================================================
              MOBILE
          ================================================== */}

          <div className="flex h-full w-full items-center justify-center overflow-hidden px-5 md:hidden">
            <motion.div
              style={{
                opacity: roosterOpacity,
                scale: roosterScaleMobile,
                y: roosterYMobile,
              }}
              className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
            >
              <div className="relative h-[54svh] w-[43svh] max-w-[390px]">
                <Image
                  src="/brand/logo-galo.png"
                  alt=""
                  fill
                  priority
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
            </motion.div>

            <div className="relative z-10 flex w-full flex-col items-center text-center">
              <motion.h1
                style={{
                  opacity: titleOpacity,
                  scale: titleScaleMobile,
                  y: titleYMobile,
                }}
                className="font-title origin-center text-[clamp(4.3rem,22vw,6.5rem)] leading-[0.82] whitespace-nowrap text-[#FAF4EF]"
              >
                AYÔ
              </motion.h1>

              <motion.p
                style={{
                  opacity: subtitleOpacity,
                }}
                className="mt-5 max-w-[90vw] font-sans text-[11px] font-semibold tracking-[0.24em] text-[#FAF4EF]/65 uppercase"
              >
                STUDIO DE ARTE
              </motion.p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* =====================================================
          PRIMEIRA SECTION
      ====================================================== */}

      <section className="relative min-h-screen overflow-hidden bg-[linear-gradient(rgba(0,0,0,0.20),rgba(0,0,0,0.45)),linear-gradient(135deg,#000000_0%,#090000_28%,#210000_62%,#820000_140%)] bg-cover bg-fixed bg-center">
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 sm:px-8 lg:px-12">
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
            className="relative flex min-h-[78px] items-center justify-between gap-4 py-4 sm:min-h-[88px] sm:gap-8 sm:py-5"
          >
            <a
              href="#"
              aria-label="Ayô Studio de Artes - início"
              className="relative block h-[64px] w-[150px] shrink-0 sm:h-[90px] sm:w-[210px]"
            >
              <Image
                src="/brand/LOGO horizontal branco.png"
                alt="Ayô Studio de Artes"
                fill
                priority
                sizes="(max-width: 639px) 150px, 210px"
                className="object-contain object-left"
              />
            </a>

            <nav className="text-ayo-cream/70 hidden items-center gap-7 font-sans text-sm font-semibold tracking-[0.06em] lg:flex">
              <a href="#artistas" className="hover:text-ayo-cream transition-colors duration-200">
                ARTISTAS
              </a>

              <a href="#flashes" className="hover:text-ayo-cream transition-colors duration-200">
                FLASHES
              </a>

              <a href="#artes" className="hover:text-ayo-cream transition-colors duration-200">
                ARTES
              </a>

              <a href="#loja" className="hover:text-ayo-cream transition-colors duration-200">
                LOJA
              </a>

              <a href="#sobre" className="hover:text-ayo-cream transition-colors duration-200">
                SOBRE
              </a>

              <a href="#contato" className="hover:text-ayo-cream transition-colors duration-200">
                CONTATO
              </a>
            </nav>

            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((current) => !current)}
              className="text-ayo-cream hover:border-ayo-red/70 hover:text-ayo-red flex h-11 w-11 shrink-0 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 bg-black/30 transition lg:hidden"
            >
              <span
                className={`h-px w-5 bg-current transition-transform duration-200 ${
                  isMobileMenuOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-5 bg-current transition-opacity duration-200 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`h-px w-5 bg-current transition-transform duration-200 ${
                  isMobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </button>

            {isMobileMenuOpen && (
              <motion.nav
                initial={{
                  opacity: 0,
                  y: -10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="absolute top-full right-0 left-0 z-30 mx-0 flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/95 p-2 shadow-2xl backdrop-blur-md lg:hidden"
              >
                {[
                  ["ARTISTAS", "#artistas"],
                  ["FLASHES", "#flashes"],
                  ["ARTES", "#artes"],
                  ["LOJA", "#loja"],
                  ["SOBRE", "#sobre"],
                  ["CONTATO", "#contato"],
                ].map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-ayo-cream/75 hover:bg-ayo-red/20 hover:text-ayo-cream rounded-xl px-4 py-3 font-sans text-sm font-semibold tracking-[0.08em] transition"
                  >
                    {label}
                  </a>
                ))}
              </motion.nav>
            )}
          </motion.header>

          {/* HERO */}

          <div className="flex flex-1 items-center py-16 sm:pb-24 sm:pt-8">
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
                className="font-accent text-ayo-red text-xs tracking-[0.12em] uppercase sm:text-sm"
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
                className="font-title mt-4 text-[clamp(3.4rem,17vw,6rem)] leading-[0.9] text-white sm:mt-5 sm:text-6xl"
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
                className="mt-6 max-w-lg font-sans text-base leading-relaxed text-white/65 sm:mt-8 sm:text-xl"
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
                className="bg-ayo-red text-ayo-cream hover:bg-ayo-red/85 mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 font-sans text-sm font-bold transition duration-200 hover:-translate-y-0.5 sm:mt-8 sm:w-auto sm:px-7"
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
                className="bg-ayo-cream/70 mt-3 h-[2px] w-28 origin-left"
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
        className="relative min-h-screen overflow-hidden bg-[#050505] px-5 py-16 sm:px-8 sm:py-24 lg:px-12"
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
              className="font-accent text-ayo-red text-xs tracking-[0.12em] uppercase sm:text-sm"
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
              className="font-title mt-4 text-5xl leading-[0.95] text-white sm:mt-5 sm:text-6xl"
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
              className="mt-5 max-w-2xl font-sans text-sm leading-relaxed text-white/60 sm:mt-6 sm:text-base"
            >
              Cada artista tem um traço, uma história e uma forma diferente de transformar ideia em
              pele.
            </motion.p>
          </div>

          {/* GRID */}

          <div className="mt-10 grid grid-cols-1 justify-items-center gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mockArtists.map((artist, index) => (
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
                <ArtistCard
                  name={artist.name}
                  image={artist.image}
                  onClick={() => setSelectedArtistId(artist.id)}
                />
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
            className="bg-ayo-red mt-4 h-[2px] w-20 origin-left"
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
