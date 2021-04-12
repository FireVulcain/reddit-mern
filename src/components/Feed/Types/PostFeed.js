import React from "react";
import parse, { domToReact } from "html-react-parser";
import { Header } from "./commonContent/Header";
import { Votes } from "./commonContent/Votes";
import { Footer } from "./commonContent/Footer";

export const PostFeed = ({ post, votes }) => {
    return (
        <div className="feed-post" data-id={post._id}>
            <Votes votes={votes} postId={post._id} postUserId={post.userId} upvotes={post.upvotes} downvotes={post.downvotes} />
            <div className="feed-post-content">
                <Header communityName={post.communityName} userName={post.userName} createdAt={post.createdAt} title={post.title} />
                <div className="feed-post-content-text">
                    {parse(post.content, {
                        replace: (domNode) => {
                            if (
                                domNode.name === "h1" ||
                                domNode.name === "h2" ||
                                domNode.name === "h3" ||
                                domNode.name === "h4" ||
                                domNode.name === "h5" ||
                                domNode.name === "h6"
                            )
                                return <p className={`feed-post-content-${domNode.name}`}>{domToReact(domNode.children)}</p>;
                        },
                    })}
                </div>
                <Footer communityName={post.communityName} idPost={post._id} nbComments={post.nbComments} postName={post.title} />
            </div>
        </div>
    );
};
