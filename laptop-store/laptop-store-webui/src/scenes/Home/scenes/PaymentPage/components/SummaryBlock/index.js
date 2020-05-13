import React, { Component, Fragment } from "react";
import styles from "./styles.module.scss";
import { Table, Button } from "reactstrap";
import { FaShoppingCart } from "react-icons/fa";
import { NUMBER_OF_DELIVERY_DAYS, DELIVERY_FEE } from "../../../../../../constants";

class SummaryBlock extends Component {
    render() {
        const { productsPrice } = this.props;

        return (
            <Fragment>
                <header className={styles.caution}>
                    Kiểm tra kĩ các thông tin trước khi ĐẶT MUA
                </header>
                <Table className={styles.table} borderless>
                    <tbody>
                        <tr>
                            <th className={styles.headerCol}>Dự kiến giao hàng</th>
                            <td>
                                {addBusinessDaysToDate(
                                    new Date(),
                                    NUMBER_OF_DELIVERY_DAYS
                                ).toLocaleDateString("vi-VN")}
                            </td>
                        </tr>
                        <tr>
                            <th>Tạm tính</th>
                            <td>
                                {productsPrice.toLocaleString()}
                                <sup>đ</sup>
                            </td>
                        </tr>
                        <tr>
                            <th>Phí vận chuyển</th>
                            <td>
                                {DELIVERY_FEE.toLocaleString()}
                                <sup>đ</sup>
                            </td>
                        </tr>
                        <tr>
                            <th>Thành tiền</th>
                            <td>
                                <b>
                                    {(productsPrice + DELIVERY_FEE).toLocaleString()}
                                    <sup>đ</sup>
                                </b>
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={2}>
                                <Button color="success" className={styles.btnOrder}>
                                    <FaShoppingCart />
                                    &nbsp;&nbsp;ĐẶT MUA
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Fragment>
        );
    }
}

const addBusinessDaysToDate = (date, days) => {
    const day = date.getDay();
    date = new Date(date.getTime());
    date.setDate(
        date.getDate() +
            days +
            (day === 6 ? 2 : +!day) +
            Math.floor((days - 1 + (day % 6 || 1)) / 5) * 2
    );
    return date;
};

export default SummaryBlock;
