import Root from "./Root";

export default function ErrorPage({ error }: { error: string }) {
    return (
        <Root>
            <div className="container p-4">
                <div className="notification is-danger">{error}</div>

                <p>
                    <a href="/">Return to application</a>
                </p>
            </div>
        </Root>
    );
}

export function errorPage(error: string) {
    return <ErrorPage error={error} />;
}

