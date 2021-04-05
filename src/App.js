import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import axios from "./axios";

import { Navbar } from "./components/Nav/Navbar";
import { Feed } from "./components/Feed/Feed";
import { Submit } from "./components/Submit/Submit";
import { Signup } from "./components/Auth/Signup";
import { Login } from "./components/Auth/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";
import { ForgotPassword } from "./components/Auth/ForgotPassword";
import { CreateCommunity } from "./components/Community/CreateCommunity/CreateCommunity";
import { Community } from "./components/Community/Community";

function App() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("/posts/all").then((res) => {
            setPosts(res.data);
        });
    }, []);

    return (
        <Router>
            <AuthProvider>
                <div className="app">
                    <Navbar />
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
                        <Route exact path="/r/:communityName">
                            <Community />
                        </Route>
                        <PrivateRoute exact path="/community/create">
                            <CreateCommunity />
                        </PrivateRoute>
                        <PrivateRoute exact path={["/submit", "/submit/:type", "/r/:communityName/submit", "/r/:communityName/submit/:type"]}>
                            <Submit />
                        </PrivateRoute>
                    </Switch>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
