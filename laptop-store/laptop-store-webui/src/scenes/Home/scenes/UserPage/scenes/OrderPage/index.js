import React, { Component, Fragment } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import { FaBoxes } from "react-icons/fa";
import styles from "./styles.module.scss";

class OrderPage extends Component {
    render() {
        return (
            <Fragment>
                <div className={styles.title}>
                    <label className={styles.header}>
                        <FaBoxes />
                        &nbsp;&nbsp;ĐƠN HÀNG CỦA TÔI
                    </label>
                </div>
                <Table className={styles.orderTable} striped>
                    <tbody>
                        <tr>
                            <th className={styles.idCol}>Mã đơn hàng</th>
                            <th className={styles.dateCol}>Ngày mua</th>
                            <th className={styles.productsCol}>Sản phẩm</th>
                            <th className={styles.priceCol}>Tổng tiền</th>
                            <th className={styles.statusCol}>Trạng thái</th>
                        </tr>
                        <tr>
                            <td className={styles.idCol}>
                                <Link to="/user/order/551199331">551199331</Link>
                            </td>
                            <td className={styles.dateCol}>15/12/2018</td>
                            <td className={styles.productsCol}>
                                Set Mèo Nổ Tưng Bừng: Combo Mèo Nổ + 4 Bản Mở Rộng...và 01 sản phẩm
                                khác
                            </td>
                            <td className={styles.priceCol}>
                                217.000 <u>đ</u>
                            </td>
                            <td className={styles.statusCol}>Giao hàng thành công</td>
                        </tr>

                        <tr>
                            <td className={styles.idCol}>
                                <Link to="/user/order/551199331">551199331</Link>
                            </td>
                            <td className={styles.dateCol}>15/12/2018</td>
                            <td className={styles.productsCol}>
                                Set Mèo Nổ Tưng Bừng: Combo Mèo Nổ + 4 Bản Mở Rộng...và 01 sản phẩm
                                khác
                            </td>
                            <td className={styles.priceCol}>
                                217.000 <u>đ</u>
                            </td>
                            <td className={styles.statusCol}>Giao hàng thành công</td>
                        </tr>
                    </tbody>
                </Table>
            </Fragment>
        );
    }
}

export default OrderPage;
