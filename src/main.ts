import { Hono } from "hono";
import { root } from "./routes/root";
import { serveStatic } from "hono/bun";
import { auth } from "./routes/auth";

const app = new Hono();
app.use("/static/*", serveStatic({ root: "./" }));
app.route("/", root);
app.route("/", auth);

export default {
    port: 3000,
    fetch: app.fetch,
};

