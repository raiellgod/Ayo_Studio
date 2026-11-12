import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAdminApiKey } from "../lib/require-admin-api-key.js";
const slugSchema = z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use apenas letras minúsculas, números e hífens.");
const publicProductQuerySchema = z.object({
    authorId: z.coerce
        .number()
        .int()
        .positive()
        .optional(),
    type: z.string().min(1).optional(),
});
const publicProductParamsSchema = z.object({
    slug: z.string().min(1),
});
const adminProductParamsSchema = z.object({
    id: z.coerce.number().int().positive(),
});
const productDataSchema = z.object({
    slug: slugSchema,
    name: z.string().min(1),
    type: z.string().min(1),
    image: z.string().min(1),
    price: z.coerce
        .number()
        .nonnegative(),
    available: z.boolean(),
    authorId: z
        .union([
        z.coerce.number().int().positive(),
        z.null(),
    ])
        .optional(),
});
const productStatusSchema = z.object({
    isActive: z.boolean(),
});
const productAvailabilitySchema = z.object({
    available: z.boolean(),
});
function formatProduct(product) {
    return {
        id: product.id,
        slug: product.slug,
        name: product.name,
        type: product.type,
        image: product.image ?? "",
        price: Number(product.price),
        available: product.available,
        authorId: product.authorId,
        authorName: product.author?.name ?? null,
        authorSlug: product.author?.slug ?? null,
        isActive: product.isActive,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
    };
}
async function findProductById(id) {
    return prisma.product.findUnique({
        where: {
            id,
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
}
export const productRoutes = async (app) => {
    /*
     * =========================================================
     * PUBLIC
     * =========================================================
     */
    app.get("/products", async (request, reply) => {
        const parsed = publicProductQuerySchema.safeParse(request.query);
        if (!parsed.success) {
            return reply.status(400).send({
                message: "Parâmetros inválidos.",
            });
        }
        const products = await prisma.product.findMany({
            where: {
                isActive: true,
                ...(parsed.data.authorId
                    ? {
                        authorId: parsed.data.authorId,
                    }
                    : {}),
                ...(parsed.data.type
                    ? {
                        type: parsed.data.type,
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
        return products.map(formatProduct);
    });
    app.get("/products/:slug", async (request, reply) => {
        const parsed = publicProductParamsSchema.safeParse(request.params);
        if (!parsed.success) {
            return reply.status(400).send({
                message: "Slug inválido.",
            });
        }
        const product = await prisma.product.findFirst({
            where: {
                slug: parsed.data.slug,
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
        return formatProduct(product);
    });
    /*
     * =========================================================
     * ADMIN — LIST
     * =========================================================
     */
    app.get("/admin/products", {
        preHandler: requireAdminApiKey,
    }, async () => {
        const products = await prisma.product.findMany({
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
        return products.map(formatProduct);
    });
    /*
     * =========================================================
     * ADMIN — DETAIL
     * =========================================================
     */
    app.get("/admin/products/:id", {
        preHandler: requireAdminApiKey,
    }, async (request, reply) => {
        const parsed = adminProductParamsSchema.safeParse(request.params);
        if (!parsed.success) {
            return reply.status(400).send({
                message: "ID de produto inválido.",
            });
        }
        const product = await findProductById(parsed.data.id);
        if (!product) {
            return reply.status(404).send({
                message: "Produto não encontrado.",
            });
        }
        return formatProduct(product);
    });
    /*
     * =========================================================
     * ADMIN — CREATE
     * =========================================================
     */
    app.post("/admin/products", {
        preHandler: requireAdminApiKey,
    }, async (request, reply) => {
        const parsed = productDataSchema.safeParse(request.body);
        if (!parsed.success) {
            return reply.status(400).send({
                message: "Dados inválidos.",
                errors: parsed.error.flatten(),
            });
        }
        const { image, authorId, ...requiredData } = parsed.data;
        const existing = await prisma.product.findUnique({
            where: {
                slug: requiredData.slug,
            },
            select: {
                id: true,
            },
        });
        if (existing) {
            return reply.status(409).send({
                message: "Já existe um produto com este slug.",
            });
        }
        if (authorId) {
            const author = await prisma.professional.findUnique({
                where: {
                    id: authorId,
                },
                select: {
                    id: true,
                },
            });
            if (!author) {
                return reply.status(400).send({
                    message: "Profissional informado não foi encontrado.",
                });
            }
        }
        const product = await prisma.product.create({
            data: {
                ...requiredData,
                image: image.trim(),
                ...(authorId
                    ? {
                        author: {
                            connect: {
                                id: authorId,
                            },
                        },
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
        });
        return reply
            .status(201)
            .send(formatProduct(product));
    });
    /*
     * =========================================================
     * ADMIN — UPDATE
     * =========================================================
     */
    app.patch("/admin/products/:id", {
        preHandler: requireAdminApiKey,
    }, async (request, reply) => {
        const paramsParsed = adminProductParamsSchema.safeParse(request.params);
        if (!paramsParsed.success) {
            return reply.status(400).send({
                message: "ID de produto inválido.",
            });
        }
        const bodyParsed = productDataSchema.safeParse(request.body);
        if (!bodyParsed.success) {
            return reply.status(400).send({
                message: "Dados inválidos.",
                errors: bodyParsed.error.flatten(),
            });
        }
        const id = paramsParsed.data.id;
        const { image, authorId, ...requiredData } = bodyParsed.data;
        const [existing, slugOwner,] = await Promise.all([
            prisma.product.findUnique({
                where: {
                    id,
                },
                select: {
                    id: true,
                },
            }),
            prisma.product.findUnique({
                where: {
                    slug: requiredData.slug,
                },
                select: {
                    id: true,
                },
            }),
        ]);
        if (!existing) {
            return reply.status(404).send({
                message: "Produto não encontrado.",
            });
        }
        if (slugOwner &&
            slugOwner.id !== id) {
            return reply.status(409).send({
                message: "Já existe outro produto com este slug.",
            });
        }
        if (authorId) {
            const author = await prisma.professional.findUnique({
                where: {
                    id: authorId,
                },
                select: {
                    id: true,
                },
            });
            if (!author) {
                return reply.status(400).send({
                    message: "Profissional informado não foi encontrado.",
                });
            }
        }
        const product = await prisma.product.update({
            where: {
                id,
            },
            data: {
                ...requiredData,
                image: image.trim(),
                author: authorId
                    ? {
                        connect: {
                            id: authorId,
                        },
                    }
                    : {
                        disconnect: true,
                    },
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
        return formatProduct(product);
    });
    /*
     * =========================================================
     * ADMIN — ACTIVE STATUS
     * =========================================================
     */
    app.patch("/admin/products/:id/status", {
        preHandler: requireAdminApiKey,
    }, async (request, reply) => {
        const paramsParsed = adminProductParamsSchema.safeParse(request.params);
        if (!paramsParsed.success) {
            return reply.status(400).send({
                message: "ID de produto inválido.",
            });
        }
        const bodyParsed = productStatusSchema.safeParse(request.body);
        if (!bodyParsed.success) {
            return reply.status(400).send({
                message: "Status inválido.",
            });
        }
        const existing = await prisma.product.findUnique({
            where: {
                id: paramsParsed.data.id,
            },
            select: {
                id: true,
            },
        });
        if (!existing) {
            return reply.status(404).send({
                message: "Produto não encontrado.",
            });
        }
        const product = await prisma.product.update({
            where: {
                id: paramsParsed.data.id,
            },
            data: {
                isActive: bodyParsed.data.isActive,
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
        return formatProduct(product);
    });
    /*
     * =========================================================
     * ADMIN — AVAILABILITY
     * =========================================================
     */
    app.patch("/admin/products/:id/availability", {
        preHandler: requireAdminApiKey,
    }, async (request, reply) => {
        const paramsParsed = adminProductParamsSchema.safeParse(request.params);
        if (!paramsParsed.success) {
            return reply.status(400).send({
                message: "ID de produto inválido.",
            });
        }
        const bodyParsed = productAvailabilitySchema.safeParse(request.body);
        if (!bodyParsed.success) {
            return reply.status(400).send({
                message: "Disponibilidade inválida.",
            });
        }
        const existing = await prisma.product.findUnique({
            where: {
                id: paramsParsed.data.id,
            },
            select: {
                id: true,
            },
        });
        if (!existing) {
            return reply.status(404).send({
                message: "Produto não encontrado.",
            });
        }
        const product = await prisma.product.update({
            where: {
                id: paramsParsed.data.id,
            },
            data: {
                available: bodyParsed.data.available,
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
        return formatProduct(product);
    });
};
