import { Hono } from "hono";
import { root } from "./routes/root";
import { serveStatic } from "hono/bun";
import { auth } from "./routes/auth";
import { groups } from "./routes/groups";
import { users } from "./routes/users";
import { attendance } from "./routes/attendance";
import { volunteers } from "./routes/volunteers";
import { areas } from "./routes/areas";
import { errorPage } from "./app/_layout/ErrorPage";
import { scheduleBlocks } from "./routes/scheduleBlocks";
import { Settings } from "luxon";
import { schedules } from "./routes/schedules";
import { trimTrailingSlash } from "hono/trailing-slash";
import { httpsRedirect } from "./middleware/httpsRedirect";

process.env.TZ = "Europe/London";

Settings.defaultZone = "Europe/London";
Settings.defaultLocale = "en-GB";

const app = new Hono().basePath(Bun.env.BASE_PATH ?? "/");
app.use(trimTrailingSlash());
app.use(httpsRedirect());
app.use("/static/*", serveStatic({ root: "./" }));
app.route("/", root);
app.route("/auth", auth);
app.route("/attendance", attendance);
app.route("/volunteers", volunteers);
app.route("/areas", areas);
app.route("/schedule-blocks", scheduleBlocks);
app.route("/schedules", schedules);
app.route("/users", users);
app.route("/groups", groups);

app.onError((err, c) => {
    return c.html(errorPage(err.message));
});

export default {
    port: process.env.PORT ?? 3000,
    fetch: app.fetch,
};

