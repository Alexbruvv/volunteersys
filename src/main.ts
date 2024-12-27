import { Hono } from "hono";
import { root } from "./routes/root";
import { serveStatic } from "hono/bun";
import { auth } from "./routes/auth";
import { groupsAdmin } from "./routes/groupsAdmin";
import { usersAdmin } from "./routes/usersAdmin";

const app = new Hono();
app.use("/static/*", serveStatic({ root: "./" }));
app.route("/", root);
app.route("/auth", auth);
app.route("/admin/users", usersAdmin);
app.route("/admin/groups", groupsAdmin);

export default {
    port: 3000,
    fetch: app.fetch,
};

