import React, { Fragment, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import styles from "./styles.module.scss";
import laptopApi from "../../../../../../services/api/laptopApi";

const ProductDelete = ({ product }) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const externalCloseBtn = (
        <button
            className="close"
            style={{
                position: "absolute",
                right: "15px",
                fontSize: "65px",
                color: "white",
            }}
            onClick={toggle}
        >
            &times;
        </button>
    );

    const submit = async (e) => {
        const input = e.target;
        input.disabled = true;
        try {
            await laptopApi.deleteById(product["id"]);
            window.location.reload();
        } catch (err) {
            console.log("fail");
        }
    };

    return (
        <Fragment>
            <Button color="danger" onClick={toggle}>
                <FaTrash />
            </Button>

            <Modal isOpen={modal} external={externalCloseBtn} className={styles.modal}>
                <ModalHeader>
                    <FaTrash />
                    &nbsp;&nbsp;Xóa sản phẩm
                </ModalHeader>

                <ModalBody>
                    Xác nhận xóa sản phẩm{" "}
                    <b>
                        {product["id"]} - {product["name"]}?
                    </b>
                </ModalBody>

                <ModalFooter>
                    <Button color="danger" onClick={submit}>
                        Xác nhận
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Đóng
                    </Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    );
};

export default ProductDelete;
