import { Hono } from "hono";
import { root } from "./routes/root";
import { serveStatic } from "hono/bun";
import { auth } from "./routes/auth";
import { groups } from "./routes/groups";
import { users } from "./routes/users";
import { attendance } from "./routes/attendance";

const app = new Hono();
app.use("/static/*", serveStatic({ root: "./" }));
app.route("/", root);
app.route("/auth", auth);
app.route("/users", users);
app.route("/groups", groups);
app.route("/attendance", attendance);

export default {
    port: 3000,
    fetch: app.fetch,
};

