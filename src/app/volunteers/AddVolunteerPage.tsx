import { Permission } from "@prisma/client";
import { Fragment } from "hono/jsx/jsx-runtime";

export default function AddVolunteerPage() {
    return (
        <div className="container">
            <h3 className="title is-3">Add volunteer</h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li>
                        <a href="/volunteers">Volunteers</a>
                    </li>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            Add volunteer
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
                    <label className="label">Badge pronouns</label>
                    <div className="control">
                        <input name="badgePronouns" type="text" className="input" placeholder="Badge pronouns" />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Email address</label>
                    <div className="control">
                        <input name="emailAddress" type="email" className="input" placeholder="Email address" />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Active roles (1-4)</label>
                    <div className="control">
                        <input
                            type="number"
                            name="consActiveRoles"
                            className="input"
                            placeholder="Active roles"
                            min={1}
                            max={4}
                        />
                    </div>
                    <p className="help">4 = happy with active roles</p>
                </div>

                <div className="field">
                    <label className="label">Kit knowledge (1-4)</label>
                    <div className="control">
                        <input
                            type="number"
                            name="consKitKnowledge"
                            className="input"
                            placeholder="Kit knowledge"
                            min={1}
                            max={4}
                        />
                    </div>
                    <p className="help">4 = very knowledgeable on the kit</p>
                </div>

                <div className="field">
                    <label className="label">Long shifts (1-4)</label>
                    <div className="control">
                        <input
                            type="number"
                            name="consLongShifts"
                            className="input"
                            placeholder="Long shifts"
                            min={1}
                            max={4}
                        />
                    </div>
                    <p className="help">4 = happy with long shifts</p>
                </div>

                <div className="field">
                    <label className="label">Quiet roles (1-4)</label>
                    <div className="control">
                        <input
                            type="number"
                            name="consQuietRoles"
                            className="input"
                            placeholder="Quiet roles"
                            min={1}
                            max={4}
                        />
                    </div>
                    <p className="help">4 = happy with quiet roles</p>
                </div>

                <div className="field">
                    <label className="label">Public speaking</label>
                    <div className="control">
                        <label className="checkbox">
                            <input type="checkbox" name="consPublicSpeaking" value="true" /> Happy with public speaking
                        </label>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Miss finals</label>
                    <div className="control">
                        <label className="checkbox">
                            <input type="checkbox" name="consMissFinals" value="true" /> Happy to miss finals
                        </label>
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

