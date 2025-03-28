import type { Area, ScheduleBlock, ScheduleBlockAssignment, Volunteer } from "@prisma/client";
import { Fragment } from "hono/jsx/jsx-runtime";
import url from "../../utils/url";

export default function AssignmentsPage({
    volunteers,
    scheduleBlocks,
    areas,
}: {
    volunteers: (Volunteer & { assignments: ScheduleBlockAssignment[] })[];
    scheduleBlocks: ScheduleBlock[];
    areas: Area[];
}) {
    return (
        <div className="container">
            <h3 className="title is-3">
                Assignments
                <button id="save" className="button is-primary is-pulled-right" disabled>
                    Save
                </button>
            </h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            Assignments
                        </a>
                    </li>
                </ul>
            </nav>

            <table className="table is-fullwidth">
                <thead>
                    <tr>
                        <th>Volunteer</th>
                        {scheduleBlocks.map((scheduleBlock) => (
                            <th>{scheduleBlock.name}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {volunteers.map((volunteer) => (
                        <Fragment>
                            <tr data-volunteer-id={volunteer.id}>
                                <td style="vertical-align: middle; border-bottom: none">{volunteer.name}</td>
                                {scheduleBlocks.map((scheduleBlock) => (
                                    <td style="border-bottom: none">
                                        <div className="select">
                                            <select name={`scheduleBlock-${scheduleBlock.id}`}>
                                                <option value="">Unassigned</option>
                                                {areas.map((area) => (
                                                    <option
                                                        value={area.id}
                                                        selected={volunteer.assignments.some(
                                                            (assignment) =>
                                                                assignment.scheduleBlockId === scheduleBlock.id &&
                                                                assignment.areaId === area.id
                                                        )}
                                                    >
                                                        {area.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td colspan={1 + scheduleBlocks.length}>
                                    {volunteer.notes && (
                                        <Fragment>
                                            <br />
                                            <b>Notes: </b>
                                            {volunteer.notes}
                                        </Fragment>
                                    )}
                                </td>
                            </tr>
                        </Fragment>
                    ))}
                </tbody>
            </table>

            <script src={url("/static/assignments.js")} defer></script>
        </div>
    );
}

