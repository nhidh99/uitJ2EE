import React, { Component } from "react";
import { Table } from "reactstrap";
import styles from './styles.module.scss';

class DetailBlock extends Component {
    render() {
        return (
            <Table bordered className={styles.table}>
                <tbody>
                    <tr>
                        <th>Thương hiệu</th>
                        <td>Dell</td>
                    </tr>
                    <tr>
                        <th>CPU</th>
                        <td>Intel Core i5 Comet Lake, 10210U, 1.60 GHz</td>
                    </tr>
                    <tr>
                        <th>RAM</th>
                        <td>8 GB, DDR4 (On board +1 khe), 2666 MHz</td>
                    </tr>
                    <tr>
                        <th>Ổ cứng</th>
                        <td>SSD 256GB NVMe PCIe, Hỗ trợ khe cắm HDD SATA</td>
                    </tr>
                    <tr>
                        <th>Màn hình</th>
                        <td>14 inch, Full HD (1920 x 1080)</td>
                    </tr>
                    <tr>
                        <th>Card màn hình</th>
                        <td>Card đồ họa tích hợp, Intel UHD Graphics</td>
                    </tr>
                    <tr>
                        <th>Cổng kết nối</th>
                        <td>2 x USB 3.1, HDMI, LAN (RJ45), USB 2.0, USB Type-C</td>
                    </tr>
                    <tr>
                        <th>Đặc biệt</th>
                        <td>Có đèn bàn phím</td>
                    </tr>
                    <tr>
                        <th>Hệ điều hành</th>
                        <td>Windows 10 Home SL</td>
                    </tr>
                    <tr>
                        <th>Kích thước</th>
                        <td>Dày 18.3 mm, 1.49 kg</td>
                    </tr>
                </tbody>
            </Table>
        )
    }
}

export default DetailBlock;