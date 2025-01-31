/*
  Warnings:

  - Added the required column `consActiveRoles` to the `Volunteer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `consPublicSpeaking` to the `Volunteer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `consQuietRoles` to the `Volunteer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Volunteer" ADD COLUMN     "consActiveRoles" BOOLEAN NOT NULL,
ADD COLUMN     "consPublicSpeaking" BOOLEAN NOT NULL,
ADD COLUMN     "consQuietRoles" BOOLEAN NOT NULL;
