import type { Group } from "@prisma/client";

export default function GroupsPage({ group }: { group: Group }) {
    return (
        <div className="container">
            <h3 className="title is-3">
                Delete group
                <a href="/admin/groups/new" className="button is-primary is-pulled-right">
                    Create group
                </a>
            </h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li>
                        <a href="/admin/groups">Groups</a>
                    </li>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            Delete {group.name}
                        </a>
                    </li>
                </ul>
            </nav>

            <p className="mb-2">
                Delete <b>{group.name}</b>?
            </p>

            <form method="post">
                <button type="submit" className="button is-danger">
                    Delete
                </button>
            </form>
        </div>
    );
}

