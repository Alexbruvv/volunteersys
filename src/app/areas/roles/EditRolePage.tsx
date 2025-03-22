import type { Area, Role } from "@prisma/client";
import url from "../../../utils/url";

export default function EditRolePage({ role }: { role: Role & { area: Area } }) {
    return (
        <div className="container">
            <h3 className="title is-3">{role.name}</h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li>
                        <a href={url("/areas")}>Areas</a>
                    </li>
                    <li>
                        <a href={url("/areas/:id", { id: role.area.id })}>{role.area.name}</a>
                    </li>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            {role.name}
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
                            value={role.name}
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
                            value={role.description}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Guidance URI</label>
                    <div className="control">
                        <input
                            name="guidanceUri"
                            type="text"
                            className="input"
                            placeholder="Guidance URI"
                            value={role.guidanceUri}
                        />
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

