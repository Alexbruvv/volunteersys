/*
  Warnings:

  - Made the column `scheduleId` on table `Area` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Area" DROP CONSTRAINT "Area_scheduleId_fkey";

-- AlterTable
ALTER TABLE "Area" ALTER COLUMN "scheduleId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
