import { relations, type InferSelectModel } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { endTime } from "hono/timing";
import { areas } from "./areas";
import { volunteers } from "./volunteers";

// Schedule blocks
export const scheduleBlocks = pgTable("schedule_blocks", {
    id: uuid().primaryKey().defaultRandom().notNull(),
    name: varchar().notNull(),

    startTime: timestamp({ withTimezone: false }).notNull(),
    endTime: timestamp({ withTimezone: false }).notNull(),
});

export type ScheduleBlock = InferSelectModel<typeof scheduleBlocks>;

// Schedule block assignments
export const scheduleBlockAssignments = pgTable("schedule_block_assignments", {
    id: uuid().primaryKey().defaultRandom().notNull(),
    scheduleBlockId: uuid()
        .references(() => scheduleBlocks.id)
        .notNull(),
    volunteerId: uuid()
        .references(() => volunteers.id)
        .notNull(),
    area: uuid()
        .references(() => areas.id)
        .notNull(),
});

export const scheduleBlockAssignmentRelations = relations(scheduleBlockAssignments, ({ one }) => ({
    scheduleBlock: one(scheduleBlocks, {
        fields: [scheduleBlockAssignments.scheduleBlockId],
        references: [scheduleBlocks.id],
    }),
    volunteer: one(volunteers, { fields: [scheduleBlockAssignments.volunteerId], references: [volunteers.id] }),
    area: one(areas, { fields: [scheduleBlockAssignments.area], references: [areas.id] }),
}));

export type ScheduleBlockAssignment = InferSelectModel<typeof scheduleBlockAssignments>;

// Schedules
export const schedules = pgTable("schedules", {
    id: uuid().primaryKey().defaultRandom().notNull(),
    name: varchar().notNull(),
});

export const scheduleRelations = relations(schedules, ({ many }) => ({
    scheduleSlots: many(scheduleSlots),
}));

export type Schedule = InferSelectModel<typeof schedules>;

// Schedule slots
export const scheduleSlots = pgTable("schedule_slots", {
    id: uuid().primaryKey().defaultRandom().notNull(),
    name: varchar().notNull(),
    scheduleId: uuid()
        .references(() => schedules.id)
        .notNull(),
    scheduleBlockId: uuid()
        .references(() => scheduleBlocks.id)
        .notNull(),
});

export const scheduleSlotRelations = relations(scheduleSlots, ({ one }) => ({
    schedule: one(schedules, { fields: [scheduleSlots.scheduleId], references: [schedules.id] }),
    scheduleBlock: one(scheduleBlocks, {
        fields: [scheduleSlots.scheduleBlockId],
        references: [scheduleBlocks.id],
    }),
}));

