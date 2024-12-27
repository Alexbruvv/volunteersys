import { useContext } from "hono/jsx";
import { UserContext } from "../context";

export default function Navbar() {
    const user = useContext(UserContext);

    if (!user) {
        throw new Error("User not found in context");
    }

    return (
        <nav className="navbar is-primary mb-5" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <b>Volunteer System</b>
                </a>

                <a
                    role="button"
                    className="navbar-burger"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="nav-main"
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="nav-main" className="navbar-menu">
                <div className="navbar-start">
                    <a href="/" className="navbar-item">
                        Home
                    </a>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">{user.name}</a>

                        <div className="navbar-dropdown">
                            <a href="/auth/logout" className="navbar-item">
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

