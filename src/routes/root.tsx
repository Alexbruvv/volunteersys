import { Hono } from "hono";
import { authMiddleware } from "./auth";
import IndexPage from "../app/IndexPage";
import renderPage from "../utils/renderPage";

export const root = new Hono();

root.get("/", authMiddleware(), (c) => renderPage(c, <IndexPage />));

