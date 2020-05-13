import React, { Component } from "react";
import styles from "./styles.module.scss";
import { Table } from "reactstrap";

class PromotionsBlock extends Component {
    render() {
        return (
            <Table bordered className={styles.table}>
                <tbody>
                    <tr>
                        <th className={styles.promotionCol}>Khuyến mãi</th>
                        <th className={styles.unitPriceCol}>Đơn giá</th>
                        <th className={styles.quantityCol}>Số lượng</th>
                        <th className={styles.totalPriceCol}>Thành tiền</th>
                    </tr>
                    <tr>
                        <td className={styles.promotionCol}>5112843 - Balo Laptop Acer</td>
                        <td className={styles.unitPriceCol}>250.000đ</td>
                        <td className={styles.quantityCol}>1</td>
                        <td className={styles.totalPriceCol}>250.000đ</td>
                    </tr>
                    <tr>
                        <td className={styles.promotionCol}>3112841 - Chuột máy tính</td>
                        <td className={styles.unitPriceCol}>180.000đ</td>
                        <td className={styles.quantityCol}>1</td>
                        <td className={styles.totalPriceCol}>180.000đ</td>
                    </tr>
                </tbody>
            </Table>
        );
    }
}

export default PromotionsBlock;
