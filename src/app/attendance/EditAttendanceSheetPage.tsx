import type { AttendanceSheet } from "@prisma/client";
import { DateTime } from "luxon";
import url from "../../utils/url";

export default function EditAttendanceSheetPage({ attendanceSheet }: { attendanceSheet: AttendanceSheet }) {
    return (
        <div className="container">
            <h3 className="title is-3">{attendanceSheet.name}</h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li>
                        <a href={url("/attendance")}>Attendance sheets</a>
                    </li>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            {attendanceSheet.name}
                        </a>
                    </li>
                </ul>
            </nav>

            <form method="post">
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input
                            name="name"
                            type="text"
                            className="input"
                            placeholder="Name"
                            value={attendanceSheet.name}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Start date</label>
                    <div className="control">
                        <input
                            type="datetime-local"
                            name="startDate"
                            className="input"
                            value={DateTime.fromJSDate(attendanceSheet.startDate).toISO()?.slice(0, 16)}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <button className="button is-primary" type="submit">
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

