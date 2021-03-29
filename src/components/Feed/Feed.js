import React from "react";
import "./Feed.scss";
import { PostFeed } from "./Types/PostFeed";
import { MediaFeed } from "./Types/MediaFeed";
import { LinkFeed } from "./Types/LinkFeed";

export const Feed = ({ posts }) => {
    // console.log(posts);
    return posts.map((post) => {
        if (post.type === "post") {
            return <PostFeed key={post._id} data-id={post._id} />;
        } else if (post.type === "media") {
            return <MediaFeed key={post._id} data-id={post._id} />;
        } else {
            return <LinkFeed key={post._id} data-id={post._id} />;
        }
    });
};
