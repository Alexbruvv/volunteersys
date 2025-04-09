import { Hono } from "hono";
import { authMiddleware } from "./auth";
import { db } from "../db/db";
import renderPage from "../utils/renderPage";
import AreasPage from "../app/areas/AreasPage";
import CreateAreaPage from "../app/areas/CreateAreaPage";
import EditAreaPage from "../app/areas/EditAreaPage";
import DeleteAreaPage from "../app/areas/DeleteAreaPage";
import PublicAreaPage from "../app/areas/PublicAreaPage";
import Root from "../app/_layout/Root";
import { roles } from "./roles";
import url from "../utils/url";

export const areas = new Hono();
areas.route("/", roles);

areas.get("/new", authMiddleware("CONFIGURE_AREAS"), async (c) => {
    const users = await db.user.findMany({ orderBy: { name: "asc" } });
    const schedules = await db.schedule.findMany({ orderBy: { name: "asc" } });

    return renderPage(c, <CreateAreaPage users={users} schedules={schedules} />);
});

areas.post("/new", authMiddleware("CONFIGURE_AREAS"), async (c) => {
    const formData = await c.req.formData();

    await db.area.create({
        data: {
            name: formData.get("name")!.toString(),
            description: formData.get("description")!.toString(),
            scheduleId: formData.get("scheduleId")!.toString(),
            owners: {
                connect: Array.from(formData.getAll("owners")!).map((id) => ({ id: id.toString() })),
            },
        },
    });

    return c.redirect(url("/areas"));
});

areas.get("/", authMiddleware("CONFIGURE_AREAS"), async (c) => {
    const areas = await db.area.findMany({
        orderBy: { name: "asc" },
        include: { schedule: true },
    });

    return renderPage(c, <AreasPage areas={areas} />);
});

areas.get("/:id", authMiddleware("CONFIGURE_AREAS"), async (c) => {
    const area = await db.area.findUniqueOrThrow({
        where: {
            id: c.req.param("id"),
        },
        include: { owners: true, roles: true },
    });
    const users = await db.user.findMany();
    const schedules = await db.schedule.findMany();

    return renderPage(c, <EditAreaPage area={area} users={users} schedules={schedules} />);
});

areas.get("/:id/public", async (c) => {
    const area = await db.area.findUniqueOrThrow({
        where: {
            id: c.req.param("id"),
        },
        include: {
            roles:{
                orderBy: {
                    name: 'asc'
                },
                include: {
                    assignments: {
                        include: {
                            volunteer: true
                        }
                    }
                }
            },
            schedule: {
                include: {
                    slots: {
                        orderBy: {startTime: 'asc'}
                    }
                }
            }
        }
    });

    return c.html(<Root><PublicAreaPage area={area} /></Root>);
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
            scheduleId: formData.get("scheduleId")!.toString(),
            owners: {
                set: Array.from(formData.getAll("owners")!).map((id) => ({ id: id.toString() })),
            },
        },
    });

    return c.redirect(url("/areas"));
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

    return c.redirect(url("/areas"));
});

