import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const PrivateRoute = ({ children, ...rest }) => {
    const { currentUser } = useAuth();
    return <Route {...rest}>{currentUser ? children : <Redirect to={"/login"} />}</Route>;
};
