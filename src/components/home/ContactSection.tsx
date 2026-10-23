"use client";

import { motion } from "framer-motion";

export function ContactSection() {
  return (
    <section id="contato" className="relative overflow-hidden bg-black px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 sm:gap-12 lg:grid-cols-[1fr_0.9fr]">
        {/* TEXTO */}

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
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
        >
          <p className="font-accent text-ayo-red text-xs tracking-[0.12em] uppercase sm:text-sm">
            FALE COM A GENTE
          </p>

          <h2 className="font-title mt-4 text-5xl leading-[0.95] text-white sm:mt-5 sm:text-6xl">CONTATO</h2>

          <p className="mt-5 max-w-xl font-sans text-sm leading-relaxed text-white/60 sm:mt-7 sm:text-base">
            Quer tirar uma ideia do papel ou conversar sobre um projeto? Chama a gente no WhatsApp.
          </p>
        </motion.div>

        {/* WHATSAPP */}

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
          className="flex lg:justify-end"
        >
          <a
            href="https://wa.me/5511992003472?text=Olá%2C%20vim%20pelo%20site%20do%20AYŌ%20Studio."
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-14 w-full items-center justify-center gap-4 rounded-full border border-white/10 bg-white/5 px-5 font-sans text-sm font-semibold text-white no-underline transition-transform duration-200 visited:text-white hover:scale-[1.02] hover:text-white active:text-white sm:w-auto"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ayo-red text-ayo-cream text-base">
              ☎
            </span>

            <span>(11) 99200-3472</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
