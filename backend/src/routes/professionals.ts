import type { FastifyInstance } from "fastify";
import { z } from "zod";

import { prisma } from "../lib/prisma.js";

const createProfessionalSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  role: z.string().min(1),

  specialties: z.string().optional(),
  description: z.string().optional(),

  image: z.string().optional(),
  fullImage: z.string().optional(),
  profileImage: z.string().optional(),

  services: z
    .array(z.enum(["TATTOO", "ART", "VOICE"]))
    .min(1),
});

const professionalParamsSchema = z.object({
  slug: z.string().min(1),
});

type ProfessionalWithServices = Awaited<
  ReturnType<typeof findProfessionalBySlug>
>;

function normalizeService(
  service: "TATTOO" | "ART" | "VOICE",
) {
  return service.toLowerCase();
}

function formatProfessional(
  professional: NonNullable<ProfessionalWithServices>,
) {
  return {
    id: professional.id,
    slug: professional.slug,
    name: professional.name,
    role: professional.role,

    services: professional.services.map((item) =>
      normalizeService(item.service),
    ),

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

function findProfessionalBySlug(slug: string) {
  return prisma.professional.findUnique({
    where: {
      slug,
    },
    include: {
      services: true,
    },
  });
}

export async function professionalsRoutes(
  app: FastifyInstance,
) {
  app.get("/professionals", async () => {
    const professionals =
      await prisma.professional.findMany({
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

  app.get(
    "/professionals/:slug",
    async (request, reply) => {
      const parsed =
        professionalParamsSchema.safeParse(
          request.params,
        );

      if (!parsed.success) {
        return reply.status(400).send({
          message: "Slug inválido.",
        });
      }

      const professional =
        await findProfessionalBySlug(
          parsed.data.slug,
        );

      if (
        !professional ||
        !professional.isActive
      ) {
        return reply.status(404).send({
          message: "Profissional não encontrado.",
        });
      }

      return formatProfessional(professional);
    },
  );

  app.post(
    "/professionals",
    async (request, reply) => {
      const parsed =
        createProfessionalSchema.safeParse(
          request.body,
        );

      if (!parsed.success) {
        return reply.status(400).send({
          message: "Dados inválidos.",
          errors: parsed.error.flatten(),
        });
      }

      const {
        services,
        ...professionalData
      } = parsed.data;

      const existing =
        await prisma.professional.findUnique({
          where: {
            slug: professionalData.slug,
          },
        });

      if (existing) {
        return reply.status(409).send({
          message:
            "Já existe um profissional com este slug.",
        });
      }

      const professional =
        await prisma.professional.create({
          data: {
            ...professionalData,

            services: {
              create: services.map(
                (service) => ({
                  service,
                }),
              ),
            },
          },

          include: {
            services: true,
          },
        });

      return reply
        .status(201)
        .send(
          formatProfessional(professional),
        );
    },
  );
}