/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import { Label, Button, Spinner } from "reactstrap";
import ItemBlock from "./components/ItemBlock";
import { FaShoppingCart, FaBoxOpen, FaGift, FaMoneyBillWave } from "react-icons/fa";
import styles from "./styles.module.scss";
import { getCart, removeFromCart, updateCartDatabase } from "../../../../services/helper/cart";
import { withRouter } from "react-router-dom";
import { getCookie } from "../../../../services/helper/cookie";
import EmptyBlock from "../../../../components/EmptyBlock";
import Loader from "react-loader-advanced";
import laptopApi from "../../../../services/api/laptopApi";

const CartPage = (props) => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const cart = getCart();

    useEffect(() => {
        if (loading) {
            loadData();
        }
    }, [loading]);

    const toggleLoading = () => setLoading(true);

    const loadData = async () => {
        if (!loading) return;
        const ids = Object.keys(cart);

        if (ids.length === 0) {
            setProducts([]);
            setTotalPrice(0);
            setTotalDiscount(0);
            setLoading(false);
            return;
        }

        try {
            await updateCartDatabase(cart);
            const response = await laptopApi.getByIds(ids);
            const products = response.data;
            loadCart(products);
        } catch (err) {
            console.log("fail");
        }
    };

    const loadCart = (products) => {
        let totalPrice = 0;
        let totalDiscount = 0;

        products.forEach((product) => {
            const quantity = cart[[product["id"]]];
            const discount = product["discount_price"] * quantity;
            const price = (product["unit_price"] - product["discount_price"]) * quantity;
            totalPrice += price;
            totalDiscount += discount;
        });

        const productIds = products.map((product) => product["id"].toString());
        Object.keys(cart)
            .filter((id) => !productIds.includes(id))
            .forEach((id) => removeFromCart(id));

        setProducts(products);
        setTotalPrice(totalPrice);
        setTotalDiscount(totalDiscount);
        setLoading(false);
    };

    const redirectToPayment = () => {
        const url = getCookie("access_token") ? "/payment" : "/auth/login";
        props.history.push(url);
        window.scroll(0, 0);
    };

    const SummaryBlock = () => (
        <div className={styles.summary}>
            <span>
                <b>
                    <FaBoxOpen />
                    &nbsp; Số lượng:&nbsp;&nbsp;
                </b>
                {Object.values(cart).reduce((a, b) => a + b, 0)}
            </span>

            <span>
                <b>
                    <FaGift />
                    &nbsp; Tổng giảm giá:&nbsp;&nbsp;
                </b>
                {totalDiscount.toLocaleString()}
                <sup>đ</sup>
            </span>

            <span>
                <b>
                    <FaMoneyBillWave />
                    &nbsp; Tạm tính:&nbsp;&nbsp;
                </b>
                {totalPrice.toLocaleString()}
                <sup>đ</sup>
            </span>
        </div>
    );

    return (
        <Fragment>
            <div className={styles.title}>
                <Label className={styles.pageTitle}>Giỏ hàng của tôi</Label>
                <Button
                    onClick={redirectToPayment}
                    className={styles.btn}
                    color="success"
                    disabled={products.length === 0 || loading}
                >
                    <FaShoppingCart className={styles.icon} /> Tiến hành đặt hàng
                </Button>
            </div>

            <Loader
                show={(loading && products.length !== 0)}
                message={<Spinner />}
            >
                <div className={styles.list}>
                    {products.length === 0 ? (
                        <EmptyBlock
                            loading={loading}
                            backToHome={!loading}
                            icon={<FaBoxOpen />}
                            loadingText="Đang tải giỏ hàng..."
                            emptyText="Giỏ hàng trống"
                            borderless
                        />
                    ) : (
                        <Fragment>
                            <SummaryBlock />
                            {products.map((product) => (
                                <ItemBlock
                                    product={product}
                                    quantity={cart[product["id"]]}
                                    toggleLoading={toggleLoading}
                                />
                            ))}
                        </Fragment>
                    )}
                </div>
            </Loader>
        </Fragment>
    );
};

export default withRouter(CartPage);
