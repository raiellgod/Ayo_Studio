import type { FastifyPluginAsync } from "fastify";

import { prisma } from "../lib/prisma.js";

export const artworkRoutes: FastifyPluginAsync = async (app) => {
  /*
   * GET /artworks
   *
   * Lista artworks ativos.
   *
   * Query opcional:
   * ?artistId=1
   */
  app.get<{
    Querystring: {
      artistId?: string;
    };
  }>("/artworks", async (request) => {
    const artistId = request.query.artistId
      ? Number(request.query.artistId)
      : undefined;

    const artworks = await prisma.artwork.findMany({
      where: {
        isActive: true,

        ...(artistId
          ? {
              artistId,
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

    return artworks.map((artwork) => ({
      id: artwork.id,
      slug: artwork.slug,
      name: artwork.name,

      artistId: artwork.artistId,
      artistName: artwork.artist.name,
      artistSlug: artwork.artist.slug,

      image: artwork.image,
      type: artwork.type,
      price: artwork.price,
      available: artwork.available,

      isActive: artwork.isActive,
      createdAt: artwork.createdAt,
      updatedAt: artwork.updatedAt,
    }));
  });

  /*
   * GET /artworks/:slug
   */
  app.get<{
    Params: {
      slug: string;
    };
  }>("/artworks/:slug", async (request, reply) => {
    const artwork = await prisma.artwork.findFirst({
      where: {
        slug: request.params.slug,
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
        message: "Artwork não encontrado.",
      });
    }

    return {
      id: artwork.id,
      slug: artwork.slug,
      name: artwork.name,

      artistId: artwork.artistId,
      artistName: artwork.artist.name,
      artistSlug: artwork.artist.slug,

      image: artwork.image,
      type: artwork.type,
      price: artwork.price,
      available: artwork.available,

      isActive: artwork.isActive,
      createdAt: artwork.createdAt,
      updatedAt: artwork.updatedAt,
    };
  });
};