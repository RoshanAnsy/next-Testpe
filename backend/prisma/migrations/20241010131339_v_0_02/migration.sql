/*
  Warnings:

  - You are about to drop the `vote` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "userId" INTEGER NOT NULL,
ADD COLUMN     "verify" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "vote";

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
