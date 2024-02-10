import { FormEvent, useState } from 'react';
import { Octokit } from "@octokit/rest";
// import { createTokenAuth } from "@octokit/auth-token";

const GH_KEY: string = import.meta.env.VITE_GH_TOKEN;

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<User>({
    url: "",
    data: {
        login: "",
        id: 0
    }
  })

  interface User {
    url: string,
    data: Data,
  }

  interface Data {
    login: string,
    id: number,
  }

  const octokit = new Octokit({
    auth: GH_KEY
  });

  const getUsers = async () => {
    try {
      const response = await octokit.request("GET /users/{username}", {
        username: `${username}`,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });

      setUser(response);

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
    getUsers();
  }

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
      <div>{user.data.login !== "" ? <p><a href={`/${user.data.login}`}>{user.data.id}</a></p> : "no"}</div>
    </div>
  );
}

export default App;

