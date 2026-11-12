import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAdminApiKey } from "../lib/require-admin-api-key.js";
const slugSchema = z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use apenas letras minúsculas, números e hífens.");
const publicFlashParamsSchema = z.object({
    slug: z.string().min(1),
});
const publicFlashQuerySchema = z.object({
    artistId: z.coerce
        .number()
        .int()
        .positive()
        .optional(),
});
const adminFlashParamsSchema = z.object({
    id: z.coerce.number().int().positive(),
});
const flashDataSchema = z.object({
    slug: slugSchema,
    name: z.string().min(1),
    artistId: z.coerce
        .number()
        .int()
        .positive(),
    image: z.string().optional(),
    price: z.coerce.number().nonnegative(),
    description: z.string().optional(),
    categories: z.array(z.string().min(1)),
    available: z.boolean(),
});
const flashStatusSchema = z.object({
    isActive: z.boolean(),
});
const flashAvailabilitySchema = z.object({
    available: z.boolean(),
});
function normalizeOptionalString(value) {
    if (value === undefined) {
        return null;
    }
    const normalized = value.trim();
    return normalized.length > 0
        ? normalized
        : null;
}
function normalizeCategories(categories) {
    return Array.from(new Set(categories
        .map((category) => category.trim())
        .filter(Boolean)));
}
function formatFlash(flash) {
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
function findFlashBySlug(slug) {
    return prisma.flash.findUnique({
        where: {
            slug,
        },
        include: {
            artist: true,
        },
    });
}
function findFlashById(id) {
    return prisma.flash.findUnique({
        where: {
            id,
        },
        include: {
            artist: true,
        },
    });
}
export async function flashesRoutes(app) {
    /*
     * =========================================================
     * PUBLIC
     * =========================================================
     */
    app.get("/flashes", async (request, reply) => {
        const parsed = publicFlashQuerySchema.safeParse(request.query);
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
    app.get("/flashes/:slug", async (request, reply) => {
        const parsed = publicFlashParamsSchema.safeParse(request.params);
        if (!parsed.success) {
            return reply.status(400).send({
                message: "Slug inválido.",
            });
        }
        const flash = await findFlashBySlug(parsed.data.slug);
        if (!flash ||
            !flash.isActive ||
            !flash.artist.isActive) {
            return reply.status(404).send({
                message: "Flash não encontrado.",
            });
        }
        return formatFlash(flash);
    });
    /*
     * =========================================================
     * ADMIN — LIST
     * =========================================================
     */
    app.get("/admin/flashes", {
        preHandler: requireAdminApiKey,
    }, async () => {
        const flashes = await prisma.flash.findMany({
            include: {
                artist: true,
            },
            orderBy: {
                id: "asc",
            },
        });
        return flashes.map(formatFlash);
    });
    /*
     * =========================================================
     * ADMIN — DETAIL
     * =========================================================
     */
    app.get("/admin/flashes/:id", {
        preHandler: requireAdminApiKey,
    }, async (request, reply) => {
        const parsed = adminFlashParamsSchema.safeParse(request.params);
        if (!parsed.success) {
            return reply.status(400).send({
                message: "ID de flash inválido.",
            });
        }
        const flash = await findFlashById(parsed.data.id);
        if (!flash) {
            return reply.status(404).send({
                message: "Flash não encontrado.",
            });
        }
        return formatFlash(flash);
    });
    /*
     * =========================================================
     * ADMIN — CREATE
     * =========================================================
     */
    app.post("/admin/flashes", {
        preHandler: requireAdminApiKey,
    }, async (request, reply) => {
        const parsed = flashDataSchema.safeParse(request.body);
        if (!parsed.success) {
            return reply.status(400).send({
                message: "Dados inválidos.",
                errors: parsed.error.flatten(),
            });
        }
        const { artistId, image, description, categories, ...requiredData } = parsed.data;
        const [existing, artist] = await Promise.all([
            prisma.flash.findUnique({
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
                message: "Já existe um flash com este slug.",
            });
        }
        if (!artist) {
            return reply.status(400).send({
                message: "Profissional informado não foi encontrado.",
            });
        }
        const flash = await prisma.flash.create({
            data: {
                ...requiredData,
                image: normalizeOptionalString(image),
                description: normalizeOptionalString(description),
                categories: normalizeCategories(categories),
                artist: {
                    connect: {
                        id: artistId,
                    },
                },
            },
            include: {
                artist: true,
            },
        });
        return reply
            .status(201)
            .send(formatFlash(flash));
    });
    /*
     * =========================================================
     * ADMIN — UPDATE
     * =========================================================
     */
    app.patch("/admin/flashes/:id", {
        preHandler: requireAdminApiKey,
    }, async (request, reply) => {
        const paramsParsed = adminFlashParamsSchema.safeParse(request.params);
        if (!paramsParsed.success) {
            return reply.status(400).send({
                message: "ID de flash inválido.",
            });
        }
        const bodyParsed = flashDataSchema.safeParse(request.body);
        if (!bodyParsed.success) {
            return reply.status(400).send({
                message: "Dados inválidos.",
                errors: bodyParsed.error.flatten(),
            });
        }
        const id = paramsParsed.data.id;
        const { artistId, image, description, categories, ...requiredData } = bodyParsed.data;
        const [existing, slugOwner, artist,] = await Promise.all([
            prisma.flash.findUnique({
                where: {
                    id,
                },
                select: {
                    id: true,
                },
            }),
            prisma.flash.findUnique({
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
                message: "Flash não encontrado.",
            });
        }
        if (slugOwner &&
            slugOwner.id !== id) {
            return reply.status(409).send({
                message: "Já existe outro flash com este slug.",
            });
        }
        if (!artist) {
            return reply.status(400).send({
                message: "Profissional informado não foi encontrado.",
            });
        }
        const flash = await prisma.flash.update({
            where: {
                id,
            },
            data: {
                ...requiredData,
                image: normalizeOptionalString(image),
                description: normalizeOptionalString(description),
                categories: normalizeCategories(categories),
                artist: {
                    connect: {
                        id: artistId,
                    },
                },
            },
            include: {
                artist: true,
            },
        });
        return formatFlash(flash);
    });
    /*
     * =========================================================
     * ADMIN — ACTIVE STATUS
     * =========================================================
     */
    app.patch("/admin/flashes/:id/status", {
        preHandler: requireAdminApiKey,
    }, async (request, reply) => {
        const paramsParsed = adminFlashParamsSchema.safeParse(request.params);
        if (!paramsParsed.success) {
            return reply.status(400).send({
                message: "ID de flash inválido.",
            });
        }
        const bodyParsed = flashStatusSchema.safeParse(request.body);
        if (!bodyParsed.success) {
            return reply.status(400).send({
                message: "Status inválido.",
            });
        }
        const existing = await prisma.flash.findUnique({
            where: {
                id: paramsParsed.data.id,
            },
            select: {
                id: true,
            },
        });
        if (!existing) {
            return reply.status(404).send({
                message: "Flash não encontrado.",
            });
        }
        const flash = await prisma.flash.update({
            where: {
                id: paramsParsed.data.id,
            },
            data: {
                isActive: bodyParsed.data.isActive,
            },
            include: {
                artist: true,
            },
        });
        return formatFlash(flash);
    });
    /*
     * =========================================================
     * ADMIN — AVAILABILITY
     * =========================================================
     */
    app.patch("/admin/flashes/:id/availability", {
        preHandler: requireAdminApiKey,
    }, async (request, reply) => {
        const paramsParsed = adminFlashParamsSchema.safeParse(request.params);
        if (!paramsParsed.success) {
            return reply.status(400).send({
                message: "ID de flash inválido.",
            });
        }
        const bodyParsed = flashAvailabilitySchema.safeParse(request.body);
        if (!bodyParsed.success) {
            return reply.status(400).send({
                message: "Disponibilidade inválida.",
            });
        }
        const existing = await prisma.flash.findUnique({
            where: {
                id: paramsParsed.data.id,
            },
            select: {
                id: true,
            },
        });
        if (!existing) {
            return reply.status(404).send({
                message: "Flash não encontrado.",
            });
        }
        const flash = await prisma.flash.update({
            where: {
                id: paramsParsed.data.id,
            },
            data: {
                available: bodyParsed.data.available,
            },
            include: {
                artist: true,
            },
        });
        return formatFlash(flash);
    });
}
