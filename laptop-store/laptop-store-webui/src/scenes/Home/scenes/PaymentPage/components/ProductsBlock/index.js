import React, { Component } from "react";
import styles from "./styles.module.scss";
import { Table } from "reactstrap";
import { getCart } from "../../../../../../services/helper/cart";

class ProductsBlock extends Component {
    render() {
        const { products } = this.props;
        const cart = getCart();

        return (
            <Table bordered className={styles.table}>
                <tbody>
                    <tr>
                        <th className={styles.productCol}>Sản phẩm</th>
                        <th className={styles.unitPriceCol}>Đơn giá</th>
                        <th className={styles.quantityCol}>Số lượng</th>
                        <th className={styles.totalPriceCol}>Thành tiền</th>
                    </tr>

                    {products.map((product) => {
                        const price = product["unit_price"] - product["discount_price"];
                        const quantity = cart[product["id"]];
                        return (
                            <tr>
                                <td className={styles.productCol}>{product["name"]}</td>
                                <td className={styles.unitPriceCol}>
                                    {price.toLocaleString()}
                                    <sup>đ</sup>
                                </td>
                                <td className={styles.quantityCol}>{quantity}</td>
                                <td className={styles.totalPriceCol}>
                                    {(price * quantity).toLocaleString()}
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
                            <b>{products.map((p) => cart[p["id"]]).reduce((a, b) => a + b, 0)}</b>
                        </td>

                        <td className={styles.totalPriceCol}>
                            <b>
                                {products
                                    .map(
                                        (p) =>
                                            cart[p["id"]] * (p["unit_price"] - p["discount_price"])
                                    )
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

export default ProductsBlock;
