import { MAXIMUM_QUANTITY_PER_PRODUCT } from "../../constants";
import { getCookie } from "./cookie";

export const getCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    return cart ? cart : {};
};

export const addToCart = (productId, quantity) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) cart = {};
    quantity += productId in cart ? cart[productId] : 0;

    if (quantity <= MAXIMUM_QUANTITY_PER_PRODUCT) {
        cart[productId] = quantity;
        updateCart(cart);
        return true;
    } else {
        return false;
    }
};

export const removeFromCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart && productId in cart) {
        delete cart[productId];
        updateCart(cart);
    }
};

export const updateCart = (cart) => {
    updateCartQuantity(cart);
    updateCartDatabase(cart);
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

    await fetch("/api/users/me/carts", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(cart),
    });
};