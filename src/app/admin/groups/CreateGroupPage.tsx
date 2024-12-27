import { Permission } from "@prisma/client";
import { Fragment } from "hono/jsx/jsx-runtime";

export default function CreateGroupPage() {
    return (
        <div className="container">
            <h3 className="title is-3">Create group</h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li>
                        <a href="/admin/groups">Groups</a>
                    </li>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            Create group
                        </a>
                    </li>
                </ul>
            </nav>

            <form method="post">
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input name="name" type="text" className="input" placeholder="Name" required />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Permissions</label>
                    <div className="control">
                        {Object.values(Permission).map((permission) => (
                            <Fragment>
                                <label className="checkbox">
                                    <input type="checkbox" name="permissions" value={permission} /> {permission}
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

