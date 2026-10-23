"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";
import { useState } from "react";

import type { VideoItem } from "@/data/mockVideos";

type ArtistVideosSectionProps = {
  videos: VideoItem[];
};

export function ArtistVideosSection({
  videos,
}: ArtistVideosSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (videos.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 sm:mt-16">
      {/* CABEÇALHO */}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="
          group
          flex
          w-full
          cursor-pointer
          items-end
          justify-between
          gap-4
          border-b
          sm:gap-8
          border-white/10
          pb-5
          text-left
        "
      >
        <div>
          <p
            className="
              font-accent
              text-xs
              uppercase
              tracking-[0.12em]
              text-ayo-red
            "
          >
            VOZ • INTERPRETAÇÃO • DUBLAGEM
          </p>

          <h2
            className="
              font-title
              mt-3
              text-4xl
              leading-[0.95]
              sm:text-5xl
              text-white
            "
          >
            TRABALHOS EM VÍDEO
          </h2>
        </div>

        <div
          className="
            flex
            shrink-0
            items-center
            gap-4
          "
        >
          <span
            className="
              font-sans
              text-sm
              text-white/40
            "
          >
            {videos.length}
          </span>

          <span
            className="
              flex
              h-9
              w-9
              sm:h-10
              sm:w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/5
              font-sans
              text-lg
              text-white
              transition
              group-hover:bg-white/10
            "
          >
            {isOpen ? "−" : "+"}
          </span>
        </div>
      </button>

      {/* CONTEÚDO */}

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.35,
              ease: "easeInOut",
            }}
            className="overflow-hidden"
          >
            <div className="pt-7">
              <p
                className="
                  max-w-2xl
                  font-sans
                  text-sm
                  leading-relaxed
                  text-white/55
                "
              >
                Assista a trabalhos de voz, interpretação e
                dublagem deste artista.
              </p>

              <div
                className="
                  mt-6
                  grid
                  gap-4
                  sm:mt-8
                  sm:gap-5
                  md:grid-cols-2
                  xl:grid-cols-3
                "
              >
                {videos.map((video) => (
                  <article
                    key={video.id}
                    className="
                      overflow-hidden
                      rounded-2xl
                      border
                      border-white/10
                      bg-[#090909]
                    "
                  >
                    {/* VÍDEO */}

                    <div
                      className="
                        overflow-hidden
                        bg-black
                      "
                    >
                      <video
                        controls
                        preload="metadata"
                        poster={video.thumbnail}
                        className="
                          aspect-video
                          w-full
                          bg-black
                          object-cover
                        "
                      >
                        <source
                          src={video.video}
                          type="video/mp4"
                        />

                        Seu navegador não suporta reprodução
                        de vídeo.
                      </video>
                    </div>

                    {/* INFORMAÇÕES */}

                    <div
                      className="
                        border-t
                        border-white/5
                        bg-black/60
                        px-4
                        py-4
                        sm:px-5
                        sm:py-5
                      "
                    >
                      <h3
                        className="
                          font-title
                          text-xl
                          text-white
                          sm:text-2xl
                        "
                      >
                        {video.name}
                      </h3>

                      <p
                        className="
                          mt-3
                          font-sans
                          text-sm
                          leading-relaxed
                          text-white/55
                        "
                      >
                        {video.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}