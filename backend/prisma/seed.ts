import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "../src/generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL não está configurada.");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

/* =========================================================
   PROFISSIONAIS
========================================================= */

const professionals = [
  {
    slug: "artista-01",
    name: "Kevin Ferrari",
    role: "TATUADOR",
    specialties: "BLACKWORK • FINE LINE • AUTORAL",
    description:
      "Artista focado em trabalhos autorais, desenho e tatuagem. Este espaço recebe um texto curto sobre trajetória, referências, estilo e relação do artista com o estúdio.",
    image: "/artists/artist-01/card.jpg",
    fullImage: "/artists/artist-01/full.jpg",
    profileImage: "/artists/artist-01/face.jpg",
    services: ["TATTOO", "ART"] as const,
  },
  {
    slug: "artista-02",
    name: "Sara Christina",
    role: "ARTISTA / TATUADORA",
    specialties: "",
    description: "",
    image: "/artists/artist-02/card.jpg",
    fullImage: "/artists/artist-02/card.jpg",
    profileImage: "/artists/artist-02/card.jpg",
    services: ["TATTOO", "ART"] as const,
  },
  {
    slug: "artista-03",
    name: "Gabriell Lopes",
    role: "ARTISTA / TATUADOR",
    specialties: "",
    description: "",
    image: "/artists/artist-03/card.jpg",
    fullImage: "/artists/artist-03/full.jpg",
    profileImage: "/artists/artist-03/face.jpg",
    services: ["TATTOO", "ART"] as const,
  },
  {
    slug: "artista-04",
    name: "Fernando Fabricio",
    role: "DUBLADOR",
    specialties: "",
    description: "",
    image: "/artists/artist-04/card.jpg",
    fullImage: "/artists/artist-04/full.jpg",
    profileImage: "/artists/artist-04/face.jpg",
    services: ["VOICE"] as const,
  },
];

/* =========================================================
   VIDEOS REAIS
========================================================= */

const videos = [
  {
    slug: "fernando-fabricio-video-01",
    name: "DUBLAGEM 01",
    artistSlug: "artista-04",
    video:
      "https://res.cloudinary.com/qpioqfhr/video/upload/v1793986357/ayo-studio/videos/fernando-fabricio/fernando-fabricio-01.mp4",
    thumbnail: null,
    description:
      "Trecho de trabalho de dublagem e interpretação realizado por Fernando Fabricio.",
  },
  {
    slug: "fernando-fabricio-video-02",
    name: "DUBLAGEM 02",
    artistSlug: "artista-04",
    video:
      "https://res.cloudinary.com/qpioqfhr/video/upload/v1793992690/ayo-studio/videos/fernando-fabricio/fernando-fabricio-02.mp4",
    thumbnail: null,
    description:
      "Trecho de trabalho de dublagem e interpretação realizado por Fernando Fabricio.",
  },
];

/* =========================================================
   SEED
========================================================= */

async function main() {
  /* -------------------------
     PROFISSIONAIS
  ------------------------- */

  for (const professional of professionals) {
    const { services, ...data } = professional;

    await prisma.professional.upsert({
      where: {
        slug: professional.slug,
      },

      update: {
        ...data,

        services: {
          deleteMany: {},

          create: services.map((service) => ({
            service,
          })),
        },
      },

      create: {
        ...data,

        services: {
          create: services.map((service) => ({
            service,
          })),
        },
      },
    });
  }

  console.log("Seed dos profissionais concluído.");

  /* -------------------------
     VIDEOS REAIS
  ------------------------- */

  for (const video of videos) {
    const videoData = {
      name: video.name,
      video: video.video,
      thumbnail: video.thumbnail,
      description: video.description,
      isActive: true,
    };

    await prisma.video.upsert({
      where: {
        slug: video.slug,
      },

      update: {
        ...videoData,

        artist: {
          connect: {
            slug: video.artistSlug,
          },
        },
      },

      create: {
        slug: video.slug,
        ...videoData,

        artist: {
          connect: {
            slug: video.artistSlug,
          },
        },
      },
    });
  }

  console.log("Seed dos vídeos concluído.");

  console.log(
    "Flashes, artworks e produtos não são mais criados pelo seed. Use o painel administrativo para conteúdo real.",
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
