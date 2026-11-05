-- CreateEnum
CREATE TYPE "StudioRequestType" AS ENUM ('FLASH_RESERVATION', 'ARTWORK_RESERVATION', 'PRODUCT_INTEREST', 'TATTOO_CUSTOM', 'ART_CUSTOM', 'VOICE_CUSTOM');

-- CreateEnum
CREATE TYPE "StudioRequestStatus" AS ENUM ('NEW', 'CONTACTED', 'QUOTED', 'APPROVED', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "StudioRequest" (
    "id" SERIAL NOT NULL,
    "type" "StudioRequestType" NOT NULL,
    "status" "StudioRequestStatus" NOT NULL DEFAULT 'NEW',
    "name" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "instagram" TEXT,
    "message" TEXT,
    "details" JSONB,
    "professionalId" INTEGER,
    "flashId" INTEGER,
    "artworkId" INTEGER,
    "productId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudioRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "StudioRequest_type_idx" ON "StudioRequest"("type");

-- CreateIndex
CREATE INDEX "StudioRequest_status_idx" ON "StudioRequest"("status");

-- CreateIndex
CREATE INDEX "StudioRequest_professionalId_idx" ON "StudioRequest"("professionalId");

-- CreateIndex
CREATE INDEX "StudioRequest_flashId_idx" ON "StudioRequest"("flashId");

-- CreateIndex
CREATE INDEX "StudioRequest_artworkId_idx" ON "StudioRequest"("artworkId");

-- CreateIndex
CREATE INDEX "StudioRequest_productId_idx" ON "StudioRequest"("productId");

-- CreateIndex
CREATE INDEX "StudioRequest_createdAt_idx" ON "StudioRequest"("createdAt");

-- AddForeignKey
ALTER TABLE "StudioRequest" ADD CONSTRAINT "StudioRequest_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudioRequest" ADD CONSTRAINT "StudioRequest_flashId_fkey" FOREIGN KEY ("flashId") REFERENCES "Flash"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudioRequest" ADD CONSTRAINT "StudioRequest_artworkId_fkey" FOREIGN KEY ("artworkId") REFERENCES "Artwork"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudioRequest" ADD CONSTRAINT "StudioRequest_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
