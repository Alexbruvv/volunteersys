import { Hono } from "hono";
import { authMiddleware } from "./auth";
import { db } from "../db/db";
import renderPage from "../utils/renderPage";
import CreateRolePage from "../app/areas/roles/CreateRolePage";
import { areas } from "./areas";
import EditRolePage from "../app/areas/roles/EditRolePage";
import DeleteRolePage from "../app/areas/roles/DeleteRolePage";

export const roles = new Hono().basePath("/:id/roles");

roles.get("/:id/roles/new", authMiddleware("CONFIGURE_AREAS"), async (c) => {
    const area = await db.area.findUniqueOrThrow({
        where: {
            id: c.req.param("id"),
        },
    });

    return renderPage(c, <CreateRolePage area={area} />);
});

roles.post("/:id/roles/new", authMiddleware("CONFIGURE_AREAS"), async (c) => {
    const formData = await c.req.formData();

    await db.role.create({
        data: {
            name: formData.get("name")!.toString(),
            description: formData.get("description")!.toString(),
            guidanceUri: formData.get("guidanceUri")!.toString(),
            area: {
                connect: { id: c.req.param("id") },
            },
        },
    });

    return c.redirect(`/areas/${c.req.param("id")}`);
});

areas.get("/:id/roles/:roleId", authMiddleware("CONFIGURE_AREAS"), async (c) => {
    const role = await db.role.findUniqueOrThrow({
        where: {
            id: c.req.param("roleId"),
        },
        include: { area: true },
    });

    return renderPage(c, <EditRolePage role={role} />);
});

areas.post("/:id/roles/:roleId", authMiddleware("CONFIGURE_AREAS"), async (c) => {
    const formData = await c.req.formData();

    await db.role.update({
        where: {
            id: c.req.param("roleId"),
        },
        data: {
            name: formData.get("name")!.toString(),
            description: formData.get("description")!.toString(),
            guidanceUri: formData.get("guidanceUri")!.toString(),
        },
    });

    return c.redirect(`/areas/${c.req.param("id")}`);
});

areas.get("/:id/roles/:roleId/delete", authMiddleware("CONFIGURE_AREAS"), async (c) => {
    const role = await db.role.findUniqueOrThrow({
        where: {
            id: c.req.param("roleId"),
        },
    });

    return renderPage(c, <DeleteRolePage role={role} />);
});

areas.post("/:id/roles/:roleId/delete", authMiddleware("CONFIGURE_AREAS"), async (c) => {
    await db.role.delete({
        where: {
            id: c.req.param("roleId"),
        },
    });

    return c.redirect(`/areas/${c.req.param("id")}`);
});

