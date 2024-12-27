import type { User } from "@prisma/client";
import { createContext } from "hono/jsx";

export const UserContext = createContext<User | undefined>(undefined);

