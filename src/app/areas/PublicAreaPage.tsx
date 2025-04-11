import type {
    Area,
    Role,
    Schedule,
    ScheduleBlock,
    ScheduleSlot,
    ScheduleSlotAssignment,
    Volunteer,
} from "@prisma/client";
import { Fragment } from "hono/jsx/jsx-runtime";
import { DateTime } from "luxon";

export default function PublicAreaPage({
    area,
}: {
    area: Area & {
        roles: Array<
            Role & {
                assignments: Array<ScheduleSlotAssignment & { volunteer: Volunteer }>;
            }
        >;
        schedule: Schedule & {
            slots: Array<ScheduleSlot & { scheduleBlock: ScheduleBlock }>;
        };
    };
}) {
    return (
        <div className="p-4">
            <style>
                .table{" "}
                {`{
                    --bulma-table-cell-padding: 0.15em 0.01em;
                }`}
            </style>
            <h1 className="title is-2">Area Schedule - {area.name}</h1>
            {area.schedule.slots
                .map((slot) => slot.scheduleBlock)
                .filter((value, index, array) => array.findIndex((v) => v.id === value.id) === index)
                .map((block) => (
                    <Fragment>
                        <h3 className="title is-4">{block.name}</h3>
                        <table className="table is-fullwidth is-bordered is-hoverable is-striped">
                            <thead>
                                <tr>
                                    <th style="vertical-align: bottom" className="has-text-centered">
                                        Role
                                    </th>
                                    {area.schedule.slots
                                        .filter((slot) => slot.scheduleBlockId === block.id)
                                        .map((slot) => (
                                            <th className="has-text-centered" style="min-width:100px;">
                                                {slot.name}
                                                <br />
                                                {DateTime.fromJSDate(slot.startTime).toLocaleString(
                                                    DateTime.TIME_24_SIMPLE
                                                )}{" "}
                                                -{" "}
                                                {DateTime.fromJSDate(slot.endTime).toLocaleString(
                                                    DateTime.TIME_24_SIMPLE
                                                )}
                                            </th>
                                        ))}
                                </tr>
                            </thead>
                            <tbody>
                                {area.roles.map((role) => (
                                    <tr>
                                        <td class="has-text-centered has-text-weight-semibold">{role.name}</td>
                                        {area.schedule.slots
                                            .filter((slot) => slot.scheduleBlockId === block.id)
                                            .map((slot) => {
                                                return (
                                                    <td>
                                                        <ul style="list-style-type: circle; margin-left:20px">
                                                            {role.assignments
                                                                .filter(
                                                                    (assignment) => assignment.scheduleSlotId == slot.id
                                                                )
                                                                .map((assignment) => {
                                                                    return (
                                                                        <li style="margin:0px">
                                                                            {assignment.volunteer.name}
                                                                        </li>
                                                                    );
                                                                })}
                                                        </ul>
                                                    </td>
                                                );
                                            })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Fragment>
                ))}
        </div>
    );
}

