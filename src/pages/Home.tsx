import { FormEvent, useEffect, useState } from 'react';
import { Octokit } from "@octokit/rest";
// import { createTokenAuth } from "@octokit/auth-token";

const GH_KEY: string = import.meta.env.VITE_GH_TOKEN;

function Home() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<UserData>({
    login: "",
    id: 0,
    node_id: "", // needed?
    avatar_url: "",
    gravatar_id: null, // needed?
    url: "",
    html_url: "",
    followers_url: "", // needed?
    following_url: "", // needed?
    gists_url: "", // needed?
    starred_url: "", // needed?
    subscriptions_url: "", // needed?
    organizations_url: "", // needed?
    repos_url: "",
    events_url: "", // needed?
    received_events_url: "", // needed?
    type: "", // needed?
    site_admin: false, // needed?
    name: "",
    company: null, // needed?
    blog: null, // needed?
    location: "",
    email: null, // needed?
    hireable: null, // needed?
    bio: null, // needed?
    twitter_username: null, // needed?
    public_repos: 0, // needed?
    public_gists: 0, // needed?
    followers: 0,
    following: 0,
    created_at: "", // needed?
    updated_at: "", // needed?
    private_gists: 0, // needed?
    total_private_repos: 0, // needed?
    owned_private_repos: 0, // needed?
    disk_usage: 0, // needed?
    collaborators: 0, // needed?
    two_factor_authentication: false, // needed?
  })

  interface UserData {
    login: string,
    id: number,
    node_id: string, // needed?
    avatar_url: string,
    gravatar_id: string | null, // needed?
    url: string,
    html_url: string,
    followers_url: string, // needed?
    following_url: string, // needed?
    gists_url: string, // needed?
    starred_url: string, // needed?
    subscriptions_url: string, // needed?
    organizations_url: string, // needed?
    repos_url: string,
    events_url: string, // needed?
    received_events_url: string, // needed?
    type: string, // needed?
    site_admin: boolean, // needed?
    name: string | null,
    company: string | null, // needed?
    blog: string | null, // needed?
    location: string | null,
    email: string | null, // needed?
    hireable: boolean | null, // needed?
    bio: string | null, // needed?
    twitter_username?: string | null | undefined, // needed?
    public_repos: number, // needed?
    public_gists: number, // needed?
    followers: number,
    following: number,
    created_at: string, // needed?
    updated_at: string, // needed?
    private_gists?: number | undefined, // needed?
    total_private_repos?: number | undefined, // needed?
    owned_private_repos?: number | undefined, // needed?
    disk_usage?: number | undefined, // needed?
    collaborators?: number, // needed?
    two_factor_authentication?: boolean, // needed?
  }

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
      if (error instanceof Error) {
        console.log(error.name);
        console.log(error.message);
        console.log(error.stack);
      // } else {
      //   // fix with TS
      //   console.log(error.message);
      }
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(username);
    await getUser();
    setUsername("");
  }

  // debugging purposes:
  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to GitHub</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <label>Search a user</label>
        <input 
          onChange={(e) => setUsername(e.target.value)} 
          value={username}>
        </input>
        <button type="submit">Search</button>
      </form>

      {/* handle when no user found */}
      <div>{user.login !== "" ? <p><a href={`/${user.login}`}>{user.id}, {user.name}</a></p> : "no"}</div>
    </div>
  );
}

export default Home;

