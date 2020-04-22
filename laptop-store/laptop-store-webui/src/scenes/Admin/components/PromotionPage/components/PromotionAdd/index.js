import React, { Fragment, useState } from "react";
import { FaGifts } from "react-icons/fa";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import styles from "./styles.module.scss";
import PromotionForm from "../PromotionForm";

const PromotionAdd = () => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <Fragment>
            <Button className={styles.button} color="success" onClick={toggle}>
                <FaGifts />
                &nbsp;&nbsp;Thêm khuyến mãi
            </Button>

            <Modal isOpen={modal} toggle={toggle} className={styles.modal}>
                <ModalHeader toggle={toggle}>
                    <FaGifts />
                    &nbsp;&nbsp;Thêm khuyến mãi
                </ModalHeader>

                <ModalBody>
                    <PromotionForm />
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

export default PromotionAdd;
