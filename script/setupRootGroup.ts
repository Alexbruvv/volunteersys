/*
This creates a root group with access to update its own permissions, and sets
all users to be in this group.

This script should be run once after the database has been created.
*/

import { db } from "../src/db/db";

const group = await db.group.create({
    data: {
        name: "Root",
        permissions: ["MANAGE_GROUPS", "MANAGE_USERS"],
    },
});

console.log(`Created root group with ID ${group.id}`);

const users = await db.user.findMany();

for (const user of users) {
    await db.user.update({
        where: { id: user.id },
        data: {
            groups: {
                set: [{ id: group.id }],
            },
        },
    });

    console.log(`Added user ${user.id} (${user.primaryEmail}) to root group`);
}

