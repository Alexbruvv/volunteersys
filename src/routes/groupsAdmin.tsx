import { Hono } from "hono";
import { db } from "../db/db";
import renderPage from "../utils/renderPage";
import GroupsPage from "../app/admin/GroupsPage";
import { authMiddleware } from "./auth";

export const groupsAdmin = new Hono();

groupsAdmin.get("/", authMiddleware(), async (c) => {
    const groups = await db.group.findMany();

    return renderPage(c, <GroupsPage groups={groups} />);
});

