import type { Group } from "@prisma/client";

export default function GroupsPage({ groups }: { groups: Group[] }) {
    return (
        <div className="container">
            <h3 className="title is-3">
                Groups
                <a href="/admin/groups/new" className="button is-primary is-pulled-right">
                    Create group
                </a>
            </h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            Groups
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
                    {groups.map((group) => (
                        <tr>
                            <td>{group.name}</td>
                            <td>
                                <a href={`/admin/groups/${group.id}`}>View/edit</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

