import url from "../../utils/url";

export default function ChooseProviderPage() {
    return (
        <html>
            <head>
                <title>Authentication</title>
                <link rel="stylesheet" href={"https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css"}></link>
            </head>
            <body>
                <div className="container mt-6">
                    <div className="columns is-centered">
                        <div className="column is-one-third-desktop mx-4">
                            <div className="card">
                                <div className="card-header">
                                    <h1 className="card-header-title">Choose authentication provider</h1>
                                </div>
                                <div className="card-content">
                                    <a href={url("/auth/google")}>Sign in with Google</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}

