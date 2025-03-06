import type { Schedule, ScheduleSlot } from "@prisma/client";

export default function EditSchedulePage({ schedule }: { schedule: Schedule & { slots: ScheduleSlot[] } }) {
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
                            <th style="width: 25%">Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    );
}

