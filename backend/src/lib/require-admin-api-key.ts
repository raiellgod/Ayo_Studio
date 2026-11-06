import type {
  FastifyReply,
  FastifyRequest,
} from "fastify";

export async function requireAdminApiKey(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const expectedKey =
    process.env.ADMIN_API_KEY;

  const receivedKey =
    request.headers["x-admin-api-key"];

  if (
    !expectedKey ||
    receivedKey !== expectedKey
  ) {
    return reply.status(401).send({
      message: "Acesso administrativo não autorizado.",
    });
  }
}