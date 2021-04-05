import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/* Provider */
import { AuthProvider } from "./contexts/AuthContext";

/* Components */
import { Navbar } from "./components/Nav/Navbar";
import { Submit } from "./components/Submit/Submit";
import { Signup } from "./components/Auth/Signup";
import { Login } from "./components/Auth/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { ForgotPassword } from "./components/Auth/ForgotPassword";
import { CreateCommunity } from "./components/Community/CreateCommunity/CreateCommunity";
import { Community } from "./components/Community/Community";
import { Home } from "./components/Home";

/* Assets */
import "./App.scss";

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="app">
                    <Navbar />
                    <Switch>
                        <Route exact path="/">
                            <Home />
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
