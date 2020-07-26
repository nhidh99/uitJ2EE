/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import { Table, Spinner } from "reactstrap";
import { FaBoxes } from "react-icons/fa";
import styles from "./styles.module.scss";
import "react-step-progress-bar/styles.css";
import OrderProgress from "./components/OrderProgress";
import Loader from "react-loader-advanced";
import OrderCancel from "./components/OrderCancel";
import { useParams } from "react-router-dom";
import orderApi from "../../../../../../services/api/orderApi";

const OrderDetail = (props) => {
    const [order, setOrder] = useState(null);
    const [details, setDetails] = useState([]);
    const [deliveryDate, setDeliveryDate] = useState(null);
    const [loading, setLoading] = useState(true);
    const { orderId } = useParams();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const response = await orderApi.getById(orderId);
            const order = response.data;
            setOrder(order);
            setDetails(order["details"]);
            setDeliveryDate(order["delivery_date"]);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const OrderHeader = () => {
        const isCancelableOrder = ["PENDING", "RECEIVED"].includes(order?.["status"]);
        return (
            <div>
                <label className={styles.header}>
                    <FaBoxes />
                    &nbsp;&nbsp;CHI TIẾT ĐƠN HÀNG {loading ? "" : `#${order["id"]}`}
                </label>

                {isCancelableOrder ? <OrderCancel orderId={order["id"]} /> : null}
            </div>
        );
    };

    const OrderBody = () => {
        return loading ? (
            <Loader
                show={loading}
                message={<Spinner color="primary" />}
                className={styles.loader}
                backgroundStyle={{ backgroundColor: "transparent" }}
            />
        ) : (
            <Fragment>
                <OrderProgress status={order?.["status"]} />

                <OrderBodyContent
                    title="A. THÔNG TIN ĐƠN HÀNG"
                    component={<OrderOverviewTable />}
                />

                <OrderBodyContent
                    title="B. DANH SÁCH SẢN PHẨM"
                    component={
                        <OrderDetailTable
                            type="Sản phẩm"
                            details={details.filter((d) => d["product_type"] === "LAPTOP")}
                        />
                    }
                />

                <OrderBodyContent
                    title="C. DANH SÁCH KHUYẾN MÃI"
                    component={
                        <OrderDetailTable
                            type="Khuyến mãi"
                            details={details.filter((d) => d["product_type"] === "PROMOTION")}
                        />
                    }
                />
            </Fragment>
        );
    };

    const OrderBodyContent = ({ title, component }) => (
        <Fragment>
            <header className={styles.title}>{title}</header>
            {component}
        </Fragment>
    );

    const OrderOverviewTable = () => (
        <Table bordered className={styles.infoTable}>
            <tbody>
                <tr>
                    <th>Dự kiến giao hàng</th>
                    <td>
                        {order["status"] === "CANCELED" ? (
                            <span className={styles.canceled}>Đơn hàng đã bị hủy</span>
                        ) : (
                            `Ngày ${deliveryDate["dayOfMonth"]} tháng ${deliveryDate["monthValue"]} năm ${deliveryDate["year"]}`
                        )}
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
                        {order["total_price"].toLocaleString()}
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
                    <td>{order["receiver_name"]}</td>
                    <th>Điện thoại </th>
                    <td>{order["receiver_phone"]}</td>
                </tr>
                <tr>
                    <th>Địa chỉ nhận </th>
                    <td colSpan="3">
                        {[
                            order["address_num"],
                            order["street"],
                            order["ward"],
                            order["district"],
                            order["city"],
                        ].join(", ")}
                    </td>
                </tr>
            </tbody>
        </Table>
    );

    const OrderDetailTable = ({ type, details }) => (
        <Table className={styles.productTable}>
            <tbody>
                <tr>
                    <th className={styles.productsCol}>{type}</th>
                    <th className={styles.unitPriceCol}>Đơn giá</th>
                    <th className={styles.quantityCol}>Số lượng</th>
                    <th className={styles.totalPriceCol}>Tạm tính</th>
                </tr>
                {details.map((detail) => buildRowFromProductDetail(detail))}
            </tbody>
        </Table>
    );

    const buildRowFromProductDetail = (detail) => {
        const imgURL =
            detail["product_type"] === "LAPTOP"
                ? `/api/images/400/laptops/${detail["product_id"]}/laptop-${detail["product_id"]}.jpg`
                : `/api/images/200/promotions/${detail["product_id"]}/promotion-${detail["product_id"]}.jpg`;

        return (
            <tr>
                <table className={styles.productName}>
                    <tr>
                        <td>
                            <img
                                src={imgURL}
                                alt={detail["product_name"]}
                                title={detail["product_name"]}
                                width={55}
                                height={55}
                                className={styles.img}
                            />
                        </td>
                        <td>{detail["product_name"]}</td>
                    </tr>
                </table>

                <td className={styles.unitPriceCol}>
                    {detail["unit_price"].toLocaleString()}
                    <sup>đ</sup>
                </td>

                <td className={styles.quantityCol}>{detail["quantity"]}</td>

                <td className={styles.totalPriceCol}>
                    {detail["total_price"].toLocaleString()}
                    <sup>đ</sup>
                </td>
            </tr>
        );
    };

    return (
        <Fragment>
            <OrderHeader />
            <OrderBody />
        </Fragment>
    );
};

export default OrderDetail;
