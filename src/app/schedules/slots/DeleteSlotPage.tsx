import type { Schedule, ScheduleSlot } from "@prisma/client";
import url from "../../../utils/url";

export default function DeleteSlotPage({ slot }: { slot: ScheduleSlot & { schedule: Schedule } }) {
    return (
        <div className="container">
            <h3 className="title is-3">Delete slot</h3>

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
                            Delete {slot.name}
                        </a>
                    </li>
                </ul>
            </nav>

            <p className="mb-2">
                Delete <b>{slot.name}</b>?
            </p>

            <form method="post">
                <button type="submit" className="button is-danger">
                    Delete
                </button>
            </form>
        </div>
    );
}

