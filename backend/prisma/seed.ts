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
    role: "ARTISTA",
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
    role: "ARTISTA",
    specialties: "",
    description: "",
    image: "/artists/artist-03/card.jpg",
    fullImage: "/artists/artist-03/full.jpg",
    profileImage: "/artists/artist-03/face.jpg",
    services: ["ART"] as const,
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
   COMPATIBILIDADE COM OS IDS DO MOCK ANTIGO

   Não usamos diretamente o ID numérico do banco.
   Ligamos cada antigo artistId ao slug do profissional.
========================================================= */

const artistSlugByLegacyId: Record<number, string> = {
  1: "artista-01",
  2: "artista-02",
  3: "artista-03",
  4: "artista-04",
};

/* =========================================================
   FLASHES
========================================================= */

const flashes = [
  {
    slug: "flash-01",
    name: "FLASH 01",
    artistId: 1,
    image: "/flashes/flash-01.png",
    price: "350.00",
    description:
      "Flash autoral criado pelo artista. O desenho pode receber pequenos ajustes de tamanho e aplicação conforme avaliação do profissional.",
    categories: ["Geek", "Preto e Branco"],
    available: false,
  },
  {
    slug: "flash-02",
    name: "FLASH 02",
    artistId: 2,
    image: "/flashes/flash-02.png",
    price: "350.00",
    description: "Flash autoral disponível para reserva.",
    categories: ["Autoral"],
    available: true,
  },
  {
    slug: "flash-03",
    name: "FLASH 03",
    artistId: 3,
    image: "/flashes/flash-03.png",
    price: "350.00",
    description: "Flash autoral disponível para reserva.",
    categories: ["Autoral"],
    available: true,
  },
  {
    slug: "flash-04",
    name: "FLASH 04",
    artistId: 4,
    image: "/flashes/flash-04.png",
    price: "350.00",
    description: "Flash autoral disponível para reserva.",
    categories: ["Autoral"],
    available: true,
  },
  {
    slug: "flash-05",
    name: "FLASH 05",
    artistId: 1,
    image: "/flashes/flash-05.jpg",
    price: "350.00",
    description: "Flash autoral disponível para reserva.",
    categories: ["Autoral"],
    available: true,
  },
  {
    slug: "flash-06",
    name: "FLASH 06",
    artistId: 2,
    image: "/flashes/flash-06.jpg",
    price: "350.00",
    description: "Flash autoral disponível para reserva.",
    categories: ["Autoral"],
    available: true,
  },
  {
    slug: "flash-07",
    name: "FLASH 07",
    artistId: 3,
    image: "/flashes/flash-07.jpg",
    price: "350.00",
    description: "Flash autoral disponível para reserva.",
    categories: ["Autoral"],
    available: true,
  },
  {
    slug: "flash-08",
    name: "FLASH 08",
    artistId: 4,
    image: "/flashes/flash-08.jpg",
    price: "350.00",
    description: "Flash autoral disponível para reserva.",
    categories: ["Autoral"],
    available: true,
  },
  {
    slug: "flash-09",
    name: "FLASH 09",
    artistId: 1,
    image: "/flashes/flash-09.jpg",
    price: "350.00",
    description: "Flash autoral disponível para reserva.",
    categories: ["Autoral"],
    available: true,
  },
  {
    slug: "flash-10",
    name: "FLASH 10",
    artistId: 2,
    image: "/flashes/flash-10.png",
    price: "350.00",
    description: "Flash autoral disponível para reserva.",
    categories: ["Autoral"],
    available: true,
  },
  {
    slug: "flash-11",
    name: "FLASH 11",
    artistId: 3,
    image: "/flashes/flash-11.webp",
    price: "350.00",
    description: "Flash autoral disponível para reserva.",
    categories: ["Autoral"],
    available: true,
  },
  {
    slug: "flash-12",
    name: "FLASH 12",
    artistId: 4,
    image: "/flashes/flash-12.jpg",
    price: "350.00",
    description: "Flash autoral disponível para reserva.",
    categories: ["Autoral"],
    available: true,
  },
  {
    slug: "flash-13",
    name: "FLASH 13",
    artistId: 1,
    image: "/flashes/flash-13.jpeg",
    price: "350.00",
    description: "Flash autoral disponível para reserva.",
    categories: ["Autoral"],
    available: true,
  },
];

/* =========================================================
   ARTWORKS
========================================================= */

