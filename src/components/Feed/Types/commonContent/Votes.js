import React from "react";

/* Icons */
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";

export const Votes = ({ upvotes, downvotes }) => {
    return (
        <div className="feed-post-votes">
            <button className="feed-post-upvotes">
                <BiUpvote />
            </button>
            <div className="feed-post-votes-counter">{upvotes - downvotes}</div>
            <button className="feed-post-downvotes">
                <BiDownvote />
            </button>
        </div>
    );
};
