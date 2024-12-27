import { useContext } from "hono/jsx";
import { UserContext } from "../context";
import type { Permission } from "@prisma/client";

const ATTENDANCE_PERMISSIONS: Set<Permission> = new Set(["CONFIGURE_ATTENDANCE_SHEETS", "RECORD_ATTENDANCE"]);
const SYSTEM_PERMISSIONS: Set<Permission> = new Set(["MANAGE_USERS", "MANAGE_GROUPS"]);

export default function Navbar() {
    const user = useContext(UserContext);

    if (!user) {
        throw new Error("User not found in context");
    }

    return (
        <nav className="navbar is-primary mb-5" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <b>Volunteer System</b>
                </a>

                <a
                    role="button"
                    className="navbar-burger"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="nav-main"
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="nav-main" className="navbar-menu">
                <div className="navbar-start">
                    <a href="/" className="navbar-item">
                        Home
                    </a>

                    {user.groups.some((group) => group.permissions.some((p) => ATTENDANCE_PERMISSIONS.has(p))) && (
                        <a href="/attendance" className="navbar-item">
                            Attendance
                        </a>
                    )}

                    {user.groups.some((group) => group.permissions.some((p) => SYSTEM_PERMISSIONS.has(p))) && (
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">System</a>

                            <div className="navbar-dropdown">
                                {user.groups.some((group) => group.permissions.some((p) => p === "MANAGE_USERS")) && (
                                    <a href="/users" className="navbar-item">
                                        Users
                                    </a>
                                )}

                                {user.groups.some((group) => group.permissions.some((p) => p === "MANAGE_GROUPS")) && (
                                    <a href="/groups" className="navbar-item">
                                        Groups
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="navbar-end">
                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">{user.name}</a>

                        <div className="navbar-dropdown">
                            <a href="/auth/logout" className="navbar-item">
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

