export default function CreateAttendanceSheetPage() {
    return (
        <div className="container">
            <h3 className="title is-3">Create attendance sheet</h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li>
                        <a href={url("/attendance")}>Attendance sheets</a>
                    </li>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            Create attendance sheet
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
                    <label className="label">Start date</label>
                    <div className="control">
                        <input type="datetime-local" name="startDate" className="input" required />
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

