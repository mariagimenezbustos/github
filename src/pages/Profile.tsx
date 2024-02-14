import { ChangeEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Octokit } from "@octokit/rest";
import { RepoData } from "../types/Types";
// import { Query } from "../types/Types";
import SideProfile from "../components/SideProfile";
import TopNav from "../components/TopNav";
import Repository from "../components/Repository";
import SearchComment from "../components/SearchComment";

const GH_KEY: string = import.meta.env.VITE_GH_TOKEN;

export default function Profile() {
  const location = useLocation();
  const [ search, setSearch ] = useState<string>("");
  const [ language, setLanguage ] = useState<string>("All");
  const [ repos, setRepos ] = useState<RepoData[]>([]);
  const [ allLanguages, setAllLanguages ] = useState<string[]>([]);
  const [ filteredRepos, setFilteredRepos ] = useState<RepoData[]>([]);
  const [ filter, setFilter ] = useState({
    nameSearch: "",
    langFilter: "All",
  });

  useEffect(() => {
    async function getAllData() {
      await getRepos();
      if (repos.length > 0) getLanguages();
    }

    getAllData();
  }, [repos.length]);

  useEffect(() => {
    filterEverything();
  }, [language]);

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

  const filterEverything = async () => {
    let filtered: RepoData[] = [];

    if (filter.langFilter === "All") {
      if (filter.nameSearch !== "") {
        for (let i = 0; i < repos.length; i++) {
          if (repos[i].name.toLowerCase().includes(search)) filtered.push(repos[i]);
        }
      } else if (search === "") {
        filtered = repos;
      }
    } else if (filter.langFilter !== "All") {
      const firstFilter: RepoData[] = repos.filter(repo => repo.language === filter.langFilter);

      if (filter.nameSearch !== "") {
        for (let i = 0; i < firstFilter.length; i++) {
          if (firstFilter[i].name.toLowerCase().includes(search)) {
            filtered.push(firstFilter[i])
          }
        }
      } else {
        filtered = firstFilter;
      }
    }

    setFilteredRepos(filtered);
  }

  const setNameSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const {value} = e.target;

    setFilter((state) => ({...state, nameSearch: value}));

    setSearch(value);
    filterEverything();
  }

  const setLangFilter = async (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const {value} = e.target;

    setFilter((state) => ({...state, langFilter: value}));

    setLanguage(value);
    filterEverything();
  }

  const clearFilters = () => {
    setSearch("");
    setLanguage("All");

    const searchText = document.getElementById("searchInput") as HTMLInputElement;
    searchText.value = ""

    const langSelect = document.getElementById("langSelect") as HTMLSelectElement;
    langSelect.value = "All";

    setFilter({nameSearch: "", langFilter: "All"});
    setFilteredRepos([]);
  }

  return (
    <div id="profile-file">
      <TopNav />

      <div className="grid">
        <SideProfile />

        <div className="main">
          <div className="search-repo">
            <input
              placeholder="Find a repository..."
              onChange={(e) => setNameSearch(e)}
              type="search"
              id="searchInput"
            />

            <div className="select-wrap">
              <label>Language</label>
              <select
                onChange={(e) => setLangFilter(e)}
                id="langSelect"
              >
                <option key="all" value="All">All</option>
                {allLanguages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="all-repos">
            {repos.length && language === "All" && search === "" && filteredRepos.length === 0 
            && repos.map((repo) => (
              <Repository key={repo.id} repoInfo={repo} />
            ))}
          </div>

          <div className="filtered-repos">
            {(language !== "All" || search !== "") && 
              <div className="comment">
                <SearchComment commentInfo={{filteredRepos, language, search}} />
                <a className="clear-filter" onClick={clearFilters}>
                  <svg className="octicon octicon-x" width={18} height={18}>
                    <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"></path>
                  </svg>
                  <p>Clear filter</p>
                </a>
              </div>
            }

            {filteredRepos.length > 0 &&
              filteredRepos.map((repo) => (
                <Repository key={repo.id} repoInfo={repo} />
              ))}
          </div>

          <div>
            {(repos.length === 0 || (filteredRepos.length === 0 && search !== "")) &&
              <p>No repositories found for this user or with these filters</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
