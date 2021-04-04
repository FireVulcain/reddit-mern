import React from "react";
import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";

/* Assets */
import communityIcon from "./../../../../assets/images/communityIcon.png";

export const Header = ({ communityName, userName, createdAt, title }) => {
    return (
        <>
            <div className="feed-post-content-header">
                <div className="feed-post-content-header-communityName">
                    <Link to={`/r/${communityName}`}>
                        <img src={communityIcon} alt="community logo" />
                        <span>{communityName}</span>
                    </Link>
                </div>
                <div className="feed-post-content-header-author">
                    <span>
                        • Posted by <Link to={`/u/${userName}`}>{userName}</Link>
                    </span>
                </div>
                <div className="feed-post-content-header-date">
                    <TimeAgo datetime={createdAt} />
                </div>
            </div>
            <div className="feed-post-content-title">
                <h2>{title}</h2>
            </div>
        </>
    );
};
