import React, { Component, Fragment } from "react";
import styles from "./styles.module.scss";
import Loader from "react-loader-advanced";
import { FaBoxes } from "react-icons/fa";
import { Spinner, Table } from "reactstrap";
import { getCookie } from "../../../../../../services/helper/cookie";
import { ITEM_COUNT_PER_PAGE } from "../../../../../../constants";
import Pagination from "react-js-pagination";
import { convertOrderStatus } from "../../../../../../services/helper/converter";
import { withRouter } from "react-router-dom";

class OrderPage extends Component {
    state = {
        loading: true,
        activePage: 1,
        orders: [],
        orderCount: 1,
    };

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        const url = `/api/users/me/orders?page=${this.state.activePage}`;
        const response = await fetch(url, {
            method: "GET",
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        });
        if (response.ok) {
            const orders = await response.json();
            const orderCount = response.headers.get("X-Total-Count");
            this.setState({ orders: orders, orderCount: orderCount, loading: false });
        }
    };

    pageChange = (pageNumber) => {
        if (pageNumber === this.state.activePage) return;
        this.setState({ loading: true, activePage: pageNumber }, () => this.loadData());
    };

    redirectToOrderDetail = (orderId) => {
        this.props.history.push(`/user/order/${orderId}`);
    };

    render() {
        const { loading, orders, activePage, orderCount } = this.state;
        return (
            <Fragment>
                <div className={styles.title}>
                    <label className={styles.header}>
                        <FaBoxes />
                        &nbsp;&nbsp;ĐƠN HÀNG CỦA TÔI
                    </label>

                    <div className={styles.pagination}>
                        <Pagination
                            activePage={activePage}
                            itemsCountPerPage={ITEM_COUNT_PER_PAGE}
                            totalItemsCount={orderCount}
                            pageRangeDisplayed={5}
                            onChange={this.pageChange}
                            itemClass="page-item"
                            linkClass="page-link"
                        />
                    </div>
                </div>
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
                                        onClick={() => this.redirectToOrderDetail(order["id"])}
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
            </Fragment>
        );
    }
}

export default withRouter(OrderPage);
