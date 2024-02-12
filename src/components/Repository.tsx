import { RepoData } from "../types/Types";
import moment from "moment";
import "../index.css"

interface RepoProps {
    repoInfo: RepoData;
}

export default function Repository({ repoInfo }: RepoProps) {

    return (
        <div id="repository-file">
            <div className="repo-main">
                <div className="first-line">
                    <h1>{repoInfo.name}</h1>
                    {repoInfo.private ? <p className="privacy">Private</p> : <p className="privacy">Public</p>}
                </div>
                <p>{repoInfo.description}</p>
            </div>

            <div className="repo-extra">
                {repoInfo.language && 
                <>
                    <div id="circle" className={repoInfo.language}></div>
                    <p>{repoInfo.language}</p>
                </>
                }
                <p>Updated {moment(repoInfo.updated_at).fromNow()}</p> {/* not always in this format */}
            </div>
        </div>
    )
}
