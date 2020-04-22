import React, { Fragment } from "react";
import OrderFilter from "./components/OrderFilter";
import OrderList from "./components/OrderList";

const OrderPage = () => (
    <Fragment>
        <OrderFilter />
        <OrderList/>
    </Fragment>
);

export default OrderPage;
