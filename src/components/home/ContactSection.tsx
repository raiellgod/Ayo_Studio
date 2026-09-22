"use client";

import { motion } from "framer-motion";

export function ContactSection() {
  return (
    <section id="contato" className="relative overflow-hidden bg-black px-8 py-24 lg:px-12">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
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
          <p className="font-sans text-sm font-semibold tracking-[0.12em] text-[#77c043] uppercase">
            FALE COM A GENTE
          </p>

          <h2 className="font-title mt-5 text-6xl leading-none text-white">CONTATO</h2>

          <p className="mt-7 max-w-xl font-sans text-base leading-relaxed text-white/60">
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
            href="https://wa.me/5511974694887?text=Olá%2C%20vim%20pelo%20site%20do%20AYŌ%20Studio."
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-14 items-center gap-4 rounded-full border border-white/10 bg-white/5 px-5 font-sans text-sm font-semibold text-white no-underline transition-transform duration-200 visited:text-white hover:scale-105 hover:text-white active:text-white"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#77c043] text-base text-black">
              ☎
            </span>

            <span>(11) 97469-4887</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
