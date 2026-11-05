import type { FastifyInstance } from "fastify";
import { z } from "zod";

import { prisma } from "../lib/prisma.js";

const flashParamsSchema = z.object({
  slug: z.string().min(1),
});

const flashQuerySchema = z.object({
  artistId: z.coerce.number().int().positive().optional(),
});

type FlashWithArtist = Awaited<
  ReturnType<typeof findFlashBySlug>
>;

function formatFlash(
  flash: NonNullable<FlashWithArtist>,
) {
  return {
    id: flash.id,
    slug: flash.slug,
    name: flash.name,

    artistId: flash.artistId,
    artistName: flash.artist.name,
    artistSlug: flash.artist.slug,

    image: flash.image ?? "",

    price: Number(flash.price),

    description: flash.description ?? "",

    categories: flash.categories,

    available: flash.available,
    isActive: flash.isActive,

    createdAt: flash.createdAt,
    updatedAt: flash.updatedAt,
  };
}

function findFlashBySlug(slug: string) {
  return prisma.flash.findUnique({
    where: {
      slug,
    },

    include: {
      artist: true,
    },
  });
}

export async function flashesRoutes(
  app: FastifyInstance,
) {
  app.get("/flashes", async (request, reply) => {
    const parsed =
      flashQuerySchema.safeParse(request.query);

    if (!parsed.success) {
      return reply.status(400).send({
        message: "Parâmetros inválidos.",
      });
    }

    const flashes = await prisma.flash.findMany({
      where: {
        isActive: true,

        artist: {
          isActive: true,
        },

        ...(parsed.data.artistId
          ? {
              artistId: parsed.data.artistId,
            }
          : {}),
      },

      include: {
        artist: true,
      },

      orderBy: {
        id: "asc",
      },
    });

    return flashes.map(formatFlash);
  });

  app.get(
    "/flashes/:slug",
    async (request, reply) => {
      const parsed =
        flashParamsSchema.safeParse(
          request.params,
        );

      if (!parsed.success) {
        return reply.status(400).send({
          message: "Slug inválido.",
        });
      }

      const flash =
        await findFlashBySlug(
          parsed.data.slug,
        );

      if (
        !flash ||
        !flash.isActive ||
        !flash.artist.isActive
      ) {
        return reply.status(404).send({
          message: "Flash não encontrado.",
        });
      }

      return formatFlash(flash);
    },
  );
}