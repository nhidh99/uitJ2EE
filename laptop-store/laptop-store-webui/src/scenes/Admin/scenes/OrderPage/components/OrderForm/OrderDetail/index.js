import React from "react";
import { Table } from "reactstrap";
import styles from "./styles.module.scss";

const OrderDetail = ({ type, details, quantities }) => (
    <Table bordered className={styles.table}>
        <tbody>
            <tr>
                <th className={styles.productCol}>{type}</th>
                <th className={styles.inStockCol}>Lượng tồn</th>
                <th className={styles.quantityCol}>Số lượng</th>
                <th className={styles.unitPriceCol}>Đơn giá</th>
                <th className={styles.totalPriceCol}>Thành tiền</th>
            </tr>

            {details?.map((detail) => {
                const inStockQty = quantities[detail["product_id"]];
                const isEnoughProduct = inStockQty && inStockQty >= detail["quantity"];

                return (
                    <tr className={isEnoughProduct ? styles.white : styles.red}>
                        <td className={styles.productCol}>
                            {`${detail["product_id"]} - ${detail["product_name"]}`}
                        </td>
                        <td className={styles.inStockCol}>
                            {!isNaN(inStockQty) ? inStockQty : "-"}
                        </td>
                        <td className={styles.quantityCol}>{detail["quantity"]}</td>
                        <td className={styles.unitPriceCol}>
                            {detail["unit_price"].toLocaleString()}
                            <sup>đ</sup>
                        </td>
                        <td className={styles.totalPriceCol}>
                            {detail["total_price"].toLocaleString()}
                            <sup>đ</sup>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    </Table>
);

export default OrderDetail;
