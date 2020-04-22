import React, { Fragment, useState } from "react";
import { FaBox } from "react-icons/fa";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import styles from "./styles.module.scss";
import ProductForm from "../ProductForm";

const ProductAdd = () => {
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
                    <ProductForm />
                </ModalBody>

                <ModalFooter>
                    <Button color="success">Xác nhận</Button>
                    <Button color="secondary" onClick={toggle}>
                        Đóng
                    </Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    );
};

export default ProductAdd;
