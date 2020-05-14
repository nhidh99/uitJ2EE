import React, { Component } from "react";
import styles from "./styles.module.scss";
import { Table } from "reactstrap";

class PromotionsBlock extends Component {
    render() {
        const { quantities, promotions } = this.props;
        return (
            <Table bordered className={styles.table}>
                <tbody>
                    <tr>
                        <th className={styles.promotionCol}>Khuyến mãi</th>
                        <th className={styles.unitPriceCol}>Đơn giá</th>
                        <th className={styles.quantityCol}>Số lượng</th>
                        <th className={styles.totalPriceCol}>Thành tiền</th>
                    </tr>

                    {promotions.map((promotion) => {
                        const quantity = quantities[promotion["id"]];
                        return (
                            <tr>
                                <td className={styles.promotionCol}>{promotion["name"]}</td>

                                <td className={styles.unitPriceCol}>
                                    {promotion["price"].toLocaleString()}
                                    <sup>đ</sup>
                                </td>

                                <td className={styles.quantityCol}>{quantity}</td>

                                <td className={styles.totalPriceCol}>
                                    {(promotion["price"] * quantity).toLocaleString()}
                                    <sup>đ</sup>
                                </td>
                            </tr>
                        );
                    })}

                    <tr>
                        <td colSpan={2}>
                            <b>Tổng cộng</b>
                        </td>

                        <td className={styles.quantityCol}>
                            <b>{Object.values(quantities).reduce((a, b) => a + b, 0)}</b>
                        </td>

                        <td className={styles.totalPriceCol}>
                            <b>
                                {promotions
                                    .map((p) => p["price"] * quantities[p["id"]])
                                    .reduce((a, b) => a + b, 0)
                                    .toLocaleString()}
                                <sup>đ</sup>
                            </b>
                        </td>
                    </tr>
                </tbody>
            </Table>
        );
    }
}

export default PromotionsBlock;
