import type { Group, Permission, User } from "@prisma/client";

export function hasPermission(user: User & { groups: Group[] }, permission: Permission) {
    return user.groups.some((group) => group.permissions.includes(permission));
}
