import { Hono } from "hono";
import { db } from "../db/db";
import renderPage from "../utils/renderPage";
import GroupsPage from "../app/admin/GroupsPage";
import { authMiddleware } from "./auth";
import EditGroupPage from "../app/admin/EditGroupPage";
import type { Permission } from "@prisma/client";
import CreateGroupPage from "../app/admin/CreateGroupPage";

export const groupsAdmin = new Hono();

groupsAdmin.get("/new", authMiddleware("MANAGE_GROUPS"), async (c) => {
    return renderPage(c, <CreateGroupPage />);
});

groupsAdmin.post("/new", authMiddleware("MANAGE_GROUPS"), async (c) => {
    const data = await c.req.formData();

    await db.group.create({
        data: {
            name: data.get("name")!.toString(),
            permissions: data.getAll("permissions").map((p) => p.toString() as Permission),
        },
    });

    return c.redirect(`/admin/groups`);
});

groupsAdmin.get("/", authMiddleware("MANAGE_GROUPS"), async (c) => {
    const groups = await db.group.findMany();

    return renderPage(c, <GroupsPage groups={groups} />);
});

groupsAdmin.get("/:id", authMiddleware("MANAGE_GROUPS"), async (c) => {
    const group = await db.group.findFirstOrThrow({ where: { id: c.req.param("id") } });

    return renderPage(c, <EditGroupPage group={group} />);
});

groupsAdmin.post("/:id", authMiddleware("MANAGE_GROUPS"), async (c) => {
    const data = await c.req.formData();

    await db.group.update({
        where: { id: c.req.param("id") },
        data: {
            name: data.get("name")?.toString(),
            permissions: data.getAll("permissions").map((p) => p.toString() as Permission),
        },
    });

    return c.redirect(`/admin/groups`);
});

