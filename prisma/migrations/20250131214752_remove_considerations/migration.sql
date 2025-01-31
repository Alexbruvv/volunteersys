/*
  Warnings:

  - You are about to drop the column `consActiveRoles` on the `Volunteer` table. All the data in the column will be lost.
  - You are about to drop the column `consPublicSpeaking` on the `Volunteer` table. All the data in the column will be lost.
  - You are about to drop the column `consQuietRoles` on the `Volunteer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Volunteer" DROP COLUMN "consActiveRoles",
DROP COLUMN "consPublicSpeaking",
DROP COLUMN "consQuietRoles";
