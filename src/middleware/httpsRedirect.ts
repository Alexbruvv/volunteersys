import { createMiddleware } from "hono/factory";

export const httpsRedirect = () =>
    createMiddleware(async (c, next) => {
        const forwardedProto = c.req.header(`X-Forwarded-Proto`);

        if (forwardedProto === "https") {
            return c.redirect(c.req.url.replace(/^http:/, "https:"));
        }

        return next();
    });

