import type { FastifyPluginAsync } from "fastify";

import { prisma } from "../lib/prisma.js";

export const productRoutes: FastifyPluginAsync = async (app) => {
  app.get<{
    Querystring: {
      authorId?: string;
      type?: string;
    };
  }>("/products", async (request) => {
    const authorId = request.query.authorId
      ? Number(request.query.authorId)
      : undefined;

    const products = await prisma.product.findMany({
      where: {
        isActive: true,

        ...(authorId
          ? {
              authorId,
            }
          : {}),

        ...(request.query.type
          ? {
              type: request.query.type,
            }
          : {}),
      },

      include: {
        author: {
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

    return products.map((product) => ({
      id: product.id,
      slug: product.slug,
      name: product.name,
      type: product.type,
      image: product.image,
      price: product.price,
      available: product.available,

      authorId: product.authorId,
      authorName: product.author?.name ?? null,
      authorSlug: product.author?.slug ?? null,

      isActive: product.isActive,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));
  });

  app.get<{
    Params: {
      slug: string;
    };
  }>("/products/:slug", async (request, reply) => {
    const product = await prisma.product.findFirst({
      where: {
        slug: request.params.slug,
        isActive: true,
      },

      include: {
        author: {
          select: {
            id: true,
            slug: true,
            name: true,
          },
        },
      },
    });

    if (!product) {
      return reply.status(404).send({
        message: "Produto não encontrado.",
      });
    }

    return {
      id: product.id,
      slug: product.slug,
      name: product.name,
      type: product.type,
      image: product.image,
      price: product.price,
      available: product.available,

      authorId: product.authorId,
      authorName: product.author?.name ?? null,
      authorSlug: product.author?.slug ?? null,

      isActive: product.isActive,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  });
};