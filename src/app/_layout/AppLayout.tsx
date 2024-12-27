import type { PropsWithChildren } from "hono/jsx";
import Root from "./Root";
import Navbar from "./Navbar";

export default function AppLayout({ children }: PropsWithChildren) {
    return (
        <Root>
            <Navbar />
            {children}
        </Root>
    );
}

