import axiosClient from './axiosClient';

const tagApi = {
    getAll: () => {
        const url = "/tags";
        return axiosClient.get(url);
    }
}

export default tagApi;