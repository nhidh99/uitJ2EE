import React from "react";
import { Row, Col, InputGroup, InputGroupAddon, InputGroupText, Input, Button } from "reactstrap";
import { FaSearch } from "react-icons/fa";
import styles from "./styles.module.scss";
import ProductEdit from "../ProductEdit";

const ProductFilter = () => {
    const search = () => {
        const filter = document.getElementById("filter").value;
        if (filter !== "") {
            window.location.href = `/admin/products/search?q=${filter}`;
        } else {
            window.location.href = "/admin/products";
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
                <Button className={styles.button} color="info" onClick={search}>
                    <FaSearch />
                    &nbsp;&nbsp;Tìm kiếm
                </Button>
            </Col>

            <Col sm="2" className={styles.buttonCol}>
                <ProductEdit />
            </Col>
        </Row>
    );
};

export default ProductFilter;
