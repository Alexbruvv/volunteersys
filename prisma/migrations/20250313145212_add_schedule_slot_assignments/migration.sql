-- CreateTable
CREATE TABLE "ScheduleSlotAssignment" (
    "id" TEXT NOT NULL,
    "scheduleSlotId" TEXT NOT NULL,
    "volunteerId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "ScheduleSlotAssignment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScheduleSlotAssignment" ADD CONSTRAINT "ScheduleSlotAssignment_scheduleSlotId_fkey" FOREIGN KEY ("scheduleSlotId") REFERENCES "ScheduleSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleSlotAssignment" ADD CONSTRAINT "ScheduleSlotAssignment_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "Volunteer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleSlotAssignment" ADD CONSTRAINT "ScheduleSlotAssignment_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
