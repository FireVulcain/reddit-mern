import React, { useEffect, useState } from "react";
import axios from "./../axios";

import { useAuth } from "./../contexts/AuthContext";
import { Feed } from "./Feed/Feed";

export const Home = () => {
    const [posts, setPosts] = useState([]);

    const { currentUser } = useAuth();

    useEffect(() => {
        if (currentUser?.userId) {
            return axios.get("/posts/following", { params: { userId: currentUser.userId } }).then((res) => {
                setPosts(res.data);
            });
        } else {
            return axios.get("/posts/all").then((res) => {
                setPosts(res.data);
            });
        }
    }, [currentUser]);

    return (
        <>
            <Feed posts={posts} />
        </>
    );
};
