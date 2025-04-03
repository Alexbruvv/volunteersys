import { Hono } from "hono";
import { authMiddleware } from "./auth";
import { db } from "../db/db";
import renderPage from "../utils/renderPage";
import VolunteersPage from "../app/volunteers/VolunteersPage";
import AddVolunteerPage from "../app/volunteers/AddVolunteerPage";
import EditVolunteerPage from "../app/volunteers/EditVolunteerPage";
import DeleteVolunteerPage from "../app/volunteers/DeleteVolunteerPage";
import AssignmentsPage from "../app/volunteers/AssignmentsPage";
import url from "../utils/url";
import SelectRoleAssignmentsAreaPage from "../app/volunteers/SelectRoleAssignmentsAreaPage";
import RoleAssignmentsPage from "../app/volunteers/RoleAssignmentsPage";
import Root from "../app/_layout/Root";
import PublicSchedulePage from "../app/volunteers/PublicSchedulePage";

export const volunteers = new Hono();

volunteers.get("/new", authMiddleware("MANAGE_VOLUNTEERS"), async (c) => {
    return renderPage(c, <AddVolunteerPage />);
});

volunteers.post("/new", authMiddleware("MANAGE_VOLUNTEERS"), async (c) => {
    const formData = await c.req.formData();

    await db.volunteer.create({
        data: {
            name: formData.get("name") as string,
            badgePronouns: formData.get("badgePronouns") as string,
            emailAddress: formData.get("emailAddress") as string,
            notes: formData.get("notes") as string,
        },
    });

    return c.redirect(url("/volunteers"));
});

volunteers.get("/", authMiddleware("MANAGE_VOLUNTEERS"), async (c) => {
    const volunteers = await db.volunteer.findMany();

    return renderPage(c, <VolunteersPage volunteers={volunteers} />);
});

volunteers.get("/assignments", authMiddleware("ASSIGN_VOLUNTEERS"), async (c) => {
    const volunteers = await db.volunteer.findMany({
        orderBy: { name: "asc" },
        include: { assignments: true },
    });
    const scheduleBlocks = await db.scheduleBlock.findMany({ orderBy: { startTime: "asc" } });
    const areas = await db.area.findMany({ orderBy: { name: "asc" } });

    return renderPage(c, <AssignmentsPage volunteers={volunteers} scheduleBlocks={scheduleBlocks} areas={areas} />);
});

volunteers.post("/assignments", authMiddleware("ASSIGN_VOLUNTEERS"), async (c) => {
    const data = await c.req.json();

    if (data.queuedUpdates) {
        for (const update of data.queuedUpdates) {
            if (update.areaId === "") {
                await db.scheduleBlockAssignment.deleteMany({
                    where: {
                        volunteerId: update.volunteerId,
                        scheduleBlockId: update.scheduleBlockId,
                    },
                });

                continue;
            }

            const existingAssignment = await db.scheduleBlockAssignment.findFirst({
                where: {
                    volunteerId: update.volunteerId,
                    scheduleBlockId: update.scheduleBlockId,
                },
            });

            if (existingAssignment) {
                await db.scheduleBlockAssignment.update({
                    where: {
                        id: existingAssignment.id,
                    },
                    data: {
                        areaId: update.areaId,
                    },
                });
            } else {
                await db.scheduleBlockAssignment.create({
                    data: {
                        volunteerId: update.volunteerId,
                        scheduleBlockId: update.scheduleBlockId,
                        areaId: update.areaId,
                    },
                });
            }
        }
    }

    return c.json({ success: true });
});

volunteers.get("/role-assignments", authMiddleware("ASSIGN_VOLUNTEERS"), async (c) => {
    const areas = await db.area.findMany({ orderBy: { name: "asc" } });

    return renderPage(c, <SelectRoleAssignmentsAreaPage areas={areas} />);
});

