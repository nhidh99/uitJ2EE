import React, { useState, Fragment } from "react";
import {
    Row,
    Col,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import { FaSearch, FaBox } from "react-icons/fa";
import styles from "./styles.module.scss";

const ProductList = () => (
    <Row className={styles.row}>
        <Col sm="8" className={styles.searchCol}>
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

        <Col sm="2" className={styles.buttonCol}>
            <AddProductModal />
        </Col>
    </Row>
);

const AddProductModal = () => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <Fragment>
            <Button className={styles.button} color="success" onClick={toggle}>
                <FaBox />
                &nbsp;&nbsp;Thêm sản phẩm
            </Button>

            <Modal isOpen={modal} toggle={toggle} className={styles.modal}>
                <ModalHeader toggle={toggle}>
                    <FaBox />
                    &nbsp;&nbsp;Thêm sản phẩm
                </ModalHeader>

                <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.Lorem ipsum dolor sit
                    amet, consectetur adipisicing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                </ModalBody>

                <ModalFooter>
                    <Button color="success">Xác nhận</Button>
                    <Button color="secondary" onClick={toggle}>
                        Hủy bỏ
                    </Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    );
};

export default ProductList;
