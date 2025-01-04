import type { ScheduleBlock } from "@prisma/client";
import { DateTime } from "luxon";

export default function EditScheduleBlockPage({ scheduleBlock }: { scheduleBlock: ScheduleBlock }) {
    return (
        <div className="container">
            <h3 className="title is-3">{scheduleBlock.name}</h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li>
                        <a href="/schedule-blocks">Schedule blocks</a>
                    </li>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            {scheduleBlock.name}
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
                            value={scheduleBlock.name}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Start time</label>
                    <div className="control">
                        <input
                            name="startTime"
                            type="datetime-local"
                            className="input"
                            value={DateTime.fromJSDate(scheduleBlock.startTime).toISO()?.slice(0, 16)}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">End time</label>
                    <div className="control">
                        <input
                            name="endTime"
                            type="datetime-local"
                            className="input"
                            value={DateTime.fromJSDate(scheduleBlock.endTime).toISO()?.slice(0, 16)}
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

