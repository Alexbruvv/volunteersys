import type { Group } from "@prisma/client";

export default function GroupsPage({ groups }: { groups: Group[] }) {
    return (
        <div className="container">
            <table className="table is-striped is-hoverable">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map((group) => (
                        <tr>
                            <td>{group.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

