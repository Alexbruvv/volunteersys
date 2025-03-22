import { Fragment, useContext } from "hono/jsx";
import { UserContext } from "../context";
import type { Permission } from "@prisma/client";
import { hasPermission } from "../../utils/permissions";
import url from "../../utils/url";

const ATTENDANCE_PERMISSIONS: Permission[] = ["CONFIGURE_ATTENDANCE_SHEETS", "RECORD_ATTENDANCE"];
const VOLUNTEERS_PERMISSIONS: Permission[] = ["MANAGE_VOLUNTEERS"];
const CONFIG_PERMISSIONS: Permission[] = ["CONFIGURE_AREAS", "CONFIGURE_SCHEDULE_BLOCKS", "CONFIGURE_SCHEDULES"];
const SYSTEM_PERMISSIONS: Permission[] = ["MANAGE_USERS", "MANAGE_GROUPS"];

export default function Navbar() {
    const user = useContext(UserContext);

    if (!user) {
        throw new Error("User not found in context");
    }

    return (
        <nav className="navbar is-warning mb-5" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href={url("/")}>
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
                    <a href={url("/")} className="navbar-item">
                        Home
                    </a>

                    {ATTENDANCE_PERMISSIONS.some((permission) => hasPermission(user, permission)) && (
                        <a href={url("/attendance")} className="navbar-item">
                            Attendance
                        </a>
                    )}

                    {VOLUNTEERS_PERMISSIONS.some((permission) => hasPermission(user, permission)) && (
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">Volunteers</a>

                            <div className="navbar-dropdown">
                                {hasPermission(user, "MANAGE_VOLUNTEERS") && (
                                    <a href={url("/volunteers")} className="navbar-item">
                                        Volunteers
                                    </a>
                                )}
                                {hasPermission(user, "ASSIGN_VOLUNTEERS") && (
                                    <a href={url("/volunteers/assignments")} className="navbar-item">
                                        Assignments
                                    </a>
                                )}
                            </div>
                        </div>
                    )}

                    {CONFIG_PERMISSIONS.some((permission) => hasPermission(user, permission)) && (
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">Config</a>

                            <div className="navbar-dropdown">
                                {hasPermission(user, "CONFIGURE_AREAS") && (
                                    <a href={url("/areas")} className="navbar-item">
                                        Areas
                                    </a>
                                )}
                                {hasPermission(user, "CONFIGURE_SCHEDULE_BLOCKS") && (
                                    <a href={url("/schedule-blocks")} className="navbar-item">
                                        Schedule blocks
                                    </a>
                                )}
                                {hasPermission(user, "CONFIGURE_SCHEDULES") && (
                                    <a href={url("/schedules")} className="navbar-item">
                                        Schedules
                                    </a>
                                )}
                            </div>
                        </div>
                    )}

                    {SYSTEM_PERMISSIONS.some((permission) => hasPermission(user, permission)) && (
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">System</a>

                            <div className="navbar-dropdown">
                                {hasPermission(user, "MANAGE_USERS") && (
                                    <a href={url("/users")} className="navbar-item">
                                        Users
                                    </a>
                                )}

                                {hasPermission(user, "MANAGE_GROUPS") && (
                                    <a href={url("/groups")} className="navbar-item">
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
                            <a href={url("/auth/logout")} className="navbar-item">
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

