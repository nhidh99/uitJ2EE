import axiosClient from "./axiosClient";
import { getCookie } from "../helper/cookie";

const userApi = {
    getCurrentUser: () => {
        const url = "/users/me";
        const config = {
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        };
        return axiosClient.get(url, config);
    },

    getCurrentUserSocialAuth: () => {
        const url = "/users/me/social-auth";
        const config = {
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        };
        return axiosClient.get(url, config);
    },

    getCurrentUserAddresses: () => {
        const url = "/users/me/addresses";
        const config = {
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        };
        return axiosClient.get(url, config);
    },

    getCurrentUserOrders: (page) => {
        const url = "/users/me/orders";
        const config = {
            params: { page: page },
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        };
        return axiosClient.get(url, config);
    },

    getCurrentUserRewards: () => {
        const url = "/users/me/rewards";
        const config = {
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        };
        return axiosClient.get(url, config);
    },

    putCurrentUser: (data) => {
        const url = "/users/me";
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie("access_token")}`,
            },
        };
        return axiosClient.put(url, data, config);
    },

    putCurrentUserCart: (cart) => {
        const url = "/users/me/carts";
        const config = {
            headers: {
                "Content-Type": "text/plain",
                Authorization: `Bearer ${getCookie("access_token")}`,
            },
        };
        return axiosClient.put(url, cart, config);
    },

    putCurrentUserWishList: (wishList) => {
        const url = "/users/me/wish-list";
        const config = {
            headers: {
                "Content-Type": "text/plain",
                Authorization: `Bearer ${getCookie("access_token")}`,
            },
        };
        return axiosClient.put(url, wishList, config);
    },

    putCurrentUserPassword: (data) => {
        const url = "/users/me/password";
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie("access_token")}`,
            },
        };
        return axiosClient.put(url, data, config);
    },
};

export default userApi;
