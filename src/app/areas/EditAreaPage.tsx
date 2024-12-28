import type { Area, User } from "@prisma/client";
import { Fragment } from "hono/jsx/jsx-runtime";

export default function EditAreaPage({ area, users }: { area: Area & { owners: User[] }; users: User[] }) {
    return (
        <div className="container">
            <h3 className="title is-3">Create area</h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li>
                        <a href="/areas">Areas</a>
                    </li>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            Create area
                        </a>
                    </li>
                </ul>
            </nav>

            <form method="post">
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input
                            name="name"
                            type="text"
                            className="input"
                            placeholder="Name"
                            value={area.name}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                        <input
                            name="description"
                            type="text"
                            className="input"
                            placeholder="Description"
                            value={area.description}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Owners</label>
                    <div className="control">
                        {users.map((user) => (
                            <Fragment>
                                <label className="checkbox">
                                    <input
                                        type="checkbox"
                                        name="owners"
                                        value={user.id}
                                        checked={area.owners.some((owner) => owner.id === user.id)}
                                    />{" "}
                                    {user.name}
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

