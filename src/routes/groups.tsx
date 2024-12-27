import { Hono } from "hono";
import { db } from "../db/db";
import renderPage from "../utils/renderPage";
import GroupsPage from "../app/admin/groups/GroupsPage";
import { authMiddleware } from "./auth";
import EditGroupPage from "../app/admin/groups/EditGroupPage";
import type { Permission } from "@prisma/client";
import CreateGroupPage from "../app/admin/groups/CreateGroupPage";
import DeleteGroupPage from "../app/admin/groups/DeleteGroupPage";

export const groups = new Hono();

groups.get("/new", authMiddleware("MANAGE_GROUPS"), async (c) => {
    return renderPage(c, <CreateGroupPage />);
});

groups.post("/new", authMiddleware("MANAGE_GROUPS"), async (c) => {
    const data = await c.req.formData();

    await db.group.create({
        data: {
            name: data.get("name")!.toString(),
            permissions: data.getAll("permissions").map((p) => p.toString() as Permission),
        },
    });

    return c.redirect(`/groups`);
});

groups.get("/", authMiddleware("MANAGE_GROUPS"), async (c) => {
    const groups = await db.group.findMany();

    return renderPage(c, <GroupsPage groups={groups} />);
});

groups.get("/:id", authMiddleware("MANAGE_GROUPS"), async (c) => {
    const group = await db.group.findFirstOrThrow({ where: { id: c.req.param("id") } });

    return renderPage(c, <EditGroupPage group={group} />);
});

groups.post("/:id", authMiddleware("MANAGE_GROUPS"), async (c) => {
    const data = await c.req.formData();

    await db.group.update({
        where: { id: c.req.param("id") },
        data: {
            name: data.get("name")?.toString(),
            permissions: data.getAll("permissions").map((p) => p.toString() as Permission),
        },
    });

    return c.redirect(`/groups`);
});

groups.get("/:id/delete", authMiddleware("MANAGE_GROUPS"), async (c) => {
    const group = await db.group.findFirstOrThrow({ where: { id: c.req.param("id") } });

    return renderPage(c, <DeleteGroupPage group={group} />);
});

groups.post("/:id/delete", authMiddleware("MANAGE_GROUPS"), async (c) => {
    await db.group.delete({
        where: { id: c.req.param("id") },
    });

    return c.redirect("/groups");
});

