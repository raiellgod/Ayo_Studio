import type { FastifyInstance } from "fastify";

import { prisma } from "../lib/prisma.js";

export async function videoRoutes(app: FastifyInstance) {
  app.get("/videos", async (request) => {
    const query = request.query as {
      artistId?: string;
    };

    const artistId = query.artistId
      ? Number(query.artistId)
      : undefined;

    const videos = await prisma.video.findMany({
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

    return videos.map((video) => ({
      id: video.id,
      slug: video.slug,
      name: video.name,

      artistId: video.artistId,
      artistName: video.artist.name,
      artistSlug: video.artist.slug,

      video: video.video,
      thumbnail: video.thumbnail,
      description: video.description,

      isActive: video.isActive,
      createdAt: video.createdAt,
      updatedAt: video.updatedAt,
    }));
  });

  app.get("/videos/:slug", async (request, reply) => {
    const params = request.params as {
      slug: string;
    };

    const video = await prisma.video.findFirst({
      where: {
        slug: params.slug,
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

    if (!video) {
      return reply.status(404).send({
        message: "Vídeo não encontrado.",
      });
    }

    return {
      id: video.id,
      slug: video.slug,
      name: video.name,

      artistId: video.artistId,
      artistName: video.artist.name,
      artistSlug: video.artist.slug,

      video: video.video,
      thumbnail: video.thumbnail,
      description: video.description,

      isActive: video.isActive,
      createdAt: video.createdAt,
      updatedAt: video.updatedAt,
    };
  });
}