import React, { Fragment, useState } from "react";
import { FaPen } from "react-icons/fa";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import styles from "./styles.module.scss";
import PromotionForm from "../PromotionForm";

const PromotionUpdate = ({ promotionId }) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <Fragment>
            <Button color="primary" onClick={toggle}>
                <FaPen />
            </Button>

            <Modal isOpen={modal} toggle={toggle} className={styles.modal}>
                <ModalHeader toggle={toggle}>
                    <FaPen />
                    &nbsp;&nbsp;Cập nhật khuyến mãi (Mã khuyến mãi: {promotionId})
                </ModalHeader>

                <ModalBody>
                    <PromotionForm />
                </ModalBody>

                <ModalFooter>
                    <Button color="primary">Xác nhận</Button>
                    <Button color="secondary" onClick={toggle}>
                        Đóng
                    </Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    );
};

export default PromotionUpdate;
