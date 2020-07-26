import axiosClient from "./axiosClient";
import { getCookie } from "../helper/cookie";

const commentApi = {
    getByProductId: (productId) => {
        const url = "/comments";
        const config = {
            params: { "product-id": productId },
        };
        return axiosClient.get(url, config);
    },

    getByPage: (page) => {
        const url = "/comments";
        const config = {
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
            params: { page: page },
        };
        return axiosClient.get(url, config);
    },

    searchComments: (id, status, page) => {
        const url = "/comments/search";
        const config = {
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
            params: { id: id, status: status, page: page },
        };
        return axiosClient.get(url, config);
    },

    postComment: (productId, data) => {
        const url = `/comments`;
        const config = {
            headers: {
                Authorization: `Bearer ${getCookie("access_token")}`,
                "Content-Type": "application/json",
            },
            params: { "product-id": productId },
        };
        return axiosClient.post(url, data, config);
    },

    postApprove: (id, reply) => {
        const url = `/comments/${id}/approve`;
        const data = { reply: reply };
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie("access_token")}`,
            },
        };
        return axiosClient.post(url, data, config);
    },

    postDeny: (id) => {
        const url = `/comments/${id}/deny`;
        const config = {
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        };
        return axiosClient.post(url, null, config);
    },

    postReply: (commentId, reply) => {
        const url = `/comments/${commentId}/replies`;
        const data = { reply: reply };
        const config = {
            headers: {
                Authorization: `Bearer ${getCookie("access_token")}`,
                "Content-Type": "application/json",
            },
        };
        return axiosClient.post(url, data, config);
    },

    deleteComment: (id) => {
        const url = `/comments/${id}`;
        const config = {
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        };
        return axiosClient.delete(url, config);
    },
};

export default commentApi;
