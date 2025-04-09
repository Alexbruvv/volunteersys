import type { PropsWithChildren } from "hono/jsx";
import url from "../../utils/url";

export default function Root({ children }: PropsWithChildren) {
    return (
        <html>
            <head>
                <title>Volunteer System</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css"></link>
            </head>
            <body>{children}</body>
            <script src={url("/static/navbar.js")}></script>
        </html>
    );
}

