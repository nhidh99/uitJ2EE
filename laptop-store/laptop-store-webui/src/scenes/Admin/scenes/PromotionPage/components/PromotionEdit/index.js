import React, { Fragment, useState } from "react";
import { FaGifts, FaPen } from "react-icons/fa";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import styles from "./styles.module.scss";
import PromotionForm from "../PromotionForm";

const PromotionEdit = ({ promotion }) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return promotion ? (
        <Fragment>
            <Button className={styles.button} color="primary" onClick={toggle}>
                <FaPen />
            </Button>

            <Modal isOpen={modal} toggle={toggle} className={styles.modal}>
                <ModalHeader toggle={toggle}>
                    <FaGifts />
                    &nbsp;&nbsp;Cập nhật khuyến mãi (Mã khuyến mãi: {promotion["id"]})
                </ModalHeader>

                <ModalBody>
                    <PromotionForm promotion={promotion} toggle={toggle} />
                </ModalBody>
            </Modal>
        </Fragment>
    ) : (
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
                    <PromotionForm toggle={toggle} />
                </ModalBody>
            </Modal>
        </Fragment>
    );
};

export default PromotionEdit;
