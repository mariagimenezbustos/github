import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Octokit } from "@octokit/rest";
import moment from "moment";
import SideProfile from "../components/SideProfile";
import TopNav from "../components/TopNav";

const GH_KEY: string = import.meta.env.VITE_GH_TOKEN;

export default function Profile() {
  const location = useLocation();
  const [ search, setSearch ] = useState<string>("");
  const [ repos, setRepos ] = useState<RepoData[]>([]);
  // const [ language, setLanguage ] = useState<string>("");
  const [ allLanguages, setAllLanguages ] = useState<string[]>([]);
  const [ reposByLang, setReposByLang ] = useState<RepoData[]>([]);

  interface RepoData {
    id: number,
    node_id: string,
    name: string,
    full_name: string,
    private: boolean,
    // owner: {},
    html_url: string,
    description: string,
    fork: boolean,
    url: string,
    forks_url: string,
    keys_url: string,
    collaborators_url: string,
    teams_url: string,
    hooks_url: string,
    issue_events_url: string,
    events_url: string,
    assignees_url: string,
    branches_url: string,
    tags_url: string,
    blobs_url: string,
    git_tags_url: string,
    git_refs_url: string,
    trees_url: string,
    statuses_url: string,
    languages_url: string,
    stargazers_url: string,
    contributors_url: string,
    subscribers_url: string,
    subscription_url: string,
    commits_url: string,
    git_commits_url: string,
    comments_url: string,
    issue_comment_url: string,
    contents_url: string,
    compare_url: string,
    merges_url: string,
    archive_url: string,
    downloads_url: string,
    issues_url: string,
    pulls_url: string,
    milestones_url: string,
    notifications_url: string,
    labels_url: string,
    releases_url: string,
    deployments_url: string,
    created_at: string,
    updated_at: string,
    pushed_at: string,
    git_url: string,
    ssh_url: string,
    clone_url: string,
    svn_url: string,
    homepage: string,
    size: number,
    stargazers_count: number,
    watchers_count: number,
    language: string,
    has_issues: boolean,
    has_projects: boolean,
    has_downloads: boolean,
    has_wiki: boolean,
    has_pages: boolean,
    has_discussions: boolean,
    forks_count: number,
    mirror_url: null,
    archived: boolean,
    disabled: boolean,
    open_issues_count: number,
    license: null,
    allow_forking: boolean,
    is_template: boolean,
    web_commit_signoff_required: boolean,
    topics: [],
    visibility: string,
    forks: number,
    open_issues: number,
    watchers: number,
    default_branch: string,
    permissions: {
      admin: boolean,
      maintain: boolean,
      push: boolean,
      triage: boolean,
      pull: boolean
    }
  }

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
      alert("No repositories found for this user");

      if (error instanceof Error) {
        console.log(error.stack);
      }
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // await getRepos(); // update to filter repos
    setSearch("");
  }

  const handleLanguageChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    console.log(value);

    if (value === "All") {
      setReposByLang([]);
    } else {
      const filteredByLang = repos.filter(repo => repo.language === value);
      setReposByLang(filteredByLang);
    }
  }

  const getLanguages = () => {
    const langArr: Array<string> = [];

    for (let i = 0; i < repos.length; i++) {
      let currLang = repos[i].language;

      if (!langArr.includes(currLang) && currLang !== null || undefined) {
        langArr.push(currLang)
      }
    }

    setAllLanguages(langArr);
  }

  useEffect(() => {
    async function getAllData() {
      await getRepos();
      if (repos.length > 0) getLanguages();
    }

    getAllData();
  }, [repos.length]);

  // useEffect(() => {
  //   const filteredByLang = repos.filter(repo => repo.language === language);
  //   setReposByLang(filteredByLang);
  // }, [language])

  return (
    <div className="profile-file">
      <TopNav />

      <div className="grid">
        <SideProfile />

        <div className="main">
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Find a repository..."
              onChange={(e) => setSearch(e.target.value)} 
              value={search}
            />
            <button>Type</button>
            <label>Language
              <select
                // value={language} // not working
                onChange={(e) => handleLanguageChange(e)}
              >
                <option key="all" value="All">All</option>
                {allLanguages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </label>
          </form>

          <div className="all-repos">
            {repos && reposByLang.length === 0 && repos.map((repo) => (
              <div key={repo.id} className="repo">
                <h1>{repo.name}</h1>
                {/* <p>{repo.private ? "Private" : "Public"}</p> */} {/* not on other profiles */}
                <p>{repo.description}</p>

                <div>
                  <p>{repo.language}</p>

                  <p>Updated {moment(repo.updated_at).fromNow()}</p> {/* not always in this format */}
                </div>
              </div>
            ))}
          </div>

          <div className="lang-repos">
            {reposByLang && reposByLang.map((repo) => (
              <div key={repo.id} className="repo">
                <h1>{repo.name}</h1>
                {/* <p>{repo.private ? "Private" : "Public"}</p> */} {/* not on other profiles */}
                <p>{repo.description}</p>

                <div>
                  <p>{repo.language}</p>

                  <p>Updated {moment(repo.updated_at).fromNow()}</p> {/* not always in this format */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
