import React, { Component, Fragment } from "react";
import { Table } from "reactstrap";
import styles from "./styles.module.scss";
import OrderUpdate from "../OrderUpdate";

class OrderList extends Component {
    render() {
        return (
            <Fragment>
                <Table className={styles.table} bordered>
                    <tbody>
                        <tr>
                            <th className={styles.idCol}>Mã đơn hàng</th>
                            <th className={styles.nameCol}>Người nhận</th>
                            <th className={styles.phoneCol}>Số điện thoại</th>
                            <th className={styles.dateCol}>Ngày mua</th>
                            <th className={styles.priceCol}>Tổng tiền</th>
                            <th className={styles.statusCol}>Trạng thái</th>
                            <th className={styles.actionCol}>Thao tác</th>
                        </tr>

                        <tr>
                            <td className={styles.idCol}>341125</td>
                            <td className={styles.nameCol}>Đinh Hoàng Nhi</td>
                            <td className={styles.phoneCol}>0336887109</td>
                            <td className={styles.dateCol}>21/04/2020</td>
                            <td className={styles.priceCol}>16,900,000đ</td>
                            <td className={styles.statusCol}>Chờ xử lí</td>
                            <td className={styles.actionCol}>
                                <OrderUpdate orderId={341125} />
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Fragment>
        );
    }
}

export default OrderList;
