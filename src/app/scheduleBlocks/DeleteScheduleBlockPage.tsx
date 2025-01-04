import type { AttendanceSheet, ScheduleBlock } from "@prisma/client";

export default function DeleteScheduleBlockPage({ scheduleBlock }: { scheduleBlock: ScheduleBlock }) {
    return (
        <div className="container">
            <h3 className="title is-3">Delete schedule block</h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li>
                        <a href="/schedule-blocks">Schedule blocks</a>
                    </li>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            Delete {scheduleBlock.name}
                        </a>
                    </li>
                </ul>
            </nav>

            <p className="mb-2">
                Delete <b>{scheduleBlock.name}</b>?
            </p>

            <form method="post">
                <button type="submit" className="button is-danger">
                    Delete
                </button>
            </form>
        </div>
    );
}

