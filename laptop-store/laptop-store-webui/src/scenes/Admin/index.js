import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import AdminNavBar from "./components/AdminNavBar";
import PromotionPage from "./scenes/PromotionPage";
import OrderPage from "./scenes/OrderPage";
import ProductPage from "./scenes/ProductPage";

class Admin extends Component {
    render() {
        return (
            <Fragment>
                <AdminNavBar />
                <Switch>
                    <Route
                        exact
                        component={ProductPage}
                        path="/admin/products"
                    />

                    <Route
                        exact
                        component={ProductPage}
                        path="/admin/products/search"
                    />

                    <Route
                        exact
                        component={PromotionPage}
                        path="/admin/promotions"
                    />

                    <Route
                        exact
                        component={PromotionPage}
                        path="/admin/promotions/search"
                    />

                    <Route
                        exact
                        component={OrderPage}
                        path="/admin/orders"
                    />
                </Switch>
            </Fragment>
        );
    }
}

export default Admin;
