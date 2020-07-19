import axiosClient from "./axiosClient";
import { getCookie } from "../helper/cookie";

const authApi = {
    login: (username, password) => {
        const url = "/auth/login";
        const data = {
            username: username,
            password: password,
        };
        const config = { headers: { "Content-Type": "application/json" } };
        return axiosClient.post(url, data, config);
    },

    loginFacebook: (facebookId) => {
        const url = "/auth/facebook/login";
        const data = { id: facebookId };
        const config = { headers: { "Content-Type": "application/json" } };
        return axiosClient.post(url, data, config);
    },

    loginGoogle: (googleId) => {
        const url = "/auth/google/login";
        const data = { id: googleId };
        const config = { headers: { "Content-Type": "application/json" } };
        return axiosClient.post(url, data, config);
    },

    checkFacebookSync: (facebookId) => {
        const url = "/auth/facebook";
        const data = { id: facebookId };
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie("access_token")}`,
            },
        };
        return axiosClient.post(url, data, config);
    },

    checkGoogleSync: (googleId) => {
        const url = "/auth/google";
        const data = { id: googleId };
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie("access_token")}`,
            },
        };
        return axiosClient.post(url, data, config);
    },

    syncFacebook: (facebookId) => {
        const url = "/auth/facebook/sync";
        const data = { id: facebookId };
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie("access_token")}`,
            },
        };
        return axiosClient.post(url, data, config);
    },

    syncGoogle: (googleId) => {
        const url = "/auth/google/sync";
        const data = { id: googleId };
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie("access_token")}`,
            },
        };
        return axiosClient.post(url, data, config);
    },

    cancelFacebookSync: () => {
        const url = "/auth/facebook/sync";
        const config = { headers: { Authorization: `Bearer ${getCookie("access_token")}` } };
        return axiosClient.delete(url, config);
    },

    cancelGoogleSync: () => {
        const url = "/auth/google/sync";
        const config = { headers: { Authorization: `Bearer ${getCookie("access_token")}` } };
        return axiosClient.delete(url, config);
    },

    register: (data) => {
        const url = "/auth/register";
        const config = { headers: { "Content-Type": "application/json" } };
        return axiosClient.post(url, data, config);
    },

    refreshToken: () => {
        const url = "/auth/token";
        const config = { headers: { Authorization: `Bearer ${getCookie("access_token")}` } };
        return axiosClient.get(url, config);
    },
};

export default authApi;
