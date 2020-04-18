import React from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./scenes/Home";
import Auth from "./scenes/Auth";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact component={Home} path="/(|detail|result|user)" />
                <Route
                    exact
                    component={Auth}
                    path="/auth/(forgot|login|register)"
                />
            </Switch>

            <Link to="/">Home Page|</Link>
            <Link to="/result">Result Page|</Link>
            <Link to="/detail">Detail Page|</Link>
            <Link to="/user">User Page|</Link>
            <Link to="/auth/login">Login Page</Link>
        </BrowserRouter>
    );
}

export default App;