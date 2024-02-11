import { RepoData } from "../types/Types";
import moment from "moment";

interface RepoProps {
    repoInfo: RepoData;
}

export default function Repository({ repoInfo }: RepoProps) {

    return (
        <div className="repo">
            <h1>{repoInfo.name}</h1>
            <p>{repoInfo.description}</p>

            <div>
                <p>{repoInfo.language}</p>

                <p>Updated {moment(repoInfo.updated_at).fromNow()}</p> {/* not always in this format */}
            </div>
        </div>
    )
}