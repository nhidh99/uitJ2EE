import axios from "axios";
import axiosClient from "./axiosClient";
import queryString from "query-string";
import { getCookie } from "../helper/cookie";

const addressClient = axios.create({
    baseURL:
        "https://raw.githubusercontent.com/nhidh99/uitSE/master/laptop-store/laptop-store-addresses/",
    paramsSerializer: (params) => queryString.stringify(params),
});

const addressApi = {
    getCities: () => {
        const url = "/cities.json";
        return addressClient.get(url);
    },

    getDistricts: (cityId) => {
        const url = `/districts/${cityId}.json`;
        return addressClient.get(url);
    },

    getWards: (districtId) => {
        const url = `/wards/${districtId}.json`;
        return addressClient.get(url);
    },

    getById: (id) => {
        const url = `/addresses/${id}`;
        const config = {
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        };
        return axiosClient.get(url, config);
    },

    postAddress: (data) => {
        const url = "/addresses";
        const config = {
            headers: {
                Authorization: `Bearer ${getCookie("access_token")}`,
                "Content-Type": "application/json",
            },
        };
        return axiosClient.post(url, data, config);
    },

    putAddress: (id, data) => {
        const url = `/addresses/${id}`;
        const config = {
            headers: {
                Authorization: `Bearer ${getCookie("access_token")}`,
                "Content-Type": "application/json",
            },
        };
        return axiosClient.put(url, data, config);
    },

    putDefaultAddress: (id) => {
        const url = "/addresses/default";
        const config = {
            headers: {
                Authorization: `Bearer ${getCookie("access_token")}`,
                "Content-Type": "text/plain",
            },
        };
        return axiosClient.put(url, id, config);
    },

    deleteAddress: (id) => {
        const url = `/addresses/${id}`;
        const config = {
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        };
        return axiosClient.delete(url, config);
    },
};

export default addressApi;
