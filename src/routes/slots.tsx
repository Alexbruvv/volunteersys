import { Hono } from "hono";
import { authMiddleware } from "./auth";
import renderPage from "../utils/renderPage";
import CreateSlotPage from "../app/schedules/slots/CreateSlotPage";
import { db } from "../db/db";
import EditSlotPage from "../app/schedules/slots/EditSlotPage";
import DeleteSlotPage from "../app/schedules/slots/DeleteSlotPage";
import url from "../utils/url";

export const slots = new Hono();

slots.get("/:id/slots/new", authMiddleware("CONFIGURE_SCHEDULES"), async (c) => {
    const schedule = await db.schedule.findUnique({
        where: { id: c.req.param("id") },
    });

    const blocks = await db.scheduleBlock.findMany({ orderBy: { startTime: "asc" } });

    if (!schedule) {
        return c.redirect(url("/schedules"));
    }

    return renderPage(c, <CreateSlotPage schedule={schedule} blocks={blocks} />);
});

slots.post("/:id/slots/new", authMiddleware("CONFIGURE_SCHEDULES"), async (c) => {
    const formData = await c.req.formData();

    await db.scheduleSlot.create({
        data: {
            name: formData.get("name")!.toString(),
            startTime: new Date(formData.get("startTime")!.toString()),
            endTime: new Date(formData.get("endTime")!.toString()),
            scheduleId: c.req.param("id"),
            scheduleBlockId: formData.get("block")!.toString(),
        },
    });

    return c.redirect(url("/schedules/:id", { id: c.req.param("id") }));
});

slots.get("/:id/slots/:slotId", authMiddleware("CONFIGURE_SCHEDULES"), async (c) => {
    const slot = await db.scheduleSlot.findUnique({
        where: { id: c.req.param("slotId") },
        include: { schedule: true },
    });

    if (!slot) {
        return c.redirect(url("/schedules/:id", { id: c.req.param("id") }));
    }

    const blocks = await db.scheduleBlock.findMany();

    return renderPage(c, <EditSlotPage slot={slot} blocks={blocks} />);
});

slots.post("/:id/slots/:slotId", authMiddleware("CONFIGURE_SCHEDULES"), async (c) => {
    const formData = await c.req.formData();

    await db.scheduleSlot.update({
        where: {
            id: c.req.param("slotId"),
        },
        data: {
            name: formData.get("name")!.toString(),
            startTime: new Date(formData.get("startTime")!.toString()),
            endTime: new Date(formData.get("endTime")!.toString()),
            scheduleBlockId: formData.get("block")!.toString(),
        },
    });

    return c.redirect(url("/schedules/:id", { id: c.req.param("id") }));
});

slots.get("/:id/slots/:slotId/delete", authMiddleware("CONFIGURE_SCHEDULES"), async (c) => {
    const slot = await db.scheduleSlot.findUnique({
        where: { id: c.req.param("slotId") },
        include: { schedule: true },
    });

    if (!slot) {
        return c.redirect(url("/schedules/:id", { id: c.req.param("id") }));
    }

    return renderPage(c, <DeleteSlotPage slot={slot} />);
});

slots.post("/:id/slots/:slotId/delete", authMiddleware("CONFIGURE_SCHEDULES"), async (c) => {
    await db.scheduleSlot.delete({
        where: {
            id: c.req.param("slotId"),
        },
    });

    return c.redirect(url("/schedules/:id", { id: c.req.param("id") }));
});

