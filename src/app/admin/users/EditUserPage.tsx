import { Permission, type Group, type User } from "@prisma/client";
import { Fragment } from "hono/jsx/jsx-runtime";

export default function EditUserPage({ user, groups }: { user: User & { groups: Group[] }; groups: Group[] }) {
    return (
        <div className="container">
            <h3 className="title is-3">{user.name}</h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li>
                        <a href="/admin/users">Users</a>
                    </li>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            {user.name}
                        </a>
                    </li>
                </ul>
            </nav>

            <form method="post">
                <div className="field">
                    <label className="label">Groups</label>
                    <div className="control">
                        {groups.map((group) => (
                            <Fragment>
                                <label className="checkbox">
                                    <input
                                        type="checkbox"
                                        name="groups"
                                        value={group.id}
                                        checked={user.groups.some((g) => g.id === group.id)}
                                    />{" "}
                                    {group.name}
                                </label>
                                <br />
                            </Fragment>
                        ))}
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <button className="button is-primary" type="submit">
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

