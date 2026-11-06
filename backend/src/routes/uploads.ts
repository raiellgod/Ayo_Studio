import type { MultipartFile } from "@fastify/multipart";
import type {
  FastifyPluginAsync,
  FastifyRequest,
} from "fastify";

import { cloudinary } from "../lib/cloudinary.js";

const ALLOWED_CATEGORIES = [
  "artists",
  "flashes",
  "artworks",
  "products",
  "videos",
] as const;

type UploadCategory =
  (typeof ALLOWED_CATEGORIES)[number];

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const MAX_IMAGE_SIZE =
  10 * 1024 * 1024;

type MultipartRequest =
  FastifyRequest & {
    file: (
      options?: {
        limits?: {
          files?: number;
          fileSize?: number;
        };
      },
    ) => Promise<
      MultipartFile | undefined
    >;
  };

function isUploadCategory(
  value: string,
): value is UploadCategory {
  return ALLOWED_CATEGORIES.includes(
    value as UploadCategory,
  );
}

function uploadBuffer(
  buffer: Buffer,
  folder: string,
) {
  return new Promise<{
    secure_url: string;
    public_id: string;
    width: number;
    height: number;
    format: string;
    bytes: number;
  }>((resolve, reject) => {
    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder,
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          if (!result) {
            reject(
              new Error(
                "Cloudinary não retornou dados do upload.",
              ),
            );
            return;
          }

          resolve({
            secure_url:
              result.secure_url,
            public_id:
              result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes,
          });
        },
      );

    uploadStream.end(buffer);
  });
}

export const uploadsRoutes: FastifyPluginAsync =
  async (app) => {
    app.post<{
      Querystring: {
        category?: string;
      };
    }>(
      "/uploads/image",
      async (request, reply) => {
        const expectedKey =
          process.env.ADMIN_UPLOAD_KEY;

        const receivedKey =
          request.headers[
            "x-admin-upload-key"
          ];

        if (
          !expectedKey ||
          receivedKey !== expectedKey
        ) {
          return reply
            .status(401)
            .send({
              message:
                "Upload não autorizado.",
            });
        }

        const category =
          request.query.category;

        if (
          !category ||
          !isUploadCategory(category)
        ) {
          return reply
            .status(400)
            .send({
              message:
                "Categoria inválida. Use artists, flashes, artworks, products ou videos.",
            });
        }

        let file:
          | MultipartFile
          | undefined;

        try {
          const multipartRequest =
            request as MultipartRequest;

          file =
            await multipartRequest.file({
              limits: {
                files: 1,
                fileSize:
                  MAX_IMAGE_SIZE,
              },
            });
        } catch (error) {
          request.log.error(error);

          return reply
            .status(413)
            .send({
              message:
                "Arquivo excede o limite permitido de 10 MB.",
            });
        }

        if (!file) {
          return reply
            .status(400)
            .send({
              message:
                "Nenhuma imagem foi enviada.",
            });
        }

        if (
          !ALLOWED_MIME_TYPES.has(
            file.mimetype,
          )
        ) {
          file.file.resume();

          return reply
            .status(415)
            .send({
              message:
                "Formato inválido. Envie JPG, PNG ou WEBP.",
            });
        }

        let buffer: Buffer;

        try {
          buffer =
            await file.toBuffer();
        } catch (error) {
          request.log.error(error);

          return reply
            .status(413)
            .send({
              message:
                "Não foi possível processar a imagem. Verifique o tamanho do arquivo.",
            });
        }

        try {
          const result =
            await uploadBuffer(
              buffer,
              `ayo-studio/${category}`,
            );

          return reply
            .status(201)
            .send({
              url:
                result.secure_url,
              publicId:
                result.public_id,
              width:
                result.width,
              height:
                result.height,
              format:
                result.format,
              bytes:
                result.bytes,
            });
        } catch (error) {
          request.log.error(error);

          return reply
            .status(500)
            .send({
              message:
                "Não foi possível enviar a imagem para o Cloudinary.",
            });
        }
      },
    );
  };
