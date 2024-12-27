import type { Group, User } from "@prisma/client";
import { createContext } from "hono/jsx";

export const UserContext = createContext<(User & { groups: Group[] }) | undefined>(undefined);

