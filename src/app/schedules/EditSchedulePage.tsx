import type { Schedule, ScheduleBlock, ScheduleSlot } from "@prisma/client";
import { DateTime } from "luxon";

export default function EditSchedulePage({
    schedule,
}: {
    schedule: Schedule & { slots: Array<ScheduleSlot & { scheduleBlock: ScheduleBlock }> };
}) {
    return (
        <div className="container">
            <h3 className="title is-3">Edit schedule</h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li>
                        <a href="/schedules">Schedules</a>
                    </li>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            {schedule.name}
                        </a>
                    </li>
                </ul>
            </nav>

            <form class="box" method="post">
                <h5 className="title is-5">General</h5>

                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input
                            name="name"
                            type="text"
                            className="input"
                            placeholder="Name"
                            value={schedule.name}
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

            <div className="box">
                <h5 className="title is-5">
                    Slots
                    <a href={`/schedules/${schedule.id}/slots/new`} className="button is-primary is-pulled-right">
                        Create slot
                    </a>
                </h5>

                <table className="table is-fullwidth is-striped is-hoverable">
                    <thead>
                        <tr>
                            <th style="width: 20%">Name</th>
                            <th style="width: 20%">Start time</th>
                            <th style="width: 20%">End time</th>
                            <th style="width: 20%">Block</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.slots
                            .sort((a, b) => a.startTime.getUTCMilliseconds() - b.startTime.getUTCMilliseconds())
                            .map((slot) => (
                                <tr>
                                    <td>{slot.name}</td>
                                    <td>
                                        {DateTime.fromJSDate(slot.startTime).toLocaleString(DateTime.DATETIME_SHORT)}
                                    </td>
                                    <td>{DateTime.fromJSDate(slot.endTime).toLocaleString(DateTime.DATETIME_SHORT)}</td>
                                    <td>{slot.scheduleBlock.name}</td>
                                    <td>
                                        <a href={`/schedules/${schedule.id}/slots/${slot.id}`}>View/edit</a>
                                        {" | "}
                                        <a
                                            href={`/schedules/${schedule.id}/slots/${slot.id}/delete`}
                                            className="has-text-danger"
                                        >
                                            Delete
                                        </a>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

