import React from "react";
import { Route, Switch } from "react-router-dom";
import CartPage from "./scenes/CartPage";
import DetailPage from "./scenes/DetailPage";
import UserPage from "./scenes/UserPage";
import HomePage from "./scenes/HomePage";
import ResultPage from "./scenes/ResultPage";
import PaymentPage from "./scenes/PaymentPage";
import ComparePage from "./scenes/ComparePage";

const Home = () => (
    <Switch>
        <Route
            exact
            path={["/product/:productId", "/product/:alt/:productId"]}
            component={DetailPage}
        />
        <Route exact component={HomePage} path="/" />

        <Route exact component={ResultPage} path="/search" />

        <Route exact component={CartPage} path="/cart" />

        <Route exact component={PaymentPage} path="/payment" />

        <Route exact component={ComparePage} path="/product/compare/:alt/:id1/:id2" />

        <Route
            exact
            component={UserPage}
            path={[
                "/user/address/:id",
                "/user/order/:orderId",
                "/user/(info|password|address|order|payment|wish-list|reward)",
            ]}
        />
    </Switch>
);

export default Home;
