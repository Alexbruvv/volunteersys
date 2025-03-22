import type { Area } from "@prisma/client";

export default function DeleteAreaPage({ area }: { area: Area }) {
    return (
        <div className="container">
            <h3 className="title is-3">Delete area</h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li>
                        <a href={url("/areas")}>Areas</a>
                    </li>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            Delete {area.name}
                        </a>
                    </li>
                </ul>
            </nav>

            <p className="mb-2">
                Delete <b>{area.name}</b>?
            </p>

            <form method="post">
                <button type="submit" className="button is-danger">
                    Delete
                </button>
            </form>
        </div>
    );
}

