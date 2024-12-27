import type { Context } from "hono";
import AppLayout from "../app/_layout/AppLayout";
import type { User } from "../db/schema/auth";
import { UserContext } from "../app/context";
import type { HtmlEscapedString } from "hono/utils/html";

type Element = HtmlEscapedString | Promise<HtmlEscapedString>;

export default function renderPage(
    context: Context<{
        Variables: {
            user: User;
        };
    }>,
    page: Element
) {
    return context.html(
        <UserContext.Provider value={context.get("user")}>
            <AppLayout>{page}</AppLayout>
        </UserContext.Provider>
    );
}

