import React from "react";
import { Row, Col, InputGroup, InputGroupAddon, InputGroupText, Input, Button } from "reactstrap";
import { FaSearch } from "react-icons/fa";
import styles from "./styles.module.scss";

const OrderFilter = () => {
    const search = () => {
        const status = document.getElementById("statusSelect").value;
        const filter = document.getElementById("filter").value;
        if (filter === "" && status === "") {
            window.location.href = "/admin/orders";
        } else {
            window.location.href = `/admin/orders/search?id=${filter}&status=${status}`;
        }
    };

    return (
        <Row className={styles.row}>
            <Col sm="8" className={styles.searchCol}>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <FaSearch />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" id="filter" placeholder="Tìm kiếm..." />
                </InputGroup>
            </Col>

            <Col sm="2" className={styles.buttonCol}>
                <Input type="select" id="statusSelect" className={styles.select}>
                    <option value="">Tất cả đơn</option>
                    <option value="PENDING">Chờ xử lí</option>
                    <option value="PACKAGED">Đang đóng gói</option>
                    <option value="DELIVERING">Đang vận chuyển</option>
                    <option value="DELIVERED">Đã nhận hàng</option>
                    <option value="CANCELED">Bị hủy</option>
                </Input>
            </Col>

            <Col sm="2" className={styles.buttonCol}>
                <Button className={styles.button} color="info" onClick={search}>
                    <FaSearch />
                    &nbsp;&nbsp;Tìm kiếm
                </Button>
            </Col>
        </Row>
    );
};

export default OrderFilter;
