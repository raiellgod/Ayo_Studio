import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { hashAdminPassword, verifyAdminPassword, } from "../lib/admin-password.js";
import { requireAdminApiKey } from "../lib/require-admin-api-key.js";
const adminRoleSchema = z.enum([
    "OWNER",
    "ADMIN",
    "EDITOR",
]);
const adminIdParamsSchema = z.object({
    id: z.coerce.number().int().positive(),
});
const verifyAdminSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});
const createAdminSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    role: adminRoleSchema,
});
const updateAdminSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z
        .string()
        .min(8)
        .optional(),
    role: adminRoleSchema,
});
const statusSchema = z.object({
    isActive: z.boolean(),
});
function formatAdminUser(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}
async function assertCanChangeOwner(id, nextRole) {
    const current = await prisma.adminUser.findUnique({
        where: {
            id,
        },
        select: {
            role: true,
        },
    });
    if (!current ||
        current.role !== "OWNER" ||
        nextRole === "OWNER") {
        return true;
    }
    const ownerCount = await prisma.adminUser.count({
        where: {
            role: "OWNER",
            isActive: true,
        },
    });
    return ownerCount > 1;
}
async function assertCanDeactivateOwner(id, isActive) {
    if (isActive) {
        return true;
    }
    const current = await prisma.adminUser.findUnique({
        where: {
            id,
        },
        select: {
            role: true,
            isActive: true,
        },
    });
    if (!current ||
        current.role !== "OWNER" ||
        !current.isActive) {
        return true;
    }
    const ownerCount = await prisma.adminUser.count({
        where: {
            role: "OWNER",
            isActive: true,
        },
    });
    return ownerCount > 1;
}
export async function adminUsersRoutes(app) {
    /*
     * Revalida sessões existentes do Auth.js.
     * Usado apenas pelo servidor Next com ADMIN_API_KEY.
     * Nunca retorna passwordHash.
     */
    app.get("/admin/auth/session/:id", {
        preHandler: requireAdminApiKey,
    }, async (request, reply) => {
        const parsed = adminIdParamsSchema.safeParse(request.params);
        if (!parsed.success) {
            return reply.status(400).send({
                message: "ID de usuário inválido.",
            });
        }
        const user = await prisma.adminUser.findUnique({
            where: {
                id: parsed.data.id,
            },
        });
        if (!user || !user.isActive) {
            return reply.status(401).send({
                message: "Sessão administrativa inválida.",
            });
        }
        return formatAdminUser(user);
    });
    /*
     * Used only by the NextAuth server.
     * Never returns passwordHash.
     */
    app.post("/admin/auth/verify", {
        preHandler: requireAdminApiKey,
    }, async (request, reply) => {
        const parsed = verifyAdminSchema.safeParse(request.body);
        if (!parsed.success) {
            return reply.status(400).send({
                message: "Credenciais inválidas.",
            });
        }
        const email = parsed.data.email
            .trim()
            .toLowerCase();
        const user = await prisma.adminUser.findUnique({
            where: {
                email,
            },
        });
        if (!user ||
            !user.isActive ||
            !verifyAdminPassword(parsed.data.password, user.passwordHash)) {
            return reply.status(401).send({
                message: "E-mail ou senha inválidos.",
            });
        }
        return formatAdminUser(user);
    });
    app.get("/admin/users", {
        preHandler: requireAdminApiKey,
    }, async () => {
        const users = await prisma.adminUser.findMany({
            orderBy: [
                {
                    role: "asc",
                },
                {
                    name: "asc",
                },
            ],
        });
        return users.map(formatAdminUser);
    });
    app.get("/admin/users/:id", {
        preHandler: requireAdminApiKey,
    }, async (request, reply) => {
        const parsed = adminIdParamsSchema.safeParse(request.params);
        if (!parsed.success) {
            return reply.status(400).send({
                message: "ID de usuário inválido.",
            });
        }
        const user = await prisma.adminUser.findUnique({
            where: {
                id: parsed.data.id,
            },
        });
        if (!user) {
            return reply.status(404).send({
                message: "Usuário não encontrado.",
            });
        }
        return formatAdminUser(user);
    });
    app.post("/admin/users", {
        preHandler: requireAdminApiKey,
    }, async (request, reply) => {
        const parsed = createAdminSchema.safeParse(request.body);
        if (!parsed.success) {
            return reply.status(400).send({
                message: "Dados inválidos.",
                errors: parsed.error.flatten(),
            });
        }
        const email = parsed.data.email
            .trim()
            .toLowerCase();
        const existing = await prisma.adminUser.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
            },
        });
        if (existing) {
            return reply.status(409).send({
                message: "Já existe um usuário com este e-mail.",
            });
        }
        const user = await prisma.adminUser.create({
            data: {
                name: parsed.data.name.trim(),
                email,
                passwordHash: hashAdminPassword(parsed.data.password),
                role: parsed.data.role,
            },
        });
        return reply
            .status(201)
            .send(formatAdminUser(user));
    });
    app.patch("/admin/users/:id", {
        preHandler: requireAdminApiKey,
    }, async (request, reply) => {
        const paramsParsed = adminIdParamsSchema.safeParse(request.params);
        const bodyParsed = updateAdminSchema.safeParse(request.body);
        if (!paramsParsed.success) {
            return reply.status(400).send({
                message: "ID de usuário inválido.",
            });
        }
        if (!bodyParsed.success) {
            return reply.status(400).send({
                message: "Dados inválidos.",
                errors: bodyParsed.error.flatten(),
            });
        }
        const id = paramsParsed.data.id;
        const existing = await prisma.adminUser.findUnique({
            where: {
                id,
            },
        });
        if (!existing) {
            return reply.status(404).send({
                message: "Usuário não encontrado.",
            });
        }
        const email = bodyParsed.data.email
            .trim()
            .toLowerCase();
        const emailOwner = await prisma.adminUser.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
            },
        });
        if (emailOwner &&
            emailOwner.id !== id) {
            return reply.status(409).send({
                message: "Já existe outro usuário com este e-mail.",
            });
        }
        const canChangeOwner = await assertCanChangeOwner(id, bodyParsed.data.role);
        if (!canChangeOwner) {
            return reply.status(409).send({
                message: "Não é possível rebaixar o último OWNER ativo.",
            });
        }
        const user = await prisma.adminUser.update({
            where: {
                id,
            },
            data: {
                name: bodyParsed.data.name.trim(),
                email,
                role: bodyParsed.data.role,
                ...(bodyParsed.data.password
                    ? {
                        passwordHash: hashAdminPassword(bodyParsed.data.password),
                    }
                    : {}),
            },
        });
        return formatAdminUser(user);
    });
    app.patch("/admin/users/:id/status", {
        preHandler: requireAdminApiKey,
    }, async (request, reply) => {
        const paramsParsed = adminIdParamsSchema.safeParse(request.params);
        const bodyParsed = statusSchema.safeParse(request.body);
        if (!paramsParsed.success) {
            return reply.status(400).send({
                message: "ID de usuário inválido.",
            });
        }
        if (!bodyParsed.success) {
            return reply.status(400).send({
                message: "Status inválido.",
            });
        }
        const existing = await prisma.adminUser.findUnique({
            where: {
                id: paramsParsed.data.id,
            },
        });
        if (!existing) {
            return reply.status(404).send({
                message: "Usuário não encontrado.",
            });
        }
        const canDeactivateOwner = await assertCanDeactivateOwner(existing.id, bodyParsed.data.isActive);
        if (!canDeactivateOwner) {
            return reply.status(409).send({
                message: "Não é possível desativar o último OWNER ativo.",
            });
        }
        const user = await prisma.adminUser.update({
            where: {
                id: existing.id,
            },
            data: {
                isActive: bodyParsed.data.isActive,
            },
        });
        return formatAdminUser(user);
    });
}