const artworks = [
  {
    slug: "noite-vermelha-01",
    name: "NOITE VERMELHA",
    artistId: 1,
    image: "/artworks/artwork-01.jpg",
    type: "QUADRO",
    price: 450,
    available: true,
  },
  {
    slug: "obra-02",
    name: "OBRA 02",
    artistId: 2,
    image: "/artworks/artwork-02.jpg",
    type: "ILUSTRAÇÃO",
    price: 320,
    available: true,
  },
  {
    slug: "obra-03",
    name: "OBRA 03",
    artistId: 3,
    image: "/artworks/artwork-03.jpg",
    type: "DESENHO",
    price: 280,
    available: true,
  },
  {
    slug: "obra-04",
    name: "OBRA 04",
    artistId: 1,
    image: "/artworks/artwork-04.jpg",
    type: "QUADRO",
    price: 520,
    available: true,
  },
  {
    slug: "obra-05",
    name: "OBRA 05",
    artistId: 4,
    image: "/artworks/artwork-05.jpg",
    type: "ILUSTRAÇÃO",
    price: null,
    available: true,
  },
  {
    slug: "obra-06",
    name: "OBRA 06",
    artistId: 2,
    image: "/artworks/artwork-06.jpg",
    type: "QUADRO",
    price: 390,
    available: true,
  },
  {
    slug: "obra-07",
    name: "OBRA 07",
    artistId: 3,
    image: "/artworks/artwork-07.jpg",
    type: "DESENHO",
    price: 250,
    available: true,
  },
  {
    slug: "obra-08",
    name: "OBRA 08",
    artistId: 1,
    image: "/artworks/artwork-08.jpg",
    type: "ILUSTRAÇÃO",
    price: 310,
    available: true,
  },
  {
    slug: "obra-09",
    name: "OBRA 09",
    artistId: 4,
    image: "/artworks/artwork-09.jpg",
    type: "QUADRO",
    price: 600,
    available: true,
  },
  {
    slug: "obra-10",
    name: "OBRA 10",
    artistId: 2,
    image: "/artworks/artwork-10.jpg",
    type: "DESENHO",
    price: null,
    available: false,
  },
];

/* =========================================================
   PRODUCTS
========================================================= */

const products = [
  {
    slug: "product-01",
    name: "ECOBAG AYŌ",
    type: "ACESSÓRIO",
    image: "/products/product-01.jpg",
    price: 79.9,
    available: true,
    authorSlug: null,
  },
  {
    slug: "product-02",
    name: "CHAVEIRO AYŌ",
    type: "ACESSÓRIO",
    image: "/products/product-02.jpg",
    price: 35,
    available: true,
    authorSlug: null,
  },
  {
    slug: "product-03",
    name: "CAMISETA AYŌ",
    type: "VESTUÁRIO",
    image: "/products/product-03.jpg",
    price: 89.9,
    available: true,
    authorSlug: null,
  },
  {
    slug: "product-04",
    name: "QUADRO AYŌ",
    type: "DECORAÇÃO",
    image: "/products/product-04.jpg",
    price: 120,
    available: true,
    authorSlug: null,
  },
  {
    slug: "product-05",
    name: "CANECA AYŌ",
    type: "UTILITÁRIO",
    image: "/products/product-05.jpg",
    price: 49.9,
    available: true,
    authorSlug: null,
  },
  {
    slug: "product-06",
    name: "PRODUTO 06",
    type: "PRINT",
    image: "/products/product-06.jpg",
    price: 120,
    available: false,
    authorSlug: null,
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
     FLASHES
  ------------------------- */

  for (const flash of flashes) {
    const artistSlug = artistSlugByLegacyId[flash.artistId];

    if (!artistSlug) {
      throw new Error(`Profissional correspondente ao artistId ${flash.artistId} não encontrado.`);
    }

    const flashData = {
      slug: flash.slug,
      name: flash.name,
      image: flash.image,
      price: flash.price,
      description: flash.description,
      categories: flash.categories,
      available: flash.available,
    };

    await prisma.flash.upsert({
      where: {
        slug: flash.slug,
      },

      update: {
        ...flashData,

        isActive: true,

        artist: {
          connect: {
            slug: artistSlug,
          },
        },
      },

      create: {
        ...flashData,

        isActive: true,

        artist: {
          connect: {
            slug: artistSlug,
          },
        },
      },
    });
  }

  console.log("Seed dos flashes concluído.");

  /* -------------------------
     ARTWORKS
  ------------------------- */

  for (const artwork of artworks) {
    const artistSlug = artistSlugByLegacyId[artwork.artistId];

    if (!artistSlug) {
      throw new Error(
        `Profissional correspondente ao artistId ${artwork.artistId} não encontrado.`,
      );
    }

    const artworkData = {
      slug: artwork.slug,
      name: artwork.name,
      image: artwork.image,
      type: artwork.type,
      price: artwork.price,
      available: artwork.available,
    };

    await prisma.artwork.upsert({
      where: {
        slug: artwork.slug,
      },

      update: {
        ...artworkData,

        isActive: true,

        artist: {
          connect: {
            slug: artistSlug,
          },
        },
      },

      create: {
        ...artworkData,

        isActive: true,

        artist: {
          connect: {
            slug: artistSlug,
          },
        },
      },
    });
  }

  console.log("Seed dos artworks concluído.");

  /* -------------------------
     PRODUCTS
  ------------------------- */

  for (const product of products) {
    const productData = {
      name: product.name,
      type: product.type,
      image: product.image,
      price: product.price,
      available: product.available,
      isActive: true,
    };

    await prisma.product.upsert({
      where: {
        slug: product.slug,
      },

      update: {
        ...productData,

        author: product.authorSlug
          ? {
              connect: {
                slug: product.authorSlug,
              },
            }
          : {
              disconnect: true,
            },
      },

      create: {
        slug: product.slug,
        ...productData,

        ...(product.authorSlug
          ? {
              author: {
                connect: {
                  slug: product.authorSlug,
                },
              },
            }
          : {}),
      },
    });
  }

  console.log("Seed dos produtos concluído.");

  console.log("Seed dos produtos concluído.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
