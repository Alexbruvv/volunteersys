import { Permission, type Group } from "@prisma/client";
import { Fragment } from "hono/jsx/jsx-runtime";
import url from "../../utils/url";

export default function EditGroupPage({ group }: { group: Group }) {
    return (
        <div className="container">
            <h3 className="title is-3">{group.name}</h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li>
                        <a href={url("/groups")}>Groups</a>
                    </li>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            {group.name}
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
                            value={group.name}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Permissions</label>
                    <div className="control">
                        {Object.values(Permission).map((permission) => (
                            <Fragment>
                                <label className="checkbox">
                                    <input
                                        type="checkbox"
                                        name="permissions"
                                        value={permission}
                                        checked={group.permissions.includes(permission)}
                                    />{" "}
                                    {permission}
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

