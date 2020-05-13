import React, { Component } from "react";
import styles from "./styles.module.scss";
import { Table } from "reactstrap";

class ProductsBlock extends Component {
    render() {
        return (
            <Table bordered className={styles.table}>
                <tbody>
                    <tr>
                        <th className={styles.productCol}>Sản phẩm</th>
                        <th className={styles.unitPriceCol}>Đơn giá</th>
                        <th className={styles.quantityCol}>Số lượng</th>
                        <th className={styles.totalPriceCol}>Thành tiền</th>
                    </tr>
                    <tr>
                        <td className={styles.productCol}>
                            5112843 - Laptop Dell Vostro 5490 V4I5106W
                        </td>
                        <td className={styles.unitPriceCol}>16.900.000đ</td>
                        <td className={styles.quantityCol}>1</td>
                        <td className={styles.totalPriceCol}>16.900.000đ</td>
                    </tr>
                </tbody>
            </Table>
        );
    }
}

export default ProductsBlock;
