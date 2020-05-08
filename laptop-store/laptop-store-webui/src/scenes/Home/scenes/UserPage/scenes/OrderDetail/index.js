import React, { Component, Fragment } from "react";
import { Table, Label, Button } from "reactstrap";
import { FaBoxes } from "react-icons/fa";
import styles from "./styles.module.scss";
import TrackingBar from "./components/TrackingBar";

class OrderDetail extends Component {
    render() {
        return (
            <Fragment>
                <div className={styles.title}>
                    <label className={styles.header}>
                        <FaBoxes />
                        &nbsp;&nbsp;CHI TIẾT ĐƠN HÀNG
                    </label>
                    <Button type="submit" className={styles.submit} color="danger">
                        Hủy đơn hàng
                    </Button>
                </div>
                
                <TrackingBar /> <br />
                <DeliveryInfo /> <hr className={styles.space} />
                <DetailInfo />
            </Fragment>
        );
    }
}

const DeliveryInfo = () => (
    <Table bordered>
        <tbody>
            <tr>
                <th>Thời gian giao hàng</th>
                <td>Thứ 3, ngày 21 tháng 3 năm 2020</td>
                <th>Phí vận chuyển</th>
                <td>18.000đ</td>
            </tr>
            <tr>
                <th>Giá trị đơn hàng</th>
                <td>25.000.000đ</td>
                <th>Số lượng sản phẩm</th>
                <td>1</td>
            </tr>
            <tr>
                <th>Tên người nhận </th>
                <td>VƯƠNG THỊNH ĐẠT</td>
                <th>Điện thoại </th>
                <td>0782369351</td>
            </tr>
            <tr>
                <th>Địa chỉ nhận </th>
                <td colSpan="3">
                    C352, Khu phố Bình Đức 1, Phường Lái Thiệu, Thị xã Thuận An, tỉnh Bình Dương
                </td>
            </tr>
        </tbody>
    </Table>
);

const DetailInfo = () => (
    <Table borderless className={styles.productTable}>
        <thead>
            <tr>
                <th className={styles.productsCol}>Sản phẩm</th>
                <th className={styles.unitPriceCol}>Đơn giá</th>
                <th className={styles.quantityCol}>Số lượng</th>
                <th className={styles.totalPriceCol}>Tạm tính</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className={styles.productsCol}>
                    <Label tag="a" href="/user/cart">
                        Laptop Lenovo Ideapad 520s-14IKB 80X200J2VN Core i3-7130U/ Win10 (14" FHD
                        IPS) - Hàng Chính Hãng
                    </Label>
                </td>
                <td className={styles.unitPriceCol}>200.209.000đ</td>
                <td className={styles.quantityCol}>1</td>
                <td className={styles.totalPriceCol}>200.199.000đ</td>
            </tr>
        </tbody>
    </Table>
);

export default OrderDetail;
