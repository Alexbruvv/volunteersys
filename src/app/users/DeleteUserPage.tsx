import type { User } from "@prisma/client";
import url from "../../utils/url";

export default function DeleteUserPage({ user }: { user: User }) {
    return (
        <div className="container">
            <h3 className="title is-3">Delete user</h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li>
                        <a href={url("/users")}>Users</a>
                    </li>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            Delete {user.name}
                        </a>
                    </li>
                </ul>
            </nav>

            <p className="mb-2">
                Delete <b>{user.name}</b>?
            </p>

            <form method="post">
                <button type="submit" className="button is-danger">
                    Delete
                </button>
            </form>
        </div>
    );
}

