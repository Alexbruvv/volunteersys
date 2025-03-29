import type { Area } from "@prisma/client";
import url from "../../utils/url";

export default function SelectRoleAssignmentsAreaPage({ areas }: { areas: Area[] }) {
    return (
        <div className="container is-fluid content">
            <h3 className="title is-3">Select area</h3>

            <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li className="is-active">
                        <a href="#" aria-current="page">
                            Role assignments
                        </a>
                    </li>
                </ul>
            </nav>

            <ul>
                {areas.map((area) => (
                    <li>
                        <a href={url("/volunteers/role-assignments/:areaId", { areaId: area.id })}>{area.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

