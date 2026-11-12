import { prisma } from "../lib/prisma.js";
import { requireAdminApiKey } from "../lib/require-admin-api-key.js";
const requestStatuses = [
    "NEW",
    "CONTACTED",
    "QUOTED",
    "APPROVED",
    "COMPLETED",
    "CANCELLED",
];
function isRequestStatus(value) {
    return (typeof value === "string" &&
        requestStatuses.includes(value));
}
const requestTypes = [
    "FLASH_RESERVATION",
    "ARTWORK_RESERVATION",
    "PRODUCT_INTEREST",
    "TATTOO_CUSTOM",
    "ART_CUSTOM",
    "VOICE_CUSTOM",
];
function isRequestType(value) {
    return (typeof value === "string" &&
        requestTypes.includes(value));
}
function isNonEmptyString(value) {
    return (typeof value === "string" &&
        value.trim().length > 0);
}
function normalizeOptionalString(value) {
    if (!value) {
        return null;
    }
    const normalized = value.trim();
    return normalized.length > 0
        ? normalized
        : null;
}
const requestRelations = {
    professional: {
        select: {
            id: true,
            slug: true,
            name: true,
        },
    },
    flash: {
        select: {
            id: true,
            slug: true,
            name: true,
            image: true,
        },
    },
    artwork: {
        select: {
            id: true,
            slug: true,
            name: true,
            image: true,
        },
    },
    product: {
        select: {
            id: true,
            slug: true,
            name: true,
            image: true,
        },
    },
};
export async function requestsRoutes(app) {
    /*
     * =========================================================
     * PUBLIC
     * POST /requests
     * Cria uma nova solicitação enviada pelo site.
     * =========================================================
     */
    app.post("/requests", async (request, reply) => {
        const body = request.body;
        if (!body ||
            !isRequestType(body.type)) {
            return reply.status(400).send({
                message: "Tipo de solicitação inválido.",
            });
        }
        if (!isNonEmptyString(body.name)) {
            return reply.status(400).send({
                message: "Nome é obrigatório.",
            });
        }
        if (!isNonEmptyString(body.whatsapp)) {
            return reply.status(400).send({
                message: "WhatsApp é obrigatório.",
            });
        }
        if (!isNonEmptyString(body.email)) {
            return reply.status(400).send({
                message: "E-mail é obrigatório.",
            });
        }
        const professionalId = body.professionalId ?? null;
        const flashId = body.flashId ?? null;
        const artworkId = body.artworkId ?? null;
        const productId = body.productId ?? null;
        if (professionalId !== null) {
            const professional = await prisma.professional.findUnique({
                where: {
                    id: professionalId,
                },
                select: {
                    id: true,
                    isActive: true,
                },
            });
            if (!professional ||
                !professional.isActive) {
                return reply
                    .status(400)
                    .send({
                    message: "Profissional informado não foi encontrado ou está inativo.",
                });
            }
        }
        if (flashId !== null) {
            const flash = await prisma.flash.findUnique({
                where: {
                    id: flashId,
                },
                select: {
                    id: true,
                    available: true,
                    isActive: true,
                },
            });
            if (!flash ||
                !flash.isActive) {
                return reply
                    .status(400)
                    .send({
                    message: "Flash informado não foi encontrado.",
                });
            }
            if (!flash.available) {
                return reply
                    .status(409)
                    .send({
                    message: "Este flash não está disponível para novas solicitações.",
                });
            }
        }
        if (artworkId !== null) {
            const artwork = await prisma.artwork.findUnique({
                where: {
                    id: artworkId,
                },
                select: {
                    id: true,
                    available: true,
                    isActive: true,
                },
            });
            if (!artwork ||
                !artwork.isActive) {
                return reply
                    .status(400)
                    .send({
                    message: "Arte informada não foi encontrada.",
                });
            }
            if (!artwork.available) {
                return reply
                    .status(409)
                    .send({
                    message: "Esta arte não está disponível para novas solicitações.",
                });
            }
        }
        if (productId !== null) {
            const product = await prisma.product.findUnique({
                where: {
                    id: productId,
                },
                select: {
                    id: true,
                    available: true,
                    isActive: true,
                },
            });
            if (!product ||
                !product.isActive) {
                return reply
                    .status(400)
                    .send({
                    message: "Produto informado não foi encontrado.",
                });
            }
            if (!product.available) {
                return reply
                    .status(409)
                    .send({
                    message: "Este produto não está disponível para novas solicitações.",
                });
            }
        }
        if (body.type ===
            "FLASH_RESERVATION" &&
            flashId === null) {
            return reply
                .status(400)
                .send({
                message: "Uma solicitação de flash precisa informar flashId.",
            });
        }
        if (body.type ===
            "ARTWORK_RESERVATION" &&
            artworkId === null) {
            return reply
                .status(400)
                .send({
                message: "Uma solicitação de arte precisa informar artworkId.",
            });
        }
        if (body.type ===
            "PRODUCT_INTEREST" &&
            productId === null) {
            return reply
                .status(400)
                .send({
                message: "Uma solicitação de produto precisa informar productId.",
            });
        }
        if ((body.type ===
            "TATTOO_CUSTOM" ||
            body.type ===
                "ART_CUSTOM" ||
            body.type ===
                "VOICE_CUSTOM") &&
            professionalId === null) {
            return reply
                .status(400)
                .send({
                message: "Uma solicitação personalizada precisa informar professionalId.",
            });
        }
        const studioRequest = await prisma.studioRequest.create({
            data: {
                type: body.type,
                name: body.name.trim(),
                whatsapp: body.whatsapp.trim(),
                email: body.email
                    .trim()
                    .toLowerCase(),
                instagram: normalizeOptionalString(body.instagram),
                message: normalizeOptionalString(body.message),
                details: body.details ??
                    undefined,
                professionalId,
                flashId,
                artworkId,
                productId,
            },
        });
        return reply
            .status(201)
            .send(studioRequest);
    });
    /*
     * =========================================================
     * ADMIN
     * GET /requests
     * =========================================================
     */
    app.get("/requests", {
        preHandler: requireAdminApiKey,
    }, async () => {
        return prisma.studioRequest.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: requestRelations,
        });
    });
    /*
     * =========================================================
     * ADMIN
     * GET /requests/:id
     * =========================================================
     */
    app.get("/requests/:id", {
        preHandler: requireAdminApiKey,
    }, async (request, reply) => {
        const id = Number(request.params.id);
        if (!Number.isInteger(id) ||
            id <= 0) {
            return reply
                .status(400)
                .send({
                message: "ID de solicitação inválido.",
            });
        }
        const studioRequest = await prisma.studioRequest.findUnique({
            where: {
                id,
            },
            include: requestRelations,
        });
        if (!studioRequest) {
            return reply
                .status(404)
                .send({
                message: "Solicitação não encontrada.",
            });
        }
        return studioRequest;
    });
    /*
     * =========================================================
     * ADMIN
     * PATCH /requests/:id/status
     * =========================================================
     */
    app.patch("/requests/:id/status", {
        preHandler: requireAdminApiKey,
    }, async (request, reply) => {
        const id = Number(request.params.id);
        const { status } = request.body;
        if (!Number.isInteger(id) ||
            id <= 0) {
            return reply
                .status(400)
                .send({
                message: "ID de solicitação inválido.",
            });
        }
        if (!isRequestStatus(status)) {
            return reply
                .status(400)
                .send({
                message: "Status de solicitação inválido.",
            });
        }
        const existingRequest = await prisma.studioRequest.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
            },
        });
        if (!existingRequest) {
            return reply
                .status(404)
                .send({
                message: "Solicitação não encontrada.",
            });
        }
        return prisma.studioRequest.update({
            where: {
                id,
            },
            data: {
                status,
            },
            include: requestRelations,
        });
    });
}
