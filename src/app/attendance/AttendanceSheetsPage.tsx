import type { AttendanceSheet } from "@prisma/client";
import { useContext } from "hono/jsx";
import { UserContext } from "../context";
import { hasPermission } from "../../utils/permissions";
import { DateTime } from "luxon";
import { Fragment } from "hono/jsx";
import url from "../../utils/url";

export default function AttendanceSheetsPage({ sheets }: { sheets: AttendanceSheet[] }) {
    const user = useContext(UserContext);

    if (!user) {
        throw new Error("User not found in context");
    }

    return (
        <div className="container">
            <h3 className="title is-3">
                Attendance sheets
                {hasPermission(user, "CONFIGURE_ATTENDANCE_SHEETS") && (
                    <a href={url("/attendance/new")} className="button is-primary is-pulled-right">
                        Create attendance sheet
                    </a>
                )}
            </h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            Attendance sheets
                        </a>
                    </li>
                </ul>
            </nav>

            <table className="table is-fullwidth is-striped is-hoverable">
                <thead>
                    <tr>
                        <th style="width: 30%">Name</th>
                        <th style="width: 50%">Start date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sheets.map((sheet) => (
                        <tr>
                            <td>{sheet.name}</td>
                            <td>{DateTime.fromJSDate(sheet.startDate).toLocaleString(DateTime.DATETIME_FULL)}</td>
                            <td>
                                {new Date() >= sheet.startDate && (
                                    <a href={url(`/attendance/${sheet.id}/record`)} className="has-text-primary">
                                        Record
                                    </a>
                                )}
                                {hasPermission(user, "CONFIGURE_ATTENDANCE_SHEETS") && (
                                    <Fragment>
                                        {new Date() >= sheet.startDate && " | "}
                                        <a href={url(`/attendance/${sheet.id}`)}>View/edit</a>
                                        {" | "}
                                        <a href={url(`/attendance/${sheet.id}/delete`)} className="has-text-danger">
                                            Delete
                                        </a>
                                    </Fragment>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

