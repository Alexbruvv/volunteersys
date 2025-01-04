import type { AttendanceSheet } from "@prisma/client";

export default function DeleteAttendanceSheetPage({ attendanceSheet }: { attendanceSheet: AttendanceSheet }) {
    return (
        <div className="container">
            <h3 className="title is-3">Delete attendance sheet</h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li>
                        <a href="/attendance">Attendance sheets</a>
                    </li>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            Delete {attendanceSheet.name}
                        </a>
                    </li>
                </ul>
            </nav>

            <p className="mb-2">
                Delete <b>{attendanceSheet.name}</b>?
            </p>

            <form method="post">
                <button type="submit" className="button is-danger">
                    Delete
                </button>
            </form>
        </div>
    );
}

