import type { Group } from "@prisma/client";
import url from "../../utils/url";

export default function DeleteGroupPage({ group }: { group: Group }) {
    return (
        <div className="container">
            <h3 className="title is-3">Delete group</h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li>
                        <a href={url("/groups")}>Groups</a>
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

