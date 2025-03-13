-- AlterTable
ALTER TABLE "Area" ADD COLUMN     "scheduleId" TEXT;

-- AddForeignKey
ALTER TABLE "Area" ADD CONSTRAINT "Area_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
