import type { Group, User } from "@prisma/client";

export default function UsersPage({ users }: { users: (User & { groups: Group[] })[] }) {
    return (
        <div className="container">
            <h3 className="title is-3">Users</h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            Users
                        </a>
                    </li>
                </ul>
            </nav>

            <table className="table is-fullwidth is-striped is-hoverable">
                <thead>
                    <tr>
                        <th style="width: 40%">Name</th>
                        <th style="width: 40%">Groups</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr>
                            <td>{user.name}</td>
                            <td>{user.groups.map((group) => group.name).join(", ")}</td>
                            <td>
                                <a href={`/admin/users/${user.id}`}>View/edit</a>
                                {" | "}
                                <a href={`/admin/users/${user.id}/delete`} className="has-text-danger">
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

