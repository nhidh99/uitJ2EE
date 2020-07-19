import axiosClient from "./axiosClient";
import { getCookie } from "../helper/cookie";

const ratingApi = {
    getByProductId: (productId) => {
        const url = "/ratings";
        const config = {
            params: { "product-id": productId },
        };
        return axiosClient.get(url, config);
    },

    getByPage: (page) => {
        const url = "/ratings";
        const config = {
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
            params: { page: page },
        };
        return axiosClient.get(url, config);
    },

    searchRatings: (id, status, page) => {
        const url = "/ratings/search";
        const config = {
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
            params: { id: id, status: status, page: page },
        };
        return axiosClient.get(url, config);
    },

    postApprove: (id) => {
        const url = `/ratings/${id}/approve`;
        const config = {
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        };
        return axiosClient.post(url, null, config);
    },

    postDeny: (id) => {
        const url = `/ratings/${id}/deny`;
        const config = {
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        };
        return axiosClient.post(url, null, config);
    },

    postRating: (productId, data) => {
        const url = "/ratings";
        const config = {
            headers: {
                Authorization: `Bearer ${getCookie("access_token")}`,
                "Content-Type": "application/json",
            },
            params: { "product-id": productId },
        };
        return axiosClient.post(url, data, config);
    },

    postReply: (ratingId, reply) => {
        const url = `/ratings/${ratingId}/replies`;
        const data = { reply: reply };
        const config = {
            headers: {
                Authorization: `Bearer ${getCookie("access_token")}`,
                "Content-Type": "application/json",
            },
        };
        return axiosClient.post(url, data, config);
    },

    deleteRating: (id) => {
        const url = `/ratings/${id}`;
        const config = {
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        };
        return axiosClient.delete(url, config);
    },
};

export default ratingApi;
