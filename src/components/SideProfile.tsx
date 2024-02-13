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
        
        <div className="octi-line">
          <svg className="octicon octicon-people" width={16} height={16}>
            <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56 3.012.749.749 0 0 1-.885.954.752.752 0 0 1-.549-.514 3.507 3.507 0 0 0-2.522-2.372.75.75 0 0 1-.574-.73v-.352a.75.75 0 0 1 .416-.672A1.5 1.5 0 0 0 11 5.5.75.75 0 0 1 11 4Zm-5.5-.5a2 2 0 1 0-.001 3.999A2 2 0 0 0 5.5 3.5Z"></path>
          </svg>
          <p><b>{location.state.followers}</b> followers · <b>{location.state.following}</b> following</p>
        </div>

        <div>
            {location.state.location && 
              <div className="octi-line">
                <svg className="octicon octicon-location" width={16} height={16}>
                  <path d="m12.596 11.596-3.535 3.536a1.5 1.5 0 0 1-2.122 0l-3.535-3.536a6.5 6.5 0 1 1 9.192-9.193 6.5 6.5 0 0 1 0 9.193Zm-1.06-8.132v-.001a5 5 0 1 0-7.072 7.072L8 14.07l3.536-3.534a5 5 0 0 0 0-7.072ZM8 9a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 9Z"></path>
                </svg>
                <p>{location.state.location}</p>
              </div>
            }

            {location.state.email && 
              <div className="octi-line">
                <svg className="octicon octicon-mail" width={16} height={16}>
                  <path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2ZM1.5 12.251c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V5.809L8.38 9.397a.75.75 0 0 1-.76 0L1.5 5.809v6.442Zm13-8.181v-.32a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v.32L8 7.88Z"></path>
                </svg>
                <p>{location.state.email}</p>
              </div>
            }

            {location.state.twitter_username &&
              <div className="octi-line">
                <svg xmlns="http://www.w3.org/2000/svg" className="octicon" width={16} height={16}>
                  <path d="M9.52217 6.77143L15.4785 0H14.0671L8.89516 5.87954L4.76437 0H0L6.24656 8.8909L0 15.9918H1.41155L6.87321 9.78279L11.2356 15.9918H16L9.52183 6.77143H9.52217ZM7.58887 8.96923L6.95596 8.0839L1.92015 1.03921H4.0882L8.15216 6.7245L8.78507 7.60983L14.0677 14.9998H11.8997L7.58887 8.96957V8.96923Z" fill="currentColor"></path>
                </svg>
                <p>@{location.state.twitter_username}</p>
              </div>
            }
        </div>
    </div> 
  )
}
