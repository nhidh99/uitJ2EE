import React, { Component } from "react";
import {
    Row,
    Col,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Button,
} from "reactstrap";
import { FaSearch } from "react-icons/fa";
import styles from "./styles.module.scss";
import { convertToOrderStatus } from "../../../../../../services/helper/converter";

class OrderFilter extends Component {
    search = () => {
        const selection = document.getElementById("statusSelect").value;
        const status = convertToOrderStatus(selection);
        const filter = document.getElementById("filter").value;
        if (filter !== "" || status !== null) {
            window.location.href = `/admin/orders/search?id=${filter}&status=${status}`
        } else window.location.href = "/admin/orders";
    }
    render() {
        return (
            <Row className={styles.row}>
                <Col sm="8" className={styles.searchCol}>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <FaSearch />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id ="filter" placeholder="Tìm kiếm..." />
                    </InputGroup>
                </Col>

                <Col sm="2" className={styles.buttonCol}>
                    <Input type="select" id="statusSelect" className={styles.select}>
                        <option>Tất cả đơn</option>
                        <option>Chờ xử lí</option>
                        <option>Đang đóng gói</option>
                        <option>Đang vận chuyển</option>
                        <option>Đã nhận hàng</option>
                        <option>Bị hủy</option>
                    </Input>
                </Col>

                <Col sm="2" className={styles.buttonCol}>
                    <Button className={styles.button} color="info" onClick={this.search}>
                        <FaSearch />
                &nbsp;&nbsp;Tìm kiếm
            </Button>
                </Col>
            </Row>
        );
    }
}

export default OrderFilter;
