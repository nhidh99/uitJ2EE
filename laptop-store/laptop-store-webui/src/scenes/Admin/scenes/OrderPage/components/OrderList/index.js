/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import { Table, Spinner } from "reactstrap";
import styles from "./styles.module.scss";
import { getCookie } from "../../../../../../services/helper/cookie";
import { convertOrderStatus } from "../../../../../../services/helper/converter";
import OrderUpdate from "../OrderUpdate";
import Loader from "react-loader-advanced";
import Pagination from "react-js-pagination";
import { ITEM_COUNT_PER_PAGE } from "../../../../../../constants";
import { withRouter } from "react-router-dom";

const OrderList = (props) => {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(null);
    const [count, setCount] = useState(1);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams(props.location.search);
        const page = parseInt(params.get("page"));
        setPage(page ? page : 1);
    }, []);

    useEffect(() => {
        if (!page) return;
        setLoading(true);
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        const status = params.get("status");
        if (id === null && status === null) {
            loadData();
        } else {
            search(id, status);
        }
    }, [page]);

    const search = async (id, status) => {
        const response = await fetch(`/api/orders/search?id=${id}&status=${status}&page=${page}`, {
            method: "GET",
            headers: { Authorization: "Bearer " + getCookie("access_token") }
        });
        if (response.ok) {
            const orders = await response.json();
            const count = parseInt(response.headers.get("X-Total-Count"));
            setOrders(orders);
            setCount(count);
            setLoading(false);
        }
    }

    const loadData = async () => {
        const response = await fetch(`/api/orders?page=${page}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        });

        if (response.ok) {
            const orders = await response.json();
            const count = parseInt(response.headers.get("X-Total-Count"));
            setOrders(orders);
            setCount(count);
            setLoading(false);
        }
    };

    const pageChange = (pageNumber) => {
        if (pageNumber === page) return;
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        const status = params.get("status");
        if (id === null) {
            props.history.push("/admin/orders?page=" + pageNumber);
        } else {
            props.history.push("/admin/orders/search?id=" + id + "&status=" + status + "&page=" + pageNumber);
        }
        setPage(pageNumber);
    };

    const buildRowFromOverview = (overview) => {
        const order = overview["order"];
        const date = order["delivery_date"];
        const first_product = overview["first_product"];
        const product_count = overview["product_count"];

        return (
            <OrderUpdate
                orderId={order["id"]}
                row={
                    <Fragment>
                        <td className={styles.idCol}>{order["id"]}</td>
                        <td className={styles.productsCol}>
                            {`${first_product["quantity"]} Laptop ${first_product["product_name"]}`}
                            {product_count === first_product["quantity"]
                                ? null
                                : ` và ${product_count - first_product["quantity"]} sản phẩm khác`}
                        </td>
                        <td className={styles.nameCol}>{order["receiver_name"]}</td>
                        <td className={styles.phoneCol}>{order["receiver_phone"]}</td>
                        <td
                            className={styles.dateCol}
                        >{`${date["dayOfMonth"]}/${date["monthValue"]}/${date["year"]}`}</td>
                        <td className={styles.priceCol}>
                            {order["total_price"].toLocaleString()}
                            <sup>đ</sup>
                        </td>
                        <td className={styles.statusCol}>{convertOrderStatus(order["status"])}</td>
                    </Fragment>
                }
            />
        );
    };

    const OrderTable = () => (
        <Loader show={loading} message={<Spinner />}>
            <Table className={styles.table} bordered>
                <tbody>
                    <tr>
                        <th className={styles.idCol}>Mã đơn</th>
                        <th className={styles.productsCol}>Sản phẩm</th>
                        <th className={styles.nameCol}>Người nhận</th>
                        <th className={styles.phoneCol}>Điện thoại</th>
                        <th className={styles.dateCol}>Ngày mua</th>
                        <th className={styles.priceCol}>Tổng tiền</th>
                        <th className={styles.statusCol}>Trạng thái</th>
                    </tr>
                    {orders.map((overview) => buildRowFromOverview(overview))}
                </tbody>
            </Table>
        </Loader>
    );

    const OrderPagination = () => (
        <div className={styles.pagination}>
            <Pagination
                activePage={page}
                itemsCountPerPage={ITEM_COUNT_PER_PAGE}
                totalItemsCount={count}
                pageRangeDisplayed={5}
                onChange={pageChange}
                itemClass="page-item"
                linkClass="page-link"
            />
        </div>
    );

    return (
        <Fragment>
            <OrderTable />
            <OrderPagination />
        </Fragment>
    );
};

export default withRouter(OrderList);
