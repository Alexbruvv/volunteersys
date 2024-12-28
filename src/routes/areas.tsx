import { Hono } from "hono";
import { authMiddleware } from "./auth";
import { db } from "../db/db";
import renderPage from "../utils/renderPage";
import AreasPage from "../app/areas/AreasPage";
import CreateAreaPage from "../app/areas/CreateAreaPage";
import EditAreaPage from "../app/areas/EditAreaPage";
import DeleteAreaPage from "../app/areas/DeleteAreaPage";

export const areas = new Hono();

areas.get("/new", authMiddleware("CONFIGURE_AREAS"), async (c) => {
    const users = await db.user.findMany();

    return renderPage(c, <CreateAreaPage users={users} />);
});

areas.post("/new", authMiddleware("CONFIGURE_AREAS"), async (c) => {
    const formData = await c.req.formData();

    await db.area.create({
        data: {
            name: formData.get("name")!.toString(),
            description: formData.get("description")!.toString(),
            owners: {
                connect: Array.from(formData.getAll("owners")!).map((id) => ({ id: id.toString() })),
            },
        },
    });

    return c.redirect("/areas");
});

areas.get("/", authMiddleware("CONFIGURE_AREAS"), async (c) => {
    const areas = await db.area.findMany();

    return renderPage(c, <AreasPage areas={areas} />);
});

areas.get("/:id", authMiddleware("CONFIGURE_AREAS"), async (c) => {
    const area = await db.area.findUniqueOrThrow({
        where: {
            id: c.req.param("id"),
        },
        include: { owners: true },
    });
    const users = await db.user.findMany();

    return renderPage(c, <EditAreaPage area={area} users={users} />);
});

areas.post("/:id", authMiddleware("CONFIGURE_AREAS"), async (c) => {
    const formData = await c.req.formData();

    await db.area.update({
        where: {
            id: c.req.param("id"),
        },
        data: {
            name: formData.get("name")!.toString(),
            description: formData.get("description")!.toString(),
            owners: {
                set: Array.from(formData.getAll("owners")!).map((id) => ({ id: id.toString() })),
            },
        },
    });

    return c.redirect("/areas");
});

areas.get("/:id/delete", authMiddleware("CONFIGURE_AREAS"), async (c) => {
    const area = await db.area.findUniqueOrThrow({
        where: {
            id: c.req.param("id"),
        },
    });

    return renderPage(c, <DeleteAreaPage area={area} />);
});

areas.post("/:id/delete", authMiddleware("CONFIGURE_AREAS"), async (c) => {
    await db.area.delete({
        where: {
            id: c.req.param("id"),
        },
    });

    return c.redirect("/areas");
});

