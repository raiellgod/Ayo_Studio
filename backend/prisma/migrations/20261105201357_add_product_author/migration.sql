-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "authorId" INTEGER;

-- CreateIndex
CREATE INDEX "Product_authorId_idx" ON "Product"("authorId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Professional"("id") ON DELETE SET NULL ON UPDATE CASCADE;
