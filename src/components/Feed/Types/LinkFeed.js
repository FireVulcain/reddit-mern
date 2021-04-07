import React from "react";

import { Votes } from "./commonContent/Votes";
import { Header } from "./commonContent/Header";
import { Footer } from "./commonContent/Footer";

import { ReactTinyLink } from "react-tiny-link";

import Broken from "./../../../assets/images/broken_link.png";
import { BiLinkExternal } from "react-icons/bi";

export const LinkFeed = ({ post, votes }) => {
    const truncateURL = (url) => {
        let urlArray = url.replace(/(^\w+:|^)\/\//, "").split("/");
        const domain = urlArray[0];
        urlArray.shift();
        const truncatedURL = urlArray.join("/").substring(0, 6);

        return `${domain}/${truncatedURL}${truncatedURL ? "..." : ""}`;
    };

    return (
        <div className="feed-post" data-id={post._id}>
            <Votes votes={votes} postId={post._id} upvotes={post.upvotes} downvotes={post.downvotes} />
            <div className="feed-post-content">
                <Header communityName={post.communityName} userName={post.userName} createdAt={post.createdAt} title={post.title} />
                <div className="feed-post-content-link">
                    <ReactTinyLink
                        cardSize="small"
                        showGraphic={true}
                        maxLine={2}
                        minLine={1}
                        proxyUrl="http://localhost:9000/proxy"
                        url={post.content}
                        defaultMedia={Broken}
                    />
                    <a href={post.content} target="_blank" rel="noreferrer">
                        {truncateURL(post.content)}
                        <BiLinkExternal />
                    </a>
                </div>
                <Footer communityName={post.communityName} idPost={post._id} nbComments={post.nbComments} />
            </div>
        </div>
    );
};
