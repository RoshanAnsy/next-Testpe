/*
  Warnings:

  - You are about to drop the column `solution` on the `Solution` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Solution" DROP COLUMN "solution";

-- CreateTable
CREATE TABLE "Block" (
    "id" SERIAL NOT NULL,
    "solutionId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "level" INTEGER,
    "parentBlockId" INTEGER,
    "order" INTEGER NOT NULL,
    "styles" JSONB,
    "altText" TEXT,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Block" ADD CONSTRAINT "Block_solutionId_fkey" FOREIGN KEY ("solutionId") REFERENCES "Solution"("id") ON DELETE CASCADE ON UPDATE CASCADE;
