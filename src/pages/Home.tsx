import { FormEvent, MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Octokit } from "@octokit/rest";
import { UserData } from "../types/Types";

const GH_KEY: string = import.meta.env.VITE_GH_TOKEN;

function Home() {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [user, setUser] = useState<UserData>({
    login: "",
    id: 0,
    avatar_url: "",
    html_url: "",
    repos_url: "",
    name: "",
    company: null,
    location: "",
    email: null,
    bio: null,
    twitter_username: null,
    public_repos: 0,
    followers: 0,
    following: 0,
  })

  const octokit = new Octokit({
    auth: GH_KEY
  });

  const getUser = async () => {
    try {
      const response = await octokit.request(`GET /users/${username}`, {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });

      setUser(response.data);  

    } catch (error: unknown) {
      alert("No user found with that username");

      if (error instanceof Error) {
        console.log(error.stack);
      }
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(username);
    await getUser();
    setUsername("");
  }

  const navToProfile = async (e: MouseEvent) => {
    e.preventDefault();
    navigate(`/${user.login}`, {
      state: {
        login: user.login,
        id: user.id,
        avatar_url: user.avatar_url,
        repos_url: user.repos_url,
        name: user.name,
        company: user.company,
        location: user.location,
        email: user.email,
        bio: user.bio,
        twitter_username: user.twitter_username,
        followers: user.followers,
        following: user.following,
      }
    });
  }

  return (
    <div id="home-file">
      <header className="home-header">
        <img src="/favicon.ico" />
        <p>Welcome to GitHub</p>
      </header>

      <div className='home-body'>
        <form onSubmit={handleSubmit}>
          <input 
            onChange={(e) => setUsername(e.target.value)} 
            value={username}
            placeholder='Search a user'
          />
          <button type="submit">Search</button>
        </form>

        {user.login !== "" &&
          <div className='listed-user'>
            <div>
              <img src={user.avatar_url} />
            </div>

            <div className='user-info'>
              <span className='user-name' onClick={navToProfile}>
                {user.name && user.name}
              </span>
              
              <span className='user-username' onClick={navToProfile}>
                {user.login}
              </span>
              
              <br />
              {user.bio && <p>{user.bio}</p>}
              {user.location && <p>{user.location}</p>}
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default Home;

