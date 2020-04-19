import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import AdminNavBar from "./components/AdminNavBar";
import ProductPage from "./components/ProductPage";

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
                </Switch>
            </Fragment>
        );
    }
}

export default Admin;
