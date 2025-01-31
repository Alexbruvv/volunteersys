/*
  Warnings:

  - You are about to drop the column `consActiveRoles` on the `Volunteer` table. All the data in the column will be lost.
  - You are about to drop the column `consKitKnowledge` on the `Volunteer` table. All the data in the column will be lost.
  - You are about to drop the column `consLongShifts` on the `Volunteer` table. All the data in the column will be lost.
  - You are about to drop the column `consMissFinals` on the `Volunteer` table. All the data in the column will be lost.
  - You are about to drop the column `consPublicSpeaking` on the `Volunteer` table. All the data in the column will be lost.
  - You are about to drop the column `consQuietRoles` on the `Volunteer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Volunteer" DROP COLUMN "consActiveRoles",
DROP COLUMN "consKitKnowledge",
DROP COLUMN "consLongShifts",
DROP COLUMN "consMissFinals",
DROP COLUMN "consPublicSpeaking",
DROP COLUMN "consQuietRoles";
