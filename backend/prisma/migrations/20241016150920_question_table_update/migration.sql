/*
  Warnings:

  - You are about to drop the column `url` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `User` table. All the data in the column will be lost.
  - Added the required column `thumbnail` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Made the column `heading` on table `Question` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Question` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "url",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "soluctions" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "thumbnail" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "heading" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
