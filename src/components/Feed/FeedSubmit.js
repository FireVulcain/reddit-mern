import React from "react";
import { Link, useHistory } from "react-router-dom";

/* Assets */
import { IoImageSharp } from "react-icons/io5";
import { RiLinksLine } from "react-icons/ri";

export const FeedSubmit = ({ userName, userAvatar }) => {
    const history = useHistory();
    return (
        <div className="feed-submit-shortcut">
            <Link to={`/u/${userName}`} className="feed-submit-shortcut-pfp">
                <img src={userAvatar} alt="username profile" />
            </Link>
            <input className="feed-submit-shortcut-type-post" type="text" placeholder="Create Post" onClick={() => history.push("/submit")} />
            <Link to={`/submit/media`} className="feed-submit-shortcut-icon">
                <IoImageSharp />
            </Link>
            <Link to={`/submit/link`} className="feed-submit-shortcut-icon">
                <RiLinksLine />
            </Link>
        </div>
    );
};
