import React, { Component } from "react";
import styles from "./styles.module.scss";
import {
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    ButtonGroup,
    Button,
} from "reactstrap";

class OrderOverview extends Component {
    render() {
        return (
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <td className={styles.labelCol}>Người nhận:</td>
                        <td>
                            <Input
                                readOnly
                                type="text"
                                id="name"
                                value="Đinh Hoàng Nhi"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelCol}>Số điện thoại:</td>
                        <td>
                            <Input
                                readOnly
                                type="text"
                                id="unit-price"
                                value="0336887109"
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className={styles.labelCol}>Địa chỉ nhận:</td>
                        <td>
                            <Input
                                readOnly
                                type="text"
                                id="discount-price"
                                value="106/2 Đường Đào Cử, thị trấn Cần Thạnh, huyện Cần Giờ, Thành phố Hồ Chí Minh"
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className={styles.labelCol}>Ngày mua:</td>
                        <td>
                            <Input
                                readOnly
                                type="text"
                                id="discount-price"
                                value="Thứ ba, ngày 21 tháng 4 năm 2020"
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className={styles.labelCol}>Dự kiến giao:</td>
                        <td>
                            <Input
                                readOnly
                                type="text"
                                id="discount-price"
                                value="Thứ tư, ngày 22 tháng 4 năm 2020"
                            />
                        </td>
                    </tr>

                    <tr>
                        <td className={styles.labelCol}>Số sản phẩm:</td>
                        <td>
                            <InputGroup>
                                <Input
                                    readOnly
                                    type="text"
                                    id="quantity"
                                    value="1"
                                />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>sản phẩm</InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </td>
                    </tr>

                    <tr>
                        <td className={styles.labelCol}>Phí giao hàng:</td>
                        <td>
                            <InputGroup>
                                <Input
                                    readOnly
                                    type="text"
                                    id="actual-price"
                                    value="0"
                                />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>đ</InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </td>
                    </tr>

                    <tr>
                        <td className={styles.labelCol}>Tổng giá trị:</td>
                        <td>
                            <InputGroup>
                                <Input
                                    readOnly
                                    type="text"
                                    id="actual-price"
                                    value="16,900,000đ"
                                />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>đ</InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </td>
                    </tr>

                    <tr>
                        <td className={styles.labelCol}>Trạng thái:</td>
                        <td>
                            <ButtonGroup className={styles.statusBtnGroup}>
                                <Input
                                    type="select"
                                    className={styles.statusSelect}
                                >
                                    <option>Chờ xử lí</option>
                                    <option>Đang đóng gói</option>
                                    <option>Đang vận chuyển</option>
                                    <option>Đã nhận hàng</option>
                                    <option>Hủy đơn</option>
                                </Input>
                                <Button color="primary">Cập nhật</Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                    <tr />
                </tbody>
            </table>
        );
    }
}

export default OrderOverview;
