/*
  Warnings:

  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `PostHistory` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `PostHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "content",
DROP COLUMN "title";

-- AlterTable
ALTER TABLE "PostHistory" DROP COLUMN "content",
DROP COLUMN "title";

-- CreateTable
CREATE TABLE "PostTranslation" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "PostTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostHistoryTranslation" (
    "id" SERIAL NOT NULL,
    "postHistoryId" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "PostHistoryTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostTranslation_postId_language_key" ON "PostTranslation"("postId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "PostHistoryTranslation_postHistoryId_language_key" ON "PostHistoryTranslation"("postHistoryId", "language");

-- AddForeignKey
ALTER TABLE "PostTranslation" ADD CONSTRAINT "PostTranslation_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostHistoryTranslation" ADD CONSTRAINT "PostHistoryTranslation_postHistoryId_fkey" FOREIGN KEY ("postHistoryId") REFERENCES "PostHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
