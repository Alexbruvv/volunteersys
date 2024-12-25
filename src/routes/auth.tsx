import { Hono } from "hono";
import ChooseProviderPage from "../app/_auth/ChooseProviderPage";
import { googleAuth } from "@hono/oauth-providers/google";
import { db } from "../db/db";
import { and, eq } from "drizzle-orm";
import { accounts, users } from "../db/schema/auth";

export const auth = new Hono().basePath("/auth");

auth.get("/login", (c) => c.html(<ChooseProviderPage />));

auth.get(
    "/google",
    googleAuth({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        scope: ["openid", "email", "profile"],
    }),
    async (c) => {
        const providerUser = c.get("user-google");

        if (!providerUser) {
            return c.notFound();
        }

        if (!providerUser.verified_email) {
            return c.text("Email not verified");
        }

        if (!providerUser.name) {
            return c.text("Name not provided");
        }

        if (!providerUser.email?.endsWith("@studentrobotics.org")) {
            return c.text("Email must be a studentrobotics.org email address");
        }

        const existingAccount = await db.query.accounts.findFirst({
            where: and(eq(accounts.provider, "google"), eq(accounts.emailAddress, providerUser.email)),
            with: {
                user: true,
            },
        });

        if (existingAccount) {
            return c.text("Account exists. TODO: setup session");
        }

        const user = await db.transaction(async (tx) => {
            const user = (
                await tx
                    .insert(users)
                    .values({
                        name: providerUser.name!,
                        primaryEmail: providerUser.email!,
                    })
                    .returning()
            )[0];

            await tx.insert(accounts).values({
                provider: "google",
                providerAccountId: providerUser.id!,
                emailAddress: providerUser.email!,
                userId: user.id,
            });

            return user;
        });

        return c.json({ user });
    }
);

