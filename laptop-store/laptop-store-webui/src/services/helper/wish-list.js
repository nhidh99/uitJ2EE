import { getCookie } from "./cookie";
import userApi from "../api/userApi";

export const getWishList = () => {
    const wishList = JSON.parse(localStorage.getItem("wish-list"));
    return wishList ? wishList : [];
};

export const addToWishList = (productId) => {
    let wishList = JSON.parse(localStorage.getItem("wish-list"));
    if (!wishList) wishList = [];
    if((wishList.indexOf(productId) === -1)) {
        wishList[wishList.length] = productId;
    } 
    updateWishListDatabase(wishList);
};

export const removeFromWishList = async (productId) => {
    let wishList = JSON.parse(localStorage.getItem("wish-list"));
    let index = wishList.indexOf(productId);
    if (wishList && index !== -1) {
        wishList.splice(index, 1);
        await updateWishListDatabase(wishList);
    }
};

export const updateWishListDatabase = async (wishList) => {
    localStorage.setItem("wish-list", JSON.stringify(wishList));
    const token = getCookie("access_token");
    if (!token) return;
    await userApi.putCurrentUserWishList(wishList);
};