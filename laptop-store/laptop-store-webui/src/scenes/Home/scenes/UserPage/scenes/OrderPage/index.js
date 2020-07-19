/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { FaBoxes, FaShoppingBasket } from "react-icons/fa";
import { Table, Spinner } from "reactstrap";
import { ITEM_COUNT_PER_PAGE } from "../../../../../../constants";
import Pagination from "react-js-pagination";
import { convertOrderStatus } from "../../../../../../services/helper/converter";
import { withRouter } from "react-router-dom";
import EmptyBlock from "../../../../../../components/EmptyBlock";
import Loader from "react-loader-advanced";
import userApi from "../../../../../../services/api/userApi";

const OrderPage = (props) => {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(null);
    const [orders, setOrders] = useState([]);
    const [orderCount, setOrderCount] = useState(1);

    useEffect(() => {
        const params = new URLSearchParams(props.location.search);
        const page = parseInt(params.get("page"));
        setPage(page ? page : 1);
    }, []);

    useEffect(() => {
        if (!page) return;
        props.history.push("/user/order?page=" + page);
        setLoading(true);
        loadData();
    }, [page]);

    const loadData = async () => {
        try {
            const response = await userApi.getCurrentUserOrders(page);
            const orders = response.data;
            const orderCount = response.headers["x-total-count"];
            setOrders(orders);
            setOrderCount(orderCount);
            setLoading(false);
        } catch (err) {
            console.log("fail");
        }
    };

    const pageChange = (pageNumber) => {
        if (pageNumber === page) return;
        setPage(pageNumber);
    };

    const redirectToOrderDetail = (orderId) => {
        props.history.push(`/user/order/${orderId}`);
    };

    return (
        <Fragment>
            <div className={styles.title}>
                <label className={styles.header}>
                    <FaBoxes />
                    &nbsp;&nbsp;ĐƠN HÀNG CỦA TÔI
                </label>

                {orders.length === 0 ? null : (
                    <div className={styles.pagination}>
                        <Pagination
                            activePage={page}
                            itemsCountPerPage={ITEM_COUNT_PER_PAGE}
                            totalItemsCount={orderCount}
                            pageRangeDisplayed={5}
                            onChange={pageChange}
                            itemClass="page-item"
                            linkClass="page-link"
                        />
                    </div>
                )}
            </div>

            {orders.length === 0 ? (
                <EmptyBlock
                    icon={<FaShoppingBasket />}
                    loading={loading}
                    backToHome={!loading}
                    loadingText="Đang tải đơn hàng"
                    emptyText="Danh sách trống"
                />
            ) : (
                <Loader show={loading} message={<Spinner />}>
                    <Table className={styles.table} hover bordered>
                        <tbody>
                            <tr>
                                <th className={styles.idCol}>Mã đơn</th>
                                <th className={styles.dateCol}>Ngày mua</th>
                                <th className={styles.productsCol}>Sản phẩm</th>
                                <th className={styles.priceCol}>Trị giá</th>
                                <th className={styles.statusCol}>Trạng thái</th>
                            </tr>

                            {orders.map((orderOverview) => {
                                const { order, first_product, product_count } = orderOverview;
                                const { order_date } = order;
                                return (
                                    <tr
                                        onClick={() => redirectToOrderDetail(order["id"])}
                                        className={styles.orderRow}
                                    >
                                        <td className={styles.idCol}>{order["id"]}</td>

                                        <td className={styles.dateCol}>
                                            {`${order_date["dayOfMonth"]}/${order_date["monthValue"]}/${order_date["year"]}`}
                                        </td>

                                        <td className={styles.productsCol}>
                                            {`${first_product["quantity"]} Laptop ${first_product["product_name"]}`}
                                            {product_count === first_product["quantity"]
                                                ? null
                                                : ` và ${
                                                      product_count - first_product["quantity"]
                                                  } sản phẩm khác`}
                                        </td>

                                        <td className={styles.priceCol}>
                                            {order["total_price"].toLocaleString()}
                                            <sup>đ</sup>
                                        </td>

                                        <td className={styles.statusCol}>
                                            {convertOrderStatus(order["status"])}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Loader>
            )}
        </Fragment>
    );
};

export default withRouter(OrderPage);
