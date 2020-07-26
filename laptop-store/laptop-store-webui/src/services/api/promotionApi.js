import axiosClient from "./axiosClient";
import { getCookie } from "../helper/cookie";

const promotionApi = {
    getAll: () => {
        const url = "/promotions";
        const config = { headers: { Authorization: `Bearer ${getCookie("access_token")}` } };
        return axiosClient.get(url, config);
    },

    getByPage: (page) => {
        const url = "/promotions";
        const config = {
            params: { page: page },
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        };
        return axiosClient.get(url, config);
    },

    getByIds: (ids) => {
        const url = "/promotions";
        const config = {
            params: { ids: ids },
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        };
        return axiosClient.get(url, config);
    },

    deleteById: (id) => {
        const url = `/promotions/${id}`;
        const config = {
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        };
        return axiosClient.delete(url, config);
    },
};

export default promotionApi;
