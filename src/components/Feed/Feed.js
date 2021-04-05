import React from "react";

import { FeedSubmit } from "./FeedSubmit";
import { PostFeed } from "./types/PostFeed";
import { MediaFeed } from "./types/MediaFeed";
import { LinkFeed } from "./types/LinkFeed";

import { useAuth } from "./../../contexts/AuthContext";

/* Assets */
import "./types/types.scss";
import "./Feed.scss";

export const Feed = ({ posts }) => {
    const { currentUser } = useAuth();

    return (
        <div className="feed-container spacing-top-header">
            {currentUser && <FeedSubmit userName={currentUser.userName} userAvatar={currentUser.userAvatar} />}
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
