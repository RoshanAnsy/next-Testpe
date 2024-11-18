/*
  Warnings:

  - You are about to drop the column `board` on the `Question` table. All the data in the column will be lost.
  - Added the required column `bord` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "board",
ADD COLUMN     "bord" TEXT NOT NULL;
