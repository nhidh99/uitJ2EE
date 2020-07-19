import React from "react";
import styles from "./styles.module.scss";
import {
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    ButtonGroup,
    Button,
} from "reactstrap";
import orderApi from "../../../../../../../services/api/orderApi";

const OrderOverview = ({ order }) => {
    const updateOrderStatus = async (e) => {
        try {
            e.target.disabled = true;
            const status = document.getElementById("status").value;
            const data = { status: status };
            await orderApi.putOrder(order["id"], data);
            window.location.reload();
        } catch (err) {
            console.log("fail");
        }
    };

    const buildStatusOptions = (status) => {
        if (!status) return [];
        const options = [
            <option value="PENDING">Chờ xử lí</option>,
            <option value="RECEIVED">Tiếp nhận</option>,
            <option value="PACKAGED">Đóng gói</option>,
            <option value="DELIVERING">Vận chuyển</option>,
            <option value="DELIVERED">Đã giao</option>,
            <option value="CANCELED">Hủy đơn</option>,
        ];
        const index = [
            "PENDING",
            "RECEIVED",
            "PACKAGED",
            "DELIVERING",
            "DELIVERED",
            "CANCELED",
        ].indexOf(status);
        return options.slice(index, options.length - (status === "DELIVERED" ? 1 : 0));
    };

    return (
        <table className={styles.table}>
            <tbody>
                <tr>
                    <td className={styles.labelCol}>Người nhận:</td>
                    <td>
                        <Input readOnly type="text" id="name" value={order["receiver_name"]} />
                    </td>
                </tr>
                <tr>
                    <td className={styles.labelCol}>Số điện thoại:</td>
                    <td>
                        <Input
                            readOnly
                            type="text"
                            id="unit-price"
                            value={order["receiver_phone"]}
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
                            value={[
                                order["address_num"],
                                order["street"],
                                order["ward"],
                                order["district"],
                                order["city"],
                            ].join(", ")}
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
                            value={`Ngày ${order["order_date"]?.["dayOfMonth"] ?? ""} tháng ${
                                order["order_date"]?.["monthValue"] ?? ""
                            } năm ${order["order_date"]?.["year"] ?? ""}`}
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
                            value={`Ngày ${order["delivery_date"]?.["dayOfMonth"] ?? ""} tháng ${
                                order["delivery_date"]?.["monthValue"] ?? ""
                            } năm ${order["delivery_date"]?.["year"] ?? ""}`}
                        />
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
                                value={order["transport_fee"]?.toLocaleString()}
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
                                value={order["total_price"]?.toLocaleString()}
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
                            <Input type="select" className={styles.statusSelect} id="status">
                                {buildStatusOptions(order["status"])}
                            </Input>
                            <Button color="primary" onClick={updateOrderStatus}>
                                Cập nhật
                            </Button>
                        </ButtonGroup>
                    </td>
                </tr>
                <tr />
            </tbody>
        </table>
    );
};

export default OrderOverview;
