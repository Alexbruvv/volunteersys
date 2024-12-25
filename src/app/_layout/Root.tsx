import type { PropsWithChildren } from "hono/jsx";

export default function Root({ children }: PropsWithChildren) {
    return (
        <html>
            <head>
                <title>Volunteer System</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css"></link>
            </head>
            <body>{children}</body>
            <script src="/static/navbar.js"></script>
        </html>
    );
}

