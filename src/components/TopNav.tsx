import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { RepoData } from "../types/Types";
import { Octokit } from "@octokit/rest";

const GH_KEY: string = import.meta.env.VITE_GH_TOKEN;

export default function TopNav() {
    const location = useLocation();
    const [ repos, setRepos ] = useState<RepoData[]>([]);

    const throwAlert = () => {
        alert("This page is under construction. Please, try again later.")
    }

    useEffect(() => {
        getRepos();
    }, []);

    const getRepos = async () => {
        try {
          const octokit = new Octokit({
            auth: GH_KEY
          })
    
          const response = await octokit.request(`GET /users/${location.state.login}/repos`, {
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          })
    
          setRepos(response.data);
        
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.log(error.stack);
          }
        }
      }

    return (
        <div id="topnav-file">
            <nav className="github-nav">
                <Link to="/">
                    <img src="/favicon.ico" />
                    <p>home</p>
                </Link>
            </nav>

            <nav className="repos-nav">
                <a onClick={throwAlert}>
                    <svg className="octicon octicon-book UnderlineNav-octicon" width={16} height={16}>
                        <path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324.004-5.073-.002-2.253A2.25 2.25 0 0 0 5.003 2.5H1.5v9h3.757a3.75 3.75 0 0 1 1.994.574ZM8.755 4.75l-.004 7.322a3.752 3.752 0 0 1 1.992-.572H14.5v-9h-3.495a2.25 2.25 0 0 0-2.25 2.25Z"></path>
                    </svg>
                    <span>Overview</span>
                </a>
                <a className="clicked">
                    <svg className="octicon octicon-repo UnderlineNav-octicon" width={16} height={16}>
                        <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
                    </svg>
                    <span>Repositories <span className="repo-amount">{repos.length}</span></span>
                </a>
                <a onClick={throwAlert}>
                    <svg className="octicon octicon-table UnderlineNav-octicon" width={16} height={16}>
                        <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25ZM6.5 6.5v8h7.75a.25.25 0 0 0 .25-.25V6.5Zm8-1.5V1.75a.25.25 0 0 0-.25-.25H6.5V5Zm-13 1.5v7.75c0 .138.112.25.25.25H5v-8ZM5 5V1.5H1.75a.25.25 0 0 0-.25.25V5Z"></path>
                    </svg>
                    <span>Projects</span>
                </a>
            </nav>
        </div>
    )
}
