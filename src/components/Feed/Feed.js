import React from "react";
import { Link, useHistory } from "react-router-dom";

import { PostFeed } from "./types/PostFeed";
import { MediaFeed } from "./types/MediaFeed";
import { LinkFeed } from "./types/LinkFeed";

/* Assets */
import "./types/types.scss";
import "./Feed.scss";
import communityIcon from "./../../assets/images/communityIcon.png";
import { IoImageSharp } from "react-icons/io5";
import { RiLinksLine } from "react-icons/ri";

export const Feed = ({ posts }) => {
    const history = useHistory();

    return (
        <div className="feed-container">
            <div className="feed-submit-shortcut">
                <Link to={`/u/username`} className="feed-submit-shortcut-pfp">
                    <img src={communityIcon} alt="username profile" />
                </Link>
                <input className="feed-submit-shortcut-type-post" type="text" placeholder="Create Post" onClick={() => history.push("/submit")} />
                <Link to={`/submit/media`} className="feed-submit-shortcut-icon">
                    <IoImageSharp />
                </Link>
                <Link to={`/submit/link`} className="feed-submit-shortcut-icon">
                    <RiLinksLine />
                </Link>
            </div>
            {posts.map((post) => {
                if (post.type === "post") {
                    return <PostFeed key={post._id} post={post} />;
                } else if (post.type === "media") {
                    return <MediaFeed key={post._id} post={post} />;
                } else {
                    return <LinkFeed key={post._id} post={post} />;
                }
            })}
        </div>
    );
};
