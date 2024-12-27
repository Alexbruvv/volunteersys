import { Hono } from "hono";
import ChooseProviderPage from "../app/_auth/ChooseProviderPage";
import { googleAuth } from "@hono/oauth-providers/google";
import { db } from "../db/db";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { sign, verify } from "hono/jwt";
import type { Group, Permission, User } from "@prisma/client";

export const AUTH_TOKEN_COOKIE_NAME = "auth-token";
export const AUTH_TOKEN_LIFETIME = 60 * 60 * 24 * 7; // 7 days

export const authMiddleware = (requiredPermission?: Permission) =>
    createMiddleware<{
        Variables: {
            user: User & { groups: Group[] };
        };
    }>(async (c, next) => {
        const signedCookie = await getCookie(c, AUTH_TOKEN_COOKIE_NAME);

        if (!signedCookie) {
            console.log("no signed cookie");
            return c.redirect("/auth/login");
        }

        const parsedToken = await verify(signedCookie, process.env.JWT_SECRET!);
        const userId = parsedToken.userId as string | undefined;

        if (!userId) {
            return c.redirect("/auth/login");
        }

        const user = await db.user.findFirst({ where: { id: userId }, include: { groups: true } });

        if (!user) {
            return c.redirect("/auth/login");
        }

        if (requiredPermission && !user.groups.some((group) => group.permissions.includes(requiredPermission))) {
            return c.redirect("/");
        }

        c.set("user", user);
        await next();
    });

export const auth = new Hono();

auth.get("/login", (c) => c.html(<ChooseProviderPage />));
auth.get("/logout", (c) => {
    deleteCookie(c, AUTH_TOKEN_COOKIE_NAME);
    return c.redirect("/");
});

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

        const existingAccount = await db.account.findFirst({
            where: {
                provider: "google",
                emailAddress: providerUser.email,
            },
            include: {
                user: true,
            },
        });

        if (existingAccount) {
            const signedJwt = await sign(
                { userId: existingAccount.user.id, exp: Date.now() + AUTH_TOKEN_LIFETIME * 1000 },
                process.env.JWT_SECRET!
            );

            setCookie(c, AUTH_TOKEN_COOKIE_NAME, signedJwt, {
                expires: new Date(Date.now() + AUTH_TOKEN_LIFETIME * 1000),
            });

            return c.redirect("/");
        }

        const user = await db.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    name: providerUser.name!,
                    primaryEmail: providerUser.email!,
                },
            });

            await tx.account.create({
                data: {
                    provider: "google",
                    providerAccountId: providerUser.id!,
                    emailAddress: providerUser.email!,
                    userId: user.id,
                },
            });

            return user;
        });

        return c.redirect("/");
    }
);

