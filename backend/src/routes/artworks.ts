import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";

import { prisma } from "../lib/prisma.js";
import { requireAdminApiKey } from "../lib/require-admin-api-key.js";

const slugSchema = z
  .string()
  .min(1)
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Use apenas letras minúsculas, números e hífens.",
  );

const publicArtworkQuerySchema = z.object({
  artistId: z.coerce
    .number()
    .int()
    .positive()
    .optional(),
});

const publicArtworkParamsSchema = z.object({
  slug: z.string().min(1),
});

const adminArtworkParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

const artworkDataSchema = z.object({
  slug: slugSchema,
  name: z.string().min(1),

  artistId: z.coerce
    .number()
    .int()
    .positive(),

  image: z.string().min(1),
  type: z.string().min(1),

  price: z
    .union([
      z.coerce.number().nonnegative(),
      z.null(),
    ])
    .optional(),

  available: z.boolean(),
});

const artworkStatusSchema = z.object({
  isActive: z.boolean(),
});

const artworkAvailabilitySchema = z.object({
  available: z.boolean(),
});

function formatArtwork(artwork: {
  id: number;
  slug: string;
  name: string;
  artistId: number;
  image: string | null;
  type: string;
  price: unknown;
  available: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  artist: {
    id: number;
    slug: string;
    name: string;
  };
}) {
  return {
    id: artwork.id,
    slug: artwork.slug,
    name: artwork.name,

    artistId: artwork.artistId,
    artistName: artwork.artist.name,
    artistSlug: artwork.artist.slug,

    image: artwork.image ?? "",
    type: artwork.type,

    price:
      artwork.price === null
        ? null
        : Number(artwork.price),

    available: artwork.available,

    isActive: artwork.isActive,
    createdAt: artwork.createdAt,
    updatedAt: artwork.updatedAt,
  };
}

async function findArtworkById(id: number) {
  return prisma.artwork.findUnique({
    where: {
      id,
    },

    include: {
      artist: {
        select: {
          id: true,
          slug: true,
          name: true,
        },
      },
    },
  });
}

