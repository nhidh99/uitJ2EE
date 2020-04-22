import React from "react";
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

const OrderFilter = () => (
    <Row className={styles.row}>
        <Col sm="10" className={styles.searchCol}>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <FaSearch />
                    </InputGroupText>
                </InputGroupAddon>
                <Input type="text" placeholder="Tìm kiếm..." />
            </InputGroup>
        </Col>

        <Col sm="2" className={styles.buttonCol}>
            <Button className={styles.button} color="info">
                <FaSearch />
                &nbsp;&nbsp;Tìm kiếm
            </Button>
        </Col>
    </Row>
);

export default OrderFilter;
