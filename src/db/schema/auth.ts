import { relations, type InferSelectModel } from "drizzle-orm";
import { pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const permission = pgEnum("permission", ["MANAGE_USERS"]);
export type Permission = (typeof permission.enumValues)[number];

// Users
export const users = pgTable("users", {
    id: uuid().primaryKey().defaultRandom().notNull(),
    name: varchar({ length: 255 }).notNull(),
    primaryEmail: varchar({ length: 255 }).notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
    accounts: many(accounts),
    groups: many(groups),
}));

export type User = InferSelectModel<typeof users>;

// Accounts
export const accounts = pgTable("accounts", {
    id: uuid().primaryKey().defaultRandom().notNull(),
    userId: uuid()
        .references(() => users.id)
        .notNull(),
    provider: varchar({ length: 255 }).notNull(),
    emailAddress: varchar({ length: 255 }).notNull(),
    providerAccountId: varchar({ length: 255 }).notNull(),
});

export const accountRelations = relations(accounts, ({ one }) => ({
    user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export type Account = InferSelectModel<typeof accounts>;

// Groups
export const groups = pgTable("groups", {
    id: uuid().primaryKey().defaultRandom().notNull(),
    name: varchar({ length: 255 }).notNull(),
    permissions: permission().array().default([]).notNull(),
});

export const groupRelations = relations(groups, ({ many }) => ({
    users: many(users),
}));

export type Group = InferSelectModel<typeof groups>;

