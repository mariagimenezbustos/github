import { useLocation } from "react-router-dom";

export default function SideProfile() {
    const location = useLocation();

  return (
    <div className="side">
        <img src={location.state.avatar_url} className="profile-img" />
        
        <div className="profile">
        <h2>{location.state.name}</h2>
        <h3>{location.state.login}</h3>
        </div>

        <p>{location.state.followers} followers · {location.state.following} following</p>
        {location.state.email !== null && <p>{location.state.email}</p>}
    </div> 
  )
}
