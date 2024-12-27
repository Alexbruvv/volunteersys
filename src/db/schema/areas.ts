import { relations, type InferSelectModel } from "drizzle-orm";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./auth";

// Areas
export const areas = pgTable("areas", {
    id: uuid().primaryKey().defaultRandom().notNull(),
    name: varchar().notNull(),
    description: varchar().notNull(),
});

export const areaRelations = relations(areas, ({ many }) => ({
    owners: many(users),
    roles: many(roles),
}));

export type Area = InferSelectModel<typeof areas>;

// Roles
export const roles = pgTable("roles", {
    id: uuid().primaryKey().defaultRandom().notNull(),
    name: varchar().notNull(),
    description: varchar().notNull(),
    guidance_uri: varchar().notNull(),

    areaId: uuid()
        .references(() => areas.id)
        .notNull(),
});

export const rolesRelations = relations(roles, ({ one }) => ({
    area: one(areas, { fields: [roles.areaId], references: [areas.id] }),
}));

export type Role = InferSelectModel<typeof roles>;

