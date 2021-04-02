import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import Pusher from "pusher-js";
import axios from "./axios";

import { Nav } from "./components/Nav/Nav";
import { Feed } from "./components/Feed/Feed";
import { Submit } from "./components/Submit/Submit";
import { Signup } from "./components/Auth/Signup";
import { Login } from "./components/Auth/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";
import { ForgotPassword } from "./components/Auth/ForgotPassword";

function App() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("/posts/all").then((res) => {
            setPosts(res.data);
        });
    }, []);

    useEffect(() => {
        const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
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
            <AuthProvider>
                <div className="app">
                    <Nav />
                    <Switch>
                        <Route exact path="/">
                            <Feed posts={posts} />
                        </Route>
                        <Route exact path="/login">
                            <Login />
                        </Route>
                        <Route exact path="/signup">
                            <Signup />
                        </Route>
                        <Route exact path="/forgot-password">
                            <ForgotPassword />
                        </Route>
                        <PrivateRoute exact path={["/submit", "/submit/:type"]}>
                            <Submit />
                        </PrivateRoute>
                    </Switch>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
