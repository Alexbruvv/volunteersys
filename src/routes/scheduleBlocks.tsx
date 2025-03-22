import { Hono } from "hono";
import { authMiddleware } from "./auth";
import { db } from "../db/db";
import renderPage from "../utils/renderPage";
import ScheduleBlocksPage from "../app/scheduleBlocks/ScheduleBlocksPage";
import CreateScheduleBlockPage from "../app/scheduleBlocks/CreateScheduleBlockPage";
import EditScheduleBlockPage from "../app/scheduleBlocks/EditScheduleBlockPage";
import DeleteScheduleBlockPage from "../app/scheduleBlocks/DeleteScheduleBlockPage";
import url from "../utils/url";

export const scheduleBlocks = new Hono();

scheduleBlocks.get("/new", authMiddleware("CONFIGURE_SCHEDULE_BLOCKS"), async (c) => {
    return renderPage(c, <CreateScheduleBlockPage />);
});

scheduleBlocks.post("/new", authMiddleware("CONFIGURE_SCHEDULE_BLOCKS"), async (c) => {
    const formData = await c.req.formData();

    await db.scheduleBlock.create({
        data: {
            name: formData.get("name")!.toString(),
            startTime: new Date(formData.get("startTime")!.toString()),
            endTime: new Date(formData.get("endTime")!.toString()),
        },
    });

    return c.redirect(url("/schedule-blocks"));
});

scheduleBlocks.get("/", authMiddleware("CONFIGURE_SCHEDULE_BLOCKS"), async (c) => {
    const scheduleBlocks = await db.scheduleBlock.findMany({
        orderBy: {
            startTime: "asc",
        },
    });

    return renderPage(c, <ScheduleBlocksPage scheduleBlocks={scheduleBlocks} />);
});

scheduleBlocks.get("/:id", authMiddleware("CONFIGURE_SCHEDULE_BLOCKS"), async (c) => {
    const scheduleBlock = await db.scheduleBlock.findUniqueOrThrow({
        where: {
            id: c.req.param("id"),
        },
    });

    return renderPage(c, <EditScheduleBlockPage scheduleBlock={scheduleBlock} />);
});

scheduleBlocks.post("/:id", authMiddleware("CONFIGURE_SCHEDULE_BLOCKS"), async (c) => {
    const formData = await c.req.formData();

    await db.scheduleBlock.update({
        where: {
            id: c.req.param("id"),
        },
        data: {
            name: formData.get("name")!.toString(),
            startTime: new Date(formData.get("startTime")!.toString()),
            endTime: new Date(formData.get("endTime")!.toString()),
        },
    });

    return c.redirect(url("/schedule-blocks"));
});

scheduleBlocks.get("/:id/delete", authMiddleware("CONFIGURE_SCHEDULE_BLOCKS"), async (c) => {
    const scheduleBlock = await db.scheduleBlock.findUniqueOrThrow({
        where: {
            id: c.req.param("id"),
        },
    });

    return renderPage(c, <DeleteScheduleBlockPage scheduleBlock={scheduleBlock} />);
});

scheduleBlocks.post("/:id/delete", authMiddleware("CONFIGURE_SCHEDULE_BLOCKS"), async (c) => {
    await db.scheduleBlock.delete({
        where: {
            id: c.req.param("id"),
        },
    });

    return c.redirect(url("/schedule-blocks"));
});

