import type {
    Area,
    Role,
    Schedule,
    ScheduleBlockAssignment,
    ScheduleSlot,
    ScheduleSlotAssignment,
    User,
    Volunteer,
} from "@prisma/client";
import { DateTime } from "luxon";
import url from "../../utils/url";

export default function RoleAssignmentsPage({
    area,
    volunteers,
}: {
    area: Area & {
        schedule: Schedule & {
            slots: ScheduleSlot[];
        };
        assignments: ScheduleBlockAssignment[];
        roles: Role[];
        owners: User[];
    };
    volunteers: Array<Volunteer & { slotAssignments: ScheduleSlotAssignment[] }>;
}) {
    return (
        <div className="container is-fluid">
            <h3 className="title is-3">
                Role assignments - {area.name}
                <button id="save" className="button is-primary is-pulled-right" disabled>
                    Save
                </button>
            </h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li>
                        <a href={url("/volunteers/role-assignments")}>Role assignments</a>
                    </li>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            {area.name}
                        </a>
                    </li>
                </ul>
            </nav>

            <div className="table-container">
                <table className="table is-full-width is-striped is-hoverable">
                    <thead>
                        <tr>
                            <th>Volunteer</th>
                            {area.schedule.slots.map((slot) => (
                                <th className="has-text-centered">
                                    {slot.name}
                                    <br />
                                    {DateTime.fromJSDate(slot.startTime).toLocaleString(DateTime.TIME_24_SIMPLE)} -{" "}
                                    {DateTime.fromJSDate(slot.endTime).toLocaleString(DateTime.TIME_24_SIMPLE)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {volunteers.map((volunteer) => (
                            <tr data-volunteer-id={volunteer.id}>
                                <td className="is-vcentered">{volunteer.name}</td>
                                {area.schedule.slots.map((slot) => {
                                    if (
                                        !area.assignments.some(
                                            (a) =>
                                                a.volunteerId === volunteer.id &&
                                                a.scheduleBlockId === slot.scheduleBlockId
                                        )
                                    ) {
                                        return <td></td>;
                                    }

                                    const slotAssignment = volunteer.slotAssignments.find(
                                        (a) => a.scheduleSlotId === slot.id
                                    );
                                    const assignedRole = area.roles.find((r) => r.id === slotAssignment?.roleId);

                                    return (
                                        <td>
                                            <div className="select">
                                                <select name={`scheduleSlot-${slot.id}`}>
                                                    <option></option>
                                                    {area.roles.map((role) => (
                                                        <option value={role.id} selected={role.id === assignedRole?.id}>
                                                            {role.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <script src={url("/static/role-assignments.js")} defer></script>
        </div>
    );
}

