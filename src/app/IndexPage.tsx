import { useContext } from "hono/jsx";
import type { User } from "../db/schema/auth";
import { UserContext } from "./context";

export default function IndexPage() {
    return (
        <div className="container">
            <h2 className="title is-2">Volunteer system</h2>
        </div>
    );
}

