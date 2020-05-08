import React, { Component, Fragment } from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./scenes/Home";
import Auth from "./scenes/Auth";
import Admin from "./scenes/Admin";
import Banner from "./components/Banner";
import { getCookie, createCookie, removeCookie } from "./services/helper/cookie";
import { ROLE_GUEST, ROLE_USER, ROLE_ADMIN } from "./constants";

class App extends Component {
    state = {
        loading: true,
        roles: null,
    };

    componentDidMount() {
        this.loadData();
    }

    getCurrentToken = async () => {
        const token = getCookie("access_token");
        if (token === null) return null;

        const response = await fetch("/api/auth/token", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.ok ? await response.text() : null;
    };

    loadData = async () => {
        const token = await this.getCurrentToken();
        if (token) {
            createCookie("access_token", token);
            const response = await fetch("/api/users/me", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                const user = await response.json();
                this.setState({ role: user["role"] });
            }
        } else {
            removeCookie("access_token");
            this.setState({ role: ROLE_GUEST });
        }
        this.setState({ loading: false });
    };

    buildRoutes = (role) => {
        switch (role) {
            case ROLE_GUEST:
                return this.guestRoutes();
            case ROLE_USER:
                return this.userRoutes();
            case ROLE_ADMIN:
                return this.adminRoutes();
            default:
                return null;
        }
    };

    guestRoutes = () => (
        <Fragment>
            <Route
                exact
                component={Home}
                path={["/", "/search", "/user", "/cart", "/product/:id", "/product/:alt/:id"]}
            />
            <Route exact component={Auth} path="/auth/(forgot|login|register)" />
        </Fragment>
    );

    userRoutes = () => (
        <Fragment>
            <Route
                exact
                component={Home}
                path={[
                    "/",
                    "/search",
                    "/user",
                    "/cart",
                    "/product/:id",
                    "/product/:alt/:id",
                    "/user/(info|password|address|order|payment)",
                    "/user/address/create",
                    "/user/order/:orderId",
                ]}
            />
        </Fragment>
    );

    adminRoutes = () => (
        <Fragment>
            <Route
                exact
                component={Home}
                path={[
                    "/",
                    "/search",
                    "/user",
                    "/cart",
                    "/product/:id",
                    "/product/:alt/:id",
                    "/user/(info|password|address|order|payment)",
                    "/user/address/create",
                    "/user/order/:orderId",
                ]}
            />
            <Route exact component={Admin} path="/admin/(|products|orders|promotions)" />
        </Fragment>
    );

    render() {
        const { loading, role } = this.state;
        const routes = this.buildRoutes(role);

        return loading ? null : (
            <BrowserRouter>
                <Banner role={role} />
                <div className="container">
                    <Switch>{routes}</Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
