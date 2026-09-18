"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);

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

  // =========================================================
  // ARTISTAS TEMPORÁRIOS
  // Depois isso virá do backend
  // =========================================================

  const artists = [
    {
      id: 1,
      name: "ARTISTA 01",
    },
    {
      id: 2,
      name: "ARTISTA 02",
    },
    {
      id: 3,
      name: "ARTISTA 03",
    },
    {
      id: 4,
      name: "ARTISTA 04",
    },
  ];

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
          {/* =================================================
              NAVBAR
          ================================================== */}

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
            {/* LOGO */}

            <a href="#" className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/40 font-sans text-xs text-white/40">
                logo
              </div>

              <span className="font-title text-2xl text-white">AYŌ STUDIO</span>
            </a>

            {/* NAVEGAÇÃO */}

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

          {/* =================================================
              CONTEÚDO PRINCIPAL
          ================================================== */}

          <div className="flex flex-1 items-center pb-24">
            <div className="max-w-2xl">
              {/* EYEBROW */}

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

              {/* TÍTULO */}

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

              {/* TEXTO */}

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

              {/* CTA */}

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

              {/* DETALHE DECORATIVO */}

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
          {/* =================================================
              CABEÇALHO
          ================================================== */}

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

          {/* =================================================
              GRID DE ARTISTAS
          ================================================== */}

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {artists.map((artist, index) => (
              <motion.a
                key={artist.id}
                href={`/artistas/${artist.id}`}
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
                className="group overflow-hidden rounded-[24px] border border-white/10 bg-[#090909]"
              >
                {/* IMAGEM */}

                <div className="flex aspect-[4/5] items-center justify-center bg-[linear-gradient(145deg,#191919_0%,#090909_100%)] font-sans text-sm text-white/25">
                  imagem
                </div>

                {/* INFORMAÇÕES */}

                <div className="border-t border-white/5 bg-black/60 px-5 py-5">
                  <h3 className="font-title text-2xl text-white">{artist.name}</h3>

                  <p className="mt-2 font-sans text-xs font-semibold tracking-[0.08em] text-[#77c043] uppercase">
                    CLIQUE PARA CONHECER
                  </p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* =================================================
              DETALHE DECORATIVO
          ================================================== */}

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
    </main>
  );
}
