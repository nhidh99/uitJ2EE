import React, { Component, Fragment } from "react";
import { Route, Switch, Link } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ForgotPage from "./components/ForgotPage";

class Auth extends Component {
    render() {
        return (
            <Fragment>
                <Link to="/">Back to Home|</Link>
                <Link to="/auth/login">Login Page|</Link>
                <Link to="/auth/forgot">Forgot Page|</Link>
                <Link to="/auth/register">Register Page</Link>

                <Switch>
                    <Route exact component={LoginPage} path="/auth/login" />
                    <Route exact component={ForgotPage} path="/auth/forgot" />
                    <Route exact component={RegisterPage} path="/auth/register" />
                </Switch>
                <i>Route: Auth</i>
            </Fragment>
        )
    }
}

export default Auth;