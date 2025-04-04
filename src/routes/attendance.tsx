import { Hono } from "hono";
import { db } from "../db/db";
import renderPage from "../utils/renderPage";
import AttendanceSheetsPage from "../app/attendance/AttendanceSheetsPage";
import { authMiddleware } from "./auth";
import CreateAttendanceSheetPage from "../app/attendance/CreateAttendanceSheetPage";
import RecordAttendancePage from "../app/attendance/RecordAttendancePage";
import EditAttendanceSheetPage from "../app/attendance/EditAttendanceSheetPage";
import DeleteAttendanceSheetPage from "../app/attendance/DeleteAttendanceSheetPage";
import url from "../utils/url";

export const attendance = new Hono();

attendance.get("/new", authMiddleware("CONFIGURE_ATTENDANCE_SHEETS"), async (c) => {
    return renderPage(c, <CreateAttendanceSheetPage />);
});

attendance.post("/new", authMiddleware("CONFIGURE_ATTENDANCE_SHEETS"), async (c) => {
    const formData = await c.req.formData();

    await db.attendanceSheet.create({
        data: {
            name: formData.get("name")!.toString(),
            startDate: new Date(formData.get("startDate")!.toString()),
        },
    });

    return c.redirect(url("/attendance"));
});

attendance.get("/", authMiddleware("RECORD_ATTENDANCE", "CONFIGURE_ATTENDANCE_SHEETS"), async (c) => {
    const sheets = await db.attendanceSheet.findMany({ orderBy: { startDate: "asc" } });

    return renderPage(c, <AttendanceSheetsPage sheets={sheets} />);
});

attendance.get("/:id", authMiddleware("CONFIGURE_ATTENDANCE_SHEETS"), async (c) => {
    const sheet = await db.attendanceSheet.findFirstOrThrow({
        where: { id: c.req.param("id") },
    });

    return renderPage(c, <EditAttendanceSheetPage attendanceSheet={sheet} />);
});

attendance.post("/:id", authMiddleware("CONFIGURE_ATTENDANCE_SHEETS"), async (c) => {
    const formData = await c.req.formData();

    await db.attendanceSheet.update({
        where: { id: c.req.param("id") },
        data: {
            name: formData.get("name")!.toString(),
            startDate: new Date(formData.get("startDate")!.toString()),
        },
    });

    return c.redirect(url("/attendance"));
});

attendance.get("/:id/record", authMiddleware("RECORD_ATTENDANCE"), async (c) => {
    const sheet = await db.attendanceSheet.findFirstOrThrow({
        where: { id: c.req.param("id") },
        include: { volunteers: { orderBy: { name: "asc" } } },
    });
    const volunteers = await db.volunteer.findMany();

    return renderPage(c, <RecordAttendancePage sheet={sheet} volunteers={volunteers} />);
});

attendance.get("/:id/toggle", authMiddleware("RECORD_ATTENDANCE"), async (c) => {
    const volunteerId = c.req.query()["volunteerId"] as string;

    const sheet = await db.attendanceSheet.findFirstOrThrow({
        where: { id: c.req.param("id") },
        include: {
            volunteers: {
                orderBy: { name: "asc" },
            },
        },
    });

    if (sheet.volunteers.some((v) => v.id === volunteerId)) {
        await db.attendanceSheet.update({
            where: { id: c.req.param("id") },
            data: {
                volunteers: {
                    disconnect: { id: volunteerId },
                },
            },
        });
    } else {
        await db.attendanceSheet.update({
            where: { id: c.req.param("id") },
            data: {
                volunteers: {
                    connect: { id: volunteerId },
                },
            },
        });
    }

    return c.redirect(url("/attendance/:id/record", { id: c.req.param("id") }));
});

attendance.get("/:id/delete", authMiddleware("CONFIGURE_ATTENDANCE_SHEETS"), async (c) => {
    const sheet = await db.attendanceSheet.findFirstOrThrow({
        where: { id: c.req.param("id") },
    });

    return renderPage(c, <DeleteAttendanceSheetPage attendanceSheet={sheet} />);
});

attendance.post("/:id/delete", authMiddleware("CONFIGURE_ATTENDANCE_SHEETS"), async (c) => {
    await db.attendanceSheet.delete({
        where: { id: c.req.param("id") },
    });

    return c.redirect(url("/attendance"));
});

