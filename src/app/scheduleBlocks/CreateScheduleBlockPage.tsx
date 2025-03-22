import url from "../../utils/url";

export default function CreateScheduleBlockPage() {
    return (
        <div className="container">
            <h3 className="title is-3">Create schedule block</h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li>
                        <a href={url("/schedule-blocks")}>Schedule blocks</a>
                    </li>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            Create schedule block
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
                    <label className="label">Start time</label>
                    <div className="control">
                        <input name="startTime" type="datetime-local" className="input" required />
                    </div>
                </div>

                <div className="field">
                    <label className="label">End time</label>
                    <div className="control">
                        <input name="endTime" type="datetime-local" className="input" required />
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

