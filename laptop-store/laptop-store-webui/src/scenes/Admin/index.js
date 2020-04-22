import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import AdminNavBar from "./components/AdminNavBar";
import ProductPage from "./components/ProductPage";
import PromotionPage from "./components/PromotionPage";
import OrderPage from "./components/OrderPage";

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
                        component={PromotionPage}
                        path="/admin/promotions"
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
