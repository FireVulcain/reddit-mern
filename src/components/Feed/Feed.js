import React from "react";

import { PostFeed } from "./types/PostFeed";
import { MediaFeed } from "./types/MediaFeed";
import { LinkFeed } from "./types/LinkFeed";

import "./types/types.scss";

export const Feed = ({ posts }) => {
    return (
        <div className="feed-container">
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
