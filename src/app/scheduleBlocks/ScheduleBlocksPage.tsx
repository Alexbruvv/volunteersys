import type { Area, Group, ScheduleBlock } from "@prisma/client";
import { DateTime } from "luxon";

export default function ScheduleBlocksPage({ scheduleBlocks }: { scheduleBlocks: ScheduleBlock[] }) {
    return (
        <div className="container">
            <h3 className="title is-3">
                Schedule blocks
                <a href="/schedule-blocks/new" className="button is-primary is-pulled-right">
                    Create schedule block
                </a>
            </h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            Schedule blocks
                        </a>
                    </li>
                </ul>
            </nav>

            <table className="table is-fullwidth is-striped is-hoverable">
                <thead>
                    <tr>
                        <th style="width: 25%">Name</th>
                        <th style="width: 25%">Start</th>
                        <th style="width: 25%">End</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {scheduleBlocks.map((scheduleBlock) => (
                        <tr>
                            <td>{scheduleBlock.name}</td>
                            <td>
                                {DateTime.fromJSDate(scheduleBlock.startTime).toLocaleString(DateTime.DATETIME_SHORT)}
                            </td>
                            <td>
                                {DateTime.fromJSDate(scheduleBlock.endTime).toLocaleString(DateTime.DATETIME_SHORT)}
                            </td>
                            <td>
                                <a href={`/schedule-blocks/${scheduleBlock.id}`}>View/edit</a>
                                {" | "}
                                <a href={`/schedule-blocks/${scheduleBlock.id}/delete`} className="has-text-danger">
                                    Delete
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

