import { CommentInfo } from "../types/Types";

interface CommentProps {
  commentInfo: CommentInfo;
}

export default function SearchComment({ commentInfo }: CommentProps) {

  return (
    <div className="search-comment">
      {commentInfo.filteredRepos.length === 1 && commentInfo.search !== "" && commentInfo.language === "All" &&
        <div className="search-comment">
          <p><b>{commentInfo.filteredRepos.length}</b> result for repositories matching <b>{commentInfo.search}</b></p>
        </div>
      }
      {commentInfo.filteredRepos.length > 1 && commentInfo.search !== "" && commentInfo.language === "All" &&
        <div className="search-comment">
          <p><b>{commentInfo.filteredRepos.length}</b> results for repositories matching <b>{commentInfo.search}</b></p>
        </div>
      }
      {commentInfo.filteredRepos.length === 1 && commentInfo.language !== "All" && commentInfo.search === "" &&
        <div className="search-comment">
          <p><b>{commentInfo.filteredRepos.length}</b> result for repositories written in <b>{commentInfo.language}</b></p>
        </div>
      }
      {commentInfo.filteredRepos.length > 1 && commentInfo.language !== "All" && commentInfo.search === "" &&
        <div className="search-comment">
          <p><b>{commentInfo.filteredRepos.length}</b> results for repositories written in <b>{commentInfo.language}</b></p>
        </div>
      }
      {commentInfo.filteredRepos.length === 1 && commentInfo.search !== "" && commentInfo.language !== "All" &&
        <div className="search-comment">
          <p><b>{commentInfo.filteredRepos.length}</b> result for repositories matching <b>{commentInfo.search}</b> written in <b>{commentInfo.language}</b></p>
        </div>
      }
      {commentInfo.filteredRepos.length > 1 && commentInfo.search !== "" && commentInfo.language !== "All" &&
        <div className="search-comment">
          <p><b>{commentInfo.filteredRepos.length}</b> results for repositories matching <b>{commentInfo.search}</b> written in <b>{commentInfo.language}</b></p>
        </div>
      }
    </div>
  )
}