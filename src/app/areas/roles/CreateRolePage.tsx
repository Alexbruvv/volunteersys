import type { Area } from "@prisma/client";

export default function CreateRolePage({ area }: { area: Area }) {
    return (
        <div className="container">
            <h3 className="title is-3">Create role</h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li>
                        <a href="/areas">Areas</a>
                    </li>
                    <li>
                        <a href={`/areas/${area.id}`}>{area.name}</a>
                    </li>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            Create role
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
                    <label className="label">Guidance URI</label>
                    <div className="control">
                        <input name="guidanceUri" type="text" className="input" placeholder="Guidance URI" />
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

