import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import UserPage from "./components/UserPage";
import ResultPage from "./components/ResultPage";
import HomePage from "./components/HomePage";
import DetailPage from "./components/DetailPage";

class Home extends Component {
    render() {
        return (
            <Switch>
                <Route exact path={["/product/:id", "/product/:alt/:id"]} component={DetailPage} />
                <Route exact component={HomePage} path="/" />
                <Route exact component={ResultPage} path="/result" />
                <Route exact component={UserPage} path="/user" />
            </Switch>
        );
    }
}

export default Home;
