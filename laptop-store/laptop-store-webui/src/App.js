import React from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./scenes/Home";
import Auth from "./scenes/Auth";
import Admin from "./scenes/Admin";
import Banner from "./components/Banner";

function App() {
    return (
        <BrowserRouter>
            <Banner />
            <div className="container">
                <Switch>
                    <Route
                        exact
                        component={Home}
                        path="/(|detail|result|user)"
                    />
                    <Route
                        exact
                        component={Admin}
                        path="/admin/(|products|orders|promotions)"
                    />
                    <Route
                        exact
                        component={Auth}
                        path="/auth/(forgot|login|register)"
                    />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
