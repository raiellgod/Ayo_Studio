import "dotenv/config";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import Fastify from "fastify";
import { adminUsersRoutes } from "./routes/admin-users.js";
import { flashesRoutes } from "./routes/flashes.js";
import { professionalsRoutes } from "./routes/professionals.js";
import { artworkRoutes } from "./routes/artworks.js";
import { productRoutes } from "./routes/products.js";
import { videoRoutes } from "./routes/videos.js";
import { requestsRoutes } from "./routes/requests.js";
import { uploadsRoutes } from "./routes/uploads.js";
const app = Fastify({
    logger: true,
});
const allowedOrigins = (process.env.CORS_ORIGINS ??
    "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
await app.register(cors, {
    origin: allowedOrigins,
});
await app.register(multipart);
await app.register(professionalsRoutes);
await app.register(flashesRoutes);
await app.register(artworkRoutes);
await app.register(productRoutes);
await app.register(videoRoutes);
await app.register(requestsRoutes);
await app.register(adminUsersRoutes);
await app.register(uploadsRoutes);
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
}
catch (error) {
    app.log.error(error);
    process.exit(1);
}
