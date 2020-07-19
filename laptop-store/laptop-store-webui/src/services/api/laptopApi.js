import axiosClient from "./axiosClient";
import { getCookie } from "../helper/cookie";

const laptopApi = {
    getByPage: (page) => {
        const url = "/laptops";
        const config = {
            params: { page: page },
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        };
        return axiosClient.get(url, config);
    },

    getById: (id) => {
        const url = `/laptops/${id}`;
        return axiosClient.get(url);
    },

    getByIds: (ids) => {
        const url = "/laptops";
        const config = { params: { ids: ids } };
        return axiosClient.get(url, config);
    },

    getByQuery: (query, page) => {
        const url = "/laptops/search";
        const config = {
            params: { q: query, page: page },
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        };
        return axiosClient.get(url, config);
    },

    getByFilter: (filter) => {
        const url = "/laptops/filter";
        const config = { params: filter };
        return axiosClient.get(url, config);
    },

    getByCategory: (category, page) => {
        const url = `/laptops/${category}`;
        const config = { params: { page: page } };
        return axiosClient.get(url, config);
    },

    getLaptopPromotions: (laptopId) => {
        const url = `/laptops/${laptopId}/promotions`;
        return axiosClient.get(url);
    },

    getLaptopTags: (laptopId) => {
        const url = `/laptops/${laptopId}/tags`;
        return axiosClient.get(url);
    },

    getLaptopImageIds: (laptopId) => {
        const url = `/laptops/${laptopId}/image-ids`;
        return axiosClient.get(url);
    },

    getLaptopSuggestions: (laptopId) => {
        const url = `/laptops/${laptopId}/suggestions`;
        return axiosClient.get(url);
    },

    deleteById: (id) => {
        const url = `/laptops/${id}`;
        const config = {
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        };
        return axiosClient.delete(url, config);
    },

    postLaptop: (data) => {
        const url = "/laptops";
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${getCookie("access_token")}`,
            },
        };
        return axiosClient.post(url, data, config);
    },

    putLaptop: (id, data) => {
        const url = `/laptops/${id}`;
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${getCookie("access_token")}`,
            },
        };
        return axiosClient.put(url, data, config);
    },

    putLaptopImages: (id, data) => {
        const url = `/laptops/${id}/detail-images`;
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${getCookie("access_token")}`,
            },
        };
        return axiosClient.put(url, data, config);
    },
};

export default laptopApi;
