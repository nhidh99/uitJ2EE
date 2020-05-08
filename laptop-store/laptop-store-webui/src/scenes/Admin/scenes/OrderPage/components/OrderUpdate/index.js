import React, { Fragment, useState } from "react";
import { FaPen } from "react-icons/fa";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import styles from "./styles.module.scss";
import OrderForm from "../OrderForm";

const OrderUpdate = ({ orderId }) => {
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
                    &nbsp;&nbsp;Cập nhật đơn hàng (Mã đơn hàng: {orderId})
                </ModalHeader>

                <ModalBody>
                    <OrderForm />
                </ModalBody>
            </Modal>
        </Fragment>
    );
};

export default OrderUpdate;
