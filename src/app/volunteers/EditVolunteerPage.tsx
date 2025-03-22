import { type Volunteer } from "@prisma/client";
import url from "../../utils/url";

export default function EditVolunteerPage({ volunteer }: { volunteer: Volunteer }) {
    return (
        <div className="container">
            <h3 className="title is-3">{volunteer.name}</h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li>
                        <a href={url("/volunteers")}>Volunteers</a>
                    </li>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            {volunteer.name}
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
                            required
                            value={volunteer.name}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Badge pronouns</label>
                    <div className="control">
                        <input
                            name="badgePronouns"
                            type="text"
                            className="input"
                            placeholder="Badge pronouns"
                            value={volunteer.badgePronouns ?? ""}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Email address</label>
                    <div className="control">
                        <input
                            name="emailAddress"
                            type="email"
                            className="input"
                            placeholder="Email address"
                            value={volunteer.emailAddress}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Notes</label>
                    <div className="control">
                        <textarea name="notes" className="textarea" placeholder="Notes" rows={3}>
                            {volunteer.notes}
                        </textarea>
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

