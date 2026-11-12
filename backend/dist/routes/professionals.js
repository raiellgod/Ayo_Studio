import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAdminApiKey } from "../lib/require-admin-api-key.js";
const serviceSchema = z.enum(["TATTOO", "ART", "VOICE"]);
const professionalCreateSchema = z.object({
    slug: z
        .string()
        .min(1)
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use apenas letras minúsculas, números e hífens."),
    name: z.string().min(1),
    role: z.string().min(1),
    specialties: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    fullImage: z.string().optional(),
    profileImage: z.string().optional(),
    services: z.array(serviceSchema).min(1),
});
const professionalUpdateSchema = professionalCreateSchema;
const publicProfessionalParamsSchema = z.object({
    slug: z.string().min(1),
});
const adminProfessionalParamsSchema = z.object({
    id: z.coerce.number().int().positive(),
});
const professionalStatusSchema = z.object({
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
function normalizeService(service) {
    return service.toLowerCase();
}
function formatProfessional(professional) {
    return {
        id: professional.id,
        slug: professional.slug,
        name: professional.name,
        role: professional.role,
        services: professional.services.map((item) => normalizeService(item.service)),
        image: professional.image ?? "",
        fullImage: professional.fullImage ?? "",
        profileImage: professional.profileImage ?? "",
        specialties: professional.specialties ?? "",
        description: professional.description ?? "",
        isActive: professional.isActive,
        createdAt: professional.createdAt,
        updatedAt: professional.updatedAt,
    };
}
function findProfessionalBySlug(slug) {
    return prisma.professional.findUnique({
        where: {
            slug,
        },
        include: {
            services: true,
        },
    });
}
function findProfessionalById(id) {
    return prisma.professional.findUnique({
        where: {
            id,
        },
        include: {
            services: true,
        },
    });
}
export async function professionalsRoutes(app) {
    /*
     * =========================================================
     * PUBLIC
     * =========================================================
     */
    app.get("/professionals", async () => {
        const professionals = await prisma.professional.findMany({
            where: {
                isActive: true,
            },
            include: {
                services: true,
            },
            orderBy: {
                id: "asc",
            },
        });
        return professionals.map(formatProfessional);
    });
    app.get("/professionals/:slug", async (request, reply) => {
        const parsed = publicProfessionalParamsSchema.safeParse(request.params);
        if (!parsed.success) {
            return reply.status(400).send({
                message: "Slug inválido.",
            });
        }
        const professional = await findProfessionalBySlug(parsed.data.slug);
        if (!professional ||
            !professional.isActive) {
            return reply.status(404).send({
                message: "Profissional não encontrado.",
            });
        }
        return formatProfessional(professional);
    });
    /*
     * =========================================================
     * ADMIN — LIST
     * =========================================================
     */
    app.get("/admin/professionals", {
        preHandler: requireAdminApiKey,
    }, async () => {
        const professionals = await prisma.professional.findMany({
            include: {
                services: true,
            },
            orderBy: {
                id: "asc",
            },
        });
        return professionals.map(formatProfessional);
    });
    /*
     * =========================================================
     * ADMIN — DETAIL
     * =========================================================
     */
    app.get("/admin/professionals/:id", {
        preHandler: requireAdminApiKey,
    }, async (request, reply) => {
        const parsed = adminProfessionalParamsSchema.safeParse(request.params);
        if (!parsed.success) {
            return reply.status(400).send({
                message: "ID de profissional inválido.",
            });
        }
        const professional = await findProfessionalById(parsed.data.id);
        if (!professional) {
            return reply.status(404).send({
                message: "Profissional não encontrado.",
            });
        }
        return formatProfessional(professional);
    });
    /*
     * =========================================================
     * ADMIN — CREATE
     * =========================================================
     */
    app.post("/admin/professionals", {
        preHandler: requireAdminApiKey,
    }, async (request, reply) => {
        const parsed = professionalCreateSchema.safeParse(request.body);
        if (!parsed.success) {
            return reply.status(400).send({
                message: "Dados inválidos.",
                errors: parsed.error.flatten(),
            });
        }
        const { services, specialties, description, image, fullImage, profileImage, ...requiredData } = parsed.data;
        const existing = await prisma.professional.findUnique({
            where: {
                slug: requiredData.slug,
            },
            select: {
                id: true,
            },
        });
        if (existing) {
            return reply.status(409).send({
                message: "Já existe um profissional com este slug.",
            });
        }
        const professional = await prisma.professional.create({
            data: {
                ...requiredData,
                specialties: normalizeOptionalString(specialties),
                description: normalizeOptionalString(description),
                image: normalizeOptionalString(image),
                fullImage: normalizeOptionalString(fullImage),
                profileImage: normalizeOptionalString(profileImage),
                services: {
                    create: services.map((service) => ({
                        service,
                    })),
                },
            },
            include: {
                services: true,
            },
        });
        return reply
            .status(201)
            .send(formatProfessional(professional));
    });
    /*
     * =========================================================
     * ADMIN — UPDATE
     * =========================================================
     */
    app.patch("/admin/professionals/:id", {
        preHandler: requireAdminApiKey,
    }, async (request, reply) => {
        const paramsParsed = adminProfessionalParamsSchema.safeParse(request.params);
        if (!paramsParsed.success) {
            return reply.status(400).send({
                message: "ID de profissional inválido.",
            });
        }
        const bodyParsed = professionalUpdateSchema.safeParse(request.body);
        if (!bodyParsed.success) {
            return reply.status(400).send({
                message: "Dados inválidos.",
                errors: bodyParsed.error.flatten(),
            });
        }
        const id = paramsParsed.data.id;
        const existing = await prisma.professional.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
            },
        });
        if (!existing) {
            return reply.status(404).send({
                message: "Profissional não encontrado.",
            });
        }
        const slugOwner = await prisma.professional.findUnique({
            where: {
                slug: bodyParsed.data.slug,
            },
            select: {
                id: true,
            },
        });
        if (slugOwner &&
            slugOwner.id !== id) {
            return reply.status(409).send({
                message: "Já existe outro profissional com este slug.",
            });
        }
        const { services, specialties, description, image, fullImage, profileImage, ...requiredData } = bodyParsed.data;
        const professional = await prisma.professional.update({
            where: {
                id,
            },
            data: {
                ...requiredData,
                specialties: normalizeOptionalString(specialties),
                description: normalizeOptionalString(description),
                image: normalizeOptionalString(image),
                fullImage: normalizeOptionalString(fullImage),
                profileImage: normalizeOptionalString(profileImage),
                services: {
                    deleteMany: {},
                    create: services.map((service) => ({
                        service,
                    })),
                },
            },
            include: {
                services: true,
            },
        });
        return formatProfessional(professional);
    });
    /*
     * =========================================================
     * ADMIN — ACTIVE STATUS
     * =========================================================
     */
    app.patch("/admin/professionals/:id/status", {
        preHandler: requireAdminApiKey,
    }, async (request, reply) => {
        const paramsParsed = adminProfessionalParamsSchema.safeParse(request.params);
        if (!paramsParsed.success) {
            return reply.status(400).send({
                message: "ID de profissional inválido.",
            });
        }
        const bodyParsed = professionalStatusSchema.safeParse(request.body);
        if (!bodyParsed.success) {
            return reply.status(400).send({
                message: "Status inválido.",
            });
        }
        const existing = await prisma.professional.findUnique({
            where: {
                id: paramsParsed.data.id,
            },
            select: {
                id: true,
            },
        });
        if (!existing) {
            return reply.status(404).send({
                message: "Profissional não encontrado.",
            });
        }
        const professional = await prisma.professional.update({
            where: {
                id: paramsParsed.data.id,
            },
            data: {
                isActive: bodyParsed.data.isActive,
            },
            include: {
                services: true,
            },
        });
        return formatProfessional(professional);
    });
}
