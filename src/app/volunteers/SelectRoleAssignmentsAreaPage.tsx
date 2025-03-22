import type { Area } from "@prisma/client";

export default function SelectRoleAssigmentsAreaPage({ areas }: { areas: Area[] }) {
    return (
        <div className="container content">
            <h3 className="title is-3">Select area</h3>
            <ul>
                {areas.map((area) => (
                    <li>
                        <a href={`/volunteers/role-assignments/${area.id}`}>{area.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

