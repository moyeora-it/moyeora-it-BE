/*
  Warnings:

  - You are about to drop the column `groupId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `NestedReply` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('KAKAO', 'GOOGLE', 'NAVER');

-- DropForeignKey
ALTER TABLE "NestedReply" DROP CONSTRAINT "NestedReply_replyId_fkey";

-- DropForeignKey
ALTER TABLE "NestedReply" DROP CONSTRAINT "NestedReply_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_groupId_fkey";

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Reply" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "parentId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "groupId",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "provider" "Provider",
ADD COLUMN     "providerId" TEXT,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "nickname" DROP NOT NULL;

-- DropTable
DROP TABLE "NestedReply";

-- CreateTable
CREATE TABLE "WaitingList" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,
    "groupId" INTEGER,

    CONSTRAINT "WaitingList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GroupToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_GroupToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_GroupToUser_B_index" ON "_GroupToUser"("B");

-- AddForeignKey
ALTER TABLE "WaitingList" ADD CONSTRAINT "WaitingList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaitingList" ADD CONSTRAINT "WaitingList_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToUser" ADD CONSTRAINT "_GroupToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToUser" ADD CONSTRAINT "_GroupToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
