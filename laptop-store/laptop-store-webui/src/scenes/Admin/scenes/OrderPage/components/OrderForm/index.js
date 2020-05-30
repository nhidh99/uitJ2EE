/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Label, Spinner } from "reactstrap";
import styles from "./styles.module.scss";
import OrderDetail from "./OrderDetail";
import OrderOverview from "./OrderOverview";
import Loader from "react-loader-advanced";
import { getCookie } from "../../../../../../services/helper/cookie";

const OrderForm = ({ orderId }) => {
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState({});
    const [promotionQties, setPromotionQties] = useState({});
    const [productQties, setProductQties] = useState({});

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const response = await fetch(`/api/orders/${orderId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        });

        if (response.ok) {
            const order = await response.json();
            const productIds = order["details"]
                .filter((detail) => detail["product_type"] === "LAPTOP")
                .map((detail) => detail["product_id"]);

            const promotionIds = order["details"]
                .filter((detail) => detail["product_type"] === "PROMOTION")
                .map((detail) => detail["product_id"]);

            const [productQties, promotionQties] = await Promise.all([
                loadProducts(productIds),
                loadPromotions(promotionIds),
            ]);

            setOrder(order);
            setProductQties(productQties);
            setPromotionQties(promotionQties);
            setLoading(false);
        }
    };

    const loadProducts = async (productIds) => {
        const params = new URLSearchParams();
        productIds.forEach((id) => params.append("ids", id));
        const response = await fetch("/api/laptops?" + params.toString(), {
            method: "GET",
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        });
        const output = {};
        if (response.ok) {
            const products = await response.json();
            products.forEach((product) => (output[product["id"]] = product["quantity"]));
        }
        return output;
    };

    const loadPromotions = async (promotionIds) => {
        const params = new URLSearchParams();
        promotionIds.forEach((id) => params.append("ids", id));
        const response = await fetch("/api/promotions?" + params.toString(), {
            method: "GET",
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        });
        const output = {};
        if (response.ok) {
            const products = await response.json();
            products.forEach((product) => (output[product["id"]] = product["quantity"]));
        }
        return output;
    };

    const OrderBlock = ({ title, component }) => (
        <section className={styles.section}>
            <Label className={styles.label}>{title}</Label>
            {component}
        </section>
    );

    return (
        <Loader
            show={loading}
            message={<Spinner color="primary" />}
            backgroundStyle={{ backgroundColor: "transparent" }}
            className={styles.loader}
        >
            <OrderBlock title="A. THÔNG TIN ĐƠN HÀNG" component={<OrderOverview order={order} />} />

            <OrderBlock
                title="B. DANH SÁCH SẢN PHẨM"
                component={
                    <OrderDetail
                        type="Sản phẩm"
                        quantities={productQties}
                        details={order?.["details"]?.filter(
                            (detail) => detail["product_type"] === "LAPTOP"
                        )}
                    />
                }
            />

            <OrderBlock
                title="C. DANH SÁCH KHUYẾN MÃI"
                component={
                    <OrderDetail
                        type="Khuyến mãi"
                        quantities={promotionQties}
                        details={order?.["details"]?.filter(
                            (detail) => detail["product_type"] === "PROMOTION"
                        )}
                    />
                }
            />
        </Loader>
    );
};

export default OrderForm;
