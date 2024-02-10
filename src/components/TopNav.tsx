import { Link } from "react-router-dom";

export default function TopNav() {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
            </nav>

            <nav>
                <a>Overview</a>
                <a>Repositories</a>
                <a>Projects</a>
            </nav>
        </div>
    )
}