export const artworkRoutes: FastifyPluginAsync =
  async (app) => {
    /*
     * =========================================================
     * PUBLIC
     * =========================================================
     */

    app.get(
      "/artworks",
      async (request, reply) => {
        const parsed =
          publicArtworkQuerySchema.safeParse(
            request.query,
          );

        if (!parsed.success) {
          return reply.status(400).send({
            message:
              "Parâmetros inválidos.",
          });
        }

        const artworks =
          await prisma.artwork.findMany({
            where: {
              isActive: true,

              ...(parsed.data.artistId
                ? {
                    artistId:
                      parsed.data.artistId,
                  }
                : {}),
            },

            include: {
              artist: {
                select: {
                  id: true,
                  slug: true,
                  name: true,
                },
              },
            },

            orderBy: {
              id: "asc",
            },
          });

        return artworks.map(
          formatArtwork,
        );
      },
    );

    app.get(
      "/artworks/:slug",
      async (request, reply) => {
        const parsed =
          publicArtworkParamsSchema.safeParse(
            request.params,
          );

        if (!parsed.success) {
          return reply.status(400).send({
            message: "Slug inválido.",
          });
        }

        const artwork =
          await prisma.artwork.findFirst({
            where: {
              slug: parsed.data.slug,
              isActive: true,
            },

            include: {
              artist: {
                select: {
                  id: true,
                  slug: true,
                  name: true,
                },
              },
            },
          });

        if (!artwork) {
          return reply.status(404).send({
            message:
              "Artwork não encontrado.",
          });
        }

        return formatArtwork(artwork);
      },
    );

    /*
     * =========================================================
     * ADMIN — LIST
     * =========================================================
     */

    app.get(
      "/admin/artworks",
      {
        preHandler: requireAdminApiKey,
      },
      async () => {
        const artworks =
          await prisma.artwork.findMany({
            include: {
              artist: {
                select: {
                  id: true,
                  slug: true,
                  name: true,
                },
              },
            },

            orderBy: {
              id: "asc",
            },
          });

        return artworks.map(
          formatArtwork,
        );
      },
    );

    /*
     * =========================================================
     * ADMIN — DETAIL
     * =========================================================
     */

    app.get(
      "/admin/artworks/:id",
      {
        preHandler: requireAdminApiKey,
      },
      async (request, reply) => {
        const parsed =
          adminArtworkParamsSchema.safeParse(
            request.params,
          );

        if (!parsed.success) {
          return reply.status(400).send({
            message:
              "ID de artwork inválido.",
          });
        }

        const artwork =
          await findArtworkById(
            parsed.data.id,
          );

        if (!artwork) {
          return reply.status(404).send({
            message:
              "Artwork não encontrado.",
          });
        }

        return formatArtwork(artwork);
      },
    );

    /*
     * =========================================================
     * ADMIN — CREATE
     * =========================================================
     */

    app.post(
      "/admin/artworks",
      {
        preHandler: requireAdminApiKey,
      },
      async (request, reply) => {
        const parsed =
          artworkDataSchema.safeParse(
            request.body,
          );

        if (!parsed.success) {
          return reply.status(400).send({
            message: "Dados inválidos.",
            errors:
              parsed.error.flatten(),
          });
        }

        const {
          artistId,
          image,
          price,
          ...requiredData
        } = parsed.data;

        const [existing, artist] =
          await Promise.all([
            prisma.artwork.findUnique({
              where: {
                slug: requiredData.slug,
              },
              select: {
                id: true,
              },
            }),

            prisma.professional.findUnique({
              where: {
                id: artistId,
              },
              select: {
                id: true,
              },
            }),
          ]);

        if (existing) {
          return reply.status(409).send({
            message:
              "Já existe uma arte com este slug.",
          });
        }

        if (!artist) {
          return reply.status(400).send({
            message:
              "Profissional informado não foi encontrado.",
          });
        }

        const artwork =
          await prisma.artwork.create({
            data: {
              ...requiredData,

              image: image.trim(),

              price:
                price === undefined
                  ? null
                  : price,

              artist: {
                connect: {
                  id: artistId,
                },
              },
            },

            include: {
              artist: {
                select: {
                  id: true,
                  slug: true,
                  name: true,
                },
              },
            },
          });

        return reply
          .status(201)
          .send(
            formatArtwork(artwork),
          );
      },
    );

    /*
     * =========================================================
     * ADMIN — UPDATE
     * =========================================================
     */

    app.patch(
      "/admin/artworks/:id",
      {
        preHandler: requireAdminApiKey,
      },
      async (request, reply) => {
        const paramsParsed =
          adminArtworkParamsSchema.safeParse(
            request.params,
          );

        if (!paramsParsed.success) {
          return reply.status(400).send({
            message:
              "ID de artwork inválido.",
          });
        }

        const bodyParsed =
          artworkDataSchema.safeParse(
            request.body,
          );

        if (!bodyParsed.success) {
          return reply.status(400).send({
            message: "Dados inválidos.",
            errors:
              bodyParsed.error.flatten(),
          });
        }

        const id =
          paramsParsed.data.id;

        const {
          artistId,
          image,
          price,
          ...requiredData
        } = bodyParsed.data;

        const [
          existing,
          slugOwner,
          artist,
        ] = await Promise.all([
          prisma.artwork.findUnique({
            where: {
              id,
            },
            select: {
              id: true,
            },
          }),

          prisma.artwork.findUnique({
            where: {
              slug: requiredData.slug,
            },
            select: {
              id: true,
            },
          }),

          prisma.professional.findUnique({
            where: {
              id: artistId,
            },
            select: {
              id: true,
            },
          }),
        ]);

        if (!existing) {
          return reply.status(404).send({
            message:
              "Artwork não encontrado.",
          });
        }

        if (
          slugOwner &&
          slugOwner.id !== id
        ) {
          return reply.status(409).send({
            message:
              "Já existe outra arte com este slug.",
          });
        }

        if (!artist) {
          return reply.status(400).send({
            message:
              "Profissional informado não foi encontrado.",
          });
        }

        const artwork =
          await prisma.artwork.update({
            where: {
              id,
            },

            data: {
              ...requiredData,

              image: image.trim(),

              price:
                price === undefined
                  ? null
                  : price,

              artist: {
                connect: {
                  id: artistId,
                },
              },
            },

            include: {
              artist: {
                select: {
                  id: true,
                  slug: true,
                  name: true,
                },
              },
            },
          });

        return formatArtwork(artwork);
      },
    );

    /*
     * =========================================================
     * ADMIN — ACTIVE STATUS
     * =========================================================
     */

    app.patch(
      "/admin/artworks/:id/status",
      {
        preHandler: requireAdminApiKey,
      },
      async (request, reply) => {
        const paramsParsed =
          adminArtworkParamsSchema.safeParse(
            request.params,
          );

        if (!paramsParsed.success) {
          return reply.status(400).send({
            message:
              "ID de artwork inválido.",
          });
        }

        const bodyParsed =
          artworkStatusSchema.safeParse(
            request.body,
          );

        if (!bodyParsed.success) {
          return reply.status(400).send({
            message:
              "Status inválido.",
          });
        }

        const existing =
          await prisma.artwork.findUnique({
            where: {
              id: paramsParsed.data.id,
            },
            select: {
              id: true,
            },
          });

        if (!existing) {
          return reply.status(404).send({
            message:
              "Artwork não encontrado.",
          });
        }

        const artwork =
          await prisma.artwork.update({
            where: {
              id: paramsParsed.data.id,
            },

            data: {
              isActive:
                bodyParsed.data.isActive,
            },

            include: {
              artist: {
                select: {
                  id: true,
                  slug: true,
                  name: true,
                },
              },
            },
          });

        return formatArtwork(artwork);
      },
    );

    /*
     * =========================================================
     * ADMIN — AVAILABILITY
     * =========================================================
     */

    app.patch(
      "/admin/artworks/:id/availability",
      {
        preHandler: requireAdminApiKey,
      },
      async (request, reply) => {
        const paramsParsed =
          adminArtworkParamsSchema.safeParse(
            request.params,
          );

        if (!paramsParsed.success) {
          return reply.status(400).send({
            message:
              "ID de artwork inválido.",
          });
        }

        const bodyParsed =
          artworkAvailabilitySchema.safeParse(
            request.body,
          );

        if (!bodyParsed.success) {
          return reply.status(400).send({
            message:
              "Disponibilidade inválida.",
          });
        }

        const existing =
          await prisma.artwork.findUnique({
            where: {
              id: paramsParsed.data.id,
            },
            select: {
              id: true,
            },
          });

        if (!existing) {
          return reply.status(404).send({
            message:
              "Artwork não encontrado.",
          });
        }

        const artwork =
          await prisma.artwork.update({
            where: {
              id: paramsParsed.data.id,
            },

            data: {
              available:
                bodyParsed.data.available,
            },

            include: {
              artist: {
                select: {
                  id: true,
                  slug: true,
                  name: true,
                },
              },
            },
          });

        return formatArtwork(artwork);
      },
    );
  };
