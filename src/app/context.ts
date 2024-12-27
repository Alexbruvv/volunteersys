import { createContext } from "hono/jsx";
import type { User } from "../db/schema/auth";

export const UserContext = createContext<User | undefined>(undefined);

