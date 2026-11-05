-- CreateTable
CREATE TABLE "Flash" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "categories" TEXT[],
    "available" BOOLEAN NOT NULL DEFAULT true,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "artistId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Flash_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Flash_slug_key" ON "Flash"("slug");

-- CreateIndex
CREATE INDEX "Flash_artistId_idx" ON "Flash"("artistId");

-- CreateIndex
CREATE INDEX "Flash_available_idx" ON "Flash"("available");

-- CreateIndex
CREATE INDEX "Flash_isActive_idx" ON "Flash"("isActive");

-- AddForeignKey
ALTER TABLE "Flash" ADD CONSTRAINT "Flash_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Professional"("id") ON DELETE CASCADE ON UPDATE CASCADE;
