import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Feed } from "../Feed/Feed";
import axios from "./../../axios";

import { useAuth } from "./../../contexts/AuthContext";

import "./Community.scss";

export const Community = () => {
    const { communityName } = useParams();
    const history = useHistory();
    const { currentUser } = useAuth();

    const [communityData, setCommunityData] = useState({});
    const [userFollowList, setUserFollowList] = useState();
    const [isFollowing, setIsFollowing] = useState(false);
    const [followingData, setFollowingData] = useState(false);
    const [joinedText, setJoinedText] = useState("Joined");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("/communities/communityName", { params: { communityName: communityName } }).then((res) => {
            if (res.data.length === 0) {
                return history.push("/");
            } else {
                if (currentUser) {
                    axios.get("/follow/userId", { params: { userId: currentUser.userId } }).then((res) => {
                        return setUserFollowList(res.data);
                    });
                } else {
                    setUserFollowList([]);
                }

                return setCommunityData(...res.data);
            }
        });
    }, [communityName]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (communityData && userFollowList) {
            let isFollowing = userFollowList.filter((follow) => follow.communityId === communityData.communityId);
            if (isFollowing.length > 0) {
                setFollowingData(...isFollowing);
                return setIsFollowing(true);
            }
        }
    }, [userFollowList]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (communityData && Object.keys(communityData).length !== 0 && communityData.constructor === Object) {
            axios.get("/posts/community", { params: { communityId: communityData.communityId } }).then((res) => {
                setPosts(res.data);
            });
        }
    }, [communityData]);

    const handleUnfollow = (followId) => {
        axios.delete("/follow/remove", { params: { followId } }).then(() => {
            setIsFollowing(false);
            setFollowingData({});
            setUserFollowList(userFollowList.filter((list) => list._id !== followId));
        });
    };
    const handleFollow = () => {
        const data = {
            communityId: communityData.communityId,
            userId: currentUser.userId,
            communityName: communityData.communityName,
        };
        axios.post("/follow/new", data).then((res) => {
            setFollowingData(res.data);
            setUserFollowList((prevState) => [...prevState, res.data]);
        });
    };

    return (
        <div className="spacing-top-header single-community">
            <div className="single-community-banner-container">
                <span className="single-community-banner"></span>
                <div className="single-community-banner-content">
                    <img src={communityData.avatar} alt={communityData.communityName} />
                    <div className="single-community-titles">
                        <h1>{communityData.title}</h1>
                        <h2>r/{communityData.communityName}</h2>
                    </div>
                    {userFollowList ? (
                        isFollowing ? (
                            <button
                                onMouseEnter={() => setJoinedText("Leave")}
                                onMouseLeave={() => setJoinedText("Joined")}
                                className="single-community-joined-button"
                                onClick={() => handleUnfollow(followingData._id)}
                            >
                                {joinedText}
                            </button>
                        ) : (
                            <button onClick={() => handleFollow()} className="single-community-join-button">
                                Join
                            </button>
                        )
                    ) : null}
                </div>
            </div>
            <div className="single-community-container">
                <div className="single-community-feed">
                    <Feed posts={posts} />
                </div>
            </div>
        </div>
    );
};
