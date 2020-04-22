import React, { Fragment, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import styles from "./styles.module.scss";

const PromotionDelete = ({ promotionId, promotionName }) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <Fragment>
            <Button color="danger" onClick={toggle}>
                <FaTrash />
            </Button>

            <Modal isOpen={modal} toggle={toggle} className={styles.modal}>
                <ModalHeader toggle={toggle}>
                    <FaTrash />
                    &nbsp;&nbsp;Xóa khuyến mãi
                </ModalHeader>

                <ModalBody>
                    Xác nhận xóa khuyến mãi{" "}
                    <b>
                        {promotionId} - {promotionName}?
                    </b>
                </ModalBody>

                <ModalFooter>
                    <Button color="danger">Xác nhận</Button>
                    <Button color="secondary" onClick={toggle}>
                        Đóng
                    </Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    );
};

export default PromotionDelete;
