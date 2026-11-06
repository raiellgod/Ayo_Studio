import "dotenv/config";

import cors from "@fastify/cors";
import Fastify from "fastify";

import { flashesRoutes } from "./routes/flashes.js";
import { professionalsRoutes } from "./routes/professionals.js";
import { artworkRoutes } from "./routes/artworks.js";
import { productRoutes } from "./routes/products.js";
import { videoRoutes } from "./routes/videos.js";
import { requestsRoutes } from "./routes/requests.js";

const app = Fastify({
  logger: true,
});

await app.register(cors, {
  origin: ["http://localhost:3000"],
});

await app.register(professionalsRoutes);
await app.register(flashesRoutes);
await app.register(artworkRoutes);
await app.register(productRoutes);
await app.register(videoRoutes);
await app.register(requestsRoutes);

app.get("/health", async () => {
  return {
    status: "ok",
    service: "ayo-studio-api",
  };
});

const port = Number(process.env.PORT ?? 3333);

try {
  await app.listen({
    port,
    host: "0.0.0.0",
  });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}