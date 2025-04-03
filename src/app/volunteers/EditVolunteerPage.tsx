import {
    type Area,
    type Role,
    type ScheduleBlock,
    type ScheduleBlockAssignment,
    type ScheduleSlot,
    type ScheduleSlotAssignment,
    type Volunteer,
} from "@prisma/client";
import url from "../../utils/url";
import { Fragment } from "hono/jsx/jsx-runtime";

export default function EditVolunteerPage({
    volunteer,
}: {
    volunteer: Volunteer & {
        assignments: Array<
            ScheduleBlockAssignment & { area: Area; scheduleBlock: ScheduleBlock & { slots: ScheduleSlot[] } }
        >;
        slotAssignments: Array<ScheduleSlotAssignment & { role: Role }>;
    };
}) {
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

            <p>
                A public version of this user's schedule can be accessed{" "}
                <a href={url("/volunteers/:id/public", { id: volunteer.id })}>here</a>.
            </p>

            <hr />

            <div className="columns">
                <div className="column">
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
                <div className="column is-two-thirds">
                    <table className="table is-fullwidth is-bordered is-hoverable is-striped">
                        <thead>
                            <tr>
                                <th>Slot</th>
                                <th>Time</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {volunteer.assignments.map((assignment) => (
                                <Fragment>
                                    <tr>
                                        <td colspan={3} class="has-text-centered has-text-weight-semibold">
                                            {assignment.scheduleBlock.name}
                                        </td>
                                    </tr>
                                    {assignment.scheduleBlock.slots
                                        .filter((slot) => slot.scheduleId === assignment.area.scheduleId)
                                        .map((slot) => {
                                            const role = volunteer.slotAssignments.find(
                                                (s) => s.scheduleSlotId === slot.id
                                            )?.role;

                                            return (
                                                <tr key={slot.id}>
                                                    <td width="25%">{slot.name}</td>
                                                    <td width="40%">
                                                        {slot.startTime.toLocaleTimeString([], {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}{" "}
                                                        -{" "}
                                                        {slot.endTime.toLocaleTimeString([], {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </td>
                                                    <td>{role?.name ?? "-"}</td>
                                                </tr>
                                            );
                                        })}
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

