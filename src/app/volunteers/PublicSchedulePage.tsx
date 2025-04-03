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
                            {assignment.scheduleBlock.slots.map((slot) => {
                                const role = volunteer.slotAssignments.find((s) => s.scheduleSlotId === slot.id)?.role;

                                return (
                                    <tr key={slot.id}>
                                        <td width="25%">{slot.name}</td>
                                        <td width="40%">
                                            {assignment.scheduleBlock.startTime.toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}{" "}
                                            -{" "}
                                            {assignment.scheduleBlock.endTime.toLocaleTimeString([], {
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
    );
}

