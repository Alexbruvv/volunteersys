import { Hono } from "hono";
import AppLayout from "../app/_layout/AppLayout";

export const root = new Hono();

root.get("/", (c) => c.html(<AppLayout />));

