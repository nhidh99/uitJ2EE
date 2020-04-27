import React, { Fragment, useState } from "react";
import { FaGifts, FaPen } from "react-icons/fa";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import styles from "./styles.module.scss";
import PromotionForm from "../PromotionForm";

const PromotionEdit = ({ promotionId }) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return promotionId ? (
        <Fragment>
            <Button className={styles.button} color="primary" onClick={toggle}>
                <FaPen />
            </Button>

            <Modal isOpen={modal} toggle={toggle} className={styles.modal}>
                <ModalHeader toggle={toggle}>
                    <FaGifts />
                    &nbsp;&nbsp;Cập nhật khuyến mãi (Mã khuyến mãi:{" "}
                    {promotionId})
                </ModalHeader>

                <ModalBody>
                    <PromotionForm promotionId={promotionId} toggle={toggle} />
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
