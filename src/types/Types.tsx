export interface RepoData {
  id: number,
  node_id: string,
  name: string,
  full_name: string,
  private: boolean,
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

export interface UserData {
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

export interface Query {
  nameSearch?: string | null,
  langFilter?: string,
}

export interface CommentInfo {
  filteredRepos: RepoData[],
  language?: string | null,
  search?: string | null,
}