import React, { Fragment } from "react";
import { Label } from "reactstrap";
import styles from "./styles.module.scss";
import OrderDetail from "./OrderDetail";
import OrderPromotion from "./OrderPromotion";
import OrderOverview from "./OrderOverview";

const OrderForm = () => (
    <Fragment>
        <OrderBlock
            title="1. THÔNG TIN ĐƠN HÀNG"
            component={<OrderOverview />}
        />

        <OrderBlock
            title="2. DANH SÁCH SẢN PHẨM"
            component={<OrderDetail />}
        />

        <OrderBlock
            title="3. DANH SÁCH KHUYẾN MÃI"
            component={<OrderPromotion />}
        />
    </Fragment>
);

const OrderBlock = ({ title, component }) => (
    <section className={styles.section}>
        <Label className={styles.label}>{title}</Label>
        {component}
    </section>
);

export default OrderForm;
