import { Link } from "react-router-dom";

export default function TopNav() {
    return (
        <div id="topnav-file">
            <nav>
                <Link to="/">
                    <img src="/favicon.ico" />
                    Home
                </Link>
            </nav>

            <nav>
                <a>Overview</a>
                <a>Repositories</a>
                <a>Projects</a>
            </nav>
        </div>
    )
}
