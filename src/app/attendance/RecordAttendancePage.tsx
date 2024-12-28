import type { AttendanceSheet, Volunteer } from "@prisma/client";

export default function RecordAttendancePage({
    sheet,
    volunteers,
}: {
    sheet: AttendanceSheet & { volunteers: Volunteer[] };
    volunteers: Volunteer[];
}) {
    return (
        <div className="container">
            <h3 className="title is-3">Attendance Sheet - {sheet.name}</h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li>
                        <a href="/attendance">Attendance sheets</a>
                    </li>
                    <li>
                        <a href={`/attendance/${sheet.id}`}>{sheet.name}</a>
                    </li>
                    <li className="is-active">
                        <a aria-current="page">Record attendance</a>
                    </li>
                </ul>
            </nav>

            <table className="table is-fullwidth is-striped is-hoverable">
                <thead>
                    <tr>
                        <th style="width: 30%">Volunteer</th>
                        <th style="width: 30%">Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {volunteers.map((volunteer) => (
                        <tr>
                            <td>{volunteer.name}</td>
                            <td>{sheet.volunteers.some((v) => v.id === volunteer.id) ? "Present" : "Absent"}</td>
                            <td>
                                <a
                                    href={`/attendance/${sheet.id}/toggle?volunteerId=${volunteer.id}`}
                                    className="button is-primary is-small"
                                >
                                    Toggle
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

