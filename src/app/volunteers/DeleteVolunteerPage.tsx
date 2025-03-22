import type { Volunteer } from "@prisma/client";
import url from "../../utils/url";

export default function DeleteVolunteerPage({ volunteer }: { volunteer: Volunteer }) {
    return (
        <div className="container">
            <h3 className="title is-3">Delete volunteer</h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li>
                        <a href={url("/volunteers")}>Volunteers</a>
                    </li>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            Delete {volunteer.name}
                        </a>
                    </li>
                </ul>
            </nav>

            <p className="mb-2">
                Delete <b>{volunteer.name}</b>?
            </p>

            <form method="post">
                <button type="submit" className="button is-danger">
                    Delete
                </button>
            </form>
        </div>
    );
}

