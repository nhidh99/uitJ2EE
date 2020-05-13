import React, { Component, Fragment } from "react";
import styles from "./styles.module.scss";
import { Table, Button } from "reactstrap";
import { FaShoppingCart } from "react-icons/fa";

class SummaryBlock extends Component {
    render() {
        return (
            <Fragment>
                <header className={styles.caution}>
                    Kiểm tra kĩ các thông tin trước khi ĐẶT MUA
                </header>
                <Table className={styles.table} borderless>
                    <tbody>
                        <tr>
                            <th className={styles.headerCol}>Dự kiến giao hàng</th>
                            <td>13/05/2020</td>
                        </tr>
                        <tr>
                            <th>Tạm tính</th>
                            <td>19,000,000đ</td>
                        </tr>
                        <tr>
                            <th>Phí vận chuyển</th>
                            <td>20,000đ</td>
                        </tr>
                        <tr>
                            <th>Thành tiền</th>
                            <td>
                                <b>19,020,000đ</b>
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

export default SummaryBlock;
