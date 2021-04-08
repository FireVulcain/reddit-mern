import React from "react";

import { Votes } from "./commonContent/Votes";
import { Header } from "./commonContent/Header";
import { Footer } from "./commonContent/Footer";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const MediaFeed = ({ post, votes }) => {
    const settings = {
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: false,
        adaptiveHeight: false,
        infinite: false,
    };

    return (
        <div className="feed-post" data-id={post._id}>
            <Votes votes={votes} postId={post._id} postUserId={post.userId} upvotes={post.upvotes} downvotes={post.downvotes} />
            <div className="feed-post-content">
                <Header communityName={post.communityName} userName={post.userName} createdAt={post.createdAt} title={post.title} />
                <div className="feed-post-content-media">
                    {post.media.length > 1 ? (
                        <Slider {...settings}>
                            {post.media.map((data, key) => {
                                return (
                                    <a key={key} href={data.url} target="_blank" rel="noreferrer">
                                        <img src={data.url} alt="Post content" />
                                    </a>
                                );
                            })}
                        </Slider>
                    ) : (
                        post.media.map((data, key) => {
                            if (data.type.includes("video")) {
                                return (
                                    <video key={key} controls>
                                        <source src={data.url} />
                                    </video>
                                );
                            } else {
                                return (
                                    <a key={key} href={data.url} target="_blank" rel="noreferrer">
                                        <img src={data.url} alt="Post content" />
                                    </a>
                                );
                            }
                        })
                    )}
                </div>
                <Footer communityName={post.communityName} idPost={post._id} nbComments={post.nbComments} />
            </div>
        </div>
    );
};
