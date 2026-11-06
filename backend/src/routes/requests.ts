import type { FastifyInstance } from "fastify";

import type { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";

type StudioRequestType =
  | "FLASH_RESERVATION"
  | "ARTWORK_RESERVATION"
  | "PRODUCT_INTEREST"
  | "TATTOO_CUSTOM"
  | "ART_CUSTOM"
  | "VOICE_CUSTOM";

type StudioRequestStatus =
  | "NEW"
  | "CONTACTED"
  | "QUOTED"
  | "APPROVED"
  | "COMPLETED"
  | "CANCELLED";

const requestStatuses: StudioRequestStatus[] = [
  "NEW",
  "CONTACTED",
  "QUOTED",
  "APPROVED",
  "COMPLETED",
  "CANCELLED",
];

function isRequestStatus(value: unknown): value is StudioRequestStatus {
  return (
    typeof value === "string" &&
    requestStatuses.includes(value as StudioRequestStatus)
  );
}

type CreateStudioRequestBody = {
  type: StudioRequestType;

  name: string;
  whatsapp: string;
  email: string;

  instagram?: string | null;
  message?: string | null;
  details?: Prisma.InputJsonValue;

  professionalId?: number | null;
  flashId?: number | null;
  artworkId?: number | null;
  productId?: number | null;
};

const requestTypes: StudioRequestType[] = [
  "FLASH_RESERVATION",
  "ARTWORK_RESERVATION",
  "PRODUCT_INTEREST",
  "TATTOO_CUSTOM",
  "ART_CUSTOM",
  "VOICE_CUSTOM",
];

function isRequestType(value: unknown): value is StudioRequestType {
  return (
    typeof value === "string" &&
    requestTypes.includes(value as StudioRequestType)
  );
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizeOptionalString(
  value: string | null | undefined,
): string | null {
  if (!value) {
    return null;
  }

  const normalized = value.trim();

  return normalized.length > 0 ? normalized : null;
}

export async function requestsRoutes(app: FastifyInstance) {
  /*
   * =========================================================
   * POST /requests
   * Cria uma nova solicitação
   * =========================================================
   */
  app.post<{
    Body: CreateStudioRequestBody;
  }>("/requests", async (request, reply) => {
    const body = request.body;

    if (!body || !isRequestType(body.type)) {
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

    /*
     * =======================================================
     * PROFISSIONAL
     * =======================================================
     */
    if (professionalId !== null) {
      const professional = await prisma.professional.findUnique({
        where: {
          id: professionalId,
        },
        select: {
          id: true,
        },
      });

      if (!professional) {
        return reply.status(400).send({
          message: "Profissional informado não foi encontrado.",
        });
      }
    }

    /*
     * =======================================================
     * FLASH
     * =======================================================
     */
    if (flashId !== null) {
      const flash = await prisma.flash.findUnique({
        where: {
          id: flashId,
        },
        select: {
          id: true,
          available: true,
        },
      });

      if (!flash) {
        return reply.status(400).send({
          message: "Flash informado não foi encontrado.",
        });
      }

      if (!flash.available) {
        return reply.status(409).send({
          message: "Este flash não está disponível para novas solicitações.",
        });
      }
    }

    /*
     * =======================================================
     * ARTE
     * =======================================================
     */
    if (artworkId !== null) {
      const artwork = await prisma.artwork.findUnique({
        where: {
          id: artworkId,
        },
        select: {
          id: true,
          available: true,
        },
      });

      if (!artwork) {
        return reply.status(400).send({
          message: "Arte informada não foi encontrada.",
        });
      }

      if (!artwork.available) {
        return reply.status(409).send({
          message: "Esta arte não está disponível para novas solicitações.",
        });
      }
    }

    /*
     * =======================================================
     * PRODUTO
     * =======================================================
     */
    if (productId !== null) {
      const product = await prisma.product.findUnique({
        where: {
          id: productId,
        },
        select: {
          id: true,
          available: true,
        },
      });

      if (!product) {
        return reply.status(400).send({
          message: "Produto informado não foi encontrado.",
        });
      }

      if (!product.available) {
        return reply.status(409).send({
          message: "Este produto não está disponível para novas solicitações.",
        });
      }
    }

    /*
     * =======================================================
     * VALIDAÇÕES POR TIPO
     * =======================================================
     */
    if (body.type === "FLASH_RESERVATION" && flashId === null) {
      return reply.status(400).send({
        message: "Uma solicitação de flash precisa informar flashId.",
      });
    }

    if (body.type === "ARTWORK_RESERVATION" && artworkId === null) {
      return reply.status(400).send({
        message: "Uma solicitação de arte precisa informar artworkId.",
      });
    }

    if (body.type === "PRODUCT_INTEREST" && productId === null) {
      return reply.status(400).send({
        message: "Uma solicitação de produto precisa informar productId.",
      });
    }

    if (
      (body.type === "TATTOO_CUSTOM" ||
        body.type === "ART_CUSTOM" ||
        body.type === "VOICE_CUSTOM") &&
      professionalId === null
    ) {
      return reply.status(400).send({
        message:
          "Uma solicitação personalizada precisa informar professionalId.",
      });
    }

    /*
     * =======================================================
     * CRIAÇÃO
     * =======================================================
     */
    const studioRequest = await prisma.studioRequest.create({
      data: {
        type: body.type,

        name: body.name.trim(),
        whatsapp: body.whatsapp.trim(),
        email: body.email.trim(),

        instagram: normalizeOptionalString(body.instagram),
        message: normalizeOptionalString(body.message),

        details: body.details ?? undefined,

        professionalId,
        flashId,
        artworkId,
        productId,
      },
    });

    return reply.status(201).send(studioRequest);
  });

  /*
   * =========================================================
   * GET /requests
   * Lista todas as solicitações
   * =========================================================
   */
  app.get("/requests", async () => {
    const studioRequests = await prisma.studioRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
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
      },
    });

    return studioRequests;
  });

  /*
   * =========================================================
   * GET /requests/:id
   * Retorna uma solicitação específica
   * =========================================================
   */
  app.get<{
    Params: {
      id: string;
    };
  }>("/requests/:id", async (request, reply) => {
    const id = Number(request.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return reply.status(400).send({
        message: "ID de solicitação inválido.",
      });
    }

    const studioRequest = await prisma.studioRequest.findUnique({
      where: {
        id,
      },

      include: {
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
      },
    });

    if (!studioRequest) {
      return reply.status(404).send({
        message: "Solicitação não encontrada.",
      });
    }

    return studioRequest;
  });

  /*
 * =========================================================
 * PATCH /requests/:id/status
 * Atualiza o status de uma solicitação
 * =========================================================
 */
app.patch<{
  Params: {
    id: string;
  };
  Body: {
    status: StudioRequestStatus;
  };
}>("/requests/:id/status", async (request, reply) => {
  const id = Number(request.params.id);
  const { status } = request.body;

  if (!Number.isInteger(id) || id <= 0) {
    return reply.status(400).send({
      message: "ID de solicitação inválido.",
    });
  }

  if (!isRequestStatus(status)) {
    return reply.status(400).send({
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
    return reply.status(404).send({
      message: "Solicitação não encontrada.",
    });
  }

  const studioRequest = await prisma.studioRequest.update({
    where: {
      id,
    },
    data: {
      status,
    },
    include: {
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
    },
  });

  return studioRequest;
});
}