volunteers.get("/role-assignments/:areaId", authMiddleware("ASSIGN_VOLUNTEERS"), async (c) => {
    const area = await db.area.findUniqueOrThrow({
        where: { id: c.req.param("areaId") },
        include: {
            schedule: {
                include: {
                    slots: {
                        orderBy: { startTime: "asc" },
                    },
                },
            },
            assignments: true,
            roles: true,
            owners: true,
        },
    });

    const volunteers = (
        await db.volunteer.findMany({
            orderBy: { name: "asc" },
            include: {
                slotAssignments: true,
            },
        })
    ).filter((v) => {
        return area.assignments.some((a) => a.volunteerId === v.id);
    });

    return renderPage(c, <RoleAssignmentsPage area={area} volunteers={volunteers} />);
});

volunteers.post("/role-assignments/:areaId", authMiddleware("ASSIGN_VOLUNTEERS"), async (c) => {
    const data = await c.req.json();

    if (data.queuedUpdates) {
        for (const update of data.queuedUpdates) {
            if (update.roleId === "") {
                await db.scheduleSlotAssignment.deleteMany({
                    where: {
                        volunteerId: update.volunteerId,
                        scheduleSlotId: update.scheduleSlotId,
                    },
                });

                continue;
            }

            const existingAssignment = await db.scheduleSlotAssignment.findFirst({
                where: {
                    volunteerId: update.volunteerId,
                    scheduleSlotId: update.scheduleSlotId,
                },
            });

            if (existingAssignment) {
                await db.scheduleSlotAssignment.update({
                    where: {
                        id: existingAssignment.id,
                    },
                    data: {
                        roleId: update.roleId,
                    },
                });
            } else {
                await db.scheduleSlotAssignment.create({
                    data: {
                        volunteerId: update.volunteerId,
                        scheduleSlotId: update.scheduleSlotId,
                        roleId: update.roleId,
                    },
                });
            }
        }
    }

    return c.json({ success: true });
});

volunteers.get("/:id/public", async (c) => {
    const volunteer = await db.volunteer.findUniqueOrThrow({
        include: {
            assignments: {
                include: {
                    area: true,
                    scheduleBlock: {
                        include: {
                            slots: true,
                        },
                    },
                },
                orderBy: {
                    scheduleBlock: {
                        startTime: "asc",
                    },
                },
            },
            slotAssignments: {
                include: {
                    role: true,
                },
            },
        },
        where: {
            id: c.req.param("id"),
        },
    });

    return c.html(
        <Root>
            <PublicSchedulePage volunteer={volunteer} />
        </Root>
    );
});

volunteers.get("/:id", authMiddleware("MANAGE_VOLUNTEERS"), async (c) => {
    const volunteer = await db.volunteer.findUniqueOrThrow({
        include: {
            assignments: {
                include: {
                    area: true,
                    scheduleBlock: {
                        include: {
                            slots: true,
                        },
                    },
                },
                orderBy: {
                    scheduleBlock: {
                        startTime: "asc",
                    },
                },
            },
            slotAssignments: {
                include: {
                    role: true,
                },
            },
        },
        where: {
            id: c.req.param("id"),
        },
    });

    return renderPage(c, <EditVolunteerPage volunteer={volunteer} />);
});

volunteers.post("/:id", authMiddleware("MANAGE_VOLUNTEERS"), async (c) => {
    const formData = await c.req.formData();

    await db.volunteer.update({
        where: {
            id: c.req.param("id"),
        },
        data: {
            name: formData.get("name") as string,
            badgePronouns: formData.get("badgePronouns") as string,
            emailAddress: formData.get("emailAddress") as string,
            notes: formData.get("notes") as string,
        },
    });

    return c.redirect(url("/volunteers"));
});

volunteers.get("/:id/delete", authMiddleware("MANAGE_VOLUNTEERS"), async (c) => {
    const volunteer = await db.volunteer.findUniqueOrThrow({
        where: {
            id: c.req.param("id"),
        },
    });

    return renderPage(c, <DeleteVolunteerPage volunteer={volunteer} />);
});

volunteers.post("/:id/delete", authMiddleware("MANAGE_VOLUNTEERS"), async (c) => {
    await db.volunteer.delete({
        where: {
            id: c.req.param("id"),
        },
    });

    return c.redirect(url("/volunteers"));
});

