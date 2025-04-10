import type { Area, Role, Schedule, User } from "@prisma/client";
import { Fragment } from "hono/jsx/jsx-runtime";
import url from "../../utils/url";

export default function EditAreaPage({
    area,
    users,
    schedules,
}: {
    area: Area & { owners: User[]; roles: Role[] };
    users: User[];
    schedules: Schedule[];
}) {
    return (
        <div className="container">
            <h3 className="title is-3">Edit area</h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li>
                        <a href={url("/areas")}>Areas</a>
                    </li>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            {area.name}
                        </a>
                    </li>
                </ul>
            </nav>

            <p>
              A public version of the schedule for this area can be accessed{" "}<a href={url("/areas/:id/public", {id: area.id})}>here</a>.
            </p>

            <form class="box" method="post">
                <h5 className="title is-5">General</h5>

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
                    <label className="label">Schedule</label>
                    <div className="select">
                        <select name="scheduleId">
                            {schedules.map((schedule) => (
                                <option value={schedule.id} selected={area.scheduleId === schedule.id}>
                                    {schedule.name}
                                </option>
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

            <div className="box">
                <h5 className="title is-5">
                    Roles
                    <a href={url(`/areas/${area.id}/roles/new`)} className="button is-primary is-pulled-right">
                        Create role
                    </a>
                </h5>

                <table className="table is-fullwidth is-striped is-hoverable">
                    <thead>
                        <tr>
                            <th style="width: 25%">Name</th>
                            <th style="width: 50%">Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {area.roles.map((role) => (
                            <tr>
                                <td>{role.name}</td>
                                <td>
                                    {role.description} {role.guidanceUri && <a href={role.guidanceUri}>(Guidance)</a>}
                                </td>
                                <td>
                                    <a href={url(`/areas/${area.id}/roles/${role.id}`)}>Edit</a>
                                    {" | "}
                                    <a
                                        href={url(`/areas/${area.id}/roles/${role.id}/delete`)}
                                        className="has-text-danger"
                                    >
                                        Delete
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

