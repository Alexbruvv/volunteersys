export default function Navbar() {
    return (
        <nav className="navbar is-primary mb-4" role="navigation" aria-label="main navigation">
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

                <div className="navbar-end"></div>
            </div>
        </nav>
    );
}

