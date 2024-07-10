/*
  Warnings:

  - The primary key for the `PostHistoryTranslation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PostHistoryTranslation` table. All the data in the column will be lost.
  - The primary key for the `PostTranslation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PostTranslation` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "PostHistoryTranslation_postHistoryId_language_key";

-- DropIndex
DROP INDEX "PostTranslation_postId_language_key";

-- AlterTable
ALTER TABLE "PostHistoryTranslation" DROP CONSTRAINT "PostHistoryTranslation_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "PostHistoryTranslation_pkey" PRIMARY KEY ("postHistoryId", "language");

-- AlterTable
ALTER TABLE "PostTranslation" DROP CONSTRAINT "PostTranslation_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "PostTranslation_pkey" PRIMARY KEY ("postId", "language");
