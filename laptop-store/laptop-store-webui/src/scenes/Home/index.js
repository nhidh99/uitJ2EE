import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import CartPage from "./scenes/CartPage";
import DetailPage from "./scenes/DetailPage";
import UserPage from "./scenes/UserPage";
import HomePage from "./scenes/HomePage";
import ResultPage from "./scenes/ResultPage";

class Home extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route
                        exact
                        path={["/product/:id", "/product/:alt/:id"]}
                        component={DetailPage}
                    />
                    <Route exact component={HomePage} path="/" />
                    <Route exact component={ResultPage} path="/result" />
                    <Route exact component={CartPage} path="/cart" />
                    <Route
                        exact
                        component={UserPage}
                        path={[
                            "/user/address/(edit|create)",
                            "/user/order/:orderId",
                            "/user/(info|password|address|order|payment)",
                        ]}
                    />
                </Switch>
            </Fragment>
        );
    }
}

export default Home;
