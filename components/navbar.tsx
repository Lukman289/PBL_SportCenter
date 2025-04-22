export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <a href="/">Sport Center</a>
            </div>
            <ul className="navbar-menu">
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
            </ul>
        </nav>
    );
}