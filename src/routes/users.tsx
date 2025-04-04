import { Hono } from "hono";
import { authMiddleware } from "./auth";
import { db } from "../db/db";
import renderPage from "../utils/renderPage";
import UsersPage from "../app/users/UsersPage";
import EditUserPage from "../app/users/EditUserPage";
import DeleteUserPage from "../app/users/DeleteUserPage";
import url from "../utils/url";

export const users = new Hono();

users.get("/", authMiddleware("MANAGE_USERS"), async (c) => {
    const users = await db.user.findMany({ include: { groups: true }, orderBy: { name: "asc" } });

    return renderPage(c, <UsersPage users={users} />);
});

users.get("/:id", authMiddleware("MANAGE_USERS"), async (c) => {
    const user = await db.user.findFirstOrThrow({ where: { id: c.req.param("id") }, include: { groups: true } });
    const groups = await db.group.findMany({ orderBy: { name: "asc" } });

    return renderPage(c, <EditUserPage user={user} groups={groups} />);
});

users.post("/:id", authMiddleware("MANAGE_USERS"), async (c) => {
    const formData = await c.req.formData();

    const groups = formData.getAll("groups").map((g) => g.toString());

    await db.user.update({
        where: { id: c.req.param("id") },
        data: {
            groups: {
                set: groups.map((id) => ({ id })),
            },
        },
    });

    return c.redirect(url("/users"));
});

users.get("/:id/delete", authMiddleware("MANAGE_USERS"), async (c) => {
    const user = await db.user.findFirstOrThrow({ where: { id: c.req.param("id") } });

    return renderPage(c, <DeleteUserPage user={user} />);
});

users.post("/:id/delete", authMiddleware("MANAGE_USERS"), async (c) => {
    await db.user.delete({ where: { id: c.req.param("id") } });

    return c.redirect(url("/users"));
});

