/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Label, Spinner } from "reactstrap";
import styles from "./styles.module.scss";
import OrderDetail from "./OrderDetail";
import OrderOverview from "./OrderOverview";
import Loader from "react-loader-advanced";
import laptopApi from "../../../../../../services/api/laptopApi";
import promotionApi from "../../../../../../services/api/promotionApi";
import orderApi from "../../../../../../services/api/orderApi";

const OrderForm = ({ orderId }) => {
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState({});
    const [promotionQties, setPromotionQties] = useState({});
    const [productQties, setProductQties] = useState({});

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const response = await orderApi.getById(orderId);
            const order = response.data;
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
        } catch (err) {
            console.log(err);
        }
    };

    const loadProducts = async (productIds) => {
        try {
            const output = {};
            const response = await laptopApi.getByIds(productIds);
            const products = response.data;
            products.forEach((product) => (output[product["id"]] = product["quantity"]));
            return output;
        } catch (err) {
            console.log("fail");
            return {};
        }
    };

    const loadPromotions = async (promotionIds) => {
        try {
            const output = {};
            const response = await promotionApi.getByIds(promotionIds);
            const products = await response.data;
            products.forEach((product) => (output[product["id"]] = product["quantity"]));
            return output;
        } catch (err) {
            console.log("fail");
            return {};
        }
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
