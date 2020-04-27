import React, { Component } from "react";
import { Table } from "reactstrap";
import styles from "./styles.module.scss";

class OrderPromotion extends Component {
    render() {
        return (
            <Table bordered className={styles.table}>
                <tbody>
                    <tr>
                        <th className={styles.promotionCol}>Khuyến mãi</th>
                        <th className={styles.inStockCol}>Lượng tồn</th>
                        <th className={styles.unitPriceCol}>Đơn giá</th>
                        <th className={styles.quantityCol}>Số lượng</th>
                        <th className={styles.totalPriceCol}>Thành tiền</th>
                    </tr>

                    <tr>
                        <td>5112843 - Balo Laptop Acer </td>
                        <td>10</td>
                        <td>250,000đ </td>
                        <td>1</td>
                        <td>250,000đ</td>
                    </tr>

                    <tr>
                        <td>3112841 - Chuột không dây</td>
                        <td>5</td>
                        <td>180,000đ </td>
                        <td>1</td>
                        <td>180,000đ</td>
                    </tr>
                </tbody>
            </Table>
        );
    }
}

export default OrderPromotion;
