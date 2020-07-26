import React from "react";
import { Row, Col, InputGroup, InputGroupAddon, InputGroupText, Input, Button } from "reactstrap";
import { FaSearch } from "react-icons/fa";
import styles from "./styles.module.scss";

const RatingFilter = () => {
    const search = () => {
        const status = document.getElementById("statusSelect").value;
        const filter = document.getElementById("filter").value;
        if (filter === "" && status === "") {
            window.location.href = "/admin/ratings";
        } else {
            window.location.href = `/admin/ratings/search?id=${filter}&status=${status}`;
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
                    <option value="">Tất cả</option>
                    <option value="1">Đã duyệt</option>
                    <option value="0">Chưa duyệt</option>
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

export default RatingFilter;
