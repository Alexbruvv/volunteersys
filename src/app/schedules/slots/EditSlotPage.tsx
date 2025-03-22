import type { Schedule, ScheduleBlock, ScheduleSlot } from "@prisma/client";
import { DateTime } from "luxon";
import url from "../../../utils/url";

export default function EditSlotPage({
    slot,
    blocks,
}: {
    slot: ScheduleSlot & { schedule: Schedule };
    blocks: ScheduleBlock[];
}) {
    return (
        <div className="container">
            <h3 className="title is-3">Create schedule slot</h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li>
                        <a href={url("/schedules")}>Schedules</a>
                    </li>
                    <li>
                        <a href={url(`/schedules/${slot.schedule.id}`)}>{slot.schedule.name}</a>
                    </li>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            {slot.name}
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
                            required
                            value={slot.name}
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
                            placeholder="Start time"
                            value={DateTime.fromJSDate(slot.startTime).toISO()?.slice(0, 16)}
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
                            placeholder="End time"
                            required
                            value={DateTime.fromJSDate(slot.endTime).toISO()?.slice(0, 16)}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Block</label>
                    <div className="select">
                        <select name="block">
                            {blocks.map((block) => (
                                <option key={block.id} value={block.id} selected={block.id === slot.scheduleBlockId}>
                                    {block.name}
                                </option>
                            ))}
                        </select>
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

