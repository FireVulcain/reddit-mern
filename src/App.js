import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import Pusher from "pusher-js";
import axios from "./axios";

import { Nav } from "./components/Nav/Nav";
import { Feed } from "./components/Feed/Feed";
import { Submit } from "./components/Submit/Submit";

function App() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("/posts/all").then((res) => {
            setPosts(res.data);
        });
    }, []);

    useEffect(() => {
        const pusher = new Pusher("01e0246f53ac7a219a99", {
            cluster: "eu",
        });

        const channel = pusher.subscribe("posts");
        channel.bind("inserted", function (newPost) {
            setPosts([...posts, newPost]);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [posts]);

    return (
        <Router>
            <div className="app">
                <Nav />
                <Switch>
                    <Route exact path="/">
                        <Feed posts={posts} />
                    </Route>
                    <Route exact path="/submit">
                        <Submit />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
