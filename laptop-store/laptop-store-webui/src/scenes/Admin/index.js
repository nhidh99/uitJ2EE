import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import AdminNavBar from "./components/AdminNavBar";
import PromotionPage from "./scenes/PromotionPage";
import OrderPage from "./scenes/OrderPage";
import ProductPage from "./scenes/ProductPage";
import RatingPage from "./scenes/RatingPage";

const Admin = () => (
    <Fragment>
        <AdminNavBar />
        <Switch>
            <Route exact component={ProductPage} path="/admin/products" />

            <Route exact component={ProductPage} path="/admin/products/search" />

            <Route exact component={PromotionPage} path="/admin/promotions" />

            <Route exact component={PromotionPage} path="/admin/promotions/search" />

            <Route exact component={OrderPage} path="/admin/orders" />

            <Route exact component={OrderPage} path="/admin/orders/search" />

            <Route exact component={RatingPage} path="/admin/ratings" />

            <Route exact component={RatingPage} path="/admin/ratings/search" />
        </Switch>
    </Fragment>
);

export default Admin;
