import type {
    Area,
    Role,
    ScheduleBlock,
    ScheduleBlockAssignment,
    ScheduleSlot,
    ScheduleSlotAssignment,
    Volunteer,
} from "@prisma/client";
import { Fragment } from "hono/jsx/jsx-runtime";
import { DateTime } from "luxon";
import url from "../../utils/url";

export default function PublicSchedulePage({
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
        <div className="container p-4">
            <h2 className="title is-2">Schedule - {volunteer.name}</h2>

            <div className="notification is-info is-light">
                An iCal version of this schedule can be accessed{" "}
                <a href={url("/volunteers/:id/public/feed", { id: volunteer.id })}>here</a>. This can be imported into
                your preferred calendar application, or the link can be used in a calendar application that supports
                iCal feeds.
            </div>

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
                                                {DateTime.fromJSDate(slot.startTime).toLocaleString(
                                                    DateTime.TIME_24_SIMPLE
                                                )}{" "}
                                                -{" "}
                                                {DateTime.fromJSDate(slot.endTime).toLocaleString(
                                                    DateTime.TIME_24_SIMPLE
                                                )}
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
    );
}

