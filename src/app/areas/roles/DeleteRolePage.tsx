import type { Role } from "@prisma/client";

export default function DeleteRolePage({ role }: { role: Role }) {
    return (
        <div className="container">
            <h3 className="title is-3">Delete role</h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li>
                        <a href="/roles">Roles</a>
                    </li>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            Delete {role.name}
                        </a>
                    </li>
                </ul>
            </nav>

            <p className="mb-2">
                Delete <b>{role.name}</b>?
            </p>

            <form method="post">
                <button type="submit" className="button is-danger">
                    Delete
                </button>
            </form>
        </div>
    );
}

