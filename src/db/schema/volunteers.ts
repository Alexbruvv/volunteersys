import { relations, type InferSelectModel } from "drizzle-orm";
import { boolean, integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

// Volunteers
export const volunteers = pgTable("volunteers", {
    id: uuid().primaryKey().defaultRandom().notNull(),

    name: varchar().notNull(),
    badgePronouns: varchar().notNull(),
    email: varchar().notNull(),

    consActiveRoles: integer().notNull(), // 1 - 4 (4 = happy with active roles)
    consKitKnowledge: integer().notNull(), // 1 - 4 (4 = very knowledgeable)
    consLongShifts: integer().notNull(), // 1 - 4 (4 = happy with long shifts)
    consQuietRoles: integer().notNull(), // 1 - 4 (4 = happy with quiet roles)
    consPublicSpeaking: boolean().notNull(), // true = happy with public speaking
    consMissFinals: boolean().notNull(), // true = happy to miss finals
});

export type Volunteer = InferSelectModel<typeof volunteers>;

// Attendance sheets
export const attendanceSheets = pgTable("attendance_sheets", {
    id: uuid().primaryKey().defaultRandom().notNull(),

    name: varchar().notNull(),
});

export const attendanceSheetRelations = relations(attendanceSheets, ({ many }) => ({
    volunteers: many(volunteers),
}));

export type AttendanceSheet = InferSelectModel<typeof attendanceSheets>;
