import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAdminApiKey } from "../lib/require-admin-api-key.js";
const slugSchema = z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use apenas letras minúsculas, números e hífens.");
const publicVideoQuerySchema = z.object({
    artistId: z.coerce
        .number()
        .int()
        .positive()
        .optional(),
});
const publicVideoParamsSchema = z.object({
    slug: z.string().min(1),
});
const adminVideoParamsSchema = z.object({
    id: z.coerce.number().int().positive(),
});
const videoDataSchema = z.object({
    slug: slugSchema,
    name: z.string().min(1),
    artistId: z.coerce
        .number()
        .int()
        .positive(),
    video: z.string().min(1),
    thumbnail: z.string().optional(),
    description: z.string().optional(),
});
const videoStatusSchema = z.object({
    isActive: z.boolean(),
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
function formatVideo(video) {
    return {
        id: video.id,
        slug: video.slug,
        name: video.name,
        artistId: video.artistId,
        artistName: video.artist.name,
        artistSlug: video.artist.slug,
        video: video.video,
        thumbnail: video.thumbnail ?? "",
        description: video.description ?? "",
        isActive: video.isActive,
        createdAt: video.createdAt,
        updatedAt: video.updatedAt,
    };
}
async function findVideoById(id) {
    return prisma.video.findUnique({
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
export async function videoRoutes(app) {
    /*
     * =========================================================
     * PUBLIC
     * =========================================================
     */
    app.get("/videos", async (request, reply) => {
        const parsed = publicVideoQuerySchema.safeParse(request.query);
        if (!parsed.success) {
            return reply.status(400).send({
                message: "Parâmetros inválidos.",
            });
        }
        const videos = await prisma.video.findMany({
            where: {
                isActive: true,
                ...(parsed.data.artistId
                    ? {
                        artistId: parsed.data.artistId,
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
        return videos.map(formatVideo);
    });
    app.get("/videos/:slug", async (request, reply) => {
        const parsed = publicVideoParamsSchema.safeParse(request.params);
        if (!parsed.success) {
            return reply.status(400).send({
                message: "Slug inválido.",
            });
        }
        const video = await prisma.video.findFirst({
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
        if (!video) {
            return reply.status(404).send({
                message: "Vídeo não encontrado.",
            });
        }
        return formatVideo(video);
    });
    /*
     * =========================================================
     * ADMIN — LIST
     * =========================================================
     */
    app.get("/admin/videos", {
        preHandler: requireAdminApiKey,
    }, async () => {
        const videos = await prisma.video.findMany({
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
        return videos.map(formatVideo);
    });
    /*
     * =========================================================
     * ADMIN — DETAIL
     * =========================================================
     */
    app.get("/admin/videos/:id", {
        preHandler: requireAdminApiKey,
    }, async (request, reply) => {
        const parsed = adminVideoParamsSchema.safeParse(request.params);
        if (!parsed.success) {
            return reply.status(400).send({
                message: "ID de vídeo inválido.",
            });
        }
        const video = await findVideoById(parsed.data.id);
        if (!video) {
            return reply.status(404).send({
                message: "Vídeo não encontrado.",
            });
        }
        return formatVideo(video);
    });
    /*
     * =========================================================
     * ADMIN — CREATE
     * =========================================================
     */
    app.post("/admin/videos", {
        preHandler: requireAdminApiKey,
    }, async (request, reply) => {
        const parsed = videoDataSchema.safeParse(request.body);
        if (!parsed.success) {
            return reply.status(400).send({
                message: "Dados inválidos.",
                errors: parsed.error.flatten(),
            });
        }
        const { artistId, thumbnail, description, ...requiredData } = parsed.data;
        const [existing, artist] = await Promise.all([
            prisma.video.findUnique({
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
                message: "Já existe um vídeo com este slug.",
            });
        }
        if (!artist) {
            return reply.status(400).send({
                message: "Profissional informado não foi encontrado.",
            });
        }
        const video = await prisma.video.create({
            data: {
                ...requiredData,
                thumbnail: normalizeOptionalString(thumbnail),
                description: normalizeOptionalString(description),
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
            .send(formatVideo(video));
    });
    /*
     * =========================================================
     * ADMIN — UPDATE
     * =========================================================
     */
    app.patch("/admin/videos/:id", {
        preHandler: requireAdminApiKey,
    }, async (request, reply) => {
        const paramsParsed = adminVideoParamsSchema.safeParse(request.params);
        if (!paramsParsed.success) {
            return reply.status(400).send({
                message: "ID de vídeo inválido.",
            });
        }
        const bodyParsed = videoDataSchema.safeParse(request.body);
        if (!bodyParsed.success) {
            return reply.status(400).send({
                message: "Dados inválidos.",
                errors: bodyParsed.error.flatten(),
            });
        }
        const id = paramsParsed.data.id;
        const { artistId, thumbnail, description, ...requiredData } = bodyParsed.data;
        const [existing, slugOwner, artist,] = await Promise.all([
            prisma.video.findUnique({
                where: {
                    id,
                },
                select: {
                    id: true,
                },
            }),
            prisma.video.findUnique({
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
                message: "Vídeo não encontrado.",
            });
        }
        if (slugOwner &&
            slugOwner.id !== id) {
            return reply.status(409).send({
                message: "Já existe outro vídeo com este slug.",
            });
        }
        if (!artist) {
            return reply.status(400).send({
                message: "Profissional informado não foi encontrado.",
            });
        }
        const video = await prisma.video.update({
            where: {
                id,
            },
            data: {
                ...requiredData,
                thumbnail: normalizeOptionalString(thumbnail),
                description: normalizeOptionalString(description),
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
        return formatVideo(video);
    });
    /*
     * =========================================================
     * ADMIN — ACTIVE STATUS
     * =========================================================
     */
    app.patch("/admin/videos/:id/status", {
        preHandler: requireAdminApiKey,
    }, async (request, reply) => {
        const paramsParsed = adminVideoParamsSchema.safeParse(request.params);
        if (!paramsParsed.success) {
            return reply.status(400).send({
                message: "ID de vídeo inválido.",
            });
        }
        const bodyParsed = videoStatusSchema.safeParse(request.body);
        if (!bodyParsed.success) {
            return reply.status(400).send({
                message: "Status inválido.",
            });
        }
        const existing = await prisma.video.findUnique({
            where: {
                id: paramsParsed.data.id,
            },
            select: {
                id: true,
            },
        });
        if (!existing) {
            return reply.status(404).send({
                message: "Vídeo não encontrado.",
            });
        }
        const video = await prisma.video.update({
            where: {
                id: paramsParsed.data.id,
            },
            data: {
                isActive: bodyParsed.data.isActive,
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
        return formatVideo(video);
    });
}
