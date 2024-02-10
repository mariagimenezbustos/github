import { Link, useLocation } from "react-router-dom";

export default function Profile() {
  const location = useLocation();

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
      </nav>

      <div className="grid">
        <div className="side">
          <img src={location.state.avatar_url} />
          <h1>Profile of {location.state.name}</h1>
        </div>

        <div className="main">

        </div>
      </div>
    </div>
  )
}
