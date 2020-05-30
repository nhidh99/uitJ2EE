import React, { Component, Fragment } from "react";
import { Table, Button, Spinner } from "reactstrap";
import { FaBoxes } from "react-icons/fa";
import styles from "./styles.module.scss";
import { getCookie } from "../../../../../../services/helper/cookie";
import "react-step-progress-bar/styles.css";
import OrderProgress from "./components/OrderProgress";
import Loader from "react-loader-advanced";

class OrderDetail extends Component {
    state = {
        order: null,
        details: [],
        loading: true,
    };

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        const parts = window.location.pathname.split("/");
        const orderId = parseInt(parts[parts.length - 1]);
        const response = await fetch(`/api/orders/${orderId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        });
        if (response.ok) {
            const order = await response.json();
            this.setState({ order: order, details: order["details"], loading: false });
        }
    };

    render() {
        const parts = window.location.pathname.split("/");
        const orderId = parseInt(parts[parts.length - 1]);
        const { order, details, loading } = this.state;
        const delivery_date = order?.["delivery_date"];

        return (
            <Fragment>
                <div>
                    <label className={styles.header}>
                        <FaBoxes />
                        &nbsp;&nbsp;CHI TIẾT ĐƠN HÀNG #{orderId}
                    </label>
                    <Button type="submit" className={styles.submit} color="danger">
                        Hủy đơn hàng
                    </Button>
                </div>

                <Loader
                    show={loading}
                    message={<Spinner color="primary" />}
                    className={styles.loader}
                    backgroundStyle={{ backgroundColor: "transparent" }}
                >
                    {loading ? null : (
                        <Fragment>
                            <OrderProgress status={order?.["status"]} />
                            <header className={styles.title}>A. THÔNG TIN ĐƠN HÀNG</header>
                            <Table bordered className={styles.infoTable}>
                                <tbody>
                                    <tr>
                                        <th>Dự kiến giao hàng</th>
                                        <td>
                                            {`Ngày ${delivery_date?.["dayOfMonth"]} tháng ${delivery_date?.["monthValue"]} năm ${delivery_date?.["year"]}`}
                                        </td>
                                        <th>Phí vận chuyển</th>
                                        <td>
                                            {order?.["transport_fee"].toLocaleString()}
                                            <sup>đ</sup>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Giá trị đơn hàng</th>
                                        <td>
                                            {order?.["total_price"].toLocaleString()}
                                            <sup>đ</sup>
                                        </td>
                                        <th>Số lượng sản phẩm</th>
                                        <td>
                                            {details
                                                .filter((d) => d["product_type"] === "LAPTOP")
                                                .map((d) => d["quantity"])
                                                .reduce((a, b) => a + b, 0)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Tên người nhận </th>
                                        <td>{order?.["receiver_name"]}</td>
                                        <th>Điện thoại </th>
                                        <td>{order?.["receiver_phone"]}</td>
                                    </tr>
                                    <tr>
                                        <th>Địa chỉ nhận </th>
                                        <td colSpan="3">
                                            {[
                                                order?.["address_num"],
                                                order?.["street"],
                                                order?.["ward"],
                                                order?.["district"],
                                                order?.["city"],
                                            ].join(", ")}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>

                            <header className={styles.title}>B. DANH SÁCH SẢN PHẨM</header>
                            <Table className={styles.productTable}>
                                <tbody>
                                    <tr>
                                        <th className={styles.productsCol}>Sản phẩm</th>
                                        <th className={styles.unitPriceCol}>Đơn giá</th>
                                        <th className={styles.quantityCol}>Số lượng</th>
                                        <th className={styles.totalPriceCol}>Tạm tính</th>
                                    </tr>
                                    {details
                                        .filter((d) => d["product_type"] === "LAPTOP")
                                        .map((detail) => (
                                            <tr>
                                                <td className={styles.productsCol}>
                                                    <img
                                                        src={`/api/images/400/laptops/${detail["product_id"]}/laptop-${detail["product_id"]}.jpg`}
                                                        alt={detail["product_name"]}
                                                        title={detail["product_name"]}
                                                        width={55}
                                                        height={55}
                                                        className={styles.img}
                                                    />
                                                    {detail["product_name"]}
                                                </td>

                                                <td className={styles.unitPriceCol}>
                                                    {detail["unit_price"].toLocaleString()}
                                                    <sup>đ</sup>
                                                </td>

                                                <td className={styles.quantityCol}>
                                                    {detail["quantity"]}
                                                </td>

                                                <td className={styles.totalPriceCol}>
                                                    {detail["total_price"].toLocaleString()}
                                                    <sup>đ</sup>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>

                            <header className={styles.title}>C. DANH SÁCH KHUYẾN MÃI</header>
                            <Table className={styles.productTable}>
                                <tbody>
                                    <tr>
                                        <th className={styles.productsCol}>Khuyến mãi</th>
                                        <th className={styles.unitPriceCol}>Đơn giá</th>
                                        <th className={styles.quantityCol}>Số lượng</th>
                                        <th className={styles.totalPriceCol}>Tạm tính</th>
                                    </tr>
                                    {details
                                        .filter((d) => d["product_type"] === "PROMOTION")
                                        .map((detail) => (
                                            <tr>
                                                <td className={styles.productsCol}>
                                                    <img
                                                        src={`/api/images/200/promotions/${detail["product_id"]}/promotion-${detail["product_id"]}.jpg`}
                                                        alt={detail["product_name"]}
                                                        title={detail["product_name"]}
                                                        width={55}
                                                        height={55}
                                                        className={styles.img}
                                                    />
                                                    {detail["product_name"]}
                                                </td>

                                                <td className={styles.unitPriceCol}>
                                                    {detail["unit_price"].toLocaleString()}
                                                    <sup>đ</sup>
                                                </td>

                                                <td className={styles.quantityCol}>
                                                    {detail["quantity"]}
                                                </td>

                                                <td className={styles.totalPriceCol}>
                                                    {detail["total_price"].toLocaleString()}
                                                    <sup>đ</sup>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </Table>
                        </Fragment>
                    )}
                </Loader>
            </Fragment>
        );
    }
}

export default OrderDetail;
