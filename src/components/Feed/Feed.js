import React, { useEffect, useState } from "react";
import axios from "./../../axios";

import { FeedSubmit } from "./FeedSubmit";
import { PostFeed } from "./types/PostFeed";
import { MediaFeed } from "./types/MediaFeed";
import { LinkFeed } from "./types/LinkFeed";

import { useAuth } from "./../../contexts/AuthContext";

/* Assets */
import "./types/types.scss";
import "./Feed.scss";

export const Feed = ({ posts, isSingle = false }) => {
    const { currentUser } = useAuth();
    const [votesUser, setVotesUser] = useState([]);

    useEffect(() => {
        if (currentUser) {
            axios.get("/vote/userId", { params: { userId: currentUser.userId } }).then((res) => setVotesUser(res.data));
        }
    }, [currentUser]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="feed-container spacing-top-header">
            {currentUser && !isSingle && <FeedSubmit userName={currentUser.userName} userAvatar={currentUser.userAvatar} />}
            {posts.map((post) => {
                if (post.type === "post") {
                    return <PostFeed key={post._id} post={post} votes={votesUser} />;
                } else if (post.type === "media") {
                    return <MediaFeed key={post._id} post={post} votes={votesUser} />;
                } else {
                    return <LinkFeed key={post._id} post={post} votes={votesUser} />;
                }
            })}
        </div>
    );
};
