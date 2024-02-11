import { useLocation } from "react-router-dom";

export default function SideProfile() {
    const location = useLocation();

  return (
    <div className="sideprofile-file">
        <img src={location.state.avatar_url} className="profile-img" />
        
        <div className="profile">
            <h2>{location.state.name}</h2>
            <h3>{location.state.login}</h3>
        </div>

        {location.state.bio && <p>{location.state.bio}</p>}
        
        <p>{location.state.followers} followers · {location.state.following} following</p>

        <div>
            {location.state.location && <p>{location.state.location}</p>}
            {location.state.email && <p>{location.state.email}</p>}
            {location.state.twitter_username && <p>@{location.state.twitter_username}</p>}
        </div>
    </div> 
  )
}
