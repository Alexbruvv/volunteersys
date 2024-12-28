import type { Area, Group } from "@prisma/client";

export default function AreasPage({ areas }: { areas: Area[] }) {
    return (
        <div className="container">
            <h3 className="title is-3">
                Areas
                <a href="/areas/new" className="button is-primary is-pulled-right">
                    Create area
                </a>
            </h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            Areas
                        </a>
                    </li>
                </ul>
            </nav>

            <table className="table is-fullwidth is-striped is-hoverable">
                <thead>
                    <tr>
                        <th style="width: 80%">Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {areas.map((area) => (
                        <tr>
                            <td>{area.name}</td>
                            <td>
                                <a href={`/areas/${area.id}`}>View/edit</a>
                                {" | "}
                                <a href={`/areas/${area.id}/delete`} className="has-text-danger">
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

