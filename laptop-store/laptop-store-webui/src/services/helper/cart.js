export const getCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    return cart ? cart : {};
}

export const addToCart = (productId, quantity) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) cart = {};
    quantity += productId in cart ? cart[productId] : 0;
    cart[productId] = quantity;
    updateCartQuantity(cart);
};

export const removeFromCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart && productId in cart) {
        delete cart[productId];
    }
    updateCartQuantity(cart);
};

const updateCartQuantity = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    const cartQuantity = document.getElementById("cart-quantity");
    const quantity = Object.values(cart).reduce((a, b) => a + b);
    cartQuantity.innerText = quantity;
};