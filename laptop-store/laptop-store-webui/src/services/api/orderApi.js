import axiosClient from "./axiosClient";
import { getCookie } from "../helper/cookie";

const orderApi = {
    getById: (id) => {
        const url = `/orders/${id}`;
        const config = {
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        };
        return axiosClient.get(url, config);
    },

    getByPage: (page) => {
        const url = "/orders";
        const config = {
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
            params: { page: page },
        };
        return axiosClient.get(url, config);
    },

    putOrder: (id, data) => {
        const url = `/orders/${id}`;
        const config = {
            headers: {
                Authorization: `Bearer ${getCookie("access_token")}`,
                "Content-Type": "application/json",
            },
        };
        return axiosClient.put(url, data, config);
    },

    cancelOrder: (id) => {
        const url = `/orders/${id}/cancel`;
        const config = {
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        };
        return axiosClient.post(url, null, config);
    },

    postOrder: (data) => {
        const url = "/orders";
        const config = {
            headers: {
                Authorization: `Bearer ${getCookie("access_token")}`,
                "Content-Type": "application/json",
            },
        };
        return axiosClient.post(url, data, config);
    },

    searchOrders: (id, status, page) => {
        const url = "/orders/search";
        const config = {
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
            params: { id: id, status: status, page: page },
        };
        return axiosClient.get(url, config);
    },
};

export default orderApi;
