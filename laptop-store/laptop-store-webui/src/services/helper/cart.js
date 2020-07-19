import { MAXIMUM_QUANTITY_PER_PRODUCT } from "../../constants";
import { getCookie } from "./cookie";
import userApi from "../api/userApi";

export const getCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    return cart ? cart : {};
};

export const addToCart = async (productId, quantity) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) cart = {};
    quantity += productId in cart ? cart[productId] : 0;

    if (quantity <= MAXIMUM_QUANTITY_PER_PRODUCT) {
        cart[productId] = quantity;
        await updateCart(cart);
        return true;
    } else {
        return false;
    }
};

export const removeFromCart = async (productId) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart && productId in cart) {
        delete cart[productId];
        await updateCart(cart);
    }
};

export const updateCart = async (cart) => {
    await updateCartDatabase(cart);
    updateCartQuantity(cart);
};

export const updateCartQuantity = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    const cartQuantity = document.getElementById("cart-quantity");
    const quantity = Object.values(cart).reduce((a, b) => a + b, 0);
    cartQuantity.innerText = quantity;
};

export const updateCartDatabase = async (cart) => {
    const token = getCookie("access_token");
    if (!token) return;
    try {
        await userApi.putCurrentUserCart(cart);
    } catch (err) {
        console.log("err");
    }
};
