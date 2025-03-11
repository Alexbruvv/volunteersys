import type { Schedule } from "@prisma/client";

export default function SchedulesPage({ schedules }: { schedules: Schedule[] }) {
    return (
        <div className="container">
            <h3 className="title is-3">
                Schedules
                <a href="/schedules/new" className="button is-primary is-pulled-right">
                    Create schedule
                </a>
            </h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            Schedules
                        </a>
                    </li>
                </ul>
            </nav>

            <table className="table is-fullwidth is-striped is-hoverable">
                <thead>
                    <tr>
                        <th style="width: 50%">Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.map((schedule) => (
                        <tr>
                            <td>{schedule.name}</td>
                            <td>
                                <a href={`/schedules/${schedule.id}`}>View/edit</a>
                                {" | "}
                                <a href={`/schedules/${schedule.id}/delete`} className="has-text-danger">
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

