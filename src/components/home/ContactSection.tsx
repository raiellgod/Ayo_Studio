"use client";

import { motion } from "framer-motion";

const studioWhatsapp =
  "5511992003472";

const studioAddress =
  process.env
    .NEXT_PUBLIC_STUDIO_ADDRESS ??
  "";

const mapUrl =
  studioAddress.length > 0
    ? `https://www.google.com/maps?q=${encodeURIComponent(
        studioAddress,
      )}&output=embed`
    : null;

const directionsUrl =
  studioAddress.length > 0
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        studioAddress,
      )}`
    : null;

export function ContactSection() {
  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-black px-5 py-16 sm:px-8 sm:py-24 lg:px-12"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid items-start gap-8 sm:gap-12 lg:grid-cols-[0.8fr_1.2fr]">
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

            <h2 className="font-title mt-4 text-5xl leading-[0.95] text-white sm:mt-5 sm:text-6xl">
              CONTATO
            </h2>

            <p className="mt-5 max-w-xl font-sans text-sm leading-relaxed text-white/60 sm:mt-7 sm:text-base">
              Quer tirar uma ideia do
              papel ou conversar sobre um
              projeto? Chama a gente no
              WhatsApp ou venha conhecer o
              Studio.
            </p>

            <div className="mt-7 space-y-3">
              <a
                href={`https://wa.me/${studioWhatsapp}?text=Olá%2C%20vim%20pelo%20site%20do%20AYŌ%20Studio.`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-14 w-full items-center justify-center gap-4 rounded-full border border-white/10 bg-white/5 px-5 font-sans text-sm font-semibold text-white no-underline transition-transform duration-200 visited:text-white hover:scale-[1.02] hover:text-white active:text-white sm:w-auto"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ayo-red text-base text-ayo-cream">
                  ☎
                </span>

                <span>
                  (11) 99200-3472
                </span>
              </a>

              {studioAddress && (
                <div className="pt-3">
                  <p className="font-accent text-ayo-red text-xs tracking-[0.1em] uppercase">
                    ENDEREÇO
                  </p>

                  <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-white/60">
                    {studioAddress}
                  </p>

                  {directionsUrl && (
                    <a
                      href={
                        directionsUrl
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex font-sans text-xs font-semibold tracking-[0.08em] text-white/55 uppercase transition hover:text-white"
                    >
                      ABRIR NO GOOGLE MAPS ↗
                    </a>
                  )}
                </div>
              )}
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
              amount: 0.25,
            }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: "easeOut",
            }}
            className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
          >
            {mapUrl ? (
              <iframe
                title="Localização do AYŌ Studio"
                src={mapUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[320px] w-full border-0 sm:h-[420px]"
                allowFullScreen
              />
            ) : (
              <div className="flex h-[320px] items-center justify-center px-8 text-center sm:h-[420px]">
                <p className="max-w-md font-sans text-sm leading-relaxed text-white/35">
                  Adicione
                  {" "}
                  <code className="text-white/55">
                    NEXT_PUBLIC_STUDIO_ADDRESS
                  </code>
                  {" "}
                  ao arquivo
                  {" "}
                  <code className="text-white/55">
                    .env.local
                  </code>
                  {" "}
                  para exibir o endereço
                  e o mapa.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
