import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./scenes/LoginPage";
import RegisterPage from "./scenes/RegisterPage";
import ForgotPage from "./scenes/ForgotPage";

const Auth = () => (
    <Switch>
        <Route exact component={LoginPage} path="/auth/login" />
        <Route exact component={ForgotPage} path="/auth/forgot" />
        <Route exact component={RegisterPage} path="/auth/register" />
    </Switch>
);

export default Auth;
