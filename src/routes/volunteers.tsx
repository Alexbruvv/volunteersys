import { Hono } from "hono";
import { authMiddleware } from "./auth";
import { db } from "../db/db";
import renderPage from "../utils/renderPage";
import VolunteersPage from "../app/volunteers/VolunteersPage";
import AddVolunteerPage from "../app/volunteers/AddVolunteerPage";
import EditVolunteerPage from "../app/volunteers/EditVolunteerPage";
import DeleteVolunteerPage from "../app/volunteers/DeleteVolunteerPage";

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
            consActiveRoles: parseInt(formData.get("consActiveRoles") as string),
            consKitKnowledge: parseInt(formData.get("consKitKnowledge") as string),
            consLongShifts: parseInt(formData.get("consLongShifts") as string),
            consQuietRoles: parseInt(formData.get("consQuietRoles") as string),
            consPublicSpeaking: formData.get("consPublicSpeaking") === "true",
            consMissFinals: formData.get("consMissFinals") === "true",
        },
    });

    return c.redirect("/volunteers");
});

volunteers.get("/", authMiddleware("MANAGE_VOLUNTEERS"), async (c) => {
    const volunteers = await db.volunteer.findMany();

    return renderPage(c, <VolunteersPage volunteers={volunteers} />);
});

volunteers.get("/:id", authMiddleware("MANAGE_VOLUNTEERS"), async (c) => {
    const volunteer = await db.volunteer.findUniqueOrThrow({
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
            consActiveRoles: parseInt(formData.get("consActiveRoles") as string),
            consKitKnowledge: parseInt(formData.get("consKitKnowledge") as string),
            consLongShifts: parseInt(formData.get("consLongShifts") as string),
            consQuietRoles: parseInt(formData.get("consQuietRoles") as string),
            consPublicSpeaking: formData.get("consPublicSpeaking") === "true",
            consMissFinals: formData.get("consMissFinals") === "true",
        },
    });

    return c.redirect("/volunteers");
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

    return c.redirect("/volunteers");
});

