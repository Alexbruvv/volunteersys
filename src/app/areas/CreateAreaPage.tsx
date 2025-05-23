import type { Schedule, User } from "@prisma/client";
import { Fragment } from "hono/jsx/jsx-runtime";
import url from "../../utils/url";

export default function CreateAreaPage({ users, schedules }: { users: User[]; schedules: Schedule[] }) {
    return (
        <div className="container">
            <h3 className="title is-3">Create area</h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li>
                        <a href={url("/areas")}>Areas</a>
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
                        <input name="name" type="text" className="input" placeholder="Name" required />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                        <input name="description" type="text" className="input" placeholder="Description" required />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Schedule</label>
                    <div className="select">
                        <select name="scheduleId">
                            {schedules.map((schedule) => (
                                <option value={schedule.id}>{schedule.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Owners</label>
                    <div className="control">
                        {users.map((user) => (
                            <Fragment>
                                <label className="checkbox">
                                    <input type="checkbox" name="owners" value={user.id} /> {user.name}
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

