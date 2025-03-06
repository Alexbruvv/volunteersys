import type { Volunteer } from "@prisma/client";

export default function VolunteersPage({ volunteers }: { volunteers: Volunteer[] }) {
    return (
        <div className="container">
            <h3 className="title is-3">
                Volunteers
                <a href="/volunteers/new" className="button is-primary is-pulled-right">
                    Add volunteer
                </a>
            </h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            Volunteers
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
                    {volunteers.map((volunteer) => (
                        <tr>
                            <td>{volunteer.name}</td>
                            <td>
                                <a href={`/volunteers/${volunteer.id}`}>View/edit</a>
                                {" | "}
                                <a href={`/volunteers/${volunteer.id}/delete`} className="has-text-danger">
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

