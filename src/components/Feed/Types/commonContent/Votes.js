import React, { useEffect, useState } from "react";
import { useAuth } from "./../../../../contexts/AuthContext";
import axios from "./../../../../axios";
import { v4 as uuidv4 } from "uuid";

/* Icons */
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";

export const Votes = ({ votes, postId, upvotes, downvotes }) => {
    const { currentUser } = useAuth();
    const [isUpvote, setIsUpvote] = useState(0);
    const [currentVote, setCurrentVote] = useState([]);
    const [upvote, setUpvote] = useState(upvotes);
    const [downvote, setDownvote] = useState(downvotes);

    useEffect(() => {
        let votesFilter = votes.filter((vote) => vote.postId === postId);
        if (votesFilter.length > 0) {
            setIsUpvote(votesFilter[0].vote);
            setCurrentVote(votesFilter);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleUpvote = () => {
        const data = {
            voteId: currentVote.length > 0 ? currentVote[0].voteId : uuidv4(),
            postId: postId,
            userId: currentUser.userId,
        };
        setIsUpvote(1);
        if (isUpvote > 0) {
            setIsUpvote(0);
            setUpvote((prevState) => prevState - 1);
            axios.put("/vote/update", { ...data, vote: 0 }).then(() => {
                axios.put("/posts/vote/update", { postId, votes: { upvotes: -1 } });
                setCurrentVote([data]);
            });
        } else if (isUpvote === 0) {
            setUpvote((prevState) => prevState + 1);
            axios.put("/vote/update", { ...data, vote: 1 }).then(() => {
                axios.put("/posts/vote/update", { postId, votes: { upvotes: +1 } });
                setCurrentVote([data]);
            });
        } else {
            setUpvote((prevState) => prevState + 1);
            setDownvote((prevState) => prevState + 1);
            axios.put("/vote/update", { ...data, vote: 1 }).then(() => {
                axios.put("/posts/vote/update", { postId, votes: { upvotes: +1, downvotes: +1 } });
                setCurrentVote([data]);
            });
        }
    };
    const handleDownvote = () => {
        const data = {
            voteId: currentVote.length > 0 ? currentVote[0].voteId : uuidv4(),
            postId: postId,
            userId: currentUser.userId,
        };
        setIsUpvote(-1);

        if (isUpvote < 0) {
            setIsUpvote(0);
            setDownvote((prevState) => prevState + 1);
            axios.put("/vote/update", { ...data, vote: 0 }).then(() => {
                axios.put("/posts/vote/update", { postId, votes: { downvotes: +1 } });
                setCurrentVote([data]);
            });
        } else if (isUpvote === 0) {
            setDownvote((prevState) => prevState - 1);
            axios.put("/vote/update", { ...data, vote: -1 }).then(() => {
                axios.put("/posts/vote/update", { postId, votes: { downvotes: -1 } });
                setCurrentVote([data]);
            });
        } else {
            setUpvote((prevState) => prevState - 1);
            setDownvote((prevState) => prevState - 1);
            axios.put("/vote/update", { ...data, vote: -1 }).then(() => {
                axios.put("/posts/vote/update", { postId, votes: { upvotes: -1, downvotes: -1 } });
                setCurrentVote([data]);
            });
        }
    };
    return (
        <div className="feed-post-votes">
            <button className={`feed-post-upvotes ${isUpvote > 0 ? "feed-post-vote-active" : ""}`} onClick={() => handleUpvote()}>
                <BiUpvote />
            </button>
            <div className="feed-post-votes-counter">
                {upvote} <span className="feed-post-vote-separator"></span>
                {downvote}
            </div>
            <button className={`feed-post-downvotes ${isUpvote < 0 ? "feed-post-vote-active" : ""}`} onClick={() => handleDownvote()}>
                <BiDownvote />
            </button>
        </div>
    );
};
