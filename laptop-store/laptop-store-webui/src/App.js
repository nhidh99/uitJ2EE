/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import "./App.scss";
import { createHeart, killHeart } from "heartbeats";
import { Switch, Route } from "react-router-dom";
import Home from "./scenes/Home";
import Auth from "./scenes/Auth";
import Admin from "./scenes/Admin";
import Banner from "./components/Banner";
import { getCookie, createCookie, removeCookie } from "./services/helper/cookie";
import { ROLE_GUEST, ROLE_USER, ROLE_ADMIN, REFRESH_TOKENS_TIMESPAN } from "./constants";
import { getCart, updateCartDatabase } from "./services/helper/cart";
import ConfirmModal from "./components/ConfirmModal";
import store from "./services/redux/store";
import { setDefaultAddressId } from "./services/redux/actions";
import userApi from "./services/api/userApi";
import authApi from "./services/api/authApi";

const App = (props) => {
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null);

    useEffect(() => loadData(), []);

    useEffect(() => {
        if (role === ROLE_GUEST) {
            localStorage.setItem("cart", null);
            localStorage.setItem("wish-list", null);
        }
    }, [role]);

    const fetchToken = async () => {
        try {
            const response = await authApi.refreshToken();
            return response.data;
        } catch (err) {
            console.log("fail");
            return null;
        }
    };

    const syncUserCart = (userCart) => {
        const cart = getCart();
        if (JSON.stringify(cart) === userCart) return;
        Object.keys(cart).length === 0
            ? localStorage.setItem("cart", userCart)
            : updateCartDatabase(cart);
    };

    const syncUserWishList = (userWishList) => {
        localStorage.setItem("wish-list", userWishList);
    };

    const createRefreshTokenHeart = () => {
        const heart = createHeart(REFRESH_TOKENS_TIMESPAN, "refresh_token");
        heart.createEvent(1, async () => {
            const token = await fetchToken();
            if (token) {
                createCookie("access_token", token);
            } else {
                removeCookie("access_token");
                killHeart("refresh_token");
                window.location.href = "/";
            }
        });
    };

    const loadData = async () => {
        if (getCookie("access_token") === null) {
            setRole(ROLE_GUEST);
            setLoading(true);
        }

        const token = await fetchToken();
        if (token) {
            createCookie("access_token", token);
            createRefreshTokenHeart();
            try {
                const response = await userApi.getCurrentUser();
                const user = response.data;
                syncUserCart(user["cart"]);
                syncUserWishList(user["wish_list"]);
                setRole(user["role"]);

                store.dispatch(
                    setDefaultAddressId({
                        "default-id": user["default_address"]?.["id"],
                    })
                );
            } catch (err) {
                console.log("fail");
            }
        } else {
            removeCookie("access_token");
            killHeart("refresh_token");
            setRole(ROLE_GUEST);
        }
        setLoading(false);
    };

    const buildRoutes = (role) => {
        switch (role) {
            case ROLE_GUEST:
                return guestRoutes();
            case ROLE_USER:
                return userRoutes();
            case ROLE_ADMIN:
                return adminRoutes();
            default:
                return null;
        }
    };

    const guestRoutes = () => (
        <Fragment>
            <Route
                exact
                component={Home}
                path={[
                    "/",
                    "/user",
                    "/cart",
                    "/result",
                    "/product/:id",
                    "/product/:alt/:id",
                    "/product/compare/:alt/:id1/:id2",
                ]}
            />
            <Route exact component={Auth} path="/auth/(forgot|login|register)" />
        </Fragment>
    );

    const userRoutes = () => (
        <Route
            exact
            component={Home}
            path={[
                "/",
                "/user",
                "/cart",
                "/payment",
                "/result",
                "/product/:id",
                "/product/:alt/:id",
                "/product/compare/:alt/:id1/:id2",
                "/user/(info|password|address|order)",
                "/user/address/:id",
                "/user/order/:orderId",
            ]}
        />
    );

    const adminRoutes = () => (
        <Fragment>
            <Route
                exact
                component={Home}
                path={[
                    "/",
                    "/user",
                    "/cart",
                    "/payment",
                    "/result",
                    "/product/:id",
                    "/product/:alt/:id",
                    "/product/compare/:alt/:id1/:id2",
                    "/user/(info|password|address|order)",
                    "/user/address/:id",
                    "/user/order/:orderId",
                ]}
            />
            <Route
                exact
                component={Admin}
                path={[
                    "/admin/(|products|orders|promotions|ratings)",
                    "/admin/products/search",
                    "/admin/orders/search",
                    "/admin/promotions/search",
                    "/admin/ratings/search",
                    "/admin/comments/search",
                ]}
            />
        </Fragment>
    );

    return loading ? null : (
        <Fragment>
            <Banner role={role} />
            <ConfirmModal />
            <div className="container">
                <Switch>{buildRoutes(role)}</Switch>
            </div>
        </Fragment>
    );
};

export default App;
