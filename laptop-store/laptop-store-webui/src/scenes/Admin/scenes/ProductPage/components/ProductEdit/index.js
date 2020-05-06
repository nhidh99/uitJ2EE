import React, { Fragment, useState } from "react";
import { FaBox, FaPen } from "react-icons/fa";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import styles from "./styles.module.scss";
import ProductForm from "../ProductForm";

const ProductEdit = ({ product }) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return product ? (
        <Fragment>
            <Button color="primary" onClick={toggle}>
                <FaPen />
            </Button>

            <Modal isOpen={modal} toggle={toggle} className={styles.modal}>
                <ModalHeader toggle={toggle}>
                    <FaPen />
                    &nbsp;&nbsp;Cập nhật sản phẩm (Mã sản phẩm: {product["id"]})
                </ModalHeader>

                <ModalBody>
                    <ProductForm product={product} />
                </ModalBody>
            </Modal>
        </Fragment>
    ) : (
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
                    <ProductForm product={product} toggle={toggle} />
                </ModalBody>
            </Modal>
        </Fragment>
    );
};

export default ProductEdit;
