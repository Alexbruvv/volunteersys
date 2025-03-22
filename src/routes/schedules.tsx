import { Hono } from "hono";
import { authMiddleware } from "./auth";
import { db } from "../db/db";
import renderPage from "../utils/renderPage";
import SchedulesPage from "../app/schedules/SchedulesPage";
import CreateSchedulePage from "../app/schedules/CreateSchedulePage";
import EditSchedulePage from "../app/schedules/EditSchedulePage";
import { slots } from "./slots";

export const schedules = new Hono();
schedules.route("/", slots);

schedules.get("/", authMiddleware("CONFIGURE_SCHEDULES"), async (c) => {
    const schedules = await db.schedule.findMany({ orderBy: { name: "asc" } });

    return renderPage(c, <SchedulesPage schedules={schedules} />);
});

schedules.get("/new", authMiddleware("CONFIGURE_SCHEDULES"), async (c) => {
    return renderPage(c, <CreateSchedulePage />);
});

schedules.post("/new", authMiddleware("CONFIGURE_SCHEDULES"), async (c) => {
    const formData = await c.req.formData();

    await db.schedule.create({
        data: {
            name: formData.get("name")!.toString(),
        },
    });

    return c.redirect("/schedules");
});

schedules.get("/:id", authMiddleware("CONFIGURE_SCHEDULES"), async (c) => {
    const schedule = await db.schedule.findUnique({
        where: { id: c.req.param("id") },
        include: { slots: { include: { scheduleBlock: true } } },
    });

    if (!schedule) {
        return c.redirect("/schedules");
    }

    return renderPage(c, <EditSchedulePage schedule={schedule} />);
});

schedules.post("/:id", authMiddleware("CONFIGURE_SCHEDULES"), async (c) => {
    const formData = await c.req.formData();

    await db.schedule.update({
        where: { id: c.req.param("id") },
        data: {
            name: formData.get("name")!.toString(),
        },
    });

    return c.redirect("/schedules");
});

