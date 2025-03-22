import type { Area, Role, Schedule, ScheduleBlockAssignment, ScheduleSlot, User, Volunteer } from "@prisma/client";
import { DateTime } from "luxon";

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
    volunteers: Volunteer[];
}) {
    return (
        <div className="container">
            <h3 className="title is-3">Role assignments - {area.name}</h3>

            <table className="table is-full-width">
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
                        <tr>
                            <td>{volunteer.name}</td>
                            {area.schedule.slots.map((slot) =>
                                area.assignments.some(
                                    (a) => a.volunteerId === volunteer.id && a.scheduleBlockId === slot.scheduleBlockId
                                ) ? (
                                    <td>assigned</td>
                                ) : (
                                    <td></td>
                                )
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

