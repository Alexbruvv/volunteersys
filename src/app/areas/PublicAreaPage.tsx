import type {
    Area,
    Role,
    Schedule,
    ScheduleBlock,
    ScheduleBlockAssignment,
    ScheduleSlot,
    ScheduleSlotAssignment,
    Volunteer,
} from "@prisma/client";
import { Fragment } from "hono/jsx/jsx-runtime";
import { DateTime } from "luxon";
import url from "../../utils/url";

export default function PublicAreaPage({
    area,
}: {
    area: Area & {
        roles: Array<Role & {
            assignments: Array<ScheduleSlotAssignment & {volunteer: Volunteer}>;
        }>;
        schedule: Schedule & {
            slots: ScheduleSlot[];
        };
    };
    // cells: Array<Role & {columns: Array<{scheduleSlot:ScheduleSlot, volunteers:Volunteer[]}>}>
}) {
    return (
        <div className="container p-4">
            <h2 className="title is-2">Area Schedule - {area.name}</h2>
            <table className="table is-fullwidth is-bordered is-hoverable is-striped">
                <thead>
                    <tr>
                        <th>Role</th>
                        {area.schedule.slots.map((slot) => (
                                <th className="has-text-centered" style="min-width:125px;">
                                    {slot.name}
                                    <br />
                                    {DateTime.fromJSDate(slot.startTime).toLocaleString(DateTime.TIME_24_SIMPLE)} -{" "}
                                    {DateTime.fromJSDate(slot.endTime).toLocaleString(DateTime.TIME_24_SIMPLE)}
                                </th>
                            ))}
                    </tr>
                </thead>
                <tbody>
                    {area.roles.map((role) => (
                        <tr>
                            <td class="has-text-centered has-text-weight-semibold">
                                {role.name}
                            </td>
                            {area.schedule.slots.map((slot) => {
                                return (
                                    <td>
                                        <ul style="list-style-type: circle; margin-left:20px">
                                        {role.assignments
                                            .filter((assignment) => assignment.scheduleSlotId == slot.id)
                                            .map((assignment) => {
                                                return <li style="margin:0px">{assignment.volunteer.name}</li>
                                            })}
                                        </ul>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

